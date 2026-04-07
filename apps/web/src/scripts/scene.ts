// Three.js dot grid + scroll wave morph
// Hero: flat Archer-style grid, top-down camera, spring cursor push
// Scroll: camera lerps to angled wave view, dots displace to 3D terrain

declare const THREE: any;

(function () {
  const canvas = document.getElementById('gl') as HTMLCanvasElement;
  const renderer = new THREE.WebGLRenderer({
    canvas, antialias: false, alpha: true, powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(innerWidth, innerHeight, false);
  renderer.setClearColor(0x000000, 0);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(76, innerWidth / innerHeight, 0.1, 200);

  function makeDotTex() {
    const sz = 64, c = document.createElement('canvas');
    c.width = c.height = sz;
    const cx = c.getContext('2d')!, r = sz * .5;
    const g = cx.createRadialGradient(r, r, 0, r, r, r);
    g.addColorStop(0,    'rgba(255,255,255,1.0)');
    g.addColorStop(0.18, 'rgba(255,255,255,0.90)');
    g.addColorStop(0.45, 'rgba(255,255,255,0.38)');
    g.addColorStop(0.75, 'rgba(255,255,255,0.07)');
    g.addColorStop(1,    'rgba(255,255,255,0.00)');
    cx.fillStyle = g; cx.fillRect(0, 0, sz, sz);
    return new THREE.CanvasTexture(c);
  }

  const COLS = 70, ROWS = 42, N = COLS * ROWS;
  const PW = 69, PH = 41;
  const SX = PW / (COLS - 1), SZ = PH / (ROWS - 1);

  const restX  = new Float32Array(N), restZ  = new Float32Array(N);
  const velX   = new Float32Array(N), velZ   = new Float32Array(N);
  const curX   = new Float32Array(N), curZ   = new Float32Array(N);
  const accentT = new Uint8Array(N);
  const hR = new Float32Array(N), hG = new Float32Array(N), hB = new Float32Array(N);
  const wArr = new Float32Array(N);

  for (let row = 0, idx = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++, idx++) {
      const x = -PW * .5 + col * SX, z = -PH * .5 + row * SZ;
      restX[idx] = x; restZ[idx] = z; curX[idx] = x; curZ[idx] = z;
      const rnd = Math.random();
      if      (rnd < 0.050) accentT[idx] = 1;
      else if (rnd < 0.080) accentT[idx] = 2;
      else if (rnd < 0.095) accentT[idx] = 3;
      hR[idx] = 0.655; hG[idx] = 0.545; hB[idx] = 0.980; // #a78bfa violet
    }
  }

  const geo = new THREE.BufferGeometry();
  const posArr = new Float32Array(N * 3), colArr = new Float32Array(N * 3);

  for (let i = 0; i < N; i++) {
    posArr[i*3] = curX[i]; posArr[i*3+1] = 0; posArr[i*3+2] = curZ[i];
    colArr[i*3] = hR[i];   colArr[i*3+1] = hG[i]; colArr[i*3+2] = hB[i];
  }

  const posAttr = new THREE.BufferAttribute(posArr, 3);
  const colAttr = new THREE.BufferAttribute(colArr, 3);
  posAttr.setUsage(THREE.DynamicDrawUsage);
  colAttr.setUsage(THREE.DynamicDrawUsage);
  geo.setAttribute('position', posAttr);
  geo.setAttribute('color',    colAttr);

  const mat = new THREE.PointsMaterial({
    size: 0.15, map: makeDotTex(), vertexColors: true,
    transparent: true, blending: THREE.AdditiveBlending,
    depthWrite: false, sizeAttenuation: true,
  });
  scene.add(new THREE.Points(geo, mat));

  const C0pos = new THREE.Vector3(0, 22, 0.001);
  const C0at  = new THREE.Vector3(0,  0, 0);
  const C0up  = new THREE.Vector3(0,  0, -1);
  const C1pos = new THREE.Vector3(0,  8, 22);
  const C1at  = new THREE.Vector3(0,  0, -6);
  const C1up  = new THREE.Vector3(0,  1,  0);

  camera.position.copy(C0pos);
  camera.up.copy(C0up);
  camera.lookAt(C0at);

  let sTgt = 0, sSm = 0;
  window.addEventListener('scroll', () => {
    sTgt = Math.min(1, Math.max(0, scrollY / innerHeight));
  }, { passive: true });

  const ray = new THREE.Raycaster();
  const mNDC = new THREE.Vector2(-9999, -9999);
  const mW = new THREE.Vector3();
  const yPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

  function setM(cx: number, cy: number) {
    mNDC.set((cx / innerWidth) * 2 - 1, -(cy / innerHeight) * 2 + 1);
  }
  window.addEventListener('mousemove',  (e: MouseEvent) => setM(e.clientX, e.clientY));
  window.addEventListener('mouseleave', () => mNDC.set(-9999, -9999));
  window.addEventListener('touchmove',  (e: TouchEvent) => setM(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
  window.addEventListener('touchend',   () => mNDC.set(-9999, -9999));

  const PR = 5.5, PF = 1.2, SPR = 0.065, DP = 0.72, BIAS = 0.65;

  function waveY(x: number, z: number, t: number) {
    return 2.5 * Math.exp(-((x * .16 + z * .07) ** 2) * .8) * Math.cos(x * .18 + z * .10 - t * 1.2)
         + 0.80 * Math.sin(x * .14 + t * .75) * Math.cos(z * .11 + t * .55)
         + 0.50 * Math.sin(x * .08 + z * .10 + t * .42)
         + 0.28 * Math.cos(x * .22 - t * 1.05);
  }

  const ease = (t: number) => t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  const lerp  = (a: number, b: number, t: number) => a + (b - a) * t;

  const vig = document.getElementById('vignette') as HTMLElement;

  window.addEventListener('resize', () => {
    renderer.setSize(innerWidth, innerHeight, false);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
  });

  const vP = new THREE.Vector3(), vA = new THREE.Vector3(), vU = new THREE.Vector3();
  const clock = new THREE.Clock();

  function tick() {
    requestAnimationFrame(tick);
    const t = clock.getElapsedTime();

    sSm += (sTgt - sSm) * 0.05;
    const sp = ease(Math.min(sSm, 1));

    vig.style.opacity = Math.max(0, 1 - sp * 3).toFixed(3);

    ray.setFromCamera(mNDC, camera);
    const hit = ray.ray.intersectPlane(yPlane, mW);
    const mx = hit ? mW.x : 1e9, mz = hit ? mW.z : 1e9;

    const pushFade = Math.max(0, 1 - sp * 3.5);

    const isLight = document.documentElement.dataset.theme === 'light';
    // Dark: #a78bfa violet  Light: #6d28d9 deep violet
    const baseR = isLight ? 0.427 : 0.655;
    const baseG = isLight ? 0.157 : 0.545;
    const baseB = isLight ? 0.851 : 0.980;

    let maxY = 0.001;
    for (let i = 0; i < N; i++) {
      const wy = waveY(restX[i], restZ[i], t);
      wArr[i] = wy;
      if (wy > maxY) maxY = wy; else if (-wy > maxY) maxY = -wy;
    }

    for (let i = 0; i < N; i++) {
      const rx = restX[i], rz = restZ[i];

      if (pushFade > 1e-3) {
        const dx = curX[i] - mx, dz = curZ[i] - mz;
        const d2 = dx * dx + dz * dz;
        if (d2 < PR * PR && d2 > 1e-4) {
          const d = Math.sqrt(d2);
          const str = (1 - d / PR) * PF * pushFade;
          const nx = dx / d, nz = dz / d;
          velX[i] += nx * str * (1 - BIAS);
          velZ[i] += nz * str * (1 - BIAS) + str * BIAS;
        }
        velX[i] += (rx - curX[i]) * SPR; velX[i] *= DP; curX[i] += velX[i];
        velZ[i] += (rz - curZ[i]) * SPR; velZ[i] *= DP; curZ[i] += velZ[i];
      } else {
        curX[i] += (rx - curX[i]) * .08;
        curZ[i] += (rz - curZ[i]) * .08;
      }

      const I = i * 3;
      posArr[I]   = curX[i];
      posArr[I+1] = wArr[i] * sp;
      posArr[I+2] = curZ[i];

      const wy_n = (wArr[i] + maxY) / (2 * maxY);
      let wr: number, wg: number, wb: number;
      const ac = accentT[i];
      if (isLight) {
        // Light: deep violets visible on white
        if (ac === 1) {
          // blue-violet accent
          wr = .15 + wy_n * .25; wg = .10 + wy_n * .25; wb = .80 + wy_n * .18;
        } else if (ac === 2) {
          // pink/rose accent
          wr = .65 + wy_n * .22; wg = .05 + wy_n * .10; wb = .55 + wy_n * .28;
        } else if (ac === 3) {
          // indigo accent
          wr = .35 + wy_n * .28; wg = .08 + wy_n * .12; wb = .72 + wy_n * .20;
        } else {
          const hi = Math.max(0, (wy_n - .25) / .75);
          wr = .30 + hi * .20; wg = .05 + wy_n * .18; wb = .65 + wy_n * .28;
          if (wr > 1) wr = 1; if (wg > 1) wg = 1; if (wb > 1) wb = 1;
        }
      } else {
        // Dark: bright violets / fuchsia on near-black
        if (ac === 1) {
          // electric blue-violet
          wr = .22 + wy_n * .30; wg = .42 + wy_n * .38; wb = .98;
        } else if (ac === 2) {
          // fuchsia / pink
          wr = .78 + wy_n * .18; wg = .12 + wy_n * .28; wb = .88 + wy_n * .10;
        } else if (ac === 3) {
          // lavender / soft violet
          wr = .55 + wy_n * .35; wg = .28 + wy_n * .35; wb = .98;
        } else {
          const hi = Math.max(0, (wy_n - .25) / .75);
          wr = .27 + hi * .25; wg = .10 + wy_n * .22; wb = .62 + wy_n * .34;
          if (wr > 1) wr = 1; if (wg > 1) wg = 1; if (wb > 1) wb = 1;
        }
      }

      colArr[I]   = lerp(baseR, wr, sp);
      colArr[I+1] = lerp(baseG, wg, sp);
      colArr[I+2] = lerp(baseB, wb, sp);
    }

    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;
    mat.size = lerp(.15, .32, sp);

    vP.lerpVectors(C0pos, C1pos, sp);
    vA.lerpVectors(C0at,  C1at,  sp);
    vU.lerpVectors(C0up,  C1up,  sp).normalize();
    camera.position.copy(vP);
    camera.up.copy(vU);
    camera.lookAt(vA);

    renderer.render(scene, camera);
  }

  tick();
})();
