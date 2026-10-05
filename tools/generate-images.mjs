/**
 * Izwelethu Butchery — DEMO artwork generator
 * ---------------------------------------------------------------
 * Generates all placeholder SVG artwork used by the demo.
 *
 * These are ILLUSTRATED PLACEHOLDERS, not photographs and not
 * official Izwelethu imagery. Replace every file in
 * assets/images with real photography (see README).
 *
 * Run:  node tools/generate-images.mjs
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const IMAGES = join(HERE, '..', 'assets', 'images');
mkdirSync(IMAGES, { recursive: true });

/* ------------------------------------------------------------------ */
/* palette                                                             */
/* ------------------------------------------------------------------ */
const P = {
  char900: '#0A0908',
  char800: '#13100E',
  char700: '#1C1714',
  char600: '#29211C',
  char500: '#3A2F27',
  meat500: '#A8352B',
  meat600: '#8A2620',
  meat700: '#661913',
  meat400: '#C24A38',
  meatLight: '#C9634C',
  cream: '#F3E7D3',
  creamDim: '#D9C7AC',
  ember: '#DE5A1C',
  emberLight: '#F7A03C',
  gold: '#E8B15A',
  bone: '#EFE2CB',
  boneDim: '#C9B795',
  wood: '#3A2A20',
  woodLight: '#54392B',
  herb: '#4E6B3C'
};

/* deterministic pseudo random so regenerating gives identical files */
function rng(seed) {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13; s >>>= 0;
    s ^= s >> 17;
    s ^= s << 5; s >>>= 0;
    return s / 4294967296;
  };
}
const pick = (arr, r) => arr[Math.floor(r() * arr.length) % arr.length];

/* ------------------------------------------------------------------ */
/* shared svg scaffolding                                               */
/* ------------------------------------------------------------------ */
function defs(id, { r, warm = true, emberX = 0.5, emberY = 0.94 } = {}) {
  return `
  <defs>
    <linearGradient id="bg-${id}" x1="0" y1="0" x2="0.35" y2="1">
      <stop offset="0" stop-color="${P.char800}"/>
      <stop offset="0.55" stop-color="${P.char700}"/>
      <stop offset="1" stop-color="${P.char900}"/>
    </linearGradient>
    <radialGradient id="key-${id}" cx="${emberX}" cy="${emberY - 0.45}" r="0.62">
      <stop offset="0" stop-color="${warm ? P.ember : P.char500}" stop-opacity="${warm ? 0.5 : 0.4}"/>
      <stop offset="0.45" stop-color="${warm ? P.emberLight : P.char600}" stop-opacity="${warm ? 0.16 : 0.22}"/>
      <stop offset="1" stop-color="${P.char900}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="vig-${id}" cx="0.5" cy="0.48" r="0.78">
      <stop offset="0.45" stop-color="#000000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000000" stop-opacity="0.72"/>
    </radialGradient>
    <linearGradient id="metal-${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#E8E4DE"/>
      <stop offset="0.4" stop-color="#9A948C"/>
      <stop offset="0.62" stop-color="#C9C3BB"/>
      <stop offset="1" stop-color="#5E5852"/>
    </linearGradient>
    <linearGradient id="board-${id}" x1="0" y1="0" x2="0.6" y2="1">
      <stop offset="0" stop-color="${P.woodLight}"/>
      <stop offset="1" stop-color="${P.wood}"/>
    </linearGradient>
    <linearGradient id="meat-${id}" x1="0.15" y1="0" x2="0.85" y2="1">
      <stop offset="0" stop-color="${P.meatLight}"/>
      <stop offset="0.45" stop-color="${P.meat500}"/>
      <stop offset="1" stop-color="${P.meat700}"/>
    </linearGradient>
    <linearGradient id="meatDark-${id}" x1="0.2" y1="0" x2="0.8" y2="1">
      <stop offset="0" stop-color="${P.meat500}"/>
      <stop offset="0.6" stop-color="${P.meat700}"/>
      <stop offset="1" stop-color="#4A120E"/>
    </linearGradient>
    <linearGradient id="bone-${id}" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0" stop-color="${P.bone}"/>
      <stop offset="1" stop-color="${P.boneDim}"/>
    </linearGradient>
    <linearGradient id="cream-${id}" x1="0" y1="0" x2="0.5" y2="1">
      <stop offset="0" stop-color="#FBF3E6"/>
      <stop offset="1" stop-color="${P.creamDim}"/>
    </linearGradient>
    <linearGradient id="ember-${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${P.gold}"/>
      <stop offset="0.5" stop-color="${P.emberLight}"/>
      <stop offset="1" stop-color="${P.ember}"/>
    </linearGradient>
    <filter id="soft-${id}" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="18"/>
    </filter>
    <filter id="softer-${id}" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="40"/>
    </filter>
    <filter id="shadow-${id}" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="26" stdDeviation="22" flood-color="#000000" flood-opacity="0.55"/>
    </filter>
    <filter id="grain-${id}" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="${r(1, 9999)}" result="n"/>
      <feColorMatrix in="n" type="saturate" values="0"/>
    </filter>
  </defs>`;
}

function wrap(id, w, h, inner, opts = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img"${opts.title ? ` aria-label="${opts.title}"` : ''}>
${defs(id, { r: opts.r || rng(7), warm: opts.warm !== false, emberX: opts.emberX, emberY: opts.emberY })}
  <rect width="${w}" height="${h}" fill="url(#bg-${id})"/>
  <rect width="${w}" height="${h}" fill="url(#key-${id})"/>
${inner}
  <rect width="${w}" height="${h}" fill="url(#vig-${id})"/>
  <rect width="${w}" height="${h}" filter="url(#grain-${id})" opacity="0.075" style="mix-blend-mode:overlay"/>
</svg>
`;
}

/* shared decorations ------------------------------------------------ */
const woodGrain = (id, x, y, w, h, r, n = 7) => {
  let out = '';
  for (let i = 0; i < n; i++) {
    const yy = y + (h / (n + 1)) * (i + 1);
    out += `<path d="M${x} ${yy} Q${x + w / 2} ${yy + (r() - 0.5) * 26} ${x + w} ${yy + (r() - 0.5) * 14}" stroke="#000" stroke-opacity="0.16" stroke-width="${2 + r() * 3}" fill="none" stroke-linecap="round"/>`;
  }
  return out;
};

const speckle = (id, cx, cy, rx, ry, n, r, colors) => {
  let out = '';
  for (let i = 0; i < n; i++) {
    const a = r() * Math.PI * 2;
    const d = Math.sqrt(r());
    const x = cx + Math.cos(a) * rx * d;
    const y = cy + Math.sin(a) * ry * d;
    const rad = 3 + r() * 9;
    out += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rad.toFixed(1)}" fill="${pick(colors, r)}" opacity="${(0.25 + r() * 0.5).toFixed(2)}"/>`;
  }
  return out;
};

const charMarks = (x, y, w, n, angle, r) => {
  let out = '';
  for (let i = 0; i < n; i++) {
    const yy = y + (w * 0.55 * (i + 0.7)) / n;
    out += `<path d="M${x + 12} ${yy} L${x + w - 12} ${yy + angle}" stroke="#2A0E0A" stroke-opacity="${(0.3 + r() * 0.35).toFixed(2)}" stroke-width="${9 + r() * 7}" stroke-linecap="round" fill="none"/>`;
  }
  return out;
};

