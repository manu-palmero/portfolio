// Five fragment shaders. Each is the body after FRAG_HEADER (which defines all uniforms).
// All output to gl_FragColor. Coordinates: gl_FragCoord is in pixels; we usually normalize.

// 1) LIQUID AURORA — domain-warped flowing iridescence. Cursor pulls flow toward it.
//    Click sends an expanding ripple of color outward.
const SHADER_AURORA = `
// Hash + noise
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  vec2 u=f*f*(3.0-2.0*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),
             mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x), u.y);
}
float fbm(vec2 p){
  float s=0.0, a=0.5;
  for(int i=0;i<5;i++){ s+=a*noise(p); p*=2.02; a*=0.5; }
  return s;
}
void main(){
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = (gl_FragCoord.xy - 0.5*u_resolution.xy) / min(u_resolution.x, u_resolution.y);

  vec2 m = u_smooth - 0.5;
  // pull-vector toward cursor
  vec2 d = m - p;
  float dist = length(d);
  vec2 pull = normalize(d + 1e-5) * exp(-dist*1.8) * 0.35;

  float t = u_time * 0.18;
  vec2 q = p + pull;
  vec2 w1 = vec2(fbm(q*1.3 + vec2(t, -t*0.7)), fbm(q*1.3 + vec2(-t*0.5, t*0.9)));
  vec2 w2 = vec2(fbm(q*2.0 + w1*1.4 + t), fbm(q*2.0 + w1*1.4 - t));
  float n = fbm(q*1.6 + w2*1.8 + t*0.5);

  // Click ripple
  float clickAge = u_time - 0.0; // age via click magnitude
  float ringR = (1.0 - u_click) * 1.4;
  float ring = smoothstep(0.06, 0.0, abs(length(p - (u_clickPos-0.5)) - ringR)) * u_click;

  // Iridescent palette
  float h = n + 0.15*sin(p.x*3.0 + t*2.0) + 0.2*length(pull);
  vec3 c1 = vec3(0.05, 0.10, 0.30); // deep blue
  vec3 c2 = vec3(0.60, 0.20, 0.85); // violet
  vec3 c3 = vec3(0.10, 0.85, 0.95); // cyan
  vec3 c4 = vec3(0.95, 0.55, 0.85); // pink
  vec3 col = mix(c1, c2, smoothstep(0.2, 0.6, h));
  col = mix(col, c3, smoothstep(0.45, 0.85, h));
  col = mix(col, c4, smoothstep(0.7, 1.0, h));

  // Soft cursor halo
  col += vec3(0.6, 0.4, 0.9) * exp(-dist*4.0) * 0.25;
  // Click ring tint
  col += vec3(1.0, 0.85, 0.6) * ring * 0.8;

  // subtle vignette
  col *= 1.0 - 0.25 * length(p);

  gl_FragColor = vec4(col, 1.0);
}
`;

// 2) VORONOI CELLS — organic cells that pulse outward from the cursor.
//    Click flashes the nearest cell.
const SHADER_VORONOI = `
vec2 hash2(vec2 p){
  p = vec2(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)));
  return fract(sin(p)*43758.5453);
}
void main(){
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = (gl_FragCoord.xy - 0.5*u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  vec2 m = u_smooth - 0.5;

  float scale = 6.0;
  vec2 g = p * scale;
  vec2 i = floor(g);
  vec2 f = fract(g);

  float d1 = 8.0, d2 = 8.0;
  vec2 closest = vec2(0.0);
  for(int y=-1;y<=1;y++){
    for(int x=-1;x<=1;x++){
      vec2 nb = vec2(float(x), float(y));
      vec2 o = hash2(i+nb);
      // animate cell centers
      o = 0.5 + 0.5*sin(u_time*0.6 + 6.2831*o);
      vec2 r = nb + o - f;
      float d = dot(r,r);
      if(d < d1){ d2 = d1; d1 = d; closest = i + nb; }
      else if(d < d2){ d2 = d; }
    }
  }
  d1 = sqrt(d1); d2 = sqrt(d2);
  float edge = d2 - d1;

  // distance from this fragment to mouse, in cell-grid space
  float md = length(p - m);

  // pulse rings emanating from cursor
  float pulse = 0.5 + 0.5*sin(md*14.0 - u_time*3.0);
  float pulseMask = exp(-md*2.5);

  // nearest-cell flash on click
  vec2 clickWorld = (u_clickPos - 0.5);
  // figure cell id at click
  vec2 cg = clickWorld * scale;
  vec2 ci = floor(cg);
  float sameCell = step(0.5, 1.0 - min(1.0, length(closest - ci)));
  float flash = sameCell * u_click;

  // base palette — cool teal -> warm cursor area
  float cellRand = hash2(closest).x;
  vec3 base = mix(vec3(0.04, 0.08, 0.12), vec3(0.10, 0.22, 0.28), cellRand);
  // warm boost near cursor
  base = mix(base, vec3(0.95, 0.55, 0.30), exp(-md*3.0)*0.55);
  // pulse modulates fill
  base += 0.08 * pulse * pulseMask;
  // flash
  base += vec3(1.0, 0.85, 0.55) * flash * 0.8;

  // crisp edges
  float edgeLine = smoothstep(0.04, 0.0, edge);
  vec3 col = mix(base, vec3(0.95, 0.95, 0.98), edgeLine*0.55);

  // dot at cell center: brighter near cursor
  float dot_ = smoothstep(0.05, 0.0, d1);
  col += vec3(1.0)*dot_*(0.2 + 0.6*exp(-md*3.0));

  col *= 1.0 - 0.2 * length(p);
  gl_FragColor = vec4(col, 1.0);
}
`;

