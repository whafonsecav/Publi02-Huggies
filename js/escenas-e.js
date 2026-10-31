/* =====================================================================
   ESCENAS N1–N7 · parte 2 (v6.1): el ejercicio 2, el brainstorming (2), el mapa, la historia y el concepto decodificado (2)
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
    claqueta: '<svg viewBox="0 0 48 48"><rect x="6" y="18" width="36" height="24" rx="3"/><path d="M6 18l4-10 32 4-2 6M14 9l-2 9M24 10l-3 9M34 11l-3 8"/></svg>',
    check: '<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="19"/><path d="M15 25l6 6 12-13"/></svg>',
    chat: '<svg viewBox="0 0 48 48"><path d="M6 9h36v23H20l-9 8v-8H6z"/><path d="M14 18h20M14 24h12"/></svg>',
    mic: '<svg viewBox="0 0 48 48"><rect x="17" y="4" width="14" height="25" rx="7"/><path d="M10 22a14 14 0 0 0 28 0M24 36v8M16 44h16"/></svg>',
    guante: '<svg viewBox="0 0 48 48"><path d="M15 30V16A10 10 0 0 1 25 6h3a10 10 0 0 1 10 10v8a8 8 0 0 1-8 8H15z"/><path d="M15 21h-3a5 5 0 0 0 0 10h3M15 32v10h19V32M22 16h9"/></svg>',
    trofeo: '<svg viewBox="0 0 48 48"><path d="M14 6h20v12a10 10 0 0 1-20 0z"/><path d="M14 10H7a7 7 0 0 0 8 10M34 10h7a7 7 0 0 1-8 10M24 28v8M18 36h12v6H18z"/></svg>',
    sombrero: '<svg viewBox="0 0 48 48"><path d="M3 31q21 11 42 0"/><path d="M13 32q0-17 5-19 3-2 6 2 3-4 6-2 5 2 5 19"/><path d="M13 26q11 4 22 0"/></svg>',
    coche: '<svg viewBox="0 0 48 48"><path d="M6 10h5l4 14h25a13 13 0 0 0-13-13v13"/><path d="M15 24q0 8 12 8t13-8"/><circle cx="17" cy="39" r="4"/><circle cx="35" cy="39" r="4"/></svg>',
    cabeza: '<svg viewBox="0 0 48 48"><path d="M30 44v-7h5a3 3 0 0 0 3-3v-6l4-2-4-7C38 11 31 5 22 5 13 5 7 12 7 21c0 6 3 10 6 13v10"/><circle cx="22" cy="19" r="3"/><circle cx="31" cy="12" r="2"/><circle cx="14" cy="13" r="2"/></svg>',
    luna: '<svg viewBox="0 0 48 48"><path d="M36 33A16 16 0 0 1 20 9a16 16 0 1 0 16 24z"/></svg>',
    corazon: '<svg viewBox="0 0 48 48"><path d="M24 41S5 29 5 17a9.5 9.5 0 0 1 19-3 9.5 9.5 0 0 1 19 3c0 12-19 24-19 24z"/></svg>',
    ojo: '<svg viewBox="0 0 48 48"><path d="M3 24q21-22 42 0-21 22-42 0z"/><circle cx="24" cy="24" r="7"/></svg>',
    escudo: '<svg viewBox="0 0 48 48"><path d="M24 4l16 6v12c0 11-7 18-16 22C15 40 8 33 8 22V10z"/><path d="M17 24l5 5 9-10"/></svg>',
    pluma: '<svg viewBox="0 0 48 48"><path d="M40 7C24 7 12 18 10 38l4 2c4-14 12-22 24-26-8 6-14 14-17 24 12-2 21-12 19-31z"/></svg>',
    gota: '<svg viewBox="0 0 48 48"><path d="M24 5s14 16 14 26a14 14 0 0 1-28 0C10 21 24 5 24 5z"/><path d="M18 31a6 6 0 0 0 6 6"/></svg>',
    sofa: '<svg viewBox="0 0 48 48"><path d="M7 31v-8a4 4 0 0 1 8 0v4h18v-4a4 4 0 0 1 8 0v8z"/><path d="M11 22v-6a4 4 0 0 1 4-4h18a4 4 0 0 1 4 4v6M10 31v6M38 31v6"/><circle cx="30" cy="20" r="3"/></svg>',
    pizza: '<svg viewBox="0 0 48 48"><path d="M6 12q18-10 36 0L24 44z"/><path d="M8.5 16q15.5-8 31 0"/><circle cx="20" cy="22" r="2.5"/><circle cx="28" cy="27" r="2.5"/><circle cx="23" cy="33" r="2"/></svg>',
    candado: '<svg viewBox="0 0 48 48"><rect x="10" y="21" width="28" height="22" rx="4"/><path d="M16 21v-6a8 8 0 0 1 16 0v6M24 30v5"/></svg>',
    sombrilla: '<svg viewBox="0 0 48 48"><path d="M4 24a20 20 0 0 1 40 0q-5-4-10 0-5-4-10 0-5-4-10 0-5-4-10 0z"/><path d="M24 4v2M24 24v14a4 4 0 0 1-8 0"/></svg>',
    maleta: '<svg viewBox="0 0 48 48"><rect x="6" y="14" width="36" height="26" rx="4"/><path d="M18 14V8h12v6M6 24h36M14 40v3M34 40v3"/></svg>'
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

  /* ---------- piezas comunes de la parte 2 ---------- */
  // encabezado de ronda / sección (arriba a la izquierda) con avance de 3 puntos
  const RH = (cls, lbl, t, on) => `<div class="pt-rh o0 ${cls}"><span class="lbl">${lbl}</span><b class="anton">${t}</b>${on ? `<span class="pt-dots">${[1, 2, 3].map(j => `<i class="${j <= on ? 'on' : ''}"></i>`).join('')}</span>` : ''}</div>`;
  // tarjeta de feedback del profe + lo que aprendimos
  const FB = (cls, ok, no, learn) => `<div class="pt-fb o0 ${cls}"><p class="pt-fbh">Feedback del profe</p><ul>
      ${ok.map(x => `<li class="ok o0"><i>✓</i><span>${x}</span></li>`).join('')}
      ${no.map(x => `<li class="no o0"><i>✕</i><span>${x}</span></li>`).join('')}</ul>
      <div class="pt-learn o0"><span>Aprendimos</span><p>${learn}</p></div></div>`;
  // ilumina la pestaña k de una fila (actos, fichas, método)
  const lightRow = (tl, els, k, t, on) => els.forEach((s, j) => tl.to(s, { backgroundColor: j === k ? (on || '#CD1618') : 'rgba(255,255,255,.92)', color: j === k ? '#FFFFFF' : '#8F6F33', duration: .3 }, t));

  /* =====================================================================
     N2 · LA LLUVIA DE IDEAS (1/2): la técnica, las reglas, la inspiración, ronda 1 y ronda 2
     ===================================================================== */
  const RULES = [['reloj', '15 minutos', 'sin pasarnos'], ['lider', 'Un líder', 'hace de director creativo y alinea todo con el insight'], ['idea', 'Ninguna idea es mala', 'todo se anota'], ['filtro', 'Se filtra después', 'con cabeza fresca']];
  const INSP = [['mic', 'Narraciones de radio', 'narraciones'], ['guante', 'Peleas de boxeo', 'boxeo'], ['trofeo', 'Realities de competencia', 'realities'], ['sombrero', 'Duelos del viejo oeste', 'duelos'], ['coche', 'Nuestras salidas con bebés', 'nuestras']];
  const CRACKS = ['el bebé Halan', 'el Neymar', 'el Vinicius', 'el Pibe', 'el James', 'el Cuadrado con salsa choque', 'el Luis Díaz', 'la Linda Caicedo', 'la Mayra', 'el «siuuu»', 'el Messi'];
  E.n2 = {
    build(cam, T, tl, A) {
      cam.innerHTML = `
      <div class="lay n2-head">
        <p class="ctr anton au n2-t" style="top:170px;font-size:180px">Brainstorming</p>
        <p class="ctr fri ink2 o0 n2-s" style="top:372px;font-size:54px">la lluvia de ideas</p>
      </div>
      <div class="n2-loop">
        <p class="ctr anton red o0 n2-l3">Tres rondas con el profe</p>
        <div class="n2-cyc">${[['idea', 'Proponíamos', 'una idea'], ['chat', 'Feedback', 'del profe'], ['check', 'Aprendíamos', 'algo nuevo']].map((c, k) => `<div class="o0">${ICO[c[0]]}<b class="anton">${c[1]}</b><span>${c[2]}</span></div>${k < 2 ? '<i class="o0">→</i>' : ''}`).join('')}</div>
      </div>
      <p class="ctr lbl o0 n2-rl" style="top:250px">Las reglas</p>
      <div class="n2-rules">${RULES.map(r => `<div class="o0">${ICO[r[0]]}<b class="anton">${r[1]}</b><span>${r[2]}</span></div>`).join('')}</div>
      <p class="ctr lbl o0 n2-il" style="top:330px">Inspiración a la mesa</p>
      <div class="n2-insp">${INSP.map(r => `<div class="o0">${ICO[r[0]]}<span>${r[1]}</span></div>`).join('')}</div>
      ${RH('rh1', 'Brainstorming · ronda 1 de 3', 'El fútbol', 1)}
      ${RH('rh2', 'Brainstorming · ronda 2 de 3', 'El duelo', 2)}
      <div class="pt-idea o0 r1">
        <p class="fr n2-big">Narrar el plan como un partido.</p>
        <div class="n2-score o0"><span>Huggies FC</span><b class="anton">VS</b><span>Pañal genérico</span></div>
        <p class="lbl n2-tl o0">Bebés inspirados en cracks, sin decir su nombre</p>
        <div class="n2-tags">${CRACKS.map(x => `<span class="o0">${x}</span>`).join('')}</div>
        <p class="n2-nar o0">${ICO.mic}<span class="n2-n0">${M.strike('«¡Se metió!»')}</span><b class="n2-n1 o0">¡No se salió!</b></p>
        <span class="pt-st anton o0">Descartada</span>
      </div>
      ${FB('f1', ['Le gustaron el narrador y la competencia.'], ['Sobraban el fútbol y los cracks.'], 'El narrador funciona. El fútbol nos alejaba del insight.')}
      <div class="pt-idea o0 r2">
        <p class="n2-set o0">${ICO.casa}<span>Ya están en el plan: el apartamento de unos amigos.</span></p>
        <p class="fr n2-big o0 n2-hr">Huele raro… y hay dos bebés.</p>
        <div class="n2-vs o0"><span>Papá 1</span><i class="anton">VS</i><span>Papá 2</span></div>
        <p class="n2-sm o0">Se miran como en el viejo oeste… y arranca el narrador.</p>
        <div class="n2-chips">${['Papás entrenadores', 'Bebés competidores', 'Huggies vs. pañal genérico'].map(x => `<span class="o0">${x}</span>`).join('')}</div>
        <div class="n2-sl o0"><span>Eslogan</span><b class="fr">«Gana el que no se sale»</b></div>
        <p class="n2-tw o0"><b>Giro en broma:</b> era el abuelito, que también usa pañal.</p>
        <span class="pt-st anton o0">Descartada</span>
      </div>
      ${FB('f2', [], ['No se puede mostrar a un bebé perdedor.', 'El enemigo no es el olor: es que se salga.'], 'Nada de competencia. Todo el foco en que no se salga.')}
      <div class="lay n2-spk"></div>`;

      // ---------- beat 0: la técnica y las tres rondas con el profe
      const tT = T.w(0, ['breinstorming', 'brainstorming', 'tecnica']);
      A.track(q(cam, '.n2-t'), Math.min(.2, tT - .3), { d: 1.1 });
      A.rise(q(cam, '.n2-s'), T.w(0, ['lluvia']) - .1, { y: 18 });
      A.slam(q(cam, '.n2-l3'), T.w(0, ['tres']) - .1, { from: 1.5, amp: 6 });
      const cyc = qa(cam, '.n2-cyc > div'), arr = qa(cam, '.n2-cyc > i');
      [T.w(0, ['proponiamos']), T.w(0, ['feedback']), T.w(0, ['aprendiamos'])].forEach((t, k) => {
        A.pop(cyc[k], t - .12, { from: .4 });
        qa(cyc[k], 'path,circle,rect').forEach(p => A.draw(p, t - .05, .6));
        if (k) A.fade(arr[k - 1], t - .3, .3);
      });
      // ---------- beat 1: las reglas
      tl.to(q(cam, '.n2-head'), { y: 50, scale: .5, duration: .6, ease: 'expo.inOut' }, T.b(1) - .35);
      A.out(q(cam, '.n2-s'), T.b(1) - .35, { d: .3 });
      A.out(q(cam, '.n2-loop'), T.b(1) - .4, { d: .35, y: 40 });
      A.rise(q(cam, '.n2-rl'), T.b(1) - .05, { y: 14 });
      const rules = qa(cam, '.n2-rules > div');
      [T.w(1, ['quince', '15']), T.w(1, ['lider']), T.w(1, ['ninguna']), T.w(1, ['filtra'])].forEach((t, k) => {
        A.pop(rules[k], t - .12, { from: .4 });
        qa(rules[k], 'path,circle,rect').forEach(p => A.draw(p, t - .05, .6));
      });
      // ---------- beat 2: la inspiración
      tl.to([q(cam, '.n2-rl')].concat(rules), { autoAlpha: 0, y: -30, duration: .3, stagger: .04 }, T.b(2) - .4);
      A.rise(q(cam, '.n2-il'), T.b(2) - .05, { y: 14 });
      const ins = qa(cam, '.n2-insp > div');
      INSP.forEach((r, k) => {
        const t = T.w(2, [r[2]]);
        A.pop(ins[k], t - .12, { from: .5, rot: k % 2 ? 6 : -6, toRot: k % 2 ? 2 : -2 });
        qa(ins[k], 'path,circle,rect').forEach(p => A.draw(p, t - .05, .6));
      });
      // ---------- beats 3–5: ronda 1 · el fútbol
      A.out(q(cam, '.n2-head'), T.b(3) - .4, { d: .3, y: -40 });
      tl.to([q(cam, '.n2-il')].concat(ins), { autoAlpha: 0, y: -30, duration: .3, stagger: .03 }, T.b(3) - .4);
      const rh1 = q(cam, '.rh1'), r1 = q(cam, '.pt-idea.r1'), f1 = q(cam, '.pt-fb.f1');
      A.rise(rh1, T.b(3) - .1, { y: -20 });
      A.rise(r1, T.b(3) + .05, { y: 60 });
      A.pop(q(r1, '.n2-score'), T.w(3, ['huggies']) - .1, { from: .5 });
      A.slam(q(r1, '.n2-score b'), T.w(3, ['contra']) - .05, { from: 2.2, amp: 5 });
      A.rise(q(r1, '.n2-tl'), T.b(4) - .05, { y: 14 });
      const tg = qa(r1, '.n2-tags span'), tN = T.w(4, ['neymar']), tLC = T.w(4, ['linda', 'caicedo']);
      tg.forEach((s, j) => A.pop(s, tN - .25 + j * Math.max(.08, (tLC - tN) / tg.length), { from: .5 }));
      A.rise(q(r1, '.n2-nar'), T.w(4, ['narrador']) - .1, { y: 18 });
      A.strike(q(r1, '.n2-n0 .strk'), T.w(4, ['gritaba']) - .1);
      A.pop(q(r1, '.n2-n1'), T.w(4, ['no se']) - .1, { from: .4 });
      A.rise(f1, T.b(5) - .05, { y: 40 });
      const l1 = qa(f1, 'li');
      A.rise(l1[0], T.w(5, ['gustaron']) - .1, { y: 14 });
      A.rise(l1[1], T.w(5, ['sobraban']) - .1, { y: 14 });
      tl.to(tg, { textDecorationColor: 'rgba(205,22,24,1)', opacity: .45, duration: .3 }, T.w(5, ['futbol']));
      A.pop(q(f1, '.pt-learn'), T.w(5, ['aprendimos']) - .1, { from: .7 });
      A.stamp(q(r1, '.pt-st'), T.w(5, ['aprendimos']) + .4, { rot: -10, amp: 6 });
      // ---------- beats 6–8: ronda 2 · el duelo
      tl.to([rh1, r1, f1], { autoAlpha: 0, x: -80, duration: .35, stagger: .04, ease: 'power2.in' }, T.b(6) - .4);
      const rh2 = q(cam, '.rh2'), r2 = q(cam, '.pt-idea.r2'), f2 = q(cam, '.pt-fb.f2');
      A.rise(rh2, T.b(6) - .05, { y: -20 });
      A.rise(r2, T.b(6) + .05, { y: 60 });
      A.rise(q(r2, '.n2-set'), T.w(6, ['ya']) - .05, { y: 14 });
      A.rise(q(r2, '.n2-hr'), T.w(6, ['huele']) - .1, { y: 18 });
      A.pop(q(r2, '.n2-vs'), T.w(6, ['papas']) - .1, { from: .6 });
      tl.fromTo(qa(r2, '.n2-vs span'), { x: k => (k ? 70 : -70) }, { x: 0, duration: .5, ease: 'back.out(2)', stagger: .12, immediateRender: false }, T.w(6, ['papas']) - .1);
      A.slam(q(r2, '.n2-vs i'), T.w(6, ['oeste', 'viejo']) - .1, { from: 2.4, amp: 6 });
      A.rise(q(r2, '.n2-sm'), T.w(6, ['arranca']) - .1, { y: 12 });
      const chips = qa(r2, '.n2-chips span');
      [T.w(7, ['entrenadores']), T.w(7, ['competidores']), T.w(7, ['huggies'])].forEach((t, k) => A.pop(chips[k], t - .15, { from: .5 }));
      A.pop(q(r2, '.n2-sl'), T.w(7, ['eslogan']) - .1, { from: .6 });
      A.rise(q(r2, '.n2-tw'), T.w(7, ['giro']) - .1, { y: 14 });
      A.rise(f2, T.b(8) - .05, { y: 40 });
      const l2 = qa(f2, 'li');
      A.rise(l2[0], T.w(8, ['no se puede', 'perdedor']) - .1, { y: 14 });
      A.rise(l2[1], T.w(8, ['enemigo']) - .1, { y: 14 });
      A.pop(q(f2, '.pt-learn'), T.w(8, ['aprendimos']) - .1, { from: .7 });
      A.stamp(q(r2, '.pt-st'), T.w(8, ['aprendimos']) + .4, { rot: -10, amp: 6 });
      tl.to(q(r2, '.n2-chips'), { opacity: .45, duration: .3 }, T.w(8, ['competencia']));
    }
  };

  /* =====================================================================
     N3 · LA LLUVIA DE IDEAS (2/2): ronda 3 (la que quedó) y el filtro de frases
     ===================================================================== */
  const PTS = [
    ['Un solo bebé.', 'Sin competencia y sin perdedores.', ['solo']],
    ['El olor es solo el detonante,', 'y no es malo: si el popó está guardadito, el bebé está cómodo.', ['olor']],
    ['Un narrador desde afuera', 'cuenta lo que pasa en la cabeza de todos.', ['narrador']],
    ['Cada invitado se hace su película,', 'y cada película es un miedo del insight.', ['invitado']],
    ['Los papás revisan…', `y cierra el narrador: «Uff, es solo olor. La ${M.censor('m*erda')} no se salió.»`, ['revisan']]
  ];
  const PH = [
    ['«Salir, sin que se salga»', 'Servía si la historia empezaba en la invitación, pero ya estaban en el plan.', 'Descartada', ''],
    ['«Gana el que no se sale»', 'Hablaba de competencia, y ya no la había.', 'Descartada', ''],
    ['«Que no te gane la popó»', 'Casi, pero seguía hablando de ganar.', 'Casi', 'casi'],
    ['«Tranqui, es solo olor»', 'Suena bien sola, pero con la marca no pega.', 'Queda en la voz del narrador', 'voz']
  ];
  E.n3 = {
    build(cam, T, tl, A) {
      cam.innerHTML = `
      ${RH('rh3', 'Brainstorming · ronda 3 de 3', 'Un bebé y muchas películas', 3)}
      <div class="n3-flow">
        <div class="n3-ins o0"><span class="lbl">Volvimos al insight</span><p class="fr">«No le tengo miedo al popó. Le tengo miedo a <span class="red">lo que pasa cuando se sale</span>.»</p></div>
        <i class="n3-ar o0">→</i>
        <div class="n3-st o0">${ICO.gente}<b class="anton">Habla desde los papás</b></div>
        <i class="n3-ar o0">→</i>
        <div class="n3-st o0">${ICO.cabeza}<b class="anton">La historia pasa en la cabeza de la gente</b></div>
      </div>
      <div class="n3-list o0">${PTS.map((p, k) => `<div class="o0"><span class="anton">${k + 1}</span><p><b>${p[0]}</b> ${p[1]}</p></div>`).join('')}<span class="pt-st win anton o0">Elegida</span></div>
      ${RH('rh4', 'Después de las tres rondas', 'El filtro de frases', 0)}
      <div class="n3-ph">${PH.map(p => `<div class="o0"><p class="fr">${p[0]}</p><span>${p[1]}</span><b class="anton o0 ${p[3]}">${p[2]}</b></div>`).join('')}</div>
      <div class="n3-win o0"><span>La que quedó</span><b class="fr">«Lo que pasa en el pañal, se queda en el pañal.»</b><i class="fri">Más adelante les contamos por qué.</i></div>
      <div class="lay n3-spk"></div>`;

      // ---------- beat 0: volvimos al insight → habla desde los papás → pasa en la cabeza de la gente
      A.rise(q(cam, '.rh3'), .1, { y: -20 });
      A.rise(q(cam, '.n3-ins'), T.w(0, ['volvimos']) - .1, { y: 40 });
      const ar = qa(cam, '.n3-ar'), st = qa(cam, '.n3-st');
      [T.w(0, ['papas']), T.w(0, ['cabeza'])].forEach((t, k) => {
        A.fade(ar[k], t - .45, .3);
        A.pop(st[k], t - .3, { from: .5 });
        qa(st[k], 'path,circle,rect').forEach(p => A.draw(p, t - .2, .6));
      });
      // ---------- beats 1–2: los cinco puntos de la idea
      tl.to([q(cam, '.n3-ins')].concat(ar, st), { autoAlpha: 0, y: -40, duration: .35, stagger: .04, ease: 'power2.in' }, T.b(1) - .4);
      const ls = q(cam, '.n3-list'), rows = qa(ls, ':scope > div');
      A.rise(ls, T.b(1) - .1, { y: 50 });
      PTS.forEach((p, k) => A.rise(rows[k], T.w(k < 2 ? 1 : 2, p[2]) - .15, { y: 20 }));
      A.censor(q(rows[4], '.cen'), T.w(2, ['no se']) - .7);
      // ---------- beat 3: la elegida, y el filtro de frases
      A.stamp(q(ls, '.pt-st'), T.w(3, ['quedo', 'idea']) - .1, { rot: -8, amp: 10 });
      tl.fromTo(ls, { boxShadow: '0 18px 40px rgba(42,33,24,.12)' }, { boxShadow: '0 0 0 8px #2F7A3B, 0 24px 60px rgba(47,122,59,.3)', duration: .4, immediateRender: false }, T.w(3, ['quedo', 'idea']));
      A.sparkle(q(cam, '.n3-spk'), 1640, 330, T.w(3, ['quedo', 'idea']) + .1, { n: 18, r: 360, size: 40 });
      const tF = T.w(3, ['filtro']);
      A.out(ls, tF - .2, { d: .35, y: 60 });
      A.out(q(cam, '.rh3'), tF - .2, { d: .3 });
      A.rise(q(cam, '.rh4'), tF, { y: -20 });
      // ---------- beats 4–5: las cuatro frases que no quedaron
      const ph = qa(cam, '.n3-ph > div');
      const tIn = [T.w(4, ['salir']), T.w(4, ['gana']), T.w(5, ['que no te', 'gane']), T.w(5, ['tranqui'])];
      const tVd = [T.w(4, ['descartada']), T.w(4, ['descartada'], 1), T.w(5, ['casi']), T.w(5, ['voz', 'narrador'])];
      ph.forEach((c, k) => {
        A.rise(c, tIn[k] - .15, { y: 40 });
        A.stamp(q(c, 'b'), tVd[k] - .05, { rot: k % 2 ? 6 : -6, amp: 5 });
        if (k < 2) tl.to(q(c, 'p'), { opacity: .45, duration: .3 }, tVd[k] + .2);
      });
      // ---------- beat 6: la ganadora
      const tW = T.w(6, ['lo que pasa', 'pasa']);
      tl.to(ph, { opacity: .18, scale: .96, duration: .4 }, tW - .3);
      A.slam(q(cam, '.n3-win'), tW - .1, { from: 1.4, amp: 10 });
      A.sparkle(q(cam, '.n3-spk'), 960, 560, tW + .2, { n: 26, r: 720, size: 46 });
      A.rise(q(cam, '.n3-win i'), T.w(6, ['adelante', 'mas']) - .1, { y: 12 });
    }
  };


  /* =====================================================================
     N4 · EL MAPA DE LA HISTORIA: ficha por ficha (personajes, escenario, conflicto, producto)
     ===================================================================== */
  const FICHAS = [['gente', 'Personajes'], ['casa', 'Escenario'], ['rayo', 'Conflicto'], ['panal', 'El producto']];
  const AV = (l, c) => `<i class="pt-av" style="--c:${c}">${l}</i>`;
  E.n4 = {
    build(cam, T, tl, A) {
      cam.innerHTML = `
      <div class="lay n4-head">
        <p class="ctr anton au n4-t" style="top:200px;font-size:160px">El mapa de la historia</p>
        <div class="n4-map">${FICHAS.map(m => `<div class="o0">${ICO[m[0]]}<span class="anton">${m[1]}</span></div>`).join('')}</div>
      </div>
      <div class="n4-tabs o0">${FICHAS.map(m => `<span class="anton">${m[1]}</span>`).join('<i></i>')}</div>

      <div class="lay n4-p1">
        <div class="pt-card n4-pro o0" style="left:100px;top:250px;width:1000px;height:290px">
          <div class="n4-avs">${AV('M', '#C9733F')}${AV('C', '#8F6F33')}</div>
          <div><span class="pt-lbl">Protagonistas</span><b class="anton n4-nm">María y Carlos</b>
          <p class="n4-tx">Papás primerizos, de entre 28 y 35 años, <b>que no quieren dejar de salir.</b></p></div></div>
        <div class="pt-card n4-bb o0" style="left:1140px;top:250px;width:680px;height:290px">
          <svg class="n4-baby" viewBox="0 0 120 130"><circle cx="60" cy="40" r="26" fill="#FFF8EC" stroke="#8F6F33" stroke-width="5"/><path d="M50 37v3M70 37v3M51 50q9 7 18 0" fill="none" stroke="#8F6F33" stroke-width="5" stroke-linecap="round"/><path d="M34 74q26-12 52 0l-6 40H40z" fill="#FFFFFF" stroke="#8F6F33" stroke-width="5" stroke-linejoin="round"/></svg>
          <div><span class="pt-lbl">Su bebé</span><p class="n4-tx">Tierno y tranquilo.</p><span class="n4-nv anton o0">Nunca es el villano</span></div></div>
        <div class="pt-card n4-am o0" style="left:100px;top:575px;width:760px;height:305px"><span class="pt-lbl">Los amigos</span>
          ${[['Mariela', 'la anfitriona', '#CD1618', 'mariela'], ['Marcela', 'la amiga', '#BC924A', 'marcela'], ['Natalia', 'y su pareja', '#5A4B3A', 'natalia']].map(a => `<div class="n4-fr o0">${AV(a[0][0], a[2])}<b>${a[0]}</b><span>${a[1]}</span></div>`).join('')}</div>
        <div class="pt-card n4-na o0" style="left:895px;top:575px;width:450px;height:305px">${ICO.mic}<span class="pt-lbl">El narrador</span><p class="n4-tx">Cuenta lo que piensa cada uno, con tensión y humor.</p></div>
        <div class="pt-card n4-vi o0" style="left:1380px;top:575px;width:440px;height:305px"><span class="pt-lbl">El villano</span><p class="fr n4-vt">El popó cuando se sale…</p><span class="n4-nunca anton o0">¡Nunca llega a pasar!</span></div>
      </div>

      <div class="lay n4-p2">
        <div class="pt-card n4-es o0" style="left:100px;top:250px;width:1080px;height:630px"><span class="pt-lbl">Escenario</span>
          <p class="n4-row o0">${ICO.luna}<span><b>Cuándo:</b> un sábado en la noche.</span></p>
          <p class="n4-row o0">${ICO.casa}<span><b>Dónde:</b> el apartamento de Mariela.</span></p>
          <svg class="n4-sofa" viewBox="0 0 640 300"><path class="ln" d="M60 230V150q0-28 30-30q8-70 230-70t230 70q30 2 30 30v80z" fill="#FFFFFF" stroke="#8F6F33" stroke-width="7" stroke-linejoin="round"/><path class="ln" d="M90 230v34M550 230v34M100 172h440" fill="none" stroke="#8F6F33" stroke-width="7" stroke-linecap="round"/><ellipse class="ln" cx="320" cy="282" rx="290" ry="14" fill="none" stroke="#D9B56A" stroke-width="5"/></svg>
          <span class="n4-tag o0" style="left:120px;top:440px">Sofá blanco</span><span class="n4-tag o0" style="left:640px;top:560px">Tapete nuevo</span></div>
        <div class="pt-card n4-mo o0" style="left:1220px;top:250px;width:600px;height:630px">${ICO.corazon}<span class="pt-lbl">Motivación</span><p class="fr n4-mt">Seguir teniendo vida social con el bebé.</p></div>
      </div>

      <div class="lay n4-p3">
        <div class="pt-card n4-co o0" style="left:100px;top:250px;width:640px;height:480px">${ICO.ojo}<span class="pt-lbl">Conflicto · social</span><p class="fr n4-ct">La mirada y el juicio de los amigos.</p></div>
        <div class="pt-card n4-em o0" style="left:780px;top:250px;width:1040px;height:480px"><span class="pt-lbl">Emoción → sentimiento</span>
          <svg class="n4-curve" viewBox="0 0 960 300"><path class="cv" d="M40 250 C 200 240, 260 120, 470 60 C 600 25, 640 230, 920 210" fill="none" stroke="#CD1618" stroke-width="8" stroke-linecap="round"/></svg>
          ${[['Temor y asco', 50, 300, 'temor'], ['Tensión', 420, 110, 'tension'], ['Alivio', 800, 300, 'alivio']].map(p => `<span class="n4-pt o0" style="left:${p[1]}px;top:${p[2]}px">${p[0]}</span>`).join('')}</div>
        <div class="n4-tono o0"><span class="pt-lbl">Tono</span>${['Irreverente', 'Exagerado', 'Coloquial'].map(x => `<b class="anton o0">${x}</b>`).join('')}</div>
      </div>

      <div class="lay n4-p4">
        <p class="n4-ph o0"><span class="pt-lbl">El producto dentro de la historia</span></p>
        ${[['escudo', 'Bloqueo por delante y por detrás', 'Por eso no se sale.'], ['pluma', 'Capa suave', 'El bebé sigue cómodo aunque haya hecho.'], ['gota', 'Indicador de humedad', 'Carlos sabe, sin hacer escándalo.']].map((r, k) => `
          <div class="n4-pr o0" style="top:${320 + k * 106}px"><span class="n4-at">${ICO[r[0]]}<b>${r[1]}</b></span><i>→</i><span class="fr n4-ef">${r[2]}</span></div>`).join('')}
        <div class="n4-ban o0"><img src="assets/logos/huggies-logo.svg" alt="Huggies"><p class="fr">convierte la ${M.strike('película de terror')} en <span class="red">«es solo olor».</span></p></div>
        <div class="n4-go o0"><p>${ICO.claqueta}<b class="anton">Ahora sí, la historia</b></p></div>
      </div>
      <div class="lay n4-spk"></div>`;

      // ---------- beat 0: el mapa y sus cuatro fichas
      A.track(q(cam, '.n4-t'), .15, { d: 1.1 });
      const mp = qa(cam, '.n4-map > div'), tM = T.w(0, ['mapa']);
      mp.forEach((m, k) => {
        const t = tM + .15 + k * Math.max(.25, (T.w(0, ['ficha']) - tM) / 4);
        A.pop(m, t, { from: .4 });
        qa(m, 'path,circle,rect').forEach(p => A.draw(p, t + .05, .6));
      });
      A.out(q(cam, '.n4-head'), T.b(1) - .4, { d: .35, y: -60 });
      const tabs = q(cam, '.n4-tabs'), tb = qa(tabs, 'span');
      A.rise(tabs, T.b(1) - .25, { y: -20 });
      lightRow(tl, tb, 0, T.b(1) - .2); lightRow(tl, tb, 1, T.b(3) - .2); lightRow(tl, tb, 2, T.b(4) - .2); lightRow(tl, tb, 3, T.b(5) - .2);
      // ---------- beats 1–2: los personajes
      const pro = q(cam, '.n4-pro'), bb = q(cam, '.n4-bb');
      A.rise(pro, T.w(1, ['protagonistas']) - .15, { y: 40 });
      A.pop(qa(pro, '.pt-av')[0], T.w(1, ['maria']) - .1, { from: .3 });
      A.pop(qa(pro, '.pt-av')[1], T.w(1, ['carlos']) - .1, { from: .3 });
      A.rise(bb, T.w(1, ['bebe']) - .15, { y: 40 });
      A.stamp(q(bb, '.n4-nv'), T.w(1, ['villano']) - .1, { rot: -6, amp: 6 });
      const am = q(cam, '.n4-am'), fr = qa(am, '.n4-fr');
      A.rise(am, T.w(2, ['amigos']) - .15, { y: 40 });
      ['mariela', 'marcela', 'natalia'].forEach((w, k) => A.rise(fr[k], T.w(2, [w]) - .1, { y: 16 }));
      const na = q(cam, '.n4-na');
      A.rise(na, T.w(2, ['narrador']) - .15, { y: 40 });
      qa(na, 'path,circle,rect').forEach(p => A.draw(p, T.w(2, ['narrador']), .6));
      const vi = q(cam, '.n4-vi');
      A.rise(vi, T.w(2, ['villano']) - .15, { y: 40 });
      A.stamp(q(vi, '.n4-nunca'), T.w(2, ['nunca']) - .05, { rot: -8, amp: 8 });
      // ---------- beat 3: escenario y motivación
      tl.to(qa(cam, '.n4-p1 .pt-card'), { autoAlpha: 0, y: -40, duration: .35, stagger: .03, ease: 'power2.in' }, T.b(3) - .45);
      const es = q(cam, '.n4-es');
      A.rise(es, T.b(3) - .05, { y: 40 });
      const er = qa(es, '.n4-row');
      A.rise(er[0], T.w(3, ['sabado']) - .15, { y: 14 });
      A.rise(er[1], T.w(3, ['apartamento']) - .15, { y: 14 });
      qa(es, '.n4-sofa .ln').forEach((p, j) => A.draw(p, T.w(3, ['sofa']) - .3 + j * .1, .8));
      const tg = qa(es, '.n4-tag');
      A.pop(tg[0], T.w(3, ['sofa']) - .05, { from: .5 });
      A.pop(tg[1], T.w(3, ['tapete']) - .05, { from: .5 });
      const mo = q(cam, '.n4-mo');
      A.rise(mo, T.w(3, ['motivacion']) - .15, { y: 40 });
      qa(mo, 'path,circle,rect').forEach(p => A.draw(p, T.w(3, ['motivacion']), .6));
      // ---------- beat 4: conflicto, emoción y tono
      tl.to([es, mo], { autoAlpha: 0, y: -40, duration: .35, stagger: .04, ease: 'power2.in' }, T.b(4) - .45);
      const co = q(cam, '.n4-co');
      A.rise(co, T.b(4) - .05, { y: 40 });
      qa(co, 'path,circle,rect').forEach(p => A.draw(p, T.b(4) + .1, .6));
      const em = q(cam, '.n4-em'), pt = qa(em, '.n4-pt'), tE = T.w(4, ['temor']), tA = T.w(4, ['alivio']);
      A.rise(em, tE - .3, { y: 40 });
      A.draw(q(em, '.cv'), tE, Math.max(.8, tA - tE + .3), { ease: 'none' });
      [tE, T.w(4, ['tension']), tA].forEach((t, k) => A.pop(pt[k], t - .05, { from: .5 }));
      const tono = q(cam, '.n4-tono'), tb2 = qa(tono, 'b');
      A.rise(tono, T.w(4, ['tono']) - .2, { y: 20 });
      ['irreverente', 'exagerado', 'coloquial'].forEach((w, k) => A.pop(tb2[k], T.w(4, [w]) - .1, { from: .5 }));
      // ---------- beats 5–6: el producto dentro de la historia
      tl.to([co, em, tono], { autoAlpha: 0, y: -40, duration: .35, stagger: .04, ease: 'power2.in' }, T.b(5) - .45);
      A.rise(q(cam, '.n4-ph'), T.b(5) - .05, { y: 14 });
      const prs = qa(cam, '.n4-pr');
      ['bloqueo', 'capa', 'indicador'].forEach((w, k) => {
        const t = T.w(5, [w]);
        A.rise(prs[k], t - .15, { y: 24 });
        qa(prs[k], 'path,circle,rect').forEach(p => A.draw(p, t, .6));
      });
      const ban = q(cam, '.n4-ban');
      A.pop(ban, T.b(6) - .05, { from: .7 });
      A.strike(q(ban, '.strk'), T.w(6, ['terror']) + .3);
      A.sparkle(q(cam, '.n4-spk'), 1300, 760, T.w(6, ['solo', 'olor']) + .1, { n: 18, r: 420, size: 40 });
      tl.to(ban, { autoAlpha: 0, y: -20, duration: .3 }, T.w(6, ['ahora']) - .35);
      tl.to(prs, { opacity: .35, duration: .3 }, T.w(6, ['ahora']) - .3);
      A.slam(q(cam, '.n4-go'), T.w(6, ['ahora']) - .1, { from: 1.5, amp: 8 });
    }
  };

  /* =====================================================================
     N5 · LA HISTORIA: intro, nudo (la película de cada uno = un miedo) y desenlace con suspenso
     ===================================================================== */
  const MOV = [
    { who: 'Película 1 · Mariela, la anfitriona', p: 'El popó se sale y su sofá blanco, el nuevo, queda manchado para siempre.', f: 'Que se dañe lo ajeno', ico: 'sofa', pos: 'left:150px;top:250px', w: 'mariela' },
    { who: 'Película 2 · Marcela, la amiga', p: '«¿No lo cambiaron antes de venir?» Y ya está escribiendo el chisme en el grupo.', f: 'Lo que piensen los demás', ico: 'chat', pos: 'left:990px;top:250px', w: 'marcela' },
    { who: 'Película 3 · Natalia y su pareja', p: 'Alguien dice «mejor nos vamos», y la fiesta se acaba antes de la pizza.', f: 'Que se arruine el plan', ico: 'pizza', pos: 'left:150px;top:595px', w: 'natalia' },
    { who: 'Película 4 · María y Carlos, los papás', p: 'Su último plan: encerrados en la casa hasta que el bebé cumpla 15.', f: 'Perder la libertad', ico: 'candado', pos: 'left:990px;top:595px', w: 'maria' }
  ];
  const EYES = [[330, 400], [1460, 380], [420, 700], [1390, 690]];
  E.n5 = {
    build(cam, T, tl, A) {
      cam.innerHTML = `
      <div class="n5-acts o0">${['La intro', 'El nudo', 'El desenlace'].map(a => `<span class="anton">${a}</span>`).join('<i></i>')}</div>
      <div class="lay n5-room">
        <svg class="n5-sofa" viewBox="0 0 640 300"><path class="ln" d="M60 230V150q0-28 30-30q8-70 230-70t230 70q30 2 30 30v80z" fill="#FFFFFF" stroke="#8F6F33" stroke-width="7" stroke-linejoin="round"/>
          <path class="ln" d="M90 230v34M550 230v34M100 172h440" fill="none" stroke="#8F6F33" stroke-width="7" stroke-linecap="round"/>
          <ellipse class="ln" cx="320" cy="282" rx="290" ry="14" fill="none" stroke="#D9B56A" stroke-width="5"/></svg>
        <svg class="n5-baby o0" viewBox="0 0 120 130"><circle cx="60" cy="40" r="26" fill="#FFF8EC" stroke="#8F6F33" stroke-width="5"/><path d="M50 37v3M70 37v3M51 50q9 7 18 0" fill="none" stroke="#8F6F33" stroke-width="5" stroke-linecap="round"/>
          <path d="M34 74q26-12 52 0l-6 40H40z" fill="#FFFFFF" stroke="#8F6F33" stroke-width="5" stroke-linejoin="round"/></svg>
        <div class="n5-clock o0"><b class="anton">Sáb · 9:47 p. m.</b><span>Apartamento de Mariela</span></div>
        <div class="n5-who o0"><span class="anton">María y Carlos</span> llegaron con su bebé</div>
        <p class="cv red n5-adult o0">¡Por fin, un plan de adultos!</p>
        ${['♪', '♫', '♪'].map((n, k) => `<i class="n5-note o0" style="left:${760 + k * 170}px;top:${330 + (k % 2) * 40}px">${n}</i>`).join('')}
        <span class="cv n5-ja o0" style="left:470px;top:470px">¡ja, ja, ja!</span><span class="cv n5-ja o0" style="left:1300px;top:520px">¡qué picada!</span>
        <svg class="n5-smell" viewBox="0 0 220 260">${[0, 1, 2].map(k => `<path class="sm" d="M${50 + k * 60} 250 q-24 -40 0 -80 t0 -80 t0 -80" fill="none" stroke="#7FA35A" stroke-width="9" stroke-linecap="round" stroke-dasharray="2 16"/>`).join('')}</svg>
      </div>
      <div class="n5-dim o0"></div>
      <div class="n5-spot o0"></div>
      <i class="n5-ring o0"></i>
      ${EYES.map(e => `<i class="n5-eye o0" style="left:${e[0]}px;top:${e[1]}px"><b><u></u></b><b><u></u></b></i>`).join('')}
      <p class="ctr fri n5-quiet o0" style="top:250px;font-size:60px">La música sigue… pero nadie habla.</p>
      <p class="ctr anton n5-q o0" style="top:330px;font-size:130px">¿Quién se ${M.censor('c*gó')}?</p>
      <div class="n5-nar o0">${ICO.mic}<b class="anton">Entra el narrador</b></div>
      <p class="ctr n5-rule o0" style="top:533px"><span>Cada película = un miedo del insight</span></p>
      ${MOV.map(m => `<div class="n5-fr o0" style="${m.pos}"><p class="n5-fh">${m.who}</p><div class="n5-fc o0">${ICO[m.ico]}<p class="fr">${m.p}</p></div><span class="n5-ff o0">Su miedo: ${m.f}</span></div>`).join('')}
      <div class="n5-lb t"></div><div class="n5-lb b"></div>
      ${['Carlos se levanta.', 'La música se apaga.', 'Todos lo miran.', 'Levanta al bebé…', 'lo voltea, despacio…', 'y revisa.'].map(x => `<p class="ctr fr n5-dl o0" style="top:230px">${x}</p>`).join('')}
      <p class="ctr anton n5-uff o0" style="top:210px;font-size:230px">¡Uff!</p>
      <p class="ctr fr n5-so o0" style="top:450px;font-size:96px">Es solo olor.</p>
      <p class="ctr fr n5-ms o0" style="top:590px;font-size:74px">La ${M.censor('m*erda')} no se salió.</p>
      <p class="ctr fr gold n5-ok0 o0" style="top:226px;font-size:58px">Todo está en su lugar.</p>
      ${[['El bebé sonríe', 'left:120px;top:330px', 'sonrie'], ['Mariela respira', 'left:120px;top:460px', 'respira'], ['Marcela guarda el celular', 'right:120px;top:330px', 'guarda'], ['Llega la pizza', 'right:120px;top:460px', 'pizza']].map(c => `<span class="n5-ok o0" style="${c[1]}">✓ ${c[0]}</span>`).join('')}
      <p class="ctr anton au n5-fs o0" style="top:770px;font-size:110px">¡Y la fiesta sigue!</p>
      <div class="lay n5-spk"></div>`;

      const room = q(cam, '.n5-room'), acts = q(cam, '.n5-acts'), aS = qa(acts, 'span');
      A.rise(acts, .05, { y: -20 });
      lightRow(tl, aS, 0, .1); lightRow(tl, aS, 1, T.b(2) - .1); lightRow(tl, aS, 2, T.b(8) - .1);
      // ---------- beat 0: la intro, sábado 9:47
      A.fade(q(room, '.n5-sofa'), .15, .7);
      qa(room, '.n5-sofa .ln').forEach((p, j) => A.draw(p, .2 + j * .12, .9));
      A.rise(q(room, '.n5-clock'), T.w(0, ['sabado']) - .15, { y: 20 });
      const notes = qa(room, '.n5-note'), tMu = T.w(0, ['musica']);
      notes.forEach((n, j) => { A.fade(n, tMu + j * .15, .4); tl.fromTo(n, { y: 0 }, { y: -26, duration: .9, yoyo: true, repeat: 9, ease: 'sine.inOut', immediateRender: false }, tMu + j * .15); });
      const ja = qa(room, '.n5-ja');
      A.pop(ja[1], T.w(0, ['picada']) - .1, { from: .4, rot: 8, toRot: 4 });
      A.pop(ja[0], T.w(0, ['risas']) - .1, { from: .4, rot: -8, toRot: -4 });
      // ---------- beat 1: llegan María y Carlos con su bebé
      tl.fromTo(q(room, '.n5-baby'), { autoAlpha: 0, y: 40, scale: .6 }, { autoAlpha: 1, y: 0, scale: 1, duration: .6, ease: 'back.out(2)', immediateRender: false }, T.w(1, ['bebe']) - .2);
      A.rise(q(room, '.n5-who'), T.w(1, ['maria']) - .15, { y: 20 });
      A.pop(q(room, '.n5-adult'), T.w(1, ['por fin', 'fin']) - .1, { from: .5, rot: -12, toRot: -5 });
      // ---------- beat 2: el nudo · la música sigue, nadie habla, se siente un olor
      tl.to([q(room, '.n5-adult'), q(room, '.n5-clock'), q(room, '.n5-who')].concat(ja), { autoAlpha: 0, duration: .3 }, T.b(2) - .2);
      const dim = q(cam, '.n5-dim'), tOl = T.w(2, ['olor']);
      tl.fromTo(dim, { autoAlpha: 0 }, { autoAlpha: .55, duration: .6, immediateRender: false }, T.w(2, ['nadie']) - .2);
      A.rise(q(cam, '.n5-quiet'), T.w(2, ['musica']) - .1, { y: 14 });
      tl.to(notes, { autoAlpha: 0, duration: .3 }, tOl - .2);
      A.out(q(cam, '.n5-quiet'), tOl - .15, { d: .3 });
      qa(room, '.n5-smell .sm').forEach((p, j) => { A.draw(p, tOl - .1 + j * .12, .9); tl.fromTo(p, { y: 0 }, { y: -18, duration: .8, yoyo: true, repeat: 9, ease: 'sine.inOut', immediateRender: false }, tOl + j * .12); });
      tl.to(dim, { autoAlpha: 1, duration: .5 }, tOl + .2);
      const eyes = qa(cam, '.n5-eye'), pup = qa(cam, '.n5-eye u'), tMi = T.w(2, ['miran']);
      eyes.forEach((e, k) => A.fade(e, tMi - .2 + k * .08, .25));
      tl.fromTo(pup, { x: -9 }, { x: 9, duration: .35, yoyo: true, repeat: 5, ease: 'power2.inOut', immediateRender: false }, tMi);
      const qn = q(cam, '.n5-q'), tQ = T.w(2, ['quien']);
      tl.to(eyes, { autoAlpha: 0, duration: .3 }, tQ - .3);
      A.slam(qn, tQ - .1, { from: 1.6, amp: 10 });
      A.censor(q(qn, '.cen'), T.e(2) - .55);
      // ---------- beat 3: entra el narrador · cada quien se hace su película
      tl.to(qn, { y: -150, scale: .45, duration: .6, ease: 'expo.inOut' }, T.b(3) - .2);
      tl.to(qn, { autoAlpha: 0, duration: .3 }, T.w(3, ['pelicula']) - .3);
      const nar = q(cam, '.n5-nar');
      tl.fromTo(nar, { autoAlpha: 0, x: -120 }, { autoAlpha: 1, x: 0, duration: .5, ease: 'expo.out', immediateRender: false }, T.w(3, ['narrador']) - .15);
      qa(nar, 'path,circle,rect').forEach(p => A.draw(p, T.w(3, ['narrador']), .5));
      tl.to(nar, { autoAlpha: 0, x: -60, duration: .3 }, T.w(3, ['pelicula']) - .3);
      const frs = qa(cam, '.n5-fr'), tP = T.w(3, ['pelicula']);
      frs.forEach((f, k) => tl.fromTo(f, { autoAlpha: 0, scale: .4, rotation: k % 2 ? 4 : -4 }, { autoAlpha: 1, scale: 1, rotation: 0, duration: .5, ease: 'back.out(1.6)', immediateRender: false }, tP - .1 + k * .12));
      A.rise(q(cam, '.n5-rule'), T.w(3, ['miedos', 'cada pelicula']) - .1, { y: 14 });
      // ---------- beats 4–7: la película de cada uno, y su miedo
      MOV.forEach((m, k) => {
        const b = 4 + k, t = T.w(b, [m.w]), f = frs[k];
        tl.to(frs.filter((x, j) => j !== k), { opacity: .38, scale: .97, duration: .3 }, T.b(b) - .25);
        tl.to(f, { opacity: 1, scale: 1.04, boxShadow: '0 0 0 6px #CD1618, 0 30px 70px rgba(0,0,0,.55)', duration: .35 }, T.b(b) - .25);
        A.rise(q(f, '.n5-fc'), t - .15, { y: 20 });
        qa(f, '.n5-fc path,.n5-fc circle,.n5-fc rect').forEach(p => A.draw(p, t, .6));
        A.stamp(q(f, '.n5-ff'), T.w(b, ['miedo']) - .05, { rot: k % 2 ? 3 : -3, amp: 5 });
        if (k < 3) tl.to(f, { scale: 1, boxShadow: '0 20px 50px rgba(0,0,0,.45)', duration: .3 }, T.b(b + 1) - .25);
      });
      // ---------- beat 8: el desenlace · suspenso
      const t8 = T.b(8);
      tl.to(frs, { autoAlpha: 0, scale: .2, duration: .4, stagger: .05, ease: 'power2.in' }, t8 - .35);
      A.out(q(cam, '.n5-rule'), t8 - .35, { d: .3 });
      const lb = qa(cam, '.n5-lb');
      tl.fromTo(lb, { scaleY: 0 }, { scaleY: 1, duration: .7, ease: 'expo.inOut', immediateRender: false }, t8);
      const spot = q(cam, '.n5-spot');
      tl.to(dim, { autoAlpha: 0, duration: .6 }, t8 + .2);
      A.fade(spot, t8 + .1, .8);
      tl.fromTo(room, { scale: 1 }, { scale: 1.22, duration: Math.max(1, T.e(8) - t8 + .3), ease: 'none', immediateRender: false }, t8);
      const dl = qa(cam, '.n5-dl'), tDl = [T.w(8, ['carlos']), T.w(8, ['musica']), T.w(8, ['todos']), T.w(8, ['levanta'], 1), T.w(8, ['voltea']), T.w(8, ['revisa'])];
      dl.forEach((d, k) => {
        A.rise(d, tDl[k] - .1, { y: 20, d: .5 });
        if (k < dl.length - 1) A.out(d, tDl[k + 1] - .2, { d: .2, y: -16 });
      });
      tl.to(qa(room, '.n5-smell .sm'), { opacity: .25, duration: .4 }, tDl[1]);
      eyes.forEach((e, k) => A.fade(e, tDl[2] - .1 + k * .06, .25));
      tl.to(pup, { x: (k) => (EYES[Math.floor(k / 2)][0] < 960 ? 9 : -9), y: (k) => (EYES[Math.floor(k / 2)][1] < 600 ? 5 : -5), duration: .3 }, tDl[2]);
      const ring = q(cam, '.n5-ring'), tR = tDl[3], nR = Math.max(1, Math.floor((T.e(8) + .2 - tR) / .85));
      tl.fromTo(ring, { autoAlpha: .9, scale: .7 }, { autoAlpha: 0, scale: 1.5, duration: .85, repeat: nR - 1, ease: 'power1.out', immediateRender: false }, tR);
      // ---------- beat 9: ¡Uff! Es solo olor
      const tU = T.w(9, ['uff']);
      A.flash(tU - .05, { a: .95, d: .5 });
      tl.to(lb, { scaleY: 0, duration: .4, ease: 'power2.in' }, tU - .05);
      tl.to([spot, dim, dl[5]].concat(eyes), { autoAlpha: 0, duration: .3 }, tU - .05);
      tl.to(room, { scale: 1, opacity: .2, duration: .5 }, tU - .05);
      tl.to(qa(room, '.n5-smell .sm'), { autoAlpha: 0, duration: .3 }, tU);
      A.slam(q(cam, '.n5-uff'), tU - .05, { from: 1.9, amp: 14 });
      A.rise(q(cam, '.n5-so'), T.w(9, ['es solo', 'solo']) - .1, { y: 24 });
      const ms = q(cam, '.n5-ms');
      A.rise(ms, T.w(9, ['solo']) + .45, { y: 24 });
      A.censor(q(ms, '.cen'), T.w(9, ['no se', 'no']) - .7);
      A.sparkle(q(cam, '.n5-spk'), 960, 330, tU + .1, { n: 26, r: 760, size: 50 });
      // ---------- beat 10: todo en su lugar · la fiesta sigue
      const t10 = T.b(10);
      tl.to(qa(cam, '.n5-uff,.n5-so,.n5-ms'), { autoAlpha: 0, y: -30, duration: .35, stagger: .04 }, t10 - .3);
      tl.to(room, { opacity: 1, duration: .5 }, t10 - .2);
      A.rise(q(cam, '.n5-ok0'), t10, { y: 16 });
      const ok = qa(cam, '.n5-ok');
      ['sonrie', 'respira', 'guarda', 'pizza'].forEach((w, k) => A.pop(ok[k], T.w(10, [w]) - .1, { from: .5 }));
      tl.fromTo(q(room, '.n5-baby'), { rotation: 0 }, { rotation: 8, duration: .25, yoyo: true, repeat: 3, ease: 'sine.inOut', immediateRender: false }, T.w(10, ['sonrie']));
      const tF = T.w(10, ['fiesta']);
      A.slam(q(cam, '.n5-fs'), tF - .15, { from: 1.5, amp: 8 });
      A.sparkle(q(cam, '.n5-spk'), 960, 830, tF, { n: 26, r: 700, size: 46 });
      notes.forEach((n, j) => { tl.to(n, { autoAlpha: 1, duration: .3 }, tF + j * .1); tl.fromTo(n, { y: 0 }, { y: -26, duration: .9, yoyo: true, repeat: 3, ease: 'sine.inOut', immediateRender: false }, tF + j * .1); });
    }
  };


  /* =====================================================================
     N6–N7 · EL CONCEPTO DECODIFICADO: cada elemento, qué es y por qué
     arriba siempre el método: la sombrilla (concepto creativo) y las cuatro flechas
     ===================================================================== */
  const METODO = ['Titular', 'Tema de campaña', 'Eslogan', 'Concepto comercial'];
  const STRIP = () => `<div class="cd-strip">
      <div class="cd-arrow o0">${ICO.sombrilla}<span class="cd-al">Concepto creativo</span><b class="anton">Nada se sale de control</b></div>
      <div class="cd-chev">${METODO.map((t, k) => `<span class="anton o0">${k + 1} · ${t}</span>`).join('')}</div></div>`;
  // estado de las flechas: hechas (doradas), la actual (roja), las que faltan (claras)
  const chevState = (tl, ch, k, t) => ch.forEach((s, j) => tl.to(s, { backgroundColor: j === k ? '#CD1618' : (j < k ? '#BC924A' : '#E9DFCC'), color: j === k || j < k ? '#FFFFFF' : '#8F6F33', duration: .3 }, t));
  const WHY = (cls, h, items) => `<div class="cd-why o0 ${cls}"><p class="cd-wh">${h}</p>${items.map(x => `<div class="cd-wi o0">${x}</div>`).join('')}</div>`;

  E.n6 = {
    build(cam, T, tl, A) {
      cam.innerHTML = `
      <p class="ctr anton au n6-t" style="top:290px;font-size:160px">Concepto decodificado</p>
      <p class="ctr fri ink2 o0 n6-s" style="top:480px;font-size:52px">el método de la clase para aterrizar una idea</p>
      ${STRIP()}
      <div class="cd-pz o0 z1"><span class="pt-lbl">Concepto creativo · la sombrilla</span>${ICO.sombrilla}<b class="fr">Nada se sale de control.</b></div>
      ${WHY('w1', '¿Por qué?', [
        '<b>No habla de un solo plan:</b> es una sombrilla.',
        `<div class="cd-sit">${[['sofa', 'Comprar el sofá blanco'], ['casa', 'Recibir visitas'], ['corazon', 'Ir donde la suegra'], ['maleta', 'Un viaje']].map(s => `<span class="o0">${ICO[s[0]]}${s[1]}</span>`).join('')}</div>`,
        '<b>Debajo de esa frase caben muchas campañas,</b> no solo esta.'])}
      <div class="cd-pz o0 z2"><span class="pt-lbl">1 · Titular · lo primero que vemos</span>
        <div class="cd-news"><p class="cd-kk o0">¡Última hora!</p><p class="cd-dek o0">Olor sospechoso desata pánico en fiesta de amigos</p><p class="anton cd-hd o0">Hubo popó, pero no hubo víctimas</p><p class="cd-st">Estilo: prensa amarillista</p></div></div>
      ${WHY('w2', '¿Por qué así?', [
        `<b>En una sola línea cuenta toda la historia:</b><div class="cd-flow">${['El olor', 'El pánico', 'El final feliz'].map((x, k) => `<span class="o0">${x}</span>${k < 2 ? '<i class="o0">→</i>' : ''}`).join('')}</div>`,
        '<b>Es exagerado, da risa y genera intriga.</b>',
        'Como esos titulares que <b>uno no puede dejar de leer.</b>'])}
      <div class="cd-pz o0 z3"><span class="pt-lbl">2 · Tema de campaña · la historia que cobija todas las piezas</span>${ICO.claqueta}<b class="fr">«Cada quien se hace su película»</b></div>
      ${WHY('w3', '¿Por qué?', [
        '<b>Es lo que nos pasa a todos</b> cuando algo huele: imaginamos lo peor.',
        `<b>Da para muchas historias:</b><div class="cd-film">${['El cumpleaños', 'La oficina', 'El avión', 'La misa'].map(x => `<span class="o0">${x}</span>`).join('')}</div>`,
        'Cada una con sus películas, y <b>siempre el mismo final: no se salió.</b>'])}
      <div class="lay n6-spk"></div>`;

      // ---------- beat 0: el método
      A.track(q(cam, '.n6-t'), .15, { d: 1.1 });
      A.rise(q(cam, '.n6-s'), T.w(0, ['metodo']) - .1, { y: 18 });
      const tP = T.w(0, ['partes', 'vamos']);
      A.out(q(cam, '.n6-t'), tP - .35, { d: .35, y: -40 });
      A.out(q(cam, '.n6-s'), tP - .35, { d: .3, y: -30 });
      const arw = q(cam, '.cd-arrow'), ch = qa(cam, '.cd-chev span');
      tl.fromTo(arw, { autoAlpha: 0, clipPath: 'inset(0% 100% 0% 0%)' }, { autoAlpha: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: .7, ease: 'expo.out', immediateRender: false }, tP - .2);
      ch.forEach((c, k) => A.pop(c, tP + .1 + k * .12, { from: .5 }));
      chevState(tl, ch, -1, tP);
      // ---------- beats 1–2: el concepto creativo
      tl.fromTo(arw, { backgroundColor: '#8F6F33' }, { backgroundColor: '#CD1618', duration: .3, yoyo: true, repeat: 1, repeatDelay: .6, immediateRender: false }, T.w(1, ['nada']) - .1);
      const z1 = q(cam, '.cd-pz.z1'), w1 = q(cam, '.cd-why.w1');
      A.rise(z1, T.b(1) - .05, { y: 40 });
      qa(z1, 'path,circle,rect').forEach(p => A.draw(p, T.b(1) + .1, .7));
      A.track(q(z1, 'b'), T.w(1, ['nada']) - .1, { d: .8, from: '.25em' });
      A.rise(w1, T.b(2) - .05, { y: 40 });
      const wi1 = qa(w1, '.cd-wi'), sit = qa(w1, '.cd-sit span');
      A.rise(wi1[0], T.w(2, ['no habla', 'habla']) - .1, { y: 14 });
      A.show(wi1[1], T.w(2, ['sofa']) - .2);
      ['sofa', 'visitas', 'suegra', 'viaje'].forEach((w, k) => A.pop(sit[k], T.w(2, [w]) - .15, { from: .5 }));
      A.rise(wi1[2], T.w(2, ['debajo', 'caben']) - .1, { y: 14 });
      // ---------- beats 3–4: el titular
      chevState(tl, ch, 0, T.b(3) - .2);
      A.out(z1, T.b(3) - .35, { d: .3, x: -60, y: false });
      A.out(w1, T.b(3) - .35, { d: .3, x: 60, y: false });
      const z2 = q(cam, '.cd-pz.z2'), w2 = q(cam, '.cd-why.w2');
      A.rise(z2, T.b(3) - .05, { y: 30 });
      tl.fromTo(q(z2, '.cd-news'), { autoAlpha: 0, rotation: -720, scale: .1 }, { autoAlpha: 1, rotation: -2, scale: 1, duration: 1.1, ease: 'power3.out', immediateRender: false }, T.w(3, ['titular']) + .2);
      A.stamp(q(z2, '.cd-kk'), T.w(3, ['ultima']) - .1, { rot: -1, amp: 4 });
      A.rise(q(z2, '.cd-dek'), T.w(3, ['olor']) - .1, { y: 12 });
      A.pop(q(z2, '.cd-hd'), T.w(3, ['hubo']) - .1, { from: 1.4 });
      A.shake(T.w(3, ['victimas']) + .1, 6);
      A.rise(w2, T.b(4) - .05, { y: 40 });
      const wi2 = qa(w2, '.cd-wi'), fl = qa(w2, '.cd-flow span'), fa = qa(w2, '.cd-flow i');
      A.rise(wi2[0], T.w(4, ['una sola', 'linea']) - .2, { y: 14 });
      ['olor', 'panico', 'final'].forEach((w, k) => { A.pop(fl[k], T.w(4, [w]) - .1, { from: .5 }); if (k) A.fade(fa[k - 1], T.w(4, [w]) - .3, .2); });
      A.rise(wi2[1], T.w(4, ['exagerado']) - .1, { y: 14 });
      A.rise(wi2[2], T.w(4, ['como esos', 'titulares']) - .1, { y: 14 });
      // ---------- beats 5–6: el tema de campaña
      chevState(tl, ch, 1, T.b(5) - .2);
      A.out(z2, T.b(5) - .35, { d: .3, x: -60, y: false });
      A.out(w2, T.b(5) - .35, { d: .3, x: 60, y: false });
      const z3 = q(cam, '.cd-pz.z3'), w3 = q(cam, '.cd-why.w3');
      A.rise(z3, T.b(5) - .05, { y: 40 });
      qa(z3, 'path,circle,rect').forEach(p => A.draw(p, T.b(5) + .1, .7));
      A.pop(q(z3, 'b'), T.w(5, ['cada']) - .1, { from: .6 });
      A.rise(w3, T.b(6) - .05, { y: 40 });
      const wi3 = qa(w3, '.cd-wi'), fm = qa(w3, '.cd-film span');
      A.rise(wi3[0], T.w(6, ['es lo que', 'nos pasa']) - .1, { y: 14 });
      A.show(wi3[1], T.w(6, ['da para', 'historias']) - .2);
      ['cumpleanos', 'oficina', 'avion', 'misa'].forEach((w, k) => A.pop(fm[k], T.w(6, [w]) - .12, { from: .5, rot: k % 2 ? 4 : -4, toRot: 0 }));
      A.rise(wi3[2], T.w(6, ['cada una']) - .1, { y: 14 });
      A.sparkle(q(cam, '.n6-spk'), 1400, 800, T.w(6, ['no se', 'salio']) + .1, { n: 16, r: 380, size: 38 });
    }
  };

  E.n7 = {
    build(cam, T, tl, A) {
      cam.innerHTML = `
      ${STRIP()}
      <div class="cd-pz o0 z4"><span class="pt-lbl">3 · Eslogan · el grito de batalla</span><img src="assets/logos/huggies-logo.svg" alt="Huggies"><b class="anton">Lo que pasa en el pañal, se queda en el pañal.</b></div>
      ${WHY('w4', '¿Por qué?', [
        `<b>Toma una frase que todo el mundo conoce:</b><p class="cd-vegas fr">«Lo que pasa en ${M.strike('Las Vegas', 'v1')}<span class="cd-pa o0">el pañal</span>, se queda en ${M.strike('Las Vegas', 'v2')}<span class="cd-pa o0">el pañal</span>»</p>`,
        '✓ <b>Se recuerda al instante.</b>',
        '✓ <b>Funciona con o sin la marca.</b>',
        '✓ <b>Dice el insight en una línea:</b> lo que asusta es que se salga, y aquí no se sale.'])}
      <p class="cd-ch o0"><span class="pt-lbl">4 · Concepto comercial · la parte que vende</span></p>
      <div class="cd-q o0 q1"><span class="pt-lbl">Producto</span>${ICO.panal}<b class="anton">Huggies Little Snugglers</b><p>Tallas 1 y 2</p></div>
      <div class="cd-q o0 q2"><span class="pt-lbl">Atributos · lo que el pañal tiene</span>
        ${[['escudo', 'Bloqueo de escapes por delante y por detrás'], ['pluma', 'Capa suave para la piel del bebé'], ['gota', 'Indicador de humedad: avisa cuándo cambiarlo']].map(a => `<p class="cd-li o0">${ICO[a[0]]}<span>${a[1]}</span></p>`).join('')}</div>
      <div class="cd-q o0 q3"><span class="pt-lbl">Beneficios · lo que le da a la familia</span>
        <p class="cd-li o0"><b class="cd-who">El bebé</b><span>sigue cómodo aunque haya hecho.</span></p>
        <p class="cd-li o0"><b class="cd-who">Los papás</b><span>se quedan en el plan, tranquilos y sin pena.</span></p></div>
      <div class="cd-q o0 q4"><span class="pt-lbl">Razón para creer · la prueba</span><p class="cd-hasta">hasta</p><b class="anton cd-100">0 %</b><p class="cd-pr">de protección contra escapes</p></div>
      <div class="cd-cta o0"><span class="pt-lbl">Llamado a la acción · sin decir «compre»</span><p class="fr o0">«Que lo único que se escape sea el olor.»</p></div>
      <div class="cd-no o0"><span class="pt-lbl">No es campaña de temporada: no cerramos con…</span>
        ${['−30 %', '¡Compre ya!', 'Solo por esta semana'].map((x, k) => `<span class="cd-x o0">${M.strike(x, 'x' + k)}</span>`).join('')}</div>
      ${WHY('w5', '¿Por qué funciona?', [
        `<b>Juega con la palabra escapar:</b><div class="cd-esc"><span class="o0">El olor se puede escapar ✓</span><span class="o0">El popó, no ✕</span></div>`,
        '<b>La decisión queda en manos de los papás:</b> si quieren que su próximo plan termine como esta historia, ya saben qué pañal llevar.'])}
      <div class="lay n7-spk"></div>`;

      // la tira del método ya está armada: el titular y el tema hechos, el eslogan en curso
      const arw = q(cam, '.cd-arrow'), ch = qa(cam, '.cd-chev span');
      A.fade(arw, .05, .3); ch.forEach((c, k) => A.fade(c, .05 + k * .05, .3));
      chevState(tl, ch, 2, .1);
      // ---------- beats 0–1: el eslogan
      const z4 = q(cam, '.cd-pz.z4'), w4 = q(cam, '.cd-why.w4');
      A.rise(z4, T.w(0, ['eslogan']) - .1, { y: 40 });
      A.pop(q(z4, 'b'), T.w(0, ['lo que pasa', 'pasa']) - .15, { from: .6 });
      A.sparkle(q(cam, '.n7-spk'), 540, 640, T.w(0, ['queda']) + .1, { n: 18, r: 420, size: 40 });
      A.rise(w4, T.b(1) - .05, { y: 40 });
      const wi = qa(w4, '.cd-wi');
      A.rise(wi[0], T.w(1, ['toma', 'frase']) - .15, { y: 14 });
      const tLl = T.w(1, ['lleva', 'pañal']);
      A.strike(q(w4, '.strk.v1'), tLl - .1); A.strike(q(w4, '.strk.v2'), tLl + .05);
      qa(w4, '.cd-pa').forEach((p, k) => A.pop(p, tLl + .15 + k * .12, { from: .5 }));
      A.rise(wi[1], T.w(1, ['recuerda']) - .15, { y: 14 });
      A.rise(wi[2], T.w(1, ['funciona']) - .15, { y: 14 });
      A.rise(wi[3], T.w(1, ['insait', 'insight']) - .2, { y: 14 });
      // ---------- beats 2–5: el concepto comercial, completo
      chevState(tl, ch, 3, T.b(2) - .2);
      A.out(z4, T.b(2) - .35, { d: .3, x: -60, y: false });
      A.out(w4, T.b(2) - .35, { d: .3, x: 60, y: false });
      A.rise(q(cam, '.cd-ch'), T.b(2) - .05, { y: 14 });
      const qs = qa(cam, '.cd-q');
      A.rise(qs[0], T.w(2, ['producto']) - .15, { y: 40 });
      qa(qs[0], 'path,circle,rect').forEach(p => A.draw(p, T.w(2, ['producto']), .6));
      A.rise(qs[1], T.b(3) - .1, { y: 40 });
      const at = qa(qs[1], '.cd-li');
      ['bloqueo', 'capa', 'indicador'].forEach((w, k) => { const t = T.w(3, [w]); A.rise(at[k], t - .15, { y: 14 }); qa(at[k], 'path,circle,rect').forEach(p => A.draw(p, t, .5)); });
      A.rise(qs[2], T.b(4) - .1, { y: 40 });
      const be = qa(qs[2], '.cd-li');
      A.rise(be[0], T.w(4, ['bebe']) - .15, { y: 14 });
      A.rise(be[1], T.w(4, ['papas']) - .15, { y: 14 });
      A.rise(qs[3], T.b(5) - .1, { y: 40 });
      const tC = T.w(5, ['cien', '100']);
      A.count(q(qs[3], '.cd-100'), tC - .1, 1.1, 0, 100, v => Math.round(v) + ' %');
      A.sparkle(q(cam, '.n7-spk'), 1400, 760, tC + 1, { n: 18, r: 380, size: 40 });
      // ---------- beats 6–7: el llamado a la acción, sin decir compre
      tl.to(qs.concat([q(cam, '.cd-ch')]), { autoAlpha: 0, y: -30, duration: .35, stagger: .04, ease: 'power2.in' }, T.b(6) - .45);
      const no = q(cam, '.cd-no'), xs = qa(no, '.cd-x');
      A.rise(no, T.w(6, ['temporada']) - .2, { y: 30 });
      [T.w(6, ['descuentos']), T.w(6, ['compre ya', 'compre']), T.w(6, ['compre ya', 'compre']) + .45].forEach((t, k) => { A.pop(xs[k], t - .15, { from: .5 }); A.strike(q(xs[k], '.strk'), t + .25); });
      const cta = q(cam, '.cd-cta'), tU = T.w(6, ['que lo unico', 'unico']);
      A.rise(cta, T.b(6) + .05, { y: 30 });
      A.pop(q(cta, 'p'), tU - .15, { from: .6 });
      A.shake(tU + .2, 6);
      A.sparkle(q(cam, '.n7-spk'), 960, 470, tU + .3, { n: 22, r: 640, size: 44 });
      const w5 = q(cam, '.cd-why.w5'), wj = qa(w5, '.cd-wi'), esc = qa(w5, '.cd-esc span');
      A.rise(w5, T.b(7) - .05, { y: 40 });
      A.rise(wj[0], T.b(7) + .05, { y: 14 });
      A.pop(esc[0], T.w(7, ['olor']) - .1, { from: .5 });
      A.pop(esc[1], T.w(7, ['popo']) - .1, { from: .5 });
      A.rise(wj[1], T.w(7, ['decision']) - .2, { y: 14 });
    }
  };
})();
