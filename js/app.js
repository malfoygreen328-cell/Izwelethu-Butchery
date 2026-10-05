/* ==========================================================================
   IZWELETHU BUTCHERY — DEMO CONCEPT
   js/app.js
   --------------------------------------------------------------------------
   Global UI kernel: icon sprite, toasts, navigation drawer, search overlay,
   product card renderer, reveal animation, accordions and demo form handling.

   Demo rules honoured here:
   - No network requests of any kind.
   - Demo forms never transmit data.
   - Nothing is presented as confirmed by Izwelethu.
   ========================================================================== */
(function (global) {
  'use strict';

  var doc = global.document;

  /* ------------------------------------------------------------------ */
  /* ICONS — injected inline so icons also work when opened from file://   */
  /* ------------------------------------------------------------------ */
  var ICON_PATHS = {
    cart: '<circle cx="9" cy="20" r="1.6"/><circle cx="18" cy="20" r="1.6"/><path d="M2 3h2.2l2.3 12.1a1.8 1.8 0 0 0 1.8 1.4h8.9a1.8 1.8 0 0 0 1.8-1.4L21 7H5.1"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4.5 20c1.4-3.6 4-5.5 7.5-5.5s6.1 1.9 7.5 5.5"/>',
    menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
    close: '<path d="M5 5l14 14M19 5 5 19"/>',
    whatsapp: '<path d="M3.5 20.5 5 16.6A8 8 0 1 1 8 19.4l-4.5 1.1Z"/><path d="M8.6 9.2c.2-.4.4-.4.6-.4h.5c.2 0 .4 0 .6.4l.7 1.7c.1.2 0 .4-.1.6l-.4.5c-.1.2-.2.3 0 .6a6.4 6.4 0 0 0 2.7 2.4c.3.1.5 0 .6-.1l.5-.6c.2-.2.3-.2.5-.1l1.7.8c.3.1.4.3.4.5a1.9 1.9 0 0 1-1.4 1.7c-.7.3-1.7.4-4.6-1.3-3.3-1.9-4.3-4.9-4.4-5.4-.1-.4-.1-.9.1-1.3Z"/>',
    phone: '<path d="M4 5c0-1 .8-1.8 1.8-1.8h2.4c.9 0 1.6.6 1.8 1.5l.7 3c.2.8-.1 1.6-.8 2l-1.4.9c.8 2 2.3 3.5 4.3 4.3l.9-1.4c.4-.7 1.2-1 2-.8l3 .7c.9.2 1.5.9 1.5 1.8v2.4c0 1-.8 1.8-1.8 1.8C10 18 6 14 5.2 7.6 5.1 6.6 4.5 5.4 4 5Z"/>',
    pin: '<path d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/>',
    'arrow-right': '<path d="M4 12h15"/><path d="m13 6 6 6-6 6"/>',
    'arrow-left': '<path d="M20 12H5"/><path d="m11 6-6 6 6 6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    trash: '<path d="M4 7h16"/><path d="M9 7V5h6v2"/><path d="M6 7l1 12h10l1-12"/><path d="M10 11v5M14 11v5"/>',
    check: '<path d="m4 12.5 5 5L20 6.5"/>',
    star: '<path d="m12 3.5 2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L3.4 9.9l6-.8L12 3.5Z"/>',
    fire: '<path d="M12 3c3 3.5 4.5 6 4.5 8.5a4.5 4.5 0 0 1-9 0c0-1.6.7-3 1.8-4.4.3 1.4 1 2.2 1.8 2.2 1 0 1.7-1 1.7-2.6 0-1.3-.5-2.6-.8-3.7Z"/><path d="M12 20.5a4 4 0 0 1-4-4"/>',
    truck: '<path d="M3 7h10v9H3z"/><path d="M13 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.7"/><circle cx="17" cy="18" r="1.7"/>',
    users: '<circle cx="9" cy="8" r="3.4"/><path d="M2.5 20c1.2-3.4 3.5-5.2 6.5-5.2s5.3 1.8 6.5 5.2"/><path d="M16.5 5.4a3.4 3.4 0 0 1 0 6.6"/><path d="M18 14.6c1.6.8 2.8 2.4 3.5 4.9"/>',
    box: '<path d="M12 3 3.5 7.5v9L12 21l8.5-4.5v-9L12 3Z"/><path d="M3.5 7.5 12 12l8.5-4.5M12 12v9"/>',
    chart: '<path d="M4 20V4"/><path d="M4 20h16"/><rect x="7" y="12" width="3.4" height="5"/><rect x="12" y="8.5" width="3.4" height="8.5"/><rect x="17" y="5" width="3.4" height="12"/>',
    filter: '<path d="M4 6h16M7 12h10M10 18h4"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    alert: '<path d="M12 4.5 21 20H3L12 4.5Z"/><path d="M12 10v4.5M12 17.2v.1"/>',
    mail: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/>',
    restaurant: '<path d="M6 3v8a2.5 2.5 0 0 0 5 0V3"/><path d="M8.5 11v10"/><path d="M17 3c-1.5 1.5-2 3.5-2 5.5s.5 3 2 3.5V21"/>',
    caterer: '<path d="M4 20h16"/><path d="M6 20V9l6-4 6 4v11"/><path d="M9.5 20v-5h5v5"/>',
    external: '<path d="M14 4h6v6"/><path d="M20 4 11 13"/><path d="M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4"/>',
    refresh: '<path d="M20 12a8 8 0 1 1-2.6-5.9"/><path d="M20 4v4h-4"/>',
    sparkle: '<path d="M12 3.5 13.8 9l5.7 1.8L13.8 12.6 12 18l-1.8-5.4L4.5 10.8 10.2 9 12 3.5Z"/>'
  };

  function mountSprite() {
    if (doc.getElementById('ico-sprite')) return;
    var symbols = Object.keys(ICON_PATHS).map(function (name) {
      return '<symbol id="ico-' + name + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
        'stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' + ICON_PATHS[name] + '</symbol>';
    }).join('');

    var host = doc.createElement('div');
    host.setAttribute('aria-hidden', 'true');
    host.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
    host.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + symbols + '</svg>';
    doc.body.insertBefore(host, doc.body.firstChild);
  }

  function icon(name, className) {
    if (!ICON_PATHS[name]) return '';
    return '<svg class="ico' + (className ? ' ' + className : '') +
      '" aria-hidden="true" focusable="false"><use href="#ico-' + name + '"></use></svg>';
  }

  /* ------------------------------------------------------------------ */
  /* UI OBJECT                                                           */
  /* ------------------------------------------------------------------ */
  var UI = {
    icons: ICON_PATHS,
    icon: icon,
    money: function (value) { return global.Products.formatPrice(value); },
    escapeHtml: function (value) { return global.Cart ? global.Cart.escapeHtml(value) : String(value); },

    /* ---------------------------------------------------------------- */
    /* TOASTS                                                             */
    /* ---------------------------------------------------------------- */
    toast: function (message, options) {
      var opts = options || {};
      var stack = doc.querySelector('.toast-stack');
      if (!stack) {
        stack = doc.createElement('div');
        stack.className = 'toast-stack';
        stack.setAttribute('role', 'status');
        stack.setAttribute('aria-live', 'polite');
        doc.body.appendChild(stack);
      }

      var node = doc.createElement('div');
      node.className = 'toast';
      node.innerHTML = icon(opts.type === 'warn' ? 'alert' : 'check') + '<span>' + message + '</span>';
      stack.appendChild(node);

      global.setTimeout(function () {
        node.classList.add('is-out');
        global.setTimeout(function () { if (node.parentNode) node.parentNode.removeChild(node); }, 320);
      }, opts.duration || 3200);
    },

    /* ---------------------------------------------------------------- */
    /* PRODUCT CARD RENDERER                                              */
    /* ---------------------------------------------------------------- */
    productCard: function (product, options) {
      var opts = options || {};
      var P = global.Products;
      var href = P.productUrl(product.id);
      var money = P.formatPrice(product.price);
      var out = product.available === false;

      var flags = [];
      if (product.demo) flags.push('<span class="badge badge--dark">Demo</span>');
      if (product.packLabel) flags.push('<span class="badge badge--gold">' + product.packLabel + '</span>');
      if (out) flags.push('<span class="badge badge--danger">Unavailable</span>');
      else if (product.stock === 'Limited') flags.push('<span class="badge badge--demo">Limited</span>');

      var priceBlock = product.price
        ? '<div class="card__price"><span class="card__amount">' + money + '</span>' +
          '<span class="card__unit">per ' + product.unit + '</span></div>' +
          '<span class="tiny muted">Demo price — to be confirmed</span>'
        : '<div class="card__price"><span class="card__amount small">Price to be confirmed</span></div>';

      var controls = '';
      if (opts.controls === 'qty' && !out) {
        var step = product.qtyStep || 1;
        controls =
          '<div class="stepper" role="group" aria-label="Quantity for ' + product.name + '">' +
            '<button type="button" data-card-step="down" aria-label="Decrease quantity of ' + product.name + '">' +
              icon('minus') +
            '</button>' +
            '<input type="number" value="' + (product.minQty || step) + '" min="' + (product.minQty || step) +
              '" max="' + (product.maxQty || 99) + '" step="' + step +
              '" data-card-qty aria-label="Quantity of ' + product.name + '" />' +
            '<button type="button" data-card-step="up" aria-label="Increase quantity of ' + product.name + '">' +
              icon('plus') +
            '</button>' +
          '</div>' +
          '<button type="button" class="btn btn--accent" data-add="' + product.id + '">Add</button>';
      } else {
        controls = out
          ? '<a class="btn btn--ghost btn--sm" href="' + href + '">View details</a>'
          : '<button type="button" class="btn btn--accent" data-add="' + product.id + '">Add to cart</button>';
      }

      return '' +
        '<article class="card" data-card="' + product.id + '" data-product="' + product.id + '">' +
          '<a class="card__media" href="' + href + '" tabindex="-1" aria-hidden="true">' +
            '<img src="' + product.image + '" alt="' + product.alt + '" loading="' +
              (opts.eager ? 'eager' : 'lazy') + '" decoding="async" width="1200" height="900" />' +
            '<span class="card__flags">' + flags.join('') + '</span>' +
          '</a>' +
          '<div class="card__body">' +
            '<span class="card__cat">' + P.categoryName(product.category) + '</span>' +
            '<h3 class="card__title"><a href="' + href + '">' + product.name + '</a></h3>' +
            (opts.description === false ? '' : '<p class="card__desc">' + product.short + '</p>') +
            priceBlock +
            '<div class="card__foot">' + controls + '</div>' +
          '</div>' +
        '</article>';
    },

    renderInto: function (selector, html) {
      var host = doc.querySelector(selector);
      if (host) host.innerHTML = html;
      return host;
    },

    /* ---------------------------------------------------------------- */
    /* BRAAI / BULK PACK CARD                                             */
    /* ---------------------------------------------------------------- */
    packCard: function (product) {
      var P = global.Products;
      var href = P.productUrl(product.id);
      var contents = (product.contents || []).map(function (line) {
        return '<li>' + icon('check') + '<span>' + line + '</span></li>';
      }).join('');

      return '' +
        '<article class="pack reveal" data-card="' + product.id + '">' +
          '<div class="pack__media">' +
            '<span class="pack__tag badge badge--gold">' + (product.packLabel || 'Demo pack') + '</span>' +
            '<img src="' + product.image + '" alt="' + product.alt + '" loading="lazy" decoding="async" ' +
              'width="1200" height="825" />' +
          '</div>' +
          '<div class="pack__body">' +
            '<h3>' + product.name + '</h3>' +
            '<p>' + product.description + '</p>' +
            (contents ? '<ul class="pack__list">' + contents + '</ul>' : '') +
            '<div class="pack__foot">' +
              '<div class="pack__price">' + (product.price ? P.formatPrice(product.price) : 'Price to be confirmed') +
                '<small>per ' + product.unit + ' &middot; demo price</small></div>' +
              '<div class="row" style="margin-left:auto">' +
                '<button type="button" class="btn btn--cream btn--sm" data-add="' + product.id + '">Add to cart</button>' +
                '<a class="btn btn--ghost btn--sm" href="' + href + '" data-pack-link>Details</a>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</article>';
    },

    /* ---------------------------------------------------------------- */
    /* DELEGATED CART ACTIONS                                             */
    /* ---------------------------------------------------------------- */
    initCartActions: function () {
      doc.addEventListener('click', function (event) {
        var stepBtn = event.target.closest('[data-card-step]');
        if (stepBtn) {
          var card = stepBtn.closest('[data-card]');
          var product = global.Products.byId(card.getAttribute('data-card'));
          var input = card.querySelector('[data-card-qty]');
          var stepSize = product.qtyStep || 1;
          var value = Number(input.value) || product.minQty || stepSize;
          var next = stepBtn.getAttribute('data-card-step') === 'up'
            ? value + stepSize
            : value - stepSize;
          var min = product.minQty || stepSize;
          var max = product.maxQty || 99;
          next = Math.min(max, Math.max(min, Math.round(next / stepSize) * stepSize));
          input.value = next;
          return;
        }

        var addBtn = event.target.closest('[data-add]');
        if (addBtn) {
          event.preventDefault();
          var id = addBtn.getAttribute('data-add');
          var cardEl = addBtn.closest('[data-card]');
          var qtyInput = cardEl ? cardEl.querySelector('[data-card-qty]') : null;
          var qty = qtyInput ? Number(qtyInput.value) : 1;
          var added = global.Cart.add(id, qty);
          if (added) {
            var productItem = global.Products.byId(id);
            UI.toast(productItem.name + ' added to the demo cart');
            if (qtyInput) qtyInput.value = productItem.minQty || productItem.qtyStep || 1;
          }
        }
      });
    },

    /* ---------------------------------------------------------------- */
    /* DRAWER + NAV                                                       */
    /* ---------------------------------------------------------------- */
    initDrawer: function () {
      var drawer = doc.getElementById('site-drawer');
      var backdrop = doc.getElementById('drawer-backdrop');
      if (!drawer) return;

      function open() {
        drawer.classList.add('is-open');
        drawer.setAttribute('aria-hidden', 'false');
        if (backdrop) backdrop.classList.add('is-open');
        doc.body.classList.add('is-locked');
        var focusable = drawer.querySelector('a, button');
        if (focusable) focusable.focus();
      }

      function close() {
        drawer.classList.remove('is-open');
        drawer.setAttribute('aria-hidden', 'true');
        if (backdrop) backdrop.classList.remove('is-open');
        doc.body.classList.remove('is-locked');
      }

      doc.querySelectorAll('[data-drawer-open]').forEach(function (btn) {
        btn.addEventListener('click', open);
      });
      doc.querySelectorAll('[data-drawer-close]').forEach(function (btn) {
        btn.addEventListener('click', close);
      });
      if (backdrop) backdrop.addEventListener('click', close);
      doc.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') close();
      });
      drawer.addEventListener('click', function (event) {
        if (event.target.closest('a')) close();
      });
    },

    /* ---------------------------------------------------------------- */
    /* SEARCH OVERLAY                                                     */
    /* ---------------------------------------------------------------- */
    initSearch: function () {
      var panel = doc.getElementById('site-search');
      if (!panel) return;
      var input = panel.querySelector('[data-search-input]');
      var results = panel.querySelector('[data-search-results]');
      var hint = panel.querySelector('[data-search-hint]');

      function open() {
        panel.classList.add('is-open');
        panel.setAttribute('aria-hidden', 'false');
        if (input) input.focus();
      }

      function close() {
        panel.classList.remove('is-open');
        panel.setAttribute('aria-hidden', 'true');
      }

      doc.querySelectorAll('[data-search-open]').forEach(function (btn) {
        btn.addEventListener('click', open);
      });
      doc.querySelectorAll('[data-search-close]').forEach(function (btn) {
        btn.addEventListener('click', close);
      });

      doc.addEventListener('keydown', function (event) {
        var tag = (event.target.tagName || '').toLowerCase();
        var typing = tag === 'input' || tag === 'textarea' || tag === 'select';
        if (event.key === '/' && !typing) {
          event.preventDefault();
          open();
        }
        if (event.key === 'Escape') close();
      });

      function render() {
        var query = input ? input.value : '';
        var found = global.Products.search(query);
        if (!results) return;

        if (!query.trim()) {
          results.innerHTML = '';
          if (hint) hint.hidden = false;
          return;
        }

        if (hint) hint.hidden = true;

        if (!found.length) {
          results.innerHTML =
            '<div class="empty">' +
              '<span class="empty__icon" aria-hidden="true">' + icon('search') + '</span>' +
              '<h3>No results found</h3>' +
              '<p>We could not find anything matching "' + UI.escapeHtml(query) +
              '". Try a cut such as ribs, wors, chicken or lamb.</p>' +
              '<a class="btn btn--ghost" href="shop.html?q=' + encodeURIComponent(query) + '">' +
                'Open the full shop</a>' +
            '</div>';
          return;
        }

        results.innerHTML = found.slice(0, 6).map(function (product) {
          var href = global.Products.productUrl(product.id);
          return '<a class="search__result" href="' + href + '">' +
            '<img src="' + product.image + '" alt="" loading="lazy" width="52" height="52" />' +
            '<span><h4>' + product.name + '</h4>' +
            '<span class="price">' + global.Products.categoryName(product.category) + ' &middot; ' +
            (product.price ? global.Products.formatPrice(product.price) + ' per ' + product.unit
              : 'Price to be confirmed') +
            '</span></span></a>';
        }).join('') +
        (found.length > 6
          ? '<a class="btn btn--ghost btn--block" href="shop.html?q=' + encodeURIComponent(query) + '">' +
            'See all ' + found.length + ' results</a>'
          : '');
      }

      if (input) {
        input.addEventListener('input', render);
        input.addEventListener('keydown', function (event) {
          if (event.key === 'Enter') {
            var query = input.value.trim();
            if (query) global.location.href = 'shop.html?q=' + encodeURIComponent(query);
          }
        });
      }
    },

    /* ---------------------------------------------------------------- */
    /* CURRENT PAGE + REVEAL + ACCORDIONS                                 */
    /* ---------------------------------------------------------------- */
    initCurrentPage: function () {
      var file = (global.location.pathname.split('/').pop() || 'index.html').toLowerCase();
      if (!file || file === '/') file = 'index.html';

      doc.querySelectorAll('[data-nav] a, [data-drawer-nav] a').forEach(function (link) {
        var href = (link.getAttribute('href') || '').split('?')[0].toLowerCase();
        if (href === file) link.setAttribute('aria-current', 'page');
      });
    },

    initReveal: function () {
      var items = doc.querySelectorAll('.reveal');
      if (!items.length) return;

      if (!('IntersectionObserver' in global) ||
          global.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        items.forEach(function (item) { item.classList.add('is-visible'); });
        return;
      }

      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

      items.forEach(function (item) { observer.observe(item); });
    },

    initAccordions: function () {
      doc.querySelectorAll('[data-accordion-trigger]').forEach(function (trigger) {
        trigger.addEventListener('click', function () {
          var expanded = trigger.getAttribute('aria-expanded') === 'true';
          trigger.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        });
      });
    },

    initHeaderState: function () {
      var header = doc.querySelector('.header');
      if (!header) return;
      function update() {
        header.classList.toggle('is-scrolled', global.scrollY > 8);
      }
      update();
      global.addEventListener('scroll', update, { passive: true });
    },

    /* ---------------------------------------------------------------- */
    /* DEMO FORMS — nothing is transmitted                                */
    /* ---------------------------------------------------------------- */
    initDemoForms: function () {
      doc.querySelectorAll('[data-demo-form]').forEach(function (form) {
        form.addEventListener('submit', function (event) {
          event.preventDefault();
          if (!form.reportValidity()) return;

          var targetId = form.getAttribute('data-success-target');
          var success = targetId ? doc.getElementById(targetId) : null;
          var formWrap = form.closest('[data-form-wrap]') || form;

          if (success) {
            var data = new FormData(form);
            var rows = '';
            data.forEach(function (value, key) {
              if (!String(value).trim()) return;
              rows += '<div class="summary__row"><span>' + UI.escapeHtml(key) + '</span><span>' +
                UI.escapeHtml(value) + '</span></div>';
            });
            var ref = form.getAttribute('data-ref-prefix') || 'IZW-DEMO';
            var reference = ref + '-' + String(Date.now()).slice(-6);

            success.innerHTML =
              '<span class="form-success__icon" aria-hidden="true">' + icon('check') + '</span>' +
              '<h3>Demo submission received</h3>' +
              '<p class="muted small measure">' + (form.getAttribute('data-success-message') ||
                'This was captured in your browser only. Nothing was emailed or sent to Izwelethu.') +
              '</p>' +
              '<div class="stack" style="width:100%;max-width:520px">' +
                '<div class="summary__row"><span>Reference</span><span class="strong">' + reference + '</span></div>' +
                rows +
              '</div>' +
              '<div class="row" style="justify-content:center">' +
                '<button type="button" class="btn btn--ember" data-whatsapp="enquiry">' +
                  icon('whatsapp') + 'Send this on WhatsApp instead</button>' +
                '<button type="button" class="btn btn--ghost" data-form-reset>Submit another demo request</button>' +
              '</div>';

            success.hidden = false;
            formWrap.hidden = true;
            success.setAttribute('tabindex', '-1');
            success.focus();
            global.WhatsApp.bind(success);
          }
        });
      });

      doc.addEventListener('click', function (event) {
        if (!event.target.closest('[data-form-reset]')) return;
        var success = event.target.closest('.form-success');
        if (!success) return;
        var form = doc.querySelector('[data-demo-form]');
        if (form) {
          form.reset();
          var wrap = form.closest('[data-form-wrap]');
          if (wrap) wrap.hidden = false;
        }
        success.hidden = true;
        success.innerHTML = '';
      });
    },

    /* Buttons that intentionally explain a concept-only feature instead of
       pretending to work. Keeps the demo free of dead buttons. */
    initDemoNotes: function () {
      doc.querySelectorAll('[data-demo-note]').forEach(function (node) {
        node.addEventListener('click', function (event) {
          event.preventDefault();
          UI.toast(node.getAttribute('data-demo-note') || UI.defaultNote(), { type: 'warn', duration: 4200 });
        });
      });
    },

    defaultNote: function () {
      return (global.IZWELETHU && global.IZWELETHU.notices.productionRequired) ||
        'Demo feature — production integration required.';
    },

    /* ---------------------------------------------------------------- */
    /* BOOT                                                               */
    /* ---------------------------------------------------------------- */
    init: function () {
      mountSprite();
      UI.initDrawer();
      UI.initSearch();
      UI.initCurrentPage();
      UI.initCartActions();
      UI.initAccordions();
      UI.initHeaderState();
      UI.initDemoForms();
      UI.initDemoNotes();
      UI.initReveal();
      global.WhatsApp.bind(doc);
      doc.body.classList.add('has-fixed-ui');
    }
  };

  global.UI = UI;
  doc.addEventListener('DOMContentLoaded', UI.init);
})(window);