/* Menttor — selector de moneda de pago (USD -> Hotmart / Bs -> Guaybo)
   Uso: en el boton de compra agrega  class="js-pay"  data-usd="LINK_HOTMART"  data-bs="LINK_GUAYBO"
   El href del boton se mantiene como respaldo si el JS no carga. */
(function () {
  var overlay = null;
  function t(es, en) { return window.__t ? window.__t(es, en) : es; }

  function build() {
    overlay = document.createElement('div');
    overlay.className = 'pay-overlay';
    overlay.hidden = true;
    overlay.innerHTML =
      '<div class="pay-modal" role="dialog" aria-modal="true" aria-labelledby="pay-title">' +
        '<button type="button" class="pay-close" aria-label="Cerrar">&times;</button>' +
        '<p class="pay-eyebrow" id="pay-eyebrow"></p>' +
        '<h3 class="pay-title" id="pay-title"></h3>' +
        '<p class="pay-sub" id="pay-sub"></p>' +
        '<a class="pay-opt pay-opt-usd" id="pay-usd" target="_blank" rel="noopener noreferrer">' +
          '<span class="pay-opt-main" id="pay-usd-label"></span>' +
          '<span class="pay-opt-note" id="pay-usd-note"></span>' +
        '</a>' +
        '<p class="pay-hint" id="pay-usd-hint"></p>' +
        '<a class="pay-opt pay-opt-bs" id="pay-bs" target="_blank" rel="noopener noreferrer">' +
          '<span class="pay-opt-main" id="pay-bs-label"></span>' +
          '<span class="pay-opt-note" id="pay-bs-note"></span>' +
        '</a>' +
      '</div>';
    document.body.appendChild(overlay);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
    overlay.querySelector('.pay-close').addEventListener('click', close);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && overlay && !overlay.hidden) close(); });
    overlay.querySelector('#pay-usd').addEventListener('click', function () { setTimeout(close, 120); });
    overlay.querySelector('#pay-bs').addEventListener('click', function () { setTimeout(close, 120); });
  }

  function q(id) { return overlay.querySelector(id); }

  function open(usd, bs) {
    if (!overlay) build();
    q('#pay-eyebrow').textContent = t('PAGO ÚNICO · ACCESO INMEDIATO', 'ONE-TIME · INSTANT ACCESS');
    q('#pay-title').textContent = t('¿Cómo quieres pagar?', 'How would you like to pay?');
    q('#pay-sub').textContent = t('Elige tu moneda y te llevamos al pago seguro.', 'Choose your currency and we’ll take you to secure checkout.');

    var u = q('#pay-usd');
    if (usd) { u.href = usd; u.style.display = ''; } else { u.style.display = 'none'; }
    q('#pay-usd-label').textContent = t('Pagar en dólares (USD)', 'Pay in US dollars (USD)');
    q('#pay-usd-note').textContent = t('Tarjeta internacional · Hotmart', 'International card · Hotmart');

    var hint = q('#pay-usd-hint');
    if (usd) {
      hint.textContent = bs
        ? t('¿Estás en Venezuela? Es posible que necesites una VPN para completar el pago en dólares. Si lo prefieres, paga en bolívares con la opción de abajo.',
            'In Venezuela? You may need a VPN to complete the USD payment. If you prefer, pay in bolívares using the option below.')
        : t('¿Estás en Venezuela? Es posible que necesites una VPN para completar el pago en dólares.',
            'In Venezuela? You may need a VPN to complete the USD payment.');
      hint.style.display = '';
    } else { hint.style.display = 'none'; }

    var b = q('#pay-bs');
    if (bs) { b.href = bs; b.style.display = ''; } else { b.style.display = 'none'; }
    q('#pay-bs-label').textContent = t('Pagar en bolívares (Bs)', 'Pay in bolívares (Bs)');
    q('#pay-bs-note').textContent = t('Pago móvil / transferencia · Guaybo', 'Mobile payment / transfer · Guaybo');

    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function close() {
    if (overlay) { overlay.hidden = true; document.body.style.overflow = ''; }
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest ? e.target.closest('.js-pay') : null;
    if (!el) return;
    var usd = el.getAttribute('data-usd');
    var bs = el.getAttribute('data-bs');
    if (!usd && !bs) return; // sin configurar -> deja el comportamiento normal del enlace
    e.preventDefault();
    open(usd, bs);
  }, false);
})();
