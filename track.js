/* Meta Pixel + API de Conversiones — anaceliarosas.com
   Cada evento sale por el Pixel (navegador) y por /api/capi (servidor) con el
   mismo event_id para que Meta lo deduplique. */
(function () {
  var PIXEL_ID = '923008885776318';
  var CONTENT = { content_name: 'Mega Curso Stamp Crochet', content_ids: ['stamp-crochet-mega-curso'], content_type: 'product', value: 297, currency: 'USD' };

  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
  document,'script','https://connect.facebook.net/en_US/fbevents.js');

  function cookie(name) {
    var m = document.cookie.match('(?:^|; )' + name + '=([^;]*)');
    return m ? decodeURIComponent(m[1]) : undefined;
  }
  function uuid() {
    return (window.crypto && crypto.randomUUID) ? crypto.randomUUID()
      : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = Math.random() * 16 | 0; return (c === 'x' ? r : (r & 3 | 8)).toString(16);
        });
  }
  function safe(fn) { try { return fn(); } catch (e) {} }

  // external_id propio (primera parte) para unir sesiones y mejorar la coincidencia
  var externalId = safe(function () {
    var id = localStorage.getItem('acr_eid');
    if (!id) { id = uuid(); localStorage.setItem('acr_eid', id); }
    return id;
  });

  // fbc: si llega fbclid y aún no hay cookie _fbc, se construye (formato oficial de Meta)
  safe(function () {
    var q = new URLSearchParams(location.search).get('fbclid');
    if (q && !cookie('_fbc')) {
      var v = 'fb.1.' + Date.now() + '.' + q;
      document.cookie = '_fbc=' + v + ';path=/;max-age=7776000;SameSite=Lax';
    }
  });

  // Consentimiento: el Pixel y la API de Conversiones no envían nada hasta que la persona acepta.
  var consent = safe(function () { return localStorage.getItem('acr_consent'); }); // 'granted' | 'denied' | null
  if (consent !== 'granted') fbq('consent', 'revoke');
  fbq('init', PIXEL_ID, externalId ? { external_id: externalId } : {});

  // UTM y código de anuncio (A1, A2…) de la visita; se guardan por sesión
  var utm = safe(function () {
    var saved = JSON.parse(sessionStorage.getItem('acr_utm') || 'null');
    var q = new URLSearchParams(location.search), cur = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(function (k) { if (q.get(k)) cur[k] = q.get(k).slice(0, 120); });
    if (Object.keys(cur).length) { sessionStorage.setItem('acr_utm', JSON.stringify(cur)); return cur; }
    return saved || {};
  }) || {};
  var m = (utm.utm_content || '').match(/(?:^|[^A-Za-z0-9])([A-Z]\d{1,2})(?![A-Za-z0-9])/);
  var adCode = m ? m[1] : '';
  var pending = [];
  function post(body) {
    if (navigator.sendBeacon) {
      var ok = safe(function () { return navigator.sendBeacon('/api/capi', new Blob([body], { type: 'application/json' })); });
      if (ok) return;
    }
    safe(function () { fetch('/api/capi', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body, keepalive: true }); });
  }
  window.acrConsent = function (choice) {
    consent = choice;
    safe(function () { localStorage.setItem('acr_consent', choice); });
    if (choice === 'granted') { fbq('consent', 'grant'); pending.splice(0).forEach(post); }
    else { fbq('consent', 'revoke'); pending.length = 0; }
  };

  var STANDARD = { PageView: 1, ViewContent: 1, InitiateCheckout: 1, Contact: 1 };
  var fired = {};

  function send(name, params, opts) {
    opts = opts || {};
    if (opts.once) { if (fired[name]) return; fired[name] = true; }
    var id = uuid();
    var data = Object.assign({}, utm, params || {});
    if (STANDARD[name]) fbq('track', name, data, { eventID: id });
    else fbq('trackCustom', name, data, { eventID: id });

    var body = JSON.stringify({
      event_name: name, event_id: id, event_source_url: location.href,
      fbp: cookie('_fbp'), fbc: cookie('_fbc'), external_id: externalId, custom_data: data
    });
    if (consent === 'granted') post(body);
    else if (consent !== 'denied') pending.push(body);
  }
  window.acrTrack = send;

  send('PageView');
  send('ViewContent', CONTENT, { once: true });

  document.addEventListener('DOMContentLoaded', function () {
    // Banner de cookies
    function banner() {
      if (document.getElementById('acrCookie')) return;
      var b = document.createElement('div');
      b.id = 'acrCookie'; b.className = 'cookie'; b.setAttribute('role', 'dialog'); b.setAttribute('aria-label', 'Preferencias de cookies');
      b.innerHTML = '<p>Usamos cookies de Meta para medir qué anuncios funcionan y mostrarte contenido relevante. <a href="privacidad.html">Más información</a></p>' +
        '<div class="cookie-btns"><button type="button" data-c="denied">Solo lo necesario</button><button type="button" data-c="granted" class="ok">Aceptar</button></div>';
      b.addEventListener('click', function (e) {
        var c = e.target && e.target.getAttribute && e.target.getAttribute('data-c');
        if (c) { window.acrConsent(c); b.remove(); }
      });
      document.body.appendChild(b);
      var first = b.querySelector('.ok'); if (first) first.focus({ preventScroll: true });
    }
    window.acrConsentOpen = banner;
    if (!consent) banner();
    document.querySelectorAll('[data-cookie-prefs]').forEach(function (el) { el.addEventListener('click', banner); });

    // Código de anuncio en el mensaje de WhatsApp
    if (adCode) document.querySelectorAll('a[href^="https://wa.me"]').forEach(function (a) {
      try { var u = new URL(a.href); u.searchParams.set('text', (u.searchParams.get('text') || 'Hola') + ' (' + adCode + ')'); a.href = u.toString(); } catch (e) {}
    });

    // CTAs: intención (clic hacia el precio) vs. salida a checkout
    document.querySelectorAll('[data-cta]').forEach(function (el) {
      el.addEventListener('click', function () {
        var t = el.dataset.cta;
        if (t === 'checkout-nas') send('InitiateCheckout', CONTENT);
        else send('CTAClick', { content_name: CONTENT.content_name, cta_location: t });
      });
    });

    // WhatsApp / correo = Contact
    document.querySelectorAll('a[href^="https://wa.me"], a[href^="mailto:"]').forEach(function (el) {
      el.addEventListener('click', function () {
        send('Contact', { contact_method: el.href.indexOf('wa.me') > -1 ? 'whatsapp' : 'email' });
      });
    });

    // Sección de precio vista
    var precio = document.getElementById('precio');
    if (precio && 'IntersectionObserver' in window) {
      var po = new IntersectionObserver(function (es) {
        if (es[0].isIntersecting) { send('ViewPricing', CONTENT, { once: true }); po.disconnect(); }
      }, { threshold: .35 });
      po.observe(precio);
    }

    // FAQ abierta
    document.querySelectorAll('.faq-q').forEach(function (q) {
      q.addEventListener('click', function () {
        if (q.getAttribute('aria-expanded') === 'true') send('FAQOpen', { question: q.textContent.replace('+', '').trim().slice(0, 80) });
      });
    });

    // Video: reproducción y avance
    document.querySelectorAll('video').forEach(function (v, i) {
      var label = v.id || ('video-' + i);
      var marks = { 25: 0, 50: 0, 75: 0 };
      v.addEventListener('play', function () { if (!v.muted || v.controls) send('VideoPlay', { video: label }, { once: false }); }, { once: true });
      v.addEventListener('timeupdate', function () {
        if (!v.duration) return;
        var pct = v.currentTime / v.duration * 100;
        [25, 50, 75].forEach(function (m) {
          if (pct >= m && !marks[m] && (v.controls || !v.muted)) { marks[m] = 1; send('VideoProgress', { video: label, percent: m }); }
        });
      });
    });
  });

  // Profundidad de scroll
  var depths = [25, 50, 75, 90];
  window.addEventListener('scroll', function () {
    var h = document.documentElement.scrollHeight - innerHeight;
    if (h <= 0) return;
    var p = scrollY / h * 100;
    depths.forEach(function (d) { if (p >= d) send('Scroll' + d, { percent: d }, { once: true }); });
  }, { passive: true });

  // Tiempo en página (solo con la pestaña visible)
  var secs = 0;
  setInterval(function () {
    if (document.visibilityState !== 'visible') return;
    secs++;
    if (secs === 30) send('TimeOnPage30', {}, { once: true });
    if (secs === 60) send('TimeOnPage60', {}, { once: true });
  }, 1000);
})();
