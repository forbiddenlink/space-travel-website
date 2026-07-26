/**
 * Destination 3D planet — the page's signature moment.
 * A textured sphere (real NASA / Solar System Scope maps) you can drag to
 * rotate, with a fresnel atmosphere rim and a slow ambient spin. Crossfades
 * between Moon / Mars / Europa / Titan when the destination tab changes.
 *
 * Progressive enhancement: only runs when #planet-canvas exists and WebGL is
 * available. Falls back to the flat <picture> images otherwise. Caps DPR,
 * pauses on tab hide, disposes GPU resources on teardown. Honors
 * prefers-reduced-motion (drag still works, ambient spin off, on-demand render).
 *
 * Textures — see /textures + README credits:
 *   Moon, Mars: Solar System Scope (CC BY 4.0)
 *   Europa: NASA/JPL/USGS Voyager–Galileo mosaic (public domain)
 *   Titan: NASA/JPL/Space Science Institute Cassini map (public domain)
 */
// three + OrbitControls are dynamic-imported inside boot() so the ~550KB
// library is code-split out of the destination page's critical render path.
let THREE, OrbitControls;

const canvas = document.getElementById('planet-canvas');
const stage = canvas && canvas.closest('.planet-stage');
const main = document.querySelector('.grid-container--destination');

// map the tab's data-image id → texture + a rim tint that suits the body
const BODIES = {
  'moon-image':   { url: '/textures/2k_moon.jpg', rim: [0.55, 0.62, 0.85] },
  'mars-image':   { url: '/textures/2k_mars.jpg', rim: [1.0, 0.55, 0.32] },
  'europa-image': { url: '/textures/europa.jpg',  rim: [0.6, 0.85, 1.0] },
  'titan-image':  { url: '/textures/titan.jpg',   rim: [1.0, 0.72, 0.30] },
};

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')));
  } catch (e) { return false; }
}

if (canvas && stage && main && hasWebGL()) {
  // defer three's download + parse until the browser is idle post-paint
  const start = () => boot();
  if ('requestIdleCallback' in window) requestIdleCallback(start, { timeout: 1500 });
  else setTimeout(start, 200);
}

