/* ==========================================================================
   IZWELETHU BUTCHERY — DEMO CONCEPT
   js/filters.js
   --------------------------------------------------------------------------
   Shop page controller: client-side search, category, price, availability
   and sort — with URL state so filtered views can be linked or bookmarked.

   Product data lives in js/products.js. Nothing is hardcoded in shop.html.
   ========================================================================== */
(function (global) {
  'use strict';

  var doc = global.document;

  var SORTS = [
    { id: 'featured', label: 'Featured' },
    { id: 'price-asc', label: 'Price: low to high' },
    { id: 'price-desc', label: 'Price: high to low' },
    { id: 'name-asc', label: 'Name: A to Z' }
  ];

  function Filters() {}

  Filters.init = function () {
    var grid = doc.getElementById('shop-grid');
    if (!grid) return;

    var state = {
      query: '',
      category: 'all',
      maxPrice: null,
      availableOnly: false,
      sort: 'featured'
    };

    /* ---------------- element handles ---------------- */
    var els = {
      search: doc.querySelector('[data-shop-search]'),
      sort: doc.getElementById('shop-sort'),
      categories: doc.getElementById('filters-categories'),
      priceRange: doc.getElementById('shop-price-max'),
      priceOut: doc.getElementById('shop-price-out'),
      available: doc.getElementById('shop-available-only'),
      count: doc.getElementById('shop-count'),
      empty: doc.getElementById('shop-empty'),
      pills: doc.getElementById('shop-active-filters'),
      panel: doc.getElementById('shop-filters'),
      toggle: doc.querySelector('[data-filters-toggle]'),
      reset: doc.querySelector('[data-filters-reset]')
    };

    var range = global.Products.priceRange();
    var maxPrice = range.max || 2500;

    /* ---------------- URL state ---------------- */
    function readUrl() {
      var params = new URLSearchParams(global.location.search);

      state.query = params.get('q') || '';
      state.category = params.get('cat') || 'all';
      state.sort = params.get('sort') || 'featured';
      state.availableOnly = params.get('in') === '1';
      state.maxPrice = params.has('max') ? Math.min(Number(params.get('max')) || maxPrice, maxPrice) : null;
    }

    function writeUrl(replace) {
      var params = new URLSearchParams();
      if (state.query) params.set('q', state.query);
      if (state.category !== 'all') params.set('cat', state.category);
      if (state.sort !== 'featured') params.set('sort', state.sort);
      if (state.availableOnly) params.set('in', '1');
      if (state.maxPrice !== null && state.maxPrice < maxPrice) params.set('max', String(state.maxPrice));

      var url = params.toString() ? 'shop.html?' + params.toString() : 'shop.html';
      if (replace) global.history.replaceState(null, '', url);
      else global.history.pushState(null, '', url);
    }

    /* ---------------- filtering + sorting ---------------- */
    function currentResults() {
      var list = global.Products.all();

      if (state.query) {
        list = global.Products.search(state.query);
      }

      if (state.category !== 'all') {
        list = list.filter(function (p) { return p.category === state.category; });
      }

      if (state.availableOnly) {
        list = list.filter(function (p) { return p.available !== false; });
      }

      if (state.maxPrice !== null) {
        list = list.filter(function (p) { return !p.price || p.price <= state.maxPrice; });
      }

      return list.sort(function (a, b) {
        if (state.sort === 'price-asc') return (a.price || 0) - (b.price || 0);
        if (state.sort === 'price-desc') return (b.price || 0) - (a.price || 0);
        if (state.sort === 'name-asc') return a.name.localeCompare(b.name);
        return (a.sort || 0) - (b.sort || 0);
      });
    }

    /* ---------------- rendering ---------------- */
    function renderCategories() {
      if (!els.categories) return;
      var counts = global.Products.categoryCounts();
      var all = global.Products.all();

      var html = '<button type="button" class="filters__cat" data-cat="all" aria-pressed="' +
        (state.category === 'all') + '"><span>All products</span><span>' + all.length + '</span></button>';

      html += global.Products.categories().map(function (cat) {
        return '<button type="button" class="filters__cat" data-cat="' + cat.id + '" aria-pressed="' +
          (state.category === cat.id) + '">' +
          '<span>' + cat.name + '</span><span>' + (counts[cat.id] || 0) + '</span></button>';
      }).join('');

      els.categories.innerHTML = html;
    }

    function renderPills() {
      if (!els.pills) return;

      var pills = [];
      if (state.query) {
        pills.push({ key: 'q', label: 'Search: "' + state.query + '"' });
      }
      if (state.category !== 'all') {
        pills.push({ key: 'cat', label: global.Products.categoryName(state.category) });
      }
      if (state.availableOnly) {
        pills.push({ key: 'in', label: 'In stock only' });
      }
      if (state.maxPrice !== null && state.maxPrice < maxPrice) {
        pills.push({ key: 'max', label: 'Up to ' + global.Products.formatPrice(state.maxPrice) });
      }
      if (state.sort !== 'featured') {
        var label = 'Featured';
        SORTS.forEach(function (s) { if (s.id === state.sort) label = s.label; });
        pills.push({ key: 'sort', label: 'Sort: ' + label });
      }

      if (!pills.length) {
        els.pills.innerHTML = '';
        els.pills.hidden = true;
        return;
      }

      els.pills.hidden = false;
      els.pills.innerHTML = pills.map(function (pill) {
        return '<button type="button" class="pill-clear" data-clear="' + pill.key + '">' +
          global.UI.icon('close') + pill.label + '</button>';
      }).join('') + '<button type="button" class="pill-clear" data-clear="all">Clear all</button>';
    }

    function render() {
      var results = currentResults();

      renderCategories();

      if (els.count) {
        els.count.innerHTML = 'Showing <strong>' + results.length + '</strong> of ' +
          global.Products.all().length + ' demo products';
      }

      if (els.priceOut) {
        els.priceOut.value = state.maxPrice === null
          ? 'Any'
          : global.Products.formatPrice(state.maxPrice);
      }
      if (els.priceRange) {
        els.priceRange.value = String(state.maxPrice === null ? maxPrice : state.maxPrice);
      }
      if (els.available) els.available.checked = state.availableOnly;
      if (els.sort) els.sort.value = state.sort;
      if (els.search) els.search.value = state.query;

      grid.innerHTML = results.map(function (product) {
        return global.UI.productCard(product, { controls: 'qty' });
      }).join('');

      if (els.empty) {
        els.empty.hidden = results.length > 0;
      }

      renderPills();
    }

    /* ---------------- events ---------------- */
    function commit(push) {
      render();
      writeUrl(push !== false);
    }

    if (els.categories) {
      els.categories.addEventListener('click', function (event) {
        var btn = event.target.closest('[data-cat]');
        if (!btn) return;
        state.category = btn.getAttribute('data-cat');
        commit();
      });
    }

    if (els.search) {
      els.search.addEventListener('input', function () {
        state.query = els.search.value;
        commit(false);
      });
      els.search.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') event.preventDefault();
      });
    }

    if (els.sort) {
      els.sort.addEventListener('change', function () {
        state.sort = els.sort.value;
        commit();
      });
    }

    if (els.priceRange) {
      els.priceRange.addEventListener('input', function () {
        var value = Number(els.priceRange.value);
        state.maxPrice = value >= maxPrice ? null : value;
        commit(false);
      });
    }

    if (els.available) {
      els.available.addEventListener('change', function () {
        state.availableOnly = els.available.checked;
        commit();
      });
    }

    if (els.pills) {
      els.pills.addEventListener('click', function (event) {
        var btn = event.target.closest('[data-clear]');
        if (!btn) return;
        var key = btn.getAttribute('data-clear');
        if (key === 'all') {
          state.query = '';
          state.category = 'all';
          state.availableOnly = false;
          state.maxPrice = null;
          state.sort = 'featured';
        } else if (key === 'q') state.query = '';
        else if (key === 'cat') state.category = 'all';
        else if (key === 'in') state.availableOnly = false;
        else if (key === 'max') state.maxPrice = null;
        else if (key === 'sort') state.sort = 'featured';
        commit();
      });
    }

    if (els.reset) {
      els.reset.addEventListener('click', function () {
        state.query = '';
        state.category = 'all';
        state.availableOnly = false;
        state.maxPrice = null;
        state.sort = 'featured';
        commit();
      });
    }

    if (els.toggle && els.panel) {
      els.toggle.addEventListener('click', function () {
        var open = els.panel.classList.toggle('is-open');
        els.toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }

    global.addEventListener('popstate', function () {
      readUrl();
      render();
    });

    /* ---------------- boot ---------------- */
    readUrl();
    render();
    writeUrl(true);
  };

  doc.addEventListener('DOMContentLoaded', Filters.init);
  global.Filters = Filters;
})(window);