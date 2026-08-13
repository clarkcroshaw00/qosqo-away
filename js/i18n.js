(function () {
  function applyLang(lang) {
    document.querySelectorAll('[data-es]').forEach(function (el) {
      if (el.dataset.en === undefined) { el.dataset.en = el.textContent; }
      el.textContent = lang === 'es' ? el.dataset.es : el.dataset.en;
    });
    document.querySelectorAll('[data-es-placeholder]').forEach(function (el) {
      if (el.dataset.enPlaceholder === undefined) { el.dataset.enPlaceholder = el.getAttribute('placeholder') || ''; }
      el.setAttribute('placeholder', lang === 'es' ? el.dataset.esPlaceholder : el.dataset.enPlaceholder);
    });
    document.documentElement.lang = lang;
    var toggle = document.getElementById('lang-toggle');
    if (toggle) {
      toggle.querySelectorAll('[data-lang-opt]').forEach(function (btn) {
        var isActive = btn.getAttribute('data-lang-opt') === lang;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });
    }
    try { localStorage.setItem('qa-lang', lang); } catch (e) {}
  }

  window.qaSetLang = applyLang;

  document.addEventListener('DOMContentLoaded', function () {
    var saved = 'en';
    try { saved = localStorage.getItem('qa-lang') || 'en'; } catch (e) {}
    applyLang(saved);
    var toggle = document.getElementById('lang-toggle');
    if (toggle) {
      toggle.querySelectorAll('[data-lang-opt]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          applyLang(btn.getAttribute('data-lang-opt'));
        });
      });
    }
  });
})();
