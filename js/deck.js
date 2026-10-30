/* =====================================================================
   DECK · reproductor narrado (v4)
   - Reloj de escena: con voz, audio.currentTime del MP3 de la escena (suavizado);
     sin voz, un reloj propio que corre igual. TODOS los tiempos salen de window.NARRACION.
   - Cada escena es una línea de tiempo GSAP en pausa; el reloj la "pinta" con tl.time(t),
     así se puede saltar a cualquier momento (capturas, ↓/↑, pausa).
   - Modos: por escena (predeterminado) y automático completo (A).
   - Mezcla: voz 1,0 · música 0,30 sin voz, 0,08 bajo la voz (ataque 250 ms, liberación 700 ms),
     0,22 con la voz apagada. Música en bucle con fundido cruzado de igual potencia.
   - v5 · celular: el show gira solo si el teléfono está vertical, se toca para pausar, se desliza para
     cambiar de escena y el botón ⋮ abre los controles (voz, subtítulos, automático, música, pantalla completa).
     Una sola etiqueta <audio> para toda la voz: en iPhone se desbloquea una vez con el primer toque.
   - API: window.DECK = { total, goTo(i), state(), seek(i, t), info(), mix() }
   ===================================================================== */
(function () {
  'use strict';
  const CONFIG = {
    musicSrc: 'assets/audio/musica-teaser-expensive-shit.mp3',
    musicEnd: 29.45, crossfade: 5,
    vol: { voice: 1.0, base: .30, duck: .08, noVoice: .22, attack: .25, release: .70, look: .25, hold: .15, bridge: 1.4 },
    showSeconds: 600,           // la cuenta regresiva arranca en 10:00
    autoHold: .15               // modo A: respiro antes de la transición (v5: más corto, el show va más unido)
  };
  window.DECK_CONFIG = CONFIG;
  const Q = new URLSearchParams(location.search);
  const CAP = Q.get('capture') === '1';
  const REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  gsap.registerPlugin(...[window.SplitText, window.CustomEase, window.DrawSVGPlugin].filter(Boolean));
  gsap.ticker.lagSmoothing(0);

  /* ---------- escala con letterbox (y giro en celular vertical) ---------- */
  const stage = $('#stage'), shell = $('#shell');
  const TOUCH = !!(window.matchMedia && window.matchMedia('(hover: none) and (pointer: coarse)').matches);
  document.body.classList.toggle('is-touch', TOUCH);
  const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };
  let rotPref = store.get('huggies-girar') !== '0', rotated = false;
  function fit() {
    const vw = window.innerWidth, vh = window.innerHeight;
    rotated = TOUCH && rotPref && vh > vw * 1.1;          // celular de pie: el show se acuesta
    document.body.classList.toggle('is-rot', rotated);
    const w = rotated ? vh : vw, h = rotated ? vw : vh, s = Math.min(w / 1920, h / 1080);
    shell.style.width = w + 'px'; shell.style.height = h + 'px';
    shell.style.transform = rotated ? `translate(${vw}px, 0) rotate(90deg)` : 'none';
    const ox = (w - 1920 * s) / 2, oy = (h - 1080 * s) / 2;
    stage.style.transform = `translate(${ox}px, ${oy}px) scale(${s})`;
    // el botón ⋮ (44 px, esquina superior derecha): si cae sobre el escenario, el estado y la línea legal se corren
    const bx = w - 8 - 44, over = oy < 56 && ox + 1920 * s > bx;
    stage.style.setProperty('--mgap', over ? ((ox + 1920 * s - bx + 8) / s).toFixed(1) + 'px' : '0px');
  }
  window.addEventListener('resize', fit); fit();
  window.addEventListener('orientationchange', () => setTimeout(fit, 250));

  /* ---------- escenas disponibles ---------- */
  const N = window.NARRACION || { escenas: [] };
  const DEFS = window.ESCENAS || {};
  const LIST = (N.escenas || []).filter(e => e && e.dur > 0);
  const PREV = []; LIST.reduce((acc, e, i) => { PREV[i] = acc; return acc + e.dur + 1.21; }, 0);   // B-8: cuenta también la onda (≈1,02 s) y el respiro
  const TOTAL_DUR = LIST.reduce((s, e) => s + e.dur, 0);
  const CHAP = { s01: '', s02: '1 · LA HISTORIA', s03: '1 · LA HISTORIA', s04: '1 · LA HISTORIA', s05: '2 · EL EJERCICIO', s06: '2 · EL EJERCICIO', s07: '2 · EL EJERCICIO', s08: '2 · EL EJERCICIO', s09: '2 · EL EJERCICIO', s10: '2 · EL EJERCICIO', s11: '3 · EL INSIGHT', s12: '' };
  const scenesEl = $('#scenes');

  window.CDCTRL = { v: -1, recap: 0, reset() { this.v = -1; this.recap = 0; } };

  /* ---------- estado ---------- */
  let cur = -1, S = null, started = false, busy = false, paused = false;
  let voiceOn = Q.get('voz') !== '0', subsOn = Q.get('subs') !== '0', auto = Q.get('modo') === 'auto';

  function regionsOf(data) {   // tramos en que la voz habla (beats unidos si el hueco es corto)
    const r = [];
    (data.beats || []).slice().sort((a, b) => a.t0 - b.t0).forEach(b => {
      const last = r[r.length - 1];
      if (last && b.t0 - last[1] < CONFIG.vol.bridge) last[1] = Math.max(last[1], b.t1);
      else r.push([b.t0, b.t1]);
    });
    return r;
  }

  /* ---------- v5.1 · choques de entrada/salida ----------
     Con la voz más rápida, a veces la salida de un elemento empieza mientras su entrada todavía corre
     (p. ej. una entrada de 0,8 s y la salida 0,3 s después): la entrada terminaba después y el elemento
     se quedaba pegado encima de lo siguiente. Aquí la salida siempre manda: la entrada se acorta para
     terminar justo cuando empieza la salida. Lo que se corrige queda en window.DECK_FADES (auditoría). */
  window.DECK_FADES = {};
  function startIn(t, tl) { let s = t.startTime(), p = t.parent; while (p && p !== tl) { s = p.startTime() + s / (p.timeScale() || 1); p = p.parent; } return s; }
  function alphaOf(t) { const v = t.vars || {}; const a = v.autoAlpha != null ? v.autoAlpha : v.opacity; return typeof a === 'number' ? a : null; }
  function resolveFades(tl, id) {
    const byEl = new Map(), log = [];
    tl.getChildren(true, true, false).forEach(t => {
      const a = alphaOf(t); if (a == null) return;
      const s0 = startIn(t, tl), d = t.duration();
      t.targets().forEach(el => { if (!el || !el.nodeType) return; if (!byEl.has(el)) byEl.set(el, []); byEl.get(el).push({ t, s: s0, e: s0 + d, show: a > .05 }); });
    });
    const name = el => (el.className && el.className.baseVal != null ? el.className.baseVal : el.className || el.tagName).toString().split(' ').filter(c => c && c !== 'o0').slice(0, 3).join('.');
    byEl.forEach((list, el) => {
      list.sort((x, y) => x.s - y.s);
      list.forEach((A, k) => {
        if (!A.show) return;
        const B = list.slice(k + 1).find(x => !x.show && x.s >= A.s);
        if (B && B.s < A.e - .02) {
          log.push({ el: name(el), entra: +A.s.toFixed(2), terminaba: +A.e.toFixed(2), sale: +B.s.toFixed(2) });
          A.t.duration(Math.max(.05, B.s - A.s)); A.e = B.s;
        }
      });
    });
    window.DECK_FADES[id] = log;
  }

  function buildScene(i) {
    const data = LIST[i];
    const def = DEFS[data.id] || DEFS._generic;
    const root = document.createElement('section');
    root.className = 'scene sc-' + data.id; root.dataset.id = data.id;
    root.innerHTML = '<div class="cam"></div>';
    scenesEl.appendChild(root);
    const T = KIT.timing(data);
    T.prevSum = PREV[i]; T.index = i; T.root = root; T.rng = KIT.rng(1000 + i * 77);
    const tl = gsap.timeline({ paused: true });
    try { def.build(root.querySelector('.cam'), T, tl, KIT.anim(tl, T, root), root); }
    catch (e) { console.error('Escena', data.id, e); }
    try { resolveFades(tl, data.id); } catch (e) { console.error('Choques', data.id, e); }
    tl.set({}, {}, data.dur + .05);
    window.SLOTS && SLOTS.mount(root);
    const sc = { i, data, def, root, tl, T, clock: 0, playing: false, ended: false, regions: regionsOf(data), audio: null, audioOK: true, waitAudio: false };
    tl.time(0, false);
    return sc;
  }
  function destroy(sc) {
    if (!sc) return;
    try { sc.tl.kill(); } catch (e) {}
    if (sc.audio) { try { sc.audio.pause(); } catch (e) {} }
    sc.root.querySelectorAll('video').forEach(v => { try { v.pause(); v.removeAttribute('src'); v.load(); } catch (e) {} });
    sc.root.remove();
  }
  // una sola etiqueta para toda la voz: el primer toque la desbloquea (iPhone) y cada escena solo cambia el src
  const VOICE = new Audio(); VOICE.preload = 'auto';
  VOICE.addEventListener('error', () => { if (S && S.audio === VOICE && VOICE.getAttribute('src')) { S.audioOK = false; S.waitAudio = false; } });
  VOICE.addEventListener('playing', () => { if (S) S.waitAudio = false; });
  function makeAudio(sc) {
    if (CAP) { sc.audioOK = false; return; }
    VOICE.volume = CONFIG.vol.voice;
    if (VOICE.getAttribute('src') !== sc.data.audio) VOICE.src = sc.data.audio;
    sc.audio = VOICE;
  }
  function unlockAudio() {   // dentro del gesto del usuario: deja listas la voz y la segunda pista de música
    [VOICE, Music.a[1]].forEach(a => {
      if (!a) return;
      if (a === VOICE && !a.getAttribute('src') && LIST[0]) a.src = LIST[0].audio;
      const v = a === VOICE ? CONFIG.vol.voice : 0;
      a.volume = 0;
      const back = () => { if (!(a === VOICE && S && S.playing)) a.pause(); a.volume = v; };
      const p = a.play();
      if (p && p.then) p.then(back, () => { a.volume = v; }); else back();
    });
  }

  function enter(i, play) {
    S = buildScene(i); cur = i;
    window.FXCTRL && FXCTRL.reset(); CDCTRL.reset();
    makeAudio(S);
    $('#chap').textContent = [CHAP[S.data.id], S.data.titulo].filter(Boolean).join('  ·  ');
    legalRefresh(); hideNext(); subShow(null, true);
    render(0, true);
    if (play && !CAP) playScene();
    return S.root;
  }
  function playScene() {
    if (!S) return;
    S.playing = true; S.ended = false; hideNext();
    if (voiceOn && S.audioOK && S.audio) {
      try { S.audio.currentTime = S.clock; } catch (e) {}
      S.waitAudio = true;
      const p = S.audio.play();
      p && p.catch(() => { S && (S.audioOK = false, S.waitAudio = false); });
      setTimeout(() => { if (S) S.waitAudio = false; }, 700);
    }
  }
  function stopScene(sc) {
    if (!sc) return;
    sc.playing = false;
    if (sc.audio) try { sc.audio.pause(); } catch (e) {}
  }
  function sceneEnd() {
    S.playing = false; S.ended = true;
    if (S.audio) try { S.audio.pause(); } catch (e) {}
    if (cur >= LIST.length - 1) return;
    if (auto) gsap.delayedCall(CONFIG.autoHold, () => { if (S && S.ended && auto) goScene(cur + 1); });
    else showNext();
  }

  /* ---------- reloj ---------- */
  let last = performance.now();
  function loop(now) {
    const dt = Math.min(.1, (now - last) / 1000); last = now;
    if (S && S.playing && !paused && !busy) {
      const A = S.audio;
      if (voiceOn && S.audioOK && A && !A.paused && !A.ended && A.readyState >= 2) {
        S.clock += dt;
        const d = A.currentTime - S.clock;
        if (Math.abs(d) > .3) S.clock = A.currentTime; else S.clock += d * .12;
      } else if (!S.waitAudio) S.clock += dt;
      if (S.clock >= S.data.dur) { S.clock = S.data.dur; render(S.clock); sceneEnd(); }
    }
    if (S) render(S.clock);
    requestAnimationFrame(loop);
  }

  /* ---------- pintar el estado del tiempo t ---------- */
  let lastBeat = -1;
  function beatAt(t) {
    const bs = S.T.beats; let k = -1;
    for (let j = 0; j < bs.length; j++) if (t >= bs[j].t0 - .001) k = j;
    return k;
  }
  function render(t, hard) {
    if (!S) return;
    S.tl.time(Math.min(t, S.tl.duration()), false);
    // subtítulos
    const subs = S.data.subs || [];
    let sub = null;
    for (let j = 0; j < subs.length; j++) {
      const s = subs[j], nx = subs[j + 1];
      if (t >= s.t0 && t < Math.min(s.t1 + .45, nx ? nx.t0 : Infinity)) { sub = s; break; }
    }
    if (busy || !subsOn) sub = null;   // durante la onda (y con S apagada) no hay subtítulo
    subShow(sub, hard);
    lastBeat = beatAt(t);
    // cuenta regresiva y progreso
    let cdv = CONFIG.showSeconds - (PREV[cur] + t);
    if (CDCTRL.v >= 0) cdv = CDCTRL.v;
    setDigits(cdv);
    cdEl.classList.toggle('is-recap', CDCTRL.recap > .5);
    segFill(t);
    syncVideos(t, hard);
  }

  /* ---------- subtítulos ---------- */
  const subBand = $('#subBand');
  let subCur = null;
  function subShow(sub, hard) {
    if (sub === subCur) return;
    subCur = sub;
    gsap.killTweensOf(subBand);
    if (!sub) { if (hard) gsap.set(subBand, { opacity: 0 }); else gsap.to(subBand, { opacity: 0, duration: .25 }); return; }
    subBand.textContent = sub.text;
    if (hard || CAP) gsap.set(subBand, { opacity: 1, y: 0 });
    else gsap.fromTo(subBand, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .22, ease: 'power2.out' });
  }

  /* ---------- videos de la escena (siguen el reloj) ---------- */
  function syncVideos(t, hard) {
    const run = S.playing && !paused && !busy && !CAP;
    S.T.videos.forEach(v => {
      const el = v.el; if (!el) return;
      const act = t >= v.t0 && t < v.t1;
      const dur = el.duration || 0;
      let exp = v.from + Math.max(0, t - v.t0) * v.rate;
      if (dur) exp = v.loop ? exp % dur : Math.min(exp, dur - .04);
      if (!act || !run) {
        if (!el.paused) el.pause();
        if ((hard || !run) && el.readyState >= 1 && Math.abs(el.currentTime - exp) > .08) { try { el.currentTime = exp; } catch (e) {} }
        return;
      }
      if (el.paused) { try { el.currentTime = exp; } catch (e) {} const p = el.play(); p && p.catch(() => {}); }
      else if (!v.loop && Math.abs(el.currentTime - exp) > .45) { try { el.currentTime = exp; } catch (e) {} }
    });
  }

  /* ---------- barras de progreso (12 segmentos) ---------- */
  const segs = $('#segs');
  LIST.forEach(() => { const i = document.createElement('i'); i.innerHTML = '<b></b>'; segs.appendChild(i); });
  function segFill(t) {
    const bars = segs.children;
    for (let j = 0; j < bars.length; j++) {
      const f = j < cur ? 1 : j > cur ? 0 : Math.min(1, t / (LIST[cur].dur || 1));
      const b = bars[j].firstChild;
      const v = 'scaleX(' + f.toFixed(4) + ')';
      if (b.style.transform !== v) b.style.transform = v;
      bars[j].classList.toggle('cur', j === cur);
    }
  }

  /* ---------- cuenta regresiva 10:00 (7 segmentos) ---------- */
  const SEG = { 0: 'abcdef', 1: 'bc', 2: 'abged', 3: 'abgcd', 4: 'fgbc', 5: 'afgcd', 6: 'afgedc', 7: 'abc', 8: 'abcdefg', 9: 'abcdfg' };
  const cdSvg = $('#cdDigits'), cdEl = $('#cd');
  const digits = [];
  (function buildDigits() {
    const w = 30, h = 50, th = 6.4, g = 1.6, NS = 'http://www.w3.org/2000/svg';
    const Hs = (x1, x2, y) => `${x1},${y} ${x1 + th / 2},${y - th / 2} ${x2 - th / 2},${y - th / 2} ${x2},${y} ${x2 - th / 2},${y + th / 2} ${x1 + th / 2},${y + th / 2}`;
    const Vs = (x, y1, y2) => `${x},${y1} ${x + th / 2},${y1 + th / 2} ${x + th / 2},${y2 - th / 2} ${x},${y2} ${x - th / 2},${y2 - th / 2} ${x - th / 2},${y1 + th / 2}`;
    const sg = { a: Hs(th / 2 + g, w - th / 2 - g, th / 2), g: Hs(th / 2 + g, w - th / 2 - g, h / 2), d: Hs(th / 2 + g, w - th / 2 - g, h - th / 2),
      f: Vs(th / 2, th / 2 + g, h / 2 - g), b: Vs(w - th / 2, th / 2 + g, h / 2 - g), e: Vs(th / 2, h / 2 + g, h - th / 2 - g), c: Vs(w - th / 2, h / 2 + g, h - th / 2 - g) };
    [0, 36, 92, 128].forEach(x0 => {
      const gEl = document.createElementNS(NS, 'g'); gEl.setAttribute('transform', `translate(${x0} 1) skewX(-4)`);
      const map = {};
      Object.entries(sg).forEach(([k, pts]) => { const p = document.createElementNS(NS, 'polygon'); p.setAttribute('points', pts); p.setAttribute('class', 'seg'); gEl.appendChild(p); map[k] = p; });
      cdSvg.appendChild(gEl); digits.push(map);
    });
    [[76, 15], [76, 33]].forEach(([x, y]) => { const r = document.createElementNS(NS, 'rect'); r.setAttribute('x', x); r.setAttribute('y', y); r.setAttribute('width', 6); r.setAttribute('height', 6); r.setAttribute('class', 'seg on'); cdSvg.appendChild(r); });
  })();
  let lastSec = -1;
  function setDigits(sec) {
    sec = Math.max(0, Math.ceil(sec - .001));
    if (sec === lastSec) return; lastSec = sec;
    const m = Math.min(99, Math.floor(sec / 60)), s = sec % 60;
    [Math.floor(m / 10), m % 10, Math.floor(s / 10), s % 10].forEach((d, i) => { const on = SEG[d]; Object.entries(digits[i]).forEach(([k, p]) => p.classList.toggle('on', on.includes(k))); });
  }
  setDigits(CONFIG.showSeconds);

  /* ---------- música: dos <audio> con fundido cruzado, y mezcla bajo la voz ---------- */
  const V = CONFIG.vol;
  const Music = {
    a: [], cur: 0, fading: false, on: false, muted: false, g: 0, muteG: 1, out: 0, target: 0, speaking: false,
    init() { for (let i = 0; i < 2; i++) { const a = new Audio(CONFIG.musicSrc); a.preload = 'auto'; a.volume = 0; this.a.push(a); } },
    start() {
      if (this.on || CAP) return; this.on = true;
      const A = this.a[0]; A.currentTime = 0; A.volume = 0; A.play().catch(() => {});
      this.g = V.base; this.lastT = performance.now();
      setInterval(() => this.tick(), 40);
    },
    targetNow() {
      if (!started) return 0;
      if (!voiceOn) { this.speaking = false; return V.noVoice; }
      if (!S || !S.playing || paused || busy) { this.speaking = false; return V.base; }
      const t = S.clock;
      this.speaking = S.regions.some(r => t >= r[0] - V.look && t <= r[1] + V.hold);
      return this.speaking ? V.duck : V.base;
    },
    tick() {
      const now = performance.now(), dt = Math.min(.2, (now - this.lastT) / 1000); this.lastT = now;
      const tg = this.target = this.targetNow();
      const span = V.base - V.duck;
      if (tg < this.g) this.g = Math.max(tg, this.g - span / V.attack * dt);
      else if (tg > this.g) this.g = Math.min(tg, this.g + span / V.release * dt);
      this.muteG += ((this.muted ? 0 : 1) - this.muteG) * .14;
      const m = this.g * this.muteG;
      const clamp = v => Math.max(0, Math.min(1, v));
      const A = this.a[this.cur], B = this.a[1 - this.cur];
      const lead = CONFIG.musicEnd - CONFIG.crossfade;
      if (!this.fading && (A.currentTime >= lead || A.ended)) { this.fading = true; B.currentTime = 0; B.volume = 0; B.play().catch(() => {}); }
      if (this.fading) {
        const p = Math.min(1, B.currentTime / CONFIG.crossfade);
        A.volume = clamp(Math.cos(p * Math.PI / 2) * m); B.volume = clamp(Math.sin(p * Math.PI / 2) * m);
        if (p >= 1) { A.pause(); A.currentTime = 0; A.volume = 0; this.cur = 1 - this.cur; this.fading = false; }
      } else { A.volume = clamp(m); B.volume = 0; }
      this.out = Math.max(A.volume, B.volume);
    },
    toggle() { this.muted = !this.muted; toast(this.muted ? 'Música en silencio · M' : 'Música · M'); }
  };
  Music.init();

  /* ---------- navegación ---------- */
  function goScene(i, opt = {}) {
    if (i < 0 || i >= LIST.length) return;
    if (busy) return;
    const old = S;
    stopScene(old);
    subShow(null); hideNext();
    if (!old || CAP || REDUCED || opt.instant) { destroy(old); S = null; enter(i, !CAP); return; }
    busy = true;
    ONDA.play({
      outEl: old.root,
      onCover: () => { destroy(old); S = null; const r = enter(i, false); return r; },
      onDone: () => { busy = false; if (!paused) playScene(); }
    });
  }
  function seekTo(t) {
    if (!S) return;
    S.clock = Math.max(0, Math.min(S.data.dur, t));
    S.ended = S.clock >= S.data.dur; hideNext();
    if (S.audio && voiceOn && S.audioOK) { try { S.audio.currentTime = S.clock; } catch (e) {} }
    if (!S.playing && !S.ended && !paused) playScene();
    render(S.clock, true);
  }
  function beatJump(dir) {
    if (!S) return;
    const bs = S.T.beats, t = S.clock;
    if (dir > 0) { const n = bs.find(b => b.t0 > t + .05); if (n) seekTo(n.t0 - .05); else seekTo(S.data.dur - .05); }
    else {
      let k = -1; bs.forEach((b, j) => { if (b.t0 <= t - .05) k = j; });
      if (k >= 0 && t - bs[k].t0 < 1.2) k--;
      seekTo(k >= 0 ? bs[k].t0 - .05 : 0);
    }
  }
  function unpause() { if (paused) { paused = false; document.body.classList.remove('is-paused'); } }   // navegar siempre reanuda
  function next() { if (!started) return start(); if (busy || cur >= LIST.length - 1) return; unpause(); goScene(cur + 1); }
  function prev() {
    if (!started || busy || !S) return;
    unpause();
    if (S.clock > 2.5 || cur === 0) { seekTo(0); if (!paused) playScene(); }
    else goScene(cur - 1);
  }
  function togglePause() {
    if (!started || !S) return;
    if (S.ended && !paused) { next(); return; }
    paused = !paused;
    document.body.classList.toggle('is-paused', paused);
    if (paused) { if (S.audio) try { S.audio.pause(); } catch (e) {} }
    else if (S.playing) { if (voiceOn && S.audioOK && S.audio) { try { S.audio.currentTime = S.clock; } catch (e) {} S.audio.play().catch(() => {}); } }
    else if (!S.ended) playScene();
  }
  function setVoice(on) {
    voiceOn = on; statusRefresh(); toast(on ? 'Voz · V' : 'Voz apagada · sigue con subtítulos · V');
    if (!S) return;
    if (on) S.audioOK = !!S.audio;   // al volver a encender, se reintenta la voz
    if (!on) { if (S.audio) try { S.audio.pause(); } catch (e) {} }
    else if (S.playing && !paused && S.audio && S.audioOK) { try { S.audio.currentTime = S.clock; } catch (e) {} S.audio.play().catch(() => {}); }
  }
  function setSubs(on) { subsOn = on; document.body.classList.toggle('subs-off', !on); statusRefresh(); toast(on ? 'Subtítulos · S' : 'Sin subtítulos · S'); }
  function isFull() { return !!(document.fullscreenElement || document.webkitFullscreenElement); }
  function setFull(on) {
    const el = document.documentElement;
    if (on && !isFull()) {
      const rq = el.requestFullscreen || el.webkitRequestFullscreen;
      if (!rq) return;
      Promise.resolve(rq.call(el)).then(() => { if (TOUCH && screen.orientation && screen.orientation.lock) return screen.orientation.lock('landscape'); }).catch(() => {});
    } else if (!on && isFull()) { const ex = document.exitFullscreen || document.webkitExitFullscreen; if (ex) Promise.resolve(ex.call(document)).catch(() => {}); }
  }
  ['fullscreenchange', 'webkitfullscreenchange'].forEach(ev => document.addEventListener(ev, () => { setTimeout(fit, 120); menuRefresh(); }));
  function setAuto(on) {
    auto = on; statusRefresh(); toast(on ? 'Modo automático completo · A' : 'Modo por escena · A');
    if (on && S && S.ended) goScene(cur + 1);
  }

  /* ---------- pista "→ siguiente" ---------- */
  const nh = $('#nextHint');
  function showNext() {
    if (cur >= LIST.length - 1) return;
    $('#nextName').textContent = LIST[cur + 1].titulo || '';
    nh.classList.add('on');
    gsap.killTweensOf(nh);
    gsap.fromTo(nh, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .5, delay: .25, ease: 'power2.out' });
    gsap.fromTo(nh.querySelector('.nh-k'), { x: 0 }, { x: 6, duration: .6, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: .8 });
  }
  function hideNext() { nh.classList.remove('on'); gsap.killTweensOf([nh, nh.querySelector('.nh-k')]); gsap.set(nh, { opacity: 0 }); }
  nh.addEventListener('click', e => { e.stopPropagation(); next(); });

  /* ---------- estado, legal, avisos ---------- */
  const statusEl = $('#status');
  function statusRefresh() {
    menuRefresh();
    statusEl.querySelector('[data-k="voz"]').classList.toggle('off', !voiceOn);
    statusEl.querySelector('[data-k="subs"]').classList.toggle('off', !subsOn);
    const m = statusEl.querySelector('[data-k="modo"]');
    m.textContent = auto ? 'AUTOMÁTICO' : 'POR ESCENA'; m.classList.toggle('auto', auto);
  }
  function legalRefresh() { const el = $('#legal'); if (el && window.SLOTS && S) el.textContent = SLOTS.legalFor(S.root); }
  window.SLOTS_UPDATED = () => legalRefresh();
  const toastEl = $('#toast');
  function toast(msg) {
    if (!started) return;
    toastEl.textContent = msg; gsap.killTweensOf(toastEl);
    gsap.fromTo(toastEl, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: .25 });
    gsap.to(toastEl, { opacity: 0, delay: 1.6, duration: .4 });
  }
  const helpEl = $('#help');
  function help(on) { helpEl.classList.toggle('on', on); helpEl.setAttribute('aria-hidden', on ? 'false' : 'true'); }

  /* ---------- pantalla de espera ---------- */
  const waitEl = $('#wait');
  function start() {
    if (started) return; started = true;
    document.body.classList.remove('is-waiting');
    window.FX && FX.setMode('show');
    Music.start();
    if (!CAP) { unlockAudio(); if (TOUCH) setFull(true); }   // en el celular: pantalla completa y horizontal si el navegador lo permite
    if (CAP || REDUCED) { waitEl.style.display = 'none'; enter(0, !CAP); return; }
    busy = true;
    ONDA.play({ covered: true, onCover: () => { waitEl.style.display = 'none'; return enter(0, false); }, onDone: () => { busy = false; playScene(); } });
  }
  waitEl.addEventListener('click', e => { e.stopPropagation(); start(); });

  /* ---------- teclado ---------- */
  document.addEventListener('keydown', e => {
    const k = e.key;
    if (menuOn && (k === ' ' || k === 'Enter' || k.startsWith('Arrow'))) return;   // con el menú abierto, el teclado navega el menú
    if (helpEl.classList.contains('on') && (k === 'Escape' || k === 'h' || k === 'H' || k === '?')) { help(false); return; }
    if (k === ' ' || k === 'Spacebar') { e.preventDefault(); if (!started) start(); else togglePause(); }
    else if (k === 'Enter' && !started) start();
    else if (k === 'ArrowRight' || k === 'PageDown') { e.preventDefault(); next(); }
    else if (k === 'ArrowLeft' || k === 'PageUp') { e.preventDefault(); prev(); }
    else if (k === 'ArrowDown') { e.preventDefault(); if (started && !busy) beatJump(1); }
    else if (k === 'ArrowUp') { e.preventDefault(); if (started && !busy) beatJump(-1); }
    else if (k === 'v' || k === 'V') setVoice(!voiceOn);
    else if (k === 's' || k === 'S') setSubs(!subsOn);
    else if (k === 'a' || k === 'A') setAuto(!auto);
    else if (k === 'm' || k === 'M') { if (started) Music.toggle(); }
    else if (k === 'f' || k === 'F') setFull(!isFull());
    else if (k === 'h' || k === 'H' || k === '?') { menu(false); help(!helpEl.classList.contains('on')); }
    else if (k === 'Escape') { help(false); menu(false); }
    else if (k === 'Home') { if (started) goScene(0); }
    else if (k === 'End') { if (started) goScene(LIST.length - 1); }
  });
  statusEl.addEventListener('click', e => { e.stopPropagation(); menu(true); });
  helpEl.addEventListener('click', e => { e.stopPropagation(); help(false); });

  /* ---------- menú ⋮ (controles táctiles) ---------- */
  const menuEl = $('#menu'), mbtn = $('#mbtn'), menuSc = $('#menuSc');
  let menuOn = false;
  LIST.forEach((e, i) => {
    const li = document.createElement('li');
    li.innerHTML = `<button type="button" data-go="${i}"><b>${i + 1}</b><span></span></button>`;
    li.querySelector('span').textContent = e.titulo || e.id;
    menuSc.appendChild(li);
  });
  function menuRefresh() {
    if (!menuEl) return;
    const on = { voz: voiceOn, subs: subsOn, auto, music: !Music.muted, full: isFull(), rot: rotPref };
    menuEl.querySelectorAll('.tg').forEach(b => b.setAttribute('aria-checked', on[b.dataset.tg] ? 'true' : 'false'));
    const fs = menuEl.querySelector('[data-tg="full"]');
    if (fs) fs.hidden = !(document.fullscreenEnabled || document.webkitFullscreenEnabled);
    menuSc.querySelectorAll('button').forEach(b => b.classList.toggle('cur', +b.dataset.go === cur));
  }
  function menu(on) {
    if (on === menuOn) return;
    menuOn = on;
    menuEl.classList.toggle('on', on); menuEl.setAttribute('aria-hidden', on ? 'false' : 'true');
    mbtn.setAttribute('aria-expanded', on ? 'true' : 'false');
    document.body.classList.toggle('menu-on', on);
    if (on) { menuRefresh(); help(false); setTimeout(() => { const f = menuEl.querySelector('.menu-x'); if (f) f.focus({ preventScroll: true }); }, 60); }
    else if (document.activeElement && menuEl.contains(document.activeElement)) mbtn.focus({ preventScroll: true });
  }
  mbtn.addEventListener('click', e => { e.stopPropagation(); menu(!menuOn); });
  menuEl.addEventListener('click', e => {
    e.stopPropagation();
    if (e.target === menuEl) return menu(false);                       // tocar fuera de la tarjeta cierra
    const b = e.target.closest('button'); if (!b) return;
    const tg = b.dataset.tg, act = b.dataset.act, go = b.dataset.go;
    if (tg === 'voz') setVoice(!voiceOn);
    else if (tg === 'subs') setSubs(!subsOn);
    else if (tg === 'auto') setAuto(!auto);
    else if (tg === 'music') { if (started) Music.toggle(); else Music.muted = !Music.muted; }
    else if (tg === 'full') setFull(!isFull());
    else if (tg === 'rot') { rotPref = !rotPref; store.set('huggies-girar', rotPref ? '1' : '0'); fit(); }
    else if (act === 'close') menu(false);
    else if (act === 'help') { menu(false); help(true); }
    else if (act === 'pause') { if (!started) { menu(false); start(); } else togglePause(); }
    else if (act === 'next') { next(); menu(false); }
    else if (act === 'prev') { prev(); menu(false); }
    else if (go != null) { menu(false); if (!started) start(); if (+go !== cur && !busy) { unpause(); goScene(+go); } }
    menuRefresh();
  });

  /* ---------- toque y deslizamiento sobre el escenario ---------- */
  //   toque: pausa / sigue (al final de una escena, pasa a la siguiente) · deslizar ← → : escena siguiente / anterior
  let tp = null;
  stage.addEventListener('pointerdown', e => {
    if (!e.isPrimary || e.button > 0) return;
    tp = { x: e.clientX, y: e.clientY, t: performance.now() };
  });
  stage.addEventListener('pointerup', e => {
    if (!tp || !e.isPrimary) return;
    const p = tp; tp = null;
    if (e.target.closest('#wait, #help, .next-hint, .status')) return;
    let dx = e.clientX - p.x, dy = e.clientY - p.y;
    if (rotated) { const t = dx; dx = dy; dy = -t; }                 // de la pantalla física al marco del show
    const ad = Math.abs(dx), dt = performance.now() - p.t;
    if (!started || busy) return;
    if (ad > 60 && ad > Math.abs(dy) * 1.4 && dt < 900) { if (dx < 0) next(); else prev(); return; }
    if (ad < 12 && Math.abs(dy) < 12 && dt < 600) togglePause();
  });
  stage.addEventListener('pointercancel', () => { tp = null; });

  /* ---------- el botón ⋮ se esconde si el mouse está quieto (no estorba al proyectar) ---------- */
  let idleT = 0;
  const wake = () => { document.body.classList.remove('ui-idle'); clearTimeout(idleT); idleT = setTimeout(() => document.body.classList.add('ui-idle'), 2600); };
  ['mousemove', 'keydown', 'pointerdown'].forEach(ev => document.addEventListener(ev, wake, { passive: true }));
  wake();

  /* ---------- si el celular se bloquea o cambias de app, el show se pausa ---------- */
  document.addEventListener('visibilitychange', () => { if (document.hidden && started && S && S.playing && !paused) togglePause(); });

  /* ---------- API (capturas y pruebas) ---------- */
  window.DECK = {
    get total() { return LIST.length; },
    goTo(i) { if (!started) start(); busy = false; goScene(i, { instant: true }); },
    state() {
      return { escena: cur, id: S && S.data.id, t: S ? +S.clock.toFixed(3) : 0, dur: S ? S.data.dur : 0, beat: S ? beatAt(S.clock) : -1,
        voz: voiceOn, subs: subsOn, modo: auto ? 'auto' : 'escena', playing: !!(S && S.playing), paused, ended: !!(S && S.ended), busy,
        sub: subCur ? subCur.text : '', cd: lastSec, recap: cdEl.classList.contains('is-recap') };
    },
    // deja la escena i exactamente en el estado del tiempo t (en ?capture=1 queda en pausa)
    seek(i, t) {
      if (!started) start();
      busy = false;
      if (cur !== i || !S) { stopScene(S); destroy(S); S = null; enter(i, false); }
      S.playing = false; S.ended = false; S.clock = Math.max(0, Math.min(S.data.dur, t));
      render(S.clock, true);
      const vids = S.T.videos.map(v => v.el).filter(Boolean);
      return Promise.all(vids.map(el => new Promise(res => {
        if (el.readyState >= 2 && !el.seeking) return res();
        const done = () => res(); el.addEventListener('seeked', done, { once: true }); el.addEventListener('loadeddata', done, { once: true });
        setTimeout(done, 2500);
      }))).then(() => { render(S.clock, true); return document.fonts ? document.fonts.ready : null; }).then(() => true);
    },
    info() { return { total: TOTAL_DUR, escenas: LIST.map((e, i) => ({ i, id: e.id, titulo: e.titulo, dur: e.dur, prev: PREV[i], beats: (e.beats || []).map(b => ({ i: b.i, t0: b.t0, t1: b.t1 })) })) }; },
    mix() { return { music: +Music.out.toFixed(3), gain: +Music.g.toFixed(3), target: Music.target, speaking: Music.speaking, voice: S && S.audio ? S.audio.volume : 0, voicePlaying: !!(S && S.audio && !S.audio.paused), voiceTime: S && S.audio ? +S.audio.currentTime.toFixed(2) : 0, clock: S ? +S.clock.toFixed(2) : 0 }; },
    next, prev, togglePause, setVoice, setSubs, setAuto, beatJump, menu, config: CONFIG
  };

  /* ---------- arranque ---------- */
  function boot() {
    window.FX && FX.init();
    window.FX && FX.setMode('wait');
    window.SLOTS && SLOTS.init();
    statusRefresh();
    if (!subsOn) document.body.classList.add('subs-off');
    requestAnimationFrame(loop);
    if (CAP) { start(); const qs = Q.get('s'); if (qs) DECK.seek(+qs - 1, +(Q.get('t') || 0)); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
