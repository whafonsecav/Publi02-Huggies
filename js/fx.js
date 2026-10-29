/* =====================================================================
   FX · el estudio nunca está quieto
   - Damasco (3–4 %) cuyo motivo es, en secreto, una espiral de popó tipo helado suave.
   - Talco: partículas blancas y doradas que flotan (canvas).
   - window.FXCTRL.speed: las escenas lo animan (p. ej. 0 = "se congela el mundo").
   ===================================================================== */
(function () {
  'use strict';
  const REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const G = '#8F6F33';
  window.FXCTRL = { speed: 1, reset() { this.speed = 1; } };

  function damaskSVG() {
    const swirl = (cx, cy, s) => `
      <g transform="translate(${cx} ${cy}) scale(${s})" fill="${G}">
        <path d="M-38 30c-10 0-10-15 4-17 15-2 53-2 68 0 14 2 14 17 4 17z"/>
        <path d="M-27 12c-8-2-6-14 4-15 14-2 32-2 46 0 10 1 12 13 4 15z"/>
        <path d="M-17-4c-6-2-4-11 4-12 8-1 18-1 25 1 8 2 6 11 2 11z"/>
        <path d="M-9-16c-1-10 13-9 15-17 1-6-5-9-9-7 8-3 14 3 12 11-2 8-10 10-3 13z"/>
      </g>`;
    const scroll = (flip) => `
      <g transform="translate(150 0) scale(${flip} 1) translate(-150 0)" fill="none" stroke="${G}" stroke-width="2.4" stroke-linecap="round">
        <path d="M150 52c-40 22-62 58-58 98 3 34 26 52 26 80"/>
        <path d="M118 230c-26 2-44-18-36-38 6-14 26-12 26 2 0 9-11 10-13 3"/>
        <path d="M96 140c-26-6-40-30-28-48 8-12 26-8 24 6-1 8-11 8-12 2"/>
        <path d="M120 300c-18-10-24-30-12-44" /><path d="M108 112c-12 8-14 22-6 30" />
      </g>`;
    const rosette = (x, y) => `
      <g transform="translate(${x} ${y})" fill="${G}">
        <circle r="7"/><path d="M0-24c6 8 6 12 0 16-6-4-6-8 0-16zM0 24c6-8 6-12 0-16-6 4-6 8 0 16zM-24 0c8-6 12-6 16 0-4 6-8 6-16 0zM24 0c-8-6-12-6-16 0 4 6 8 6 16 0z"/>
      </g>`;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="380" viewBox="0 0 300 380">
      ${scroll(1)}${scroll(-1)}${swirl(150, 176, 0.9)}
      <path d="M128 214h44l-6 14h-32z" fill="${G}" opacity=".9"/><path d="M142 228h16l-3 22h-10z" fill="${G}" opacity=".75"/>
      ${rosette(0, 0)}${rosette(300, 0)}${rosette(0, 380)}${rosette(300, 380)}${rosette(0, 190)}${rosette(300, 190)}
    </svg>`;
    return 'url("data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg) + '")';
  }

  const P = [];
  let ctx, cv, last = 0, mode = 'show';
  const sprites = {};
  function sprite(kind, r) {
    const key = kind + r;
    if (sprites[key]) return sprites[key];
    const s = document.createElement('canvas'); const d = Math.ceil(r * 4); s.width = s.height = d;
    const c = s.getContext('2d'); const g = c.createRadialGradient(d / 2, d / 2, 0, d / 2, d / 2, d / 2);
    if (kind === 'talc') {
      g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(.35, 'rgba(255,255,255,.95)');
      g.addColorStop(.55, 'rgba(206,190,160,.30)'); g.addColorStop(1, 'rgba(206,190,160,0)');
    } else {
      g.addColorStop(0, 'rgba(242,217,149,1)'); g.addColorStop(.4, 'rgba(217,181,106,.85)'); g.addColorStop(1, 'rgba(188,146,74,0)');
    }
    c.fillStyle = g; c.fillRect(0, 0, d, d); sprites[key] = s; return s;
  }
  function seed() {
    P.length = 0;
    const n = REDUCED ? 40 : 120;
    for (let i = 0; i < n; i++) {
      const gold = Math.random() < .3, z = .25 + Math.random() * .75;
      P.push({ x: Math.random() * 1920, y: Math.random() * 1080, z,
        r: gold ? (0.8 + Math.random() * 1.6) : (1.4 + Math.random() * 3.2) * z,
        vy: -(0.05 + Math.random() * 0.28) * z, vx: (Math.random() - .5) * .08,
        ph: Math.random() * 6.28, sp: .004 + Math.random() * .01, kind: gold ? 'gold' : 'talc',
        a: gold ? .5 + Math.random() * .5 : .5 + Math.random() * .45 });
    }
  }
  function frame(t) {
    const raw = Math.min(50, t - last || 16) / 16.67; last = t;
    const dt = raw * Math.max(0, window.FXCTRL.speed);
    ctx.clearRect(0, 0, 1920, 1080);
    for (const p of P) {
      if (!REDUCED) {
        p.ph += p.sp * dt; p.y += p.vy * dt; p.x += (p.vx + Math.sin(p.ph) * .18 * p.z) * dt;
        if (p.y < -20) { p.y = 1100; p.x = Math.random() * 1920; }
        if (p.x < -20) p.x = 1940; if (p.x > 1940) p.x = -20;
      }
      let a = p.a;
      if (p.kind === 'gold') a *= .55 + .45 * Math.sin(p.ph * 3.1);
      if (mode === 'wait') a *= p.kind === 'gold' ? .9 : 1.1;
      ctx.globalAlpha = Math.max(0, Math.min(1, a));
      const s = sprite(p.kind, Math.max(1, Math.round(p.r)));
      ctx.drawImage(s, p.x - s.width / 2, p.y - s.height / 2);
    }
    ctx.globalAlpha = 1;
    if (!REDUCED) requestAnimationFrame(frame);
  }
  window.FX = {
    init() {
      const url = damaskSVG();
      const dm = document.getElementById('damask'); if (dm) dm.style.backgroundImage = url;
      const wt = document.getElementById('wait'); if (wt) wt.style.setProperty('--damask', url);
      cv = document.getElementById('fx'); ctx = cv.getContext('2d'); seed();
      if (REDUCED) frame(0); else requestAnimationFrame(frame);
    },
    setMode(m) { mode = m; }
  };
})();