const marbling = (path, color, n, r) => {
  let out = '';
  for (let i = 0; i < n; i++) {
    const x = 200 + r() * 800;
    const y = 240 + r() * 420;
    out += `<path d="M${x} ${y} q ${30 + r() * 40} ${-14 - r() * 18} ${70 + r() * 60} ${6 + r() * 16}" stroke="${color}" stroke-opacity="${(0.2 + r() * 0.45).toFixed(2)}" stroke-width="${2.5 + r() * 4}" fill="none" stroke-linecap="round"/>`;
  }
  return out;
};

const groundShadow = (cx, cy, rx, ry = rx * 0.16) =>
  `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#000" opacity="0.45" filter="url(#SOFT)"/>`;

/* ------------------------------------------------------------------ */
/* PRODUCT SUBJECTS (4:3 canvas)                                       */
/* ------------------------------------------------------------------ */
const subjects = {};

/* beef ribs */
subjects.ribs = (id, r) => `
  ${groundShadow(600, 720, 330)}
  <g filter="url(#shadow-${id})">
    <g stroke="url(#bone-${id})" stroke-width="36" stroke-linecap="round" fill="none">
      <path d="M392 336 L452 646"/>
      <path d="M508 320 L556 668"/>
      <path d="M624 320 L668 664"/>
      <path d="M736 344 L782 630"/>
    </g>
    <path d="M292 356 C300 236 430 168 592 176 C724 182 830 236 862 316 C888 380 848 434 764 452 C612 484 384 470 316 420 Z" fill="url(#meat-${id})"/>
    <path d="M292 356 C300 236 430 168 592 176 C724 182 830 236 862 316" stroke="#F3B48C" stroke-opacity="0.5" stroke-width="5" fill="none"/>
    <path d="M316 420 C384 470 612 484 764 452 C848 434 888 380 862 316" stroke="#3E110D" stroke-opacity="0.55" stroke-width="10" fill="none"/>
    ${marbling(0, '#F0C79A', 16, r)}
    ${charMarks(360, 220, 460, 4, 22, r)}
    <ellipse cx="470" cy="240" rx="120" ry="42" fill="#FFD3AC" opacity="0.14" filter="url(#soft-${id})"/>
  </g>`;

/* steak */
subjects.steak = (id, r) => `
  ${groundShadow(600, 700, 300)}
  <g filter="url(#shadow-${id})">
    <path d="M300 300 C420 236 760 240 880 320 C946 366 946 566 872 616 C740 706 400 700 306 620 C244 566 244 344 300 300 Z" fill="url(#meat-${id})"/>
    <path d="M300 300 C420 236 760 240 880 320 C920 342 938 380 944 418 C860 356 700 330 540 336 C430 340 348 366 296 402 C272 366 276 328 300 300 Z" fill="#F0E2C6"/>
    <path d="M300 300 C420 236 760 240 880 320" stroke="#FFF4E2" stroke-opacity="0.55" stroke-width="5" fill="none"/>
    ${marbling(0, '#F2CBA0', 18, r)}
    ${charMarks(330, 380, 540, 4, 20, r)}
    <ellipse cx="520" cy="400" rx="180" ry="70" fill="#FFC79A" opacity="0.13" filter="url(#soft-${id})"/>
  </g>`;

/* mince in a bowl */
subjects.mince = (id, r) => `
  ${groundShadow(600, 730, 320)}
  <g filter="url(#shadow-${id})">
    <path d="M268 470 C268 470 288 700 600 700 C912 700 932 470 932 470 Z" fill="url(#metal-${id})"/>
    <ellipse cx="600" cy="470" rx="332" ry="104" fill="#CFC9C1"/>
    <ellipse cx="600" cy="470" rx="332" ry="104" fill="none" stroke="#F3EFE9" stroke-opacity="0.6" stroke-width="6"/>
    <path d="M336 448 C400 336 520 306 600 306 C690 306 812 340 866 452 C800 424 700 410 600 410 C490 410 404 424 336 448 Z" fill="url(#meat-${id})"/>
    ${speckle(id, 600, 400, 250, 70, 46, r, ['#D98A6C', '#7A241C', '#E8B08C', '#5C170F'])}
    <path d="M336 448 C400 336 520 306 600 306 C690 306 812 340 866 452" stroke="#F0B08E" stroke-opacity="0.4" stroke-width="4" fill="none"/>
  </g>`;

/* beef fillet */
subjects.fillet = (id, r) => `
  ${groundShadow(600, 660, 330)}
  <g filter="url(#shadow-${id})">
    <path d="M300 470 C300 392 350 344 420 336 L860 336 C934 344 962 396 962 470 C962 552 928 596 856 600 L424 600 C354 594 300 548 300 470 Z" fill="url(#meatDark-${id})"/>
    <ellipse cx="860" cy="468" rx="118" ry="132" fill="#B43B2E"/>
    <ellipse cx="860" cy="468" rx="118" ry="132" fill="none" stroke="#F0DCC0" stroke-width="14" opacity="0.85"/>
    <ellipse cx="860" cy="468" rx="72" ry="84" fill="#9C2C24"/>
    <path d="M470 336 L482 600 M700 336 L706 600" stroke="#EFE2CB" stroke-width="12" opacity="0.55"/>
    <path d="M320 420 C420 386 780 386 830 404" stroke="#F6CBA4" stroke-opacity="0.35" stroke-width="8" fill="none" stroke-linecap="round"/>
    ${speckle(id, 600, 470, 240, 70, 20, r, ['#C45B45', '#5E1710'])}
  </g>`;

/* whole chicken */
subjects.chickenWhole = (id, r) => `
  ${groundShadow(600, 700, 320)}
  <g filter="url(#shadow-${id})">
    <path d="M360 470 C336 366 424 288 566 286 C700 284 812 336 838 428 C862 512 812 596 706 634 C596 674 430 640 386 566 C362 526 356 500 360 470 Z" fill="url(#meat-${id})"/>
    <path d="M392 452 C430 386 520 350 606 352 C700 354 780 396 806 462 C742 420 640 402 546 408 C470 412 418 434 392 452 Z" fill="#E9B585" opacity="0.75"/>
    <path d="M520 604 C500 654 520 690 566 700 C604 708 634 690 636 656 C600 664 556 646 520 604 Z" fill="#C9724A"/>
    <path d="M378 404 C352 356 386 322 436 330 C470 336 486 372 470 404 C436 386 404 388 378 404 Z" fill="#D9A377"/>
    <path d="M812 386 C842 350 890 366 898 412 C904 452 878 482 840 480 C826 448 818 414 812 386 Z" fill="#D9A377"/>
    ${charMarks(420, 400, 360, 4, 16, r)}
    ${speckle(id, 600, 470, 180, 90, 24, r, ['#8A2620', '#E9B585'])}
    <ellipse cx="520" cy="380" rx="140" ry="60" fill="#FFD9B4" opacity="0.16" filter="url(#soft-${id})"/>
  </g>`;

