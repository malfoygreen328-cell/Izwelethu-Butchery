/* ==========================================================================
   IZWELETHU BUTCHERY — DEMO CONCEPT
   js/demo-data.js
   --------------------------------------------------------------------------
   Single source of truth for demo configuration and all demo-only content.

   EDITING NOTES
   - WHATSAPP_NUMBER below is the ONLY place the WhatsApp number is defined.
   - Prices, packs, menu items, specials, events and admin figures are
     ILLUSTRATIVE DEMO CONTENT. Nothing here has been confirmed by Izwelethu
     Butchery. Replace with owner-approved content before any real launch.
   - No API keys, tokens or credentials belong in this file.
   ========================================================================== */
(function (global) {
  'use strict';

  var IZWELETHU = {
    /* ---------------------------------------------------------------- */
    /* BUSINESS IDENTITY (demo wording — confirm with owner)             */
    /* ---------------------------------------------------------------- */
    brand: {
      name: 'Izwelethu',
      fullName: 'Izwelethu Butchery',
      descriptor: 'Butchery · Eatery · Shisanyama',
      tagline: 'Good meat. Good times. Izwelethu.'
    },

    /* ---------------------------------------------------------------- */
    /* WHATSAPP — single configurable number (no duplicates in codebase)  */
    /* ---------------------------------------------------------------- */
    /* South African local format: 031 907 3143  ->  WhatsApp: 27319073143 */
    WHATSAPP_NUMBER: '27319073143',

    /* Publicly listed landline/mobile. Shown as UNVERIFIED on the site. */
    PHONE_DISPLAY: '031 907 3143',
    PHONE_HREF: 'tel:+27319073143',

    location: {
      city: 'Umlazi',
      province: 'KwaZulu-Natal',
      country: 'South Africa',
      /* No invented coordinates. A Maps SEARCH query is used instead. */
      mapsQuery: 'Izwelethu Butchery, Umlazi, KwaZulu-Natal'
    },

    /* ---------------------------------------------------------------- */
    /* COMMERCE SETTINGS                                                 */
    /* ---------------------------------------------------------------- */
    currency: 'R',
    currencyCode: 'ZAR',

    /* Demo disclaimer copy reused across pages */
    notices: {
      demoPrices:
        'Demo prices are shown to demonstrate the ordering flow. ' +
        'Final prices must be confirmed by Izwelethu before launch.',
      priceTbc: 'Price to be confirmed',
      menuTbc: 'Menu to be confirmed',
      contactVerify:
        'Contact details to be verified with Izwelethu before launch.',
      hoursTbc: 'Operating hours to be confirmed by Izwelethu.',
      loyaltyConcept:
        'Concept feature — subject to Izwelethu approval. Not an active programme.',
      adminDemo:
        'Admin concept — demo only. No real orders, customers or payments are stored.',
      checkoutDemo:
        'Demo checkout — no payment is processed and no order is sent to Izwelethu.',
      productionRequired: 'Demo feature — production integration required.'
    },

    /* ---------------------------------------------------------------- */
    /* SHISANYAMA — demo content (nothing owner-approved)                */
    /* ---------------------------------------------------------------- */
    shisanyama: {
      heroImage: 'assets/images/hero-shisanyama.svg',
      intro:
        'The Izwelethu shisanyama concept is built around fire, food and company. ' +
        'The experience below is a demonstration layout only — the final offering, ' +
        'menu and event programme must be supplied by Izwelethu.',
      experience: [
        {
          title: 'Fire & open-air cooking',
          text: 'A design concept for live cooking over open flame, presented as the centre of the experience.'
        },
        {
          title: 'Meat prepared for the table',
          text: 'Concept layout showing how butcher cuts, braai packs and sides could be presented together.'
        },
        {
          title: 'Music and gathering',
          text: 'Concept for live music and a relaxed gathering space. Format and capacity to be confirmed.'
        },
        {
          title: 'Family and group bookings',
          text: 'Concept flow for group bookings and event enquiries, routed through WhatsApp or the events form.'
        }
      ],
      menu: [
        { section: 'From the fire', items: 'Menu to be confirmed', demo: true },
        { section: 'Small plates', items: 'Menu to be confirmed', demo: true },
        { section: 'Mains', items: 'Menu to be confirmed', demo: true },
        { section: 'Sides & salads', items: 'Menu to be confirmed', demo: true },
        { section: 'Desserts', items: 'Menu to be confirmed', demo: true },
        { section: 'Drinks', items: 'Menu to be confirmed', demo: true }
      ],
      specials: [
        {
          title: 'Sunday gathering',
          text: 'Concept special — day, time and price to be confirmed by Izwelethu.',
          badge: 'Concept'
        },
        {
          title: 'Live braai counter',
          text: 'Concept special — cuts, availability and pricing to be confirmed.',
          badge: 'Concept'
        },
        {
          title: 'Event night',
          text: 'Concept special — booking model, capacity and pricing to be confirmed.',
          badge: 'Concept'
        }
      ],
      events: [
        { title: 'Private functions', text: 'Concept enquiry type — capacity, packages and availability to be confirmed.' },
        { title: 'Corporate braai', text: 'Concept enquiry type — packages to be confirmed.' },
        { title: 'Celebrations', text: 'Concept enquiry type — packages to be confirmed.' }
      ],
      gallery: [
        { src: 'assets/images/gallery-coals.svg', caption: 'Fire concept' },
        { src: 'assets/images/gallery-skewers.svg', caption: 'Skewers concept' },
        { src: 'assets/images/gallery-board.svg', caption: 'Board concept' },
        { src: 'assets/images/gallery-toast.svg', caption: 'Gathering concept' }
      ]
    },

    /* ---------------------------------------------------------------- */
    /* WHOLESALE — concept copy                                         */
    /* ---------------------------------------------------------------- */
    wholesale: {
      sectors: [
        { icon: 'restaurant', title: 'Restaurants', text: 'Concept: consistent supply and repeat ordering for kitchens.' },
        { icon: 'caterer', title: 'Caterers', text: 'Concept: event and function requirements in bulk.' },
        { icon: 'braai', title: 'Shisanyamas', text: 'Concept: weekend and event volumes across many cuts.' },
        { icon: 'truck', title: 'Events', text: 'Concept: crowd feeding and large-format orders.' },
        { icon: 'box', title: 'Retailers', text: 'Concept: trade supply for neighbouring businesses.' },
        { icon: 'users', title: 'Other businesses', text: 'Concept: any business with recurring meat requirements.' }
      ],
      monthlyOptions: [
        'Under 50 kg per month',
        '50 – 200 kg per month',
        '200 – 500 kg per month',
        '500 – 1 000 kg per month',
        'More than 1 000 kg per month',
        'Not sure yet'
      ],
      businessTypes: [
        'Restaurant / takeaway',
        'Caterer',
        'Shisanyama',
        'Event supplier',
        'Retailer / spaza shop',
        'Butchery / meat retailer',
        'Other'
      ]
    },

    /* ---------------------------------------------------------------- */
    /* ABOUT — structure only, no invented history                       */
    /* ---------------------------------------------------------------- */
    about: {
      pillars: [
        {
          key: 'story',
          title: 'Our story',
          image: 'assets/images/about-shopfront.svg',
          text: 'Placeholder. Owner-approved company history will be added here during production. ' +
                'No founding dates, milestones or background claims are stated in this demo.'
        },
        {
          key: 'meat',
          title: 'Our meat',
          image: 'assets/images/gallery-board.svg',
          text: 'Placeholder. Sourcing, suppliers, cuts and preparation standards will be documented ' +
                'once confirmed by Izwelethu.'
        },
        {
          key: 'community',
          title: 'Our community',
          image: 'assets/images/about-community.svg',
          text: 'Placeholder. Community programmes, partnerships and local involvement will be added ' +
                'once confirmed by Izwelethu.'
        },
        {
          key: 'experience',
          title: 'Our experience',
          image: 'assets/images/gallery-toast.svg',
          text: 'Placeholder. Details of the shisanyama experience, events and facilities will be added ' +
                'once confirmed by Izwelethu.'
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    /* ADMIN CONCEPT — illustrative figures only                       */
    /* ---------------------------------------------------------------- */
    admin: {
      kpis: [
        { label: "Today's sales", value: 'R 0', sub: 'Demo figure — no live data', trend: 'Demo only' },
        { label: 'Orders', value: '0', sub: 'Demo figure — no live data', trend: 'Demo only' },
        { label: 'Wholesale leads', value: '0', sub: 'Demo figure — no live data', trend: 'Demo only' },
        { label: 'WhatsApp orders', value: '0', sub: 'Demo figure — no live data', trend: 'Demo only' }
      ],
      orders: [
        {
          id: 'IZW-DEMO-1042',
          customer: 'Demo customer — Umlazi',
          items: '2 kg Beef Ribs · 1 kg Boerewors',
          total: 'Demo figure',
          channel: 'WhatsApp',
          status: 'new'
        },
        {
          id: 'IZW-DEMO-1041',
          customer: 'Demo customer — Umlazi',
          items: '1 × Whole Chicken · 1 dozen Eggs',
          total: 'Demo figure',
          channel: 'Website',
          status: 'preparing'
        },
        {
          id: 'IZW-DEMO-1040',
          customer: 'Demo business — catering',
          items: 'Bulk enquiry — 200 kg / month',
          total: 'Quote pending',
          channel: 'Wholesale form',
          status: 'ready'
        },
        {
          id: 'IZW-DEMO-1039',
          customer: 'Demo customer — Umlazi',
          items: 'Weekend Braai Pack (demo pack)',
          total: 'Demo figure',
          channel: 'WhatsApp',
          status: 'completed'
        },
        {
          id: 'IZW-DEMO-1038',
          customer: 'Demo customer — Umlazi',
          items: '1 kg Lamb Chops · 500 g Boerewors',
          total: 'Demo figure',
          channel: 'Website',
          status: 'completed'
        }
      ],
      statusLabels: {
        new: 'New',
        preparing: 'Preparing',
        ready: 'Ready',
        completed: 'Completed'
      },
      /* stock + price columns are generated from js/products.js */
      analytics: {
        topProductsNote: 'Ranked from demo orders only.',
        revenueNote: 'Demo figure — no live data.',
        ordersNote: 'Demo figure — no live data.',
        leadsNote: 'Demo figure — no live data.'
      }
    },

    /* ---------------------------------------------------------------- */
    /* FAQ                                                              */
    /* ---------------------------------------------------------------- */
    faq: [
      {
        q: 'Is this the official Izwelethu website?',
        a: 'No. This is an independently created demonstration concept built to show what an online ' +
           'ordering platform for Izwelethu Butchery could look like. It is not published or operated by Izwelethu.'
      },
      {
        q: 'Are the prices real?',
        a: 'No. Prices shown in this demo are illustrative only and have not been confirmed by Izwelethu. ' +
           'Final prices would be set by the business before launch.'
      },
      {
        q: 'Does placing an order here send it to Izwelethu?',
        a: 'The demo checkout does not process payment and does not transmit an order to any system. ' +
           'The WhatsApp ordering button opens WhatsApp with a prepared message for the customer to send themselves.'
      },
      {
        q: 'Is there a loyalty programme?',
        a: 'Not currently. The Izwelethu Club page is a concept only, shown to demonstrate a possible future feature. ' +
           'It requires Izwelethu approval before it could exist.'
      },
      {
        q: 'Where is Izwelethu located?',
        a: 'Umlazi, KwaZulu-Natal, South Africa. A publicly listed phone number is referenced on the contact page, ' +
           'marked as requiring verification before launch.'
      }
    ]
  };

  global.IZWELETHU = IZWELETHU;
})(window);