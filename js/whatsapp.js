/* ==========================================================================
   IZWELETHU BUTCHERY — DEMO CONCEPT
   js/whatsapp.js
   --------------------------------------------------------------------------
   WhatsApp commerce concept.

   DESIGN RULES
   1. The number exists ONLY in js/demo-data.js (IZWELETHU.WHATSAPP_NUMBER).
      Never duplicate it in markup or CSS.
   2. Opening WhatsApp does NOT confirm an order. The message asks Izwelethu
      to confirm availability and the final price, and it deliberately omits
      the demo prices shown on screen.
   3. If the number has not been verified (i.e. it is not a WhatsApp-enabled
      number), the demo still opens wa.me so the flow can be demonstrated.
      Verify the number before any real launch.
   ========================================================================== */
(function (global) {
  'use strict';

  var CONFIG = global.IZWELETHU;

  /* ------------------------------------------------------------------ */
  /* MESSAGE BUILDING                                                    */
  /* ------------------------------------------------------------------ */

  /* Formats one line the way a butcher would read it:
     "2kg Beef Ribs"  ·  "1 x Whole Chicken"  ·  "1 dozen Eggs"           */
  function formatLine(line) {
    var product = line.product;
    var qty = Math.round((Number(line.qty) || 0) * 100) / 100;
    var qtyLabel = String(qty);
    var unit = product.unit || '';

    if (unit === 'kg') return qtyLabel + 'kg ' + product.name;
    if (unit === 'dozen') return qtyLabel + ' dozen ' + product.name;
    if (unit === 'each') return qtyLabel + ' x ' + product.name;
    return qtyLabel + (unit ? ' ' + unit + ' ' : ' x ') + product.name;
  }

  /* Full order message for the cart */
  function buildOrderMessage(lines) {
    var body = lines.map(formatLine).join('\n');
    return [
      "Hi Izwelethu, I'd like to place an order:",
      '',
      body,
      '',
      'Please confirm availability and the final price.',
      'Thank you.'
    ].join('\n');
  }

  /* Single-product message (product page button) */
  function buildProductMessage(product, qty) {
    var line = { product: product, qty: Number(qty) || product.minQty || 1 };
    var body = formatLine(line);
    return [
      "Hi Izwelethu, I'd like to place an order:",
      '',
      body,
      '',
      'Please confirm availability and the final price.',
      'Thank you.'
    ].join('\n');
  }

  /* General enquiry (header CTA, contact page, events) */
  function buildEnquiryMessage(prefix) {
    return [
      "Hi Izwelethu,",
      '',
      prefix || 'I would like to make an enquiry.',
      '',
      'Please let me know how to proceed.',
      'Thank you.'
    ].join('\n');
  }

  /* ------------------------------------------------------------------ */
  /* OPENING WHATSAPP                                                    */
  /* ------------------------------------------------------------------ */
  function link(message) {
    var number = String(CONFIG.WHATSAPP_NUMBER).replace(/[^0-9]/g, '');
    return 'https://wa.me/' + number + '?text=' + encodeURIComponent(message);
  }

  function open(message) {
    var url = link(message);
    var win = global.open(url, '_blank', 'noopener');
    if (!win) {
      global.location.href = url;
    }
    if (global.UI && global.UI.toast) {
      global.UI.toast('WhatsApp opened with your order message. Izwelethu still needs to confirm it.');
    }
  }

  /* ------------------------------------------------------------------ */
  /* PUBLIC ACTIONS                                                      */
  /* ------------------------------------------------------------------ */
  var WhatsApp = {
    formatLine: formatLine,

    orderFromCart: function () {
      var items = global.Cart.items();
      if (!items.length) {
        global.UI.toast('Your demo cart is empty');
        return;
      }
      open(buildOrderMessage(items));
    },

    orderProduct: function (product, qty) {
      if (!product) return;
      open(buildProductMessage(product, qty));
    },

    enquiry: function (prefix) {
      open(buildEnquiryMessage(prefix));
    },

    url: function (message) {
      return link(message || buildEnquiryMessage());
    },

    /* Binds every [data-whatsapp] button:
       data-whatsapp="cart"    -> whole demo cart
       data-whatsapp="enquiry" -> generic enquiry
       data-whatsapp-text      -> custom opening line
       data-wa-product / data-wa-qty -> single product                      */
    bind: function (root) {
      var scope = root || document;
      scope.querySelectorAll('[data-whatsapp]').forEach(function (btn) {
        if (btn.dataset.waBound === 'true') return;
        btn.dataset.waBound = 'true';

        btn.addEventListener('click', function (event) {
          event.preventDefault();

          var productId = btn.getAttribute('data-wa-product');
          if (productId) {
            var product = global.Products.byId(productId);
            if (!product) return;
            var qty = Number(btn.getAttribute('data-wa-qty')) || 1;
            WhatsApp.orderProduct(product, qty);
            return;
          }

          var mode = btn.getAttribute('data-whatsapp');
          if (mode === 'cart') {
            WhatsApp.orderFromCart();
            return;
          }

          WhatsApp.enquiry(btn.getAttribute('data-whatsapp-text') || undefined);
        });
      });
    }
  };

  global.WhatsApp = WhatsApp;
})(window);