/* chicken legs */
subjects.chickenLegs = (id, r) => `
  ${groundShadow(600, 700, 300)}
  <g filter="url(#shadow-${id})">
    <g transform="translate(0,0)">
      <path d="M420 596 L386 716" stroke="url(#bone-${id})" stroke-width="34" stroke-linecap="round"/>
      <ellipse cx="530" cy="470" rx="150" ry="118" fill="url(#meat-${id})" transform="rotate(-18 530 470)"/>
      <path d="M420 560 C470 520 560 500 640 508" stroke="#8A2620" stroke-opacity="0.5" stroke-width="8" fill="none"/>
    </g>
    <g transform="translate(300,-10)">
      <path d="M400 596 L366 716" stroke="url(#bone-${id})" stroke-width="34" stroke-linecap="round"/>
      <ellipse cx="510" cy="470" rx="140" ry="110" fill="url(#meatDark-${id})" transform="rotate(-14 510 470)"/>
      <path d="M404 566 C452 528 536 508 610 516" stroke="#5C170F" stroke-opacity="0.55" stroke-width="8" fill="none"/>
    </g>
    ${charMarks(430, 400, 240, 3, 14, r)}
  </g>`;

/* egg tray */
subjects.eggs = (id, r) => `
  ${groundShadow(600, 720, 340)}
  <g filter="url(#shadow-${id})">
    <path d="M232 470 L968 470 L944 668 L256 668 Z" fill="url(#board-${id})"/>
    ${woodGrain(id, 232, 470, 736, 198, r, 4)}
    <g>
      ${[0, 1, 2, 3, 4, 5].map((i) => {
        const col = i % 3, row = Math.floor(i / 3);
        const cx = 372 + col * 228, cy = 536 + row * 128;
        return `<ellipse cx="${cx}" cy="${cy}" rx="88" ry="70" fill="#2A1B13" opacity="0.55"/>
      <ellipse cx="${cx}" cy="${cy - 14}" rx="82" ry="64" fill="url(#cream-${id})"/>
      <ellipse cx="${cx - 26}" cy="${cy - 36}" rx="26" ry="18" fill="#FFFFFF" opacity="0.6"/>`;
      }).join('\n      ')}
    </g>
    <path d="M232 470 L968 470 L962 512 L238 512 Z" fill="#6A4A34"/>
  </g>`;

/* lamb chops */
subjects.lambChops = (id, r) => `
  ${groundShadow(600, 720, 340)}
  <g filter="url(#shadow-${id})">
    <path d="M260 388 C300 300 480 250 700 262 C860 270 950 322 966 396 C980 464 900 500 760 496 C560 490 320 486 268 448 C246 428 246 412 260 388 Z" fill="#F0E0C2"/>
    <g>
      ${[0, 1, 2].map((i) => {
        const x = 360 + i * 220;
        const y = 430 + i * 40;
        return `<path d="M${x} ${y} L${x + 34} ${y + 220}" stroke="url(#bone-${id})" stroke-width="32" stroke-linecap="round"/>
      <path d="M${x - 96} ${y - 20} C${x - 40} ${y - 86} ${x + 70} ${y - 80} ${x + 104} ${y + 6} C${x + 130} ${y + 78} ${x + 60} ${y + 128} ${x - 24} ${y + 108} C${x - 92} ${y + 92} ${x - 122} ${y + 30} ${x - 96} ${y - 20} Z" fill="url(#meat-${id})"/>
      <ellipse cx="${x + 4}" cy="${y + 22}" rx="56" ry="44" fill="#C4634E"/>
      <ellipse cx="${x + 4}" cy="${y + 22}" rx="56" ry="44" fill="none" stroke="#F1DFC1" stroke-width="10" opacity="0.9"/>
      <ellipse cx="${x + 4}" cy="${y + 22}" rx="30" ry="24" fill="#A8352B"/>`;
      }).join('\n      ')}
    </g>
    ${speckle(id, 420, 350, 220, 40, 12, r, ['#4E6B3C', '#E9C79A'])}
  </g>`;

/* mutton shoulder */
subjects.muttonShoulder = (id, r) => `
  ${groundShadow(600, 700, 320)}
  <g filter="url(#shadow-${id})">
    <path d="M300 500 C300 366 440 300 620 302 C800 304 906 372 906 496 C906 616 800 668 610 668 C420 668 300 620 300 500 Z" fill="url(#meat-${id})"/>
    <path d="M330 430 C420 358 700 348 830 420" stroke="#F2CBA0" stroke-opacity="0.35" stroke-width="10" fill="none" stroke-linecap="round"/>
    <path d="M470 306 L470 664 M700 306 L700 664" stroke="#EFE2CB" stroke-width="14" opacity="0.6"/>
    <path d="M300 500 C300 366 440 300 620 302" stroke="#F3B48C" stroke-opacity="0.45" stroke-width="5" fill="none"/>
    ${speckle(id, 600, 480, 240, 110, 26, r, ['#7A241C', '#C9634C', '#F2CBA0'])}
  </g>`;

/* boerewors coil */
subjects.boerewors = (id, r) => `
  ${groundShadow(600, 700, 300)}
  <g filter="url(#shadow-${id})">
    <g fill="none" stroke="url(#meat-${id})" stroke-linecap="round">
      <path d="M600 260 C860 260 900 600 600 600 C300 600 340 260 600 260" stroke-width="66"/>
      <path d="M600 340 C780 340 800 520 600 520 C400 520 420 340 600 340" stroke-width="62"/>
      <path d="M600 418 C690 418 700 470 600 470 C500 470 510 418 600 418" stroke-width="58"/>
    </g>
    <g fill="none" stroke="#E4A97F" stroke-opacity="0.35" stroke-width="7" stroke-linecap="round">
      <path d="M420 300 C520 268 700 268 790 300"/>
      <path d="M400 420 C500 386 720 386 800 420"/>
      <path d="M430 540 C510 508 700 508 776 540"/>
    </g>
    <path d="M600 596 C600 596 640 626 616 660 C596 686 640 704 664 682 C700 648 664 604 636 596 Z" fill="url(#meatDark-${id})"/>
    ${speckle(id, 600, 420, 250, 130, 22, r, ['#5C170F', '#D98A6C'])}
  </g>`;

/* sausage links */
subjects.sausageLinks = (id, r) => `
  ${groundShadow(600, 690, 330)}
  <g filter="url(#shadow-${id})">
    <g transform="rotate(-8 600 470)">
      ${[0, 1, 2].map((i) => {
        const x = 330 + i * 190, y = 330 + i * 92;
        return `<path d="M${x} ${y} C${x - 46} ${y + 40} ${x - 40} ${y + 128} ${x + 6} ${y + 152} C${x + 54} ${y + 174} ${x + 112} ${y + 140} ${x + 116} ${y + 82} C${x + 120} ${y + 32} ${x + 46} ${y - 12} ${x} ${y} Z" fill="url(#meat-${id})"/>
      <path d="M${x + 12} ${y + 14} C${x + 44} ${y + 66} ${x + 42} ${y + 112} ${x + 12} ${y + 140}" stroke="#E9B585" stroke-opacity="0.35" stroke-width="8" fill="none"/>
      <path d="M${x - 30} ${y + 76} C${x + 10} ${y + 66} ${x + 74} ${y + 68} ${x + 110} ${y + 82}" stroke="#5C170F" stroke-opacity="0.4" stroke-width="7" fill="none"/>`;
      }).join('\n      ')}
    </g>
    ${charMarks(360, 300, 480, 4, 18, r)}
  </g>`;

