/**
 * Crew portrait depth — the crew page's signature moment. The astronaut
 * portrait tilts in 3D toward the pointer over a holographic pedestal glow,
 * with a sheen that tracks the cursor. Pure CSS transforms driven by two vars
 * set here; no assets. Honors prefers-reduced-motion (no tilt).
 */
(() => {
  const stage = document.querySelector('.grid-container--crew');
  if (!stage) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const MAX = 7;            // max tilt degrees
  let raf = 0, trx = 0, try_ = 0, rx = 0, ry = 0, active = false;

  const tick = () => {
    rx += (trx - rx) * 0.12;
    ry += (try_ - ry) * 0.12;
    stage.style.setProperty('--rx', ry.toFixed(2) + 'deg');   // vertical pointer → X rot
    stage.style.setProperty('--ry', rx.toFixed(2) + 'deg');
    stage.style.setProperty('--sheen-x', (50 + rx * 4).toFixed(1) + '%');
    if (Math.abs(trx - rx) > 0.01 || Math.abs(try_ - ry) > 0.01) {
      raf = requestAnimationFrame(tick);
    } else { active = false; }
  };

  stage.addEventListener('pointermove', (e) => {
    const r = stage.getBoundingClientRect();
    trx = ((e.clientX - r.left) / r.width - 0.5) * 2 * MAX;    // -MAX..MAX
    try_ = -((e.clientY - r.top) / r.height - 0.5) * 2 * MAX;
    if (!active) { active = true; raf = requestAnimationFrame(tick); }
  }, { passive: true });

  stage.addEventListener('pointerleave', () => {
    trx = 0; try_ = 0;
    if (!active) { active = true; raf = requestAnimationFrame(tick); }
  });
})();
