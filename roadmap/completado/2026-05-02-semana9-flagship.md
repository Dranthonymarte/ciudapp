# Semana 9 — Sprint Flagship MVP

**Estado:** ✅ Cerrada · **Fecha:** 2026-05-02 · **Duración:** 1 sesión

## Entregables

- [x] **F1 Map Tap → Reporte** — TapHandler en MapScreen (useMapEvents), pin temporal Carto-azul, popup dark con dirección Nominatim + botón "Reportar aquí". `ui.store` extendido con `tapCoords` + `openReportarEn()`. CreateReportScreen prioriza `tapCoords ?? gpsCoords`. Dirección editable + badge origen (tap/GPS) en paso CONFIRMAR.
- [x] **F2 Chat bidireccional** — Tabla `mensajes_reporte` (id, reporte_id, user_id, rol, contenido, created_at) + RLS + índice. Columna `usuarios.rol` (CHECK ciudadano|alcaldia). `ReportChat.jsx` con UI WhatsApp-style, Realtime subscription, badge ✓ Alcaldía, auto-scroll, Enter-to-send. Integrado en `ReportDetail`.
- [x] **F3 Landing Desktop** — `LandingPage.jsx` con Hero gradient + ¿Qué es? (4 features) + Cómo funciona (3 pasos) + Categorías (8 pills) + CTA descarga. `AppRouter` viewport wrapper (>768px → LandingPage, mobile → app).
- [x] **F4 Carto Light** — `MapLayer.jsx` migrado de OSM default a Carto Light tiles (sin API key, aspecto Google Maps).

## Archivos creados

- `src/app/LandingPage.jsx` (251 líneas)
- `src/app/modules/reports/ReportChat.jsx` (179 líneas)
- `docs/desarrollador/auditoria-s9.md` (auditoría integral)

## Archivos modificados

- `src/store/ui.store.js` (+5 líneas: tapCoords + openReportarEn)
- `src/app/modules/map/MapScreen.jsx` (+50 líneas: TapHandler, tapPin, popup)
- `src/app/modules/map/MapLayer.jsx` (3 líneas)
- `src/app/modules/reports/CreateReportScreen.jsx` (+30 líneas: tapCoords override + dirección editable)
- `src/app/modules/reports/ReportDetail.jsx` (+10 líneas: integración ReportChat)
- `src/router/AppRouter.jsx` (+15 líneas: viewport wrapper)
- `src/app/modules/auth/AuthGuard.jsx` (1 línea: fix `<>{children}</>` React 18)

## Migraciones Supabase aplicadas

1. `s9_chat_rol_usuarios` — `usuarios.rol` + tabla `mensajes_reporte` + RLS
2. `s9_seed_completo_y_trigger_usuarios` — trigger `on_auth_user_created` + perfiles retroactivos + tabla `alertas` + 8 reportes seed + 2 alertas seed

## Bugs detectados durante la implementación

1. **AuthGuard** retornaba `children` desnudo → React 18 emitía "Expected static flag was missing". Fix: wrap en fragment.
2. **Tabla `usuarios` vacía** — ningún signup creaba perfil. Resuelto con trigger `handle_new_user`.
3. **Tabla `alertas` no existía** pese a ser consultada por `AlertBanner.jsx`. Creada en seed S9.
4. **Estados UI ↔ BD desincronizados** — el código usa `nuevo|rechazado` pero CHECK de BD solo permite `pendiente|en_proceso|resuelto`. Pendiente fix S10.
5. **`reportes.usuario_id`** referencia `public.usuarios` (no `auth.users`) — confusión arquitectónica.

## Decisiones arquitectónicas tomadas

- **`ui.store` con `tapCoords` vs prop drilling**: elegido store por ser el patrón más escalable para múltiples puntos de entrada al wizard (deep links, notifs futuras).
- **Viewport wrapper en `AppRouter` vs ruta separada `/landing`**: elegido wrapper para mantener `/login`, `/feed`, `/perfil` sin cambios. Trade-off: usuario en mobile que comparta URL desktop verá landing.
- **Tabla `alertas` con `nivel` enum 4 valores** (info/aviso/urgente/emergencia) coherente con UI existente.
- **Trigger `handle_new_user` con SECURITY DEFINER** — única forma de insertar desde auth.users en public sin permisos del usuario.

## Datos sembrados (testing dual-rol)

- **Anthony** (`anthonymarte12@gmail.com`): rol = `alcaldia`
- **Sebastián** (`sebibichotron@gmail.com`): rol = `ciudadano`
- 8 reportes Chacao (uno por categoría, estados variados)
- 2 alertas activas (1 aviso agua, 1 urgente seguridad)

## Auditoría — hallazgos clave

Score global: **6.4 / 10** (vs ideal top-3 de 9.5)

6 críticos a resolver antes del piloto: ver `docs/desarrollador/auditoria-s9.md` sección 5.

---

## Prompt para arrancar S10

```
Continúa CiudApp — S10: Rol Alcaldía + cierre de críticos auditoría S9.

Pre-S10 (críticos auditoría):
1. RLS chat por participantes (mensajes_reporte)
2. Trigger anti-promoción de rol (usuarios)
3. RLS lectura limitada usuarios (nombre+rol públicos)
4. Sincronizar enums estado UI ↔ BD
5. Validación tamaño/MIME upload foto
6. Crear índices Postgres (estado, categoria_id, geo)

S10 entregables:
- Role-based redirect en login (auth.store hidrata `rol`)
- AlcaldiaLayout (sidebar nav distinto al BottomNav ciudadano)
- DashboardScreen alcaldía (stats: nuevos, en_proceso, resueltos hoy + cola)
- GestionReporte (cambiar estado, asignar, responder en chat con ✓)
- AlertasManager (crear/desactivar alertas broadcast)

Stack: React 18 + Zustand + Supabase + Carto Light (sin cambios).
Mobile-first incluso para alcaldía (caso uso real: jefe de cuadrilla en campo).

Archivos a crear:
- src/app/modules/alcaldia/{Dashboard,GestionReporte,AlertasManager}.jsx
- src/components/AlcaldiaLayout.jsx
- src/router/alcaldia.routes.jsx

Antes de implementar: hacer preguntas, esperar confirmación.
```
