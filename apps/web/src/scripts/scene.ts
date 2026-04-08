// Raw WebGL dot grid — replaces Three.js (~70 KB gzipped) with ~4 KB
// Same visual: 70×42 dot grid, spring cursor push, scroll wave morph

(() => {
  const canvas = document.getElementById('gl') as HTMLCanvasElement;
  const gl = canvas.getContext('webgl', {
    antialias: false,
    alpha: true,
    premultipliedAlpha: false,
    powerPreference: 'high-performance',
  });
  if (!gl) return;

  // ── Shaders ──────────────────────────────────────────────────────────────
  const VS = `
    attribute vec3 aPos;
    attribute vec3 aCol;
    uniform mat4 uView;
    uniform mat4 uProj;
    uniform float uSize;
    uniform float uScale;
    varying vec3 vCol;
    void main() {
      vec4 mv = uView * vec4(aPos, 1.0);
      gl_PointSize = max(1.0, uSize * uScale / -mv.z);
      gl_Position = uProj * mv;
      vCol = aCol;
    }
  `;

  // Radial gradient in the fragment shader — no texture needed
  const FS = `
    precision mediump float;
    varying vec3 vCol;
    void main() {
      float d = length(gl_PointCoord - 0.5) * 2.0;
      if (d > 1.0) discard;
      float a;
      if      (d < 0.18) a = mix(1.00, 0.90, d / 0.18);
      else if (d < 0.45) a = mix(0.90, 0.38, (d - 0.18) / 0.27);
      else if (d < 0.75) a = mix(0.38, 0.07, (d - 0.45) / 0.30);
      else               a = mix(0.07, 0.00, (d - 0.75) / 0.25);
      gl_FragColor = vec4(vCol, a);
    }
  `;

  function compileShader(type: number, src: string) {
    const s = gl!.createShader(type)!;
    gl!.shaderSource(s, src);
    gl!.compileShader(s);
    return s;
  }

  const prog = gl.createProgram()!;
  gl.attachShader(prog, compileShader(gl.VERTEX_SHADER, VS));
  gl.attachShader(prog, compileShader(gl.FRAGMENT_SHADER, FS));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const aPos  = gl.getAttribLocation(prog, 'aPos');
  const aCol  = gl.getAttribLocation(prog, 'aCol');
  const uView  = gl.getUniformLocation(prog, 'uView');
  const uProj  = gl.getUniformLocation(prog, 'uProj');
  const uSize  = gl.getUniformLocation(prog, 'uSize');
  const uScale = gl.getUniformLocation(prog, 'uScale');

  // ── Grid data ─────────────────────────────────────────────────────────────
  const COLS = 70, ROWS = 42, N = COLS * ROWS;
  const PW = 69, PH = 41;
  const SX = PW / (COLS - 1), SZ = PH / (ROWS - 1);

  const restX  = new Float32Array(N);
  const restZ  = new Float32Array(N);
  const velX   = new Float32Array(N);
  const velZ   = new Float32Array(N);
  const curX   = new Float32Array(N);
  const curZ   = new Float32Array(N);
  const accent = new Uint8Array(N);
  const wArr   = new Float32Array(N);
  const posArr = new Float32Array(N * 3);
  const colArr = new Float32Array(N * 3);

  for (let row = 0, i = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++, i++) {
      const x = -PW * 0.5 + col * SX;
      const z = -PH * 0.5 + row * SZ;
      restX[i] = curX[i] = x;
      restZ[i] = curZ[i] = z;
      posArr[i * 3] = x; posArr[i * 3 + 2] = z;
      const r = Math.random();
      accent[i] = r < 0.05 ? 1 : r < 0.08 ? 2 : r < 0.095 ? 3 : 0;
      colArr[i * 3] = 0.655; colArr[i * 3 + 1] = 0.545; colArr[i * 3 + 2] = 0.98;
    }
  }

  // ── GPU buffers ───────────────────────────────────────────────────────────
  const posBuf = gl.createBuffer()!;
  gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
  gl.bufferData(gl.ARRAY_BUFFER, posArr, gl.DYNAMIC_DRAW);

  const colBuf = gl.createBuffer()!;
  gl.bindBuffer(gl.ARRAY_BUFFER, colBuf);
  gl.bufferData(gl.ARRAY_BUFFER, colArr, gl.DYNAMIC_DRAW);

  // ── Math ──────────────────────────────────────────────────────────────────
  type V3 = [number, number, number];

  const dot3  = (a: V3, b: V3) => a[0]*b[0] + a[1]*b[1] + a[2]*b[2];
  const cross3 = (a: V3, b: V3): V3 => [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]];
  const norm3  = (a: V3): V3 => { const l = Math.sqrt(dot3(a,a)); return [a[0]/l, a[1]/l, a[2]/l]; };
  const sub3   = (a: V3, b: V3): V3 => [a[0]-b[0], a[1]-b[1], a[2]-b[2]];
  const lerp3  = (a: V3, b: V3, t: number): V3 => [a[0]+(b[0]-a[0])*t, a[1]+(b[1]-a[1])*t, a[2]+(b[2]-a[2])*t];

  // Column-major 4×4 perspective matrix
  function perspective(fovY: number, aspect: number, near: number, far: number): Float32Array {
    const f = 1.0 / Math.tan(fovY * 0.5), nf = 1 / (near - far);
    const m = new Float32Array(16);
    m[0] = f / aspect; m[5] = f;
    m[10] = (far + near) * nf; m[11] = -1;
    m[14] = 2 * far * near * nf;
    return m;
  }

  // Column-major lookAt view matrix
  function lookAt(eye: V3, center: V3, up: V3): Float32Array {
    const f = norm3(sub3(center, eye));
    const s = norm3(cross3(f, up));
    const u = cross3(s, f);
    const m = new Float32Array(16);
    m[0]=s[0];  m[4]=s[1];  m[8]=s[2];   m[12]=-dot3(s, eye);
    m[1]=u[0];  m[5]=u[1];  m[9]=u[2];   m[13]=-dot3(u, eye);
    m[2]=-f[0]; m[6]=-f[1]; m[10]=-f[2]; m[14]= dot3(f, eye);
    m[15]=1;
    return m;
  }

  // ── Camera ────────────────────────────────────────────────────────────────
  const FOV = 76 * Math.PI / 180;
  const C0pos: V3 = [0, 22, 0.001], C0at: V3 = [0, 0, 0],  C0up: V3 = [0, 0, -1];
  const C1pos: V3 = [0, 8,  22],    C1at: V3 = [0, 0, -6],  C1up: V3 = [0, 1,  0];

  let projMat = perspective(FOV, innerWidth / innerHeight, 0.1, 200);

  function resize() {
    const dpr = Math.min(devicePixelRatio, 2);
    canvas.width  = innerWidth  * dpr;
    canvas.height = innerHeight * dpr;
    gl!.viewport(0, 0, canvas.width, canvas.height);
    projMat = perspective(FOV, innerWidth / innerHeight, 0.1, 200);
  }
  resize();
  window.addEventListener('resize', resize);

  // ── Scroll ────────────────────────────────────────────────────────────────
  let sTgt = 0, sSm = 0;
  window.addEventListener('scroll', () => {
    sTgt = Math.min(1, Math.max(0, scrollY / innerHeight));
  }, { passive: true });

  // ── Cursor → world (ray–plane y=0) ───────────────────────────────────────
  let _ndcX = -9999, _ndcY = -9999, cursorActive = false;

  function rayHitY0(ndcX: number, ndcY: number, view: Float32Array, eye: V3): [number, number] | null {
    // Unproject NDC to view-space direction, then rotate to world space
    const vx = ndcX / projMat[0];
    const vy = ndcY / projMat[5];
    // Transpose of upper-left 3×3 of view matrix → world direction
    const wx = view[0]*vx + view[1]*vy - view[2];
    const wy = view[4]*vx + view[5]*vy - view[6];
    const wz = view[8]*vx + view[9]*vy - view[10];
    const len = Math.sqrt(wx*wx + wy*wy + wz*wz);
    const rdy = wy / len;
    if (Math.abs(rdy) < 1e-6) return null;
    const t = -eye[1] / rdy;
    if (t < 0) return null;
    const rdx = wx / len, rdz = wz / len;
    return [eye[0] + t * rdx, eye[2] + t * rdz];
  }

  const onMove = (cx: number, cy: number) => {
    _ndcX = (cx / innerWidth) * 2 - 1;
    _ndcY = -(cy / innerHeight) * 2 + 1;
    cursorActive = true;
  };
  const onLeave = () => { cursorActive = false; };
  window.addEventListener('mousemove', (e) => onMove(e.clientX, e.clientY));
  window.addEventListener('mouseleave', onLeave);
  document.addEventListener('mouseleave', onLeave);
  window.addEventListener('blur', onLeave);
  window.addEventListener('touchmove', (e) => onMove(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
  window.addEventListener('touchend', onLeave);

  // ── Physics & wave ────────────────────────────────────────────────────────
  const PR = 5.5, PF = 1.2, SPR = 0.065, DP = 0.72, BIAS = 0.65;

  function waveY(x: number, z: number, t: number) {
    return (
      2.5 * Math.exp(-((x * 0.16 + z * 0.07) ** 2) * 0.8) * Math.cos(x * 0.18 + z * 0.1 - t * 1.2) +
      0.8 * Math.sin(x * 0.14 + t * 0.75) * Math.cos(z * 0.11 + t * 0.55) +
      0.5 * Math.sin(x * 0.08 + z * 0.1 + t * 0.42) +
      0.28 * Math.cos(x * 0.22 - t * 1.05)
    );
  }

  const ease = (t: number) => t < 0.5 ? 2*t*t : -1 + (4 - 2*t)*t;
  const lerp  = (a: number, b: number, t: number) => a + (b - a) * t;

  // ── GL state ──────────────────────────────────────────────────────────────
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
  gl.clearColor(0, 0, 0, 0);

  const vig = document.getElementById('vignette') as HTMLElement;
  const start = performance.now();
  let mx = 1e9, mz = 1e9;

  // ── Render loop ───────────────────────────────────────────────────────────
  function tick() {
    requestAnimationFrame(tick);
    const t = (performance.now() - start) / 1000;

    sSm += (sTgt - sSm) * 0.05;
    const sp = ease(Math.min(sSm, 1));

    vig.style.opacity = Math.max(0, 1 - sp * 3).toFixed(3);
    canvas.style.filter = sp > 0.01 ? `blur(${(sp * 5).toFixed(1)}px)` : 'none';

    // Camera
    const eye    = lerp3(C0pos, C1pos, sp);
    const target = lerp3(C0at,  C1at,  sp);
    const up     = norm3(lerp3(C0up, C1up, sp));
    const viewMat = lookAt(eye, target, up);

    // Cursor world pos
    if (cursorActive) {
      const hit = rayHitY0(_ndcX, _ndcY, viewMat, eye);
      if (hit) { mx = hit[0]; mz = hit[1]; } else { mx = 1e9; mz = 1e9; }
    }

    const pushFade = cursorActive ? Math.max(0, 1 - sp * 3.5) : 0;
    const isLight = document.documentElement.dataset.theme === 'light';
    const baseR = isLight ? 0.0 : 0.655;
    const baseG = isLight ? 0.0 : 0.545;
    const baseB = isLight ? 0.0 : 0.98;

    let maxY = 0.001;
    for (let i = 0; i < N; i++) {
      const wy = waveY(restX[i], restZ[i], t);
      wArr[i] = wy;
      if (Math.abs(wy) > maxY) maxY = Math.abs(wy);
    }

    for (let i = 0; i < N; i++) {
      const rx = restX[i], rz = restZ[i];

      if (cursorActive && pushFade > 1e-3) {
        const dx = curX[i] - mx, dz = curZ[i] - mz;
        const d2 = dx*dx + dz*dz;
        if (d2 < PR*PR && d2 > 1e-4) {
          const d = Math.sqrt(d2), str = (1 - d/PR) * PF * pushFade;
          velX[i] += (dx/d) * str * (1 - BIAS);
          velZ[i] += (dz/d) * str * (1 - BIAS) + str * BIAS;
        }
        velX[i] += (rx - curX[i]) * SPR; velX[i] *= DP; curX[i] += velX[i];
        velZ[i] += (rz - curZ[i]) * SPR; velZ[i] *= DP; curZ[i] += velZ[i];
      } else {
        velX[i] *= 0.5; velZ[i] *= 0.5;
        velX[i] += (rx - curX[i]) * 0.12; velZ[i] += (rz - curZ[i]) * 0.12;
        curX[i] += velX[i]; curZ[i] += velZ[i];
        if (Math.abs(rx - curX[i]) < 1e-3 && Math.abs(rz - curZ[i]) < 1e-3) {
          curX[i] = rx; curZ[i] = rz; velX[i] = 0; velZ[i] = 0;
        }
      }

      const I = i * 3;
      posArr[I]   = curX[i];
      posArr[I+1] = wArr[i] * sp;
      posArr[I+2] = curZ[i];

      const wy_n = (wArr[i] + maxY) / (2 * maxY);
      let wr: number, wg: number, wb: number;
      const ac = accent[i];

      if (isLight) {
        if      (ac === 1) { wr = wg = wb = 0.05 + wy_n * 0.12; }
        else if (ac === 2) { wr = wg = wb = 0.10 + wy_n * 0.15; }
        else if (ac === 3) { wr = wg = wb = 0.02 + wy_n * 0.10; }
        else               { wr = wg = wb = 0.07 + wy_n * 0.13; }
      } else {
        if      (ac === 1) { wr = 0.22 + wy_n*0.30; wg = 0.42 + wy_n*0.38; wb = 0.98; }
        else if (ac === 2) { wr = 0.78 + wy_n*0.18; wg = 0.12 + wy_n*0.28; wb = 0.88 + wy_n*0.10; }
        else if (ac === 3) { wr = 0.55 + wy_n*0.35; wg = 0.28 + wy_n*0.35; wb = 0.98; }
        else {
          const hi = Math.max(0, (wy_n - 0.25) / 0.75);
          wr = Math.min(1, 0.27 + hi*0.25);
          wg = Math.min(1, 0.10 + wy_n*0.22);
          wb = Math.min(1, 0.62 + wy_n*0.34);
        }
      }

      colArr[I]   = lerp(baseR, wr, sp);
      colArr[I+1] = lerp(baseG, wg, sp);
      colArr[I+2] = lerp(baseB, wb, sp);
    }

    // Upload to GPU
    gl!.bindBuffer(gl!.ARRAY_BUFFER, posBuf);
    gl!.bufferSubData(gl!.ARRAY_BUFFER, 0, posArr);
    gl!.bindBuffer(gl!.ARRAY_BUFFER, colBuf);
    gl!.bufferSubData(gl!.ARRAY_BUFFER, 0, colArr);

    // Blending mode
    if (isLight) gl!.blendFunc(gl!.SRC_ALPHA, gl!.ONE_MINUS_SRC_ALPHA);
    else         gl!.blendFunc(gl!.SRC_ALPHA, gl!.ONE);

    // Uniforms
    const ptSize = lerp(0.15, 0.32, sp);
    const scale  = projMat[5] * 0.5 * canvas.height; // matches Three.js sizeAttenuation

    gl!.clear(gl!.COLOR_BUFFER_BIT);
    gl!.uniformMatrix4fv(uView,  false, viewMat);
    gl!.uniformMatrix4fv(uProj,  false, projMat);
    gl!.uniform1f(uSize,  ptSize);
    gl!.uniform1f(uScale, scale);

    gl!.bindBuffer(gl!.ARRAY_BUFFER, posBuf);
    gl!.enableVertexAttribArray(aPos);
    gl!.vertexAttribPointer(aPos, 3, gl!.FLOAT, false, 0, 0);

    gl!.bindBuffer(gl!.ARRAY_BUFFER, colBuf);
    gl!.enableVertexAttribArray(aCol);
    gl!.vertexAttribPointer(aCol, 3, gl!.FLOAT, false, 0, 0);

    gl!.drawArrays(gl!.POINTS, 0, N);
  }

  tick();
})();