/* smoked wors */
subjects.smokedWors = (id, r) => `
  ${groundShadow(600, 680, 320)}
  <g filter="url(#shadow-${id})">
    <g transform="rotate(-10 600 460)">
      <path d="M340 400 C340 356 392 330 470 336 L900 372 C968 380 992 424 972 462 C952 500 900 512 838 504 L410 452 C366 446 340 436 340 400 Z" fill="#4E1F16"/>
      <path d="M340 400 C340 356 392 330 470 336 L900 372" stroke="#8B4230" stroke-opacity="0.7" stroke-width="6" fill="none"/>
      <path d="M470 336 L468 452 M700 354 L698 470 M880 372 L878 500" stroke="#E4A97F" stroke-opacity="0.55" stroke-width="8" fill="none"/>
      <path d="M340 400 C340 356 392 330 470 336" stroke="#D98A6C" stroke-opacity="0.4" stroke-width="5" fill="none"/>
    </g>
    <g stroke="#F3E7D3" stroke-opacity="0.14" stroke-width="16" stroke-linecap="round" fill="none">
      <path d="M470 260 C560 220 660 300 740 254"/>
      <path d="M520 200 C610 164 700 232 776 194"/>
    </g>
  </g>`;

/* beef broll */
subjects.broll = (id, r) => `
  ${groundShadow(600, 660, 340)}
  <g filter="url(#shadow-${id})">
    <path d="M250 470 C250 392 306 344 380 338 L880 366 C952 370 986 418 970 470 L952 546 C936 592 890 612 826 606 L356 566 C292 560 250 528 250 470 Z" fill="url(#meatDark-${id})"/>
    <path d="M250 470 C250 392 306 344 380 338 L880 366 C952 370 986 418 970 470 C880 424 700 404 520 412 C400 418 300 442 250 470 Z" fill="#EFE2CB" opacity="0.92"/>
    <path d="M470 356 L466 580 M720 366 L716 594" stroke="#E6D3B0" stroke-width="10" opacity="0.5"/>
    <path d="M300 520 C420 546 700 566 900 586" stroke="#E7A97F" stroke-opacity="0.3" stroke-width="10" fill="none"/>
  </g>`;

/* braai cubes */
subjects.cubes = (id, r) => `
  ${groundShadow(600, 720, 300)}
  <g filter="url(#shadow-${id})">
    ${[[430, 560, 1.0], [560, 540, 1.15], [690, 566, 1.0], [495, 440, 0.9], [625, 424, 1.05], [750, 446, 0.85]].map(([x, y, s], i) => {
      const w = 120 * s, h = 96 * s, d = 44 * s;
      return `<g transform="translate(${x},${y})">
      <path d="M${-w / 2} 0 L0 ${-d} L${w / 2} 0 L0 ${d} Z" fill="${i % 2 ? '#B4402F' : '#9A3125'}"/>
      <path d="M${-w / 2} 0 L0 ${-d} L0 ${d - h} L${-w / 2} ${-h} Z" fill="#7A241C"/>
      <path d="M${w / 2} 0 L0 ${-d} L0 ${d - h} L${w / 2} ${-h} Z" fill="#5E1710"/>
      <path d="M${-w / 2} ${-h} L0 ${-h - d} L${w / 2} ${-h} L0 ${-h + d} Z" fill="#C9634C"/>
      <path d="M${-w / 2 + 18} ${-h + 10} L${w / 2 - 18} ${-h + 10}" stroke="#2A0E0A" stroke-opacity="0.45" stroke-width="7" stroke-linecap="round"/>
    </g>`;
    }).join('\n    ')}
    ${speckle(id, 600, 400, 180, 90, 16, r, ['#4E6B3C', '#E9B585'])}
  </g>`;

/* braai packs */
const packArt = (id, r, tint) => `
  ${groundShadow(600, 740, 340)}
  <g filter="url(#shadow-${id})">
    <path d="M300 470 L900 470 L872 720 L328 720 Z" fill="url(#board-${id})"/>
    <path d="M300 470 L900 470 L900 512 L300 512 Z" fill="#6A4A34"/>
    ${woodGrain(id, 300, 512, 600, 208, r, 4)}
    <g stroke="#6A4A34" stroke-width="10" opacity="0.8">
      <path d="M420 512 L414 720 M600 512 L600 720 M780 512 L786 720"/>
    </g>
    <path d="M336 470 L412 372 L520 386 L470 470 Z" fill="${tint[0]}"/>
    <ellipse cx="600" cy="416" rx="118" ry="66" fill="${tint[1]}"/>
    <ellipse cx="600" cy="416" rx="60" ry="34" fill="${tint[2]}"/>
    <path d="M700 470 L774 366 L880 384 L846 470 Z" fill="${tint[3]}"/>
    <path d="M470 470 L470 404" stroke="#E4A97F" stroke-opacity="0.4" stroke-width="8"/>
    <path d="M330 486 L872 486" stroke="#F3B48C" stroke-opacity="0.28" stroke-width="4"/>
  </g>`;
subjects.packFamily = (id, r) => packArt(id, r, ['#8A2620', '#B4402F', '#7A241C', '#D9A377']);
subjects.packWeekend = (id, r) => packArt(id, r, ['#A8352B', '#C9634C', '#7A241C', '#EFE2CB']);
subjects.packEvent = (id, r) => packArt(id, r, ['#661913', '#A8352B', '#5E1710', '#C9634C']);

/* bulk boxes */
subjects.bulkBeefBox = (id, r) => `
  ${groundShadow(600, 760, 360)}
  <g filter="url(#shadow-${id})">
    ${[[330, 520, 1], [600, 540, 0.92]].map(([x, y, s]) => {
      const w = 300 * s, h = 240 * s, d = 70 * s;
      return `<g transform="translate(${x},${y})">
      <path d="M${-w / 2} 0 L0 ${-d} L${w / 2} 0 L0 ${d} Z" fill="#C9A77C"/>
      <path d="M${-w / 2} 0 L0 ${-d} L0 ${d - h} L${-w / 2} ${-h} Z" fill="#B08F66"/>
      <path d="M${w / 2} 0 L0 ${-d} L0 ${d - h} L${w / 2} ${-h} Z" fill="#8E7048"/>
      <path d="M${-w / 2} ${-h * 0.52} L0 ${-h * 0.52 - d} L${w / 2} ${-h * 0.52}" stroke="#7A5B36" stroke-width="12" fill="none"/>
      <circle cx="0" cy="${-h - d + 40}" r="42" fill="none" stroke="#8A2620" stroke-width="7"/>
      <path d="M-22 ${-h - d + 28} L22 ${-h - d + 52} M22 ${-h - d + 28} L-22 ${-h - d + 52}" stroke="#8A2620" stroke-width="7" stroke-linecap="round"/>
    </g>`;
    }).join('\n    ')}
    <path d="M420 430 C480 400 700 402 760 434" stroke="${P.ember}" stroke-opacity="0.4" stroke-width="8" fill="none"/>
  </g>`;
