# Semana 7 — Mobile UI Redesign (COMPLETADA)
**Período:** 2026-05-02
**Estado:** ✅ COMPLETA

## Entregables
- [x] MapScreen: Header + LIVE badge + FAB geolocalización
- [x] MapFilters: chips horizontales con scroll
- [x] LoginScreen: splash dual-rol ciudadano/alcaldía
- [x] reverseGeocode Nominatim (`src/utils/geo.utils.js`)
- [x] ReportDetail: bottom sheet — mini mapa estático + geocoding + badge estado + sección autor
- [x] UserMarker: extraído a su propio archivo
- [x] IncidentMarker: reemplazó Popup por onSelect callback

## Bugs corregidos en esta sesión
- [x] Auth duplication — useAuth.js ahora solo lee store (AppRouter es el único suscriptor)
- [x] Z-index collision — CreateReportScreen subió a 1001 (ReportDetail en 1000)
- [x] Memory leak PhotoUpload — revokeObjectURL en useEffect + quitar()
- [x] LIVE counter sin .catch() — Supabase query protegida
- [x] Nominatim sin res.ok — validación HTTP antes de parsear JSON

## Archivos tocados
- `src/app/modules/reports/ReportDetail.jsx` — creado
- `src/app/modules/map/UserMarker.jsx` — creado
- `src/app/modules/map/IncidentMarker.jsx` — modificado
- `src/app/modules/map/MapScreen.jsx` — modificado
- `src/hooks/useAuth.js` — simplificado
- `src/app/modules/reports/CreateReportScreen.jsx` — z-index
- `src/app/modules/reports/PhotoUpload.jsx` — memory leak fix
- `src/utils/geo.utils.js` — res.ok validation

## Prompt para sesión siguiente
```
Continúa semana 8 CiudApp.
Primer entregable: FeedScreen — lista de reportes cercanos con pull-to-refresh.
Archivos: src/app/modules/feed/FeedScreen.jsx + FeedItem.jsx
Referencia: dark theme de MapScreen + ReportDetail ya existentes.
Cargar: reglas/REGLAS-PERMANENTES.md primero.
```
