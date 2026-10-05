/* ==========================================================================
   IZWELETHU BUTCHERY — DEMO CONCEPT
   js/products.js
   --------------------------------------------------------------------------
   THE PRODUCT CATALOGUE.

   Products are NOT hardcoded in HTML. Every card, list, search result and
   detail page is rendered from this file, so a future API can replace the
   `IZWELETHU_PRODUCTS` array without touching markup.

   IMPORTANT: prices, availability and pack contents below are DEMO values
   only. None of it has been confirmed by Izwelethu Butchery.

   HOW TO EDIT A PRODUCT
     id       unique key, also used in the URL: product.html?id=<id>
     price    demo price in ZAR (0 or null shows "Price to be confirmed")
     image    path relative to the project root
     available / stock  demo availability
   ========================================================================== */
(function (global) {
  'use strict';

  /* ------------------------------------------------------------------ */
  /* CATEGORIES                                                          */
  /* ------------------------------------------------------------------ */
  var CATEGORIES = [
    { id: 'beef', name: 'Beef', blurb: 'Demo category — cuts to be confirmed by Izwelethu.' },
    { id: 'chicken', name: 'Chicken', blurb: 'Demo category — products to be confirmed.' },
    { id: 'lamb-mutton', name: 'Lamb & Mutton', blurb: 'Demo category — products to be confirmed.' },
    { id: 'wors-sausages', name: 'Wors & Sausages', blurb: 'Demo category — products to be confirmed.' },
    { id: 'braai', name: 'Braai', blurb: 'Demo category — braai-ready cuts to be confirmed.' },
    { id: 'braai-packs', name: 'Braai Packs', blurb: 'Demo packs — contents and pricing to be confirmed.' },
    { id: 'bulk-wholesale', name: 'Bulk & Wholesale', blurb: 'Demo bulk offering — volumes and pricing to be confirmed.' }
  ];

  /* ------------------------------------------------------------------ */
  /* PRODUCTS                                                            */
  /* ------------------------------------------------------------------ */
  var PRODUCTS = [
    {
      id: 'beef-ribs',
      name: 'Beef Ribs',
      category: 'beef',
      short: 'Bone-in beef ribs',
      description: 'Demo product — bone-in beef ribs presented for the braai counter.',
      long:
        'This demo product describes bone-in beef ribs as a braai centrepiece. ' +
        'Cut size, trimming, yield, availability and pricing must all be confirmed by Izwelethu ' +
        'before this description is published.',
      image: 'assets/images/beef-ribs.svg',
      alt: 'Illustrated placeholder of a rack of beef ribs',
      price: 179,
      unit: 'kg',
      unitLong: 'Sold per kilogram',
      qtyStep: 0.5,
      minQty: 0.5,
      maxQty: 20,
      available: true,
      stock: 'In stock',
      featured: true,
      sort: 10,
      specs: [
        { label: 'Unit', value: 'Per kilogram (demo)' },
        { label: 'Preparation', value: 'To be confirmed' },
        { label: 'Origin / sourcing', value: 'To be confirmed' },
        { label: 'Allergens', value: 'None declared — to be confirmed' }
      ],
      demo: true
    },
    {
      id: 'rump-steak',
      name: 'Rump Steak',
      category: 'beef',
      short: 'Full rump steak',
      description: 'Demo product — full rump steak, a braai and pan favourite.',
      long:
        'Demo description for a full rump steak. Thickness, trimming options and final pricing ' +
        'must be confirmed by Izwelethu before publication.',
      image: 'assets/images/rump-steak.svg',
      alt: 'Illustrated placeholder of a beef rump steak',
      price: 219,
      unit: 'kg',
      unitLong: 'Sold per kilogram',
      qtyStep: 0.5,
      minQty: 0.5,
      maxQty: 20,
      available: true,
      stock: 'In stock',
      featured: true,
      sort: 20,
      specs: [
        { label: 'Unit', value: 'Per kilogram (demo)' },
        { label: 'Preparation', value: 'To be confirmed' },
        { label: 'Origin / sourcing', value: 'To be confirmed' }
      ],
      demo: true
    },
    {
      id: 'beef-mince',
      name: 'Beef Mince',
      category: 'beef',
      short: 'Minced beef',
      description: 'Demo product — minced beef for patties, sosaties and mince dishes.',
      long:
        'Demo description for minced beef. Fat ratio, pack size (loose or wrapped) and pricing ' +
        'must be confirmed by Izwelethu.',
      image: 'assets/images/beef-mince.svg',
      alt: 'Illustrated placeholder of beef mince in a bowl',
      price: 129,
      unit: 'kg',
      unitLong: 'Sold per kilogram',
      qtyStep: 0.5,
      minQty: 0.5,
      maxQty: 20,
      available: true,
      stock: 'In stock',
      sort: 30,
      specs: [
        { label: 'Unit', value: 'Per kilogram (demo)' },
        { label: 'Packing', value: 'To be confirmed' },
        { label: 'Origin / sourcing', value: 'To be confirmed' }
      ],
      demo: true
    },
    {
      id: 'beef-fillet',
      name: 'Beef Fillet',
      category: 'beef',
      short: 'Whole fillet',
      description: 'Demo product — whole fillet for special occasions and fine dining.',
      long:
        'Demo description for whole beef fillet. Whole or portioned, trimming and final pricing ' +
        'must be confirmed by Izwelethu.',
      image: 'assets/images/beef-fillet.svg',
      alt: 'Illustrated placeholder of a whole beef fillet',
      price: 349,
      unit: 'kg',
      unitLong: 'Sold per kilogram',
      qtyStep: 0.5,
      minQty: 0.5,
      maxQty: 10,
      available: true,
      stock: 'Limited',
      sort: 40,
      specs: [
        { label: 'Unit', value: 'Per kilogram (demo)' },
        { label: 'Preparation', value: 'To be confirmed' },
        { label: 'Origin / sourcing', value: 'To be confirmed' }
      ],
      demo: true
    },
    {
      id: 'whole-chicken',
      name: 'Whole Chicken',
      category: 'chicken',
      short: 'Whole dressed chicken',
      description: 'Demo product — whole chicken for roasting or braai.',
      long:
        'Demo description for a whole chicken. Size grading (e.g. 1.2 kg / 1.6 kg), whether it is ' +
        'frozen or fresh, and pricing must be confirmed by Izwelethu.',
      image: 'assets/images/whole-chicken.svg',
      alt: 'Illustrated placeholder of a whole chicken',
      price: 89,
      unit: 'each',
      unitLong: 'Sold per whole chicken',
      qtyStep: 1,
      minQty: 1,
      maxQty: 20,
      available: true,
      stock: 'In stock',
      featured: true,
      sort: 50,
      specs: [
        { label: 'Unit', value: 'Per whole chicken (demo)' },
        { label: 'Weight grade', value: 'To be confirmed' },
        { label: 'Fresh / frozen', value: 'To be confirmed' }
      ],
      demo: true
    },
    {
      id: 'chicken-legs',
      name: 'Chicken Legs',
      category: 'chicken',
      short: 'Drumsticks',
      description: 'Demo product — chicken drumsticks, a crowd favourite.',
      long:
        'Demo description for chicken drumsticks. Whether sold bone-in or deboned, pack size and ' +
        'pricing must be confirmed by Izwelethu.',
      image: 'assets/images/chicken-legs.svg',
      alt: 'Illustrated placeholder of chicken drumsticks',
      price: 99,
      unit: 'kg',
      unitLong: 'Sold per kilogram',
      qtyStep: 0.5,
      minQty: 0.5,
      maxQty: 20,
      available: true,
      stock: 'In stock',
      featured: true,
      sort: 60,
      specs: [
        { label: 'Unit', value: 'Per kilogram (demo)' },
        { label: 'Bone in / deboned', value: 'To be confirmed' },
        { label: 'Fresh / frozen', value: 'To be confirmed' }
      ],
      demo: true
    },
    {
      id: 'free-range-eggs',
      name: 'Free-Range Eggs',
      category: 'chicken',
      short: 'Dozen eggs',
      description: 'Demo product — eggs sold by the dozen.',
      long:
        'Demo description for eggs. Whether they are genuinely free-range, the pack size beyond ' +
        'a dozen and pricing must be confirmed by Izwelethu. Claims such as "free range" should ' +
        'only be published with proof of certification.',
      image: 'assets/images/free-range-eggs.svg',
      alt: 'Illustrated placeholder of a dozen eggs in a tray',
      price: 65,
      unit: 'dozen',
      unitLong: 'Sold per dozen',
      qtyStep: 1,
      minQty: 1,
      maxQty: 20,
      available: true,
      stock: 'Limited',
      sort: 70,
      specs: [
        { label: 'Unit', value: 'Per dozen (demo)' },
        { label: 'Certification', value: 'To be confirmed' },
        { label: 'Pack size', value: 'To be confirmed' }
      ],
      demo: true
    },
    {
      id: 'lamb-chops',
      name: 'Lamb Chops',
      category: 'lamb-mutton',
      short: 'Rack of lamb chops',
      description: 'Demo product — lamb chops for the braai.',
      long:
        'Demo description for lamb chops. Whether they are sold as a rack or per chop, the cut ' +
        'size and pricing must be confirmed by Izwelethu.',
      image: 'assets/images/lamb-chops.svg',
      alt: 'Illustrated placeholder of lamb chops',
      price: 399,
      unit: 'kg',
      unitLong: 'Sold per kilogram',
      qtyStep: 0.5,
      minQty: 0.5,
      maxQty: 15,
      available: true,
      stock: 'In stock',
      featured: true,
      sort: 80,
      specs: [
        { label: 'Unit', value: 'Per kilogram (demo)' },
        { label: 'Sold as', value: 'Rack or per chop — to be confirmed' },
        { label: 'Origin / sourcing', value: 'To be confirmed' }
      ],
      demo: true
    },
    {
      id: 'mutton-shoulder',
      name: 'Mutton Shoulder',
      category: 'lamb-mutton',
      short: 'Slow-cook mutton',
      description: 'Demo product — mutton shoulder suited to slow cooking.',
      long:
        'Demo description for mutton shoulder. Whether it is sold bone-in or boneless, suggested ' +
        'weight and pricing must be confirmed by Izwelethu.',
      image: 'assets/images/mutton-shoulder.svg',
      alt: 'Illustrated placeholder of a mutton shoulder',
      price: 219,
      unit: 'kg',
      unitLong: 'Sold per kilogram',
      qtyStep: 0.5,
      minQty: 0.5,
      maxQty: 20,
      available: true,
      stock: 'In stock',
      sort: 90,
      specs: [
        { label: 'Unit', value: 'Per kilogram (demo)' },
        { label: 'Bone in / boneless', value: 'To be confirmed' },
        { label: 'Origin / sourcing', value: 'To be confirmed' }
      ],
      demo: true
    },
    {
      id: 'boerewors',
      name: 'Boerewors',
      category: 'wors-sausages',
      short: 'Traditional boerewors',
      description: 'Demo product — boerewors sold per kilogram.',
      long:
        'Demo description for boerewors. Meat ratios, spice mix, casing thickness and pricing ' +
        'must be confirmed by Izwelethu.',
      image: 'assets/images/boerewors.svg',
      alt: 'Illustrated placeholder of a boerewors coil',
      price: 129,
      unit: 'kg',
      unitLong: 'Sold per kilogram',
      qtyStep: 0.5,
      minQty: 0.5,
      maxQty: 25,
      available: true,
      stock: 'In stock',
      featured: true,
      sort: 100,
      specs: [
        { label: 'Unit', value: 'Per kilogram (demo)' },
        { label: 'Recipe', value: 'To be confirmed' },
        { label: 'Spice level', value: 'To be confirmed' }
      ],
      demo: true
    },
    {
      id: 'braai-sausage-links',
      name: 'Braai Sausage Links',
      category: 'wors-sausages',
      short: 'Large boerewors links',
      description: 'Demo product — larger sausage links for the braai.',
      long:
        'Demo description for braai sausage links. Link weight and pricing must be confirmed by Izwelethu.',
      image: 'assets/images/braai-sausage-links.svg',
      alt: 'Illustrated placeholder of braai sausage links',
      price: 109,
      unit: 'kg',
      unitLong: 'Sold per kilogram',
      qtyStep: 0.5,
      minQty: 0.5,
      maxQty: 25,
      available: true,
      stock: 'In stock',
      sort: 110,
      specs: [
        { label: 'Unit', value: 'Per kilogram (demo)' },
        { label: 'Link weight', value: 'To be confirmed' }
      ],
      demo: true
    },
    {
      id: 'smoked-boerewors',
      name: 'Smoked Boerewors',
      category: 'wors-sausages',
      short: 'Smoked boerewors',
      description: 'Demo product — smoked boerewors. Currently shown as unavailable in the demo.',
      long:
        'Demo description for smoked boerewors. Whether Izwelethu stocks a smoked variant, and at ' +
        'what price, must be confirmed. Availability is set to "unavailable" here purely to ' +
        'demonstrate the availability filter.',
      image: 'assets/images/smoked-boerewors.svg',
      alt: 'Illustrated placeholder of smoked boerewors',
      price: 139,
      unit: 'kg',
      unitLong: 'Sold per kilogram',
      qtyStep: 0.5,
      minQty: 0.5,
      maxQty: 25,
      available: false,
      stock: 'Unavailable (demo)',
      sort: 120,
      specs: [
        { label: 'Unit', value: 'Per kilogram (demo)' },
        { label: 'Availability', value: 'To be confirmed' }
      ],
      demo: true
    },
    {
      id: 'beef-broll',
      name: 'Beef Broll',
      category: 'braai',
      short: 'Broll for the braai',
      description: 'Demo product — broll cuts trimmed for the braai.',
      long:
        'Demo description for beef broll. Fat ratio, whether it is sold trimmed or untrimmed, and ' +
        'pricing must be confirmed by Izwelethu.',
      image: 'assets/images/beef-broll.svg',
      alt: 'Illustrated placeholder of a beef broll',
      price: 149,
      unit: 'kg',
      unitLong: 'Sold per kilogram',
      qtyStep: 0.5,
      minQty: 0.5,
      maxQty: 25,
      available: true,
      stock: 'In stock',
      sort: 130,
      specs: [
        { label: 'Unit', value: 'Per kilogram (demo)' },
        { label: 'Trimmed', value: 'To be confirmed' }
      ],
      demo: true
    },
    {
      id: 'chicken-braai-cubes',
      name: 'Chicken Braai Cubes',
      category: 'braai',
      short: 'Marinated braai cubes',
      description: 'Demo product — chicken cubes prepared for the braai.',
      long:
        'Demo description for chicken braai cubes. Whether Izwelethu marinates on site, which ' +
        'marinades are available and pricing must be confirmed.',
      image: 'assets/images/chicken-braai-cubes.svg',
      alt: 'Illustrated placeholder of chicken braai cubes',
      price: 119,
      unit: 'kg',
      unitLong: 'Sold per kilogram',
      qtyStep: 0.5,
      minQty: 0.5,
      maxQty: 25,
      available: true,
      stock: 'In stock',
      sort: 140,
      specs: [
        { label: 'Unit', value: 'Per kilogram (demo)' },
        { label: 'Marinade', value: 'To be confirmed' }
      ],
      demo: true
    },
    {
      id: 'braai-pack-family',
      name: 'Family Braai Pack',
      category: 'braai-packs',
      short: 'Concept pack for a family braai',
      description: 'Demo pack — "Everything you need for the family braai." Contents to be confirmed.',
      long:
        'Demo braai pack. The composition below is illustrative only. Final contents, serving ' +
        'sizes and pricing must be set and approved by Izwelethu before launch.',
      image: 'assets/images/braai-pack-family.svg',
      alt: 'Illustrated placeholder of a family braai pack crate',
      price: 549,
      unit: 'pack',
      unitLong: 'Per demo pack',
      qtyStep: 1,
      minQty: 1,
      maxQty: 10,
      available: true,
      stock: 'Concept pack',
      featured: true,
      sort: 150,
      packLabel: 'Demo pack',
      contents: [
        'Boerewors — demo quantity to be confirmed',
        'Beef ribs or rump — demo selection to be confirmed',
        'Chicken pieces — demo quantity to be confirmed',
        'Broll or braai cuts — demo quantity to be confirmed',
        'Sides and extras — to be confirmed'
      ],
      specs: [
        { label: 'Feeds', value: 'To be confirmed by Izwelethu' },
        { label: 'Contents', value: 'To be confirmed by Izwelethu' },
        { label: 'Price', value: 'To be confirmed' }
      ],
      demo: true
    },
    {
      id: 'braai-pack-weekend',
      name: 'Weekend Braai Pack',
      category: 'braai-packs',
      short: 'Concept pack for a weekend braai',
      description: 'Demo pack — "For a proper weekend braai." Contents to be confirmed.',
      long:
        'Demo braai pack for a larger weekend gathering. Contents, serving sizes and pricing must ' +
        'be confirmed by Izwelethu.',
      image: 'assets/images/braai-pack-weekend.svg',
      alt: 'Illustrated placeholder of a weekend braai pack crate',
      price: 899,
      unit: 'pack',
      unitLong: 'Per demo pack',
      qtyStep: 1,
      minQty: 1,
      maxQty: 10,
      available: true,
      stock: 'Concept pack',
      featured: true,
      sort: 160,
      packLabel: 'Demo pack',
      contents: [
        'Mixed boerewors and sausage links — demo quantities to be confirmed',
        'Beef ribs — demo quantity to be confirmed',
        'Whole chicken — demo quantity to be confirmed',
        'Lamb or mutton option — to be confirmed',
        'Sides, salads and extras — to be confirmed'
      ],
      specs: [
        { label: 'Feeds', value: 'To be confirmed by Izwelethu' },
        { label: 'Contents', value: 'To be confirmed by Izwelethu' },
        { label: 'Price', value: 'To be confirmed' }
      ],
      demo: true
    },
    {
      id: 'braai-pack-event',
      name: 'Event Pack',
      category: 'braai-packs',
      short: 'Concept pack for larger events',
      description: 'Demo pack — "Feeding a crowd?" Bulk event format, pricing to be confirmed.',
      long:
        'Demo event pack intended to demonstrate bulk ordering for larger groups. Contents, minimum ' +
        'order, lead time and pricing must be confirmed by Izwelethu.',
      image: 'assets/images/braai-pack-event.svg',
      alt: 'Illustrated placeholder of an event braai pack crate',
      price: 2495,
      unit: 'pack',
      unitLong: 'Per demo pack',
      qtyStep: 1,
      minQty: 1,
      maxQty: 5,
      available: true,
      stock: 'Concept pack',
      sort: 170,
      packLabel: 'Demo pack',
      contents: [
        'Bulk beef — demo quantity to be confirmed',
        'Bulk chicken — demo quantity to be confirmed',
        'Bulk wors and sausages — demo quantity to be confirmed',
        'Optional extras — to be confirmed',
        'Delivery or collection arrangement — to be confirmed'
      ],
      specs: [
        { label: 'Feeds', value: 'To be confirmed by Izwelethu' },
        { label: 'Minimum order', value: 'To be confirmed' },
        { label: 'Lead time', value: 'To be confirmed' }
      ],
      demo: true
    },
    {
      id: 'bulk-beef-box',
      name: 'Bulk Beef Box',
      category: 'bulk-wholesale',
      short: 'Demo bulk beef box',
      description: 'Demo bulk offering — mixed beef box for trade and event orders.',
      long:
        'Demo bulk box for wholesale and event orders. Composition, weight, availability and ' +
        'trade pricing must be confirmed by Izwelethu.',
      image: 'assets/images/bulk-beef-box.svg',
      alt: 'Illustrated placeholder of bulk beef boxes',
      price: 1190,
      unit: 'box',
      unitLong: 'Per demo box',
      qtyStep: 1,
      minQty: 1,
      maxQty: 20,
      available: true,
      stock: 'Concept offering',
      sort: 180,
      contents: [
        'Mixed beef cuts — demo composition to be confirmed',
        'Approximate box weight — to be confirmed',
        'Trade pricing — to be confirmed'
      ],
      specs: [
        { label: 'Composition', value: 'To be confirmed by Izwelethu' },
        { label: 'Weight', value: 'To be confirmed' },
        { label: 'Trade pricing', value: 'On application via the wholesale form' }
      ],
      demo: true
    },
    {
      id: 'bulk-chicken-box',
      name: 'Bulk Chicken Box',
      category: 'bulk-wholesale',
      short: 'Demo bulk chicken box',
      description: 'Demo bulk offering — whole chickens packed for trade and events.',
      long:
        'Demo bulk chicken box. Count per box, size grading and trade pricing must be confirmed ' +
        'by Izwelethu.',
      image: 'assets/images/bulk-chicken-box.svg',
      alt: 'Illustrated placeholder of a bulk chicken box',
      price: 1650,
      unit: 'box',
      unitLong: 'Per demo box',
      qtyStep: 1,
      minQty: 1,
      maxQty: 20,
      available: true,
      stock: 'Concept offering',
      sort: 190,
      contents: [
        'Whole chickens — demo count to be confirmed',
        'Size grading — to be confirmed',
        'Trade pricing — to be confirmed'
      ],
      specs: [
        { label: 'Count', value: 'To be confirmed by Izwelethu' },
        { label: 'Weight grade', value: 'To be confirmed' },
        { label: 'Trade pricing', value: 'On application via the wholesale form' }
      ],
      demo: true
    }
  ];

  /* ------------------------------------------------------------------ */
  /* HELPERS                                                             */
  /* ------------------------------------------------------------------ */
  var currency = (global.IZWELETHU && global.IZWELETHU.currency) || 'R';

  function byId(id) {
    for (var i = 0; i < PRODUCTS.length; i++) {
      if (PRODUCTS[i].id === id) return PRODUCTS[i];
    }
    return null;
  }

  function categoryName(id) {
    for (var i = 0; i < CATEGORIES.length; i++) {
      if (CATEGORIES[i].id === id) return CATEGORIES[i].name;
    }
    return id;
  }

  function all() {
    return PRODUCTS.slice();
  }

  function featured() {
    return PRODUCTS.filter(function (p) { return p.featured; }).sort(function (a, b) { return a.sort - b.sort; });
  }

  function packs() {
    return PRODUCTS.filter(function (p) { return p.category === 'braai-packs'; })
      .sort(function (a, b) { return a.sort - b.sort; });
  }

  function byCategory(catId) {
    return PRODUCTS.filter(function (p) { return p.category === catId; })
      .sort(function (a, b) { return a.sort - b.sort; });
  }

  function categoryCounts() {
    var counts = {};
    PRODUCTS.forEach(function (p) {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }

  /* Free-text search across name, category and description */
  function search(query) {
    var q = (query || '').trim().toLowerCase();
    if (!q) return [];
    var terms = q.split(/\s+/);
    return PRODUCTS.filter(function (p) {
      var haystack = [
        p.name,
        p.category,
        categoryName(p.category),
        p.short,
        p.description,
        p.long,
        (p.contents || []).join(' ')
      ].join(' ').toLowerCase();
      return terms.every(function (term) { return haystack.indexOf(term) !== -1; });
    });
  }

  /* Related products: same category first, then any other product */
  function related(product, limit) {
    if (!product) return [];
    var same = PRODUCTS.filter(function (p) {
      return p.id !== product.id && p.category === product.category;
    });
    var others = PRODUCTS.filter(function (p) {
      return p.id !== product.id && p.category !== product.category;
    });
    return same.concat(others).slice(0, limit || 4);
  }

  function priceRange() {
    var vals = PRODUCTS.map(function (p) { return p.price || 0; })
      .filter(function (v) { return v > 0; });
    return { min: Math.min.apply(null, vals), max: Math.max.apply(null, vals) };
  }

  function formatPrice(value) {
    var n = Number(value) || 0;
    var fixed = n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return currency + ' ' + fixed;
  }

  function productUrl(id) {
    return 'product.html?id=' + encodeURIComponent(id);
  }

  global.IZWELETHU_PRODUCTS = PRODUCTS;
  global.IZWELETHU_CATEGORIES = CATEGORIES;

  global.Products = {
    all: all,
    featured: featured,
    packs: packs,
    byId: byId,
    byCategory: byCategory,
    categories: function () { return CATEGORIES.slice(); },
    categoryName: categoryName,
    categoryCounts: categoryCounts,
    search: search,
    related: related,
    priceRange: priceRange,
    formatPrice: formatPrice,
    productUrl: productUrl
  };
})(window);