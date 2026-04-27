import React, { useEffect, useRef } from 'react';

// Vertex Shader básico
const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

// Header de Fragment Shader con todos los uniforms que usa la lógica de tu shader original
const FRAG_HEADER = `
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_smooth;
uniform float u_click;
uniform vec2 u_clickPos;
uniform float u_polarity;
`;

// Shader de "Caustic Pool" extraído de tu archivo shaders.jsx (dejamos fuera el resto)
const SHADER_CAUSTIC = `
float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
void main(){
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = (gl_FragCoord.xy - 0.5*u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  vec2 m = (u_smooth - 0.5) * u_resolution.xy / min(u_resolution.x, u_resolution.y);

  // pebble ripple
  vec2 cp = (u_clickPos - 0.5) * u_resolution.xy / min(u_resolution.x, u_resolution.y);
  float rd = length(p - cp);
  float ringR = (1.0 - u_click) * 1.6;
  float ripple = sin((rd - ringR)*20.0) * exp(-abs(rd-ringR)*5.0) * u_click; // Ondas más espaciadas y anchas

  // mouse-driven gentle hill
  vec2 dm = p - m;
  float hill = exp(-dot(dm,dm)*5.0);
  vec2 hillGrad = -2.0*5.0*dm * hill;

  // animated caustic pattern
  float t = u_time * 0.6;
  vec2 q = p*3.0 + hillGrad*0.8;
  float c = 0.0;
  for(int i=0;i<3;i++){
    float fi = float(i);
    vec2 dir = vec2(cos(fi*1.7+t*0.3), sin(fi*1.3-t*0.2));
    c += sin(dot(q, dir)*2.5 + t + ripple*8.0);
    q = q.yx + vec2(t*0.1, -t*0.07);
  }
  c = c/3.0;
  float caustic = pow(0.5+0.5*c, 4.0);

  // depth gradient
  vec3 deep = vec3(0.04, 0.02, 0.02); // oscuro cálido, casi negro
  vec3 mid  = vec3(0.30, 0.05, 0.08); // carmesí oscuro para la transición
  vec3 light= vec3(1.00, 0.23, 0.23); // rojo primario (#ff3b3b)
  float depthBlend = smoothstep(-0.5, 0.5, p.y + 0.15*sin(p.x*1.2+t));
  vec3 base = mix(deep, mid, depthBlend);
  vec3 col = base + light*caustic*0.85;

  // ripple highlight
  col += vec3(1.0, 0.42, 0.48) * abs(ripple) * 0.7; // rosa secundario (#ff6b7a)

  // mouse glint
  col += vec3(1.0, 0.3, 0.3) * hill * 0.18; // reflejo rojizo

  // sparkles
  vec2 si = floor(p*40.0 + t*0.3);
  float sp = step(0.985, hash(si)) * (0.5+0.5*sin(t*6.0+hash(si)*30.0));
  col += vec3(1.0)*sp*caustic*0.6;

  col *= 1.0 - 0.3 * length(p)*0.6;
  gl_FragColor = vec4(col, 1.0);
}
`;

export const Wallpaper = ({ autoDrift = true }) => {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    mouse: [0.5, 0.5],
    smooth: [0.5, 0.5],
    click: 0,
    clickPos: [0.5, 0.5],
    polarity: 1,
    clickTime: -10,
    autoT: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl', { premultipliedAlpha: false, antialias: true });
    if (!gl) return;

    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(s), src);
      }
      return s;
    };

    const program = gl.createProgram();
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG_HEADER + SHADER_CAUSTIC));
    gl.linkProgram(program);
    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const u = {
      resolution: gl.getUniformLocation(program, 'u_resolution'),
      time: gl.getUniformLocation(program, 'u_time'),
      mouse: gl.getUniformLocation(program, 'u_mouse'),
      smooth: gl.getUniformLocation(program, 'u_smooth'),
      click: gl.getUniformLocation(program, 'u_click'),
      clickPos: gl.getUniformLocation(program, 'u_clickPos'),
      polarity: gl.getUniformLocation(program, 'u_polarity'),
    };

    let raf;
    const start = performance.now();
    let lastInteract = start;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(r.width * dpr));
      canvas.height = Math.max(1, Math.floor(r.height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = (e) => {
      stateRef.current.mouse = [
        e.clientX / window.innerWidth,
        1 - (e.clientY / window.innerHeight),
      ];
      lastInteract = performance.now();
    };

    const onDown = (e) => {
      stateRef.current.clickPos = [
        e.clientX / window.innerWidth,
        1 - (e.clientY / window.innerHeight),
      ];
      stateRef.current.click = 1;
      stateRef.current.polarity *= -1;
      stateRef.current.clickTime = (performance.now() - start) / 1000;
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('pointerdown', onDown);

    const tick = () => {
      const t = (performance.now() - start) / 1000;
      const st = stateRef.current;

      if (autoDrift && performance.now() - lastInteract > 1500) {
        st.autoT += 0.005;
        const target = [
          0.5 + 0.35 * Math.cos(st.autoT * 0.7),
          0.5 + 0.35 * Math.sin(st.autoT * 1.1),
        ];
        st.mouse[0] += (target[0] - st.mouse[0]) * 0.02;
        st.mouse[1] += (target[1] - st.mouse[1]) * 0.02;
      }

      st.smooth[0] += (st.mouse[0] - st.smooth[0]) * 0.08;
      st.smooth[1] += (st.mouse[1] - st.smooth[1]) * 0.08;
      st.click *= 0.992; // Todavía más lento para que las ondas viajen con calma

      gl.uniform2f(u.resolution, canvas.width, canvas.height);
      gl.uniform1f(u.time, t);
      gl.uniform2f(u.mouse, st.mouse[0], st.mouse[1]);
      gl.uniform2f(u.smooth, st.smooth[0], st.smooth[1]);
      gl.uniform1f(u.click, st.click);
      gl.uniform2f(u.clickPos, st.clickPos[0], st.clickPos[1]);
      gl.uniform1f(u.polarity, st.polarity);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('pointerdown', onDown);
      gl.deleteProgram(program);
      gl.deleteBuffer(buf);
    };
  }, [autoDrift]);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, background: '#000' }}>
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%', cursor: 'crosshair' }}
      />
    </div>
  );
};