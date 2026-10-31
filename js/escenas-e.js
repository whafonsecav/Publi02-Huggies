/* =====================================================================
   ESCENAS N1–N4 · parte 2 (v6): el segundo ejercicio, la lluvia de ideas, la historia y el concepto decodificado
   (mismo contrato que escenas-a.js: todos los tiempos salen de T, es decir, de NARRACION)
   Se carga ANTES de escenas-d.js para que también reciba KIT.prime (estado inicial correcto).
   ===================================================================== */
(function () {
  'use strict';
  const M = KIT.M;
  const E = window.ESCENAS = window.ESCENAS || {};
  const q = (r, s) => r.querySelector(s);
  const qa = (r, s) => Array.from(r.querySelectorAll(s));

  const ICO = {
    reloj: '<svg viewBox="0 0 48 48"><circle cx="24" cy="27" r="16"/><path d="M24 27V17M24 27l7 5M19 5h10M24 5v6"/></svg>',
    lider: '<svg viewBox="0 0 48 48"><path d="M8 34l4-20 9 9 3-13 3 13 9-9 4 20z"/><path d="M8 40h32"/></svg>',
    idea: '<svg viewBox="0 0 48 48"><path d="M17 31c-4-3-7-7-7-12a14 14 0 0 1 28 0c0 5-3 9-7 12v5H17z"/><path d="M19 42h10"/></svg>',
    filtro: '<svg viewBox="0 0 48 48"><path d="M6 8h36L28 26v14l-8-4V26z"/></svg>',
    gente: '<svg viewBox="0 0 48 48"><circle cx="17" cy="16" r="6"/><circle cx="33" cy="16" r="6"/><path d="M5 40c0-8 5-13 12-13s12 5 12 13M23 40c0-8 4-13 10-13s10 5 10 13"/></svg>',
    casa: '<svg viewBox="0 0 48 48"><path d="M6 22L24 7l18 15M11 19v21h26V19"/><path d="M20 40V29h8v11"/></svg>',
    rayo: '<svg viewBox="0 0 48 48"><path d="M27 4L9 28h13l-3 16 18-24H24z"/></svg>',
    panal: '<svg viewBox="0 0 48 48"><path d="M5 10q19-4 38 0l-2 10q-7 3-9 10-1 7-1 12H17q0-5-1-12-2-7-9-10z"/></svg>',
    claqueta: '<svg viewBox="0 0 48 48"><rect x="6" y="18" width="36" height="24" rx="3"/><path d="M6 18l4-10 32 4-2 6M14 9l-2 9M24 10l-3 9M34 11l-3 8"/></svg>'
  };

  /* =====================================================================
     N1 · EL SEGUNDO EJERCICIO
     ===================================================================== */
  E.n1 = {
    build(cam, T, tl, A) {
      cam.innerHTML = `
      <div class="lay n1-b0">
        <p class="ctr lbl o0 n1-l0" style="top:262px">Ejercicio 1 · el insight</p>
        <div class="n1-ins o0"><p class="fr">«No le tengo miedo al popó. Le tengo miedo a <span class="red">lo que pasa cuando se sale</span>.»</p><span class="n1-ok anton o0">✓ Listo</span></div>
      </div>
      <p class="ctr anton au o0 n1-e2" style="top:300px;font-size:230px">Ejercicio 2</p>
      <div class="n1-c o0" style="left:140px"><span class="n1-n anton">1</span><p class="lbl">Una idea nueva</p><p class="fr n1-t">Tomar la campaña de Huggies y, con las técnicas vistas en clase, proponer una idea nueva.</p><p class="fri n1-q o0">¿Cómo la comunicaríamos diferente?</p></div>
      <div class="n1-c o0" style="left:990px"><span class="n1-n anton">2</span><p class="lbl">Decodificarla</p><p class="fr n1-t">Decodificar ese concepto nuevo con el método de la clase.</p>
        <div class="n1-chev">${['Titular', 'Tema de campaña', 'Eslogan', 'Concepto comercial'].map((t, k) => `<span class="anton o0 c${k + 1}">${t}</span>`).join('')}</div></div>
      <div class="n1-go o0"><span class="anton">Parte 2 · La nueva idea</span></div>
      <div class="lay n1-spk"></div>`;

      // ---------- beat 0: el insight queda archivado (ejercicio 1, listo)
      A.rise(q(cam, '.n1-l0'), .05, { y: 14 });
      A.rise(q(cam, '.n1-ins'), .15, { y: 40 });
      A.stamp(q(cam, '.n1-ok'), Math.max(1.2, T.e(0) - .35), { rot: -10, amp: 8 });
      // ---------- beat 1: EJERCICIO 2
      A.out(q(cam, '.n1-b0'), T.b(1) - .15, { d: .45, y: -80, scale: .9 });
      const e2 = q(cam, '.n1-e2'), tE = T.w(1, ['segundo', 'ejercicio']);
      A.slam(e2, tE - .1, { from: 1.8, amp: 12 });
      A.sparkle(q(cam, '.n1-spk'), 960, 410, tE, { n: 22, r: 640, size: 46 });
      // ---------- beat 2: la tarea 1
      tl.to(e2, { y: -150, scale: .52, duration: .6, ease: 'expo.inOut' }, T.b(2) - .15);
      const cs = qa(cam, '.n1-c');
      A.rise(cs[0], T.b(2) + .05, { y: 60 });
      A.rise(q(cs[0], '.n1-q'), T.w(2, ['como', 'comunicariamos']) - .1, { y: 18 });
      // ---------- beat 3: la tarea 2 y las cuatro flechas del método
      A.rise(cs[1], T.b(3), { y: 60 });
      const ch = qa(cam, '.n1-chev span');
      [T.w(3, ['titular']), T.w(3, ['tema']), T.w(3, ['eslogan']), T.w(3, ['comercial', 'concepto'], 1)].forEach((t, k) => A.pop(ch[k], t - .1, { from: .4 }));
      // ---------- beat 4: así lo hicimos → arranca la parte 2
      tl.to(cs, { opacity: .3, scale: .97, duration: .4 }, T.b(4) - .1);
      A.slam(q(cam, '.n1-go'), T.b(4), { from: 1.6, amp: 10 });
      A.sparkle(q(cam, '.n1-spk'), 960, 610, T.b(4) + .1, { n: 18, r: 520, size: 40 });
    }
  };

  /* =====================================================================
     N2 · LA LLUVIA DE IDEAS · tres rondas, el feedback y la idea que quedó
     ===================================================================== */
  const RON = [
    { n: 'Ronda 1', t: 'El fútbol', body: `<p class="fr n2-big">Cada plan, narrado como un partido.</p>
        <div class="n2-tags">${['el bebé Halan', 'el Neymar', 'el Pibe', 'el James', 'el Cuadrado', 'el «siuuu»', 'el Messi', 'la Linda Caicedo'].map(x => `<span>${x}</span>`).join('')}</div>
        <p class="n2-nar"><b>Narrador:</b> «¡No se salió!»</p>`,
      fb: 'Gustaron el narrador y la competencia. <b>Sobran el fútbol y los cracks.</b>', st: 'Descartada' },
    { n: 'Ronda 2', t: 'El duelo', body: `<p class="fr n2-big">Dos bebés y un olor raro.</p>
        <div class="n2-vs"><span>Papá 1</span><i class="anton">VS</i><span>Papá 2</span></div>
        <p class="n2-sm">Dos papás mirándose como en el viejo oeste.</p>`,
      fb: 'No se puede mostrar a un bebé perdedor. <b>El enemigo no es el olor: es que se salga.</b>', st: 'Descartada' },
    { n: 'Ronda 3', t: 'Un solo bebé', body: `<p class="fr n2-big">Un narrador cuenta la película que se hace cada uno en su cabeza.</p>
        <div class="n2-heads">${['¡Mi sofá!', '¿Y estos?', '¿Nos vamos?', 'Nunca más'].map(x => `<span>${x}</span>`).join('')}</div>`,
      fb: '', st: 'Elegida' }
  ];
  E.n2 = {
    build(cam, T, tl, A) {
      cam.innerHTML = `
      <div class="lay n2-head">
        <p class="ctr anton au n2-t" style="top:205px;font-size:190px">Brainstorming</p>
        <p class="ctr fri ink2 o0 n2-s" style="top:410px;font-size:56px">la lluvia de ideas</p>
      </div>
      <div class="n2-rules">${[['reloj', '15 minutos'], ['lider', 'Un líder'], ['idea', 'Todas las ideas'], ['filtro', 'Un filtro al final']].map(r => `<div class="o0">${ICO[r[0]]}<span class="anton">${r[1]}</span></div>`).join('')}</div>
      ${RON.map((r, k) => `
        <div class="n2-r o0${k === 2 ? ' win' : ''}" style="left:${100 + k * 585}px">
          <p class="n2-rt"><span class="anton">${r.n}</span><b class="anton">${r.t}</b></p>
          <div class="n2-body">${r.body}</div>
          ${r.fb ? `<div class="n2-fb o0"><span>Feedback del profe</span><p>${r.fb}</p></div>` : ''}
          <span class="n2-st anton o0">${r.st}</span>
        </div>`).join('')}
      <div class="lay n2-spk"></div>`;

      // ---------- beat 0: la técnica y sus reglas
      const tT = T.w(0, ['breinstorming', 'brainstorming', 'tecnica']);
      A.track(q(cam, '.n2-t'), Math.min(.2, tT - .3), { d: 1.1 });
      A.rise(q(cam, '.n2-s'), T.w(0, ['lluvia']) - .1, { y: 18 });
      const rules = qa(cam, '.n2-rules > div');
      [T.w(0, ['quince', '15']), T.w(0, ['lider']), T.w(0, ['todas']), T.w(0, ['filtro'])].forEach((t, k) => {
        A.pop(rules[k], t - .12, { from: .4 });
        qa(rules[k], 'path,circle,rect').forEach(p => A.draw(p, t - .05, .6));
      });
      // ---------- beats 1–5: las tres rondas
      tl.to(q(cam, '.n2-head'), { y: 36, scale: .5, duration: .6, ease: 'expo.inOut' }, T.b(1) - .35);   // origen arriba: queda en y≈138–233, bajo la barra
      A.out(q(cam, '.n2-s'), T.b(1) - .35, { d: .3 });
      tl.to(rules, { autoAlpha: 0, y: -30, duration: .3, stagger: .04 }, T.b(1) - .4);
      const R = qa(cam, '.n2-r');
      // ronda 1 · el fútbol
      A.rise(R[0], T.b(1) - .05, { y: 70 });
      qa(R[0], '.n2-tags span').forEach((s, j) => A.pop(s, T.w(1, ['cracks', 'bebes']) - .2 + j * .07, { from: .5 }));
      A.pop(q(R[0], '.n2-nar'), T.w(1, ['gritando', 'narrador']) + .1, { from: .5 });
      A.rise(q(R[0], '.n2-fb'), T.b(2) + .1, { y: 30 });
      tl.to(qa(R[0], '.n2-tags span'), { textDecorationColor: 'rgba(205,22,24,1)', opacity: .45, duration: .3 }, T.w(2, ['sobraban', 'futbol']));
      A.stamp(q(R[0], '.n2-st'), T.e(2) - .25, { rot: -12, amp: 6 });
      tl.to(q(R[0], '.n2-body'), { opacity: .45, duration: .4 }, T.e(2) - .1);
      // ronda 2 · el duelo
      A.rise(R[1], T.b(3) - .05, { y: 70 });
      tl.fromTo(qa(R[1], '.n2-vs span'), { x: (k) => (k ? 60 : -60), autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: .5, ease: 'back.out(2)', stagger: .15, immediateRender: false }, T.w(3, ['papas', 'dos'], 1) - .1);
      A.slam(q(R[1], '.n2-vs i'), T.w(3, ['oeste', 'viejo']) - .1, { from: 2.4, amp: 6 });
      A.rise(q(R[1], '.n2-fb'), T.b(4) + .1, { y: 30 });
      A.stamp(q(R[1], '.n2-st'), T.e(4) - .25, { rot: -12, amp: 6 });
      tl.to(q(R[1], '.n2-body'), { opacity: .45, duration: .4 }, T.e(4) - .1);
      // ronda 3 · la que quedó
      A.rise(R[2], T.b(5) - .05, { y: 70 });
      qa(R[2], '.n2-heads span').forEach((s, j) => A.pop(s, T.w(5, ['pelicula', 'cabeza']) - .1 + j * .12, { from: .3, rot: j % 2 ? 8 : -8, toRot: j % 2 ? 3 : -3 }));
      const tQ = T.w(5, ['quedo', 'idea']);
      A.stamp(q(R[2], '.n2-st'), tQ - .1, { rot: -8, amp: 10 });
      tl.fromTo(R[2], { boxShadow: '0 18px 40px rgba(42,33,24,.12)' }, { boxShadow: '0 0 0 8px #CD1618, 0 24px 60px rgba(205,22,24,.35)', duration: .4, immediateRender: false }, tQ);
      A.sparkle(q(cam, '.n2-spk'), 1550, 560, tQ + .1, { n: 22, r: 420, size: 44 });
    }
  };

  /* =====================================================================
     N3 · LA HISTORIA · intro, nudo (la película de cada uno) y desenlace
     ===================================================================== */
  const MOV = [
    { who: 'Mariela, la anfitriona', p: 'Ve su sofá blanco manchado para siempre.', f: 'Lo ajeno', pos: 'left:80px;top:300px', w: ['mariela'] , b: 3 },
    { who: 'Marcela, la amiga', p: 'Ya escribe el chisme en el grupo.', f: 'Los demás', pos: 'right:80px;top:300px', w: ['marcela'], b: 3 },
    { who: 'Natalia y su pareja', p: 'Ve la fiesta acabarse antes de la pizza.', f: 'El plan', pos: 'left:80px;top:600px', w: ['natalia'], b: 4 },
    { who: 'María y Carlos, los papás', p: 'Encerrados en la casa hasta que el bebé cumpla 15.', f: 'La libertad', pos: 'right:80px;top:600px', w: ['maria'], b: 4 }
  ];
  E.n3 = {
    build(cam, T, tl, A) {
      cam.innerHTML = `
      <div class="lay n3-head">
        <p class="ctr anton au n3-t" style="top:215px;font-size:190px">La historia</p>
        <div class="n3-map">${[['gente', 'Personajes'], ['casa', 'Escenario'], ['rayo', 'Conflicto'], ['panal', 'El producto']].map(m => `<div class="o0">${ICO[m[0]]}<span class="anton">${m[1]}</span></div>`).join('')}</div>
      </div>
      <div class="n3-acts o0">${['La intro', 'El nudo', 'El desenlace'].map(a => `<span class="anton">${a}</span>`).join('<i></i>')}</div>
      <div class="lay n3-room o0">
        <svg class="n3-sofa" viewBox="0 0 640 300"><path class="ln" d="M60 230V150q0-28 30-30q8-70 230-70t230 70q30 2 30 30v80z" fill="#FFFFFF" stroke="#8F6F33" stroke-width="7" stroke-linejoin="round"/>
          <path class="ln" d="M90 230v34M550 230v34M100 172h440" fill="none" stroke="#8F6F33" stroke-width="7" stroke-linecap="round"/>
          <ellipse class="ln" cx="320" cy="282" rx="290" ry="14" fill="none" stroke="#D9B56A" stroke-width="5"/></svg>
        <svg class="n3-baby" viewBox="0 0 120 130"><circle class="ln" cx="60" cy="40" r="26" fill="#FFF8EC" stroke="#8F6F33" stroke-width="5"/><path class="ln" d="M50 37v3M70 37v3M51 50q9 7 18 0" fill="none" stroke="#8F6F33" stroke-width="5" stroke-linecap="round"/>
          <path class="ln" d="M34 74q26-12 52 0l-6 40H40z" fill="#FFFFFF" stroke="#8F6F33" stroke-width="5" stroke-linejoin="round"/></svg>
        <div class="n3-clock o0"><b class="anton">Sáb · 9:47 p. m.</b><span>Apartamento de Mariela</span></div>
        <div class="n3-who o0"><span class="anton">María y Carlos</span> llegaron con su bebé</div>
        ${['♪', '♫', '♪'].map((n, k) => `<i class="n3-note o0" style="left:${760 + k * 170}px;top:${330 + (k % 2) * 40}px">${n}</i>`).join('')}
        <svg class="n3-smell" viewBox="0 0 220 260">${[0, 1, 2].map(k => `<path class="sm" d="M${50 + k * 60} 250 q-24 -40 0 -80 t0 -80 t0 -80" fill="none" stroke="#7FA35A" stroke-width="9" stroke-linecap="round" stroke-dasharray="2 16"/>`).join('')}</svg>
      </div>
      <div class="n3-dim o0"></div>
      <p class="n3-att anton o0">¡Atención!</p>
      <p class="ctr anton n3-q o0" style="top:330px;font-size:130px">¿Quién se ${M.censor('c*gó')}?</p>
      ${MOV.map((m, k) => `<div class="n3-bub o0" data-k="${k}" style="${m.pos}"><p class="n3-bw">${m.who}</p><p class="fr n3-bp">${m.p}</p><span class="n3-bf">Su miedo: ${m.f}</span></div>`).join('')}
      <p class="ctr fri n3-sil o0" style="top:330px;font-size:60px">Silencio total…</p>
      <p class="ctr anton n3-uff o0" style="top:300px;font-size:150px">¡Uff! Es solo olor.</p>
      <p class="ctr fr n3-ms o0" style="top:490px;font-size:72px">La ${M.censor('m*erda')} no se salió.</p>
      <p class="ctr anton au n3-fs o0" style="top:640px;font-size:110px">¡Y la fiesta sigue!</p>
      <div class="lay n3-spk"></div>`;

      // ---------- beat 0: el mapa de la clase
      A.track(q(cam, '.n3-t'), .15, { d: 1.1 });
      const mp = qa(cam, '.n3-map > div');
      [T.w(0, ['personajes']), T.w(0, ['escenario']), T.w(0, ['conflicto']), T.w(0, ['producto'])].forEach((t, k) => {
        A.pop(mp[k], t - .12, { from: .4 });
        qa(mp[k], 'path,circle,rect').forEach(p => A.draw(p, t - .05, .6));
      });
      // ---------- la línea de los tres actos
      A.out(q(cam, '.n3-head'), T.b(1) - .35, { d: .35, y: -60 });
      const acts = q(cam, '.n3-acts'), aS = qa(acts, 'span');
      A.rise(acts, T.b(1) - .2, { y: -20 });
      const lit = (k, t) => { aS.forEach((s, j) => tl.to(s, { backgroundColor: j === k ? '#CD1618' : 'rgba(255,255,255,.9)', color: j === k ? '#FFFFFF' : '#8F6F33', duration: .3 }, t)); };
      lit(0, T.b(1) - .1); lit(1, T.b(2) - .1); lit(2, T.b(5) - .1);
      // ---------- beat 1: la intro, la sala
      const room = q(cam, '.n3-room');
      A.show(room, T.b(1) - .1);
      qa(room, '.n3-sofa .ln').forEach((p, j) => A.draw(p, T.b(1) + j * .12, .9));
      tl.fromTo(q(room, '.n3-baby'), { autoAlpha: 0, y: 40, scale: .6 }, { autoAlpha: 1, y: 0, scale: 1, duration: .6, ease: 'back.out(2)', immediateRender: false }, T.w(1, ['bebe']) - .2);
      A.rise(q(room, '.n3-clock'), T.w(1, ['sabado']) - .15, { y: 20 });
      A.rise(q(room, '.n3-who'), T.w(1, ['maria']) - .15, { y: 20 });
      qa(room, '.n3-note').forEach((n, j) => { A.fade(n, T.w(1, ['musica']) + j * .15, .4); tl.fromTo(n, { y: 0 }, { y: -26, duration: .9, yoyo: true, repeat: 5, ease: 'sine.inOut', immediateRender: false }, T.w(1, ['musica']) + j * .15); });
      // ---------- beat 2: el nudo, se siente un olor
      A.stamp(q(cam, '.n3-att'), T.w(2, ['atencion']) - .1, { rot: -8, amp: 10 });
      qa(room, '.n3-smell .sm').forEach((p, j) => { A.draw(p, T.w(2, ['olor']) - .1 + j * .12, .9); tl.fromTo(p, { y: 0 }, { y: -18, duration: .8, yoyo: true, repeat: 7, ease: 'sine.inOut', immediateRender: false }, T.w(2, ['olor']) + j * .12); });
      tl.to(qa(room, '.n3-note'), { autoAlpha: 0, duration: .3 }, T.w(2, ['olor']));
      tl.fromTo(q(cam, '.n3-dim'), { autoAlpha: 0 }, { autoAlpha: 1, duration: .5, immediateRender: false }, T.w(2, ['olor']) + .2);
      A.out(q(cam, '.n3-att'), T.w(2, ['sala', 'todos']) - .2, { d: .3 });
      const qn = q(cam, '.n3-q');
      A.slam(qn, T.w(2, ['quien', 'preguntan']) - .1, { from: 1.6, amp: 10 });
      A.censor(q(qn, '.cen'), T.e(2) - .55);
      // ---------- beats 3–4: cada quien se hace su película
      tl.to(qn, { y: -146, scale: .5, duration: .6, ease: 'expo.inOut' }, T.b(3) - .2);
      tl.to([q(room, '.n3-clock'), q(room, '.n3-who')], { autoAlpha: 0, duration: .3 }, T.b(3) - .2);   // dejan sitio a las burbujas
      const bubs = qa(cam, '.n3-bub');
      MOV.forEach((m, k) => {
        const t = T.w(m.b, m.w);
        tl.fromTo(bubs[k], { autoAlpha: 0, scale: .3, rotation: k % 2 ? 6 : -6 }, { autoAlpha: 1, scale: 1, rotation: k % 2 ? 1.5 : -1.5, duration: .55, ease: 'back.out(1.8)', immediateRender: false }, t - .2);
        A.pop(q(bubs[k], '.n3-bf'), t + .9, { from: .5 });
      });
      // ---------- beat 5: el desenlace
      const tRev = T.w(5, ['revisa', 'levanta']);
      tl.to(bubs, { autoAlpha: 0, scale: .2, duration: .35, stagger: .05, ease: 'power2.in' }, tRev - .3);
      tl.to(qn, { autoAlpha: 0, duration: .3 }, tRev - .3);
      A.rise(q(cam, '.n3-sil'), T.w(5, ['silencio']) - .1, { y: 16 });
      const tU = T.w(5, ['uff']);
      A.out(q(cam, '.n3-sil'), tU - .2, { d: .25 });
      tl.to(q(cam, '.n3-dim'), { autoAlpha: 0, duration: .5 }, tU - .1);
      tl.to(room, { opacity: .22, duration: .5 }, tU - .1);
      tl.to(qa(room, '.n3-smell .sm'), { autoAlpha: 0, duration: .4 }, tU);
      A.slam(q(cam, '.n3-uff'), tU - .05, { from: 1.7, amp: 12 });
      const ms = q(cam, '.n3-ms');
      A.rise(ms, T.w(5, ['es solo', 'solo']) + .3, { y: 24 });
      A.censor(q(ms, '.cen'), T.w(5, ['no se', 'no']) - .75);
      const tF = T.w(5, ['fiesta']);
      A.slam(q(cam, '.n3-fs'), tF - .15, { from: 1.5, amp: 8 });
      A.sparkle(q(cam, '.n3-spk'), 960, 700, tF, { n: 26, r: 700, size: 46 });
    }
  };

  /* =====================================================================
     N4 · EL CONCEPTO DECODIFICADO
     ===================================================================== */
  E.n4 = {
    build(cam, T, tl, A) {
      cam.innerHTML = `
      <p class="ctr anton au n4-t" style="top:330px;font-size:170px">Concepto<br>decodificado</p>
      <div class="n4-arrow o0"><span class="n4-al">Concepto creativo</span><b class="anton">Nada se sale de control</b>
        <span class="n4-where">${['Tu casa', 'La casa ajena', 'Cualquier plan'].map(w => `<i class="o0">${w}</i>`).join('')}</span></div>
      <div class="n4-chev">${['Titular', 'Tema de campaña', 'Eslogan', 'Concepto comercial'].map((t, k) => `<span class="anton o0 c${k + 1}">${t}</span>`).join('')}</div>
      <div class="n4-cards">
        <div class="n4-k o0"><div class="n4-news"><p class="n4-kk">¡Última hora!</p><p class="n4-dek">Olor sospechoso desata pánico en fiesta de amigos</p><p class="anton n4-hd">Hubo popó, pero no hubo víctimas</p></div></div>
        <div class="n4-k o0">${ICO.claqueta}<p class="fr n4-tm">«Cada quien se hace su película»</p><p class="n4-sm">Un narrador cuenta lo que pasa en la cabeza de todos… hasta que no se sale nada.</p></div>
        <div class="n4-k o0"><p class="anton n4-sl">Huggies.<br>Lo que pasa en el pañal, se queda en el pañal.</p></div>
        <div class="n4-k o0"><p class="n4-pr anton">Huggies Little Snugglers</p><ul><li class="o0">Bloqueo de escapes por delante y por detrás</li><li class="o0">Hasta 100 % de protección</li></ul><div class="n4-cta o0"><span>Sin decir «compre»</span><p class="fr">«Que lo único que se escape sea el olor.»</p></div></div>
      </div>
      <div class="lay n4-spk"></div>`;

      // ---------- beat 0: título
      A.track(q(cam, '.n4-t'), .15, { d: 1.1 });
      // ---------- beat 1: el concepto creativo, la sombrilla
      A.out(q(cam, '.n4-t'), T.b(1) - .3, { d: .35, y: -60 });
      const ar = q(cam, '.n4-arrow');
      tl.fromTo(ar, { autoAlpha: 0, clipPath: 'inset(0% 100% 0% 0%)' }, { autoAlpha: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: .7, ease: 'expo.out', immediateRender: false }, T.b(1) - .1);
      const tN = T.w(1, ['nada']);
      A.track(q(ar, 'b'), tN - .1, { d: .8, from: '.3em' });
      A.sparkle(q(cam, '.n4-spk'), 760, 215, tN + .4, { n: 18, r: 520, size: 40 });
      const wh = qa(ar, '.n4-where i');
      [T.w(1, ['casa']), T.w(1, ['ajena']), T.w(1, ['plan'])].forEach((t, k) => A.pop(wh[k], t - .1, { from: .5 }));
      // ---------- beats 2–5: los cuatro elementos, uno por golpe
      const ch = qa(cam, '.n4-chev span'), ks = qa(cam, '.n4-cards .n4-k');
      [2, 3, 4, 5].forEach((b, k) => {
        A.pop(ch[k], T.b(b) - .05, { from: .5 });
        if (k !== 0) A.rise(ks[k], T.b(b) + .1, { y: 50 });
      });
      // titular: el periódico llega girando, como en las películas
      tl.fromTo(ks[0], { autoAlpha: 0, rotation: -720, scale: .1 }, { autoAlpha: 1, rotation: -2, scale: 1, duration: 1.1, ease: 'power3.out', immediateRender: false }, T.b(2) + .05);
      A.pop(q(ks[0], '.n4-hd'), T.w(2, ['hubo']) - .1, { from: 1.4 });
      // eslogan
      A.sparkle(q(cam, '.n4-spk'), 1170, 620, T.w(4, ['queda', 'pañal'], 0) + .2, { n: 16, r: 300, size: 36 });
      // concepto comercial y CTA
      const li = qa(ks[3], 'li');
      A.rise(li[0], T.w(5, ['bloqueo']) - .1, { y: 14 });
      A.rise(li[1], T.w(5, ['cien', '100', 'proteccion']) - .1, { y: 14 });
      const tC = T.w(5, ['unico', 'invitacion']);
      A.pop(q(ks[3], '.n4-cta'), tC - .3, { from: .5 });
      A.shake(tC + .1, 6);
    }
  };
})();
