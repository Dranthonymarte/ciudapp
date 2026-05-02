# Semana 8 — Feed + Perfil
**Período:** Sesión activa
**Estado:** ✅ COMPLETADO — 2026-05-02

## Objetivo
Completar BottomNav funcional: todos los tabs muestran contenido real.
Actualmente tabs Feed / Alertas / Perfil muestran pantalla en blanco → riesgo de demo.

## Entregables en orden de prioridad

### 1. FeedScreen (4h estimadas)
- [x] Lista de reportes ordenados por created_at (Supabase)
- [x] Pull-to-refresh (Supabase re-fetch)
- [x] FeedItem.jsx — redesign DS: badge categoría pill + badge estado + título + descripción 2-line + meta
- [x] FeedFilter.jsx — E2 DS: row categorías (9 pills, color activo = cat color) + row estados (6 pills, tint activo)
- [x] Estado vacío + estado "sin resultados para filtro" + "Limpiar filtros"
- [x] Filtrado client-side con useMemo (instant, sin Supabase call extra)
- **Archivo:** `src/app/modules/feed/FeedScreen.jsx` + `FeedItem.jsx` + `FeedFilter.jsx` ✅
- **Servicio:** `src/app/modules/feed/feed.service.js` ✅

### 2. ProfileScreen (3h estimadas)
- [x] Avatar placeholder con iniciales + color hash por nombre
- [x] MyReports.jsx — lista de reportes del usuario con FeedItem DS
- [x] Botón cerrar sesión (Supabase signOut) con navegación a /login
- [x] Contador de reportes (StatChip + query Supabase count)
- [x] Ruta /perfil en ciudadano.routes.jsx con AuthGuard
- **Archivo:** `src/app/modules/profile/ProfileScreen.jsx` + `MyReports.jsx` ✅
- **Servicio:** `src/app/modules/profile/profile.service.js` ✅

### 3. AlertBanner con Supabase Realtime (2h estimadas)
- [x] AlertBanner.jsx — Realtime INSERT listener tabla alertas
- [x] Dismiss por alerta individual
- [x] Estilos por nivel (info/aviso/urgente/emergencia)
- **Archivo:** `src/app/modules/alerts/AlertBanner.jsx` ✅

### 4. Componentes UI base (2h estimadas)
- [ ] `Spinner.jsx` — loading state reutilizable
- [ ] `EmptyState.jsx` — estado vacío reutilizable
- [ ] `Toast.jsx` — feedback global (instalado en AuthLayout)
- **Archivos:** `src/components/Spinner.jsx`, `EmptyState.jsx`, `Toast.jsx`

## Criterio de completitud
- Los 4 tabs del BottomNav muestran contenido real (no pantalla en blanco)
- `npm run build` pasa sin errores
- Deploy en Cloudflare Pages verificado

## Prompt para sesión siguiente
```
Continúa semana 8 CiudApp.
Primer entregable: FeedScreen.jsx + FeedItem.jsx — lista de reportes cercanos.
Stack: dark theme consistente con MapScreen (#0A0C10) + Supabase query ordenada por created_at.
Archivos: src/app/modules/feed/ (vacío), src/components/Spinner.jsx (vacío).
Cargar: reglas/REGLAS-PERMANENTES.md primero.
```
