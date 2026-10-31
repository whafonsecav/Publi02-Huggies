/* =====================================================================
   ESCENAS 04–06 · resultado y veredicto · al revés: la necesidad · ¿si ha visto cuando alguien…?
   (mismo contrato que escenas-a.js: todos los tiempos salen de T, es decir, de NARRACION)
   ===================================================================== */
(function () {
  'use strict';
  const M = KIT.M;
  const E = window.ESCENAS = window.ESCENAS || {};
  if (window.MotionPathPlugin) gsap.registerPlugin(MotionPathPlugin);
  const q = (r, s) => r.querySelector(s);
  const qa = (r, s) => Array.from(r.querySelectorAll(s));
  const mmss = v => { v = Math.max(0, Math.round(v)); return String(Math.floor(v / 60)).padStart(2, '0') + ':' + String(v % 60).padStart(2, '0'); };

  /* =====================================================================
     04 · RESULTADO Y VEREDICTO
     ===================================================================== */
  const LION = (fill, stroke) => `
    <svg viewBox="0 0 200 250" class="lion">
      <path d="M26 234 H174 V248 H26Z M44 214 H156 V234 H44Z" fill="${fill}" stroke="${stroke}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M156 196 C176 196 186 180 180 162 C177 152 182 146 190 148" fill="none" stroke="${stroke}" stroke-width="11" stroke-linecap="round"/>
      <path d="M156 196 C176 196 186 180 180 162 C177 152 182 146 190 148" fill="none" stroke="${fill}" stroke-width="6" stroke-linecap="round"/>
      <circle cx="191" cy="146" r="7" fill="${fill}" stroke="${stroke}" stroke-width="3"/>
      <path d="M58 214 C56 204 60 198 70 197 L76 160 C70 150 66 136 70 124 C60 122 50 116 46 106 C40 100 38 92 44 86 C40 80 42 72 50 70 C52 60 60 54 68 52 C66 42 74 34 86 34 C100 30 112 36 118 46 C130 50 136 62 132 74 C140 84 138 98 130 106 C146 114 156 130 158 150 C164 168 162 186 156 198 C162 204 166 210 166 214 Z" fill="${fill}" stroke="${stroke}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M76 160 C84 178 88 196 90 214 M86 46 C96 52 104 64 106 80 M100 40 C112 50 118 66 116 88 M70 124 C84 118 98 110 110 96" fill="none" stroke="${stroke}" stroke-width="3" stroke-linecap="round" opacity=".55"/>
      <circle cx="61" cy="76" r="3.4" fill="${stroke}"/>
    </svg>`;
  E.s04 = {
    build(cam, T, tl, A, root) {
      cam.innerHTML = `
      <div class="lay s04-b0">
        <p class="ctr fr gold s04-q" style="top:170px;font-size:84px">¿Y qué pasó?</p>
        <div class="s04-badge"><img src="assets/logos/huggies-logo.svg" alt=""><b class="anton">EXPENSIVE $H*T</b><span class="anton s04-clk">60:00</span></div>
      </div>
      <div class="lay s04-b1">
        <div class="s04-scale o0">
          <svg viewBox="0 0 600 330" aria-hidden="true">
            <g class="sc-top">
              <path d="M40 128 Q 300 230 560 128 L 540 104 Q 300 190 60 104 Z" fill="#FFFFFF" stroke="#8F6F33" stroke-width="5" stroke-linejoin="round"/>
              <g class="sc-pile">${Array.from({ length: 11 }, (_, k) => `<use href="#swirl" class="sc-p" x="${180 + (k % 5) * 50 - (k > 4 ? -25 : 0) - (k > 8 ? -25 : 0)}" y="${92 - Math.floor(k / 5) * 34}" width="58" height="58" style="color:${k % 2 ? '#8F6F33' : '#6F5122'}"/>`).join('')}</g>
            </g>
            <rect x="120" y="178" width="360" height="130" rx="28" fill="#FFFFFF" stroke="#8F6F33" stroke-width="5"/>
            <rect x="215" y="206" width="170" height="72" rx="10" fill="#2A2118"/>
            <text class="sc-lcd" x="300" y="264" text-anchor="middle" font-family="Anton" font-size="56" fill="#F2D995">0</text>
          </svg>
        </div>
        <p class="abs src o0 s04-s11" style="left:170px;top:872px;width:640px;text-align:center">Case film de Cannes Lions 2026 · dato de la marca</p>
        <div class="s04-11 o0"><span class="anton au s04-n11">0</span><span class="anton gold-dk">POPÓS CONFIRMADOS</span></div>
        <div class="s04-0 o0"><span class="anton red">0</span><span class="anton red s04-bl">BLOWOUTS</span></div>
        <svg class="s04-ring" viewBox="0 0 1920 1080"><circle cx="1390" cy="420" r="60" fill="none" stroke="#CD1618" stroke-width="10" class="o0"/></svg>
      </div>
      <div class="lay s04-b2">
        <div class="sup o0 s04-seg" style="top:128px;--ss:52px"><span class="s">Resultados · según la marca (case film de Cannes)</span></div>
        <div class="s04-fig s04-f1 o0"><span class="anton au s04-157">0</span><span class="anton gold-dk">IMPRESIONES SIN PAGAR PUBLICIDAD</span></div>
        <div class="s04-fig s04-f2 o0"><span class="anton au s04-570">0</span><span class="anton gold-dk">MEDIOS HABLANDO DEL TEMA</span></div>
        <p class="ctr anton au o0 s04-lt" style="top:420px;font-size:80px">4 LEONES EN CANNES</p>
        <div class="s04-lions">
          ${[['url(#gGold)', '#6F5122', 'ORO', 'Experiencia de marca', 1.2], ['url(#gSilver)', '#6E6D68', 'PLATA', 'Social y creadores', 1], ['url(#gBronze)', '#5E3A1E', 'BRONCE', 'Medios', 1], ['url(#gBronze)', '#5E3A1E', 'BRONCE', 'Experiencia de marca', 1]].map((l, k) => `
            <div class="s04-lion o0" style="--s:${l[4]}">${LION(l[0], l[1])}<b>${l[2]}</b><em>${l[3]}</em></div>`).join('')}
        </div>
        <p class="ctr src o0 s04-lsrc" style="top:900px">Cannes Lions 2026 · Campaign Brief NZ</p>
        <div class="lay s04-spk"></div>
      </div>
      <div class="lay s04-b3">
        <svg class="s04-div" viewBox="0 0 1920 1080"><path d="M960 170 V 880" stroke="#D9B56A" stroke-width="4" stroke-linecap="round"/></svg>
        <div class="stamp s04-ok o0" style="left:250px;top:200px;color:#8F6F33;font-size:150px">ACIERTO</div>
        <div class="s04-col" style="left:150px">
          <p class="fr ink o0">Demostraron, en vez de prometer.</p>
          <p class="fr ink o0">Pusieron lo más incómodo de la crianza en el centro.</p>
        </div>
        <div class="stamp s04-ojo o0" style="left:1300px;top:200px;color:#CD1618;font-size:150px">OJO</div>
        <div class="s04-col s04-cr" style="left:1040px">
          ${['La prueba la diseñó la propia marca', 'Hubo partes pregrabadas', 'Nunca publicaron ventas'].map(t => `
            <p class="fr ink o0"><svg viewBox="0 0 60 60" class="xm"><path d="M12 12 L48 48 M48 12 L12 48" fill="none" stroke="#CD1618" stroke-width="9" stroke-linecap="round"/></svg>${t}</p>`).join('')}
        </div>
      </div>`;

      // ---------- beat 0: la cuenta del livestream corre
      const bd = q(cam, '.s04-badge');
      tl.fromTo(bd, { scale: 1 }, { scale: 1.08, duration: .25, yoyo: true, repeat: 1, ease: 'power2.out', immediateRender: false }, T.w(0, ['paso']) - .1);
      A.count(q(cam, '.s04-clk'), T.b(0) + .3, Math.max(.8, T.b(1) - T.b(0) - .2), 3600, 0, mmss, { ease: 'power2.in' });
      // ---------- beat 1: 11 popós (báscula) → 0 blowouts
      tl.to(bd, { scale: .3, x: 820, y: 360, autoAlpha: 0, duration: .5, ease: 'expo.in' }, T.b(1) - .05);
      A.out(q(cam, '.s04-q'), T.b(1) - .05, { d: .3 });
      const sc = q(cam, '.s04-scale'), t11 = T.w(1, ['once', '11']);
      A.rise(sc, T.b(1), { y: 60 });
      const n11 = q(cam, '.s04-11');
      A.slam(n11, t11 - .05, { from: 1.5, amp: 6 });
      const span = Math.max(.8, T.w(1, ['confirmados']) - t11 + .3);
      A.count(q(cam, '.s04-n11'), t11, span, 0, 11);
      A.count(q(cam, '.sc-lcd'), t11, span, 0, 11);
      qa(sc, '.sc-p').forEach((p, k) => {
        const t = t11 + k * span / 11;
        tl.fromTo(p, { autoAlpha: 0, y: -200 }, { autoAlpha: 1, y: 0, duration: .32, ease: 'bounce.out', immediateRender: false }, t);
        tl.fromTo(q(sc, '.sc-top'), { y: 0 }, { y: 4, duration: .08, yoyo: true, repeat: 1, ease: 'power1.out', immediateRender: false }, t + .28);
      });
      A.fade(q(cam, '.s04-s11'), T.w(1, ['confirmados']), .5);
      const t0b = T.w(1, ['cero', '0']);
      A.slam(q(cam, '.s04-0'), t0b - .05, { from: 2.4, amp: 16 });
      const ring = q(cam, '.s04-ring circle');
      tl.fromTo(ring, { autoAlpha: 1, attr: { r: 60 } }, { autoAlpha: 0, attr: { r: 520 }, duration: .9, ease: 'power2.out', immediateRender: false }, t0b + .05);
      // ---------- beat 2: una cifra por golpe
      A.out(q(cam, '.s04-b1'), T.b(2) - .05, { d: .35, y: false, scale: .96 });
      A.rise(q(cam, '.s04-seg'), T.b(2), { y: 14 });
      const f1 = q(cam, '.s04-f1'), f2 = q(cam, '.s04-f2'), t157 = T.w(2, ['ciento', '157']);
      A.slam(f1, t157 - .05, { from: 1.7 });
      A.odo(q(cam, '.s04-157'), t157 - .05, 1.15, '157 M');
      A.flash(t157 - .05, { a: .5 });
      const t570 = T.w(2, ['quinientos', '570']);
      tl.to(f1, { x: -470, y: -120, scale: .46, duration: .6, ease: 'expo.inOut' }, t570 - .35);
      A.slam(f2, t570 - .05, { from: 1.7 });
      A.odo(q(cam, '.s04-570'), t570 - .05, 1.05, '570');
      A.flash(t570 - .05, { a: .5 });
      const t4 = T.w(2, ['cuatro', '4']);
      tl.to(f2, { x: 470, y: -120, scale: .46, duration: .6, ease: 'expo.inOut' }, t4 - .35);
      A.track(q(cam, '.s04-lt'), t4 - .1, { d: .8 });
      const lions = qa(cam, '.s04-lion');
      lions.forEach((l, k) => tl.fromTo(l, { autoAlpha: 0, y: 120, scale: .6 }, { autoAlpha: 1, y: 0, scale: 1, duration: .6, ease: 'back.out(1.8)', immediateRender: false }, T.w(2, ['leones']) - .1 + k * .14));
      A.fade(q(cam, '.s04-lsrc'), T.w(2, ['leones']) + .4, .5);
      tl.to(q(cam, '.s04-seg'), { autoAlpha: 0, duration: .3 }, T.w(2, ['quinientos', '570']) - .4);
      const tOro = T.w(2, ['oro']);
      tl.fromTo(lions[0], { scale: 1 }, { scale: 1.14, duration: .5, ease: 'back.out(3)', immediateRender: false }, tOro - .1);
      A.sparkle(q(cam, '.s04-spk'), 492, 690, tOro, { n: 18, r: 300, size: 40 });
      // ---------- beat 3: ACIERTO
      A.out(q(cam, '.s04-b2'), T.b(3) - .05, { d: .35, y: false, scale: .96 });
      A.draw(q(cam, '.s04-div path'), T.b(3), .8);
      A.stamp(q(cam, '.s04-ok'), T.w(3, ['bueno']) - .1, { rot: -7 });
      const oks = qa(cam, '.s04-col:not(.s04-cr) p');
      A.rise(oks[0], T.w(3, ['demostraron']) - .2, { y: 24 });
      A.rise(oks[1], T.w(3, ['incomodo', 'pusieron']) - .2, { y: 24 });
      // ---------- beat 4: OJO
      A.stamp(q(cam, '.s04-ojo'), T.w(4, ['discutible']) - .15, { rot: 6, amp: 14 });
      const crs = qa(cam, '.s04-cr p');
      [T.w(4, ['prueba']), T.w(4, ['hubo', 'partes']), T.w(4, ['nunca'])].forEach((t, k) => {
        A.rise(crs[k], t - .15, { y: 24 });
        A.draw(q(crs[k], '.xm path'), t + .1, .35, { ease: 'power3.out' });
      });
    }
  };

  /* =====================================================================
     05 · AL REVÉS: DEFINICIÓN Y NECESIDAD
     ===================================================================== */
  const ICON = {
    pin: `<svg viewBox="0 0 160 160"><path d="M80 148C80 148 30 96 30 62a50 50 0 0 1 100 0c0 34-50 86-50 86z" fill="none" stroke="#8F6F33" stroke-width="8" stroke-linejoin="round"/><circle cx="80" cy="62" r="18" fill="none" stroke="#CD1618" stroke-width="8"/></svg>`,
    onesie: `<svg viewBox="0 0 160 160"><path d="M80 14v10M64 24q16-14 32 0" fill="none" stroke="#8F6F33" stroke-width="7" stroke-linecap="round"/><path d="M58 34h44l34 22-14 22-14-8v66H52V70l-14 8-14-22z" fill="#FFFFFF" stroke="#8F6F33" stroke-width="7" stroke-linejoin="round"/><path d="M66 34q14 14 28 0" fill="none" stroke="#8F6F33" stroke-width="6"/><circle cx="80" cy="96" r="5" fill="#CD1618"/><circle cx="80" cy="114" r="5" fill="#CD1618"/></svg>`,
    sand: `<svg viewBox="0 0 160 160"><path d="M40 18h80M40 142h80" stroke="#8F6F33" stroke-width="9" stroke-linecap="round"/><path d="M48 18c0 40 64 44 64 62s-64 22-64 62M112 18c0 40-64 44-64 62s64 22 64 62" fill="none" stroke="#8F6F33" stroke-width="7"/><path d="M64 120q16-14 32 0l8 14H56z" fill="#CD1618"/><path d="M68 44h24l-12 14z" fill="#CD1618"/></svg>`,
    eye: `<svg viewBox="0 0 300 180" class="s05-eye"><path class="lid" d="M20 90 Q150 -20 280 90 Q150 200 20 90z" fill="#FFFFFF" stroke="#8F6F33" stroke-width="9" stroke-linejoin="round"/><g class="iris"><circle cx="150" cy="90" r="44" fill="#8F6F33"/><circle cx="150" cy="90" r="18" fill="#2A2118"/><circle cx="136" cy="76" r="9" fill="#FFFFFF"/></g></svg>`
  };
  E.s05 = {
    build(cam, T, tl, A, root) {
      root.dataset.legal = 'frames';
      cam.innerHTML = `
      <div class="lay s05-b0">
        <div class="s05-rw o0"><video class="plate" muted playsinline preload="auto" src="assets/clips/c03-rebobinado.mp4"></video><i class="scan"></i>
          <p class="s05-rwl"><svg viewBox="0 0 60 40"><path d="M30 4 L4 20 L30 36z M56 4 L30 20 L56 36z" fill="#fff"/></svg>REBOBINANDO</p></div>
        <p class="ctr anton au s05-rev o0" style="top:150px;font-size:230px">AL REVÉS</p>
        <p class="ctr fr ink o0 s05-nada" style="top:440px;font-size:62px">Una idea así no sale de la nada…</p>
        <div class="ctr o0 s05-ins" style="top:540px"><span class="fr gold" style="font-size:54px;display:block">sale de un</span><span class="anton au-sheen" style="font-size:290px;line-height:.92;display:inline-block">INSIGHT</span></div>
      </div>
      <div class="lay s05-b1">
        <p class="ctr lbl o0 s05-cl" style="top:150px">En clase lo definimos así</p>
        <div class="ctr o0 s05-clase" style="top:300px"><svg class="s05-qm" viewBox="0 0 200 160"><path d="M20 150 Q 0 60 70 10 L 82 30 Q 46 62 56 92 Q 92 92 92 124 Q 92 156 58 156 Q 30 156 20 150z M120 150 Q 100 60 170 10 L 182 30 Q 146 62 156 92 Q 192 92 192 124 Q 192 156 158 156 Q 130 156 120 150z" fill="#D9B56A"/></svg>
          <span class="fr gold-dk" style="font-size:64px;display:block">Publicidad 2 · Clase 4</span><span class="anton au" style="font-size:110px;display:block;margin-top:8px">CONCEPTO CREATIVO</span></div>
        <p class="ctr fr ink o0 s05-nace" style="top:196px;font-size:58px">El insight nace de las…</p>
        <div class="s05-ecc">${['EMOCIONES', 'COMPLEJOS', 'COMPORTAMIENTOS'].map((w, k) => `<p class="anton o0" style="top:${k * 150}px">${w}</p>`).join('')}</div>
        <p class="ctr fri ink2 o0 s05-int" style="top:752px;font-size:48px">…más íntimos de la gente</p>
        <div class="s05-obs o0">${ICON.eye}<span class="anton red">SE DESCUBRE<br>OBSERVANDO</span></div>
      </div>
      <div class="lay s05-b2">
        <p class="ctr anton au o0 s05-nec" style="top:140px;font-size:120px">LA NECESIDAD</p>
        <p class="ctr fr ink o0 s05-nv" style="top:300px;font-size:60px">Huggies no vende un pañal…</p>
        <div class="s05-tray o0"><div class="s05-glow"></div><p class="anton au-sheen s05-lib o0">LIBERTAD</p>
          <svg class="tr" viewBox="0 0 360 60"><use href="#tray" width="360" height="60"/></svg>
          <svg class="cl" viewBox="0 0 320 210"><use href="#cloche" width="320" height="210"/></svg></div>
        <div class="lay s05-spk"></div>
      </div>
      <div class="lay s05-b3">
        <p class="ctr fri ink o0 s05-sin" style="top:440px;font-size:50px">…sin que <b class="red" style="font-style:normal;font-weight:800">el miedo</b> decida:</p>
        <div class="s05-three">${[['pin', 'A DÓNDE VAS'], ['onesie', 'QUÉ LE PONES'], ['sand', 'CUÁNTO TE QUEDAS']].map(p => `<div class="o0">${ICON[p[0]]}<span class="anton gold-dk">${p[1]}</span></div>`).join('')}</div>
      </div>
      <div class="lay s05-b4">
        <div class="s05-qs">${['¿SI HA VISTO CUANDO ALGUIEN…?', '¿QUÉ PASARÍA SI…?'].map((t, k) => `
          <div class="s05-q o0" data-k="${k}"><b class="anton red s05-qn o0">${k + 1}</b><span class="anton au s05-qt">${t}</span></div>`).join('<i class="s05-qrule o0"></i>')}</div>
        <p class="ctr fr gold o0 s05-dos" style="top:132px;font-size:52px">En clase usamos dos preguntas</p>
      </div>`;

      // ---------- beat 0: rebobinar la transmisión → AL REVÉS → INSIGHT
      const rw = q(cam, '.s05-rw');
      A.show(rw, 0);
      T.video(q(rw, 'video'), 0, 3.2, { from: 0 });
      tl.fromTo(q(rw, '.s05-rwl'), { opacity: 1 }, { opacity: .25, duration: .25, yoyo: true, repeat: 7, ease: 'steps(1)', immediateRender: false }, 0);
      const tUna = T.w(0, ['una']);
      const tEnd = Math.min(2.9, tUna - .1);
      A.flash(tEnd - .05, { a: .9, d: .5 });
      A.hide(rw, tEnd);
      const rev = q(cam, '.s05-rev');
      tl.fromTo(rev, { autoAlpha: 0, rotationY: 180, scaleX: 1 }, { autoAlpha: 1, rotationY: 0, duration: 1, ease: 'back.out(1.4)', immediateRender: false }, tEnd);
      A.rise(q(cam, '.s05-nada'), tUna - .1, { y: 24 });
      const ins = q(cam, '.s05-ins');
      A.slam(ins, T.w(0, ['sale'], 1) - .05, { from: 1.8, amp: 10 });
      // ---------- beat 1: la definición de la clase
      A.out(q(cam, '.s05-b0'), T.b(1) - .05, { d: .35, y: false });
      A.rise(q(cam, '.s05-cl'), T.b(1), { y: 14 });
      const clase = q(cam, '.s05-clase');
      tl.fromTo(clase, { autoAlpha: 0, scale: .9, rotationX: -25 }, { autoAlpha: 1, scale: 1, rotationX: 0, duration: .6, ease: 'expo.out', immediateRender: false }, T.b(1) - .05);
      tl.to(clase, { autoAlpha: 0, y: -60, scale: .8, duration: .35, ease: 'power2.in' }, T.w(1, ['insait', 'insight']) - .45);
      A.rise(q(cam, '.s05-nace'), T.w(1, ['insait', 'insight']) - .2, { y: 20 });
      const ecc = qa(cam, '.s05-ecc p');
      [T.w(1, ['emociones']), T.w(1, ['complejos']), T.w(1, ['comportamientos'])].forEach((t, k) => {
        tl.fromTo(ecc[k], { autoAlpha: 0, x: k % 2 ? 90 : -90, filter: 'blur(10px)' }, { autoAlpha: 1, x: 0, filter: 'blur(0px)', duration: .6, ease: 'expo.out', immediateRender: false }, t - .12);
        tl.fromTo(ecc[k], { color: '#CD1618' }, { color: '#8F6F33', duration: 1.2, ease: 'power1.out', immediateRender: false }, t + .4);
      });
      A.rise(q(cam, '.s05-int'), T.w(1, ['intimos']) - .2, { y: 18 });
      const obs = q(cam, '.s05-obs');
      A.pop(obs, T.w(1, ['descubre']) - .2, { from: .5 });
      tl.fromTo(q(obs, '.lid'), { scaleY: .08, transformOrigin: '50% 50%' }, { scaleY: 1, duration: .5, ease: 'back.out(2)', immediateRender: false }, T.w(1, ['observando']) - .1);
      tl.fromTo(q(obs, '.iris'), { x: 0 }, { x: 34, duration: .6, ease: 'sine.inOut', yoyo: true, repeat: 1, immediateRender: false }, T.w(1, ['observando']) + .4);
      // ---------- beat 2: la necesidad → la campana se levanta: LIBERTAD
      A.out(q(cam, '.s05-b1'), T.b(2) - .05, { d: .35, y: false });
      A.track(q(cam, '.s05-nec'), T.w(2, ['necesidad']) - .2, { d: .9 });
      const tray = q(cam, '.s05-tray');
      A.rise(tray, T.b(2) + .1, { y: 80 });
      A.rise(q(cam, '.s05-nv'), T.w(2, ['porque', 'jaguis']) - .1, { y: 20 });
      const tLib = T.w(2, ['libertad']);
      const cl = q(tray, '.cl');
      // v4.1 (ALTO-1): la campana tiembla, sale disparada y YA se fue cuando suena "libertad"
      tl.fromTo(cl, { y: 0, rotation: 0 }, { y: -10, duration: .1, yoyo: true, repeat: 3, ease: 'sine.inOut', immediateRender: false }, tLib - .95);
      tl.to(cl, { y: -620, x: 300, rotation: 28, autoAlpha: 0, duration: .55, ease: 'power3.out' }, tLib - .5);
      A.fade(q(tray, '.s05-glow'), tLib - .35, .4);
      A.slam(q(tray, '.s05-lib'), tLib - .08, { from: .3, amp: 12 });
      A.sparkle(q(cam, '.s05-spk'), 960, 640, tLib, { n: 26, r: 640, size: 50 });
      // ---------- beat 3: a dónde vas · qué le pones · cuánto te quedas
      // LIBERTAD se sostiene grande hasta "sin" (no desde el inicio del beat)
      const tSin = T.w(3, ['sin']);
      tl.to([q(cam, '.s05-nec'), q(cam, '.s05-nv')], { autoAlpha: 0, duration: .3 }, tSin - .6);
      tl.to(tray, { y: -350, scale: .62, duration: .8, ease: 'expo.inOut' }, tSin - .5);
      tl.to([q(tray, '.tr'), q(tray, '.s05-glow')], { autoAlpha: 0, duration: .4 }, tSin - .5);
      A.rise(q(cam, '.s05-sin'), tSin + .15, { y: 18 });
      const three = qa(cam, '.s05-three > div');
      [T.w(3, ['donde']), T.w(3, ['que le', 'pones']), T.w(3, ['cuanto'])].forEach((t, k) => {
        A.pop(three[k], t - .15, { from: .4 });
        qa(three[k], 'path,circle').forEach(p => A.draw(p, t - .1, .6));
      });
      // ---------- beat 4: las dos preguntas, en tipografía (v5: sin puertas)
      A.out(q(cam, '.s05-b2'), T.b(4) - .05, { d: .4, y: false });
      A.out(q(cam, '.s05-b3'), T.b(4) - .05, { d: .4, y: false });
      A.rise(q(cam, '.s05-dos'), T.b(4) + .1, { y: 14 });          // v5.1: sin huecos en blanco antes de las preguntas
      const qs = qa(cam, '.s05-q');
      [T.w(4, ['encontrar']) - .1, T.w(4, ['clase']) - .25].forEach((t, k) => {
        A.rise(qs[k], t, { y: 50 });
        A.track(q(qs[k], '.s05-qt'), t, { d: .9 });
        A.pop(q(qs[k], '.s05-qn'), t + .1, { from: .3, rot: -14, toRot: 0 });
      });
      A.fade(q(cam, '.s05-qrule'), T.w(4, ['clase']) - .1, .5);
      tl.fromTo(qa(cam, '.s05-qn'), { scale: 1 }, { scale: 1.16, duration: .22, yoyo: true, repeat: 1, ease: 'power2.out', stagger: .12, immediateRender: false }, T.w(4, ['dos', 'preguntas']) + .1);
      tl.fromTo(qs[0], { scale: 1 }, { scale: 1.06, duration: .6, ease: 'back.out(2)', immediateRender: false }, T.e(4) + .2);
      tl.to(qs[1], { opacity: .45, duration: .6 }, T.e(4) + .2);
    }
  };

  /* =====================================================================
     06 · ¿SI HA VISTO CUANDO ALGUIEN…? · una observación por pantalla
     ===================================================================== */
  const OB = [
    { k: 'LA COLA', q: '¿Si ha visto cuando alguien le huele la cola al bebé en plena reunión, disimulando con un besito?', a: 'Es la forma más vergonzosa de revisar el pañal, y la más necesaria.' },
    { k: 'EL PUJO', q: '¿Si ha visto cuando alguien se congela porque el bebé pone cara de estar pujando?', a: 'Se para el mundo, y uno reza: que aguante, que aguante.' },
    { k: 'LA BOMBA', q: '¿Si ha visto cuando alguien carga al bebé con los brazos estirados, como si llevara una bomba?', a: 'Lo lleva del sofá al baño sin que toque nada.' },
    { k: 'LA ROPA BLANCA', q: '¿Si ha visto cuando alguien guarda la ropita blanca para cuando el bebé esté más grande?', a: 'Porque el blanco y el popó no se llevan.', pista: 'el set todo blanco', ps: 'p09' },
    { k: 'LA SILLA DEL CARRO', q: '¿Si ha visto cuando alguien limpia la silla del carro a las 11 de la noche?', a: 'Es la víctima número uno de los escapes.', pista: 'el carro de lujo', ps: 'p05' },
    { k: 'EL SOFÁ AJENO', q: '¿Si ha visto cuando alguien le pone una toalla al sofá de la suegra antes de sentar al bebé?', a: 'En casa ajena, el sofá vale el doble, y la vergüenza, el triple.', pista: 'el sofá de lujo', ps: 'p01' },
    { k: 'LA MANCHA', q: '¿Si ha visto cuando alguien llega con la ropa manchada de popó y es el último en enterarse?', a: 'Todos lo notan y nadie dice nada.' },
    { k: 'LA CASA', q: '¿Si ha visto cuando alguien dice «mejor nos quedamos en la casa»?', a: '4 de cada 10 papás han dejado de ir a lugares por miedo a que el pañal se salga.' }
  ];
  // íconos propios de las pistas (la versión de lujo de cada observación)
  const PIC = {
    p09: '<path d="M10 62 V24 q0-12 12-12 h8 q10 0 10 10 v16 h62 q8 0 8 10 v14 M10 50 h100 M14 62 v8 M106 62 v8 M46 30 h28 q6 0 6 6 v2 h-40 v-2 q0-6 6-6z"/>',
    p05: '<path d="M8 54 q0-12 14-14 l18-4 q14-14 34-14 q14 0 26 12 l10 4 q8 2 8 10 v6 H8z M40 36 h50"/><circle cx="30" cy="58" r="8"/><circle cx="90" cy="58" r="8"/>',
    p01: '<path d="M14 60 v-20 q0-8 8-8 q2-16 38-16 t38 16 q8 0 8 8 v20 z M22 60 v8 M98 60 v8 M30 46 h60"/><circle cx="60" cy="18" r="3"/>'
  };
  const ART = [
    // 1 · nariz + corazón
    `<svg viewBox="0 0 460 300" class="art"><path class="ln" d="M150 40 C 150 120, 110 170, 120 210 C 126 236, 170 240, 196 226" fill="none" stroke="#8F6F33" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path class="ln" d="M150 210 q 14 -14 30 -4" fill="none" stroke="#8F6F33" stroke-width="8" stroke-linecap="round"/>
      ${[0, 1, 2].map(k => `<path class="sn" d="M420 ${110 + k * 40} q -30 -16 -60 0 t -60 0 t -60 0" fill="none" stroke="#D9B56A" stroke-width="8" stroke-linecap="round" stroke-dasharray="18 14"/>`).join('')}
      <path class="hrt" d="M330 70 c -10 -22 -44 -18 -40 10 c 3 18 26 30 40 42 c 14 -12 37 -24 40 -42 c 4 -28 -30 -32 -40 -10z" fill="#CD1618"/></svg>`,
    // 2 · se congela (foto del bebé con pausa)
    `<div class="frz"><figure class="slot card" data-slot="p07" style="width:600px"></figure><i class="ice"></i>
      <svg viewBox="0 0 100 100" class="pz"><circle cx="50" cy="50" r="46" fill="rgba(255,255,255,.92)"/><rect x="31" y="27" width="13" height="46" rx="3" fill="#2A2118"/><rect x="56" y="27" width="13" height="46" rx="3" fill="#2A2118"/></svg></div>`,
    // 3 · como una bomba (papá) + mecha
    `<div class="bmb"><figure class="slot card" data-slot="p10" style="width:620px"></figure>
      <svg viewBox="0 0 200 200" class="bomb"><circle cx="92" cy="118" r="62" fill="#2A2118"/><circle cx="70" cy="96" r="14" fill="#5A4B3A"/><rect x="104" y="44" width="34" height="26" rx="6" transform="rotate(30 121 57)" fill="#5A4B3A"/>
      <path class="fuse" d="M132 50 C 150 26, 170 30, 178 12" fill="none" stroke="#8F6F33" stroke-width="6" stroke-linecap="round"/><use href="#spark" class="fz" x="160" y="-6" width="36" height="36" style="color:#E5393B"/></svg></div>`,
    // 4 · la ropita blanca guardada
    `<svg viewBox="0 0 460 300" class="art"><path class="ln" d="M230 30 v 16 M200 46 q 30 -26 60 0 L 330 86" fill="none" stroke="#8F6F33" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><path class="ln" d="M200 46 L130 86" fill="none" stroke="#8F6F33" stroke-width="8" stroke-linecap="round"/>
      <path class="ln" d="M196 70 h 68 l 50 32 -20 34 -20 -12 v 112 H 186 V 124 l -20 12 -20 -34z" fill="#FFFFFF" stroke="#8F6F33" stroke-width="8" stroke-linejoin="round"/>
      <rect class="bag" x="110" y="58" width="240" height="236" rx="22" fill="rgba(217,181,106,.16)" stroke="#D9B56A" stroke-width="6"/>
      <path class="zip" d="M118 70 V 286" stroke="#CD1618" stroke-width="7" stroke-dasharray="4 8" stroke-linecap="round"/></svg>`,
    // 5 · 11 p. m. y la silla del carro
    `<svg viewBox="0 0 460 300" class="art"><rect x="20" y="40" width="190" height="96" rx="16" fill="#2A2118"/><text class="clk" x="115" y="112" text-anchor="middle" font-family="Anton" font-size="74" fill="#E5393B">11:00</text><text x="115" y="168" text-anchor="middle" font-family="Inter" font-weight="800" font-size="26" letter-spacing="4" fill="#6F5122">P. M.</text>
      <path class="ln" d="M300 118 Q 372 18 436 150" fill="none" stroke="#8F6F33" stroke-width="7" stroke-linecap="round"/>
      <path class="ln" d="M312 44 C 292 44 284 64 286 84 L 294 194 C 296 214 312 224 332 224 L 414 224 C 430 224 436 210 428 198 L 406 170 C 400 162 390 160 380 162 L 338 168 L 330 74 C 328 56 324 44 312 44 Z" fill="#FFFFFF" stroke="#8F6F33" stroke-width="8" stroke-linejoin="round"/>
      <path class="ln" d="M262 256 Q 360 206 456 256 M276 256 H 442" fill="none" stroke="#8F6F33" stroke-width="8" stroke-linecap="round"/>
      <path class="ln" d="M312 96 L 346 152 M334 90 L 346 152 M346 152 L 352 188" fill="none" stroke="#CD1618" stroke-width="7" stroke-linecap="round"/>
      ${[[250, 230, 16], [420, 70, 12], [436, 220, 18], [270, 40, 10]].map(b => `<circle class="bub" cx="${b[0]}" cy="${b[1]}" r="${b[2]}" fill="none" stroke="#9CC7E8" stroke-width="5"/>`).join('')}</svg>`,
    // 6 · la toalla en el sofá de la suegra · ×2 ×3
    `<svg viewBox="0 0 460 300" class="art"><path class="ln" d="M40 170 q -20 -70 40 -76 q 20 -60 150 -60 q 130 0 150 60 q 60 6 40 76 v 60 H 40z" fill="#FFF8EC" stroke="#8F6F33" stroke-width="8" stroke-linejoin="round"/><path class="ln" d="M60 230 v 34 M400 230 v 34" stroke="#8F6F33" stroke-width="10" stroke-linecap="round"/>
      <g class="twl"><rect x="150" y="120" width="160" height="90" rx="8" fill="#FFFFFF" stroke="#D9B56A" stroke-width="5"/><path d="M150 140 h 160 M150 190 h 160" stroke="#9CC7E8" stroke-width="7"/></g>
      <text class="x2" x="420" y="90" text-anchor="middle" font-family="Anton" font-size="84" fill="#CD1618">×2</text><text class="x3" x="60" y="80" text-anchor="middle" font-family="Anton" font-size="84" fill="#CD1618">×3</text></svg>`,
    // 7 · todos lo notan
    `<svg viewBox="0 0 460 300" class="art"><path class="ln" d="M190 120 l 40 -20 l 40 20 l 30 30 -24 26 -14 -10 v 90 h -64 v -90 l -14 10 -24 -26z" fill="#FFFFFF" stroke="#8F6F33" stroke-width="7" stroke-linejoin="round"/><circle cx="240" cy="200" r="11" fill="#D9B56A"/>
      ${[[60, 60], [150, 30], [340, 34], [420, 80], [40, 170], [420, 200], [100, 260], [380, 270]].map((e, k) => `<g class="eye" transform="translate(${e[0]} ${e[1]})"><ellipse rx="26" ry="16" fill="#FFFFFF" stroke="#2A2118" stroke-width="4"/><circle class="pp" r="8" fill="#2A2118" cx="${e[0] < 230 ? 8 : -8}" cy="${e[1] < 150 ? 5 : -5}"/></g>`).join('')}</svg>`,
    // 8 · 4 de cada 10 papás
    `<div class="dads">${Array.from({ length: 10 }, (_, k) => `<svg viewBox="0 0 80 120" class="dad${k < 4 ? ' hot' : ''}"><use href="#dad" width="80" height="120"/></svg>`).join('')}</div>`
  ];
  E.s06 = {
    build(cam, T, tl, A, root) {
      cam.innerHTML = `
      <div class="lay s06-b0">
        <p class="ctr lbl o0 s06-1" style="top:236px">La primera pregunta</p>
        <div class="ctr o0 s06-t" style="top:300px"><span class="fr ink" style="font-size:86px;display:block">¿Si ha visto cuando</span><span class="anton au" style="font-size:300px;line-height:.95;display:block">ALGUIEN…?</span></div>
      </div>
      <div class="s06-hdr o0"><span class="fr gold">Primera pregunta · lo que vimos</span><i class="dots">${OB.map(() => '<b></b>').join('')}</i></div>
      ${OB.map((o, k) => `
        <div class="lay s06-ob o0" data-k="${k}">
          <div class="s06-art">${ART[k]}</div>
          ${o.pista ? `<div class="s06-pc o0"><span class="s06-pista"><svg viewBox="0 0 120 80" class="pic">${PIC[o.ps]}</svg><span><b>PISTA</b><br>${o.pista}</span></span></div>` : ''}
          <p class="s06-q fr ink">${o.q}</p>
          <p class="s06-a o0"><b class="anton red">R/.</b> <span class="fri">${o.a}</span></p>
          ${k === 7 ? '<p class="s06-srcp src o0">Encuesta de Pampers (2023) · dato de la competencia</p>' : ''}
        </div>`).join('')}
      <div class="lay s06-b9">
        ${OB.map((o, k) => { const P = [[200, 210, -4], [1340, 200, 3], [130, 520, 3], [1400, 520, -3], [330, 760, -2], [1250, 780, 2], [760, 170, 2], [820, 840, -3]][k]; return `<p class="abs anton gold-dk s06-kw o0" style="left:${P[0]}px;top:${P[1]}px;transform:rotate(${P[2]}deg)">${o.k}</p>`; }).join('')}
        <p class="ctr o0 s06-nadie" style="top:350px">${M.strike('<span class="fr ink" style="font-size:64px">Nadie habla del popó</span>')}</p>
        <p class="ctr anton red o0 s06-dt" style="top:470px;font-size:250px;line-height:.9">CUANDO SE SALE</p>
      </div>`;

      // ---------- beat 0: la primera pregunta (v5: sin puerta)
      A.rise(q(cam, '.s06-1'), .05, { y: 14 });                       // v5.1: la escena no arranca vacía
      A.show(q(cam, '.s06-t'), .05);
      A.rise(q(cam, '.s06-t .fr'), .15, { y: 24 });
      A.track(q(cam, '.s06-t .anton'), T.w(0, ['visto', 'has']) - .1, { d: 1.1 });
      // ---------- beats 1–8: una observación por pantalla, con su respuesta
      const hdr = q(cam, '.s06-hdr'), dots = qa(hdr, '.dots b');
      A.out(q(cam, '.s06-b0'), T.b(1) - .4, { d: .3, y: -40 });
      A.rise(hdr, T.b(1) - .05, { y: -20, d: .5 });
      tl.set(document.body, { '--subop': .75 }, T.b(1) - .05);
      tl.set(document.body, { '--subop': 1 }, T.b(9) - .05);
      const obs = qa(cam, '.s06-ob');
      obs.forEach((g, k) => {
        const i = k + 1, t0 = T.b(i), ta = T.after(i, '?'), tn = k < 7 ? T.b(i + 1) : T.b(9);
        tl.fromTo(g, { autoAlpha: 0, x: 160 }, { autoAlpha: 1, x: 0, duration: .55, ease: 'expo.out', immediateRender: false }, t0 - .05);
        tl.fromTo(q(g, '.s06-q'), { y: 30 }, { y: 0, duration: .7, ease: 'expo.out', immediateRender: false }, t0 - .05);
        tl.fromTo(q(g, '.s06-art'), { scale: .7, rotation: k % 2 ? 4 : -4 }, { scale: 1, rotation: 0, duration: .8, ease: 'back.out(1.6)', immediateRender: false }, t0);
        A.rise(q(g, '.s06-a'), ta - .15, { y: 24 });
        const pis = q(g, '.s06-pc'); if (pis) A.pop(pis, ta + .5, { from: .3, rot: 14, toRot: 4 });
        tl.to(g, { autoAlpha: 0, x: -180, duration: .3, ease: 'power2.in' }, tn - .36);
        tl.to(dots[k], { backgroundColor: '#CD1618', scale: 1.4, duration: .3 }, t0);
        tl.to(dots[k], { backgroundColor: '#8F6F33', scale: 1, duration: .3 }, tn - .1);
        qa(g, '.ln').forEach((p, j) => A.draw(p, t0 + .1 + j * .08, .8));
        // gestos propios de cada observación
        if (k === 0) {
          qa(g, '.sn').forEach((p, j) => tl.fromTo(p, { strokeDashoffset: 0 }, { strokeDashoffset: -160, duration: 1.6, ease: 'none', repeat: 2, immediateRender: false }, t0 + j * .1));
          tl.fromTo(q(g, '.hrt'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: .5, ease: 'back.out(3)', immediateRender: false }, T.w(i, ['besito']) - .1);
          tl.fromTo(q(g, '.hrt'), { scale: 1 }, { scale: 1.18, duration: .25, yoyo: true, repeat: 5, ease: 'sine.inOut', immediateRender: false }, T.w(i, ['besito']) + .4);
        }
        if (k === 1) {
          const tc = T.w(i, ['congela']);
          tl.fromTo(q(g, '.ice'), { opacity: 0 }, { opacity: 1, duration: .25, immediateRender: false }, tc);
          tl.fromTo(q(g, '.pz'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: .4, ease: 'back.out(3)', immediateRender: false }, tc);
          tl.fromTo(window.FXCTRL, { speed: 1 }, { speed: 0, duration: .3, immediateRender: false }, tc);
          tl.to(window.FXCTRL, { speed: 1, duration: .6 }, T.w(i, ['aguante'], 1));
          tl.to(q(g, '.ice'), { opacity: 0, duration: .5 }, T.w(i, ['aguante'], 1));
          tl.fromTo(q(g, '.s06-art'), { x: 0 }, { x: 5, duration: .05, yoyo: true, repeat: 9, ease: 'none', immediateRender: false }, T.w(i, ['aguante']));
        }
        if (k === 2) {
          A.draw(q(g, '.fuse'), t0 + .3, 1.2);
          tl.fromTo(q(g, '.fz'), { scale: .6, transformOrigin: '50% 50%', rotation: 0 }, { scale: 1.3, rotation: 90, duration: .15, yoyo: true, repeat: 30, ease: 'none', immediateRender: false }, t0 + .4);
        }
        if (k === 3) {
          tl.fromTo(q(g, '.bag'), { autoAlpha: 0, scaleY: 0, transformOrigin: '50% 0%' }, { autoAlpha: 1, scaleY: 1, duration: .7, ease: 'expo.out', immediateRender: false }, T.w(i, ['guarda']) + .4);
          A.draw(q(g, '.zip'), T.w(i, ['grande']) - .3, .6);
        }
        if (k === 4) {
          tl.fromTo(q(g, '.clk'), { opacity: 1 }, { opacity: .25, duration: .3, yoyo: true, repeat: 5, ease: 'steps(1)', immediateRender: false }, T.w(i, ['once']));
          qa(g, '.bub').forEach((b, j) => tl.fromTo(b, { scale: 0, transformOrigin: '50% 50%', y: 10 }, { scale: 1, y: -20, duration: 1.2, ease: 'sine.out', immediateRender: false }, t0 + .4 + j * .25));
        }
        if (k === 5) {
          tl.fromTo(q(g, '.twl'), { y: -200, rotation: -12, autoAlpha: 0, svgOrigin: '230 160' }, { y: 0, rotation: 0, autoAlpha: 1, duration: .7, ease: 'bounce.out', immediateRender: false }, T.w(i, ['toalla']) - .1);
          tl.fromTo(q(g, '.x2'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: .5, ease: 'back.out(3)', immediateRender: false }, T.w(i, ['doble']) - .1);
          tl.fromTo(q(g, '.x3'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1.2, duration: .5, ease: 'back.out(3)', immediateRender: false }, T.w(i, ['triple']) - .1);
        }
        if (k === 6) {
          qa(g, '.eye').forEach((e, j) => tl.fromTo(e, { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: .35, ease: 'back.out(2.5)', immediateRender: false }, T.w(i, ['todos']) - .2 + j * .06));
          qa(g, '.eye ellipse').forEach((e, j) => tl.fromTo(e, { attr: { ry: 16 } }, { attr: { ry: 2 }, duration: .1, yoyo: true, repeat: 1, immediateRender: false }, T.w(i, ['nadie']) + j * .05));
        }
        if (k === 7) {
          const hot = qa(g, '.dad.hot');
          qa(g, '.dad').forEach((d, j) => tl.fromTo(d, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: .4, ease: 'back.out(2)', immediateRender: false }, t0 + .2 + j * .05));
          hot.forEach((d, j) => tl.fromTo(d, { color: '#D9B56A', scale: 1 }, { color: '#CD1618', scale: 1.15, duration: .35, ease: 'back.out(3)', immediateRender: false }, T.w(i, ['cuatro', '4']) + j * .14));
          A.fade(q(g, '.s06-srcp'), ta + .3, .5);
        }
      });
      // ---------- beat 9: el patrón converge en DÓNDE TERMINA
      A.out(hdr, T.b(9) - .05, { d: .3 });
      const kws = qa(cam, '.s06-kw');
      kws.forEach((w, k) => A.pop(w, T.b(9) + k * .09, { from: .5, ease: 'back.out(2)' }));
      const nad = q(cam, '.s06-nadie');
      A.rise(nad, T.w(9, ['nadie']) - .15, { y: 20 });
      A.strike(nad, T.wEnd(9, ['popo']), .35);
      const tTo = T.w(9, ['todos']);
      kws.forEach((w, k) => {
        const px = w.offsetLeft + w.offsetWidth / 2, py = w.offsetTop + w.offsetHeight / 2, cx = 960, cy = 590;
        const a0 = Math.atan2(py - cy, px - cx), r0 = Math.hypot(px - cx, py - cy), pts = [{ x: 0, y: 0 }];
        [.3, .55, .8].forEach(f => { const a = a0 + f * 4.2, r = r0 * (1 - f); pts.push({ x: cx + Math.cos(a) * r - px, y: cy + Math.sin(a) * r - py }); });
        pts.push({ x: cx - px, y: cy - py });
        if (window.MotionPathPlugin) tl.to(w, { motionPath: { path: pts, curviness: 1.3 }, scale: .25, rotation: 360, autoAlpha: 0, filter: 'blur(5px)', duration: 1.05, ease: 'power2.in' }, tTo - .35 + k * .05);
        else tl.to(w, { x: cx - px, y: cy - py, scale: .3, autoAlpha: 0, duration: .6, ease: 'expo.in' }, tTo + k * .04);
      });
      tl.to(nad, { y: -110, opacity: .6, duration: .6, ease: 'expo.inOut' }, tTo);
      A.slam(q(cam, '.s06-dt'), T.w(9, ['cuando']) - .05, { from: 2.2, amp: 16 });   // v5.2: el insight es lo que pasa cuando se sale
      A.flash(T.w(9, ['cuando']) - .05, { a: .5 });
    }
  };
})();
