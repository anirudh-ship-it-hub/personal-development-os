(function () {
  const $ = id => document.getElementById(id);
  const KEY = 'flowers.gifts', ME = 'flowers.from';
  const lsGet = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch (e) { return d; } };
  const lsSet = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  let style = 'autumn';

  // bouquet picker
  Object.keys(Bouquet.STYLES).forEach(k => {
    const b = document.createElement('button'); b.className = 'sty'; b.type = 'button'; b.dataset.k = k;
    b.innerHTML = Bouquet.render(k, { uid: 'm' + k }).replace('class="bq-svg"', 'class="bq-svg" style="overflow:visible"') + `<div>${Bouquet.STYLES[k].label}</div>`;
    b.querySelectorAll('.bl').forEach(e => e.style.transform = 'scale(1)');
    b.addEventListener('click', () => { style = k; sync(); });
    $('styles').appendChild(b);
  });

  const data = () => ({ f: $('from').value.trim(), t: $('to').value.trim(), h: $('head').value.trim(), n: $('note').value, s: style, fn: $('fn').value.trim(), fm: $('fm').value.trim() });
  const url = () => new URL('gift.html', location.href).href.split('?')[0] + '#' + GiftCodec.encode(data());

  let tm;
  function sync() {
    document.querySelectorAll('.sty').forEach(b => b.setAttribute('aria-pressed', b.dataset.k === style));
    clearTimeout(tm); tm = setTimeout(refresh, 600);
    const d = data(); if (d.f) lsSet(ME, d.f);
  }
  function refresh() { $('frame').src = 'gift.html?autoopen&t=' + Date.now() + '#' + GiftCodec.encode(data()); }
  ['from', 'to', 'head', 'note', 'fn', 'fm'].forEach(id => $(id).addEventListener('input', sync));
  $('replay').addEventListener('click', refresh);

  function toast(m) { const t = $('toast'); t.textContent = m; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 2000); }
  function load(d) {
    $('from').value = d.f || ''; $('to').value = d.t || ''; $('head').value = d.h || ''; $('note').value = d.n || '';
    $('fn').value = d.fn || ''; $('fm').value = d.fm || ''; style = Bouquet.STYLES[d.s] ? d.s : 'autumn'; sync();
  }
  function renderPast() {
    const list = lsGet(KEY, []), box = $('past'); box.innerHTML = '';
    if (!list.length) { box.innerHTML = '<p class="empty">Gifts you create appear here, so you can reuse or tweak them next time.</p>'; return; }
    list.forEach((g, i) => {
      const b = document.createElement('button'); b.type = 'button';
      const s1 = document.createElement('span'); s1.textContent = `${g.d.h || 'For ' + (g.d.t || 'her')}`;
      const s2 = document.createElement('small'); s2.textContent = new Date(g.ts).toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
      b.append(s1, s2); b.addEventListener('click', () => { load(g.d); scrollTo({ top: 0, behavior: 'smooth' }); toast('Loaded. Edit and make a new link.'); });
      box.appendChild(b);
    });
  }

  $('make').addEventListener('click', () => {
    const d = data(); if (!d.n.trim()) { $('note').focus(); return toast('Write a note first'); }
    const u = url(); $('link').textContent = u; $('linkbox').classList.add('on');
    const list = lsGet(KEY, []).filter(g => JSON.stringify(g.d) !== JSON.stringify(d)); list.unshift({ d, ts: Date.now() }); lsSet(KEY, list.slice(0, 12)); renderPast();
    $('linkbox').scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  $('copy').addEventListener('click', async () => { try { await navigator.clipboard.writeText($('link').textContent); toast('Link copied'); } catch (e) { toast('Select the link and copy it'); } });
  $('share').addEventListener('click', async () => { try { if (navigator.share) await navigator.share({ title: 'A little something for you', url: $('link').textContent }); else { await navigator.clipboard.writeText($('link').textContent); toast('Link copied'); } } catch (e) {} });
  $('open').addEventListener('click', () => window.open(url(), '_blank'));

  load(Object.assign({}, GiftCodec.SAMPLE, { f: lsGet(ME, '') }));
  renderPast();
})();
