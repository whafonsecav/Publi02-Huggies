/* =====================================================================
   ESCENAS 07–09 · ¿qué pasaría si…? · emociones · miedos por tallas
   (mismo contrato que escenas-a.js: todos los tiempos salen de T, es decir, de NARRACION)
   ===================================================================== */
(function () {
  'use strict';
  const M = KIT.M;
  const E = window.ESCENAS = window.ESCENAS || {};
  const q = (r, s) => r.querySelector(s);
  const qa = (r, s) => Array.from(r.querySelectorAll(s));

  /* =====================================================================
     07 · ¿QUÉ PASARÍA SI…? · cada provocación deja una pieza; al final encajan
     ===================================================================== */
  const PV = [
    { q: '¿Qué pasaría si dejáramos de decir que el pañal no se sale, y lo demostráramos?', a: 'Pasaríamos de la promesa a la prueba.', p: ['PRUEBA'] },
    { q: '¿Qué pasaría si la prueba no fuera en un laboratorio, sino en el peor escenario de la vida real?', a: 'Si aguanta lo peor, aguanta todo.', p: ['VIDA', 'REAL'] },
    { q: '¿Qué pasaría si el villano no fuera el bebé, sino el popó?', a: 'El bebé sigue siendo tierno, el popó es la amenaza, y el pañal, el héroe.', p: ['VILLANO', 'Y HÉROE'] },
    { q: `¿Qué pasaría si creáramos un espacio de lujo, todo blanco, donde el enemigo fuera la ${M.censor('m*erda')}?`, a: 'Una sola mancha sería una tragedia.', p: ['LUJO', 'BLANCO'] },
    { q: '¿Qué pasaría si lo que estuviera en riesgo fuera algo que nadie quiere perder?', a: 'Así, todos sentirían el miedo del papá.', p: ['LO VALIOSO', 'EN RIESGO'] },
    { q: '¿Qué pasaría si lo hiciéramos en vivo, para que nadie pudiera decir que es edición?', a: 'En vivo no hay trucos, y no saber el final engancha.', p: ['EN VIVO'] },
    { q: '¿Qué pasaría si le habláramos al papá cansado, y no a la ternura?', a: 'Del «¡qué bebé tan lindo!» al «te entiendo, parcero».', p: ['AL PAPÁ'] },
    { q: `¿Qué pasaría si dijéramos la grosería que todo papá piensa, pero tapada con un ${M.censor('«shhh»')}?`, a: 'Da risa, no ofende, y nadie la olvida.', p: ['«SHHH»'] }
  ];
  const BW = 800, BH = 450, CW = BW / 4, CH = BH / 2;
  // pieza de rompecabezas (con cuello) para la celda (c, r); dV/dH: dirección de cada pestaña interior
  const dV = [[1, -1], [-1, 1], [1, 1]], dH = [-1, 1, -1, 1];
  function edge(ax, ay, bx, by, b) {
    const dx = bx - ax, dy = by - ay, L = Math.hypot(dx, dy), nx = dy / L, ny = -dx / L;
    const P = (u, v) => `${(ax + u * dx + v * L * nx).toFixed(1)} ${(ay + u * dy + v * L * ny).toFixed(1)}`;
    if (!b) return `L${P(1, 0)}`;
    return `L${P(.36, 0)} C${P(.42, 0)} ${P(.45, .06 * b)} ${P(.41, .11 * b)} C${P(.35, .2 * b)} ${P(.40, .28 * b)} ${P(.5, .28 * b)} C${P(.6, .28 * b)} ${P(.65, .2 * b)} ${P(.59, .11 * b)} C${P(.55, .06 * b)} ${P(.58, 0)} ${P(.64, 0)} L${P(1, 0)}`;
  }
  function piecePath(c, r) {
    const x0 = c * CW, y0 = r * CH, x1 = x0 + CW, y1 = y0 + CH;
    const top = r === 0 ? 0 : -dH[c];          // la de arriba tiene su pestaña hacia abajo (+dH)
    const right = c === 3 ? 0 : dV[c][r];
    const bottom = r === 1 ? 0 : dH[c];
    const left = c === 0 ? 0 : -dV[c - 1][r];
    return `M${x0} ${y0} ${edge(x0, y0, x1, y0, top)} ${edge(x1, y0, x1, y1, right)} ${edge(x1, y1, x0, y1, bottom)} ${edge(x0, y1, x0, y0, left)} Z`;
  }
  E.s07 = {
    build(cam, T, tl, A, root) {
      root.dataset.legal = 'frames';
      const pieces = PV.map((v, k) => {
        const c = k % 4, r = Math.floor(k / 4), cx = c * CW + CW / 2, cy = r * CH + CH / 2, d = piecePath(c, r);
        const lines = v.p.map((t, j) => `<tspan x="${cx}" dy="${j ? 36 : (v.p.length > 1 ? -8 : 12)}">${t}</tspan>`).join('');
        return `<g class="pc" data-k="${k}"><clipPath id="pcl${k}"><path d="${d}"/></clipPath>
          <path class="pf" d="${d}" fill="url(#gGold)"/>
          <image class="pim" href="assets/piezas/img-01-keyvisual-campaignbrief.jpeg" x="0" y="0" width="${BW}" height="${BH}" preserveAspectRatio="xMidYMid slice" clip-path="url(#pcl${k})" opacity="0"/>
          <path class="ps" d="${d}" fill="none" stroke="#6F5122" stroke-width="3"/></g>`;
      }).join('');
      const labels = PV.map((v, k) => {
        const c = k % 4, r = Math.floor(k / 4), cx = c * CW + CW / 2, cy = r * CH + CH / 2, two = v.p.length > 1;
        const lines = v.p.map((t, j) => `<tspan x="${cx}" dy="${j ? 33 : (two ? -6 : 12)}">${t}</tspan>`).join('');
        return `<g class="ptg" data-k="${k}"><text class="pt" x="${cx}" y="${cy}" text-anchor="middle" font-family="Anton" font-size="${two ? 30 : 34}" fill="#FFFFFF" style="paint-order:stroke" stroke="rgba(80,55,20,.6)" stroke-width="5">${lines}</text></g>`;
      }).join('');
      cam.innerHTML = `
      <div class="lay s07-b0">
        <p class="ctr lbl o0 s07-2" style="top:250px">La segunda pregunta</p>
        <p class="ctr fri ink2 o0 s07-pl" style="top:300px;font-size:54px">para imaginar lo que nadie ha hecho</p>
        <p class="ctr anton au s07-t" style="top:400px;font-size:218px;line-height:.95">¿QUÉ PASARÍA SI…?</p>
      </div>
      <div class="lay s07-spk"></div>
      <div class="s07-hdr o0"><span class="fr gold">Segunda pregunta · lo que imaginamos</span></div>
      ${PV.map((v, k) => `
        <div class="s07-pv o0" data-k="${k}">
          <p class="fr ink s07-q">${v.q}</p>
          <p class="s07-a o0"><b class="anton red">R/.</b> <span class="fri">${v.a}</span></p>
        </div>`).join('')}
      <div class="s07-board o0">
        <p class="lbl s07-bl">La idea, pieza por pieza</p>
        <svg viewBox="-20 -20 ${BW + 40} ${BH + 40}" class="s07-svg" aria-hidden="true">
          <defs><pattern id="s07grid" width="25" height="25" patternUnits="userSpaceOnUse"><path d="M25 0H0V25" fill="none" stroke="rgba(143,111,51,.16)" stroke-width="1.2"/></pattern></defs>
          <rect class="bgr" x="0" y="0" width="${BW}" height="${BH}" rx="6" fill="url(#s07grid)" stroke="rgba(143,111,51,.35)" stroke-width="2"/>
          <g class="slots">${PV.map((v, k) => `<path class="sl" d="${piecePath(k % 4, Math.floor(k / 4))}" fill="none" stroke="#B9975A" stroke-width="2.5" stroke-dasharray="7 8"/>`).join('')}</g>
          <g class="pcs">${pieces}</g>
          <g class="pts">${labels}</g>
        </svg>
      </div>
      `;

      // ---------- beat 0: título + el plano en blanco de la idea
      A.rise(q(cam, '.s07-2'), T.w(0, ['segunda']) - .2, { y: 14 });
      A.rise(q(cam, '.s07-pl'), T.w(0, ['imaginar']) - .2, { y: 18 });
      tl.fromTo(q(cam, '.s07-t'), { scale: 1 }, { scale: 1.06, duration: .25, yoyo: true, repeat: 1, ease: 'power2.out', immediateRender: false }, T.w(0, ['que pasaria', 'pasaria']) - .1);
      A.sparkle(q(cam, '.s07-spk'), 960, 500, T.w(0, ['que pasaria', 'pasaria']), { n: 16, r: 700, size: 40 });
      const board = q(cam, '.s07-board'), hdr = q(cam, '.s07-hdr');
      // ---------- beats 1–8
      tl.to(q(cam, '.s07-b0'), { autoAlpha: 0, y: -40, duration: .35, ease: 'power2.in' }, T.b(1) - .5);
      A.rise(hdr, T.b(1) - .3, { y: -20 });
      tl.fromTo(board, { autoAlpha: 0, x: 120 }, { autoAlpha: 1, x: 0, duration: .8, ease: 'expo.out', immediateRender: false }, T.b(1) - .35);
      qa(board, '.sl').forEach((p, j) => A.draw(p, T.b(1) - .3 + j * .05, .6));
      const pvs = qa(cam, '.s07-pv'), pcs = qa(board, '.pc'), ptg = qa(board, '.ptg');
      tl.set(document.body, { '--subop': .75 }, T.b(1) - .05);
      tl.set(document.body, { '--subop': 1 }, T.b(9) - .05);
      pvs.forEach((g, k) => {
        const i = k + 1, t0 = T.b(i), ta = T.after(i, '?'), tn = k < 7 ? T.b(i + 1) : T.b(9);
        tl.fromTo(g, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: .55, ease: 'expo.out', immediateRender: false }, t0 - .05);
        A.rise(q(g, '.s07-a'), ta - .1, { y: 20 });
        tl.to(g, { autoAlpha: 0, y: -30, duration: .3, ease: 'power2.in' }, tn - .38);
        const cen = q(g, '.cen'); if (cen) A.censor(cen, k === 3 ? ta - .75 : ta - .55);
        // la pieza vuela desde la respuesta y encaja en su lugar del plano
        const pc = pcs[k], c = k % 4, r = Math.floor(k / 4);
        const cx = c * CW + CW / 2, cy = r * CH + CH / 2;
        const tp = ta + .35;
        tl.set([pc, ptg[k]], { autoAlpha: 0, svgOrigin: `${cx} ${cy}`, smoothOrigin: false }, 0);
        tl.fromTo([pc, ptg[k]], { autoAlpha: 0, x: -760 - cx * .4, y: 120 - cy * .2, rotation: -28, scale: 1.5 },
          { autoAlpha: 1, x: 0, y: 0, rotation: 0, scale: .94, duration: .9, ease: 'back.out(1.3)', immediateRender: false }, tp);
        tl.fromTo(q(pc, '.pf'), { filter: 'brightness(1.6)' }, { filter: 'brightness(1)', duration: .6, immediateRender: false }, tp + .8);
        A.shake(tp + .82, 4);
      });
      // ---------- beat 9: las 8 piezas encajan y se ve la campaña
      A.out(hdr, T.b(9) - .1, { d: .3 });
      const t9 = T.b(9);
      tl.to(board, { x: -480, y: 15, scale: 1.5, duration: 1.1, ease: 'expo.inOut' }, t9);
      tl.to(q(board, '.s07-bl'), { autoAlpha: 0, duration: .3 }, t9);
      tl.to(pcs, { scale: 1, duration: .7, ease: 'back.out(2)', stagger: .04 }, t9 + .7);
      tl.to(qa(board, '.pt'), { autoAlpha: 0, duration: .4 }, T.w(9, ['campana']) - .5);
      tl.to(qa(board, '.pim'), { opacity: 1, duration: .8, ease: 'power1.inOut', stagger: .05 }, T.w(9, ['campana']) - .5);
      tl.to(qa(board, '.ps'), { attr: { 'stroke-width': 1 }, stroke: '#F2D995', duration: .8 }, T.w(9, ['campana']));
      tl.to(qa(board, '.sl'), { autoAlpha: 0, duration: .3 }, t9 + .7);
      A.flash(T.w(9, ['ver']) - .1, { a: .35, d: .5 });
      tl.to(qa(board, '.ps'), { opacity: 0, duration: .6 }, T.w(9, ['ver']));
    }
  };

  /* =====================================================================
     08 · EMOCIONES (no sentimientos)
     ===================================================================== */
  const EMO = [
    { id: 'e04', n: 'TEMOR', c: '#7E57C2', w: ['temor'], y: 'El popó no avisa, y la alarma suena antes de pensar.' },
    { id: 'e05', n: 'DESAGRADO', c: '#3E9B57', w: ['desagrado'], y: 'Dato curioso: el popó de tu bebé te da menos asco que el de un bebé ajeno.', src: 'Case et al. (2006)' },
    { id: 'e06', n: 'SORPRESA', c: '#B8892F', w: ['sorpresa'], y: 'El escape llega sin aviso.' },
    { id: 'e03', n: 'FURIA', c: '#CD1618', w: ['furia'], y: 'Te dañó el plan… y la ropa nueva.' },
    { id: 'e02', n: 'TRISTEZA', c: '#3F7BD8', w: ['tristeza'], y: 'Por todo lo que se pierde, hasta la vida de antes.' },
    { id: 'e01', n: 'ALEGRÍA', c: '#E0A800', w: ['alegria'], y: 'Cuando revisas el pañal y dices «¡aguantó!».' }
  ];
  E.s08 = {
    build(cam, T, tl, A, root) {
      cam.innerHTML = `
      <div class="lay s08-b0">
        <p class="ctr anton au s08-em" style="top:300px;font-size:220px">EMOCIONES</p>
        <div class="s08-col s08-l o0"><span class="anton au s08-h">EMOCIÓN</span>
          <div class="s08-row o0"><svg viewBox="0 0 220 120"><path class="ecg" d="M0 70 H60 L78 30 L96 110 L112 10 L128 90 L140 70 H220" fill="none" stroke="#CD1618" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/></svg><b class="anton">EL CUERPO</b></div>
          <div class="s08-row o0"><svg viewBox="0 0 120 120"><circle cx="60" cy="66" r="44" fill="#fff" stroke="#8F6F33" stroke-width="7"/><path d="M52 14h16M60 14v8" stroke="#8F6F33" stroke-width="7" stroke-linecap="round"/><path class="sw" d="M60 66 V34" stroke="#CD1618" stroke-width="7" stroke-linecap="round"/></svg><b class="anton">DURA SEGUNDOS</b></div>
        </div>
        <p class="s08-ne anton red o0">≠</p>
        <div class="s08-col s08-r o0"><span class="anton gold-dk s08-h">SENTIMIENTO</span>
          <div class="s08-row o0"><svg viewBox="0 0 120 120"><path d="M30 96 C 6 60, 24 14, 66 14 C 100 14, 112 44, 104 66 L 112 84 L 100 86 L 98 104 L 74 102 L 70 112" fill="#fff" stroke="#8F6F33" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/><path class="spi" d="M66 52 a6 6 0 1 1 6 6 a12 12 0 1 1 -12 -12 a18 18 0 1 1 18 18" fill="none" stroke="#3F7BD8" stroke-width="5" stroke-linecap="round"/></svg><b class="anton">LA MENTE</b></div>
          <div class="s08-row o0"><svg viewBox="0 0 220 120"><path class="slow" d="M0 60 C 40 20, 70 20, 110 60 S 180 100, 220 60" fill="none" stroke="#3F7BD8" stroke-width="7" stroke-linecap="round"/></svg><b class="anton">DESPUÉS</b></div>
        </div>
      </div>
      <p class="ctr fr gold o0 s08-ek" style="top:150px;font-size:54px">Paul Ekman: 6 emociones básicas</p>
      <p class="ctr fri ink2 o0 s08-io" style="top:720px;font-size:46px"><i class="s08-io1"><b>Intensamente</b> usa 5…</i> <i class="s08-io2 o0" style="font-style:italic">y la sexta es la <b>sorpresa</b></i></p>
      <div class="s08-medals">${EMO.map((e, k) => `
        <div class="s08-md o0" data-k="${k}" style="left:${960 + (k - 2.5) * 270 - 110}px;--c:${e.c}">
          <figure class="slot round" data-slot="${e.id}" style="width:220px;height:220px"></figure><i class="rim"></i>
          <b class="anton s08-nm">${e.n}</b>
        </div>`).join('')}</div>
      <div class="s08-main">${EMO.map((e, k) => `
        <div class="s08-why o0" data-k="${k}"><span class="anton" style="color:${e.c}">${e.n}</span><p class="fr ink">${e.y}</p>${e.src ? `<em class="src">${e.src}</em>` : ''}</div>`).join('')}</div>
      <div class="s08-ta o0"><span class="anton" style="color:#7E57C2">TEMOR</span><svg viewBox="0 0 160 40"><path d="M4 20 H140 M120 6 L144 20 L120 34" fill="none" stroke="#CD1618" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg><span class="anton" style="color:#C99700">ALEGRÍA</span><em class="fri ink2">lo que la campaña quiere que sientas</em></div>
      <div class="lay s08-spk"></div>`;

      // ---------- beat 0: emoción (cuerpo · segundos) ≠ sentimiento (mente · después)
      const em = q(cam, '.s08-em');
      tl.fromTo(em, { scale: 1, letterSpacing: '0.006em' }, { scale: 1.05, letterSpacing: '0.04em', duration: .5, ease: 'expo.out', immediateRender: false }, T.w(0, ['emociones']) - .1);
      A.sparkle(q(cam, '.s08-spk'), 960, 420, T.w(0, ['emociones']), { n: 14, r: 620, size: 40 });
      tl.to(em, { autoAlpha: 0, scale: .6, y: -120, duration: .45, ease: 'power2.in' }, T.w(0, ['ojo']) + .2);
      const L = q(cam, '.s08-l'), R = q(cam, '.s08-r');
      A.rise(L, T.w(0, ['emociones'], 1) - .2, { y: 40 });
      A.pop(q(cam, '.s08-ne'), T.w(0, ['no']) - .1, { from: .2 });
      A.rise(R, T.w(0, ['sentimientos']) - .2, { y: 40 });
      const lr = qa(L, '.s08-row'), rr = qa(R, '.s08-row');
      A.rise(lr[0], T.w(0, ['reaccion', 'cuerpo']) - .2, { y: 20 });
      A.draw(q(L, '.ecg'), T.w(0, ['cuerpo']) - .2, .7, { ease: 'power1.inOut' });
      A.rise(lr[1], T.w(0, ['dura', 'segundos']) - .1, { y: 20 });
      tl.fromTo(q(L, '.sw'), { rotation: 0, svgOrigin: '60 66' }, { rotation: 360, svgOrigin: '60 66', duration: .9, ease: 'none', repeat: 1, immediateRender: false }, T.w(0, ['segundos']) - .1);
      A.rise(rr[0], T.w(0, ['mente']) - .25, { y: 20 });
      A.draw(q(R, '.spi'), T.w(0, ['mente']) - .1, 1.2);
      A.rise(rr[1], T.w(0, ['mente']) - .2, { y: 20 });
      A.draw(q(R, '.slow'), T.w(0, ['mente']) - .1, .5, { ease: 'sine.inOut' });
      // ---------- beat 1: seis medallas; Intensamente usa cinco; la sexta, sorpresa
      A.out(q(cam, '.s08-b0'), T.b(1) + .05, { d: .35, y: false });
      A.rise(q(cam, '.s08-ek'), T.b(1), { y: 18 });
      const mds = qa(cam, '.s08-md');
      mds.forEach((m, k) => tl.fromTo(m, { autoAlpha: 0, y: 160, rotation: -25 }, { autoAlpha: 1, y: 0, rotation: 0, duration: .7, ease: 'back.out(1.6)', immediateRender: false }, T.w(1, ['seis']) - .3 + k * .1));
      const io = q(cam, '.s08-io');
      A.rise(io, T.w(1, ['intensamente']) - .15, { y: 16 });
      mds.forEach((m, k) => { if (k !== 2) tl.fromTo(q(m, '.rim'), { opacity: 0, scale: .8 }, { opacity: 1, scale: 1, duration: .4, ease: 'back.out(2)', immediateRender: false }, T.w(1, ['intensamente']) + .1 + k * .08); });
      A.fade(q(cam, '.s08-io2'), T.w(1, ['sexta']) - .1, .4);
      tl.fromTo(mds[2], { y: 0 }, { y: -40, duration: .3, yoyo: true, repeat: 1, ease: 'power2.out', immediateRender: false }, T.w(1, ['sorpresa']) - .1);
      tl.fromTo(q(mds[2], '.rim'), { opacity: 0, scale: .8 }, { opacity: 1, scale: 1.08, duration: .4, ease: 'back.out(2)', immediateRender: false }, T.w(1, ['sorpresa']));
      // ---------- beats 2–7: una emoción por golpe
      const whys = qa(cam, '.s08-why');
      tl.to([q(cam, '.s08-ek'), io], { autoAlpha: 0, duration: .3 }, T.b(2) - .15);
      tl.to(qa(cam, '.s08-nm'), { autoAlpha: 0, duration: .3 }, T.b(2) - .15);
      const rail = k => ({ x: (k - 2.5) * 116 - (k - 2.5) * 270, y: -270, scale: .4 });
      EMO.forEach((e, k) => {
        const i = k + 2, t0 = T.b(i), tn = k < 5 ? T.b(i + 1) : T.dur + 1;
        mds.forEach((m, j) => {
          const R0 = rail(j);
          if (j === k) tl.to(m, { x: 420 - (960 + (j - 2.5) * 270), y: 60, scale: 1.75, rotationY: 360, transformPerspective: 900, duration: .7, ease: 'expo.inOut' }, t0 - .25);
          else tl.to(m, { x: R0.x, y: R0.y, scale: R0.scale, opacity: j < k ? .45 : 1, duration: .6, ease: 'expo.inOut' }, t0 - .2);
        });
        A.rise(whys[k], t0 + .05, { y: 30 });
        tl.fromTo(q(whys[k], '.anton'), { letterSpacing: '.3em' }, { letterSpacing: '.01em', duration: .7, ease: 'expo.out', immediateRender: false }, t0 + .05);
        tl.to(whys[k], { autoAlpha: 0, y: -24, duration: .3, ease: 'power2.in' }, tn - .3);
      });
      // alegría: brilla, y flecha TEMOR → ALEGRÍA
            tl.fromTo(q(mds[5], '.rim'), { scale: 1 }, { scale: 1.12, duration: .4, yoyo: true, repeat: 3, ease: 'sine.inOut', immediateRender: false }, T.w(7, ['aguanto']));
      A.sparkle(q(cam, '.s08-spk'), 420, 600, T.w(7, ['aguanto']), { n: 18, r: 360, size: 42 });
      A.rise(q(cam, '.s08-ta'), T.w(7, ['esa']) - .2, { y: 24 });
    }
  };

  /* =====================================================================
     09 · MIEDOS POR TALLAS (XS → XXL)
     ===================================================================== */
  const SZ = [
    { t: 'XS', w: 118, f: 'Que se arruine el plan', y: 'Una fuga no solo daña la ropa: daña la salida.', a: 'Atkinson (1957) · miedo al fracaso', s: ['equis ese', 'xs'] },
    { t: 'S', w: 146, f: 'Ser el que ensucia lo ajeno', y: 'Lo que toca el popó queda marcado, aunque lo laves.', a: 'Rozin, Millman y Nemeroff (1986) · ley del contagio', s: ['ese'] },
    { t: 'M', w: 180, f: 'Quedar en ridículo', y: 'Un escape en público acaba con la imagen de papá que lo tiene todo bajo control.', a: 'Keltner y Buswell (1997) · vergüenza social', s: ['eme'] },
    { t: 'L', w: 220, f: 'Que me juzguen como mal papá', y: 'Los jueces están en casa: 6 de cada 10 mamás han sido criticadas, sobre todo por la familia.', a: 'Mott Poll (2017)', s: ['ele'] },
    { t: 'XL', w: 262, f: 'Perder lo que tanto me costó', y: 'Perder duele casi el doble que ganar.', a: 'Kahneman y Tversky (1979) · aversión a la pérdida', s: ['equis ele'] },
    { t: 'XXL', w: 316, f: 'Perder la libertad', y: 'Si cada salida es un riesgo, uno termina encerrado.', a: 'Albrecht · miedo a perder la autonomía', s: ['doble'] }
  ];
  // ALTO-2: qué significa cada talla (de menor a mayor)
  const MEAN = ['incomoda un rato', 'molesta', 'se nota', 'pesa', 'duele', 'te encierra en la casa'];
  const DIA = (t, w, cls = '', mean = '') => `<div class="s09-dp ${cls}" style="width:${w}px;height:${Math.round(w * .85)}px"><svg viewBox="0 0 200 170"><use href="#diaper" width="200" height="170"/></svg><b class="anton" style="font-size:${Math.round(w * .3)}px">${t}</b>${mean ? `<i class="s09-mean fri o0">${mean}</i>` : ''}</div>`;
  E.s09 = {
    build(cam, T, tl, A, root) {
      cam.innerHTML = `
      <div class="lay s09-b0">
        <p class="ctr anton o0 s09-leg" style="top:150px;font-size:96px"><span class="red">TALLA</span> <span class="gold">= TAMAÑO DEL MIEDO</span></p>
        <p class="ctr fr ink s09-deb" style="top:250px;font-size:64px">Debajo de cada emoción hay un miedo</p>
      </div>
      <div class="s09-rail">${SZ.map((s, k) => DIA(s.t, s.w, '', MEAN[k])).join('')}</div>
      <div class="lay s09-b0b">
        <svg class="s09-arr o0" viewBox="0 0 1600 80"><defs><linearGradient id="s09g" x1="0" x2="1"><stop offset="0" stop-color="#D9B56A"/><stop offset="1" stop-color="#CD1618"/></linearGradient></defs><path d="M20 40 H1540 M1500 12 L1550 40 L1500 68" fill="none" stroke="url(#s09g)" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      ${SZ.map((s, k) => `
        <div class="lay s09-f o0" data-k="${k}">
          <div class="s09-big">${DIA(s.t, 400, 'hot')}</div>
          <div class="s09-gauge"><span class="lbl">tamaño del miedo</span><i>${SZ.map((z, j) => `<b class="${j <= k ? 'on' : ''}" style="height:${18 + j * 12}px"></b>`).join('')}</i></div>
          <p class="fri ink2 s09-gm o0"><b class="anton red">${s.t}</b> = ${MEAN[k]}</p>
          <div class="s09-txt"><p class="fr ink s09-fear o0">${s.f}</p><p class="fri ink2 s09-why o0">${s.y}</p><p class="src s09-au o0">${s.a}</p></div>
        </div>`).join('')}
      <div class="s09-moms o0">${Array.from({ length: 10 }, (_, k) => `<svg viewBox="0 0 80 120" class="mom${k < 6 ? ' hot' : ''}"><use href="#dad" width="80" height="120"/></svg>`).join('')}<b class="anton red">6 DE CADA 10</b></div>
      <div class="s09-bal o0"><svg viewBox="0 0 700 360">
        <path d="M350 60 V 320 M260 330 H 440" stroke="#8F6F33" stroke-width="12" stroke-linecap="round"/><circle cx="350" cy="56" r="16" fill="#8F6F33"/>
        <g class="beam"><path d="M90 60 H 610" stroke="#8F6F33" stroke-width="10" stroke-linecap="round"/>
          <g class="pl"><path d="M90 60 L 40 180 M90 60 L 140 180" stroke="#B9975A" stroke-width="4"/><path d="M20 180 H 160 Q 150 214 90 214 Q 30 214 20 180z" fill="#FFFFFF" stroke="#8F6F33" stroke-width="5"/><text x="90" y="160" text-anchor="middle" font-family="Anton" font-size="40" fill="#CD1618">PERDER</text></g>
          <g class="pr"><path d="M610 60 L 560 180 M610 60 L 660 180" stroke="#B9975A" stroke-width="4"/><path d="M540 180 H 680 Q 670 214 610 214 Q 550 214 540 180z" fill="#FFFFFF" stroke="#8F6F33" stroke-width="5"/><text x="610" y="160" text-anchor="middle" font-family="Anton" font-size="40" fill="#3E9B57">GANAR</text></g></g>
        <text class="x2" x="60" y="300" text-anchor="middle" font-family="Anton" font-size="84" fill="#CD1618">×2</text></svg>
        <div class="tag s09-tag o0"><span class="tl">lo que arriesgó la campaña</span><span class="tp"><sup>US$</sup>500.000</span></div></div>
      <div class="s09-lib o0"><span class="anton au">LIBERTAD</span><svg viewBox="0 0 120 150" class="lock"><path class="shk" d="M30 70 V 44 a30 30 0 0 1 60 0 V 70" fill="none" stroke="#CD1618" stroke-width="12" stroke-linecap="round"/><rect x="14" y="66" width="92" height="76" rx="14" fill="#CD1618"/><circle cx="60" cy="100" r="10" fill="#fff"/></svg>
        <img class="s09-hg o0" src="assets/logos/huggies-logo.svg" alt="Huggies"></div>
      <figure class="slot mul feather o0 s09-crawl" data-slot="p04" style="left:1600px;top:590px;width:260px;--fx:14%;--fy:14%"></figure>`;

      const rail = q(cam, '.s09-rail'), dps = qa(rail, '.s09-dp');
      // ---------- beat 0: la escala de tallas ya está cuando llega la onda; crece con "tallas"
      //   y cada talla dice qué significa mientras la flecha barre de XS a XXL (ALTO-2)
      const deb = q(cam, '.s09-deb');
      tl.to(deb, { autoAlpha: 0, y: -30, duration: .35 }, T.w(0, ['medimos']) - .3);
      A.track(q(cam, '.s09-leg'), T.w(0, ['tallas']) - .3, { d: .9, from: '.3em' });
      dps.forEach((d, k) => {
        tl.fromTo(d, { scale: 1, color: '#C9B48A' }, { scale: 1.22, color: '#8F6F33', duration: .28, yoyo: true, repeat: 1, ease: 'power2.out', immediateRender: false }, T.w(0, ['tallas', 'medimos']) + k * .12);
        tl.to(d, { color: '#8F6F33', duration: .2 }, T.w(0, ['tallas', 'medimos']) + k * .12 + .56);
      });
      const tA = T.w(0, ['equis']), tZ = T.w(0, ['doble']);
      A.draw(q(cam, '.s09-arr path'), tA - .2, tZ - tA + .6, { ease: 'power1.inOut' });
      A.show(q(cam, '.s09-arr'), tA - .2);
      const mEls = qa(rail, '.s09-mean');
      mEls.forEach((m, k) => {
        const t = tA + k * (tZ - tA) / 5 - .1;
        A.rise(m, t, { y: 12, d: .45 });
        tl.fromTo(dps[k], { scale: 1 }, { scale: 1.16, duration: .2, yoyo: true, repeat: 1, ease: 'power2.out', immediateRender: false }, t);
      });
      // ---------- beats 1–6: un miedo por talla, de menor a mayor
      tl.to(mEls, { autoAlpha: 0, duration: .25 }, T.b(1) - .75);
      tl.to([q(cam, '.s09-b0b')], { autoAlpha: 0, duration: .3 }, T.b(1) - .6);
      tl.to(q(cam, '.s09-leg'), { autoAlpha: 0, duration: .3 }, T.b(1) - .6);
      tl.to(rail, { y: -290, scale: .46, duration: .7, ease: 'expo.inOut' }, T.b(1) - .6);
      const fs = qa(cam, '.s09-f');
      SZ.forEach((s, k) => {
        const i = k + 1, t0 = T.b(i), tn = k < 5 ? T.b(i + 1) : T.dur + 1, g = fs[k];
        tl.fromTo(dps[k], { color: '#8F6F33' }, { color: '#CD1618', duration: .3, immediateRender: false }, t0 - .1);
        tl.fromTo(dps[k], { scale: 1 }, { scale: 1.2, duration: .4, ease: 'back.out(3)', immediateRender: false }, t0 - .1);
        if (k < 5) { tl.to(dps[k], { scale: 1, color: '#B9975A', duration: .3 }, tn - .2); }
        tl.fromTo(g, { autoAlpha: 0 }, { autoAlpha: 1, duration: .2, immediateRender: false }, t0 - .1);
        tl.fromTo(q(g, '.s09-big'), { scale: .3, rotation: -12 }, { scale: 1, rotation: 0, duration: .7, ease: 'back.out(1.7)', immediateRender: false }, t0 - .1);
        tl.fromTo(qa(g, '.s09-gauge b.on'), { scaleY: 0 }, { scaleY: 1, duration: .35, ease: 'back.out(2)', stagger: .07, immediateRender: false }, t0 + .2);
        tl.fromTo(q(g, '.s09-fear'), { autoAlpha: 0, x: 60 }, { autoAlpha: 1, x: 0, duration: .6, ease: 'expo.out', immediateRender: false }, t0 + .35);
        A.rise(q(g, '.s09-gm'), t0 + .55, { y: 14 });
        A.rise(q(g, '.s09-why'), (k === 2 ? T.w(i, ['porque']) : k === 3 ? T.w(i, ['jueces', 'y los']) : k === 4 ? T.w(i, ['perder'], 1)
          : k === 5 ? T.w(i, ['si cada', 'si']) : T.after(i, '.')) - .15, { y: 18 });
        A.fade(q(g, '.s09-au'), (k === 5 ? T.w(i, ['ese es', 'miedo']) : T.e(i) - 1.2), .5);
        if (k < 5) tl.to(g, { autoAlpha: 0, duration: .25 }, tn - .25);
      });
      // L · 6 de cada 10
      const moms = q(cam, '.s09-moms');
      A.rise(moms, T.w(4, ['seis']) - .3, { y: 30 });
      qa(moms, '.mom.hot').forEach((m, j) => tl.fromTo(m, { color: '#D9B56A' }, { color: '#CD1618', duration: .3, immediateRender: false }, T.w(4, ['seis']) + j * .1));
      tl.to(moms, { autoAlpha: 0, duration: .25 }, T.b(5) - .25);
      // XL · la balanza: perder pesa el doble
      const bal = q(cam, '.s09-bal');
      A.rise(bal, T.w(5, ['perder'], 1) - .3, { y: 30 });
      tl.fromTo(q(bal, '.beam'), { rotation: 0, svgOrigin: '350 60' }, { rotation: -14, svgOrigin: '350 60', duration: 1.2, ease: 'elastic.out(1,.4)', immediateRender: false }, T.w(5, ['doble']) - .2);
      tl.fromTo([q(bal, '.pl'), q(bal, '.pr')], { rotation: 0, svgOrigin: '90 60' }, { rotation: 0, duration: .1, immediateRender: false }, T.w(5, ['doble']));
      A.pop(q(bal, '.x2'), T.w(5, ['doble']) + .1, { from: .3 });
      A.pop(q(bal, '.s09-tag'), T.w(5, ['medio']) - .2, { from: .5, rot: -10 });
      tl.to(bal, { autoAlpha: 0, duration: .25 }, T.b(6) - .25);
      // XXL · la libertad, encerrada… y Huggies abre el candado
      const lib = q(cam, '.s09-lib');
      A.rise(lib, T.w(6, ['libertad']) - .2, { y: 30 });
      tl.fromTo(q(lib, '.lock'), { autoAlpha: 0, y: -80 }, { autoAlpha: 1, y: 0, duration: .5, ease: 'bounce.out', immediateRender: false }, T.w(6, ['encerrado']) - .3);
      tl.fromTo(q(lib, '.anton'), { filter: 'grayscale(0)' }, { filter: 'grayscale(1) brightness(.85)', duration: .4, immediateRender: false }, T.w(6, ['encerrado']));
      tl.fromTo(q(lib, '.shk'), { y: 0 }, { y: -26, duration: .4, ease: 'back.out(3)', immediateRender: false }, T.w(6, ['jaguis', 'resolver']) - .1);
      tl.to(q(lib, '.anton'), { filter: 'grayscale(0) brightness(1)', duration: .5 }, T.w(6, ['jaguis', 'resolver']));
      A.pop(q(lib, '.s09-hg'), T.w(6, ['jaguis', 'resolver']), { from: .3 });
      const cr = q(cam, '.s09-crawl');
      tl.fromTo(cr, { autoAlpha: 0, x: -260 }, { autoAlpha: 1, x: 0, duration: 2.2, ease: 'power1.out', immediateRender: false }, T.w(6, ['jaguis', 'resolver']) - .2);
      tl.fromTo(cr, { y: 0 }, { y: -6, duration: .22, yoyo: true, repeat: 9, ease: 'sine.inOut', immediateRender: false }, T.w(6, ['jaguis', 'resolver']) - .2);
    }
  };
})();
