/* Procedural watercolour-style bouquet, drawn as inline SVG. No images, no network. */
(function () {
  function rng(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function hex(h) { h = h.replace('#', ''); return [0, 2, 4].map(i => parseInt(h.substr(i, 2), 16)); }
  function mix(c, t, amt) {
    const a = hex(c), b = hex(t);
    return '#' + a.map((v, i) => Math.round(v + (b[i] - v) * amt).toString(16).padStart(2, '0')).join('');
  }
  const dark = (c, a) => mix(c, '#3a1020', a);
  const light = (c, a) => mix(c, '#ffffff', a);
  const f = n => Math.round(n * 100) / 100;

  const STYLES = {
    autumn: {
      label: 'Autumn cosmos', paper: ['#d9b98e', '#c49a68'],
      ribbon: '#6f9a8a', leaves: ['#6d8f55', '#58783f', '#7ea060'],
      mix: [['cosmos', '#f2c230', 1.1], ['daisy', '#fbf7ee', 1], ['cosmos', '#d9588f', 1.05], ['cosmos', '#c0203a', 1.05],
        ['cosmos', '#e8772e', 1.1], ['daisy', '#fbf7ee', 1], ['cosmos', '#d9588f', 1], ['cosmos', '#e8772e', 1],
        ['cosmos', '#c0203a', 1], ['daisy', '#fbf7ee', .95], ['cosmos', '#f3a6bd', 1], ['cosmos', '#e8772e', .95],
        ['daisy', '#fbf7ee', .9], ['cosmos', '#d9588f', .95]]
    },
    blush: {
      label: 'Blush roses', paper: ['#e6cdb4', '#cfae8f'],
      ribbon: '#c98a98', leaves: ['#7f9d7b', '#6b8b6c', '#93ae8d'],
      mix: [['rose', '#e9a1ad', 1.15], ['rose', '#f6cfc9', 1.05], ['rose', '#d9788c', 1.1], ['daisy', '#fffaf2', .9],
        ['rose', '#f1b8bd', 1.05], ['rose', '#fbe3da', 1], ['rose', '#d9788c', 1], ['daisy', '#fffaf2', .9],
        ['rose', '#e9a1ad', .95], ['rose', '#f6cfc9', .95], ['daisy', '#fffaf2', .85], ['rose', '#f1b8bd', .95],
        ['rose', '#d9788c', .9], ['rose', '#fbe3da', .9]]
    },
    sunny: {
      label: 'Golden hour', paper: ['#dcc08f', '#c6a064'],
      ribbon: '#b5532f', leaves: ['#6f8c4a', '#587a3a', '#85a05a'],
      mix: [['sunflower', '#f6c61f', 1.25], ['cosmos', '#ee8a52', 1.05], ['sunflower', '#f3b61a', 1.1], ['cosmos', '#8a63c9', 1],
        ['daisy', '#fffaf0', .95], ['cosmos', '#e56b5a', 1.05], ['sunflower', '#f6c61f', 1.05], ['cosmos', '#ee8a52', 1],
        ['cosmos', '#8a63c9', .95], ['daisy', '#fffaf0', .9], ['cosmos', '#e56b5a', 1], ['sunflower', '#f3b61a', .95],
        ['cosmos', '#f3a96a', .95], ['daisy', '#fffaf0', .85]]
    }
  };

  const petalPath = (L, W) =>
    `M0,0 C${f(-W * .95)},${f(-L * .25)} ${f(-W * 1.05)},${f(-L * .85)} ${f(-W * .5)},${f(-L)} Q${f(-W * .2)},${f(-L * .9)} 0,${f(-L * .94)} Q${f(W * .2)},${f(-L * .9)} ${f(W * .5)},${f(-L)} C${f(W * 1.05)},${f(-L * .85)} ${f(W * .95)},${f(-L * .25)} 0,0Z`;

  function render(styleKey, opts) {
    opts = opts || {};
    const S = STYLES[styleKey] || STYLES.autumn;
    const uid = opts.uid || ('b' + Math.floor(Math.random() * 1e6));
    const R = rng(styleKey.split('').reduce((a, c) => a + c.charCodeAt(0), 7));
    const defs = [];
    const grads = {};
    function grad(color) {
      if (grads[color]) return grads[color];
      const id = `${uid}g${Object.keys(grads).length}`;
      grads[color] = id;
      defs.push(`<radialGradient id="${id}" cx=".5" cy="1" r="1.05"><stop offset="0" stop-color="${dark(color, .35)}"/><stop offset=".4" stop-color="${color}"/><stop offset="1" stop-color="${light(color, .35)}"/></radialGradient>`);
      return id;
    }

    function cosmos(c) {
      const g = grad(c), st = dark(c, .4);
      let s = '';
      for (let i = 0; i < 8; i++) {
        s += `<g transform="rotate(${i * 45 + (i % 2 ? 3 : 0)})"><path d="${petalPath(46, 19)}" fill="url(#${g})" stroke="${st}" stroke-opacity=".35" stroke-width=".7"/>` +
          `<path d="M0,-6 L0,-36 M-5,-8 Q-7,-24 -6,-36 M5,-8 Q7,-24 6,-36" stroke="${st}" stroke-opacity=".22" stroke-width=".6" fill="none"/></g>`;
      }
      s += `<circle r="7" fill="#f2b41a"/><circle r="7" fill="none" stroke="#b9650f" stroke-opacity=".5" stroke-width="1.2"/>`;
      for (let i = 0; i < 9; i++) { const a = i * 40 * Math.PI / 180; s += `<circle cx="${f(Math.cos(a) * 4)}" cy="${f(Math.sin(a) * 4)}" r="1" fill="#9a4b0c"/>`; }
      return s;
    }
    function daisy(c) {
      const g = grad(mix(c, '#d9d1b8', .25)), st = '#b9b08f';
      let s = '';
      for (let i = 0; i < 20; i++) {
        const len = i % 2 ? 40 : 46;
        s += `<path transform="rotate(${i * 18})" d="M0,0 C-4.5,-10 -5,${-len * .75} 0,${-len} C5,${-len * .75} 4.5,-10 0,0Z" fill="url(#${g})" stroke="${st}" stroke-opacity=".4" stroke-width=".5"/>`;
      }
      return s + `<circle r="8" fill="#f2c230"/><circle r="8" fill="none" stroke="#c98a10" stroke-opacity=".6" stroke-width="1.4"/><circle cx="-2" cy="-2" r="2.6" fill="#fbe08a"/>`;
    }
    function sunflower(c) {
      const g1 = grad(c), g2 = grad(dark(c, .12)), st = dark(c, .5);
      let s = '';
      for (let i = 0; i < 22; i++) s += `<path transform="rotate(${i * 360 / 22 + 8}) scale(.9)" d="M0,-6 C-9,-16 -8,-36 0,-54 C8,-36 9,-16 0,-6Z" fill="url(#${g2})" stroke="${st}" stroke-opacity=".3" stroke-width=".6"/>`;
      for (let i = 0; i < 22; i++) s += `<path transform="rotate(${i * 360 / 22})" d="M0,-6 C-9,-16 -8,-36 0,-54 C8,-36 9,-16 0,-6Z" fill="url(#${g1})" stroke="${st}" stroke-opacity=".3" stroke-width=".6"/>`;
      s += `<circle r="19" fill="#7a4a12"/><circle r="19" fill="none" stroke="#c98a10" stroke-width="2.2" stroke-opacity=".8"/><circle r="12" fill="#4a2a0a"/>`;
      for (let i = 0; i < 44; i++) { const a = i * 2.39996, r = 16.5 * Math.sqrt((i + .5) / 44); s += `<circle cx="${f(Math.cos(a) * r)}" cy="${f(Math.sin(a) * r)}" r="1.3" fill="${i % 3 ? '#8a5a1c' : '#2b1605'}"/>`; }
      return s;
    }
    function rose(c) {
      let s = '';
      [[44, 0, 0], [34, 20, .12], [24, 8, .22], [14, 30, .32]].forEach(([r, off, d], k) => {
        const col = dark(c, d), g = grad(col);
        for (let i = 0; i < 5 + (k === 3 ? -1 : 0); i++) {
          const n = k === 3 ? 4 : 5;
          s += `<g transform="rotate(${i * 360 / n + off})"><ellipse cx="0" cy="${f(-r * .5)}" rx="${f(r * .56)}" ry="${f(r * .6)}" fill="url(#${g})" stroke="${dark(c, .55)}" stroke-opacity=".4" stroke-width=".7"/></g>`;
        }
      });
      return s + `<path d="M0,-4 C7,-8 11,1 4,6 C-3,10 -10,3 -6,-3" fill="none" stroke="${dark(c, .6)}" stroke-opacity=".55" stroke-width="1.1"/>`;
    }
    const KINDS = { cosmos, daisy, sunflower, rose };

    // Layout: sunflower spiral dome
    const cx = 200, cy = 172, Rm = 112, n = S.mix.length;
    const spots = S.mix.map((m, i) => {
      const a = i * 2.39996 + R() * .3, r = Rm * Math.sqrt((i + .6) / n);
      return { m, x: cx + Math.cos(a) * r * 1.05 + (R() - .5) * 8, y: cy + Math.sin(a) * r * .88 + (R() - .5) * 8, rot: R() * 360, s: (.78 + R() * .08) * m[2] };
    });

    let stems = '', leaves = '', fill = '', blooms = '';
    spots.forEach(p => {
      stems += `<path d="M${f(p.x)},${f(p.y)} Q${f(p.x + (200 - p.x) * .2)},${f(p.y + (400 - p.y) * .55)} ${200 + f((R() - .5) * 14)},420" stroke="#5f7e4e" stroke-width="3.2" fill="none" stroke-linecap="round"/>`;
    });
    for (let i = 0; i < 11; i++) {
      const a = (-170 + i * 16 + (R() - .5) * 8) * Math.PI / 180, r = 100 + R() * 22;
      const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r * .9 + 10, rot = a * 180 / Math.PI + 90;
      const col = S.leaves[i % S.leaves.length];
      leaves += `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot + (R() - .5) * 24)}) scale(${f(.85 + R() * .5)})"><path d="M0,0 C16,-14 15,-42 0,-66 C-15,-42 -16,-14 0,0Z" fill="${col}" stroke="${dark(col, .4)}" stroke-opacity=".4" stroke-width=".8"/><path d="M0,0 L0,-56" stroke="${dark(col, .4)}" stroke-opacity=".35" stroke-width=".8"/></g>`;
    }
    if (styleKey === 'autumn' || styleKey === 'blush') {
      for (let i = 0; i < 8; i++) {
        const a = (-175 + i * 24 + (R() - .5) * 14) * Math.PI / 180, r = 128 + R() * 18;
        const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r * .88 + 8;
        fill += `<path d="M${f(cx + Math.cos(a) * 90)},${f(cy + Math.sin(a) * 80 + 8)} L${f(x)},${f(y)}" stroke="#7a9a6a" stroke-width="1" fill="none"/>`;
        for (let k = 0; k < 7; k++) fill += `<circle cx="${f(x + (R() - .5) * 20)}" cy="${f(y + (R() - .5) * 20)}" r="${f(2.4 + R() * 2.2)}" fill="${styleKey === 'blush' ? '#fff4ee' : '#ffffff'}" stroke="#e8c9d4" stroke-opacity=".7" stroke-width=".6"/>`;
      }
    }
    [...spots].reverse().forEach((p, i) => {
      blooms += `<g transform="translate(${f(p.x)} ${f(p.y)}) rotate(${f(p.rot)}) scale(${f(p.s)})"><g class="bl" style="--d:${f(0.25 + i * .09)}s">${KINDS[p.m[0]](p.m[1])}</g></g>`;
    });

    const [p1, p2] = S.paper;
    defs.push(
      `<linearGradient id="${uid}pa" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${light(p1, .25)}"/><stop offset="1" stop-color="${p2}"/></linearGradient>`,
      `<linearGradient id="${uid}pb" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p1}"/><stop offset="1" stop-color="${dark(p2, .2)}"/></linearGradient>`,
      `<filter id="${uid}wc" x="-8%" y="-8%" width="116%" height="116%"><feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="2" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="3.2"/></filter>`,
      `<filter id="${uid}sh" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#5a3a1a" flood-opacity=".25"/></filter>`
    );
    const rb = S.ribbon, rbd = dark(rb, .3);
    const paperBack = `<path d="M58,280 Q200,246 342,280 L226,534 L174,534Z" fill="url(#${uid}pb)"/>`;
    const paperFront =
      `<g filter="url(#${uid}sh)"><path d="M62,300 Q130,316 200,352 Q270,316 338,300 L226,534 Q200,542 174,534Z" fill="url(#${uid}pa)"/>` +
      `<path d="M62,300 Q130,316 200,352 L186,536 L174,534Z" fill="#fff" opacity=".13"/>` +
      `<path d="M200,352 L200,540 M130,316 L184,530 M270,316 L216,530" stroke="${dark(p2, .35)}" stroke-opacity=".3" stroke-width="1" fill="none"/>` +
      `<path d="M62,300 Q130,316 200,352 Q270,316 338,300" stroke="${light(p1, .5)}" stroke-width="2" fill="none" opacity=".7"/></g>`;
    const bow =
      `<g transform="translate(200 440)" filter="url(#${uid}sh)">` +
      `<path d="M0,0 C-40,-34 -62,-6 -50,18 C-38,34 -12,14 0,0Z" fill="${rb}" stroke="${rbd}" stroke-opacity=".5" stroke-width="1"/>` +
      `<path d="M0,0 C40,-34 62,-6 50,18 C38,34 12,14 0,0Z" fill="${rb}" stroke="${rbd}" stroke-opacity=".5" stroke-width="1"/>` +
      `<path d="M-6,6 C-20,40 -32,70 -42,88 L-26,84 L-14,98 C-6,64 0,34 4,8Z" fill="${rbd}"/>` +
      `<path d="M6,6 C20,40 30,70 40,86 L24,84 L14,98 C8,64 2,34 -2,8Z" fill="${rb}" stroke="${rbd}" stroke-opacity=".5" stroke-width="1"/>` +
      `<ellipse rx="11" ry="10" fill="${rbd}"/><ellipse rx="7" ry="6" cy="-2" fill="${rb}"/></g>`;
    const band = `<path d="M142,436 Q200,456 258,436 L257,452 Q200,472 143,452Z" fill="${rb}" opacity=".95"/>`;

    return `<svg class="bq-svg" viewBox="0 0 400 560" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A hand-painted bouquet"><defs>${defs.join('')}</defs>` +
      `<g class="sway"><g filter="url(#${uid}wc)">${paperBack}${stems}${leaves}${fill}${blooms}</g>` +
      `<g>${paperFront}${band}${bow}</g></g></svg>`;
  }

  window.Bouquet = { render, STYLES, mix, light, dark };
})();
