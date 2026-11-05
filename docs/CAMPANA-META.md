# Campaña Meta — Mega Curso Stamp Crochet

- Pixel / dataset: `923008885776318` (Píxel de Ana Celia Rosas)
- Cuenta publicitaria: `4136246936601391` (ACR_STAMP_CROCHET, USD) · Business `2532576303560072`
- Producto: USD 297, pago único. Checkout en nas.com (fuera del dominio).

## 1. Antes de gastar un dólar (una sola vez)
1. Netlify → Site settings → Environment variables: `META_CAPI_TOKEN` (Events Manager → dataset → Configuración → API de conversiones → Generar token).
2. Events Manager → Probar eventos: copia el código `TEST…`, ponlo en `META_TEST_EVENT_CODE`, redeploy, navega el sitio y confirma que cada evento aparece como **Navegador + Servidor, Deduplicado**. Luego **borra** `META_TEST_EVENT_CODE`.
3. **Purchase**: ocurre en nas.com, no en este sitio. Conecta el pixel dentro de nas.com (Comunidad → Integraciones → Meta Pixel `923008885776318`). Sin eso la campaña no puede optimizar a compras.
4. Verifica el dominio `anaceliarosas.com` en Business Settings → Brand Safety → Dominios y prioriza eventos (Agregated Event Measurement): 1 Purchase · 2 InitiateCheckout · 3 ViewPricing · 4 ViewContent · 5 CTAClick.

## 2. Eventos que dispara el sitio (Pixel + CAPI, mismo `event_id`)
| Evento | Cuándo | Uso |
|---|---|---|
| PageView, ViewContent | Al cargar | Audiencias de visitantes |
| CTAClick | Clic en cualquier botón hacia el precio | Intención |
| ViewPricing | Sección de precio visible (35%) | Retargeting caliente |
| InitiateCheckout | Clic al checkout de nas.com (USD 297) | Optimización intermedia |
| VideoPlay / VideoProgress (25-50-75) | Testimonios | Audiencias de video |
| FAQOpen | Abre una pregunta | Objeciones |
| Scroll25/50/75/90, TimeOnPage30/60 | Engagement | Audiencias de calidad |
| Contact | WhatsApp o correo | Leads manuales |
| Purchase | nas.com | **Objetivo de la campaña** |

Los eventos personalizados no son estándar: créalos como audiencias personalizadas (Sitio web → Evento).

## 3. Estructura recomendada
**Campaña** — Ventas, destino sitio web, dataset `923008885776318`, Advantage+ presupuesto desactivado al inicio.

| Conjunto | Público | Optimiza a | Presupuesto |
|---|---|---|---|
| A · Frío | Perú, México, Colombia, Chile, Argentina, EE.UU. (hispanos) · mujeres 28-65 · intereses crochet/tejido/amigurumi · o abierto | Purchase (si no hay ~50 compras/semana: InitiateCheckout) | 60% |
| B · Tibio | Visitantes 30d + vieron >50% de video + IG/FB engagers 90d, excluye compradoras | Purchase | 25% |
| C · Caliente | ViewPricing o InitiateCheckout 14d, excluye compradoras | Purchase | 15% |

Excluir en todos: compradoras (lista de nas.com) y "PageView 180d" solo en A si quieres público nuevo.

## 4. Creativos
- 3 ángulos: (1) "la técnica de las manzanitas que no está en YouTube", (2) transformación/modelos (bolsos, gatitos, libélula), (3) testimonios en video (Deyanira, Iralis).
- 3 variantes por ángulo, formato 9:16 y 4:5. Texto principal corto; CTA "Más información".
- URL de destino con UTM: `https://anaceliarosas.com/?utm_source=meta&utm_medium=paid&utm_campaign={{campaign.name}}&utm_content={{ad.name}}`

## 5. Lectura de resultados
Primeras 72 h sin tocar. Revisa costo por ViewPricing y por InitiateCheckout; si ViewPricing es barato pero InitiateCheckout caro, el problema es la oferta/precio, no el anuncio. CPA objetivo máximo: < USD 100 (35% del ticket) para escalar.
