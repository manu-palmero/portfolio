// Reusable interactive shader wallpaper component.
// Renders a fullscreen WebGL quad with a fragment shader that receives:
//   uniform vec2 u_resolution;
//   uniform float u_time;
//   uniform vec2 u_mouse;       // 0..1, follows the actual cursor
//   uniform vec2 u_smooth;      // 0..1, eased toward u_mouse (for soft trails)
//   uniform float u_click;      // decays 1 -> 0 after each click
//   uniform vec2 u_clickPos;    // 0..1, position of last click
//   uniform float u_polarity;   // toggles -1/+1 each click
//
// Usage: <ShaderWallpaper frag={GLSL_STRING} label="..." />

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

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

function ShaderWallpaper({ frag, label, hint, width = 800, height = 500, autoDrift = true }) {
  const canvasRef = React.useRef(null);
  const stateRef = React.useRef({
    mouse: [0.5, 0.5],
    smooth: [0.5, 0.5],
    click: 0,
    clickPos: [0.5, 0.5],
    polarity: 1,
    clickTime: -10,
    autoT: 0,
  });
  const [showHint, setShowHint] = React.useState(true);

  React.useEffect(() => {
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
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG_HEADER + frag));
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
      const r = canvas.getBoundingClientRect();
      stateRef.current.mouse = [
        (e.clientX - r.left) / r.width,
        1 - (e.clientY - r.top) / r.height,
      ];
      lastInteract = performance.now();
    };
    const onLeave = () => {
      // drift toward center on leave
    };
    const onDown = (e) => {
      const r = canvas.getBoundingClientRect();
      stateRef.current.clickPos = [
        (e.clientX - r.left) / r.width,
        1 - (e.clientY - r.top) / r.height,
      ];
      stateRef.current.click = 1;
      stateRef.current.polarity *= -1;
      stateRef.current.clickTime = (performance.now() - start) / 1000;
      setShowHint(false);
    };
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);
    canvas.addEventListener('pointerdown', onDown);

    const tick = () => {
      const t = (performance.now() - start) / 1000;
      const st = stateRef.current;

      // Auto-drift the mouse target if the user hasn't moved in a while.
      if (autoDrift && performance.now() - lastInteract > 1500) {
        st.autoT += 0.005;
        const target = [
          0.5 + 0.35 * Math.cos(st.autoT * 0.7),
          0.5 + 0.35 * Math.sin(st.autoT * 1.1),
        ];
        st.mouse[0] += (target[0] - st.mouse[0]) * 0.02;
        st.mouse[1] += (target[1] - st.mouse[1]) * 0.02;
      }

      // Eased smooth mouse
      st.smooth[0] += (st.mouse[0] - st.smooth[0]) * 0.08;
      st.smooth[1] += (st.mouse[1] - st.smooth[1]) * 0.08;

      // Click decay
      st.click *= 0.96;

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
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
      canvas.removeEventListener('pointerdown', onDown);
      gl.deleteProgram(program);
      gl.deleteBuffer(buf);
    };
  }, [frag, autoDrift]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: '#000' }}>
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%', cursor: 'crosshair' }}
      />
      {label && (
        <div style={{
          position: 'absolute', left: 20, bottom: 18,
          color: 'rgba(255,255,255,0.9)',
          fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
          fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
          textShadow: '0 1px 12px rgba(0,0,0,0.6)',
          pointerEvents: 'none',
          display: 'flex', flexDirection: 'column', gap: 4,
        }}>
          <div style={{ opacity: 0.55 }}>{String(new Date().getHours()).padStart(2,'0')}:{String(new Date().getMinutes()).padStart(2,'0')}</div>
          <div style={{ fontSize: 14, letterSpacing: '0.08em', textTransform: 'none', fontWeight: 500 }}>{label}</div>
        </div>
      )}
      {hint && showHint && (
        <div style={{
          position: 'absolute', right: 20, bottom: 18,
          color: 'rgba(255,255,255,0.55)',
          fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
          fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase',
          textShadow: '0 1px 8px rgba(0,0,0,0.6)',
          pointerEvents: 'none',
        }}>
          {hint}
        </div>
      )}
    </div>
  );
}

window.ShaderWallpaper = ShaderWallpaper;
