/* Menttor — toggle de idioma ES/EN (client-side, sin dependencias) */
(function () {
  var KEY = 'menttor_lang';
  function apply(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-en]').forEach(function (el) {
      if (el.getAttribute('data-es') === null) el.setAttribute('data-es', el.innerHTML);
      el.innerHTML = (lang === 'en') ? el.getAttribute('data-en') : el.getAttribute('data-es');
    });
    document.querySelectorAll('[data-en-ph]').forEach(function (el) {
      if (el.getAttribute('data-es-ph') === null) el.setAttribute('data-es-ph', el.getAttribute('placeholder') || '');
      el.setAttribute('placeholder', (lang === 'en') ? el.getAttribute('data-en-ph') : el.getAttribute('data-es-ph'));
    });
    document.querySelectorAll('[data-lang-btn]').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-lang-btn') === lang);
    });
    try { localStorage.setItem(KEY, lang); } catch (e) {}
  }
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  var initial = saved || (((navigator.language || 'es').toLowerCase().indexOf('en') === 0) ? 'en' : 'es');
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-lang-btn]');
    if (b) { e.preventDefault(); apply(b.getAttribute('data-lang-btn')); }
  });
  // helper para textos dinámicos (mensajes de formularios, etc.)
  window.__t = function (es, en) { return (document.documentElement.lang === 'en') ? en : es; };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { apply(initial); });
  } else {
    apply(initial);
  }
})();
