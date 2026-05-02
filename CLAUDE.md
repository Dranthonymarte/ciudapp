# CLAUDE.md — CiudApp · Índice de Sesión

> Carga en CADA sesión. Apunta a archivos verdad, no duplica contenido.

## PROYECTO
- Nombre: **CiudApp** — Red ciudadana B2G para Venezuela
- Fase: 2 — MVP Core (S9 cerrada, S10 = rol Alcaldía)
- Stack: React 18 + Vite | Supabase | Cloudflare Pages | Leaflet + Carto Light | Zustand
- Piloto: Chacao (Caracas)
- App 100% mobile-first — desktop → landing page
- Referencia UX: SoSafe (Chile) — aplicar selectivamente

## ARCHIVOS VERDAD — CARGAR EN ORDEN
1. **reglas/REGLAS-PERMANENTES.md** — TOKEN GUARD, CONDUCTA, ARQUITECTURA (siempre)
2. **contexto/CTX-01-proyecto.md** — Descripción + stack (si trabajas en producto)
3. **contexto/CTX-02-negocio.md** — Equipo, equity, hitos (si toca negocios)
4. **contexto/CTX-03-stack-tech.md** — Stack detallado (si trabajas en tech)
5. **contexto/CTX-04-equipo.md** — Roles y horarios (si necesitas coordinación)

## ESQUEMA SUPABASE (miniatura — actualizado S9)
usuarios (con rol) | municipios | categorias | reportes | mensajes_reporte | alertas
Pendientes futuras: equipos | asignaciones

(Schema completo en docs/desarrollador/README.md)

## RUTAS
- ciudapp.com/ → App ciudadano (React PWA)
- ciudapp.com/admin → Dashboard alcaldía (React)
- Sesiones narrativas: docs/sesiones/ | Tareas cerradas: roadmap/completado/

## DOCUMENTACIÓN
- docs/desarrollador/ → Arquitectura, roadmap, stack, auditoría
- docs/fundadores/ → Contexto Anthony
- docs/usuario/ → Manuales (cuando existan)

## SKILLS ACTIVAS
Detectadas automáticamente: frontend-design, pptx, docx, xlsx, pdf, file-reading

## META TÉCNICA (norte del roadmap)
Score auditoría ponderada: **~7.0/10** (post S9+fixes) → **8.5/10** meta piloto Chacao → **9.5/10** top-3 mundial
Referencia: `docs/desarrollador/auditoria-s9.md` · Dimensiones: seguridad(20%), estructura(15%), UX(15%), escalabilidad(15%), BD(10%), resilencia(10%), performance(10%), accesibilidad(5%)
Brecha principal: resilencia (4/10), accesibilidad (3/10), performance (6/10)

## PRÓXIMO PASO
Lee reglas/REGLAS-PERMANENTES.md antes de iniciar sesión.

## HISTÓRICO
✅ 2026-04-23 — sistema-skills-comandos-scripts
✅ 2026-04-23 — limpieza-estructura-docs
✅ 2026-04-23 — deuda-docs-150-lineas
✅ 2026-04-27 — scaffold-react-fase2-semana3 + push GitHub
✅ 2026-04-27 — mapa-base-semana4: MapScreen + Leaflet + 10 marcadores mock Caracas + deploy Cloudflare
✅ 2026-04-27 — semana4-completada: GPS (maps.service.js) + MapFilters.jsx + tablas Supabase (4) + 10 reportes seed + mapa conectado a BD
✅ 2026-04-27 — fase1-cerrada: nombre CiudApp, piloto Chacao, HTML superseded por React
✅ 2026-04-27 — semana5-modulo-reportes: wizard 3 taps + 8 categorías venezolanas + foto→Storage + BottomNav + integración mapa
✅ 2026-04-28 — semana6-autenticacion: Supabase Auth + auth.store + useAuth + LoginScreen + RegisterScreen + ForgotPassword + AuthGuard + rutas protegidas
✅ 2026-04-28 — fixes-post-deploy: AuthLayout (BottomNav global), env vars Cloudflare, reglas arquitectura + tabla fallas conocidas
✅ 2026-05-02 — mobile-ui-redesign: MapScreen (header+LIVE badge+FAB geoloc) + MapFilters chips + LoginScreen splash dual-role + reverseGeocode Nominatim + deploy ✓
✅ 2026-05-02 — semana7-reporte-detalle: ReportDetail bottom-sheet (mini mapa estático + geocoding + badge estado + autor) + UserMarker extraído + 5 bugs críticos/medios corregidos + roadmap S7-S12 sistematizado
✅ 2026-05-02 — semana8-feed-perfil: FeedFilter DS (pills categoría×9 + estado×6, colores canónicos) + FeedItem redesign (elimina left-bar, badges pill DS) + FeedScreen filtrado client-side useMemo
✅ 2026-05-02 — semana8-perfil-alertas: ProfileScreen (avatar iniciales + stats + signOut) + MyReports + profile.service + AlertBanner Realtime + ruta /perfil — visión S9 definida (chat bidireccional + map tap + landing desktop + Carto Light)
✅ 2026-05-02 — semana9-flagship: Map Tap → Reporte (TapHandler + popup) + Chat bidireccional Realtime (mensajes_reporte + badge ✓ Alcaldía) + Landing Desktop (>768px) + Carto Light tiles + trigger sync auth↔usuarios + tabla alertas + seed (8 reportes + 2 alertas) + auditoría integral 6.4/10
✅ 2026-05-02 — s10pre-fix-criticos: trigger anti-rol C1 + RLS chat C2 + usuarios read C3 + estado enum C4 + upload validation C5 + direccion BD C6 + 4 índices · score ~7.0/10
