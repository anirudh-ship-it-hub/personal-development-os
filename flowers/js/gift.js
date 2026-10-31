(function () {
  const $ = id => document.getElementById(id);
  const raw = location.hash.replace(/^#/, '');
  const d = Object.assign({}, GiftCodec.SAMPLE, (raw && GiftCodec.decode(raw)) || {});
  const style = Bouquet.STYLES[d.s] ? d.s : 'autumn';
  const S = Bouquet.STYLES[style];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const to = (d.t || '').trim(), by = (d.f || '').trim();

  // ---- fill content (textContent only, so nothing typed can inject markup)
  document.title = to ? `A bouquet for ${to}` : 'A little something for you';
  $('from').textContent = by ? `From ${by}` : 'A little something';
  $('headline').textContent = d.h.trim() || (to ? `A Bouquet for ${to}` : 'A Bouquet for You');
  $('oFrom').textContent = by ? `From ${by}` : 'A little something';
  $('oTitle').textContent = to ? `For ${to}` : 'For you';
  $('oLetter').textContent = to || 'you';
  $('to').textContent = to || 'you';
  $('by').textContent = by || '';
  if (!by) $('by').closest('p').hidden = true;
  $('sign').textContent = by ? `– ${by}` : '';
  if (d.fn && d.fn.trim()) { $('tag').hidden = false; $('tagName').textContent = d.fn.trim(); $('tagMeaning').textContent = (d.fm || '').trim(); }
  const body = $('body');
  d.n.replace(/\r/g, '').split('\n').forEach((line, i) => {
    const p = document.createElement('p'); p.textContent = line; p.style.setProperty('--d', (0.25 + i * 0.45) + 's'); body.appendChild(p);
  });
  $('sign').style.setProperty('--sd', (0.25 + d.n.split('\n').length * 0.45 + 0.2) + 's');
  $('stamp').insertAdjacentHTML('afterbegin', stampSvg());
  function stampSvg() {
    return `<svg viewBox="0 0 60 60"><rect width="60" height="60" fill="#1f3b2a"/><g transform="translate(30 30)"><g fill="#e48a9a"><circle cy="-11" r="10"/><circle cx="10" cy="-4" r="10"/><circle cx="6" cy="9" r="10"/><circle cx="-6" cy="9" r="10"/><circle cx="-10" cy="-4" r="10"/></g><circle r="7" fill="#c9566d"/></g></svg>`;
  }

  // ---- bouquet
  const bq = $('bq');
  function drawBouquet() { bq.classList.remove('bloom'); bq.innerHTML = Bouquet.render(style, { uid: 'v' + Date.now() % 1e6 }); }
  drawBouquet();

  // ---- petals
  const petalColors = { autumn: ['#e8772e', '#d9588f', '#f2c230', '#c0203a'], blush: ['#e9a1ad', '#f6cfc9', '#d9788c'], sunny: ['#f6c61f', '#ee8a52', '#8a63c9'] }[style];
  function burst() {
    for (let i = 0; i < 34; i++) {
      const p = document.createElement('i'); p.className = 'petal';
      const a = Math.random() * Math.PI * 2, r = 120 + Math.random() * 260;
      p.style.cssText = `background:${petalColors[i % petalColors.length]};--dx:${Math.cos(a) * r}px;--dy:${Math.sin(a) * r - 60}px;--r:${Math.random() * 540 - 270}deg;animation-delay:${Math.random() * .2}s`;
      document.body.appendChild(p); setTimeout(() => p.remove(), 2200);
    }
  }
  function ambient() {
    const w = $('fall'); w.innerHTML = '';
    for (let i = 0; i < 12; i++) {
      const p = document.createElement('i'), c = petalColors[i % petalColors.length];
      p.style.cssText = `left:${Math.random() * 100}%;background:${c};--sx:${Math.random() * 120 - 60}px;--rot:${Math.random() * 720 - 360}deg;animation-duration:${9 + Math.random() * 8}s;animation-delay:${Math.random() * 10}s`;
      w.appendChild(p);
    }
  }

  // ---- the reveal: popup -> envelope opens -> petals -> bouquet blooms
  function reveal() {
    const op = $('opener'); if (!op || op.classList.contains('go')) return;
    op.classList.add('go');
    const t = reduce ? 0.3 : 1;
    setTimeout(burst, 1500 * t);
    setTimeout(() => { document.body.classList.remove('locked'); document.body.classList.add('revealed'); op.classList.add('gone'); }, 1800 * t);
    setTimeout(() => { bq.classList.add('bloom'); ambient(); }, 2100 * t);
    setTimeout(() => op.remove(), 3200 * t);
    setTimeout(watchNote, 2600 * t);
  }
  $('env').addEventListener('click', reveal);
  $('opener').addEventListener('click', e => { if (e.target === $('opener')) reveal(); });

  // ---- note writes itself in when scrolled to
  const note = $('note');
  function watchNote() {
    if (!('IntersectionObserver' in window)) return note.classList.add('in');
    new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { note.classList.add('in'); o.disconnect(); } }, { threshold: .35 }).observe(note);
  }

  // ---- actions
  function toast(m) { const t = $('toast'); t.textContent = m; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 2000); }
  $('share').addEventListener('click', async () => {
    const url = location.href;
    try { if (navigator.share) return await navigator.share({ title: document.title, url }); } catch (e) { return; }
    try { await navigator.clipboard.writeText(url); toast('Link copied'); } catch (e) { toast('Copy the address bar to share'); }
  });
  $('replay').addEventListener('click', () => {
    scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => { drawBouquet(); void bq.offsetWidth; bq.classList.add('bloom'); }, reduce ? 0 : 600);
  });

  // preview mode (inside the composer): jump straight in when asked
  if (new URLSearchParams(location.search).has('autoopen')) setTimeout(reveal, 400);
})();
