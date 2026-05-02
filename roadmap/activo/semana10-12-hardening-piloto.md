# Semanas 10-12 — Hardening + Piloto Chacao (FUTURO)
**Período:** Pre-lanzamiento
**Estado:** ⏳ PLANIFICADO

## Objetivo
App lista para 100 usuarios reales en Chacao. Estabilidad, offline-tolerancia y métricas.

## Semana 10 — Estabilidad & Offline

### Offline-first (crítico para Venezuela)
- [ ] `src/services/offline.service.js` — IndexedDB para reportes pendientes de enviar
- [ ] `src/components/OfflineBar.jsx` — banner visible cuando no hay conexión
- [ ] Service worker para cachear assets estáticos (Vite PWA plugin)
- [ ] Sync automático cuando vuelve la conexión

### Error Handling global
- [ ] `src/components/ErrorBoundary.jsx` — catch de crashes de React
- [ ] Instalado en AppRouter como wrapper de todas las rutas
- [ ] `src/components/Toast.jsx` — mensajes de error/éxito globales

### Performance
- [ ] React.lazy() en todas las rutas (code splitting)
- [ ] Leaflet tiles con caché del service worker
- [ ] Imágenes de Supabase Storage con lazy loading

## Semana 11 — Deduplicación y Calidad de Datos

### Anti-spam
- [ ] Detectar reportes duplicados en radio < 50m de la misma categoría
- [ ] Mostrar "Ya existe un reporte similar" antes de crear
- [ ] Sistema de "confirmación" — ciudadano puede confirmar un reporte existente (+1)

### Validación
- [ ] `src/utils/validation.utils.js` — validación de campos de reporte
- [ ] Moderación básica: bloquear texto inapropiado

## Semana 12 — Analytics + Lanzamiento Chacao

### Métricas
- [ ] Tiempo promedio de resolución por categoría
- [ ] Mapa de calor de zonas con más reportes (HeatmapLayer.jsx completar)
- [ ] Dashboard público de estadísticas por municipio

### Onboarding
- [ ] Tutorial de primer uso (3 pasos overlay)
- [ ] Pantalla "¿Qué es CiudApp?" para nuevos usuarios

### Lanzamiento
- [ ] Configurar dominio ciudapp.com → Cloudflare Pages
- [ ] PWA installable (manifest + icons completos)
- [ ] App Store / Play Store (Capacitor o PWA directa según budget)

## Score objetivo al final de S12
| Dimensión | Score actual | Objetivo S12 |
|-----------|-------------|--------------|
| Arquitectura | 8/10 | 9/10 |
| Funcionalidad | 6/10 | 9/10 |
| UX Mobile | 7/10 | 8/10 |
| Estabilidad | 5/10 | 8/10 |
| Realtime | 1/10 | 7/10 |
| Loop gobierno | 0/10 | 8/10 |
| Offline-first | 0/10 | 6/10 |
| **TOTAL** | **3.9/10** | **7.9/10** |
