# Entrega para publicar anuncios: Mega Curso Stamp Crochet

Actualizado: 5 nov 2026. Esta guía es interna: `/docs/*` se bloquea en el sitio.

## 1. Estado en una línea
La landing, el pixel y la API de Conversiones están listos en `anaceliarosas.netlify.app`. **No publiques todavía:** faltan 4 bloqueadores (sección 3). La campaña no está creada (no hay borradores en la cuenta).

## 2. Identificadores
| Qué | Dato |
|---|---|
| Pixel / conjunto de datos | `923008885776318` (Píxel de Ana Celia Rosas). Creado por Jose A. Josan, propiedad del negocio Ana Celia Rosas |
| Negocio | Ana Celia Rosas, `2532576303560072` |
| Cuenta publicitaria | ACR_STAMP_CROCHET `4136246936601391`, USD, método de pago cargado, mínimo diario USD 1 |
| Repo | github.com/themarketographer/anaceliarosas (rama `main` = producción en Netlify) |
| Netlify | proyecto `anaceliarosas` → anaceliarosas.netlify.app |
| Checkout | nas.com (`communityCode=ANA_CELIA_ROSAS_1`), precio USD 297, pago único |
| WhatsApp | +51 987 916 201 |
| Material (videos, logos, PDFs de módulos) | Google Drive "Proyecto Crochet Ana Celia Rosas" |

**Audiencias listas (cuenta ACR_STAMP_CROCHET)**
| Uso | Audiencia | ID | Tamaño |
|---|---|---|---|
| Tibio | Seguidores IG | `120255176502420110` | 4,9 a 5,7 mil |
| Tibio | Interacción IG 365d | `120255176501550110` | ~1 mil |
| Tibio | Lista Typeform depurada | `23854433426360109` | 11,7 a 13,7 mil |
| Tibio | Leads masterclass | `23854975519370109` | 1,4 a 1,7 mil |
| Frío | LAL 1% de la lista Typeform | `120255902532730110` | se está armando |
| Caliente | Vio el precio 14d | `120255902529260110` | se llena con tráfico |
| Caliente | Fue al checkout 14d | `120255902530270110` | se llena con tráfico |
| Caliente | Casi compraron 180d | `120255176500360110` | ~20 |
| Caliente | Vio el video 30d | `120255902530600110` | se llena con tráfico |
| Caliente | Lectoras activas 30d | `120255902531220110` | se llena con tráfico |
| Caliente | Leyó hasta el final 30d | `120255902531420110` | se llena con tráfico |
| Base | Visitantes 30d | `120255902528270110` | se llena con tráfico |
Las audiencias de 2023 (Tejiendo Perú, inactivas) no se usan.

## 3. Bloqueadores antes de publicar
1. **Lista de dominios permitidos del pixel.** Hoy solo permite `anaceliarosas.com` y `wppg.builderall.com`. Desde `anaceliarosas.netlify.app` el pixel del navegador **no envía nada** (comprobado: 0 eventos web, solo llegan los del servidor, calidad de coincidencia 4.4). Con el dominio final el problema desaparece. Para probar antes: Events Manager → pixel → Configuración → Permisos de tráfico → agregar `anaceliarosas.netlify.app`, y **quitarlo al terminar**.
2. **Purchase.** La compra ocurre en nas.com. Conecta el pixel ahí (Nas: comunidad → integraciones → Meta Pixel). Sin esto la campaña optimiza solo hasta InitiateCheckout.
3. **Dominio.** Mientras `anaceliarosas.com` apunte a nas.com, el tráfico no pasa por esta web. Pautar a netlify.app solo sirve para prueba.
4. **Prueba de deduplicación** en Events Manager → Probar eventos (Navegador + Servidor, un solo evento) una vez resuelto el punto 1.

Pendientes de contenido (no bloquean, pero suben la conversión): garantía y política de reembolso, términos, testimonios con foto verificables, foto real de Ana Celia, clase gratis para captar correos.

## 4. Campaña propuesta (todo en borrador, tú decides presupuesto)
- **Objetivo:** Ventas, destino sitio web, conjunto de datos `923008885776318`.
- **Optimización:** InitiateCheckout. Pasar a Purchase cuando haya ~50 compras por semana por conjunto.
- **Países (a confirmar):** Perú, México, Colombia, Chile, Argentina, Ecuador, España y EE.UU. hispano. Las ventas anteriores dicen cuáles priorizar.
- **Presupuesto (propuesta, a confirmar):** USD 5 a 10 por día por conjunto durante 14 días, sin tocar los primeros 3.