subjects.bulkChickenBox = (id, r) => `
  ${groundShadow(600, 760, 360)}
  <g filter="url(#shadow-${id})">
    <path d="M280 520 L920 520 L890 740 L310 740 Z" fill="#C9A77C"/>
    <path d="M280 520 L920 520 L914 560 L286 560 Z" fill="#B08F66"/>
    ${woodGrain(id, 280, 560, 640, 180, r, 3)}
    <g stroke="#8E7048" stroke-width="8" opacity="0.8">
      <path d="M470 560 L476 740 M660 560 L660 740"/>
    </g>
    <g fill="#E4D6BC" opacity="0.95">
      ${[0, 1, 2, 3, 4].map((i) => `<ellipse cx="${360 + i * 118}" cy="470" rx="58" ry="46"/>`).join('')}
    </g>
    <path d="M340 440 C420 400 720 404 800 442" stroke="#EFE2CB" stroke-opacity="0.5" stroke-width="6" fill="none"/>
  </g>`;

/* ------------------------------------------------------------------ */
/* SCENES                                                              */
/* ------------------------------------------------------------------ */
const scenes = {};

/* wide braai hero */
scenes.heroBraai = (id, r) => `
  <g opacity="0.5">
    ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<circle cx="${120 + i * 240 + r() * 80}" cy="${120 + r() * 220}" r="${14 + r() * 26}" fill="${P.emberLight}" opacity="${(0.08 + r() * 0.16).toFixed(2)}" filter="url(#soft-${id})"/>`).join('')}
  </g>
  <ellipse cx="1000" cy="1080" rx="760" ry="220" fill="${P.ember}" opacity="0.35" filter="url(#softer-${id})"/>
  <g stroke="#0A0908" stroke-width="14" opacity="0.85">
    <path d="M0 760 L2000 700"/>
    <path d="M0 860 L2000 800"/>
    <path d="M0 960 L2000 900"/>
    <path d="M0 1060 L2000 1000"/>
  </g>
  <g opacity="0.85">
    ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => `<circle cx="${80 + i * 200 + r() * 40}" cy="${1030 - r() * 60}" r="${30 + r() * 22}" fill="${P.ember}" opacity="${(0.25 + r() * 0.4).toFixed(2)}"/>`).join('')}
  </g>
  <g filter="url(#shadow-${id})">
    <path d="M420 700 C430 640 520 610 640 620 C760 630 830 670 840 720 C846 762 800 786 720 782 C580 776 424 760 420 700 Z" fill="url(#meat-${id})"/>
    <path d="M420 700 C430 640 520 610 640 620 C760 630 830 670 840 720" stroke="#F3B48C" stroke-opacity="0.45" stroke-width="5" fill="none"/>
    ${charMarks(470, 640, 320, 4, 20, r)}
    <path d="M980 690 C1120 640 1420 646 1540 704 C1590 726 1590 806 1520 818 C1330 848 1080 820 990 780 C952 764 948 706 980 690 Z" fill="url(#meatDark-${id})"/>
    ${charMarks(1030, 660, 440, 4, 18, r)}
    <g fill="none" stroke="${P.meat600}" stroke-width="52" stroke-linecap="round">
      <path d="M1240 640 C1420 600 1600 660 1740 620"/>
      <path d="M1240 720 C1420 680 1600 740 1740 700"/>
    </g>
  </g>
  <g stroke="${P.creamDim}" stroke-opacity="0.28" stroke-width="9" stroke-linecap="round" fill="none">
    <path d="M520 540 C660 430 820 600 960 480"/>
    <path d="M1180 500 C1320 400 1480 560 1620 450"/>
    <path d="M700 420 C820 330 940 470 1060 360"/>
  </g>
  <g fill="${P.gold}" opacity="0.7">
    ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => `<circle cx="${200 + r() * 1700}" cy="${200 + r() * 700}" r="${3 + r() * 5}"/>`).join('')}
  </g>`;

/* shisanyama hero — dusk braai with people + string lights */
scenes.heroShisanyama = (id, r) => `
  <g>
    ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => `<path d="M${i * 200 - 60} ${520 + Math.sin(i) * 20} C${i * 200 + 40} ${300 + r() * 60} ${i * 200 + 120} ${560 + r() * 40} ${i * 200 + 210} ${360 + r() * 40}" stroke="#0A0908" stroke-width="10" fill="none" opacity="0.9"/>`).join('')}
  </g>
  <ellipse cx="1000" cy="960" rx="620" ry="200" fill="${P.ember}" opacity="0.4" filter="url(#softer-${id})"/>
  <g opacity="0.92">
    ${[[420, 760, 1], [560, 790, 0.92], [1460, 770, 1.05], [1600, 800, 0.9]].map(([x, y, s]) => `
      <g transform="translate(${x},${y}) scale(${s})">
        <circle cx="0" cy="-120" r="46" fill="#0A0908"/>
        <path d="M-52 0 C-52 -74 -28 -110 0 -110 C28 -110 52 -74 52 0 Z" fill="#0A0908"/>
      </g>`).join('')}
  </g>
  <g stroke="#0A0908" stroke-width="16" fill="none">
    <path d="M0 470 C500 380 1500 380 2000 470"/>
  </g>
  <g fill="${P.gold}">
    ${Array.from({ length: 13 }, (_, i) => {
      const x = 90 + i * 152;
      const y = 470 - 88 * Math.sin((i / 12) * Math.PI);
      return `<circle cx="${x}" cy="${y}" r="13" opacity="0.95"/><circle cx="${x}" cy="${y}" r="30" opacity="0.22" filter="url(#soft-${id})"/>`;
    }).join('')}
  </g>
  <g filter="url(#shadow-${id})">
    <path d="M760 880 L1240 880 L1216 990 L784 990 Z" fill="url(#metal-${id})"/>
    <g stroke="#0A0908" stroke-width="9" opacity="0.8">
      <path d="M770 906 L1230 906 M776 940 L1224 940 M782 974 L1218 974"/>
    </g>
    <path d="M840 862 C900 806 1000 800 1070 826 C1116 844 1110 880 1050 888 C964 898 848 892 840 862 Z" fill="url(#meat-${id})"/>
    <path d="M1130 856 C1180 812 1256 818 1288 852 C1304 872 1276 894 1232 892 C1170 890 1120 882 1130 856 Z" fill="url(#meatDark-${id})"/>
    <g fill="none" stroke="${P.emberLight}" stroke-width="16" stroke-linecap="round" opacity="0.9">
      <path d="M900 960 C920 900 940 1000 962 946 C982 898 1004 1002 1024 950"/>
      <path d="M1060 972 C1082 916 1102 1006 1124 958"/>
    </g>
  </g>
  <rect y="900" width="2000" height="300" fill="#0A0908" opacity="0.45"/>`;

/* shisanyama plates — top down spread */
scenes.shisanyamaPlates = (id, r) => `
  <g>
    <path d="M180 200 L1020 200 L1020 700 L180 700 Z" fill="url(#board-${id})" rx="18"/>
    ${woodGrain(id, 180, 200, 840, 500, r, 6)}
  </g>
  ${[[420, 400, 190], [760, 380, 150], [620, 610, 130]].map(([cx, cy, rad], i) => `
    <g filter="url(#shadow-${id})">
      <circle cx="${cx}" cy="${cy}" r="${rad}" fill="url(#cream-${id})"/>
      <circle cx="${cx}" cy="${cy}" r="${rad - 26}" fill="none" stroke="${P.creamDim}" stroke-width="4"/>
      <circle cx="${cx}" cy="${cy}" r="${rad - 52}" fill="#E7DCC6"/>
      ${[0, 1, 2, 3, 4].map((k) => {
        const a = (k / 5) * Math.PI * 2 + i;
        const x = cx + Math.cos(a) * (rad - 96);
        const y = cy + Math.sin(a) * (rad - 96);
        return `<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="46" ry="26" fill="${i === 1 ? '#D9A377' : i === 2 ? '#EFE2CB' : '#9A3125'}" transform="rotate(${(a * 57).toFixed(0)} ${x.toFixed(0)} ${y.toFixed(0)})"/>`;
      }).join('')}
    </g>`).join('')}
  <g opacity="0.9">
    <rect x="250" y="760" width="240" height="18" rx="9" fill="${P.metal}"/>
    <rect x="540" y="760" width="240" height="18" rx="9" fill="${P.metal}"/>
  </g>
  <circle cx="1030" cy="700" r="60" fill="${P.ember}" opacity="0.35" filter="url(#soft-${id})"/>`;

/* shisanyama event — long table, marquee */
scenes.shisanyamaEvent = (id, r) => `
  <path d="M120 120 L1080 120 L1080 760 L120 760 Z" fill="#0A0908" opacity="0.35"/>
  <g stroke="#0A0908" stroke-width="12" fill="none">
    <path d="M120 160 L600 60 L1080 160"/>
    <path d="M120 760 L120 160 M1080 760 L1080 160"/>
  </g>
  <g fill="${P.gold}">
    ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
      const x = 220 + i * 110;
      const y = 220 + Math.abs(i - 3.5) * 16;
      return `<circle cx="${x}" cy="${y}" r="11" opacity="0.9"/><circle cx="${x}" cy="${y}" r="28" opacity="0.2" filter="url(#soft-${id})"/>`;
    }).join('')}
  </g>
  <rect x="180" y="470" width="840" height="40" rx="14" fill="url(#board-${id})"/>
  ${[0, 1, 2, 3, 4, 5, 6].map((i) => {
    const x = 260 + i * 110;
    return `<g transform="translate(${x},470)">
      <circle cx="0" cy="-66" r="34" fill="#0A0908"/>
      <path d="M-38 0 C-38 -54 -20 -84 0 -84 C20 -84 38 -54 38 0 Z" fill="#0A0908"/>
      <ellipse cx="0" cy="-96" rx="40" ry="8" fill="${P.ember}" opacity="0.5"/>
    </g>`;
  }).join('')}
  <ellipse cx="600" cy="300" rx="420" ry="90" fill="${P.emberLight}" opacity="0.12" filter="url(#softer-${id})"/>`;

/* gallery: coals */
scenes.coals = (id, r) => `
  <ellipse cx="600" cy="700" rx="520" ry="150" fill="${P.ember}" opacity="0.42" filter="url(#softer-${id})"/>
  ${Array.from({ length: 22 }, (_, i) => {
    const x = 180 + r() * 840, y = 560 + r() * 220, s = 26 + r() * 34;
    const hot = r();
    return `<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="${s.toFixed(0)}" ry="${(s * 0.62).toFixed(0)}" fill="#2A1512"/>
      <ellipse cx="${x.toFixed(0)}" cy="${(y - 4).toFixed(0)}" rx="${(s * 0.7).toFixed(0)}" ry="${(s * 0.4).toFixed(0)}" fill="${hot > 0.55 ? P.emberLight : P.ember}" opacity="${(0.4 + hot * 0.5).toFixed(2)}"/>`;
  }).join('')}
  <g fill="url(#ember-${id})" opacity="0.9">
    <path d="M520 640 C540 520 590 560 600 440 C626 540 660 520 672 430 C690 540 720 540 726 650 Z" opacity="0.55" filter="url(#soft-${id})"/>
  </g>
  <g fill="${P.gold}" opacity="0.8">
    ${Array.from({ length: 16 }, () => `<circle cx="${(200 + r() * 800).toFixed(0)}" cy="${(200 + r() * 480).toFixed(0)}" r="${(2 + r() * 4).toFixed(1)}"/>`).join('')}
  </g>`;

/* gallery: skewers */
scenes.skewers = (id, r) => `
  <ellipse cx="600" cy="760" rx="520" ry="140" fill="${P.ember}" opacity="0.34" filter="url(#softer-${id})"/>
  <g filter="url(#shadow-${id})">
    ${[0, 1, 2, 3].map((k) => {
      const y = 300 + k * 130;
      return `<g>
      <rect x="180" y="${y - 9}" width="840" height="18" rx="9" fill="${P.boneDim}"/>
      ${[0, 1, 2, 3, 4].map((j) => {
        const x = 260 + j * 150;
        const c = ['#A8352B', '#C9634C', '#D9A377', '#EFE2CB'][j % 4];
        return `<path d="M${x} ${y} l40 -34 l60 8 l-6 62 l-64 12 Z" fill="${c}"/>
        <path d="M${x + 8} ${y - 22} l60 6" stroke="#2A0E0A" stroke-opacity="0.35" stroke-width="6"/>`;
      }).join('')}
    </g>`;
    }).join('')}
  </g>
  <g stroke="${P.creamDim}" stroke-opacity="0.25" stroke-width="10" fill="none" stroke-linecap="round">
    <path d="M420 240 C560 140 720 300 860 190"/>
    <path d="M520 180 C640 100 780 240 900 150"/>
  </g>`;

/* gallery: board with sliced meat */
scenes.board = (id, r) => `
  <g filter="url(#shadow-${id})">
    <path d="M150 320 L1050 280 L1090 700 L190 740 Z" fill="url(#board-${id})"/>
    ${woodGrain(id, 150, 320, 940, 400, r, 7)}
  </g>
  <g filter="url(#shadow-${id})">
    ${Array.from({ length: 6 }, (_, i) => {
      const x = 300 + i * 96;
      return `<path d="M${x} ${640 - i * 8} L${x + 40} ${430 + i * 6} L${x + 108} ${420 + i * 6} L${x + 76} ${628 - i * 8} Z" fill="url(#meat-${id})"/>
      <path d="M${x + 40} ${430 + i * 6} L${x + 108} ${420 + i * 6}" stroke="#F0E2C6" stroke-width="12" opacity="0.85"/>`;
    }).join('')}
    <circle cx="900" cy="620" r="86" fill="#2A1B13"/>
    <circle cx="900" cy="620" r="70" fill="#3A2A20"/>
    <path d="M300 660 L640 470" stroke="${P.metal}" stroke-width="18" stroke-linecap="round"/>
    <path d="M640 470 L700 430 L724 470 L664 508 Z" fill="${P.metal}"/>
  </g>
  ${speckle(id, 560, 380, 260, 40, 14, r, ['#4E6B3C'])}`;

/* gallery: warm drinks / toast */
scenes.toast = (id, r) => `
  <ellipse cx="600" cy="700" rx="440" ry="120" fill="${P.ember}" opacity="0.28" filter="url(#softer-${id})"/>
  ${[[420, 430, 1], [600, 400, 1.15], [780, 440, 0.95]].map(([x, y, s]) => `
    <g filter="url(#shadow-${id})" transform="translate(${x},${y}) scale(${s})">
      <path d="M-84 -120 L84 -120 L64 180 C60 226 -60 226 -64 180 Z" fill="url(#cream-${id})" opacity="0.35"/>
      <path d="M-72 -40 L72 -40 L60 168 C56 206 -56 206 -60 168 Z" fill="${P.ember}" opacity="0.72"/>
      <path d="M-84 -120 L84 -120 L80 -80 L-80 -80 Z" fill="#D9C7AC" opacity="0.6"/>
      <path d="M-46 60 L46 20 M-30 130 L40 96" stroke="${P.gold}" stroke-opacity="0.35" stroke-width="8" stroke-linecap="round"/>
    </g>`).join('')}
  <g fill="${P.gold}" opacity="0.85">
    ${Array.from({ length: 12 }, () => `<circle cx="${(140 + r() * 920).toFixed(0)}" cy="${(120 + r() * 300).toFixed(0)}" r="${(4 + r() * 9).toFixed(1)}"/>`).join('')}
  </g>`;

/* about: butcher counter */
scenes.butcherCounter = (id, r) => `
  <g opacity="0.9">
    ${[0, 1, 2, 3, 4].map((i) => `<path d="M${250 + i * 170} 0 L${250 + i * 170} 320" stroke="#3A2F27" stroke-width="8"/><circle cx="${250 + i * 170}" cy="346" r="26" fill="url(#meatDark-${id})"/>`).join('')}
  </g>
  <rect y="700" width="1200" height="200" fill="#241C17"/>
  <rect y="700" width="1200" height="14" fill="#4A3A2E"/>
  <g filter="url(#shadow-${id})">
    <path d="M220 700 L220 470 L980 470 L980 700 Z" fill="url(#board-${id})"/>
    ${woodGrain(id, 220, 470, 760, 230, r, 4)}
    <path d="M330 640 C330 570 440 530 570 540 C700 550 760 590 756 640 C752 686 660 700 540 690 C420 682 330 670 330 640 Z" fill="url(#meat-${id})"/>
    <path d="M330 640 C330 570 440 530 570 540" stroke="#F3B48C" stroke-opacity="0.4" stroke-width="5" fill="none"/>
    <path d="M600 480 L600 700" stroke="${P.metal}" stroke-width="16"/>
    <path d="M560 470 L640 470 L620 520 L580 520 Z" fill="${P.metal}"/>
  </g>
  <g opacity="0.6" stroke="${P.creamDim}" stroke-opacity="0.18" stroke-width="8" fill="none">
    <path d="M420 200 C520 140 620 240 720 180"/>
  </g>`;

/* about: community around the fire */
scenes.community = (id, r) => `
  <ellipse cx="600" cy="760" rx="520" ry="170" fill="${P.ember}" opacity="0.45" filter="url(#softer-${id})"/>
  <g filter="url(#shadow-${id})">
    <rect x="380" y="700" width="440" height="80" rx="16" fill="url(#metal-${id})"/>
    ${[0, 1, 2, 3].map((i) => `<path d="M${420 + i * 110} 720 C${430 + i * 110} 620 ${450 + i * 110} 600 ${460 + i * 110} 640 C${470 + i * 110} 600 ${490 + i * 110} 620 ${500 + i * 110} 720 Z" fill="url(#ember-${id})" opacity="0.9"/>`).join('')}
  </g>
  ${[[220, 620, 1], [330, 640, 0.9], [880, 630, 1], [990, 610, 0.92], [600, 560, 0.8]].map(([x, y, s]) => `
    <g transform="translate(${x},${y}) scale(${s})" opacity="0.95">
      <circle cx="0" cy="-108" r="40" fill="#0A0908"/>
      <path d="M-46 0 C-46 -66 -24 -98 0 -98 C24 -98 46 -66 46 0 Z" fill="#0A0908"/>
    </g>`).join('')}
  <g fill="${P.gold}" opacity="0.8">
    ${Array.from({ length: 10 }, () => `<circle cx="${(120 + r() * 960).toFixed(0)}" cy="${(140 + r() * 320).toFixed(0)}" r="${(4 + r() * 7).toFixed(1)}"/>`).join('')}
  </g>`;

/* about: story — shopfront at night */
scenes.shopfront = (id, r) => `
  <rect x="140" y="220" width="920" height="500" rx="18" fill="#241C17"/>
  <rect x="170" y="250" width="860" height="200" rx="10" fill="url(#bg-${id})" stroke="#4A3A2E" stroke-width="8"/>
  <g fill="${P.emberLight}" opacity="0.5" filter="url(#soft-${id})">
    <ellipse cx="380" cy="350" rx="150" ry="60"/>
    <ellipse cx="760" cy="350" rx="150" ry="60"/>
  </g>
  <rect x="170" y="480" width="420" height="240" rx="8" fill="#3A2F27"/>
  <rect x="640" y="480" width="390" height="240" rx="8" fill="#2A221D"/>
  <g stroke="#4E443C" stroke-width="6">
    <path d="M210 520 L550 520 M210 570 L550 570 M210 620 L550 620"/>
  </g>
  <g stroke="#4A3A2E" stroke-width="10">
    <path d="M700 720 L700 500 L1000 500 L1000 720"/>
  </g>
  <path d="M140 780 L1060 780" stroke="#4A3A2E" stroke-width="14"/>
  <ellipse cx="600" cy="840" rx="480" ry="70" fill="${P.ember}" opacity="0.18" filter="url(#softer-${id})"/>`;

/* wholesale storeroom (wide) */
scenes.storeroom = (id, r) => `
  <g opacity="0.85">
    ${[300, 700, 1100, 1500].map((x, i) => `<path d="M${x} 0 L${x} ${120 + i * 20}" stroke="#3A2F27" stroke-width="6"/><ellipse cx="${x}" cy="${150 + i * 20}" rx="70" ry="34" fill="${P.gold}" opacity="0.4" filter="url(#soft-${id})"/>`).join('')}
  </g>
  ${[[300, 700, 1.25], [640, 720, 1.1], [980, 690, 1.3], [1330, 720, 1.15], [1620, 700, 1]].map(([x, y, s]) => `
    <g transform="translate(${x},${y}) scale(${s})" filter="url(#shadow-${id})">
      <path d="M-160 0 L0 -66 L160 0 L0 66 Z" fill="#C9A77C"/>
      <path d="M-160 0 L0 -66 L0 6 L-160 72 Z" fill="#B08F66"/>
      <path d="M160 0 L0 -66 L0 6 L160 72 Z" fill="#8E7048"/>
      <path d="M-160 72 L160 72 L160 210 L-160 210 Z" fill="#A98A62"/>
      <path d="M-160 150 L160 150" stroke="#7A5B36" stroke-width="10"/>
      <circle cx="0" cy="116" r="34" fill="none" stroke="#8A2620" stroke-width="6"/>
    </g>`).join('')}
  <ellipse cx="1000" cy="900" rx="820" ry="150" fill="${P.ember}" opacity="0.2" filter="url(#softer-${id})"/>
  <rect y="880" width="2000" height="220" fill="#0A0908" opacity="0.5"/>`;

/* ------------------------------------------------------------------ */
/* OG social card                                                      */
/* ------------------------------------------------------------------ */
function ogCard() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="Izwelethu Butchery">
  <defs>
    <linearGradient id="ogbg" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0" stop-color="#1C1714"/><stop offset="1" stop-color="#0A0908"/>
    </linearGradient>
    <radialGradient id="ogfire" cx="0.78" cy="0.86" r="0.6">
      <stop offset="0" stop-color="${P.emberLight}" stop-opacity="0.5"/>
      <stop offset="1" stop-color="${P.ember}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#ogbg)"/>
  <rect width="1200" height="630" fill="url(#ogfire)"/>
  <rect x="72" y="72" width="1056" height="486" fill="none" stroke="#F3E7D3" stroke-opacity="0.18" stroke-width="2"/>
  <text x="120" y="300" font-family="Arial Black, Arial, Helvetica, sans-serif" font-size="86" letter-spacing="6" fill="#F3E7D3">IZWELETHU</text>
  <text x="120" y="360" font-family="Arial, Helvetica, sans-serif" font-size="30" letter-spacing="14" fill="${P.gold}">BUTCHERY</text>
  <rect x="120" y="410" width="180" height="6" fill="${P.ember}"/>
  <text x="120" y="472" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#D9C7AC">Meat &#183; Braai &#183; Shisanyama &#183; Wholesale</text>
  <text x="120" y="516" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="#8A7A6A">Umlazi, KwaZulu-Natal &#183; Demo concept</text>
</svg>
`;
}

