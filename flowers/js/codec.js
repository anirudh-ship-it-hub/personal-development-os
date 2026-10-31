/* A gift lives entirely in the link: JSON -> UTF-8 -> base64url, in the URL hash. No server, no database. */
window.GiftCodec = {
  encode(d) {
    const bytes = new TextEncoder().encode(JSON.stringify(d));
    let bin = ''; bytes.forEach(b => bin += String.fromCharCode(b));
    return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  },
  decode(s) {
    try {
      s = s.replace(/-/g, '+').replace(/_/g, '/'); while (s.length % 4) s += '=';
      const bin = atob(s), bytes = Uint8Array.from(bin, c => c.charCodeAt(0));
      return JSON.parse(new TextDecoder().decode(bytes));
    } catch (e) { return null; }
  },
  SAMPLE: { f: '', t: '', h: '', n: 'Thinking of you.\n\nI saw these and they reminded me of you, so I made you a little something.', s: 'autumn', fn: 'White Acacia', fm: 'Secret love' }
};
