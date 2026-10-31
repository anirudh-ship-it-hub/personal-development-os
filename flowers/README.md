# Flowers

A tiny static site for sending a digital bouquet. No build step, no backend, no sounds.

**Flow she sees:** pop-up with an envelope → tap → petals burst → the bouquet blooms → scroll → your handwritten-style note.

- `index.html` – composer. Pick a bouquet, fill in names and note, press **Create link**. Past gifts are remembered in your browser so you can reuse them.
- `gift.html` – what she opens. The whole gift is encoded in the link's `#hash`, so there is nothing to host but these files.
- `js/bouquet.js` – the procedural bouquet (3 styles: `autumn`, `blush`, `sunny`; add more in `STYLES`).

## Deploy on Vercel
Import the repo, set **Root Directory** to `flowers`, Framework Preset **Other**, no build command. Then open `https://<your-site>.vercel.app/` to compose and send her the generated link.

## Run locally
`cd flowers && python3 -m http.server 8000`