/* logo mark (replaceable) */
function logoMark() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" role="img" aria-label="Izwelethu Butchery mark">
  <rect width="120" height="120" rx="20" fill="#13100E"/>
  <path d="M60 22 L86 44 L86 78 C86 96 74 104 60 110 C46 104 34 96 34 78 L34 44 Z" fill="#A8352B"/>
  <path d="M60 22 L86 44 L86 56 L60 34 L34 56 L34 44 Z" fill="#C24A38"/>
  <path d="M60 56 L74 66 L74 86 C74 94 68 98 60 101 C52 98 46 94 46 86 L46 66 Z" fill="#F3E7D3"/>
  <path d="M46 22 L74 22 L74 30 L46 30 Z" fill="#E8B15A"/>
</svg>
`;
}

function favicon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" role="img" aria-label="Izwelethu">
  <rect width="64" height="64" rx="12" fill="#13100E"/>
  <path d="M32 10 L50 24 L50 44 C50 55 43 60 32 64 C21 60 14 55 14 44 L14 24 Z" fill="#A8352B"/>
  <path d="M32 26 L42 33 L42 45 C42 50 38 53 32 55 C26 53 22 50 22 45 L22 33 Z" fill="#F3E7D3"/>
</svg>
`;
}

/* ------------------------------------------------------------------ */
/* write everything                                                    */
/* ------------------------------------------------------------------ */
const written = [];

