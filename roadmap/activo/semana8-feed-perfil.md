# Semana 8 — Feed + Perfil (PENDIENTE)
**Período:** Próxima sesión
**Estado:** ⏳ PENDIENTE — Bloqueante para demo Chacao

## Objetivo
Completar BottomNav funcional: todos los tabs muestran contenido real.
Actualmente tabs Feed / Alertas / Perfil muestran pantalla en blanco → riesgo de demo.

## Entregables en orden de prioridad

### 1. FeedScreen (4h estimadas)
- [ ] Lista de reportes ordenados por distancia al usuario
- [ ] Pull-to-refresh (Supabase re-fetch)
- [ ] FeedItem.jsx — tarjeta con categoría, título, dirección, estado, hace X tiempo
- [ ] FeedFilter.jsx — tabs: Cercanos / Recientes / Mi zona
- [ ] Estado vacío si no hay reportes
- **Archivo:** `src/app/modules/feed/FeedScreen.jsx` + `FeedItem.jsx` + `FeedFilter.jsx`
- **Servicio:** `src/app/modules/feed/feed.service.js` — query con `.order('created_at')` + filtro geo opcional

### 2. ProfileScreen (3h estimadas)
- [ ] Avatar placeholder + nombre del usuario
- [ ] MyReports.jsx — lista de reportes del usuario autenticado
- [ ] Botón cerrar sesión (Supabase signOut)
- [ ] Contador de reportes enviados
- **Archivo:** `src/app/modules/profile/ProfileScreen.jsx` + `MyReports.jsx`
- **Servicio:** `src/app/modules/profile/profile.service.js`

### 3. AlertBanner básico (2h estimadas)
- [ ] Lista de alertas estáticas (mock) mientras se implementa push
- [ ] AlertBanner.jsx — banner rojo en parte superior cuando hay alerta activa
- **Archivo:** `src/app/modules/alerts/AlertBanner.jsx`

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
