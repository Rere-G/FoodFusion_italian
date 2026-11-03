/* =====================================================================
   hero-motion.js: the moving Amalfi scene on the homepage hero.

   Parts of the SVG are marked with data-motion="...":
     waves   drift left and right          glint   sparkle on the sea
     boat    bobs up and down              gust    wind line blowing across
     branch  sways from its right end      lemon   swings from its stem
     sprig   the small lemon on the card corner, swings like a lemon

   Why JavaScript and not only CSS animation?
   CSS loops repeat the same movement for ever, with nothing linking the
   parts. Here one "wind" value drives everything: when a gust line
   reaches the tree, the branch bends and the lemons swing harder, and
   moving the mouse over the hero adds a breeze. The lemons use a small
   physics rule (a damped spring, like a real pendulum), so they speed
   up, overshoot and settle naturally.

   Accessibility and performance:
   - If the visitor's device is set to "reduce motion", nothing moves.
   - The animation pauses when the hero is scrolled off screen, and the
     browser pauses requestAnimationFrame in hidden tabs.
   ===================================================================== */

'use strict';

(function () {
  const scene = document.getElementById('heroScene');
  if (!scene) return;

  const hero = scene.closest('.hero');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const TAU = Math.PI * 2;      // one full turn, in radians
  const GUST_PERIOD = 8;        // seconds for one wind line to blow across

  /* ---------- Read the marked parts once --------------------------- */

  // Read a number from a data- attribute, with a fallback
  const readNumber = (el, name, fallback) =>
    el.dataset[name] !== undefined ? Number(el.dataset[name]) : fallback;

  // data-pivot="1440 40" -> [1440, 40]: the point a part rotates around
  const readPivot = el => el.dataset.pivot.split(' ').map(Number);

  const findAll = name => Array.from(document.querySelectorAll(`[data-motion="${name}"]`));

  const waves = findAll('waves').map(el => ({
    el,
    amp: readNumber(el, 'amp', 22),        // how far it drifts (SVG units)
    period: readNumber(el, 'period', 14),  // seconds for a full left-right-left
    offset: readNumber(el, 'offset', 0)    // seconds, so the layers are out of step
  }));

  const glints = findAll('glint').map(el => ({ el, offset: readNumber(el, 'offset', 0) }));

  const boats = findAll('boat').map(el => {
    // Bob around the middle of the boat's bottom edge
    const box = el.getBBox();
    return { el, offset: readNumber(el, 'offset', 0), x: box.x + box.width / 2, y: box.y + box.height };
  });

  const gusts = findAll('gust').map(el => ({ el, offset: readNumber(el, 'offset', 0) }));

  const branchEl = scene.querySelector('[data-motion="branch"]');
  const branch = branchEl ? { el: branchEl, pivot: readPivot(branchEl) } : null;

  // Lemons and the card's sprig all swing like pendulums
  const swingers = [...findAll('lemon'), ...findAll('sprig')].map(el => ({
    el,
    pivot: readPivot(el),
    omega: TAU / readNumber(el, 'period', 4),  // natural swing speed
    amp: readNumber(el, 'amp', 6),             // normal swing size, in degrees
    offset: readNumber(el, 'offset', 0),
    angle: 0,                                  // current angle (degrees)
    velocity: 0                                // degrees per second
  }));


  /* ---------- Wind ---------------------------------------------------- */

  let breeze = 0;   // extra wind from the mouse, fades away by itself
  let wind = 0;     // smoothed total wind, 0 = calm

  // Moving the mouse sideways over the hero stirs up a breeze
  hero.addEventListener('pointermove', event => {
    breeze = Math.min(1.5, breeze + Math.abs(event.movementX || 0) * 0.01);
  }, { passive: true });

  // How far through its journey a gust line is: 0 = start, 1 = end
  const gustProgress = (gust, time) => ((time + gust.offset) % GUST_PERIOD) / GUST_PERIOD;

  // Each gust pushes on the tree during the last part of its journey
  function gustWind(time) {
    let total = 0;
    gusts.forEach(gust => {
      const p = gustProgress(gust, time);
      if (p > 0.55) total += Math.sin(Math.PI * (p - 0.55) / 0.45);
    });
    return Math.min(total, 1.5);
  }


  /* ---------- One animation frame ------------------------------------ */

  function draw(time, dt) {
    // Total wind, smoothed so it never jumps
    breeze *= Math.exp(-1.5 * dt);
    const target = gustWind(time) + breeze;
    wind += (target - wind) * Math.min(1, dt * 3);

    // Waves: gentle side-to-side drift
    waves.forEach(w => {
      const x = w.amp * Math.sin(TAU * (time + w.offset) / w.period);
      w.el.setAttribute('transform', `translate(${x.toFixed(2)} 0)`);
    });

    // Glints: fade in and out every 3.2 seconds
    glints.forEach(g => {
      const opacity = 0.45 * (1 - Math.cos(TAU * (time + g.offset) / 3.2));
      g.el.setAttribute('opacity', opacity.toFixed(3));
    });

    // Boats: rise and fall 4px and rock 2 degrees each way, every 4 seconds
    boats.forEach(b => {
      const s = 0.5 - 0.5 * Math.cos(TAU * (time + b.offset) / 4);  // 0 -> 1 -> 0
      const tilt = -2 + 4 * s;
      b.el.setAttribute('transform', `translate(0 ${(4 * s).toFixed(2)}) rotate(${tilt.toFixed(2)} ${b.x} ${b.y})`);
    });

    // Gust lines: blow from left to right, fading in and out
    gusts.forEach(g => {
      const p = gustProgress(g, time);
      const x = -160 + 420 * p;
      let opacity = 0.8;
      if (p < 0.2) opacity = 0.8 * (p / 0.2);
      else if (p > 0.75) opacity = 0.8 * (1 - (p - 0.75) / 0.25);
      g.el.setAttribute('transform', `translate(${x.toFixed(1)} 0)`);
      g.el.setAttribute('opacity', opacity.toFixed(3));
    });

    // Branch: slow sway, bent further by the wind
    if (branch) {
      const angle = 1.4 * Math.sin(TAU * time / 6) + 1.6 * wind;
      branch.el.setAttribute('transform', `rotate(${angle.toFixed(3)} ${branch.pivot[0]} ${branch.pivot[1]})`);
    }

    // Lemons: a damped spring (pendulum).
    //   pull back to hanging straight  = -omega² × angle
    //   air slows it down              = -damping × velocity
    //   push from the breeze and wind  = drive
    const damping = 0.8;
    swingers.forEach(s => {
      const calmPush = damping * s.omega * s.amp * Math.sin(s.omega * (time + s.offset));
      const windPush = -s.omega * s.omega * s.amp * 1.2 * wind;  // blows the lemon to the right
      const acceleration = -s.omega * s.omega * s.angle - damping * s.velocity + calmPush + windPush;
      s.velocity += acceleration * dt;
      s.angle += s.velocity * dt;
      s.el.setAttribute('transform', `rotate(${s.angle.toFixed(3)} ${s.pivot[0]} ${s.pivot[1]})`);
    });
  }

  // Put everything back to its still position
  function rest() {
    [...waves, ...boats, ...swingers].forEach(part => part.el.removeAttribute('transform'));
    if (branch) branch.el.removeAttribute('transform');
    gusts.forEach(g => { g.el.removeAttribute('transform'); g.el.setAttribute('opacity', '0'); });
    glints.forEach(g => g.el.setAttribute('opacity', '0'));
  }


  /* ---------- Start, pause and stop ---------------------------------- */

  let frameId = null;
  let lastTimestamp = null;
  let elapsed = 0;          // seconds of animation so far
  let heroVisible = true;

  function frame(timestamp) {
    // Time since the last frame, capped so a slow frame cannot make the physics jump
    const dt = lastTimestamp === null ? 0 : Math.min((timestamp - lastTimestamp) / 1000, 0.05);
    lastTimestamp = timestamp;
    elapsed += dt;
    draw(elapsed, dt);
    frameId = requestAnimationFrame(frame);
  }

  function start() {
    if (frameId !== null || !heroVisible || reduceMotion.matches) return;
    lastTimestamp = null;
    frameId = requestAnimationFrame(frame);
  }

  function stop() {
    if (frameId === null) return;
    cancelAnimationFrame(frameId);
    frameId = null;
  }

  // Pause while the hero is scrolled out of view
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      heroVisible = entries[0].isIntersecting;
      heroVisible ? start() : stop();
    }).observe(hero);
  }

  // Follow the "reduce motion" setting, even if it is changed while the page is open
  reduceMotion.addEventListener('change', () => {
    if (reduceMotion.matches) { stop(); rest(); } else { start(); }
  });

  start();
})();
