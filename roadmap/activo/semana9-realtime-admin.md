# Semana 9 — Realtime + Dashboard Admin (PENDIENTE)
**Período:** Futuro — CRÍTICO para piloto Chacao
**Estado:** ⏳ PENDIENTE

## Objetivo
Cerrar el loop ciudadano→gobierno. Sin esto, el piloto con la alcaldía de Chacao no es viable.

## Entregables en orden de prioridad

### 1. Realtime subscriptions (3h)
- [ ] `src/services/supabase.realtime.js` — suscripción a tabla `reportes`
- [ ] Mapa se actualiza automáticamente cuando hay nuevo reporte (sin reload)
- [ ] Badge LIVE en MapScreen refleja cambios en tiempo real
- [ ] Implementar en MapScreen: `useEffect` con channel subscribe + cleanup

### 2. Dashboard Admin básico (6h)
- [ ] `src/router/admin.routes.jsx` — rutas `/admin/*`
- [ ] AdminLayout con sidebar (desktop) / TabBar (mobile)
- [ ] ListaReportes — tabla paginada con filtros por estado/categoría/fecha
- [ ] Cambiar estado de reporte (nuevo → en_proceso → resuelto)
- [ ] Asignar reporte a empleado (tabla `asignaciones` Supabase)
- [ ] Mapa admin (variante del MapScreen con todos los marcadores sin filtro de usuario)

### 3. Push Notifications básico (4h)
- [ ] `src/services/push.service.js` — service worker + Supabase Edge Function
- [ ] PushPermission.jsx — solicitar permiso en primer uso
- [ ] Notificación cuando cambia el estado de un reporte del usuario

## Dependencias
- Supabase: tabla `asignaciones` debe existir (validar con schema)
- Cloudflare: Edge Function para push (o usar servicio externo)

## Criterio de completitud
- Admin puede ver, filtrar y cambiar estado de reportes
- Ciudadano recibe notificación cuando su reporte cambia de estado
- Mapa se actualiza en < 3 segundos tras nuevo reporte
