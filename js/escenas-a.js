/* =====================================================================
   ESCENAS 01–06 · cada una arma su DOM y su línea de tiempo con los tiempos de NARRACION.
   build(cam, T, tl, A, root):
     cam  contenedor de la escena (se puede sacudir/zoom)
     T    tiempos: T.b(i) inicio del beat i · T.e(i) fin · T.w(i,'palabra') · T.after(i,'?')
     tl   línea de tiempo GSAP en pausa (el reloj de la voz la mueve)
     A    macros (rise, pop, slam, cut, track, chars, count, draw, censor, stamp, sparkle…)
   ===================================================================== */
(function () {
  'use strict';
  const M = KIT.M;
  const E = window.ESCENAS = window.ESCENAS || {};
  const q = (r, s) => r.querySelector(s);
  const qa = (r, s) => Array.from(r.querySelectorAll(s));

  /* ---------- escena genérica (si falta el diseño de alguna) ---------- */
  E._generic = {
    build(cam, T, tl, A) {
      cam.innerHTML = `<div class="sup" style="top:380px;--sb:150px"><span class="s o0">${T.data.titulo || ''}</span></div>`;
      A.rise(q(cam, '.s'), .2);
    }
  };

  /* =====================================================================
     01 · PORTADA / GANCHO
     ===================================================================== */
  E.s01 = {
    legal: 'frames',
    build(cam, T, tl, A, root) {
      root.dataset.legal = 'frames';
      cam.innerHTML = `
      <div class="lay s01-base"><img class="plate" src="assets/fallback/set-cierre.jpg" alt=""></div>
      <div class="lay s01-b0">
        <p class="ctr fri gold s01-ima" style="top:420px;font-size:96px">Imagínate esto…</p>
        <div class="ctr o0 s01-18" style="top:196px">
          <span class="anton au n18" style="font-size:400px;line-height:.86;display:block">0</span>
          <span class="anton au s01-bb" style="font-size:104px;display:block;margin-top:10px">BEBÉS EN PAÑAL</span>
        </div>
        <div class="ctr o0 s01-mo" style="top:330px">
          <span class="fr gold" style="font-size:56px;display:block">sentados sobre casi</span>
          <span class="anton au s01-money" style="font-size:250px;line-height:.92;display:block;margin-top:10px">US$0</span>
          <span class="fri ink2 o0 s01-lujo" style="font-size:60px;display:block;margin-top:18px">en cosas de lujo</span>
        </div>
        <div class="lay s01-spk"></div>
      </div>
      <div class="lay s01-cuts">
        ${[['assets/fallback/p12.jpg', 'Un', 'SOFÁ FRANCÉS', '50% 50%', 'left:96px;text-align:left'], ['assets/planos/pl-alfombra.jpg', 'Una', 'ALFOMBRA TURCA', '50% 60%', 'right:96px;text-align:right'],
          ['assets/fallback/full-l03.jpg', 'Un', 'CONVERTIBLE', '50% 50%', 'left:0;right:0;text-align:center'], ['assets/planos/pl-vestido.jpg', 'Un', 'VESTIDO DE NOVIA', '30% 40%', 'left:0;right:0;text-align:center']].map((p, k) => `
          <div class="plate-wrap s01-cut o0" data-k="${k}">
            <img class="plate" src="${p[0]}" alt="" style="object-position:${p[3]}">
            <div class="s01-cutlbl" style="${p[4]}"><span class="fr">${p[1]}</span><span class="anton">${p[2]}</span></div>
          </div>`).join('')}
      </div>
      <div class="lay s01-b2">
        <div class="s01-spot o0"></div>
        <div class="s01-cone o0"></div>
        <figure class="slot mul feather s01-tray o0" data-slot="p06" style="left:700px;top:318px;width:520px;--fx:16%;--fy:14%"></figure>
        <div class="sup o0 s01-sup2" style="top:126px;--ss:50px;--sb:128px"><span class="s">Entre todo ese lujo y el desastre…</span><span class="b">SOLO HAY UN PAÑAL</span></div>
      </div>
      <div class="lay s01-b3">
        <div class="ctr s01-logo o0" style="top:196px"><img src="assets/logos/huggies-logo.svg" alt="Huggies" style="width:300px"><span class="fr red" style="display:block;font-size:34px;margin-top:2px">presenta</span></div>
        <p class="ctr fri ink2 s01-sl o0" style="top:318px;font-size:46px">…y se llamó, sin pena:</p>
        <p class="ctr anton au s01-title o0" style="top:380px;font-size:248px;line-height:.9">EXPENSIVE ${M.censor('$H*T')}</p>
        <div class="lay s01-fl">${['assets/fallback/full-l03.jpg', 'assets/fallback/p12.jpg', 'assets/planos/pl-alfombra.jpg'].map(src => `<img class="plate o0" src="${src}" alt="">`).join('')}</div>
        <p class="ctr fri ink2 s01-tr o0" style="top:650px;font-size:50px">«M*erda cara»… y también «cosas caras»</p>
      </div>
      <div class="lay s01-b4">
        <div class="ctr s01-c1 o0" style="top:452px"><span class="lbl">Presentan</span><div class="s01-pres"><span class="fr red s01-name s01-n1">William Fonseca</span><b class="anton gold-dk s01-amp o0">&amp;</b><span class="fr red s01-name s01-n2 o0">Mariana Silva</span></div></div>
        <div class="ctr s01-c2 o0" style="top:640px"><span class="lbl">Docente</span><span class="fr red s01-name">Rüdiger Stuart González Preciado</span></div>
        <div class="ctr s01-c3 o0" style="top:790px"><img src="assets/logos/politecnico-b.png" alt="Politécnico Grancolombiano"><span>Publicidad 2 · Presencial nocturna · Sede Bogotá · Viernes</span></div>
      </div>
      <div class="lay s01-b5">
        <p class="ctr fr gold o0 s01-mt" style="top:236px;font-size:54px">Hoy en la transmisión</p>
        <div class="s01-menu o0">
          <div class="s01-track"><i class="s01-fill"></i><b class="s01-head o0"></b></div>
          ${[['1', 'LA HISTORIA', 'qué hicieron y qué pasó', 'assets/fallback/thumbs/v01.jpg'], ['2', 'EL EJERCICIO', 'cómo se les pudo ocurrir', 'assets/fallback/thumbs/v05.jpg'], ['3', 'EL INSIGHT', 'lo que lo explica todo', 'assets/fallback/thumbs/v06.jpg']].map((c, k) => `
            <div class="s01-ch o0" style="left:${k * 480}px"><span class="s01-th"><img src="${c[3]}" alt=""><b class="s01-num anton">${c[0]}</b></span><span class="anton">${c[1]}</span><em class="fri">${c[2]}</em></div>`).join('')}
        </div>
      </div>`;

      const b0 = T.b(0), b1 = T.b(1), b2 = T.b(2), b3 = T.b(3), b4 = T.b(4), b5 = T.b(5);
      // --- base: estudio vacío con empuje lento de cámara
      const basePl = q(cam, '.s01-base .plate');
      A.kb(basePl, 0, b1 + .2, { from: 1.0, to: 1.12, y1: -14 });          // dolly-in fuerte de arranque
      tl.to(basePl, { scale: 1.18, y: -20, duration: Math.max(1, T.dur - b1 - .2), ease: 'none' }, b1 + .2);
      // --- beat 0: 18 bebés → US$500.000
      const ima = q(cam, '.s01-ima');   // visible desde t = 0: la onda lo descubre
      tl.fromTo(ima, { scale: 1 }, { scale: 1.06, duration: 1.2, ease: 'sine.inOut', yoyo: true, repeat: 1, immediateRender: false }, Math.max(.1, b0 - .2));
      const t18 = T.w(0, ['dieciocho', '18']);
      A.out(ima, t18 - .15, { d: .25 });
      const g18 = q(cam, '.s01-18');
      A.slam(g18, t18, { from: 1.6 });
      A.count(q(cam, '.n18'), t18, .75, 0, 18, null, { ease: 'power2.out' });
      A.track(q(cam, '.s01-bb'), T.w(0, ['bebes']) , { d: .9 });
      const tSent = T.w(0, ['sentados']);
      tl.to(g18, { scale: .3, y: -200, duration: .7, ease: 'expo.inOut' }, tSent - .1);
      const mo = q(cam, '.s01-mo');
      A.rise(mo, tSent + .2, { y: 60 });
      const tMed = T.w(0, ['medio', 'US$500']);
      A.odo(q(cam, '.s01-money'), tMed - .05, 1.0, 'US$500.000', { step: .12 });
      A.sparkle(q(cam, '.s01-spk'), 960, 560, tMed + 1.0, { n: 22, r: 520, size: 46 });
      A.shake(tMed + 1.05, 8);
      A.rise(q(cam, '.s01-lujo'), T.w(0, ['lujo']) - .1, { y: 24 });

      // --- beat 1: cortes del teaser al ritmo de cada objeto
      const cuts = qa(cam, '.s01-cut');
      const tc = [T.w(1, ['sofa']), T.w(1, ['alfombra']), T.w(1, ['convertible']), T.w(1, ['vestido'])].map((t, k) => k ? t - .12 : t - .2);
      A.out(q(cam, '.s01-b0'), tc[0] - .05, { d: .2, y: false });
      cuts.forEach((c, k) => {
        A.cut(c, tc[k], { from: 1.16, d: .9 });
        A.kb(q(c, 'img'), tc[k], (tc[k + 1] || b2 + .4) + .3, { from: 1.0, to: 1.07 });
        A.track(q(c, '.anton'), tc[k] + .02, { d: .7, from: '.4em' });
        A.rise(q(c, '.fr'), tc[k], { y: 20, d: .5 });
        A.flash(tc[k], { a: .7, d: .3 });
      });
      // --- beat 2: todo se aparta; el pañal en bandeja de plata con foco
      const corners = [[-740, -150, -5], [740, -150, 4], [-740, 190, 3], [740, 190, -4]];
      cuts.forEach((c, k) => {
        tl.to(c, { scale: .2, x: corners[k][0], y: corners[k][1], rotation: corners[k][2], duration: .9, ease: 'expo.inOut' }, b2 + k * .05);
        tl.to(q(c, '.s01-cutlbl'), { autoAlpha: 0, duration: .2 }, b2);
        tl.to(c, { opacity: .62, duration: .6 }, b2 + .9);
      });
      const tPan = T.w(2, ['solo']);
      A.fade(q(cam, '.s01-spot'), b2 + .5, .9);
      A.fade(q(cam, '.s01-cone'), b2 + .6, .8);
      const tray = q(cam, '.s01-tray');
      tl.fromTo(tray, { autoAlpha: 0, y: 120, scale: .8 }, { autoAlpha: 1, y: 0, scale: 1, duration: 1.1, ease: 'expo.out', immediateRender: false }, b2 + .55);
      A.float(tray, tPan + .6, b3, { y: -8, per: 3 });
      const sup2 = q(cam, '.s01-sup2');
      A.show(sup2, b2 + .25);
      A.rise(q(sup2, '.s'), b2 + .25, { y: 20 });
      A.track(q(sup2, '.b'), tPan - .15, { d: 1 });
      A.sparkle(q(cam, '.s01-spk'), 960, 600, T.w(2, ['panal']) + .1, { n: 12, r: 300, size: 32 });
      // --- beat 3: HUGGIES presenta EXPENSIVE $H*T (censura con "shhh")
      A.out(q(cam, '.s01-cuts'), b3 - .05, { d: .4, y: false });
      A.out(q(cam, '.s01-b2'), b3 - .05, { d: .45, y: false, scale: .96 });
      const logo = q(cam, '.s01-logo');
      A.pop(logo, b3 + .15, { from: .4 });
      tl.fromTo(logo, { scale: 1 }, { scale: 1.12, duration: .18, yoyo: true, repeat: 1, ease: 'power2.out', immediateRender: false }, T.w(3, ['jaguis', 'huggies']));
      const title = q(cam, '.s01-title');
      A.rise(q(cam, '.s01-sl'), T.w(3, ['llamo', 'se llamo']) - .15, { y: 16 });
      tl.to(q(cam, '.s01-sl'), { autoAlpha: 0, duration: .3 }, T.e(3) + .4);
      const tEx = T.w(3, ['expensiv', 'expensive']);
      const fls = qa(cam, '.s01-fl .plate');
      const tF0 = T.w(3, ['hizo']) + .1, stp = Math.max(.2, (tEx - .1 - tF0) / 3);
      fls.forEach((f, k) => { A.cut(f, tF0 + k * stp, { from: 1.2, d: .5 }); A.flash(tF0 + k * stp, { a: .55, d: .18 }); A.hide(f, tF0 + (k + 1) * stp); });
      A.track(title, tEx - .05, { d: 1.0, from: '.5em' });
      A.censor(q(title, '.cen'), T.e(3) + .08);
      A.shake(T.e(3) + .12, 7);
      A.rise(q(cam, '.s01-tr'), T.e(3) + .7, { y: 24 });
      // --- beat 4: créditos estilo "host" del livestream
      A.out(q(cam, '.s01-tr'), b4 - .05, { d: .3 });
      const tWi = T.w(4, ['william']) - .3;   // B-17: EXPENSIVE $H*T se luce más antes de subir
      tl.to(logo, { y: -104, scale: .62, duration: .8, ease: 'expo.inOut' }, tWi);
      tl.to(title, { y: -208, scale: .58, duration: .8, ease: 'expo.inOut' }, tWi);
      const c1 = q(cam, '.s01-c1'), c2 = q(cam, '.s01-c2'), c3 = q(cam, '.s01-c3');
      const tWm = T.w(4, ['william']) + .25, tMa = T.w(4, ['mariana']);
      tl.fromTo(c1, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: .6, ease: 'expo.out', immediateRender: false }, tWm);
      A.rise(q(c1, '.s01-amp'), tMa - .25, { y: 14, d: .4 });
      A.rise(q(c1, '.s01-n2'), tMa - .05, { y: 20 });
      A.rise(c2, T.w(4, ['presentacion', 'construimos']) - .1, { y: 30 });
      A.rise(c3, T.w(4, ['ocurrir']) - .1, { y: 30 });
      // "al revés": el título da la vuelta
      tl.fromTo(title, { rotationX: 0 }, { rotationX: 360, duration: 1.1, ease: 'power3.inOut', immediateRender: false }, T.w(4, ['reves']) - .2);
      // --- beat 5: menú de capítulos de la transmisión
      tl.to([c1, c2, c3], { autoAlpha: 0, y: '-=30', duration: .4, stagger: .05, ease: 'power2.in' }, b5 - .1);
      tl.to([logo, title], { autoAlpha: 0, duration: .4 }, b5 - .1);
      A.rise(q(cam, '.s01-mt'), b5 + .1, { y: 20 });
      const chs = qa(cam, '.s01-ch');
      const tch = [T.w(5, ['historia']), T.w(5, ['ejercicio']), T.w(5, ['insait', 'insight'])];
      tl.fromTo(q(cam, '.s01-menu'), { autoAlpha: 0 }, { autoAlpha: 1, duration: .3, immediateRender: false }, b5);
      tl.fromTo(q(cam, '.s01-track'), { scaleX: 0 }, { scaleX: 1, duration: .8, ease: 'expo.out', immediateRender: false }, b5);
      A.fade(q(cam, '.s01-head'), tch[0] - .2, .2);
      chs.forEach((c, k) => {
        A.rise(c, tch[k] - .1, { y: 40 });
        tl.fromTo(q(c, '.s01-num'), { scale: .2, rotation: -90 }, { scale: 1, rotation: 0, duration: .6, ease: 'back.out(2.4)', immediateRender: false }, tch[k] - .05);
        tl.to(q(cam, '.s01-fill'), { scaleX: (k + 1) / 3, duration: .7, ease: 'power2.inOut' }, tch[k] - .1);
        tl.to(q(cam, '.s01-head'), { x: 480 * k + 225, duration: .7, ease: 'power2.inOut' }, tch[k] - .1);
      });
      // al final, el capítulo 1 queda "en vivo"
      tl.to(q(cam, '.s01-head'), { x: 0, duration: .8, ease: 'expo.inOut' }, T.e(5) + .2);
      tl.to(q(cam, '.s01-fill'), { scaleX: 0, duration: .8, ease: 'expo.inOut' }, T.e(5) + .2);
      tl.to(chs.slice(1), { opacity: .38, duration: .5 }, T.e(5) + .3);
      tl.fromTo(chs[0], { scale: 1 }, { scale: 1.08, duration: .5, ease: 'back.out(3)', immediateRender: false }, T.e(5) + .35);
    }
  };

  /* =====================================================================
     02 · ANTES: EL ENEMIGO
     ===================================================================== */
  const BABY = `
    <svg class="s02-baby" viewBox="0 0 600 560" aria-hidden="true">
      <g class="bb-line" fill="none" stroke="#8F6F33" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="300" cy="118" r="86"/>
        <path d="M300 32c-10-22 14-34 26-20 10 11-3 25-13 17"/>
        <path d="M262 112q8-8 16 0M322 112q8-8 16 0"/>
        <path d="M276 150q24 18 48 0"/>
        <path d="M214 84c-18 0-22 34 2 38M386 84c18 0 22 34-2 38"/>
        <path d="M222 214q78-22 156 0l16 140q-94 22-188 0z"/>
        <path d="M226 236c-46 24-58 64-50 102M374 236c46 24 58 64 50 102"/>
        <circle cx="176" cy="352" r="17"/><circle cx="424" cy="352" r="17"/>
        <path d="M206 354q94 22 188 0l8 66q-42 20-66 52h-72q-24-32-66-52z" fill="#FFFFFF"/>
        <path d="M200 416c-64 12-96 52-84 88 30 16 100 0 146-34M400 416c64 12 96 52 84 88-30 16-100 0-146-34"/>
        <ellipse cx="110" cy="508" rx="34" ry="20"/><ellipse cx="490" cy="508" rx="34" ry="20"/>
      </g>
      ${[0, 1, 2].map(() => '<circle class="bb-ring" cx="300" cy="405" r="70" fill="none" stroke="#D9B56A" stroke-width="8"/>').join('')}
    </svg>`;
  E.s02 = {
    build(cam, T, tl, A, root) {
      root.dataset.legal = 'frames';
      cam.innerHTML = `
      <div class="lay s02-b0">
        <div class="sup o0 s02-en" style="top:200px;--ss:54px"><span class="s">El enemigo que todo papá conoce</span></div>
        <p class="ctr anton au s02-bo o0" style="top:140px;font-size:330px;line-height:.9">BLOWOUT</p>
        <p class="ctr fri ink s02-def o0" style="top:330px;font-size:50px">cuando el popó se escapa del pañal…</p>
        <div class="s02-fig">${BABY}
          ${[['ESPALDA', 205, 382, -1], ['PIERNAS', 470, 470, 1], ['CUELLO', 300, 214, 1]].map(p => `
            <div class="s02-leak o0" style="left:${p[1]}px;top:${p[2]}px">
              <i class="rp"></i><i class="rp"></i><i class="rp"></i>
              <b class="anton" style="${p[3] < 0 ? 'right:44px' : 'left:44px'}">${p[0]}</b>
            </div>`).join('')}
        </div>
      </div>
      <div class="lay s02-b1">
        ${[['BODY', 330, 270, -5, 132], ['SILLA DEL CARRO', 1010, 250, 3, 104], ['EL SOFÁ', 380, 500, 3, 128], ['LA SALIDA', 1120, 480, -3, 118]].map((w, k) => `
          <div class="s02-w o0" style="left:${w[1]}px;top:${w[2]}px;transform:rotate(${w[3]}deg)">${M.strike(`<span class="anton gold-dk" style="font-size:${w[4]}px">${w[0]}</span>`)}</div>`).join('')}
        <div class="s02-conf o0">
          <span class="anton au h1">LA CONFIANZA</span><span class="anton au h2">LA CONFIANZA</span>
          <svg class="crk" viewBox="0 0 1200 220" preserveAspectRatio="none"><polyline points="0,104 144,119 336,97 540,128 744,96 960,121 1200,105" fill="none" stroke="#CD1618" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/></svg>
        </div>
      </div>
      <div class="lay s02-b2">
        <svg class="s02-clock o0" viewBox="-300 -300 600 600" aria-hidden="true">
          <circle r="276" fill="#FFFFFF" stroke="#D9B56A" stroke-width="3"/>
          <circle class="ck-ring" r="250" fill="none" stroke="#8F6F33" stroke-width="10" transform="rotate(-90)"/>
          <g class="ck-ticks">${Array.from({ length: 24 }, (_, h) => { const a = h / 24 * 6.2832 - 1.5708, r1 = h % 6 ? 222 : 206; return `<line x1="${(Math.cos(a) * r1).toFixed(1)}" y1="${(Math.sin(a) * r1).toFixed(1)}" x2="${(Math.cos(a) * 236).toFixed(1)}" y2="${(Math.sin(a) * 236).toFixed(1)}" stroke="#8F6F33" stroke-width="${h % 6 ? 3 : 6}" stroke-linecap="round"/>`; }).join('')}</g>
          ${['0', '6', '12', '18'].map((l, k) => { const a = k / 4 * 6.2832 - 1.5708; return `<text x="${(Math.cos(a) * 172).toFixed(1)}" y="${(Math.sin(a) * 172 + 15).toFixed(1)}" text-anchor="middle" font-family="Anton" font-size="44" fill="#6F5122">${l}</text>`; }).join('')}
          <g class="ck-poops">${[40, 96, 148, 206, 262, 318].map(d => { const a = d / 360 * 6.2832 - 1.5708; return `<use href="#swirl" class="ck-p" x="${(Math.cos(a) * 250 - 30).toFixed(1)}" y="${(Math.sin(a) * 250 - 34).toFixed(1)}" width="60" height="60" style="color:#6F5122"/>`; }).join('')}</g>
          <line class="ck-hand" x1="0" y1="0" x2="0" y2="-200" stroke="#CD1618" stroke-width="8" stroke-linecap="round"/>
          <circle r="16" fill="#CD1618"/>
          <text class="ck-n" x="0" y="96" text-anchor="middle" font-family="Anton" font-size="150" fill="#8F6F33">0</text>
          <text x="0" y="-70" text-anchor="middle" font-family="Inter" font-weight="800" font-size="26" letter-spacing="5" fill="#6F5122">24 HORAS</text>
        </svg>
        <div class="s02-cr o0">
          <span class="fr gold" style="font-size:56px">hasta</span>
          <span class="anton au" style="font-size:210px;line-height:.9">6 POPÓS</span>
          <span class="anton gold-dk" style="font-size:96px">AL DÍA</span>
        </div>
        <p class="s02-trust fr ink o0">…y casi ningún papá <b class="red">confía</b> del todo en un pañal.</p>
        <p class="s02-src src o0">Dato: case film de Cannes Lions 2026</p>
      </div>
      <div class="lay s02-b3">
        <div class="s02-pastel o0">
          ${[[180, 160, 1.2], [1380, 140, 1.0], [80, 600, .9], [1500, 560, 1.25], [760, 120, .7]].map((c, k) => `
            <svg class="s02-cloud" style="left:${c[0]}px;top:${c[1]}px;width:${360 * c[2]}px" viewBox="0 0 360 200"><path d="M70 170c-40 0-60-30-46-60 12-26 44-30 58-20 6-40 46-66 88-54 26 8 42 28 46 50 20-18 64-14 76 20 34 0 50 24 46 44-4 14-18 20-34 20z" fill="#FFFFFF" opacity=".95"/></svg>`).join('')}
          <p class="ctr fr o0 s02-same" style="top:170px;font-size:58px;color:#8F7AA6">Todas las marcas prometen lo mismo</p>
          <div class="s02-eq">${[0, 1, 2].map(k => `<svg viewBox="0 0 200 170" class="o0" style="color:#B9A6CF"><use href="#diaper" width="200" height="170"/></svg>${k < 2 ? '<b class="anton o0">=</b>' : ''}`).join('')}</div>
          <p class="ctr fr s02-tern o0" style="top:390px">pura ternura</p>
          <p class="abs fri s02-pw o0" style="left:300px;top:650px;color:#7FA7D9">nubes</p>
          <p class="abs fri s02-pw o0" style="left:1330px;top:640px;color:#D98FB2">pasteles</p>
          <div class="abs s02-ang o0" style="left:660px;top:735px"><svg viewBox="0 0 200 40" class="halo"><ellipse cx="100" cy="20" rx="90" ry="14" fill="none" stroke="#E8C66E" stroke-width="7"/></svg><p class="fri" style="color:#8DBE9F">bebés angelicales</p></div>
        </div>
        <svg class="s02-x o0" viewBox="0 0 1920 1080" preserveAspectRatio="none"><path d="M260 860 C 700 640, 1200 420, 1680 210" fill="none" stroke="#CD1618" stroke-width="22" stroke-linecap="round"/></svg>
      </div>
      <div class="lay s02-b4">
        <div class="s02-l">
          <p class="fr ink2 o0 s02-cal" style="font-size:54px">Huggies ya venía preparando el terreno…</p>
          <p class="anton au o0 s02-y" style="font-size:270px;line-height:.9">2025</p>
          <p class="o0 s02-pon"><span class="anton red" style="font-size:96px">PONCHO ANTIPOPÓ</span><span class="fri ink2" style="font-size:40px">«Poop Poncho»</span></p>
          <p class="o0 s02-com anton gold-dk" style="font-size:64px">y la casa forrada en plástico</p>
        </div>
        <div class="s02-phone o0"><video muted playsinline preload="auto" src="assets/piezas/00-previo-2025-little-snugglers-blowout-protection.mp4"></video><i class="wrap"></i></div>
      </div>
      <div class="lay s02-b5">
        <p class="ctr o0 s02-dec">${M.strike('<span class="anton" style="font-size:250px;color:#5A4B3A">DECIRLO</span>')}</p>
        <p class="ctr fr gold o0 s02-26" style="top:470px;font-size:60px">En 2026, algo más arriesgado:</p>
        <p class="ctr anton au-sheen o0 s02-dem" style="top:560px;font-size:290px;line-height:.9">DEMOSTRARLO</p>
        <div class="lay s02-spk"></div>
      </div>`;

      // ---------- beat 0: BLOWOUT + silueta en línea dorada
      const en = q(cam, '.s02-en'), bo = q(cam, '.s02-bo');
      // la silueta dorada del bebé ya está cuando llega la onda (ALTO-5); respira mientras habla la voz
      const fig = q(cam, '.s02-fig'), tBo = T.w(0, ['blouaut', 'blowout']);
      A.float(q(fig, '.s02-baby'), .2, tBo, { y: -8, per: 2.4 });
      A.show(en, T.b(0)); A.rise(q(en, '.s'), T.w(0, ['enemigo']) - .2, { y: 24 });
      tl.to(en, { autoAlpha: 0, duration: .2 }, tBo - .2);
      A.slam(bo, tBo - .05, { from: 1.8, amp: 12 });
      const tCu = T.w(0, ['cuando']);
      tl.to(bo, { y: -70, scale: .44, duration: .7, ease: 'expo.inOut' }, tCu - .2);
      A.rise(q(cam, '.s02-def'), tCu - .1, { y: 20 });
      // firma (MEDIO-11): en "se escapa" el pañal explota en ondas doradas y la cámara da un golpe de zoom
      const tEs = T.w(0, ['escapa']);
      qa(fig, '.bb-ring').forEach((r, j) => {
        A.draw(r, tEs - .05 + j * .12, .35);
        tl.fromTo(r, { scale: .2, opacity: 1, svgOrigin: '300 405' }, { scale: 3.2, opacity: 0, duration: 1.1, ease: 'power2.out', immediateRender: false }, tEs - .05 + j * .12);
      });
      tl.fromTo(cam, { scale: 1 }, { scale: 1.15, duration: .22, yoyo: true, repeat: 1, ease: 'power2.out', immediateRender: false }, tEs - .05);
      const leaks = qa(cam, '.s02-leak');
      [T.w(0, ['espalda']), T.w(0, ['piernas']), T.w(0, ['cuello'])].forEach((t, k) => {
        const L = leaks[k];
        A.show(L, t - .1);
        qa(L, '.rp').forEach((r, j) => tl.fromTo(r, { scale: .2, opacity: .95 }, { scale: 2.6, opacity: 0, duration: 1.1, ease: 'power2.out', repeat: 2, immediateRender: false }, t - .1 + j * .22));
        tl.fromTo(q(L, 'b'), { autoAlpha: 0, x: k === 0 ? 20 : -20 }, { autoAlpha: 1, x: 0, duration: .4, ease: 'expo.out', immediateRender: false }, t - .05);
      });
      // ---------- beat 1: todo lo que arruina (tachado) y la confianza que se rompe
      A.out(q(cam, '.s02-b0'), T.b(1) - .05, { d: .35, y: false });
      const ws = qa(cam, '.s02-w');
      const tw = [[T.w(1, ['arruina']), T.w(1, ['body'])], [T.w(1, ['silla']) - .1, T.wEnd(1, ['carro'])], [T.w(1, ['sofa']) - .1, T.wEnd(1, ['sofa'])], [T.w(1, ['salida']) - .1, T.wEnd(1, ['salida'])]];
      ws.forEach((w, k) => { A.pop(w, tw[k][0], { from: 1.6, ease: 'expo.out', d: .45 }); A.strike(w, tw[k][1], .35); });
      const conf = q(cam, '.s02-conf'), tCo = T.w(1, ['confianza']);
      A.slam(conf, tCo - .1, { from: 1.5, amp: 8 });
      A.draw(q(conf, 'polyline'), T.e(1) - .1, .3, { ease: 'power4.out' });
      tl.to(q(conf, '.h1'), { y: -26, x: -10, rotation: -2.5, duration: .6, ease: 'expo.out' }, T.e(1) + .15);
      tl.to(q(conf, '.h2'), { y: 34, x: 14, rotation: 2, duration: .6, ease: 'expo.out' }, T.e(1) + .15);
      tl.to(ws, { opacity: .35, duration: .4 }, tCo);
      // ---------- beat 2: reloj de 24 h que marca 6 popós
      A.out(q(cam, '.s02-b1'), T.b(2) - .3, { d: .3, y: false });
      const ck = q(cam, '.s02-clock');
      A.pop(ck, T.b(2) + .05, { from: .6, ease: 'expo.out', d: .8 });
      const h0 = T.b(2) + .3, h1 = T.wEnd(2, ['dia']);
      A.draw(q(ck, '.ck-ring'), h0, h1 - h0, { ease: 'none' });
      tl.fromTo(q(ck, '.ck-hand'), { rotation: 0, svgOrigin: '0 0' }, { rotation: 360, svgOrigin: '0 0', duration: h1 - h0, ease: 'none', immediateRender: false }, h0);
      qa(ck, '.ck-p').forEach((p, k) => {
        const t = h0 + [40, 96, 148, 206, 262, 318][k] / 360 * (h1 - h0);
        tl.fromTo(p, { autoAlpha: 0, scale: 0, transformOrigin: '50% 50%' }, { autoAlpha: 1, scale: 1, duration: .4, ease: 'back.out(3)', immediateRender: false }, t);
      });
      const ckn = q(ck, '.ck-n'); const box = { v: 0 }, marks = [40, 96, 148, 206, 262, 318];
      tl.fromTo(box, { v: 0 }, { v: 360, duration: h1 - h0, ease: 'none', immediateRender: false, onUpdate: () => { ckn.textContent = String(marks.filter(d => box.v >= d).length); } }, h0);
      A.rise(q(cam, '.s02-cr'), T.w(2, ['hasta', 'seis']) - .2, { y: 40 });
      A.rise(q(cam, '.s02-trust'), T.w(2, ['ningun']) - .2, { y: 24 });
      A.fade(q(cam, '.s02-src'), T.w(2, ['ningun']), .5);
      // ---------- beat 3: la publicidad "tierna" que se vuelve gris y se tacha
      A.out(q(cam, '.s02-b2'), T.b(3) - .05, { d: .35, y: false });
      const pas = q(cam, '.s02-pastel');
      A.fade(pas, T.b(3), .6);
      qa(pas, '.s02-cloud').forEach((c, k) => tl.fromTo(c, { x: k % 2 ? 120 : -120, autoAlpha: 0 }, { x: k % 2 ? -40 : 40, autoAlpha: 1, duration: 7, ease: 'sine.out', immediateRender: false }, T.b(3) + k * .1));
      A.rise(q(pas, '.s02-same'), T.w(3, ['todas', 'marcas']) - .2, { y: 20 });
      qa(pas, '.s02-eq > *').forEach((el, k) => A.pop(el, T.w(3, ['prometen']) - .1 + k * .1, { from: .3 }));
      tl.to(q(pas, '.s02-eq'), { autoAlpha: 0, y: -30, duration: .35 }, T.w(3, ['ternura']) - .4);
      tl.to(q(pas, '.s02-same'), { autoAlpha: .55, duration: .35 }, T.w(3, ['ternura']) - .4);
      A.pop(q(pas, '.s02-tern'), T.w(3, ['ternura']) - .1, { from: .7, ease: 'elastic.out(1,.55)', d: 1.1 });
      const pw = qa(pas, '.s02-pw');
      A.pop(pw[0], T.w(3, ['nubes']) - .05, { from: .4 });
      A.pop(pw[1], T.w(3, ['pasteles']) - .05, { from: .4 });
      A.pop(q(pas, '.s02-ang'), T.w(3, ['angelicales', 'bebes']) - .05, { from: .4 });
      tl.fromTo(q(pas, '.halo'), { y: 0 }, { y: -8, duration: .8, yoyo: true, repeat: 3, ease: 'sine.inOut', immediateRender: false }, T.w(3, ['angelicales', 'bebes']) + .3);
      tl.to(pas, { filter: 'grayscale(1) brightness(.92)', duration: .6, ease: 'power1.inOut' }, T.e(3) - .1);
      A.draw(q(cam, '.s02-x path'), T.e(3) + .2, .4, { ease: 'power4.out' });
      A.show(q(cam, '.s02-x'), T.e(3) + .2);
      // ---------- beat 4: 2025, el poncho antipopó y la casa en plástico
      A.out(q(cam, '.s02-b3'), T.b(4) - .05, { d: .4, y: false });
      A.rise(q(cam, '.s02-cal'), T.b(4) + .05, { y: 20 });
      const ph = q(cam, '.s02-phone');
      tl.fromTo(ph, { autoAlpha: 0, y: 160, rotation: 8 }, { autoAlpha: 1, y: 0, rotation: 3, duration: .9, ease: 'expo.out', immediateRender: false }, T.b(4) + .2);
      T.video(q(ph, 'video'), T.b(4) + .2, T.dur, { from: 0 });
      A.slam(q(cam, '.s02-y'), T.w(4, ['dos mil', '2025']) - .1, { from: 1.5, amp: 6 });
      A.rise(q(cam, '.s02-pon'), T.w(4, ['poncho']) - .15, { y: 30 });
      A.rise(q(cam, '.s02-com'), T.w(4, ['comercial', 'casa']) - .15, { y: 30 });
      // ---------- beat 5: DECIRLO → DEMOSTRARLO
      A.out(q(cam, '.s02-l'), T.b(5) - .05, { d: .4, y: false });
      tl.to(ph, { x: -1120, scale: .5, rotation: -5, duration: .8, ease: 'expo.inOut' }, T.w(5, ['eso', 'pero']) - .15);
      tl.to(ph, { autoAlpha: 0, duration: .4 }, T.w(5, ['dos mil', '2026']) - .25);
      const dec = q(cam, '.s02-dec');
      A.rise(dec, T.w(5, ['decirlo']) - .25, { y: 30 });
      A.strike(dec, T.wEnd(5, ['decirlo']) + .05, .4);
      A.rise(q(cam, '.s02-26'), T.w(5, ['dos mil', '2026', 'en']) - .1, { y: 20 });
      tl.to(dec, { y: -120, scale: .55, opacity: .55, duration: .7, ease: 'expo.inOut' }, T.w(5, ['dos mil', '2026']) - .2);
      const dem = q(cam, '.s02-dem'), tDe = T.w(5, ['demostrarlo']);
      A.slam(dem, tDe - .08, { from: 2.2, amp: 14 });
      A.sparkle(q(cam, '.s02-spk'), 960, 690, tDe + .2, { n: 24, r: 700, size: 48 });
      A.flash(tDe - .05, { a: .6, d: .4 });
    }
  };

  /* =====================================================================
     03 · LA CAMPAÑA: CÓMO FUNCIONÓ
     ===================================================================== */
  const FRAME = `
      <svg class="frame-svg" viewBox="0 0 960 570" aria-hidden="true">
        <path fill-rule="evenodd" fill="url(#gGold)" stroke="#6F5122" stroke-width="2" d="M6 6h948v558H6z M80 60h800v450H80z"/>
        <path d="M30 30h900v510H30z" fill="none" stroke="#6F5122" stroke-width="2" opacity=".55"/>
        <path d="M44 44h872v482H44z" fill="none" stroke="#F2D995" stroke-width="5" stroke-dasharray="0 13" stroke-linecap="round"/>
        <path d="M72 52h816v466H72z" fill="none" stroke="#6F5122" stroke-width="3" opacity=".6"/>
        <use href="#corner" x="0" y="0" width="150" height="150"/>
        <use href="#corner" x="0" y="0" width="150" height="150" transform="translate(960 0) scale(-1 1)"/>
        <use href="#corner" x="0" y="0" width="150" height="150" transform="translate(0 570) scale(1 -1)"/>
        <use href="#corner" x="0" y="0" width="150" height="150" transform="translate(960 570) scale(-1 -1)"/>
        <use href="#crest" x="340" y="-36" width="280" height="100"/>
        <use href="#crest" x="380" y="540" width="200" height="72" transform="rotate(180 480 576)"/>
      </svg>`;
  const AVATAR = (k) => `<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="56" fill="#FFFDF8" stroke="url(#gGold)" stroke-width="6"/>
      <circle cx="60" cy="46" r="18" fill="${k % 2 ? '#8F6F33' : '#6F5122'}"/><path d="M26 98q4-32 34-32t34 32" fill="${k % 2 ? '#8F6F33' : '#6F5122'}"/>
      <rect x="78" y="70" width="22" height="36" rx="5" fill="#CD1618" stroke="#fff" stroke-width="3"/></svg>`;
  E.s03 = {
    build(cam, T, tl, A, root) {
      root.dataset.legal = 'frames';
      cam.innerHTML = `
      <div class="lay s03-b0">
        <div class="ctr s03-ag" style="top:150px"><span class="lbl">La agencia</span><span class="anton au" style="display:block;font-size:170px;margin-top:6px">McCANN</span></div>
        <div class="lay s03-spk0"></div>
        <svg class="s03-arc" viewBox="0 0 1920 1080"><path d="M420 560 C 700 320, 1220 320, 1500 560" fill="none" stroke="#8F6F33" stroke-width="5" stroke-dasharray="2 16" stroke-linecap="round"/>
          <circle class="s03-dot o0" r="12" fill="#CD1618"/></svg>
        <div class="s03-city o0" style="left:140px;top:560px;text-align:right;width:560px"><span class="anton gold-dk">NUEVA YORK</span><em class="src">40° 42′ N · 74° 0′ O</em></div>
        <div class="s03-city o0" style="left:1220px;top:560px;width:620px"><span class="anton gold-dk">NUEVA ZELANDA</span><em class="src">36° 51′ S · 174° 46′ E</em></div>
        <div class="ctr s03-pe" style="top:720px;height:220px;perspective:900px">
          <p class="fr ink o0 s03-prueba" style="font-size:64px">una prueba de producto…</p>
          <p class="fr red o0 s03-evento" style="font-size:170px;line-height:1;margin-top:-90px">un evento</p>
        </div>
      </div>
      <div class="lay s03-b1">
        <div class="s03-frame o0"><video class="s03-teaser" muted playsinline preload="auto" src="assets/video/huggies-expensive-shit-teaser.mp4"></video>${FRAME}</div>
        <p class="ctr src o0 s03-trad" style="top:770px;font-size:26px">«Algunos de los objetos más lujosos del mundo» · súper del teaser</p>
        <div class="s03-tz o0"><span class="lbl">Primero, un</span><span class="anton au" style="font-size:118px">TEASER</span><span class="fri ink2 s03-vx" style="font-size:33px;display:block;margin:-4px 0 4px;white-space:nowrap">(video de expectativa)</span><span class="anton gold-dk" style="font-size:170px;line-height:.9"><b class="s03-sec">0</b> s</span></div>
        <div class="s03-auc o0">
          <svg viewBox="0 0 220 200" class="s03-gavel"><ellipse cx="88" cy="182" rx="70" ry="10" fill="rgba(42,33,24,.15)"/><rect x="28" y="150" width="120" height="28" rx="9" fill="#8F6F33"/><rect x="40" y="140" width="96" height="14" rx="5" fill="#B9975A"/>
            <g class="gv"><rect x="104" y="73" width="104" height="15" rx="7" fill="#6F5122"/><rect x="56" y="26" width="56" height="108" rx="16" fill="url(#gGold)" stroke="#6F5122" stroke-width="3"/><rect x="56" y="44" width="56" height="9" fill="#6F5122" opacity=".45"/><rect x="56" y="108" width="56" height="9" fill="#6F5122" opacity=".45"/></g></svg>
          <p class="fri ink2" style="font-size:44px">con aire de subasta de millonarios</p>
        </div>
      </div>
      <div class="lay s03-b2">
        <div class="s03-cal o0"><b class="anton">MARZO 2026</b><span class="anton">12</span><em class="src">11:00 a. m. en Bogotá<br>(9 a. m. del Pacífico, según el teaser)</em></div>
        <div class="s03-hr o0"><svg viewBox="-60 -60 120 120"><circle r="50" fill="none" stroke="rgba(143,111,51,.2)" stroke-width="10"/><circle class="hr-p" r="50" fill="none" stroke="#CD1618" stroke-width="10" transform="rotate(-90)"/></svg><span class="anton gold-dk">1 HORA<br>EN VIVO</span></div>
        ${[['i-yt', '#FF0000', 'YouTube'], ['i-tt', '#111111', 'TikTok'], ['i-ig', '#D62976', 'Instagram']].map((p, k) => `
          <div class="s03-ph o0" style="left:${720 + k * 380}px">
            <div class="scr"><img src="assets/piezas/img-03-greatscape-hero.jpg" alt=""><span class="live"><i></i>EN VIVO</span></div>
            <p><svg style="color:${p[1]}"><use href="#${p[0]}"/></svg><b>${p[2]}</b></p>
          </div>`).join('')}
      </div>
      <div class="lay s03-b3">
        <img class="plate o0 s03-cen" src="assets/fallback/set-cenital.jpg" alt="">
        <div class="ctr o0 s03-tot" style="top:126px"><span class="lbl">En juego</span><span class="anton au s03-sum">US$0</span><em class="fri ink2 o0 s03-more">+ cama dorada (US$16.500) y más: casi US$500.000</em></div>
        <p class="abs src o0 s03-psrc" style="left:90px;top:862px">Precios: rótulos del livestream (12-mar-2026)</p>
        <figure class="slot mul feather o0 s03-o" data-slot="o01" style="left:70px;top:470px;width:560px;--fx:8%;--fy:8%"></figure>
        <figure class="slot mul feather o0 s03-o" data-slot="o05" style="left:610px;top:590px;width:430px;--fx:9%;--fy:9%"></figure>
        <figure class="slot mul feather o0 s03-o" data-slot="o03" style="left:1020px;top:520px;width:540px;--fx:6%;--fy:8%"></figure>
        <figure class="slot mul feather o0 s03-o" data-slot="o04" style="left:1585px;top:360px;width:300px;--fx:8%;--fy:6%"></figure>
        ${[['Sofá francés antiguo', '28.000', 350, 300], ['Alfombra turca Oushak', '89.000', 825, 420], ['Convertible blanco', '289.000', 1290, 352], ['Vestido de novia', '20.769', 1735, 160]].map(p => `
          <div class="tag o0 s03-tag" style="left:${p[2]}px;top:${p[3]}px;transform:translateX(-50%)"><span class="tl">${p[0]}</span><span class="tp"><sup>US$</sup>${p[1]}</span></div>`).join('')}
      </div>
      <div class="lay s03-b4">
        <svg class="s03-waves" viewBox="0 0 1920 1080">${[0, 1, 2].map(() => '<ellipse cx="960" cy="470" rx="80" ry="40" fill="none" stroke="#CD1618" stroke-width="5" class="wv"/>').join('')}</svg>
        ${Array.from({ length: 6 }, (_, k) => { const a = -1.5708 + k * 6.2832 / 6 + .26; return `<div class="s03-av o0" style="left:${(960 + Math.cos(a) * 520 - 70).toFixed(0)}px;top:${(470 + Math.sin(a) * 270 - 70).toFixed(0)}px">${AVATAR(k)}</div>`; }).join('')}
        <div class="ctr o0 s03-inf" style="top:405px"><span class="anton au" style="font-size:110px">6 INFLUENCIADORES</span></div>
        ${[['«Caótico»', 'Fox News', 130, 170, -4], ['«Una celebración de una realidad desordenada»', 'CBS', 90, 724, 3], ['«Sin margen de error»', 'AntiqueWeek', 1300, 170, 4]].map(p => `
          <div class="s03-press o0" style="left:${p[2]}px;top:${p[3]}px;transform:rotate(${p[4]}deg);max-width:${p[1] === 'CBS' ? 620 : p[1] === 'AntiqueWeek' ? 520 : 640}px"><p class="fr">${p[0]}</p><span>${p[1]}</span></div>`).join('')}
      </div>
      <div class="lay s03-b5">
        <p class="ctr fr gold o0 s03-q" style="top:136px;font-size:60px">¿A quién le hablaban?</p>
        <div class="s03-card o0">
          <div class="s03-pic">${AVATAR(0)}<svg class="bby" viewBox="0 0 60 60"><circle cx="30" cy="22" r="13" fill="#D9B56A"/><path d="M10 56q2-20 20-20t20 20z" fill="#D9B56A"/></svg></div>
          <div class="s03-id"><span class="lbl">Perfil del target</span><span class="anton ink s03-gz">PAPÁ GEN Z</span><span class="s03-meta o0">primerizo · EE. UU.</span></div>
          <ul>
            <li class="o0"><b>●</b> Con la plata contada</li>
            <li class="o0"><b>●</b> Ya no le cree a la publicidad ${M.strike('bonita')}</li>
          </ul>
          <p class="s03-pnp o0 anton">PRUEBAS, NO PROMESAS</p>
        </div>
      </div>`;

      // ---------- beat 0: McCann NY ↔ NZ · prueba de producto → evento
      // McCANN ya está cuando llega la onda; "late" cuando la voz lo dice
      tl.fromTo(q(cam, '.s03-ag .anton'), { scale: 1 }, { scale: 1.12, duration: .22, yoyo: true, repeat: 1, ease: 'power2.out', immediateRender: false }, T.w(0, ['mac']) - .05);
      A.sparkle(q(cam, '.s03-spk0'), 960, 260, T.w(0, ['mac']) + .1, { n: 14, r: 420, size: 38 });
      const cities = qa(cam, '.s03-city'), arc = q(cam, '.s03-arc path');
      A.rise(cities[0], T.w(0, ['nueva york', 'nueva']) - .1, { y: 24 });
      A.draw(arc, T.w(0, ['york']), T.w(0, ['zelanda']) - T.w(0, ['york']) + .4, { ease: 'power1.inOut' });
      A.rise(cities[1], T.w(0, ['zelanda']) - .1, { y: 24 });
      const dot = q(cam, '.s03-dot'); const pth = { p: 0 };
      A.show(dot, T.w(0, ['york']));
      const arcEl = arc;
      tl.fromTo(pth, { p: 0 }, { p: 1, duration: 1.4, ease: 'power1.inOut', immediateRender: false, onUpdate: () => { const L = arcEl.getTotalLength(), pt = arcEl.getPointAtLength(pth.p * L); dot.setAttribute('cx', pt.x); dot.setAttribute('cy', pt.y); } }, T.w(0, ['york']));
      const pr = q(cam, '.s03-prueba'), ev = q(cam, '.s03-evento');
      A.rise(pr, T.w(0, ['prueba']) - .15, { y: 24 });
      tl.to(pr, { rotationX: 90, autoAlpha: 0, duration: .35, ease: 'power2.in' }, T.w(0, ['evento']) - .3);
      tl.fromTo(ev, { rotationX: -90, autoAlpha: 0 }, { rotationX: 0, autoAlpha: 1, duration: .6, ease: 'back.out(2)', immediateRender: false }, T.w(0, ['evento']) - .05);
      // ---------- beat 1: el teaser en marco barroco
      A.out(q(cam, '.s03-b0'), T.b(1) - .1, { d: .4, y: false, scale: .96 });
      const fr = q(cam, '.s03-frame');
      tl.fromTo(fr, { autoAlpha: 0, scale: .5, rotation: -6 }, { autoAlpha: 1, scale: 1, rotation: 0, duration: 1, ease: 'expo.out', immediateRender: false }, T.b(1));
      T.video(q(cam, '.s03-teaser'), T.b(1), T.b(3), { from: 3.6 });
      A.rise(q(cam, '.s03-tz'), T.w(1, ['teaser', 'tiser']) - .2, { y: 30 });
      A.count(q(cam, '.s03-sec'), T.w(1, ['treinta']) - .1, .9, 0, 34, null, { ease: 'power2.out' });
      const auc = q(cam, '.s03-auc');
      A.rise(auc, T.w(1, ['aire']) - .2, { y: 30 });
      A.fade(q(cam, '.s03-trad'), T.b(1) + .3, .4);
      A.out(q(cam, '.s03-trad'), T.w(1, ['subasta']) - .2, { d: .3 });
      tl.set(q(auc, '.gv'), { rotation: 32, svgOrigin: '208 80' }, 0);
      tl.fromTo(q(auc, '.gv'), { rotation: 32 }, { rotation: -2, duration: .2, ease: 'power4.in', yoyo: true, repeat: 1, immediateRender: false }, T.w(1, ['subasta']) - .12);
      A.shake(T.w(1, ['subasta']) + .12, 6);
      // ---------- beat 2: 12 de marzo · 1 hora · tres pantallas EN VIVO
      tl.to(fr, { scale: .34, x: -720, y: -330, autoAlpha: 0, duration: .7, ease: 'expo.in' }, T.b(2) - .1);
      tl.to([q(cam, '.s03-tz'), auc], { autoAlpha: 0, duration: .3 }, T.b(2) - .1);
      const cal = q(cam, '.s03-cal');
      tl.fromTo(cal, { autoAlpha: 0, rotationX: -90, transformOrigin: '50% 0%' }, { autoAlpha: 1, rotationX: 0, duration: .8, ease: 'back.out(1.6)', immediateRender: false }, T.b(2) + .05);
      tl.fromTo(q(cal, 'span'), { scale: .4, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: .5, ease: 'back.out(2.4)', immediateRender: false }, T.w(2, ['doce']) - .1);
      const hr = q(cam, '.s03-hr');
      A.rise(hr, T.w(2, ['hora']) - .2, { y: 20 });
      A.draw(q(hr, '.hr-p'), T.w(2, ['hora']), 1.8, { ease: 'power2.inOut' });
      const phs = qa(cam, '.s03-ph');
      [T.w(2, ['yutub', 'youtube']), T.w(2, ['tik']), T.w(2, ['instagram'])].forEach((t, k) => {
        tl.fromTo(phs[k], { autoAlpha: 0, y: 200, rotation: (k - 1) * 4 }, { autoAlpha: 1, y: 0, rotation: (k - 1) * 2, duration: .7, ease: 'back.out(1.5)', immediateRender: false }, t - .25);
        tl.fromTo(q(phs[k], '.live'), { scale: 0 }, { scale: 1, duration: .4, ease: 'back.out(3)', immediateRender: false }, t + .15);
      });
      // ---------- beat 3: lo que estaba en juego, con su etiqueta, y el contador
      A.out(q(cam, '.s03-b2'), T.b(3) - .1, { d: .4, y: 40 });
      const tot = q(cam, '.s03-tot'), sum = q(cam, '.s03-sum');
      A.fade(q(cam, '.s03-cen'), T.b(3) - .1, .6, .15);
      A.rise(tot, T.b(3) + .05, { y: 20 });
      const objs = qa(cam, '.s03-o'), tags = qa(cam, '.s03-tag');
      const to = [T.w(3, ['sofa']), T.w(3, ['alfombra']), T.w(3, ['convertible']), T.w(3, ['vestido'])];
      const tp = [T.w(3, ['veintiocho']), T.w(3, ['ochenta']), T.w(3, ['trescientos', 'casi']), T.w(3, ['novia'])];
      const vals = [28000, 89000, 289000, 20769];
      let acc = 0;
      objs.forEach((o, k) => {
        tl.fromTo(o, { autoAlpha: 0, y: -260, scale: .9 }, { autoAlpha: 1, y: 0, scale: 1, duration: .75, ease: 'back.out(1.3)', immediateRender: false }, to[k] - .3);
        tl.fromTo(tags[k], { autoAlpha: 0, rotation: -16, y: -40 }, { autoAlpha: 1, rotation: 0, y: 0, duration: 1, ease: 'elastic.out(1,.45)', immediateRender: false }, tp[k] - .15);
        A.count(sum, tp[k] - .05, .8, acc, acc + vals[k], v => 'US$' + M.fmtEs(v), { ease: 'power2.out' });
        acc += vals[k];
      });
      sum.textContent = 'US$0';
      A.rise(q(cam, '.s03-more'), T.w(3, ['hasta']) - .1, { y: 14 });
      A.fade(q(cam, '.s03-psrc'), T.w(3, ['hasta']) + .3, .5);
      // ---------- beat 4: ondas a 6 influenciadores + prensa
      A.out(q(cam, '.s03-b3'), T.b(4) - .1, { d: .4, y: false, scale: .95 });
      const t6 = T.w(4, ['seis']);
      qa(cam, '.wv').forEach((w, k) => tl.fromTo(w, { attr: { rx: 30, ry: 15 }, opacity: 1 }, { attr: { rx: 720, ry: 340 }, opacity: 0, duration: 1.4, ease: 'power2.out', repeat: 2, immediateRender: false }, t6 - .2 + k * .3));
      qa(cam, '.s03-av').forEach((a, k) => A.pop(a, t6 + .25 + k * .1, { from: .2 }));
      A.slam(q(cam, '.s03-inf'), T.w(4, ['influenciadores']) - .1, { from: 1.6, amp: 6 });
      qa(cam, '.s03-press').forEach((p, k) => {
        const r = [-4, 3, 4][k];
        tl.fromTo(p, { autoAlpha: 0, scale: 1.8, rotation: r * 4 }, { autoAlpha: 1, scale: 1, rotation: r, duration: .45, ease: 'power4.out', immediateRender: false }, T.w(4, ['prensa']) - .1 + k * .3);
      });
      // ---------- beat 5: ficha del target estilo livestream
      A.out(q(cam, '.s03-b4'), T.b(5) - .1, { d: .4, y: false, scale: .95 });
      A.rise(q(cam, '.s03-q'), T.b(5), { y: 20 });
      const card = q(cam, '.s03-card');
      tl.fromTo(card, { autoAlpha: 0, y: 80, scale: .92 }, { autoAlpha: 1, y: 0, scale: 1, duration: .8, ease: 'expo.out', immediateRender: false }, T.b(5) + .05);
      A.pop(q(card, '.s03-pic'), T.w(5, ['papas']) - .15, { from: .5 });
      A.rise(q(card, '.s03-meta'), T.w(5, ['primerizos']) - .1, { y: 14 });
      A.track(q(card, '.s03-gz'), T.w(5, ['generacion']) - .1, { d: .8, from: '.3em' });
      const lis = qa(card, 'li');
      A.rise(lis[0], T.w(5, ['plata']) - .2, { y: 16 });
      A.rise(lis[1], T.w(5, ['creen']) - .3, { y: 16 });
      A.strike(lis[1], T.wEnd(5, ['bonita']), .35);
      const pnp = q(card, '.s03-pnp');
      tl.fromTo(pnp, { autoAlpha: 0, scaleX: 0 }, { autoAlpha: 1, scaleX: 1, duration: .55, ease: 'expo.out', immediateRender: false }, T.w(5, ['pruebas']) - .15);
      A.shake(T.w(5, ['pruebas']) + .2, 6);
    }
  };
})();
