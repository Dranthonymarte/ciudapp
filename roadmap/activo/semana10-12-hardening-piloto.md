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

## Meta técnica — Ranking CiudApp vs referencias

> Fuente: `docs/desarrollador/auditoria-s9.md` · Score ponderado (auditoría S9+fixes)

| Dimensión | Peso | Post-S9fix | Meta S12 piloto | SoSafe ~est. | Top-3 mundial |
|-----------|------|-----------|-----------------|--------------|---------------|
| Seguridad | 20% | 7.5/10 | **8.5/10** | 7/10 | 9.5/10 |
| Estructura/modularidad | 15% | 8/10 | **8.5/10** | 7/10 | 9/10 |
| UX/Estética | 15% | 7/10 | **8/10** | 7.5/10 | 9/10 |
| Escalabilidad | 15% | 5.5/10 | **7/10** | 6/10 | 9/10 |
| Realtime/BD | 10% | 7/10 | **8/10** | 5/10 | 9/10 |
| Resilencia | 10% | 4/10 | **7/10** | 6/10 | 9/10 |
| Performance | 10% | 6/10 | **7.5/10** | 6/10 | 9/10 |
| Accesibilidad | 5% | 3/10 | **6/10** | 5/10 | 9/10 |
| **GLOBAL PONDERADO** | 100% | **~7.0/10** | **~7.8/10** | ~6.5/10 | ~9.1/10 |

**Norte:** superar SoSafe en score global antes del piloto Chacao. Alcanzar 8.5/10 en S14-15 para competir con top-3.
Brechas críticas actuales: Resilencia (4→7) + Accesibilidad (3→6) + Performance (6→7.5).