// 3) CAUSTIC POOL — shimmering underwater caustics. Cursor warps the surface;
//    click drops a pebble whose ripple expands.
const SHADER_CAUSTIC = `
float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
void main(){
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = (gl_FragCoord.xy - 0.5*u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  vec2 m = u_smooth - 0.5;

  // pebble ripple
  vec2 cp = u_clickPos - 0.5;
  float rd = length(p - cp);
  float ringR = (1.0 - u_click) * 1.6;
  float ripple = sin((rd - ringR)*40.0) * exp(-abs(rd-ringR)*8.0) * u_click;

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
  vec3 deep = vec3(0.02, 0.05, 0.10);
  vec3 mid  = vec3(0.05, 0.30, 0.45);
  vec3 light= vec3(0.55, 0.92, 0.95);
  float depthBlend = smoothstep(-0.5, 0.5, p.y + 0.15*sin(p.x*1.2+t));
  vec3 base = mix(deep, mid, depthBlend);
  vec3 col = base + light*caustic*0.85;

  // ripple highlight
  col += vec3(1.0, 0.95, 0.85) * abs(ripple) * 0.7;

  // mouse glint
  col += vec3(0.7, 0.9, 1.0) * hill * 0.18;

  // sparkles
  vec2 si = floor(p*40.0 + t*0.3);
  float sp = step(0.985, hash(si)) * (0.5+0.5*sin(t*6.0+hash(si)*30.0));
  col += vec3(1.0)*sp*caustic*0.6;

  col *= 1.0 - 0.3 * length(p)*0.6;
  gl_FragColor = vec4(col, 1.0);
}
`;

// 4) MAGNETIC FIELD — flow-line field bending around the cursor like a magnet.
//    Click flips polarity (attract <-> repel) — u_polarity already toggles per click.
const SHADER_MAGNETIC = `
float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  vec2 u=f*f*(3.0-2.0*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),
             mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x), u.y);
}
void main(){
  vec2 p = (gl_FragCoord.xy - 0.5*u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  vec2 m = u_smooth - 0.5;
  float t = u_time;

  // dipole-ish field around cursor
  vec2 d = p - m;
  float r2 = dot(d,d) + 0.01;
  // angle of field at this point: tangent of dipole + ambient flow
  float theta = atan(d.y, d.x);
  float fieldAngle = theta + 1.5707963 * u_polarity; // perpendicular = field lines around point
  // ambient drifting flow
  float ambient = noise(p*1.2 + vec2(t*0.1, -t*0.08)) * 6.2831;
  float w = exp(-r2*3.0);
  float ang = mix(ambient, fieldAngle, w);

  // streak coordinate along flow
  vec2 fwd = vec2(cos(ang), sin(ang));
  vec2 side = vec2(-fwd.y, fwd.x);
  float along = dot(p, fwd)*8.0 + t*1.6*u_polarity;
  float across = dot(p, side)*30.0;

  // streamlines: thin alternating bands across "across"
  float lines = 0.5 + 0.5*sin(across + 8.0*sin(along*0.3));
  lines = pow(lines, 8.0);
  // fade near the dipole core to avoid singularity
  float coreFade = smoothstep(0.0, 0.25, length(d));

  // particles flying along flow
  float seed = hash(floor(vec2(across*0.5, along*0.2)));
  float particle = smoothstep(0.95, 1.0, fract(along*0.15 + seed*7.0));
  particle *= step(0.5, fract(seed*13.0)); // sparse

  // colors: cool when polarity = +1, warm when -1
  vec3 cool = vec3(0.20, 0.55, 1.00);
  vec3 warm = vec3(1.00, 0.45, 0.20);
  vec3 accent = mix(warm, cool, 0.5+0.5*u_polarity);

  vec3 bg = vec3(0.02, 0.03, 0.06);
  vec3 col = bg;
  col += accent * lines * 0.55 * coreFade;
  col += vec3(1.0, 0.95, 0.85) * particle * coreFade;

  // glowing pole at cursor
  float core = exp(-r2*40.0);
  col += accent * core * 1.4;
  col += vec3(1.0) * exp(-r2*200.0);

  // click flash
  col += accent * u_click * exp(-length(p-(u_clickPos-0.5))*4.0) * 0.6;

  gl_FragColor = vec4(col, 1.0);
}
`;