async function boot() {
  // lazily load three (its own code-split chunk)
  THREE = await import('three');
  ({ OrbitControls } = await import('three/addons/controls/OrbitControls.js'));

  // `?freeze` renders one static frame (for screenshots / low-power capture)
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    || /[?&]freeze/.test(location.search);

  // 3D is taking over the image slot — hide the flat <picture> fallbacks
  main.classList.add('has-planet');

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0, 2.7);

  // lighting: fill ambient + a near-white key for a real terminator without
  // blowing out surface albedo (keep detail readable, not overexposed)
  scene.add(new THREE.AmbientLight(0x3a4a66, 1.95));
  const key = new THREE.DirectionalLight(0xfff6ee, 1.7);
  key.position.set(3, 1.4, 2.2);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0x35508f, 0.6);
  fill.position.set(-3, -1, -1.5);
  scene.add(fill);

  // world group holds planet + rim + rings so they can be scaled together
  // (e.g. zoom out for Titan so its rings fit the frame)
  const world = new THREE.Group();
  scene.add(world);

  const loader = new THREE.TextureLoader();
  const geo = new THREE.SphereGeometry(1, 96, 96);

  const material = new THREE.MeshStandardMaterial({
    roughness: 1.0, metalness: 0.0, transparent: true, opacity: 1,
  });
  const planet = new THREE.Mesh(geo, material);
  planet.rotation.y = Math.PI; // face the prime meridian toward camera
  world.add(planet);

  // fresnel atmosphere rim — a slightly larger back-facing sphere, additive
  const rimUniforms = {
    uColor: { value: new THREE.Color(0.6, 0.75, 1.0) },
    uPower: { value: 3.2 },
  };
  const rim = new THREE.Mesh(
    new THREE.SphereGeometry(1.06, 64, 64),
    new THREE.ShaderMaterial({
      uniforms: rimUniforms,
      transparent: true,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexShader: `
        varying vec3 vN; varying vec3 vP;
        void main(){ vN = normalize(normalMatrix * normal);
          vec4 mv = modelViewMatrix * vec4(position,1.0); vP = mv.xyz;
          gl_Position = projectionMatrix * mv; }`,
      fragmentShader: `
        uniform vec3 uColor; uniform float uPower;
        varying vec3 vN; varying vec3 vP;
        void main(){ vec3 v = normalize(-vP);
          float f = pow(1.0 - max(dot(v, vN), 0.0), uPower);
          gl_FragColor = vec4(uColor * f, f); }`,
    })
  );
  world.add(rim);

  // Saturn-style rings — shown only for Titan (its blurb mentions the Rings).
  const RING_OUTER = 2.0, RING_INNER = 1.35;
  const rings = new THREE.Mesh(
    new THREE.CircleGeometry(RING_OUTER, 160),
    new THREE.ShaderMaterial({
      transparent: true, side: THREE.DoubleSide, depthWrite: false,
      uniforms: { uInner: { value: RING_INNER }, uOuter: { value: RING_OUTER } },
      vertexShader: `
        varying vec2 vL;
        void main(){ vL = position.xy;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
      fragmentShader: `
        precision highp float; varying vec2 vL;
        uniform float uInner; uniform float uOuter;
        void main(){
          float r = length(vL);
          if (r < uInner || r > uOuter) discard;
          float t = (r - uInner) / (uOuter - uInner);
          float bands = 0.5 + 0.5 * sin(r * 55.0);
          float a = 0.30 + 0.45 * bands;
          a *= smoothstep(0.0, 0.04, abs(t - 0.60));   // Cassini division gap
          a *= smoothstep(0.0, 0.07, t) * smoothstep(1.0, 0.88, t);
          vec3 col = mix(vec3(0.72,0.63,0.47), vec3(0.93,0.88,0.74), bands);
          gl_FragColor = vec4(col, a * 0.9);
        }`,
    })
  );
  rings.rotation.x = -0.62;      // open the ring ellipse toward the camera
  rings.rotation.z = 0.20;
  rings.visible = false;
  world.add(rings);

  const controls = new OrbitControls(camera, canvas);
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.rotateSpeed = 0.5;
  controls.autoRotate = !reduce;
  controls.autoRotateSpeed = 0.45;

  let current = null;

  function applyTexture(id, animate) {
    const body = BODIES[id];
    if (!body) return;
    current = id;
    rings.visible = (id === 'titan-image');
    // Titan: scale the whole world down so its rings fit the frame
    world.scale.setScalar(id === 'titan-image' ? 0.5 : 1);
    loader.load(body.url, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
      const old = material.map;
      material.map = tex;
      material.needsUpdate = true;
      if (old) old.dispose();
      rimUniforms.uColor.value.setRGB(body.rim[0], body.rim[1], body.rim[2]);
      if (reduce) renderOnce();
    }, undefined, (err) => console.error('[planet] LOAD FAILED', body.url, err));
    if (animate && !reduce) {
      // quick scale/opacity "materialize" on swap
      planet.scale.setScalar(0.9);
      material.opacity = 0.0;
      tweenIn();
    }
  }

  let tweenRAF = 0;
  function tweenIn() {
    cancelAnimationFrame(tweenRAF);
    const t0 = performance.now();
    const step = (now) => {
      const k = Math.min(1, (now - t0) / 520);
      const e = 1 - Math.pow(1 - k, 3);
      material.opacity = e;
      planet.scale.setScalar(0.9 + 0.1 * e);
      if (k < 1) tweenRAF = requestAnimationFrame(step);
    };
    tweenRAF = requestAnimationFrame(step);
  }

  // initial body = currently selected tab (or Moon)
  const selectedTab = document.querySelector('.grid-container--destination [role="tab"][aria-selected="true"]')
    || document.querySelector('.grid-container--destination [role="tab"][data-image]');
  applyTexture(selectedTab ? selectedTab.getAttribute('data-image') : 'moon-image', false);

  // crossfade when a destination tab is chosen (runs after tabs.js handler)
  document.querySelectorAll('.grid-container--destination [role="tab"][data-image]').forEach((tab) => {
    tab.addEventListener('click', () => {
      const id = tab.getAttribute('data-image');
      if (id && id !== current) applyTexture(id, true);
    });
  });

  // sizing — keep the renderer square to the stage
  function resize() {
    // stage is a square (aspect-ratio:1); derive both dims from width so the
    // canvas can never feed its own height back into layout.
    const w = stage.clientWidth;
    if (!w) return;
    const h = w;
    renderer.setSize(w, h, false);
    camera.aspect = 1;
    camera.updateProjectionMatrix();
    if (reduce) renderOnce();
  }
  const ro = new ResizeObserver(resize);
  ro.observe(stage);
  resize();

  function renderOnce() {
    controls.update();
    renderer.render(scene, camera);
  }

  // render loop (continuous when motion allowed; on-demand otherwise)
  let raf = 0, running = false;
  function loop() {
    if (!running) return;
    controls.update();
    renderer.render(scene, camera);
    raf = requestAnimationFrame(loop);
  }
  function start() { if (!running) { running = true; raf = requestAnimationFrame(loop); } }
  function stop() { running = false; if (raf) cancelAnimationFrame(raf); }

  if (reduce) {
    renderOnce();
    controls.addEventListener('change', renderOnce);
  } else {
    start();
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop(); else start();
    });
  }

  // teardown — free GPU memory
  window.addEventListener('pagehide', () => {
    stop();
    ro.disconnect();
    controls.dispose();
    geo.dispose();
    material.map && material.map.dispose();
    material.dispose();
    rim.geometry.dispose();
    rim.material.dispose();
    rings.geometry.dispose();
    rings.material.dispose();
    renderer.dispose();
  }, { once: true });
}
