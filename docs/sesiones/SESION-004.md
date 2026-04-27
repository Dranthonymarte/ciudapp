# SESION-004.md

**Fecha:** 2026-04-17
**Duración:** Sesión de diagnóstico estratégico (sin ejecución)
**Tipo:** Planificación de presentaciones para reunión de socios (martes)

---

## Meta de la sesión

Diagnosticar y diseñar dos presentaciones Gamma para la reunión con Ana y Sebas:
- **Deck 1:** Evolución del Gamma existente ("Una sola app. Dos experiencias.") — visión tecnológica v2
- **Deck 2:** Paralelo técnico de producto CiudApp vs SoSafe (Chile)

Restricciones establecidas: cuenta Gamma gratuita (máx 10 slides por deck), presentaciones no deben revelar que Claude leyó los pptx de Ana y Sebas, nombre "CiudApp" con interrogante de definitivo.

---

## Archivos tocados

- `docs/sesiones/SESION-004.md` (creado)
- `memory/project_ciudapp.md` (actualizado)

Sin cambios en código (fase de planificación).

---

## Lo que funcionó ✅

- Lectura eficiente del Gamma existente (1 sola llamada `read_gamma`)
- Extracción de texto de pptx de Ana y Sebas en paralelo con `unzip -p | sed` (sin cargar binarios, sin usar herramientas pesadas)
- Diagnóstico estratégico completo identificó:
  - Coherencia de roles: Sebas = visión/marca, Ana = ventas/legal, Anthony = tech/producto
  - Tu primer Gamma es correcto porque NO duplica a Ana ni Sebas
  - Desalineación silenciosa del nombre (CiudApp vs CuidApp en SAPI de Ana) como bomba legal
  - $10K anual sin encaje en tiers mensuales actuales → decidido como paquete anual ejemplo
  - Falta capa IA / Data Intelligence en tu deck (Sebas la posiciona como monetización, tú debes construirla técnicamente)
  - Falta KPIs técnicos medibles (uptime, latencia, retención) — tu equity de 25% requiere peso medible
- Reglas permanentes establecidas por Anthony:
  - No explorar archivos sin pedirlo explícitamente
  - Usar `.md` para contexto, no código ni imágenes
  - Buscar siempre ruta más eficiente en tokens
  - No proponer acciones no solicitadas

---

## Lo que falló / bloqueó ⚠️

- Error de exploración inicial: Claude leyó proactivamente varios archivos del proyecto sin pedir permiso → corregido como regla permanente
- Alucinación: Claude dijo que SoSafe era alemán; es chileno → corregido, búsqueda web de quejas se hará puntualmente en próxima sesión

---

## Bugs conocidos al cerrar

Ninguno en código (aún no existe React app).

**Alertas activas:**
- A-001: Conflicto latente CiudApp vs CuidApp (Ana registra "CuidApp" en SAPI; Sebas y Anthony usan "CiudApp") — debe decidirse el martes
- A-002: Supabase esquema sin crear (arrastrada desde sesión 003)
- A-003: $10K anual no está en tiers comerciales actuales de Ana → Anthony debe validar con ella si se presenta como opción nueva

---

## Próxima sesión — ejecución

Construir en Gamma (cuenta conectada por MCP) ambos decks en un solo disparo:

**Deck 1 — "CiudApp · Visión Tecnológica v2"** (10 slides)
1. Portada con ambición LatAm
2. Tipo de app + dos experiencias (fusión PWA + dual)
3. Seguridad: accesos + 5 hackeos (fusión)
4. Stack + privacidad + línea de diseño (HTML piloto)
5. Arquitectura modular 158 archivos
6. Diferenciadores vs SoSafe (5 puntos)
7. Data Intelligence + capa IA (Fase 4-5)
8. Roadmap 6 fases + alineación plan del equipo
9. KPIs técnicos medibles (uptime, latencia, retención)
10. Próximos pasos + interrogante nombre definitivo

**Deck 2 — "Paralelo de producto · CiudApp vs SoSafe"** (10 slides)
1. Portada
2. Quién es SoSafe (Chile) + por qué es referencia
3. SoSafe: 3 pantallas clave
4. CiudApp piloto: 3 pantallas clave (HTML)
5. Paralelo 1: mapa / pantalla principal
6. Paralelo 2: flujo de reporte
7. 5 quejas reales de usuarios SoSafe (búsqueda web puntual)
8. Cómo CiudApp resuelve cada queja (técnicamente)
9. Lo que SoSafe no tiene: Dashboard B2G + offline + contexto VE
10. Ejemplo de propuesta de contrato anual: $10.000 USD

**Herramientas necesarias próxima sesión:**
- `mcp__73e43c7f-cfc2-4fa1-ac17-03a62b8bb0d3__generate` (Gamma generate)
- `WebSearch` puntual para quejas SoSafe (1 búsqueda acotada, máx)

**Diseño:** línea visual del HTML `Presentaciones/CiudApp/ciudapp-piloto.html`:
- Navy `#1A1F3C` (sidebar/fondo)
- CTA rojo `#E8614A`
- Primary azul `#003F8A`
- Accent gold `#FFD700`
- Fuentes: Syne (display) + DM Sans (body)

**No revelar en los decks:** conocimiento de contenido de pptx de Ana ni Sebas.

---

## Commit de cierre

No aplica en esta sesión (repo Git aún no inicializado — parte del trabajo de Fase 2, Semana 3).
