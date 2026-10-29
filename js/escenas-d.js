/* =====================================================================
   ESCENAS 10–12 · los insights · el insight principal · gracias
   (mismo contrato que escenas-a.js: todos los tiempos salen de T, es decir, de NARRACION)
   ===================================================================== */
(function () {
  'use strict';
  const M = KIT.M;
  const E = window.ESCENAS = window.ESCENAS || {};
  const q = (r, s) => r.querySelector(s);
  const qa = (r, s) => Array.from(r.querySelectorAll(s));

  // los 12 insights narrados (v5: la voz los lee todos) · posición final en la nube: [x centro, y centro, escala, giro]
  const INS = [
    { t: 'Más vale prevenir que *limpiar.*', f: 'fr', s: [350, 168, .3, -3] },
    { t: 'Mi bebé es un angelito… *con detonador.*', f: 'anton', s: [1570, 168, .27, 2] },
    { t: 'El silencio de un bebé después del tetero no es paz: *es cuenta regresiva.*', f: 'fr', s: [350, 330, .27, 2] },
    { t: 'Ojos que no ven, *sofá que no sufre.*', f: 'anton', s: [1570, 330, .27, -2] },
    { t: 'Yo no cancelo planes: *los cancela el pañal.*', f: 'fr', s: [350, 492, .28, -2] },
    { t: 'En casa ajena, el popó vale *el doble.*', f: 'anton', s: [1570, 492, .27, 3] },
    { t: 'Cuando él puja, *el que suda soy yo.*', f: 'fr', s: [350, 654, .28, 2] },
    { t: 'Mi suegra no mira al bebé: *mira el sofá.*', f: 'anton', s: [1570, 654, .27, -2] },
    { t: 'Lo visto de blanco con fe… *y lo lavo con rabia.*', f: 'fr', s: [350, 816, .27, -1] },
    { t: 'Prefiero cargar tres mudas *que una vergüenza.*', f: 'anton', s: [1570, 816, .26, 2] },
    { t: 'Una fuga… *y se acabó la visita.*', f: 'fr', s: [960, 178, .3, -1] },
    { t: 'El blanco es para valientes… *o para los que no tienen hijos.*', f: 'fr', s: [960, 490, .4, 0] }
  ];
  const NI = INS.length;
  const EXTRA = [];
  const insHTML = (o, k) => {
    const parts = o.t.split('*');
    const words = [];
    parts.forEach((p, j) => p.split(/\s+/).filter(Boolean).forEach(w => words.push(`<span class="iw o0${j % 2 ? ' em' : ''}">${w}</span>`)));
    return `<p class="s10-in ${o.f === 'anton' ? 'anton' : 'fr'} o0" data-k="${k}">${words.join(' ')}</p>`;
  };
  const cloudHTML = (cls) => INS.map((o, k) => `<p class="s10-cl ${o.f === 'anton' ? 'anton' : 'fr'} ${cls}" style="left:${o.s[0]}px;top:${o.s[1]}px;transform:translate(-50%,-50%) rotate(${o.s[3]}deg) scale(${o.s[2]})">${o.t.replace(/\*/g, '')}</p>`).join('') +
    EXTRA.map(x => `<p class="s10-ex fri ${cls}" style="left:${x[1]}px;top:${x[2]}px;transform:translate(-50%,-50%) rotate(${x[3]}deg)">«${x[0]}»</p>`).join('');

  /* =====================================================================
     10 · LOS INSIGHTS · ráfaga de tipografía cinética
     ===================================================================== */
  E.s10 = {
    build(cam, T, tl, A) {
      cam.innerHTML = `
      <div class="lay s10-b0">
        <svg class="s10-mesa o0" viewBox="0 0 1400 40"><path d="M10 20 H1390" stroke="#D9B56A" stroke-width="8" stroke-linecap="round"/></svg>
        ${['LAS PREGUNTAS', 'LAS EMOCIONES', 'LOS MIEDOS'].map((w, k) => `<span class="s10-chip anton o0" style="left:${330 + k * 440}px">${w}</span>`).join('')}
        <p class="ctr fr gold s10-mt" style="top:380px;font-size:60px">Sobre la mesa…</p>
        <div class="lay s10-sp"></div>
        <p class="ctr anton au-sheen o0 s10-t" style="top:230px;font-size:300px;line-height:.95">INSIGHTS</p>
        <p class="ctr fri ink2 o0 s10-c" style="top:560px;font-size:58px"><span class="s10-c1">cortos,</span> <span class="s10-c2 o0">y en la voz del papá</span></p>
        <svg class="s10-qm o0" viewBox="0 0 200 160"><path d="M20 150 Q 0 60 70 10 L 82 30 Q 46 62 56 92 Q 92 92 92 124 Q 92 156 58 156 Q 30 156 20 150z M120 150 Q 100 60 170 10 L 182 30 Q 146 62 156 92 Q 192 92 192 124 Q 192 156 158 156 Q 130 156 120 150z" fill="#D9B56A"/></svg>
      </div>
      <div class="lay s10-big">${INS.map(insHTML).join('')}</div>
      <div class="lay s10-cloud">${EXTRA.map(x => `<p class="s10-ex fri o0" style="left:${x[1]}px;top:${x[2]}px;transform:translate(-50%,-50%) rotate(${x[3]}deg)">«${x[0]}»</p>`).join('')}</div>`;

      // ---------- beat 0: la mesa ya está servida cuando llega la onda (preguntas, emociones, miedos)
      const mesa = q(cam, '.s10-mesa');
      A.show(mesa, 0);
      const chips = qa(cam, '.s10-chip');
      A.show(chips, 0);
      [T.w(0, ['preguntas']), T.w(0, ['emociones']), T.w(0, ['miedos'])].forEach((t, k) => {
        tl.fromTo(chips[k], { y: 0, scale: 1 }, { y: -46, scale: 1.12, duration: .22, yoyo: true, repeat: 1, ease: 'power2.out', immediateRender: false }, t - .1);
        tl.fromTo(chips[k], { filter: 'brightness(1)' }, { filter: 'brightness(1.35)', duration: .3, immediateRender: false }, t - .1);
      });
      const tIn = T.w(0, ['insaits', 'insights']);
      // las tres fichas "se cocinan" y saltan: de ahí salen los insights
      tl.to(chips, { y: -330, autoAlpha: 0, scale: .4, rotation: (k) => (k - 1) * 30, duration: .5, ease: 'expo.in', stagger: .06 }, tIn - .6);
      tl.to(mesa, { autoAlpha: 0, duration: .4 }, tIn - .4);
      tl.to(q(cam, '.s10-mt'), { autoAlpha: 0, y: -30, duration: .35 }, tIn - .65);
      A.sparkle(q(cam, '.s10-sp'), 960, 600, tIn - .2, { n: 22, r: 620, size: 44 });
      A.track(q(cam, '.s10-t'), tIn - .45, { d: 1 });
      A.show(q(cam, '.s10-c'), T.w(0, ['cortos']) - .1);
      A.rise(q(cam, '.s10-c1'), T.w(0, ['cortos']) - .1, { y: 16 });
      A.rise(q(cam, '.s10-c2'), T.w(0, ['voz']) - .2, { y: 16 });
      A.pop(q(cam, '.s10-qm'), T.w(0, ['papa']) - .1, { from: .3, rot: -20 });
      // ---------- beats 1–NI: la ráfaga (v4.1, CRÍTICO-1)
      //   la base de cada insight entra de un golpe con la voz (letras que caen en cascada);
      //   el remate rojo cae exactamente cuando la voz lo dice; la frase se va cuando EMPIEZA la siguiente.
      A.out(q(cam, '.s10-b0'), T.b(1) - .38, { d: .3, y: -40 });
      const bigs = qa(cam, '.s10-in');
      tl.set(bigs, { xPercent: -50, yPercent: -50 }, 0);
      // v4.2 (N-2): cuando entra la siguiente, la frase anterior SUBE (más pequeña, nítida y completa)
      // y se queda legible hasta cumplir ≥ 1,6 s completa; recién entonces vuela, tenue y desenfocada, a la nube.
      const UP = -300, US = .55;
      INS.forEach((o, k) => {
        const i = k + 1, p = bigs[k], ws = qa(p, '.iw');
        const sp = T.spread(i, ws.length);
        const iEm = ws.findIndex(w => w.classList.contains('em'));
        A.show(p, T.b(i) - .05);
        const alt = k % 3;   // tres maneras de caer, para que la ráfaga no sea monótona
        let tFull = T.b(i) + ws.length * .045 + .42;
        ws.forEach((w, j) => {
          const em = iEm >= 0 && j >= iEm;
          const t = em ? sp[iEm] - .05 + (j - iEm) * .06 : T.b(i) + (k ? .15 : 0) + j * .045;
          const from = em ? { autoAlpha: 0, scale: 1.7 } : alt === 0 ? { autoAlpha: 0, y: 46, rotationX: -70 } : alt === 1 ? { autoAlpha: 0, x: -60, skewX: 18 } : { autoAlpha: 0, y: -40, rotation: -6 };
          tl.fromTo(w, from, { autoAlpha: 1, scale: 1, x: 0, y: 0, rotationX: 0, rotation: 0, skewX: 0, duration: em ? .32 : .42, ease: em ? 'expo.out' : 'back.out(1.6)', immediateRender: false }, t);
          tFull = Math.max(tFull, t + (em ? .32 : .42));
        });
        if (iEm >= 0) { A.shake(sp[iEm] + .1, 5); A.flash(sp[iEm] - .02, { a: .22, d: .25 }); }
        const S = o.s;
        if (k < NI - 1) {
          const tUp = T.b(i + 1) - .05;
          tl.to(p, { y: UP, scale: US, duration: .45, ease: 'power3.out' }, tUp);
          tl.to(ws, { color: '#6F5122', duration: .4 }, tUp);
          const nextUp = k < NI - 2 ? T.b(i + 2) - .2 : T.b(NI) + 1.2;
          const tOut = Math.min(Math.max(tFull + 1.6, tUp + .9), nextUp);
          tl.to(p, { x: S[0] - 960, y: S[1] - 470, scale: S[2], rotation: S[3], opacity: .1, filter: 'blur(1.5px)', duration: .35, ease: 'power3.in' }, tOut);
        } else {
          const tOut = T.e(i) + .5;
          tl.to(p, { x: S[0] - 960, y: S[1] - 470, scale: S[2], rotation: S[3], duration: .6, ease: 'expo.inOut' }, tOut);
          tl.to(ws, { color: '#6F5122', duration: .4 }, tOut);
        }
      });
      tl.to(bigs.slice(0, NI - 1), { opacity: 1, filter: 'blur(0px)', duration: .4, stagger: .03 }, Math.min(T.e(NI) + .1, T.dur - 1.1));   // v5: la escena cierra antes; la nube se enciende completa
      qa(cam, '.s10-cloud .s10-ex').forEach((x, k) => A.fade(x, T.e(NI) + .9 + k * .18, .5));
    }
  };

  /* =====================================================================
     11 · EL INSIGHT PRINCIPAL Y LA IDEA
     ===================================================================== */
  E.s11 = {
    build(cam, T, tl, A, root) {
      root.dataset.legal = 'frames';
      const L1 = 'No le tengo miedo al popó.'.split(' '), L2 = 'Le tengo miedo a'.split(' '), L3 = 'dónde va a terminar.'.split(' ');
      cam.innerHTML = `
      <div class="lay s11-cloud">${cloudHTML('s11-c')}</div>
      <div class="s11-light o0"></div>
      <div class="s11-ins">
        <svg class="s11-qm o0" viewBox="0 0 200 160"><path d="M20 150 Q 0 60 70 10 L 82 30 Q 46 62 56 92 Q 92 92 92 124 Q 92 156 58 156 Q 30 156 20 150z M120 150 Q 100 60 170 10 L 182 30 Q 146 62 156 92 Q 192 92 192 124 Q 192 156 158 156 Q 130 156 120 150z" fill="#D9B56A"/></svg>
        <p class="fr ink s11-l1">${L1.map(w => `<span class="iw o0">${w}</span>`).join(' ')}</p>
        <p class="fr ink s11-l2">${L2.map(w => `<span class="iw o0">${w}</span>`).join(' ')}</p>
        <p class="fr red s11-l3">${L3.map(w => `<span class="iw dn o0">${w}</span>`).join(' ')}</p>
      </div>
      <div class="s11-src">${[['Lo que vimos', 'todos hablan de dónde termina'], ['La emoción', 'el popó propio da poco asco'], ['Los miedos', 'dañar lo ajeno y lo que piensen los demás']].map((c, k) => `
        <div class="o0" style="left:${180 + k * 540}px"><svg viewBox="0 0 20 120" class="ln"><path d="M10 0 V120" stroke="#D9B56A" stroke-width="5" stroke-dasharray="3 9" stroke-linecap="round"/></svg><span class="lbl">${c[0]}</span><p class="fr ink">${c[1]}</p></div>`).join('')}</div>
      <div class="s11-plate o0"><img class="plate" src="assets/piezas/img-04-reasonwhy-hero.jpg" alt=""></div>
      <p class="s11-donde anton o0">DÓNDE</p>
      <div class="s11-end o0"><img class="plate" src="assets/fallback/set-cierre.jpg" alt="">
        <div class="ctr s11-lg o0" style="top:150px"><img src="assets/logos/huggies-logo.svg" alt="Huggies" style="width:260px"></div>
        <div class="sup s11-endsup" style="top:300px;--ss:64px;--sb:210px"><span class="s" style="visibility:hidden">Si aguanta medio millón de dólares…</span><span class="b o0 s11-s2">AGUANTA TU SOFÁ</span></div>
      </div>
      <div class="sup s11-s1w" style="top:300px;--ss:64px"><span class="s o0 s11-s1">Si aguanta medio millón de dólares…</span></div>
      <div class="s11-prof o0">
        <p class="s11-pt">APLICANDO A LA PUBLICIDAD</p>
        <div class="s11-mon"><div class="scr"><video muted playsinline preload="auto" src="assets/video/huggies-expensive-shit-teaser.mp4"></video></div><i class="neck"></i><i class="foot"></i></div>
        <dl class="s11-dl">
          ${[['¿SI HA VISTO CUANDO?', 'R/. Alguien le pone una toalla al sofá ajeno… porque ¿y si se sale?'], ['¿QUÉ PASARÍA SI?', 'R/. …lo demostráramos en vivo, en un lujo todo blanco, con lo más valioso en riesgo.'],
            ['EMOCIONES:', 'temor y desagrado → alegría'], ['MIEDO:', 'perder la libertad (XXL)'], ['INSIGHT:', '«No le tengo miedo al popó. Le tengo miedo a dónde va a terminar.»']].map((d, k) => `
            <div class="o0${k === 4 ? ' ins' : ''}"><dt>${d[0]}</dt><dd>${d[1]}</dd></div>`).join('')}
        </dl>
      </div>`;

      // ---------- beat 0: todo lo aprendido se funde en una sola luz
      const cl = qa(cam, '.s11-c');
      const tJ = T.w(0, ['juntamos']);
      cl.forEach((c, k) => tl.to(c, { left: 960, top: 500, scale: .05, rotation: 0, autoAlpha: 0, filter: 'blur(8px)', duration: 1.2, ease: 'expo.in' }, tJ + (k % 7) * .12));
      const light = q(cam, '.s11-light');
      tl.fromTo(light, { autoAlpha: 0, scale: .05 }, { autoAlpha: 1, scale: .4, duration: 1.6, ease: 'power2.in', immediateRender: false }, tJ + .4);
      tl.to(light, { scale: 6, duration: .6, ease: 'expo.in' }, T.w(0, ['uno']) - .2);
      tl.to(light, { autoAlpha: .45, scale: 1.4, duration: .6, ease: 'power1.out' }, T.w(0, ['uno']) + .45);
      tl.to(light, { autoAlpha: 0, duration: .7, ease: 'power1.inOut' }, T.b(1) + .3);
      // ---------- beat 1: EL INSIGHT, palabra por palabra
      const ws = qa(cam, '.s11-ins .iw');
      const times = T.spread(1, ws.length);
      A.pop(q(cam, '.s11-qm'), T.b(1) - .1, { from: .3, rot: -16 });
      ws.forEach((w, j) => tl.fromTo(w, { autoAlpha: 0, y: 40, filter: 'blur(8px)' }, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: .45, ease: 'expo.out', immediateRender: false }, times[j] - .05));
      const dn = qa(cam, '.s11-ins .dn');
      tl.fromTo(q(cam, '.s11-l3'), { scale: 1 }, { scale: 1.06, duration: .2, yoyo: true, repeat: 1, ease: 'power2.out', immediateRender: false }, T.e(1) - .1);
      A.shake(T.e(1), 6);
      // ---------- beat 2: de dónde sale
      const ins = q(cam, '.s11-ins');
      tl.to(ins, { y: -150, scale: .7, duration: .8, ease: 'expo.inOut' }, T.b(2) + .4);
      const src = qa(cam, '.s11-src > div');
      [T.w(2, ['funciona']) + .5, T.w(2, ['asco']) + .2, T.w(2, ['danar', 'ajeno'])].forEach((t, k) => {
        A.rise(src[k], t - .1, { y: 30 });
        A.draw(q(src[k], '.ln path'), t, .5);
      });
      // ---------- beat 3: el "dónde" se vuelve el set más caro del mundo → AGUANTA TU SOFÁ
      const tD = T.w(3, ['donde']);
      tl.to([qa(cam, '.s11-src > div'), q(cam, '.s11-qm')], { autoAlpha: 0, duration: .35 }, tD - .3);
      tl.to(ws.filter(w => !w.classList.contains('dn')).concat(dn.slice(1)), { autoAlpha: 0, duration: .35 }, tD - .3);
      const big = q(cam, '.s11-donde');
      tl.fromTo(big, { autoAlpha: 0, scale: .35, y: 60 }, { autoAlpha: 1, scale: 1, y: 0, duration: .7, ease: 'expo.out', immediateRender: false }, tD - .1);
      tl.to(dn[0], { autoAlpha: 0, duration: .2 }, tD - .1);
      tl.fromTo(big, { '--fill': 0 }, { '--fill': 1, duration: .9, ease: 'power1.inOut', immediateRender: false }, T.w(3, ['idea']) - .2);
      const tCaro = T.w(3, ['caro', 'lugar']);
      tl.to(big, { scale: 16, duration: 1.1, ease: 'expo.in' }, tCaro - .3);
      const plate = q(cam, '.s11-plate');
      tl.fromTo(plate, { autoAlpha: 0, scale: 1.25 }, { autoAlpha: 1, scale: 1.05, duration: .7, ease: 'power2.out', immediateRender: false }, tCaro + .35);
      tl.to(big, { autoAlpha: 0, duration: .2 }, tCaro + .7);
      const end = q(cam, '.s11-end'), tSi = T.w(3, ['si aguanta']), tAg2 = T.w(3, ['aguanta'], 1);
      A.kb(q(plate, 'img'), tCaro + .35, tAg2, { from: 1.2, to: 1.3 });
      A.rise(q(cam, '.s11-s1'), tSi + .05, { y: 20 });                 // se lee sobre el set de lujo
      A.fade(end, tAg2 - .45, .4);                                     // fondo blanco recién aquí
      A.pop(q(end, '.s11-lg'), tAg2 - .3, { from: .5 });
      A.track(q(end, '.s11-s2'), tAg2 - .15, { d: 1 });
      A.kb(q(end, '.plate'), tAg2 - .45, T.b(4), { from: 1.02, to: 1.08 });
      // ---------- beat 4: la lámina 11 del ejercicio se llena sola
      const prof = q(cam, '.s11-prof');
      tl.to([q(cam, '.s11-endsup'), q(cam, '.s11-s1w'), q(cam, '.s11-lg')], { autoAlpha: 0, y: -40, duration: .35, ease: 'power2.in' }, T.w(4, ['lamina', 'queda']) - .55);
      tl.fromTo(prof, { autoAlpha: 0, scale: .9 }, { autoAlpha: 1, scale: 1, duration: .7, ease: 'expo.out', immediateRender: false }, T.w(4, ['lamina', 'queda']) - .2);
      T.video(q(prof, 'video'), T.b(4), T.dur, { from: 28.2, rate: .2 });     // B-10: solo EXPENSIVE $H*T, antes de "MARCH 12th"
      const dds = qa(prof, '.s11-dl > div');
      [T.w(4, ['vimos']), T.w(4, ['imaginamos']), T.w(4, ['sentimos']), T.w(4, ['tememos']), T.w(4, ['insait', 'insight'])].forEach((t, k) => {
        tl.fromTo(dds[k], { autoAlpha: 0, x: 40 }, { autoAlpha: 1, x: 0, duration: .45, ease: 'expo.out', immediateRender: false }, t - .15);
      });
    }
  };

  /* =====================================================================
     12 · GRACIAS
     ===================================================================== */
  E.s12 = {
    build(cam, T, tl, A, root) {
      root.dataset.legal = 'frames';
      cam.innerHTML = `
      <img class="plate s12-pl" src="assets/fallback/set-cierre.jpg" alt="">
      <p class="ctr anton au-sheen s12-g" style="top:118px;font-size:270px;line-height:.95">GRACIAS</p>
      <p class="ctr fr ink o0 s12-p1" style="top:400px;font-size:52px"><span class="a">por quedarse hasta el final…</span> <span class="b o0">y por no salirse del tema.</span></p>
      <p class="abs cv red o0 s12-ni" style="left:1360px;top:448px;font-size:52px;transform:rotate(-6deg)">(ni del pañal)</p>
      <div class="ctr o0 s12-c1" style="top:500px"><span class="lbl">Presentan</span><span class="fr red s12-nm"><span class="s12-n1">William Fonseca</span> <b class="anton gold s12-y o0">&amp;</b> <span class="s12-n2 o0">Mariana Silva</span></span></div>
      <div class="ctr o0 s12-c2" style="top:640px"><span class="s12-doc">Docente: <b>Rüdiger Stuart González Preciado</b></span>
        <span class="s12-ins"><img src="assets/logos/politecnico-b.png" alt="Politécnico Grancolombiano">Publicidad 2 · Presencial nocturna · Sede Bogotá · Viernes</span></div>
      <div class="s12-src o0">
        <p><b>Fuentes:</b> Huggies® / Kimberly-Clark y McCann NY + NZ (teaser, livestream del 12-mar-2026 y case film de Cannes Lions 2026) · Campaign Brief NZ · Ekman (1992) · Case et al. (2006) · Rozin, Millman y Nemeroff (1986) · Keltner y Buswell (1997) · Mott Poll (2017) · Kahneman y Tversky (1979) · Albrecht (2012) · Pampers (2023).</p>
        <p><b>Notas legales:</b> fotogramas, clips y música del teaser © Huggies® × McCann (2026), uso académico · imágenes con sello «IA»: generadas con IA, ilustrativas · voz de William clonada con IA.</p>
      </div>
      <figure class="slot mul feather o0 s12-bb" data-slot="p14" style="left:1470px;top:150px;width:400px;--fx:14%;--fy:16%"></figure>
      <div class="lay s12-spk"></div>`;
      A.kb(q(cam, '.s12-pl'), 0, T.dur, { from: 1.0, to: 1.05 });
      const tG = T.w(0, ['gracias']);
      tl.fromTo(q(cam, '.s12-g'), { scale: 1, letterSpacing: '0.006em' }, { scale: 1.06, letterSpacing: '0.05em', duration: .8, ease: 'expo.out', immediateRender: false }, tG - .1);
      A.sparkle(q(cam, '.s12-spk'), 960, 260, tG + .6, { n: 26, r: 760, size: 50 });
      A.show(q(cam, '.s12-p1'), T.w(0, ['por']) - .1);
      A.rise(q(cam, '.s12-p1 .a'), T.w(0, ['por']) - .1, { y: 18 });
      A.rise(q(cam, '.s12-p1 .b'), T.w(0, ['por'], 1) - .1, { y: 18 });
      A.pop(q(cam, '.s12-ni'), T.wEnd(0, ['tema']) + .05, { from: .3, rot: -20, toRot: -6 });
      A.rise(q(cam, '.s12-c1'), T.w(0, ['soy']) - .1, { y: 24 });
      A.fade(q(cam, '.s12-y'), T.w(0, ['mariana']) - .25, .3);
      A.rise(q(cam, '.s12-n2'), T.w(0, ['mariana']) - .15, { y: 18 });
      A.rise(q(cam, '.s12-c2'), T.w(0, ['publicidad']) - .2, { y: 24 });
      A.fade(q(cam, '.s12-src'), T.w(0, ['publicidad']) + .2, .6);
      A.fade(q(cam, '.s12-bb'), T.w(0, ['soy']), .8);
      // la cuenta regresiva llega a 00:00 y muestra RECAP
      const rem = Math.max(0, (window.DECK_CONFIG ? DECK_CONFIG.showSeconds : 600) - (T.prevSum || 0) - T.b(0));
      tl.fromTo(window.CDCTRL, { v: rem }, { v: 0, duration: Math.max(1, T.e(0) - T.b(0)), ease: 'power1.in', immediateRender: false }, T.b(0));
      tl.fromTo(window.CDCTRL, { recap: 0 }, { recap: 1, duration: .05, immediateRender: false }, T.e(0) + .15);
    }
  };

  /* ---------- v4.1: a TODAS las escenas, el estado inicial correcto y la franja de subtítulos al 100 % ---------- */
  Object.keys(E).forEach(id => {
    const d = E[id];
    if (!d || !d.build || d._v41) return;
    const build = d.build;
    d.build = function (cam, T, tl, A, root) {
      tl.set(document.body, { '--subop': 1 }, 0);
      gsap.set(document.body, { '--subop': 1 });
      build.call(d, cam, T, tl, A, root);
      KIT.prime(tl);
    };
    d._v41 = true;
  });
})();
