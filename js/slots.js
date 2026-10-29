/* =====================================================================
   ESPACIOS DE IMAGEN (IA) + RESPALDOS
   Cada <figure data-slot="id"> toma file/ratio/fallback de assets/img-ia/manifest.js.
   - Al abrir, se prueba cada assets/img-ia/<file> con new Image() (sin fetch: funciona en file://).
   - Si existe: se usa, con un sello "IA" y su crédito en la línea legal.
   - Si no: queda el respaldo (fotograma real o ilustración SVG) con su crédito.
   Las escenas se arman al vuelo: SLOTS.mount(raíz) llena los espacios de esa escena.
   ===================================================================== */
(function () {
  'use strict';
  const IA_DIR = 'assets/img-ia/';
  const LEGAL_FRAMES = 'Fotogramas y clips: Huggies® × McCann (2026) · uso académico';
  const LEGAL_IA = 'Sello «IA»: imagen generada con IA · ilustrativa';
  const LEGAL_SVG = 'Ilustraciones propias';

  /* ---------- caritas de bebé en línea dorada (Ekman) ---------- */
  const S = '#8F6F33', S2 = '#6F5122';
  const base = (extra, cheeks = '#E3B27C', cheekOp = .42) => `
    <svg class="face" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="98" fill="#FFFDF8"/>
      <g class="f-bob">
      <path d="M34 98c-14 0-16 26 2 28M166 98c14 0 16 26-2 28" fill="none" stroke="${S}" stroke-width="4.5" stroke-linecap="round"/>
      <circle cx="100" cy="110" r="68" fill="#FDF8EE" stroke="${S}" stroke-width="4.5"/>
      <path d="M100 43c-6-14 8-22 15-14 6 7-2 16-8 11" fill="none" stroke="${S}" stroke-width="4.5" stroke-linecap="round"/>
      <ellipse cx="60" cy="136" rx="15" ry="10" fill="${cheeks}" opacity="${cheekOp}"/>
      <ellipse cx="140" cy="136" rx="15" ry="10" fill="${cheeks}" opacity="${cheekOp}"/>
      <path d="M95 124q5 5 10 0" fill="none" stroke="${S}" stroke-width="3.5" stroke-linecap="round"/>
      <g fill="none" stroke="${S}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round">${extra}</g>
      </g>
    </svg>`;
  const FACES = {
    alegria: base(`
      <path d="M58 82q15-10 30 0M112 82q15-10 30 0"/>
      <path d="M60 108q14-16 28 0M112 108q14-16 28 0"/>
      <path d="M66 134q34 46 68 0z" fill="${S2}" stroke-width="4"/>
      <path d="M84 156q16 12 32 0q-16-10-32 0z" fill="#CD1618" stroke="none" opacity=".7"/>`),
    tristeza: base(`
      <path d="M58 90q14-2 30-14M112 76q16 12 30 14"/>
      <path d="M62 106q12 10 24 0M114 106q12 10 24 0"/>
      <circle cx="74" cy="110" r="3.5" fill="${S}" stroke="none"/><circle cx="126" cy="110" r="3.5" fill="${S}" stroke="none"/>
      <path d="M80 152q20-16 40 0"/>
      <path d="M86 118q-6 10-2 15a5 5 0 0 0 9-2q0-5-7-13z" fill="#FFFFFF" stroke-width="3"/>`),
    furia: base(`
      <path d="M56 78l34 16M144 78l-34 16" stroke-width="6.5"/>
      <path d="M62 106q12-8 26 2M112 108q14-10 26-2"/>
      <circle cx="76" cy="107" r="4" fill="${S}" stroke="none"/><circle cx="124" cy="107" r="4" fill="${S}" stroke="none"/>
      <path d="M76 140h48q5 8 0 16H76q-5-8 0-16z" fill="#FFFFFF"/>
      <path d="M76 148h48M88 140v16M100 140v16M112 140v16" stroke-width="2.6"/>
      <path d="M40 58q-6-8 0-14M160 58q6-8 0-14" stroke-width="3.5" opacity=".7"/>`, '#CD1618', .32),
    temor: base(`
      <path d="M58 82q12-14 30-6M112 76q18-8 30 6"/>
      <circle cx="74" cy="106" r="13" fill="#FFFFFF"/><circle cx="126" cy="106" r="13" fill="#FFFFFF"/>
      <circle cx="81" cy="105" r="4.5" fill="${S}" stroke="none"/><circle cx="133" cy="105" r="4.5" fill="${S}" stroke="none"/>
      <path d="M74 146q26-12 52 0q-26 14-52 0z" fill="${S2}" stroke-width="3.5"/>
      <path d="M156 64q-6 9-2 13a5 5 0 0 0 9-2q0-4-7-11z" fill="#FFFFFF" stroke-width="3"/>`),
    desagrado: base(`
      <path d="M58 88q14 8 30 2M112 86q14-6 30-10"/>
      <path d="M62 106q12-8 24 0M114 104q12-8 24-2"/>
      <path d="M90 114q10-6 20 0M92 120q8-4 16 0" stroke-width="3"/>
      <path d="M74 144q14-14 26-4q12-10 28 4q-26 10-54 0z" fill="${S2}" stroke-width="3.5"/>`, '#B9B072', .35),
    sorpresa: base(`
      <path d="M56 76q18-18 34-4M110 72q16-14 34 4"/>
      <circle cx="74" cy="106" r="13" fill="#FFFFFF"/><circle cx="126" cy="106" r="13" fill="#FFFFFF"/>
      <circle cx="74" cy="107" r="5.5" fill="${S}" stroke="none"/><circle cx="126" cy="107" r="5.5" fill="${S}" stroke="none"/>
      <ellipse cx="100" cy="150" rx="13" ry="17" fill="${S2}"/>`)
  };

  // ilustraciones propias usadas como respaldo (MEDIO-3: "solo hay un pañal" en bandeja de plata)
  const ILLU = {
    bandeja: `<svg class="face" viewBox="0 0 360 360" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="180" cy="300" rx="150" ry="20" fill="rgba(42,33,24,.12)"/>
      <use href="#tray" x="0" y="262" width="360" height="60"/>
      <g style="color:#8F6F33"><use href="#diaper" x="70" y="96" width="220" height="187"/></g>
      <path d="M130 140 q50 -14 100 0" fill="none" stroke="#D9B56A" stroke-width="5" stroke-linecap="round" opacity=".8"/>
      <use href="#spark" x="252" y="70" width="40" height="40" style="color:#D9B56A"/><use href="#spark" x="84" y="104" width="26" height="26" style="color:#F2D995"/>
    </svg>`
  };
  const byId = id => (window.IMG_SLOTS || []).find(s => s.id === id);
  const ratio = r => { const [a, b] = String(r || '1:1').split(':').map(Number); return a + ' / ' + b; };
  const esc = s => String(s || '').replace(/"/g, '&quot;');
  const state = {};   // id -> 'ia' | 'fallback' | undefined (probando)

  function paint(fig) {
    const s = byId(fig.dataset.slot); if (!s) return;
    if (!fig.style.aspectRatio && !fig.dataset.free) fig.style.aspectRatio = ratio(s.ratio);
    const want = state[s.id] === 'ia' ? 'ia' : 'fb';
    if (fig.dataset.painted === want) return;
    fig.dataset.painted = want;
    fig.classList.remove('is-ia', 'is-fb', 'is-svg');
    if (want === 'ia') {
      const cap = s.kind === 'face' ? 'IA' : 'IA · ilustrativa';
      fig.innerHTML = `<img src="${IA_DIR + s.file}" alt="${esc(s.desc)}" decoding="async"><figcaption>${cap}</figcaption>`;
      fig.classList.add('is-ia');
      return;
    }
    const fb = fig.dataset.fb || s.fallback || '';
    if (fb.startsWith('svg:')) {
      fig.innerHTML = FACES[fb.slice(4)] || ILLU[fb.slice(4)] || '';
      fig.classList.add('is-svg');
    } else {
      fig.innerHTML = `<img src="${fb}" alt="${esc(s.desc)}" decoding="async">`;
      fig.classList.add('is-fb');
    }
  }

  // Línea legal de una escena: lo que hay en ella (respaldos, imágenes IA, ilustraciones,
  // y con data-legal="frames" en la escena, fotogramas o clips fijos).
  function legalFor(root) {
    if (!root) return '';
    let ia = 0, fb = 0, svg = 0;
    root.querySelectorAll('figure[data-slot]').forEach(f => {
      if (f.classList.contains('is-ia')) ia++; else if (f.classList.contains('is-svg')) svg++; else fb++;
    });
    if (root.dataset.legal) fb++;
    const parts = [];
    if (fb) parts.push(LEGAL_FRAMES);
    if (ia) parts.push(LEGAL_IA);
    if (svg) parts.push(LEGAL_SVG);
    return parts.join('  ·  ');
  }

  window.SLOTS = {
    FACES, legalFor, state,
    init() {
      (window.IMG_SLOTS || []).forEach(s => {
        if (s.usado === false) return;
        const probe = new Image();
        probe.onload = () => {
          state[s.id] = 'ia';
          document.querySelectorAll(`figure[data-slot="${s.id}"]`).forEach(paint);
          window.SLOTS_UPDATED && window.SLOTS_UPDATED(s.id);
        };
        probe.onerror = () => { state[s.id] = 'fallback'; };
        probe.src = IA_DIR + s.file + (location.search.includes('nocache') ? '?v=' + Date.now() : '');
      });
    },
    mount(root) { root.querySelectorAll('figure[data-slot]').forEach(paint); }
  };
})();