const productArt = {
  'beef-ribs': subjects.ribs,
  'rump-steak': subjects.steak,
  'beef-mince': subjects.mince,
  'beef-fillet': subjects.fillet,
  'whole-chicken': subjects.chickenWhole,
  'chicken-legs': subjects.chickenLegs,
  'free-range-eggs': subjects.eggs,
  'lamb-chops': subjects.lambChops,
  'mutton-shoulder': subjects.muttonShoulder,
  'boerewors': subjects.boerewors,
  'braai-sausage-links': subjects.sausageLinks,
  'smoked-boerewors': subjects.smokedWors,
  'beef-broll': subjects.broll,
  'chicken-braai-cubes': subjects.cubes,
  'braai-pack-family': subjects.packFamily,
  'braai-pack-weekend': subjects.packWeekend,
  'braai-pack-event': subjects.packEvent,
  'bulk-beef-box': subjects.bulkBeefBox,
  'bulk-chicken-box': subjects.bulkChickenBox
};

let seed = 11;
for (const [name, fn] of Object.entries(productArt)) {
  const id = name;
  const svg = wrap(id, 1200, 900, fn(id, rng(seed++)), { r: rng(seed++) });
  writeFileSync(join(IMAGES, `${name}.svg`), svg);
  written.push(`images/${name}.svg`);
}

