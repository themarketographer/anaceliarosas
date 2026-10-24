// Netlify Function: API de Conversiones de Meta para anaceliarosas.com
//
// Recibe desde track.js el mismo evento que se disparó con el Pixel (mismo
// event_id) y lo reenvía desde el servidor. Meta deduplica por event_id +
// event_name, así que el evento cuenta una sola vez pero con mejor cobertura
// (bloqueadores, Safari/ITP, in-app browsers de Instagram/Facebook).
//
// Variables de entorno en Netlify:
//   META_CAPI_TOKEN        -> token de acceso (Events Manager > Configuración > API de conversiones)
//   META_PIXEL_ID          -> opcional, por defecto 923008885776318
//   META_TEST_EVENT_CODE   -> opcional, código "Probar eventos"; quítalo al publicar la campaña

const PIXEL_ID = process.env.META_PIXEL_ID || '923008885776318';
const GRAPH_API_VERSION = 'v21.0';
const ALLOWED_ORIGINS = ['https://anaceliarosas.com', 'https://www.anaceliarosas.com'];
const ALLOWED_EVENTS = new Set([
  'PageView', 'ViewContent', 'InitiateCheckout', 'Contact',
  'CTAClick', 'ViewPricing', 'VideoPlay', 'VideoProgress', 'FAQOpen',
  'Scroll25', 'Scroll50', 'Scroll75', 'Scroll90', 'TimeOnPage30', 'TimeOnPage60',
]);

const json = (statusCode, body) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { error: 'Method Not Allowed' });

  const origin = event.headers.origin || '';
  const isLocal = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
  if (origin && !ALLOWED_ORIGINS.includes(origin) && !isLocal) return json(403, { error: 'Origin no permitido' });

  const accessToken = process.env.META_CAPI_TOKEN;
  if (!accessToken) return json(500, { error: 'Falta META_CAPI_TOKEN en Netlify' });

  try {
    const { event_name, event_id, event_source_url, fbp, fbc, external_id, custom_data } =
      JSON.parse(event.body || '{}');

    if (!event_name || !event_id) return json(400, { error: 'Falta event_name o event_id' });
    if (!ALLOWED_EVENTS.has(event_name)) return json(400, { error: 'Evento no permitido' });

    const clientIp =
      event.headers['x-nf-client-connection-ip'] ||
      (event.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
      undefined;

    const user_data = {
      client_ip_address: clientIp,
      client_user_agent: event.headers['user-agent'],
      ...(fbp ? { fbp } : {}),
      ...(fbc ? { fbc } : {}),
      ...(external_id ? { external_id: [external_id] } : {}),
    };

    const payload = {
      data: [{
        event_name,
        event_time: Math.floor(Date.now() / 1000),
        event_id,
        event_source_url,
        action_source: 'website',
        user_data,
        ...(custom_data ? { custom_data } : {}),
      }],
      ...(process.env.META_TEST_EVENT_CODE ? { test_event_code: process.env.META_TEST_EVENT_CODE } : {}),
    };

    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_API_VERSION}/${PIXEL_ID}/events?access_token=${encodeURIComponent(accessToken)}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }
    );
    const data = await res.json();
    return json(res.ok ? 200 : 400, data);
  } catch (err) {
    return json(500, { error: err.message });
  }
};