| Conjunto | Público | Excluir |
|---|---|---|
| A Tibio | Lista Typeform + Leads masterclass + Seguidores IG + Interacción IG | compradoras (cuando exista la lista), Fue al checkout 14d |
| B Frío | LAL 1% Typeform (o abierto) | A, compradoras, Seguidores IG |
| C Caliente | Vio el precio 14d + Fue al checkout 14d + Vio el video 30d + Lectoras activas 30d | compradoras |

Crear la audiencia **Compradoras** (lista de nas.com) apenas haya ventas, y excluirla en los tres.

## 5. Nombres y enlaces
- Anuncio: `⚪ A1 [Técnica] - Video - 2026-11` (el código A1, A2, A3 no cambia aunque cambie el color).
- Parámetros de URL del anuncio:
```
utm_source=meta&utm_medium=paid&utm_campaign={{campaign.name}}&utm_content={{ad.name}}
```
- El sitio guarda las UTM, las manda en cada evento y agrega el código del anuncio al mensaje de WhatsApp.
- Destino: la landing. No uses el enlace de nas.com directo.

## 6. Creativos (borradores, revisar antes de usar)
**Evita:** "garantizado", "resultados asegurados", frases sobre atributos personales (edad, salud, dinero), y "nadie más sabe hacer" mientras no haya prueba de exclusividad.
**Material:** videos del Drive (Gatitos, Libélula, Plumas celestes, Manzanitas, Paltita, técnica) y las fotos del carrusel de la web. Verifica formato vertical 9:16 y comprime antes de subir.

**A1 Técnica**
- Texto: "Dos capas de tejido que se entrelazan para estampar el diseño en relieve. Es el Stamp Crochet, el método de las manzanitas que creó Ana Celia Rosas. 5 módulos, más de 50 videos y acceso de por vida. Para tejedoras que ya dominan lo básico."
- Título: "Teje diseños en relieve" · Descripción: "Curso online paso a paso" · Botón: Más información.

**A2 Modelos**
- Texto: "Bolsos de manzanitas, monederos con libélulas, cuadros de gatitos. Todo se teje con la misma técnica y aprendes cada paso en video. Mira lo que puedes crear con el Stamp Crochet."
- Título: "Mira lo que se teje" · Botón: Más información.

**A3 Para quién es**
- Texto: "¿Ya tejes lo básico y quieres llevarlo más lejos? En el Mega Curso Stamp Crochet aprendes a leer patrones, crear tus propios diseños y tejer proyectos completos. Acceso de por vida, a tu ritmo."
- Título: "De lo básico a diseños propios" · Botón: Más información.

Los testimonios en video (Deyanira, Iralis) pueden ser un cuarto anuncio cuando Ana Celia confirme que son reales y autorizados.

## 7. Cómo leer los resultados
- Días 1 a 3: no tocar. Aprendizaje: 7 a 14 días.
- Costo máximo por resultado: define con Ana Celia su ganancia limpia por venta y la tasa de cierre. Hasta entonces: referencia USD 100 por venta (35% del ticket).
- Verde: costo por checkout bajo la meta. Rojo: 50% por encima dos semanas. Un anuncio con menos del 15% del gasto no se juzga.
- Si el gasto se corta de golpe: revisar primero facturación, luego si el sitio responde, al final el pixel.
- Cuenta nueva: subir presupuesto 20% cada 3 días, nunca de golpe. Las cuentas 221004337977480 y 1071092298949997 aparecen deshabilitadas por actividad inusual: no las uses.

## 8. Mantenimiento técnico
- Deploy: `git push origin main` → Netlify.
- Variables en Netlify (Functions): `META_CAPI_TOKEN` (obligatoria), `META_PIXEL_ID` (opcional), `META_TEST_EVENT_CODE` (solo para pruebas, **bórrala antes de pautar**).
- Si el token vence o se revoca, la API de Conversiones deja de funcionar sin aviso: probar con un POST vacío a `/api/capi` (debe responder 400 "Falta event_name").
- Consentimiento: el banner controla Pixel y API. Sin "Aceptar" no sale ningún evento.
