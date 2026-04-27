# Arquitectura · Infraestructura y Servicios

> Parte 3/3 · Ver: [ciudadano](ARQUITECTURA-modulos-ciudadano.md) · [dashboard](ARQUITECTURA-modulos-dashboard.md) · [decisiones](ARQUITECTURA-decisiones.md)

Secciones: public · config · components · services · hooks · store · utils · types · router · assets · BD

---

## ÁRBOL DE INFRAESTRUCTURA

```
ciudapp/                                    ← Raíz del proyecto
│
├── public/                                 ← Archivos estáticos públicos
│   ├── manifest.json                       → Config PWA (ícono, nombre, colores app)
│   ├── sw.js                               → Service Worker (offline-first)
│   ├── icons/                              → Íconos de app (múltiples tamaños)
│   │   ├── icon-192.png
│   │   └── icon-512.png
│   └── favicon.ico
│
├── src/                                    ← Todo el código fuente
│   │
│   ├── config/                             ← CONFIGURACIÓN GLOBAL (toca aquí, cambia todo)
│   │   ├── theme.config.js                 → Paleta de colores completa de la app
│   │   ├── typography.config.js            → Fuentes, tamaños, pesos tipográficos
│   │   └── constants.js                    → URLs, keys públicas, textos fijos
│   ├── components/                         ← COMPONENTES COMPARTIDOS UI
│   │   ├── Button.jsx                      → Botón reutilizable (variantes)
│   │   ├── Input.jsx                       → Input de formulario
│   │   ├── Modal.jsx                       → Modal reutilizable
│   │   ├── Card.jsx                        → Tarjeta con sombra
│   │   ├── Badge.jsx                       → Badge de estado/categoría
│   │   ├── Avatar.jsx                      → Foto de perfil / inicial
│   │   ├── Spinner.jsx                     → Loading spinner
│   │   ├── Toast.jsx                       → Notificación temporal (éxito/error)
│   │   ├── BottomNav.jsx                   → Navegación inferior móvil
│   │   ├── TopBar.jsx                      → Barra superior
│   │   ├── EmptyState.jsx                  → Pantalla "no hay datos"
│   │   ├── ErrorBoundary.jsx               → Captura errores de React
│   │   ├── OfflineBar.jsx                  → Banner "sin conexión"
│   │   └── CategoryIcon.jsx                → Ícono según categoría incidente
│   │
│   ├── services/                           ← SERVICIOS EXTERNOS
│   │   ├── supabase.client.js              → Inicialización del cliente Supabase
│   │   ├── supabase.auth.js                → Funciones de autenticación
│   │   ├── supabase.realtime.js            → Suscripciones en tiempo real
│   │   ├── supabase.storage.js             → Subida de fotos/archivos
│   │   ├── maps.service.js                 → Leaflet + geolocalización GPS
│   │   ├── push.service.js                 → Web Push Notifications
│   │   └── offline.service.js              → Cache offline (Service Worker)
│   │
│   ├── hooks/                              ← HOOKS PERSONALIZADOS
│   │   ├── useAuth.js                      → Estado de autenticación global
│   │   ├── useLocation.js                  → GPS del dispositivo
│   │   ├── useReports.js                   → Reportes en tiempo real
│   │   ├── useAlerts.js                    → Alertas activas
│   │   ├── useOffline.js                   → Detección de conexión
│   │   ├── useToast.js                     → Sistema de notificaciones UI
│   │   └── useModal.js                     → Control de modales
│   │
│   ├── store/                              ← ESTADO GLOBAL (Zustand)
│   │   ├── auth.store.js                   → Usuario actual y sesión
│   │   ├── map.store.js                    → Estado del mapa (centro, zoom, filtros)
│   │   ├── reports.store.js                → Lista de reportes activos
│   │   └── ui.store.js                     → Tema, modal abierto, loading global
│   │
│   ├── utils/                              ← FUNCIONES UTILITARIAS
│   │   ├── date.utils.js                   → Formateo de fechas en español
│   │   ├── geo.utils.js                    → Cálculos de distancia/coordenadas
│   │   ├── validation.utils.js             → Validar formularios
│   │   ├── format.utils.js                 → Formatear texto, números
│   │   └── storage.utils.js                → LocalStorage helpers
│   │
│   ├── types/                              ← TIPOS DE DATOS (JSDoc)
│   │   ├── report.types.js                 → Tipo: Reporte ciudadano
│   │   ├── user.types.js                   → Tipo: Usuario / Perfil
│   │   ├── alert.types.js                  → Tipo: Alerta municipal
│   │   └── municipality.types.js           → Tipo: Municipio / Alcaldía
│   │
│   ├── router/                             ← RUTAS DE LA APP
│   │   ├── AppRouter.jsx                   → Router principal
│   │   ├── ciudadano.routes.jsx            → Rutas app ciudadano
│   │   └── admin.routes.jsx                → Rutas dashboard alcaldía
│   │
│   └── assets/                             ← RECURSOS ESTÁTICOS
│       ├── logo.svg                        → Logo CiudApp
│       ├── logo-dark.svg                   → Logo en fondo oscuro
│       ├── empty-map.svg                   → Ilustración mapa vacío
│       ├── onboarding-1.svg                → Imagen onboarding pantalla 1
│       ├── onboarding-2.svg                → Imagen onboarding pantalla 2
│       └── category-icons/                 → Íconos por categoría (svg)
│
├── docs/                                   ← DOCUMENTACIÓN DEL PROYECTO
│   ├── README.md
│   ├── AUDITORIA.md
│   ├── ARQUITECTURA.md                     ← ESTE ARCHIVO
│   ├── STACK.md
│   ├── ROADMAP.md
│   ├── sesiones/
│   ├── upgrades/
│   └── errores/
│
├── .env.local                              → Variables de entorno (NO subir a GitHub)
├── .env.example                            → Plantilla de variables (SÍ subir)
├── .gitignore                              → Archivos ignorados por Git
├── index.html                              → Punto de entrada HTML
├── vite.config.js                          → Configuración del builder Vite
├── package.json                            → Dependencias del proyecto
└── README.md                               → Instrucciones de instalación
```

## CONTEO DE ARCHIVOS POR FASE

| Fase | Archivos nuevos | Total acumulado |
|---|---|---|
| Fase 1 — Piloto | piloto.html (ya existe) | 1 |
| Fase 2 — MVP Core | config + auth + map + reports + services + router + base | ~45 |
| Fase 3 — App Completa | feed + alerts + profile + notifications + dashboard completo | ~90 |
| Fase 4 — Beta | hooks + store + utils + types + PWA | ~115 |
| Fase 5 — Lanzamiento | assets completos + docs actualizados | ~135 |
| Fase 6 — Escala | analytics + export + optimizaciones | ~158 |

**Total final estimado: ~158 archivos** (sin contar node_modules ni archivos generados)

---

## BASE DE DATOS SUPABASE — Tablas principales

```
usuarios          → id, nombre, email, barrio, municipio_id, foto_url, creado_en
municipios        → id, nombre, estado, coordenadas, plan_activo
reportes          → id, titulo, descripcion, categoria, lat, lng, foto_url,
                    usuario_id, municipio_id, estado, creado_en, actualizado_en
categorias        → id, nombre, icono, color (ej: seguridad, vialidad, servicios)
alertas           → id, titulo, descripcion, nivel, municipio_id, activa, creado_en
equipos           → id, nombre, municipio_id (bomberos, policía, tránsito)
asignaciones      → id, reporte_id, equipo_id, asignado_en, resuelto_en
```