const sceneArt = {
  'hero-braai': { fn: scenes.heroBraai, w: 2000, h: 1200, opts: { warm: true, emberX: 0.5, emberY: 1.02 } },
  'hero-shisanyama': { fn: scenes.heroShisanyama, w: 2000, h: 1100, opts: { warm: true, emberX: 0.5, emberY: 0.95 } },
  'shisanyama-plates': { fn: scenes.shisanyamaPlates, w: 1200, h: 900, opts: {} },
  'shisanyama-event': { fn: scenes.shisanyamaEvent, w: 1200, h: 900, opts: { warm: true } },
  'gallery-coals': { fn: scenes.coals, w: 1200, h: 900, opts: {} },
  'gallery-skewers': { fn: scenes.skewers, w: 1200, h: 900, opts: {} },
  'gallery-board': { fn: scenes.board, w: 1200, h: 900, opts: {} },
  'gallery-toast': { fn: scenes.toast, w: 1200, h: 900, opts: { warm: true } },
  'about-counter': { fn: scenes.butcherCounter, w: 1200, h: 900, opts: {} },
  'about-community': { fn: scenes.community, w: 1200, h: 900, opts: {} },
  'about-shopfront': { fn: scenes.shopfront, w: 1200, h: 900, opts: { warm: true } },
  'wholesale-storeroom': { fn: scenes.storeroom, w: 2000, h: 1000, opts: {} }
};

for (const [name, cfg] of Object.entries(sceneArt)) {
  const id = name;
  const svg = wrap(id, cfg.w, cfg.h, cfg.fn(id, rng(seed++)), { r: rng(seed++), ...cfg.opts });
  writeFileSync(join(IMAGES, `${name}.svg`), svg);
  written.push(`images/${name}.svg`);
}

writeFileSync(join(IMAGES, 'og-card.svg'), ogCard());
writeFileSync(join(IMAGES, 'share-card.svg'), ogCard());
written.push('images/og-card.svg', 'images/share-card.svg');

const logoDir = join(HERE, '..', 'assets', 'logo');
mkdirSync(logoDir, { recursive: true });
writeFileSync(join(logoDir, 'izwelethu-mark.svg'), logoMark());

const iconDir = join(HERE, '..', 'assets', 'icons');
mkdirSync(iconDir, { recursive: true });
writeFileSync(join(iconDir, 'favicon.svg'), favicon());

console.log(`Generated ${written.length} image files + logo + favicon`);
console.log(written.join('\n'));