/* Cinematic layer bootstrap — injects grain / vignette / letterbox and
   runs the intro. One file, loads on every page. Respects reduced-motion. */
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const body = document.body;

  const add = (cls, tag = 'div') => {
    const el = document.createElement(tag);
    el.className = cls;
    el.setAttribute('aria-hidden', 'true');
    body.appendChild(el);
    return el;
  };

  // Atmospherics (always present — cheap, no animation when reduced)
  add('cine-vignette');
  add('cine-grain');

  // Letterbox intro — only when motion is allowed
  if (!reduce) {
    add('cine-bar cine-bar--top');
    add('cine-bar cine-bar--bottom');
    // next frame → retract bars
    requestAnimationFrame(() => requestAnimationFrame(() => body.classList.add('cine-ready')));
  } else {
    body.classList.add('cine-ready');
  }

  // Hero pointer parallax — eased CSS vars the hero copy translates against.
  // Home page only, motion allowed only. Cheap: one rAF while pointer active.
  const hero = document.querySelector('.grid-container--home');
  if (hero && !reduce) {
    let tx = 0, ty = 0, cx = 0, cy = 0, ticking = false;
    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      body.style.setProperty('--px', cx.toFixed(3));
      body.style.setProperty('--py', cy.toFixed(3));
      if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) {
        requestAnimationFrame(tick);
      } else { ticking = false; }
    };
    window.addEventListener('pointermove', (e) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;   // -1..1
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!ticking) { ticking = true; requestAnimationFrame(tick); }
    }, { passive: true });
  }
})();
