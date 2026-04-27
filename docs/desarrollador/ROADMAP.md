# CiudApp — Roadmap Técnico Completo

> **Versión:** v0.1 · **Fecha inicio:** 2026-04-16 · **Tech Lead:** Anthony
> Meta global: App ciudadana de clase mundial + Dashboard B2G para Venezuela
> Fases 3-6, categorías y reglas: ver [ROADMAP-fases-3-6.md](ROADMAP-fases-3-6.md)

---

## VISIÓN GENERAL DE FASES

```
FASE 1  [Sem 1-2]   → Piloto + Fundación          ✅ COMPLETADA
FASE 2  [Sem 3-8]   → MVP Core                    🔄 EN CURSO
FASE 3  [Sem 9-14]  → App Completa                ⏳
FASE 4  [Sem 15-18] → Beta Privada (50-100 users) ⏳
FASE 5  [Sem 19-24] → Lanzamiento público          ⏳
FASE 6  [Sem 25+]   → Escala y monetización        ⏳
```

---

## FASE 1 — PILOTO Y FUNDACIÓN ✅
**Semanas 1-2 | Estado: COMPLETADA**

### Entregables completados
- [x] Piloto HTML interactivo con mapa Leaflet
- [x] Presentación Gamma (Anthony - Roadmap tecnológico)
- [x] Presentación Gamma (Sebastián - Visión del negocio)
- [x] Presentación Gamma (Ana - COO/Ventas/Legal)
- [x] Documentación inicial (AUDITORIA, ARQUITECTURA, STACK, ROADMAP)

### Pendiente antes de cerrar Fase 1
- [ ] Definir nombre definitivo: **CiudApp** o **CuidApp** (decisión de equipo)
- [ ] Definir ciudad piloto objetivo (coordinación con Ana)
- [ ] Piloto HTML mejorado: flujo de "crear reporte" simulado
- [ ] Piloto HTML: responsive para móvil

---

## FASE 2 — MVP CORE
**Semanas 3-8 | Estado: EN CURSO**

### Semana 3 — Fundación React
**Objetivo:** Proyecto React funcionando en local y en Cloudflare

| Tarea | Descripción | Entregable |
|---|---|---|
| Crear proyecto React+Vite | `npm create vite@latest ciudapp` | Proyecto corriendo en localhost |
| Configurar GitHub | Repositorio privado + primer commit | Código en GitHub |
| Configurar Cloudflare Pages | Conectar repo → deploy automático | URL pública funcionando |
| Crear .env.local | Variables Supabase | App conectada a BD |
| Crear config/theme.config.js | Paleta completa de CiudApp | Archivo de tema |
| Crear config/typography.config.js | Fuentes Syne + DM Sans | Archivo tipografía |
| Instalar dependencias base | React Router, Zustand, Leaflet, Supabase | package.json listo |
| Crear estructura de carpetas | Árbol completo de /src | Arquitectura base |

---

### Semana 4 — Mapa Base
**Objetivo:** Mapa de Venezuela funcionando con marcadores de prueba

| Tarea | Descripción | Entregable |
|---|---|---|
| Módulo map/MapScreen.jsx | Pantalla principal con Leaflet | Mapa visible |
| Módulo map/MapLayer.jsx | Configuración de capas OSM | Mapa con tiles |
| Módulo map/IncidentMarker.jsx | Marcador de incidente coloreado | Marcadores en mapa |
| services/maps.service.js | Obtener GPS del usuario | Punto azul "estás aquí" |
| Módulo map/MapFilters.jsx | Botones de filtro por categoría | Filtros visuales |
| BD Supabase: tablas | Crear tablas: usuarios, reportes, categorías, municipios | BD estructurada |
| Datos de prueba | 10 reportes falsos en Caracas | Mapa con datos reales de BD |

---

### Semana 5 — Reportes
**Objetivo:** Ciudadano puede crear y ver un reporte

| Tarea | Descripción | Entregable |
|---|---|---|
| modules/reports/CreateReportScreen.jsx | Formulario en máx. 3 taps | Crear reporte funcional |
| modules/reports/ReportCategories.jsx | Selector de categoría visual | 8-10 categorías venezolanas |
| modules/reports/PhotoUpload.jsx | Foto desde cámara/galería | Foto sube a Supabase Storage |
| modules/reports/ReportCard.jsx | Tarjeta de reporte en feed | UI de reporte |
| modules/reports/ReportStatus.jsx | Badge de estado del reporte | Semáforo de estado |
| services/reports.service.js | CRUD con Supabase | Reportes en BD |
| Mapa: reporte nuevo = marcador | Al crear reporte, aparece en mapa | Integración mapa-reportes |

---

### Semana 6 — Autenticación
**Objetivo:** Usuario puede registrarse, iniciar sesión y tener perfil

| Tarea | Descripción | Entregable |
|---|---|---|
| modules/auth/RegisterScreen.jsx | Registro con email + contraseña | Cuenta creada |
| modules/auth/LoginScreen.jsx | Login funcional | Sesión activa |
| modules/auth/AuthGuard.jsx | Rutas protegidas | No-auth no puede reportar |
| modules/auth/ForgotPassword.jsx | Recuperar contraseña | Email de recuperación |
| services/supabase.auth.js | Funciones auth con Supabase | Auth completo |
| hooks/useAuth.js | Hook de sesión global | Auth en toda la app |
| store/auth.store.js | Estado de usuario en Zustand | Persistencia de sesión |

---

### Semana 7 — Feed en Tiempo Real
**Objetivo:** Los reportes aparecen en vivo sin recargar la app

| Tarea | Descripción | Entregable |
|---|---|---|
| modules/feed/FeedScreen.jsx | Lista de reportes recientes | Feed visual |
| modules/feed/FeedItem.jsx | Item individual del feed | UI limpia |
| services/supabase.realtime.js | Suscripción a cambios en BD | Tiempo real funcional |
| hooks/useReports.js | Hook con suscripción realtime | Reportes actualizados |
| components/BottomNav.jsx | Navegación inferior: Mapa/Feed/Crear/Perfil | Navegación móvil |
| OfflineBar.jsx | Banner "sin conexión" | UX offline |
| hooks/useOffline.js | Detectar conexión/desconexión | Estado de red |

---

### Semana 8 — Perfil + Pulido MVP
**Objetivo:** App completa para ciudadanos en su versión mínima viable

| Tarea | Descripción | Entregable |
|---|---|---|
| modules/profile/ProfileScreen.jsx | Perfil del ciudadano | Pantalla de perfil |
| modules/profile/MyReports.jsx | Mis reportes enviados | Historial personal |
| modules/profile/EditProfile.jsx | Editar nombre/barrio/foto | Perfil editable |
| Testing interno completo | Probar todos los flujos | Lista de bugs |
| Correcciones de bugs Fase 2 | Resolver lista de bugs | App estable |
| PWA básica | manifest.json + íconos | Instalable en Android |
| **DEMO para Ana y Sebas** | Demo del MVP ciudadano | Aprobación del equipo |

---