// 5) CRYSTALLINE — refractive prismatic facets. Cursor rotates the crystal lattice;
//    click sends a chromatic shockwave through the facets.
const SHADER_CRYSTAL = `
mat2 rot(float a){ float c=cos(a), s=sin(a); return mat2(c,-s,s,c); }
float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }

// hex tile -> cell id + local coord
vec4 hex(vec2 p){
  vec2 q = vec2(p.x*1.1547005, p.y + p.x*0.5773503);
  vec2 i = floor(q);
  vec2 f = fract(q);
  float v = mod(i.x + i.y, 3.0);
  if(v == 1.0){
    if(f.x > f.y) i += vec2(1.0, 0.0); else i += vec2(0.0, 1.0);
  } else if(v == 2.0){
    if(f.x + f.y < 1.0) ; else i += vec2(1.0, 1.0);
  }
  vec2 cellCenter = vec2(i.x - i.y*0.5, i.y*0.8660254);
  return vec4(p - cellCenter, i);
}

void main(){
  vec2 p = (gl_FragCoord.xy - 0.5*u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  vec2 m = u_smooth - 0.5;
  float t = u_time*0.15;

  // global rotation driven by mouse
  float rotA = (m.x)*1.2 + t;
  vec2 pr = rot(rotA) * p;

  // multi-scale facets
  vec3 col = vec3(0.0);
  float depthMix = 0.5 + m.y*0.8;
  for(int i=0;i<3;i++){
    float fi = float(i);
    float scale = 4.0 + fi*3.5 + depthMix*2.0;
    vec2 q = rot(fi*0.7 + rotA*0.3) * pr * scale;
    vec4 h = hex(q);
    vec2 local = h.xy;
    vec2 id = h.zw;

    float facetSeed = hash(id + fi*17.0);
    // facet "normal" -> shading
    float shade = 0.5 + 0.5*sin(facetSeed*6.2831 + t*2.0 + length(p-m)*3.0);
    // edge falloff inside hex
    float edge = 1.0 - smoothstep(0.35, 0.5, max(abs(local.x)*1.1547, max(abs(local.y), abs(local.x*0.5+local.y))));

    // chromatic split based on facet orientation
    float hue = facetSeed + 0.2*shade + 0.15*sin(t+fi);
    vec3 c = 0.5 + 0.5*cos(6.2831*(hue + vec3(0.0, 0.33, 0.66)));
    // dark crystalline base
    c *= 0.35 + 0.65*shade;
    // layer blend
    col += c * edge * (0.55 - fi*0.12);
  }

  // central bright refraction at cursor
  float md = length(p - m);
  vec3 prism = 0.5 + 0.5*cos(6.2831*(md*4.0 - t*2.0 + vec3(0.0, 0.33, 0.66)));
  col += prism * exp(-md*5.0) * 0.6;

  // click shockwave: chromatic ring
  vec2 cp = u_clickPos - 0.5;
  float cd = length(p - cp);
  float ringR = (1.0 - u_click) * 1.4;
  vec3 shock = 0.5 + 0.5*cos(6.2831*(cd*3.0 + vec3(0.0, 0.33, 0.66)));
  float ringMask = smoothstep(0.10, 0.0, abs(cd - ringR)) * u_click;
  col += shock * ringMask * 1.2;

  // deep base
  col = mix(vec3(0.02, 0.02, 0.05), col, 0.92);
  // vignette
  col *= 1.0 - 0.3*length(p)*0.7;

  gl_FragColor = vec4(col, 1.0);
}
`;

window.SHADERS = {
  aurora: SHADER_AURORA,
  voronoi: SHADER_VORONOI,
  caustic: SHADER_CAUSTIC,
  magnetic: SHADER_MAGNETIC,
  crystal: SHADER_CRYSTAL,
};
