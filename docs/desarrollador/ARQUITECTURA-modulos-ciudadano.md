# Arquitectura · Módulos App Ciudadano

> Parte 1/3 · Ver: [dashboard](ARQUITECTURA-modulos-dashboard.md) · [infraestructura](ARQUITECTURA-infraestructura.md) · [decisiones](ARQUITECTURA-decisiones.md)

Módulos de `src/app/` — la experiencia móvil-first del ciudadano.

```
│   ├── app/                                ← APP CIUDADANO (móvil-first)
│   │   ├── AppCiudadano.jsx                → Componente raíz del ciudadano
│   │   │
│   │   ├── modules/
│   │   │   │
│   │   │   ├── auth/                       ← MÓDULO: Registro y login
│   │   │   │   ├── LoginScreen.jsx         → Pantalla de login
│   │   │   │   ├── RegisterScreen.jsx      → Pantalla de registro
│   │   │   │   ├── ForgotPassword.jsx      → Recuperar contraseña
│   │   │   │   ├── AuthGuard.jsx           → Protege rutas privadas
│   │   │   │   └── auth.service.js         → Lógica auth con Supabase
│   │   │   │
│   │   │   ├── map/                        ← MÓDULO: Mapa central (pantalla principal)
│   │   │   │   ├── MapScreen.jsx           → Pantalla principal con mapa
│   │   │   │   ├── MapLayer.jsx            → Capa visual de Leaflet
│   │   │   │   ├── IncidentMarker.jsx      → Marcador de incidente en el mapa
│   │   │   │   ├── MarkerCluster.jsx       → Agrupación de marcadores cercanos
│   │   │   │   ├── MapFilters.jsx          → Filtros por tipo/zona/tiempo
│   │   │   │   ├── HeatmapLayer.jsx        → Mapa de calor de incidentes
│   │   │   │   └── map.utils.js            → Funciones de geolocalización
│   │   │   │
│   │   │   ├── reports/                    ← MÓDULO: Crear y ver reportes
│   │   │   │   ├── CreateReportScreen.jsx  → Formulario crear reporte (máx. 3 taps)
│   │   │   │   ├── ReportCard.jsx          → Tarjeta de un reporte en el feed
│   │   │   │   ├── ReportDetail.jsx        → Vista detallada de un reporte
│   │   │   │   ├── ReportCategories.jsx    → Selector de categoría de incidente
│   │   │   │   ├── PhotoUpload.jsx         → Subir foto al reporte
│   │   │   │   ├── ReportStatus.jsx        → Badge de estado (recibido/en proceso/resuelto)
│   │   │   │   └── reports.service.js      → CRUD de reportes con Supabase
│   │   │   │
│   │   │   ├── feed/                       ← MÓDULO: Feed de incidentes
│   │   │   │   ├── FeedScreen.jsx          → Lista de reportes recientes
│   │   │   │   ├── FeedFilter.jsx          → Filtrar por zona/categoría
│   │   │   │   ├── FeedItem.jsx            → Ítem individual del feed
│   │   │   │   └── feed.service.js         → Suscripción realtime a Supabase
│   │   │   │
│   │   │   ├── alerts/                     ← MÓDULO: Alertas de emergencia
│   │   │   │   ├── AlertBanner.jsx         → Banner de alerta activa en mapa
│   │   │   │   ├── AlertDetail.jsx         → Detalle de alerta de alcaldía
│   │   │   │   ├── PushPermission.jsx      → Solicitar permisos de notificación
│   │   │   │   └── alerts.service.js       → Recepción de alertas en tiempo real
│   │   │   │
│   │   │   ├── profile/                    ← MÓDULO: Perfil del ciudadano
│   │   │   │   ├── ProfileScreen.jsx       → Pantalla de perfil
│   │   │   │   ├── MyReports.jsx           → Mis reportes enviados
│   │   │   │   ├── EditProfile.jsx         → Editar nombre, foto, barrio
│   │   │   │   └── profile.service.js      → Operaciones de perfil en Supabase
│   │   │   │
│   │   │   └── notifications/              ← MÓDULO: Notificaciones
│   │   │       ├── NotifList.jsx           → Lista de notificaciones
│   │   │       ├── NotifItem.jsx           → Item de notificación
│   │   │       └── notif.service.js        → Web Push + Supabase Realtime
```
