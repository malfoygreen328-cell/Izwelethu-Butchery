# Izwelethu Butchery — Website Sales Demo

A complete, mobile-first ecommerce **demonstration concept** for Izwelethu Butchery (Umlazi,
KwaZulu-Natal). Built with plain HTML5, CSS3 and vanilla JavaScript — no frameworks, no build step,
no dependencies.

> **This is not the official Izwelethu Butchery website.** It is an independently created sales
> prototype. Every price, pack, menu item, special and dashboard figure in it is illustrative demo
> content that has not been confirmed by the business.

---

## Quick start

The demo runs entirely from the file system.

1. Double-click `index.html`, or
2. Serve the folder (recommended, so relative URLs behave exactly as in production):

```bash
# any static server works, e.g.
npx serve .
python -m http.server 8000
```

Then open `http://localhost:8000`.

No API keys, tokens or `.env` files are required. The demo makes **no network requests of any kind**
except loading Google Fonts.

---

## Pages

| Page | Purpose |
| --- | --- |
| `index.html` | Homepage: hero, category shortcuts, favourites rail, braai packs, shisanyama teaser, wholesale teaser, loyalty teaser, FAQ |
| `shop.html` | Full catalogue with search, category, price, availability filters and sorting (state lives in the URL) |
| `product.html` | Reusable product detail page driven by `product.html?id=<product-id>` |
| `cart.html` | Persistent demo cart, order summary and demo checkout |
| `shisanyama.html` | Shisanyama experience concept, menu and events |
| `wholesale.html` | Wholesale/bulk enquiry concept and form |
| `about.html` | Business story structure with honest placeholders |
| `contact.html` | Contact details (flagged unverified) and demo enquiry form |
| `loyalty.html` | "Izwelethu Club" loyalty **concept** page |
| `admin-demo.html` | Static admin dashboard concept |

---

## Project structure

```
izwelethu-butchery-demo/
├─ index.html
├─ shop.html
├─ product.html
├─ cart.html
├─ shisanyama.html
├─ wholesale.html
├─ about.html
├─ contact.html
├─ loyalty.html
├─ admin-demo.html
├─ css/
│  ├─ style.css          design tokens + components (mobile-first, 360–599px base)
│  └─ responsive.css     600 / 900 / 1200 / 1440px upgrades, print & motion safety
├─ js/
│  ├─ demo-data.js       business identity, WhatsApp number, demo copy + datasets
│  ├─ products.js        19-product catalogue and query helpers
│  ├─ cart.js            localStorage cart + demo checkout
│  ├─ whatsapp.js        wa.me link and message generation
│  ├─ filters.js         shop search / filter / sort + URL state
│  └─ app.js             UI kernel: icons, toasts, drawer, search, cards, forms
├─ assets/
│  ├─ images/            product, scene and share artwork (SVG placeholders)
│  ├─ icons/             favicon
│  └─ logo/              brand mark
└─ tools/
   └─ generate-images.mjs regenerates every SVG placeholder
```

### Regenerating artwork

```bash
node tools/generate-images.mjs
```

All artwork is generated vector placeholders. Replace them with owner-approved photography before
any real launch.

---

## Configuration

Everything the business can change lives in **`js/demo-data.js`**.

| Key | Purpose |
| --- | --- |
| `IZWELETHU.WHATSAPP_NUMBER` | The **only** place the WhatsApp number is defined. International format, digits only. |
| `IZWELETHU.PHONE_DISPLAY` / `PHONE_HREF` | Publicly listed number, shown as unverified. |
| `IZWELETHU.location` | City/province and the Maps **search** query (no invented coordinates). |
| `IZWELETHU.notices` | Reusable demo disclaimers. |
| `IZWELETHU.shisanyama` | Menu, specials, events and gallery copy. |
| `IZWELETHU.wholesale` | Sectors, monthly volumes and business types. |
| `IZWELETHU.about` | About page pillars. |
| `IZWELETHU.admin` | Dashboard KPIs, sample orders and status labels. |
| `IZWELETHU.faq` | Question list. |
| `IZWELETHU_PRODUCTS` (`js/products.js`) | The catalogue: name, price, unit, stock flags, imagery, specs, pack contents. |

To add a product, append an entry to `PRODUCTS` in `js/products.js`. Cards, filters, search, related
products, the admin stock table and the price control all read from that array — nothing is
hardcoded in HTML.

---

## How ordering works

1. Products are added to a cart stored in `localStorage` under `izwelethu.demo.cart.v1`.
2. The cart page builds an order summary from the catalogue.
3. "Send order on WhatsApp" opens `https://wa.me/<number>` with a pre-written message.
4. **The customer sends the message.** The site never sends anything.

WhatsApp messages deliberately **omit the prices shown on screen** and ask Izwelethu to confirm
availability and the final price, because the on-screen prices are demo values.

The demo checkout collects no payment details and processes no payment.

---

## Demo integrity rules

These rules are enforced throughout the code base:

- **Prices are illustrative.** Demo ZAR figures only; not confirmed by Izwelethu.
- **Menu and specials read "to be confirmed."**
- **No invented facts.** No founding date, awards, statistics, reviews, testimonials, coordinates,
  trading hours, delivery areas or payment methods appear anywhere.
- **Phone numbers are labelled unverified.**
- **The loyalty programme does not exist** — `loyalty.html` is a concept page only.
- **The admin dashboard has no login** because it has nothing to protect: it is static markup with
  hard-coded demo values.
- **Forms never transmit data.** They validate, show an on-page confirmation and stop.
- **Cart data stays in the browser.** Nothing is uploaded anywhere.

---

## Accessibility and responsiveness notes

- Mobile-first: base layout targets 360–599px, with upgrades at 600px, 900px, 1200px and 1440px.
- Touch targets are at least 44px.
- Semantic landmarks, skip link, visible focus states, `aria-current`, `aria-expanded`,
  `aria-live` toasts and labelled form controls.
- `prefers-reduced-motion` disables reveal and fade animations.
- `forced-colors` mode keeps borders on buttons, badges and status pills.
- Print styles strip the chrome.
- Tables scroll horizontally inside their own container rather than breaking the page.

---

## Replacing the demo with real content

Before any public launch, confirm with Izwelethu:

- [ ] Exact trading name, spelling and final logo files
- [ ] WhatsApp number (and confirm it is WhatsApp-enabled)
- [ ] Public phone number
- [ ] Physical address and map coordinates
- [ ] Operating hours and public holidays
- [ ] Delivery areas, fees and cut-off times
- [ ] Payment methods
- [ ] Real prices for every product and pack
- [ ] Shisanyama menu, specials and events
- [ ] Real photography to replace the SVG placeholders
- [ ] Company history, sourcing standards and any approved claims
- [ ] Whether a loyalty programme will exist at all
- [ ] A decision on the demo disclaimer/ribbon

Then update `js/demo-data.js` and `js/products.js`, swap in real imagery, and remove the
`demo-ribbon`, `admin-banner` and per-page demo notes.

---

## Licence and ownership

All code, copy and artwork in this folder are a demonstration concept created to present a possible
online ordering platform. The Izwelethu name and brand are the property of Izwelethu Butchery. This
demo is not endorsed by, published by, or operated on behalf of the business.