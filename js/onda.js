/* =====================================================================
   ONDA · transición entre escenas: "onda de mal olor" roja Huggies
   1. La escena que sale "se marea": vapor ondulante (feTurbulence + feDisplacementMap) y leve vaivén.
   2. Una onda roja (#CD1618) líquida y sinuosa, con borde oscuro y brillo, barre la pantalla.
   3. Encima, 4 líneas de "olor" (eses de caricatura) en blanco y rojo oscuro suben y se deshacen.
   4. El borde de salida, también ondulado, revela la escena nueva (que se "asienta" del mareo).
   Duración ≈ 1,0 s. Cada vez cambia la dirección, la semilla y la forma de la onda.
   ===================================================================== */
(function () {
  'use strict';
  const W = 1920, H = 1080, NS = 'http://www.w3.org/2000/svg';
  const svg = document.getElementById('onda');
  const P = { rim: svg.querySelector('.o-rim'), red: svg.querySelector('.o-red'), inn: svg.querySelector('.o-in'), hi: svg.querySelector('.o-hi'), lines: svg.querySelector('.o-lines') };
  const turb = document.getElementById('ondaTurb'), disp = document.getElementById('ondaDisp');
  const turb2 = document.getElementById('ondaTurb2'), disp2 = document.getElementById('ondaDisp2');
  const DIRS = ['r', 'l', 'u', 'd', 'r', 'l'];
  let lastDir = null, count = 0;

  const rnd = (a, b) => a + Math.random() * (b - a);
  function params() {
    let dir; do { dir = DIRS[Math.floor(Math.random() * DIRS.length)]; } while (dir === lastDir);
    lastDir = dir; count++;
    const horiz = dir === 'r' || dir === 'l';
    const L = horiz ? W : H, C = horiz ? H : W;   // L: eje de avance · C: eje transversal
    const wave = () => ({ a1: rnd(46, 84), l1: rnd(420, 780), p1: rnd(0, 6.28), a2: rnd(14, 26), l2: rnd(170, 260), p2: rnd(0, 6.28), k: rnd(5, 9) * (Math.random() < .5 ? -1 : 1) });
    return { dir, horiz, L, C, tilt: rnd(-.16, .16), lead: wave(), trail: wave(), inner: wave(), pad: 300 };
  }
  // posición del borde (en el eje de avance) para la coordenada transversal v
  function edgeAt(base, v, w, P0, tau) {
    return base + P0.tilt * (v - P0.C / 2) + w.a1 * Math.sin(6.2832 * v / w.l1 + w.p1 + w.k * tau) + w.a2 * Math.sin(6.2832 * v / w.l2 + w.p2 - w.k * 1.7 * tau);
  }
  function map(P0, u, v) {
    switch (P0.dir) {
      case 'r': return [u, v];
      case 'l': return [W - u, v];
      case 'd': return [v, u];
      default: return [v, H - u];   // 'u'
    }
  }
  function edgePts(P0, base, w, tau) {
    const pts = [];
    for (let v = -40; v <= P0.C + 40; v += 24) pts.push([edgeAt(base, v, w, P0, tau), v]);
    return pts;
  }
  function band(P0, trailBase, leadBase, wT, wL, tau) {
    const a = edgePts(P0, trailBase, wT, tau), b = edgePts(P0, leadBase, wL, tau).reverse();
    let d = '';
    a.concat(b).forEach(([u, v], i) => { const [x, y] = map(P0, u, v); d += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1); });
    return d + 'Z';
  }
  function line(P0, base, w, tau) {
    let d = '';
    edgePts(P0, base, w, tau).forEach(([u, v], i) => { const [x, y] = map(P0, u, v); d += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1); });
    return d;
  }
  // eses de "olor" de caricatura
  function squiggle(x, y, h, amp) {
    let d = `M${x.toFixed(1)} ${y.toFixed(1)}`;
    const n = 4;
    for (let k = 0; k < n; k++) d += ` q ${(k % 2 ? amp : -amp).toFixed(1)} ${(-h / (2 * n)).toFixed(1)} 0 ${(-h / n).toFixed(1)}`;
    return d;
  }

  function play(opts) {
    const { outEl, onCover, onDone, covered } = opts || {};
    const P0 = params();
    const st = { lead: covered ? P0.L + P0.pad : -P0.pad, trail: -P0.pad, tau: 0, warp: 0, warp2: 0 };
    turb.setAttribute('seed', String(Math.floor(rnd(1, 999))));
    turb2.setAttribute('seed', String(Math.floor(rnd(1, 999))));
    const bf = rnd(.005, .008);
    turb.setAttribute('baseFrequency', `${bf.toFixed(4)} ${(bf * 2.6).toFixed(4)}`);

    // líneas de olor
    P.lines.innerHTML = '';
    const lines = [];
    // dos o tres grupos de tres eses paralelas (las clásicas líneas de olor de caricatura)
    const nG = 2 + (count % 2);
    for (let g = 0; g < nG; g++) {
      const gx = W * (.2 + .6 * (g + .5) / nG) + rnd(-60, 60), gy = rnd(720, 880), h = rnd(260, 340), amp = rnd(24, 32);
      const col = g % 2 ? '#7E0B0E' : '#FFFFFF';
      for (let i = 0; i < 3; i++) {
        const p = document.createElementNS(NS, 'path');
        p.setAttribute('d', squiggle(gx + (i - 1) * 58, gy - (i === 1 ? 40 : 0), h * (i === 1 ? 1.12 : 1), amp));
        p.setAttribute('stroke', col);
        p.setAttribute('stroke-width', '13');
        p.setAttribute('opacity', g % 2 ? '.88' : '.95');
        p.dataset.g = g;
        P.lines.appendChild(p); lines.push(p);
      }
    }
    let inEl = null, swapped = false;
    const draw = () => {
      const t = st.tau;
      P.rim.setAttribute('d', band(P0, st.trail - 46, st.lead + 46, P0.trail, P0.lead, t));
      P.red.setAttribute('d', band(P0, st.trail, st.lead, P0.trail, P0.lead, t * 1.1));
      P.inn.setAttribute('d', band(P0, st.trail + 150, st.lead - 150, P0.inner, P0.inner, -t * 1.3));
      P.hi.setAttribute('d', line(P0, st.lead - 16, P0.lead, t * 1.1));
      disp.setAttribute('scale', st.warp.toFixed(1));
      disp2.setAttribute('scale', st.warp2.toFixed(1));
      // Chrome no repinta un elemento HTML si solo cambian los atributos del filtro SVG:
      // un saturate() casi invisible que cambia en cada cuadro obliga a recalcularlo
      if (outEl && !swapped) outEl.style.filter = `url(#ondaWarp) saturate(${(1 + st.warp / 900).toFixed(4)})`;
      if (inEl && inEl.style && st.warp2 > .05) inEl.style.filter = `url(#ondaWarp2) saturate(${(1 + st.warp2 / 900).toFixed(4)})`;
      else if (inEl && inEl.style) inEl.style.filter = '';
    };
    gsap.set(svg, { visibility: 'visible' });
    if (outEl) { outEl.style.filter = 'url(#ondaWarp)'; }
    const tl = gsap.timeline({
      onUpdate: draw,
      onComplete() {
        gsap.set(svg, { visibility: 'hidden' });
        if (inEl) { inEl.style.filter = ''; gsap.set(inEl, { clearProps: 'x,y,rotation,scale' }); }
        P.lines.innerHTML = '';
        onDone && onDone();
      }
    });
    const cover = () => {
      if (swapped) return; swapped = true;
      if (outEl) { outEl.style.filter = ''; gsap.set(outEl, { clearProps: 'x,y,rotation,scale' }); }
      inEl = onCover ? onCover() : null;
      if (inEl && inEl.style) { inEl.style.filter = 'url(#ondaWarp2)'; }
    };
    const sgn = Math.random() < .5 ? -1 : 1;
    if (covered) {
      tl.add(cover, 0);
      tl.to(st, { trail: P0.L + P0.pad, duration: .9, ease: 'power2.inOut' }, 0)
        .to(st, { tau: 1, duration: .9, ease: 'none' }, 0);
    } else {
      tl.to(st, { lead: P0.L + P0.pad, duration: .52, ease: 'power2.inOut' }, 0)
        .to(st, { warp: 120, duration: .5, ease: 'power1.in' }, 0)
        .add(cover, .52)
        .to(st, { trail: P0.L + P0.pad, duration: .54, ease: 'power2.inOut' }, .42)
        .fromTo(st, { warp2: 38 }, { warp2: 0, duration: .5, ease: 'power2.out', immediateRender: false }, .52)
        .to(st, { tau: 1, duration: 1.02, ease: 'none' }, 0);
      if (outEl) tl.to(outEl, { rotation: sgn * .7, scale: 1.025, duration: .5, ease: 'sine.inOut' }, 0);
    }
    // las líneas de olor suben, se dibujan y se deshacen
    lines.forEach((p, i) => {
      const d0 = (covered ? .05 : .18) + (+p.dataset.g) * .09 + (i % 3) * .035;
      tl.fromTo(p, { drawSVG: '0% 0%' }, { drawSVG: '0% 100%', duration: .38, ease: 'sine.out', immediateRender: true }, d0)
        .fromTo(p, { y: 30 }, { y: -170, duration: .78, ease: 'sine.out', immediateRender: true }, d0)
        .to(p, { drawSVG: '100% 100%', duration: .36, ease: 'sine.in' }, d0 + .4)
        .to(p, { opacity: 0, duration: .2 }, d0 + .45);
    });
    // bocanadas: círculos blancos al 18 % que suben con las eses y se disuelven
    for (let j = 0; j < 4; j++) {
      const c = document.createElementNS(NS, 'circle');
      c.setAttribute('class', 'o-puff');
      c.setAttribute('cx', (W * (.22 + .56 * Math.random())).toFixed(0)); c.setAttribute('cy', rnd(560, 820).toFixed(0)); c.setAttribute('r', rnd(34, 70).toFixed(0));
      P.lines.appendChild(c);
      const d0 = (covered ? .05 : .22) + j * .08;
      tl.fromTo(c, { opacity: 0, y: 30, scale: .6, transformOrigin: '50% 50%' }, { opacity: .18, y: -90, scale: 1.1, duration: .35, ease: 'sine.out', immediateRender: true }, d0)
        .to(c, { opacity: 0, y: -220, scale: 1.5, duration: .4, ease: 'sine.in' }, d0 + .35);
    }
    draw();
    return tl;
  }
  window.ONDA = { play };
})();
