/* ==========================================================================
   IZWELETHU BUTCHERY — DEMO CONCEPT
   js/cart.js
   --------------------------------------------------------------------------
   Client-side cart backed by localStorage so the demo cart survives a page
   refresh. DEMO ONLY — there is no server, no payment and no order record.

   Storage is versioned so a future production build can migrate cleanly.
   ========================================================================== */
(function (global) {
  'use strict';

  var STORAGE_KEY = 'izwelethu.demo.cart.v1';
  var listeners = [];

  /* ------------------------------------------------------------------ */
  /* STORAGE                                                             */
  /* ------------------------------------------------------------------ */
  function read() {
    try {
      var raw = global.localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      var parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed
        .filter(function (line) {
          return line && typeof line.id === 'string' &&
            global.Products && global.Products.byId(line.id);
        })
        .map(function (line) {
          var product = global.Products.byId(line.id);
          var qty = Number(line.qty) || 0;
          var step = product.qtyStep || 1;
          qty = Math.max(product.minQty || step, Math.round(qty / step) * step);
          return { id: product.id, qty: qty };
        });
    } catch (err) {
      return [];
    }
  }

  function write(lines) {
    try {
      global.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch (err) {
      /* storage unavailable (private mode / file restrictions) — continue in-memory */
    }
  }

  function emit() {
    var snapshot = Cart.items();
    listeners.forEach(function (fn) {
      try { fn(snapshot); } catch (err) { /* keep other listeners working */ }
    });
  }

  /* ------------------------------------------------------------------ */
  /* PUBLIC API                                                          */
  /* ------------------------------------------------------------------ */
  var Cart = {
    /* raw lines */
    lines: function () {
      return read();
    },

    /* resolved cart lines (product object + qty + line total) */
    items: function () {
      return read().map(function (line) {
        var product = global.Products.byId(line.id);
        var price = Number(product.price) || 0;
        return {
          id: product.id,
          product: product,
          qty: line.qty,
          lineTotal: price * line.qty
        };
      });
    },

    count: function () {
      return read().reduce(function (sum, line) { return sum + line.qty; }, 0);
    },

    itemCount: function () {
      return read().length;
    },

    isEmpty: function () {
      return read().length === 0;
    },

    subtotal: function () {
      return Cart.items().reduce(function (sum, line) { return sum + line.lineTotal; }, 0);
    },

    has: function (id) {
      return read().some(function (line) { return line.id === id; });
    },

    qtyOf: function (id) {
      var found = read().filter(function (line) { return line.id === id; })[0];
      return found ? found.qty : 0;
    },

    add: function (id, qty) {
      var product = global.Products.byId(id);
      if (!product || !product.available) return false;

      var step = product.qtyStep || 1;
      var amount = Number(qty) > 0 ? Number(qty) : step;
      var lines = read();
      var existing = lines.filter(function (line) { return line.id === id; })[0];

      if (existing) {
        existing.qty = Math.min(product.maxQty || 999, existing.qty + amount);
      } else {
        lines.push({ id: id, qty: Math.min(product.maxQty || 999, Math.max(product.minQty || step, amount)) });
      }

      write(lines);
      emit();
      return true;
    },

    setQty: function (id, qty) {
      var product = global.Products.byId(id);
      if (!product) return false;

      var step = product.qtyStep || 1;
      var min = product.minQty || step;
      var max = product.maxQty || 999;
      var amount = Number(qty) > 0 ? Number(qty) : min;
      amount = Math.min(max, Math.max(min, Math.round(amount / step) * step));

      var lines = read();
      var existing = lines.filter(function (line) { return line.id === id; })[0];
      if (!existing) return false;
      existing.qty = amount;

      write(lines);
      emit();
      return true;
    },

    remove: function (id) {
      var lines = read().filter(function (line) { return line.id !== id; });
      write(lines);
      emit();
      return true;
    },

    clear: function () {
      write([]);
      emit();
      return true;
    },

    onChange: function (fn) {
      if (typeof fn === 'function') listeners.push(fn);
    },

    /* Writes a short plain-text summary used by the WhatsApp builder */
    summaryLines: function () {
      return Cart.items().map(function (line) {
        var qty = line.qty;
        var qtyLabel = (Math.round(qty * 100) / 100).toString();
        return qtyLabel + (line.product.unit === 'kg' ? 'kg ' : ' x ') + line.product.name +
          ' (' + global.Products.formatPrice(line.product.price) + ' per ' + line.product.unit + ')';
      });
    }
  };

  /* ------------------------------------------------------------------ */
  /* HEADER COUNT BADGES                                                 */
  /* ------------------------------------------------------------------ */
  function paintBadges(count) {
    var badges = document.querySelectorAll('.cart-count');
    for (var i = 0; i < badges.length; i++) {
      var badge = badges[i];
      badge.textContent = String(count);
      badge.setAttribute('data-empty', count === 0 ? 'true' : 'false');
      var parentBtn = badge.closest ? badge.closest('a, button') : null;
      if (parentBtn) {
        var label = count === 0 ? 'Cart, empty' : 'Cart, ' + count + ' items';
        parentBtn.setAttribute('aria-label', label);
      }
    }
    document.querySelectorAll('[data-cart-count-text]').forEach(function (node) {
      node.textContent = count === 1 ? '1 item' : count + ' items';
    });
  }

  Cart.paintBadges = paintBadges;
  Cart.initBadges = function () {
    paintBadges(Cart.count());
    Cart.onChange(function () { paintBadges(Cart.count()); });
  };

  /* ------------------------------------------------------------------ */
  /* CART PAGE                                                           */
  /* ------------------------------------------------------------------ */
  function renderEmpty() {
    var list = document.getElementById('cart-items');
    var summary = document.getElementById('cart-summary');
    var checkout = document.getElementById('checkout-block');
    if (!list) return;

    if (Cart.isEmpty()) {
      if (summary) summary.hidden = true;
      if (checkout) checkout.hidden = true;
      list.innerHTML =
        '<div class="empty">' +
        '<span class="empty__icon" aria-hidden="true">' + global.UI.icon('search') + '</span>' +
        '<h3>Your demo cart is empty</h3>' +
        '<p>Add a cut, a pack or a bulk box to see how an Izwelethu order would be built up.</p>' +
        '<a class="btn btn--accent" href="shop.html">Browse the shop</a>' +
        '</div>';
      return;
    }

    if (summary) summary.hidden = false;
    if (checkout) checkout.hidden = false;
    renderLines(list);
    renderSummary(summary);
  }

  function renderLines(list) {
    var items = Cart.items();

    list.innerHTML = items.map(function (line) {
      var p = line.product;
      var step = p.qtyStep || 1;
      var href = global.Products.productUrl(p.id);
      return '' +
        '<article class="cart-item" data-line="' + p.id + '">' +
          '<a class="cart-item__media" href="' + href + '" tabindex="-1" aria-hidden="true">' +
            '<img src="' + p.image + '" alt="" loading="lazy" width="220" height="220" />' +
          '</a>' +
          '<div>' +
            '<div class="cart-item__head">' +
              '<div>' +
                '<a class="cart-item__title" href="' + href + '">' + p.name + '</a>' +
                '<div class="cart-item__meta">' + global.Products.categoryName(p.category) +
                  ' &middot; ' + global.Products.formatPrice(p.price) + ' per ' + p.unit + ' (demo)</div>' +
              '</div>' +
              '<div class="strong nowrap">' + global.Products.formatPrice(line.lineTotal) + '</div>' +
            '</div>' +
            '<div class="cart-item__foot">' +
              '<div class="stepper" role="group" aria-label="Quantity for ' + p.name + '">' +
                '<button type="button" data-step-down aria-label="Decrease quantity of ' + p.name + '">' +
                  global.UI.icon('minus') +
                '</button>' +
                '<input type="number" value="' + line.qty + '" min="' + (p.minQty || step) +
                  '" max="' + (p.maxQty || 999) + '" step="' + step +
                  '" data-qty-input aria-label="Quantity of ' + p.name + '" />' +
                '<button type="button" data-step-up aria-label="Increase quantity of ' + p.name + '">' +
                  global.UI.icon('plus') +
                '</button>' +
              '</div>' +
              '<button type="button" class="cart-item__remove" data-remove="' + p.id + '">' +
                global.UI.icon('trash') + 'Remove' +
              '</button>' +
            '</div>' +
          '</div>' +
        '</article>';
    }).join('');
  }

  function renderSummary(summary) {
    if (!summary) return;
    var items = Cart.items();
    var subtotal = Cart.subtotal();
    var count = Cart.count();
    var packs = items.filter(function (l) { return l.product.category === 'braai-packs'; }).length;
    var bulk = items.filter(function (l) { return l.product.category === 'bulk-wholesale'; }).length;

    summary.innerHTML = '' +
      '<h2 class="h2" style="font-size:1.4rem">Order summary</h2>' +
      '<div class="summary__row"><span>Items</span><span>' + count + '</span></div>' +
      (packs ? '<div class="summary__row"><span>Demo packs included</span><span>' + packs + '</span></div>' : '') +
      (bulk ? '<div class="summary__row"><span>Bulk lines included</span><span>' + bulk + '</span></div>' : '') +
      '<div class="summary__row"><span>Delivery / collection</span><span>To be confirmed</span></div>' +
      '<div class="summary__row summary__row--total"><span>Demo total</span><span>' +
        global.Products.formatPrice(subtotal) + '</span></div>' +
      '<p class="summary__note">' + (global.IZWELETHU.notices.demoPrices) + '</p>' +
      '<div class="summary__actions">' +
        '<button type="button" class="btn btn--ember btn--block" data-whatsapp-order>' +
          global.UI.icon('whatsapp') + 'Order on WhatsApp' +
        '</button>' +
        '<a class="btn btn--ghost btn--block" href="#checkout-block">Checkout demo</a>' +
        '<a class="btn btn--ghost btn--block" href="shop.html">Continue shopping</a>' +
        '<button type="button" class="btn btn--ghost btn--block" data-clear-cart>Clear demo cart</button>' +
      '</div>';
  }

  function wireCartPage() {
    var list = document.getElementById('cart-items');
    if (!list) return;

    document.addEventListener('click', function (event) {
      var up = event.target.closest('[data-step-up]');
      var down = event.target.closest('[data-step-down]');
      var remove = event.target.closest('[data-remove]');
      var clear = event.target.closest('[data-clear-cart]');

      if (up || down) {
        var wrap = (up || down).closest('[data-line]');
        if (!wrap) return;
        var id = wrap.getAttribute('data-line');
        var product = global.Products.byId(id);
        var step = product.qtyStep || 1;
        var current = Cart.qtyOf(id);
        var next = (up ? current + step : current - step);
        if (next < (product.minQty || step)) {
          Cart.remove(id);
          global.UI.toast(product.name + ' removed from the demo cart');
        } else {
          Cart.setQty(id, next);
        }
        return;
      }

      if (remove) {
        var removedId = remove.getAttribute('data-remove');
        var removedProduct = global.Products.byId(removedId);
        Cart.remove(removedId);
        global.UI.toast((removedProduct ? removedProduct.name : 'Item') + ' removed from the demo cart');
        return;
      }

      if (clear) {
        Cart.clear();
        global.UI.toast('Demo cart cleared');
        return;
      }

      /* Delegated so it keeps working after the summary is re-rendered */
      if (event.target.closest('[data-whatsapp-order]')) {
        event.preventDefault();
        if (Cart.isEmpty()) {
          global.UI.toast('Your demo cart is empty');
          return;
        }
        global.WhatsApp.orderFromCart();
      }
    });

    list.addEventListener('change', function (event) {
      var input = event.target.closest('[data-qty-input]');
      if (!input) return;
      var wrap = input.closest('[data-line]');
      if (!wrap) return;
      Cart.setQty(wrap.getAttribute('data-line'), input.value);
    });

    Cart.onChange(function () { renderEmpty(); });
    renderEmpty();
  }

  /* ------------------------------------------------------------------ */
  /* DEMO CHECKOUT                                                       */
  /* ------------------------------------------------------------------ */
  function wireCheckout() {
    var form = document.getElementById('demo-checkout-form');
    if (!form) return;

    var success = document.getElementById('checkout-success');
    var block = document.getElementById('checkout-block');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;

      var ref = 'IZW-DEMO-' + String(Date.now()).slice(-6);
      var name = (form.elements.name.value || '').trim();
      var fulfilment = form.elements.fulfilment.value;
      var data = new FormData(form);

      var summaryHtml =
        '<div class="stack">' +
          '<div class="summary__row"><span>Reference</span><span class="strong">' + ref + '</span></div>' +
          '<div class="summary__row"><span>Name</span><span>' + escapeHtml(name) + '</span></div>' +
          '<div class="summary__row"><span>Phone</span><span>' + escapeHtml(data.get('phone')) + '</span></div>' +
          '<div class="summary__row"><span>Method</span><span>' +
            (fulfilment === 'delivery' ? 'Delivery (address captured)' : 'Collection (address captured)') +
          '</span></div>' +
          '<div class="summary__row summary__row--total"><span>Demo total</span><span>' +
            global.Products.formatPrice(Cart.subtotal()) + '</span></div>' +
        '</div>';

      if (success) {
        success.hidden = false;
        success.innerHTML =
          '<span class="form-success__icon" aria-hidden="true">' + global.UI.icon('check') + '</span>' +
          '<h3>Demo order received</h3>' +
          '<p class="muted small measure">This submission was processed in your browser only. ' +
          'Nothing was emailed, messaged or sent to Izwelethu, and no payment was taken. ' +
          'In production this step would create an order for the business to confirm.</p>' +
          summaryHtml +
          '<div class="row" style="justify-content:center">' +
            '<button type="button" class="btn btn--ember" data-whatsapp-order>' +
              global.UI.icon('whatsapp') + 'Send this order on WhatsApp instead' +
            '</button>' +
            '<a class="btn btn--ghost" href="shop.html">Keep shopping</a>' +
          '</div>';
      }

      if (block) block.hidden = true;
      if (success) {
        success.setAttribute('tabindex', '-1');
        success.focus();
      }
    });
  }

  function escapeHtml(value) {
    return String(value === undefined || value === null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  Cart.escapeHtml = escapeHtml;

  /* ------------------------------------------------------------------ */
  /* BOOT                                                                */
  /* ------------------------------------------------------------------ */
  Cart.init = function () {
    Cart.initBadges();
    wireCartPage();
    wireCheckout();
  };

  document.addEventListener('DOMContentLoaded', Cart.init);
  global.Cart = Cart;
})(window);