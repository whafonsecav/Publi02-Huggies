/* =====================================================================
   KIT · herramientas para las escenas
   - KIT.timing(datos): lee NARRACION (beats, palabras, subtítulos) y entrega tiempos:
       T.b(i) inicio del beat i · T.e(i) fin · T.w(i, 'palabra') inicio de una palabra hablada
       T.after(i, '?') primera palabra después de un signo · T.words(i) todas las palabras
     Si un beat no trae palabras (w), las estima repartiendo el subtítulo en su duración.
     NUNCA hay tiempos fijos de la voz en el código: todo sale de aquí.
   - KIT.anim(tl, T): macros de animación que se insertan en la línea de tiempo de la escena
     (todas con immediateRender:false, para que la escena pueda "saltar" a cualquier tiempo).
   ===================================================================== */
(function () {
  'use strict';
  const norm = s => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[«»"“”¿?¡!.,;:…()]/g, ' ').replace(/\s+/g, ' ').trim();

  function rng(seed) {   // mulberry32: aleatorio repetible (las capturas salen iguales)
    let a = seed >>> 0;
    return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  }

  function timing(data) {
    const beats = (data.beats || []).slice().sort((a, b) => a.t0 - b.t0);
    const byI = {}; beats.forEach(b => { byI[b.i] = b; });
    const cache = {};
    function beat(i) {
      if (byI[i]) return byI[i];
      // beat ausente: se ubica entre sus vecinos
      const prev = beats.filter(b => b.i < i).pop(), next = beats.find(b => b.i > i);
      const t0 = prev ? prev.t1 + .3 : 0, t1 = next ? Math.max(t0 + .5, next.t0 - .2) : t0 + 2;
      return { i, t0, t1, sub: '', w: [] };
    }
    function words(i) {
      if (cache[i]) return cache[i];
      const b = beat(i);
      let out;
      if (b.w && b.w.length) out = b.w.map(([a, c, t]) => ({ t0: a, t1: c, text: t, n: norm(t) }));
      else {
        // estimación: el subtítulo repartido por letras entre t0 y t1
        const ws = String(b.sub || '').split(/\s+/).filter(Boolean);
        const tot = ws.reduce((s, w) => s + w.length + 2, 0) || 1;
        let acc = 0; const span = Math.max(.4, (b.t1 - b.t0) - .1);
        out = ws.map(w => { const a = b.t0 + .1 + span * acc / tot; acc += w.length + 2; return { t0: a, t1: b.t0 + .1 + span * acc / tot, text: w, n: norm(w), est: true }; });
      }
      cache[i] = out; return out;
    }
    function find(i, pats, nth) {
      const ws = words(i);
      const list = Array.isArray(pats) ? pats : [pats];
      for (const p of list) {
        const toks = norm(p).split(' ').filter(Boolean);
        if (!toks.length) continue;
        let seen = 0;
        for (let k = 0; k <= ws.length - toks.length; k++) {
          let ok = true;
          for (let j = 0; j < toks.length; j++) {
            const wn = ws[k + j].n.split(' ');
            if (!wn.some(x => x.startsWith(toks[j]))) { ok = false; break; }
          }
          if (ok) { if (seen === (nth || 0)) return k; seen++; }
        }
      }
      return -1;
    }
    const T = {
      id: data.id, dur: data.dur, data, beats,
      beat, words,
      b: i => beat(i).t0,
      e: i => beat(i).t1,
      // inicio de la palabra (o de la primera que coincida con alguna de las variantes)
      w(i, pats, nth, frac) {
        const k = find(i, pats, nth);
        const b = beat(i), ws = words(i);
        if (k < 0) {
          if (window.DECK_DEBUG) console.warn('palabra no encontrada', data.id, i, pats);
          return b.t0 + (frac == null ? .5 : frac) * (b.t1 - b.t0);
        }
        return ws[k].t0;
      },
      wEnd(i, pats, nth) { const k = find(i, pats, nth); const ws = words(i); return k < 0 ? T.e(i) : ws[k].t1; },
      // primera palabra después de la que contiene el signo ch ('?' separa pregunta y respuesta)
      after(i, ch, nth) {
        const b = beat(i);
        if (b.w && b.w.length) {
          let seen = 0;
          for (let k = 0; k < b.w.length - 1; k++) if (b.w[k][2].includes(ch)) { if (seen === (nth || 0)) return b.w[k + 1][0]; seen++; }
        }
        const sub = String(b.sub || ''), pos = sub.indexOf(ch);
        if (pos < 0) return b.t0 + .5 * (b.t1 - b.t0);
        return b.t0 + (pos + 1) / sub.length * (b.t1 - b.t0);
      },
      // reparte las palabras de un texto visible (n palabras) sobre las palabras habladas del beat
      spread(i, n, from, to) {
        const ws = words(i);
        const a = from == null ? 0 : from, z = to == null ? ws.length : to;
        const seg = ws.slice(a, z); const out = [];
        for (let k = 0; k < n; k++) { const w = seg[Math.min(seg.length - 1, Math.round(k * (seg.length) / n))]; out.push(w ? w.t0 : T.b(i)); }
        return out;
      },
      videos: [],
      video(el, t0, t1, o) { T.videos.push(Object.assign({ el, t0, t1, from: 0, loop: false, rate: 1 }, o || {})); }
    };
    return T;
  }

  /* ---------- macros de animación ---------- */
  function anim(tl, T, root) {
    const IR = { immediateRender: false };
    const A = {
      set(el, vars, t) { tl.set(el, vars, t); return A; },
      show(el, t) { tl.set(el, { autoAlpha: 1 }, t); return A; },
      hide(el, t) { tl.set(el, { autoAlpha: 0 }, t); return A; },
      fade(el, t, d = .6, to = 1) { tl.fromTo(el, { autoAlpha: 0 }, Object.assign({ autoAlpha: to, duration: d, ease: 'power1.out' }, IR), t); return A; },
      rise(el, t, o = {}) {
        tl.fromTo(el, { autoAlpha: 0, y: o.y == null ? 46 : o.y }, Object.assign({ autoAlpha: 1, y: 0, duration: o.d || .8, ease: o.ease || 'expo.out' }, IR), t); return A;
      },
      pop(el, t, o = {}) {
        tl.fromTo(el, { autoAlpha: 0, scale: o.from == null ? .5 : o.from, rotation: o.rot || 0 }, Object.assign({ autoAlpha: 1, scale: 1, rotation: o.toRot || 0, duration: o.d || .7, ease: o.ease || 'back.out(1.8)' }, IR), t); return A;
      },
      // golpe: entra grande y se asienta con un temblor de cámara
      slam(el, t, o = {}) {
        tl.fromTo(el, { autoAlpha: 0, scale: o.from || 2.1, filter: 'blur(14px)' }, Object.assign({ autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: o.d || .46, ease: 'expo.out' }, IR), t);
        if (o.shake !== false) A.shake(t + .1, o.amp || 10);
        return A;
      },
      // corte duro del teaser: aparece de golpe con un "punch" de zoom
      cut(el, t, o = {}) {
        tl.set(el, { autoAlpha: 1 }, t);
        tl.fromTo(el, { scale: o.from || 1.12 }, Object.assign({ scale: 1, duration: o.d || .7, ease: 'expo.out' }, IR), t);
        return A;
      },
      out(el, t, o = {}) {
        const v = { autoAlpha: 0, duration: o.d || .35, ease: o.ease || 'power2.in' };
        if (o.y !== false) v.y = o.y == null ? '-=24' : o.y;
        if (o.x != null) v.x = o.x;
        if (o.scale != null) v.scale = o.scale;
        if (o.blur) v.filter = 'blur(10px)';
        tl.to(el, v, t); return A;
      },
      // tracking del teaser: las letras llegan separadas y se cierran
      track(el, t, o = {}) {
        if (!el._ls) el._ls = getComputedStyle(el).letterSpacing;
        const fin = el._ls === 'normal' ? '0px' : el._ls;
        tl.fromTo(el, { autoAlpha: 0, letterSpacing: o.from || '.55em', filter: 'blur(10px)' }, Object.assign({ autoAlpha: 1, letterSpacing: fin, filter: 'blur(0px)', duration: o.d || 1.1, ease: 'expo.out' }, IR), t);
        return A;
      },
      // letras que caen una por una (SplitText)
      chars(el, t, o = {}) {
        const st = el._st || (el._st = new SplitText(el, { type: 'chars', charsClass: 'ch' }));
        tl.set(el, { autoAlpha: 1 }, t);
        tl.fromTo(st.chars, { autoAlpha: 0, yPercent: o.y == null ? 70 : o.y, rotationX: o.rx == null ? -80 : o.rx, scale: o.s || 1 },
          Object.assign({ autoAlpha: 1, yPercent: 0, rotationX: 0, scale: 1, duration: o.d || .6, ease: o.ease || 'back.out(1.6)', stagger: o.stagger == null ? .028 : o.stagger }, IR), t);
        return A;
      },
      // palabras que aparecen cada una en su tiempo (times[k])
      wordsAt(els, times, o = {}) {
        els.forEach((w, k) => tl.fromTo(w, { autoAlpha: 0, y: o.y == null ? 36 : o.y, scale: o.s || .92, filter: o.blur === false ? 'none' : 'blur(6px)' },
          Object.assign({ autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: o.d || .42, ease: o.ease || 'expo.out' }, IR), times[k]));
        return A;
      },
      count(el, t, d, from, to, fmt, o = {}) {
        const box = { v: from };
        const f = fmt || (v => String(Math.round(v)));
        el.textContent = f(from);
        tl.fromTo(box, { v: from }, Object.assign({ v: to, duration: d, ease: o.ease || 'power3.out', onUpdate: () => { el.textContent = f(box.v); } }, IR), t);
        return A;
      },
      // odómetro de rodillos (v4.1, MEDIO-11): cada dígito es una columna que gira hasta su valor
      odo(el, t, d, text, o = {}) {
        const cyc = o.cycles == null ? 2 : o.cycles;
        el.innerHTML = String(text).split('').map(ch => {
          if (!/\d/.test(ch)) return `<span class="odo-s">${ch}</span>`;
          const seq = []; for (let c = 0; c < cyc; c++) for (let j = 0; j < 10; j++) seq.push(j);
          for (let j = 0; j <= +ch; j++) seq.push(j);
          return `<span class="odo"><span class="odo-c">${seq.map(v => `<b>${v}</b>`).join('')}</span></span>`;
        }).join('');
        el.querySelectorAll('.odo-c').forEach((c, k) => {
          const N = c.children.length;
          const dd = d + k * (o.step == null ? .14 : o.step);
          tl.fromTo(c, { yPercent: 0 }, { yPercent: -100 * (N - 1) / N, duration: dd, ease: o.ease || 'power3.out', immediateRender: false }, t);
          // desenfoque de movimiento (v4.2, N-3): el rodillo se lee como giro, no como dígitos partidos
          tl.fromTo(c, { filter: 'blur(7px)' }, { filter: 'blur(0px)', duration: dd * .92, ease: 'power3.in', immediateRender: false }, t);
        });
        return A;
      },
      draw(el, t, d = .8, o = {}) {
        tl.set(el, { drawSVG: o.from || '0% 0%' }, 0);
        tl.fromTo(el, { drawSVG: o.from || '0% 0%', autoAlpha: 1 }, Object.assign({ drawSVG: o.to || '0% 100%', duration: d, ease: o.ease || 'power2.inOut' }, IR), t); return A;
      },
      // tachón rojo (el svg ya está dentro del .strk)
      strike(el, t, d = .4) {
        const sv = el.querySelector('svg');
        if (sv) tl.fromTo(sv, { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: d, ease: 'power3.out', immediateRender: false }, t);
        return A;
      },
      // barra de censura + globito "shhh"
      censor(el, t) {
        const bar = el.querySelector('.bar'), shh = el.querySelector('.shh');
        if (bar) tl.fromTo(bar, { scaleX: 0 }, Object.assign({ scaleX: 1, duration: .4, ease: 'power4.inOut' }, IR), t);
        if (shh) tl.fromTo(shh, { scale: 0, rotation: -20 }, Object.assign({ scale: 1, rotation: -8, duration: .45, ease: 'back.out(2.6)' }, IR), t + .22);
        return A;
      },
      stamp(el, t, o = {}) {
        tl.fromTo(el, { autoAlpha: 0, scale: 2.6, rotation: (o.rot || -8) - 14 }, Object.assign({ autoAlpha: 1, scale: 1, rotation: o.rot || -8, duration: .34, ease: 'power4.in' }, IR), t);
        tl.fromTo(el, { scale: 1 }, Object.assign({ scale: 1.06, duration: .12, yoyo: true, repeat: 1, ease: 'power1.out' }, IR), t + .34);
        A.shake(t + .32, o.amp || 12);
        return A;
      },
      shake(t, amp = 10) {
        const cam = root.querySelector('.cam'); if (!cam) return A;
        tl.fromTo(cam, { x: amp, y: -amp * .5 }, Object.assign({ x: 0, y: 0, duration: .55, ease: 'elastic.out(1.2,.28)' }, IR), t);
        return A;
      },
      flash(t, o = {}) {
        let f = root.querySelector('.flash');
        if (!f) { f = document.createElement('div'); f.className = 'flash'; root.appendChild(f); }
        tl.fromTo(f, { opacity: o.a || .85 }, Object.assign({ opacity: 0, duration: o.d || .35, ease: 'power2.out' }, IR), t);
        return A;
      },
      // destellos dorados alrededor de (x, y)
      sparkle(layer, x, y, t, o = {}) {
        const R = rng(Math.round(x * 7 + y * 13 + t * 100));
        const n = o.n || 14;
        for (let k = 0; k < n; k++) {
          const s = document.createElement('i'); s.className = 'spk o0';
          s.innerHTML = '<svg><use href="#spark"/></svg>';
          const sz = (o.size || 34) * (.5 + R());
          s.style.cssText = `left:${x}px;top:${y}px;width:${sz}px;height:${sz}px;margin:${-sz / 2}px 0 0 ${-sz / 2}px;color:${o.color || (R() < .5 ? '#D9B56A' : '#F2D995')}`;
          layer.appendChild(s);
          const ang = R() * 6.283, dist = (o.r || 220) * (.35 + .65 * R());
          const tt = t + R() * .18;
          tl.fromTo(s, { autoAlpha: 0, x: 0, y: 0, scale: .2, rotation: 0 },
            Object.assign({ autoAlpha: 1, x: Math.cos(ang) * dist * .55, y: Math.sin(ang) * dist * .55, scale: 1, rotation: 90, duration: .35, ease: 'power2.out' }, IR), tt)
            .to(s, { autoAlpha: 0, x: Math.cos(ang) * dist, y: Math.sin(ang) * dist - 30, scale: .3, rotation: 180, duration: .7, ease: 'power1.in' }, tt + .35);
        }
        return A;
      },
      // Ken Burns suave entre t0 y t1
      kb(el, t0, t1, o = {}) {
        tl.fromTo(el, { scale: o.from || 1, x: o.x0 || 0, y: o.y0 || 0 }, Object.assign({ scale: o.to || 1.08, x: o.x1 || 0, y: o.y1 || 0, duration: Math.max(.1, t1 - t0), ease: 'none' }, IR), t0); return A;
      },
      // oscilación continua (determinista) entre t0 y t1
      float(el, t0, t1, o = {}) {
        const per = o.per || 3, n = Math.max(1, Math.floor((t1 - t0) / per));
        tl.fromTo(el, { y: 0, rotation: 0 }, Object.assign({ y: o.y == null ? -10 : o.y, rotation: o.rot || 0, duration: per / 2, ease: 'sine.inOut', yoyo: true, repeat: n * 2 - 1 }, IR), t0);
        return A;
      }
    };
    return A;
  }

  /* ---------- pequeños generadores de marcado ---------- */
  const M = {
    // tachón a mano (zigzag rojo) que se dibuja encima de una palabra
    strike(html, cls = '') {
      return `<span class="strk ${cls}">${html}<svg viewBox="0 0 100 40" preserveAspectRatio="none"><path d="M2 24 C 20 18, 40 28, 60 20 S 92 22, 98 16" vector-effect="non-scaling-stroke"/></svg></span>`;
    },
    censor(visible, color = '') {
      return `<span class="cen">${visible}<i class="bar ${color}"></i><i class="shh">shhh</i></span>`;
    },
    words(text, cls = 'wd') {   // envuelve cada palabra en un span
      return String(text).split(/(\s+)/).map(w => /\s+/.test(w) ? w : `<span class="${cls}" style="display:inline-block">${w}</span>`).join('');
    },
    fmtEs: v => String(Math.round(v)).replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  };

  /* ---------- estado inicial (v4.1, causa raíz de CRÍTICO-1 / ALTO-4) ----------
     Las animaciones usan immediateRender:false para poder "saltar" en el tiempo, pero entonces
     un elemento se ve tal cual ANTES de su primera animación y luego "se apaga y vuelve".
     prime() busca, para cada elemento, su PRIMERA animación en la línea de tiempo; si es un fromTo,
     aplica su estado "desde" en t = 0 (ya y también como tl.set en 0, para cuando se retrocede).
     Las opacidades "desde" mayores que 0 no se aplican (son destellos que se apagan, no entradas). */
  function prime(tl) {
    const first = new Map();
    tl.getChildren(false, true, false).forEach(tw => {
      const st = tw.startTime();
      tw.targets().forEach(tg => {
        if (!(tg instanceof Element)) return;
        const f = first.get(tg);
        if (!f || st < f.st - 1e-6) first.set(tg, { st, tw });
      });
    });
    // los "set" en t = 0 se aplican YA: con tl.time(0) GSAP no los pinta hasta que el reloj avanza,
    // y la onda descubre la escena justo en t = 0 (lo que debe estar visible tiene que estarlo)
    tl.getChildren(false, true, false).forEach(tw => {
      if (tw.startTime() > 1e-6 || tw.duration() > 0) return;
      const v = {};
      Object.keys(tw.vars || {}).forEach(key => { if (!/^(on|callback|data|duration|delay|ease|immediateRender|lazy|overwrite|startAt|stagger|id|runBackwards|parent|repeat|yoyo|paused|reversed)$/.test(key) && !/^on/.test(key)) v[key] = tw.vars[key]; });
      const tg = tw.targets().filter(x => x instanceof Element || (x && typeof x === 'object'));
      if (tg.length && Object.keys(v).length) gsap.set(tg, v);
    });
    first.forEach(({ tw }, tg) => {
      const sa = tw.vars && tw.vars.startAt;
      if (!sa) return;
      const v = {};
      Object.keys(sa).forEach(key => { if (key !== 'immediateRender' && key !== 'overwrite' && key !== 'lazy') v[key] = sa[key]; });
      if ('autoAlpha' in v && +v.autoAlpha > 0) delete v.autoAlpha;
      if ('opacity' in v && +v.opacity > 0) delete v.opacity;
      if (!Object.keys(v).length) return;
      gsap.set(tg, v);
      tl.set(tg, v, 0);
    });
  }

  window.KIT = { timing, anim, rng, norm, M, prime };
})();
