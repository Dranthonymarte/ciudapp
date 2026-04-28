# CiudApp — Estructura Completa del Proyecto

## 📊 ROADMAP EN CHAT — DONDE ESTAMOS HOY

### ✅ COMPLETADO
- **Fase 1** (Sem 1-2): Piloto HTML + Presentaciones Gamma + Naming CiudApp
- **Semana 3**: Scaffold React + Vite + GitHub + Cloudflare Pages
- **Semana 4**: Mapa base Leaflet + GPS + filtros + 10 marcadores mock + BD Supabase (4 tablas)
- **Semana 5**: Módulo reportes — 3-tap wizard + 8 categorías + foto→Storage + BottomNav + integración mapa
- **Semana 6**: Autenticación completa — Supabase Auth + LoginScreen + RegisterScreen + ForgotPassword + AuthGuard + rutas protegidas

### 🔄 EN CURSO
- **Semana 7**: Feed en Tiempo Real (supabase.realtime.js + FeedScreen + OfflineBar)

### ⏳ PRÓXIMAS
- **Semana 8**: Perfil + Pulido MVP (ProfileScreen + MyReports + EditProfile + testing)
- **Semana 9-10**: Alertas y notificaciones (AlertBanner + push.service.js + useAlerts)
- **Semana 11-12**: Dashboard Alcaldía v1 (admin panel + mapa admin + tabla incidentes)
- **Semana 13**: Dashboard Alcaldía v2 (alertas masivas + analytics)
- **Semana 14**: Offline-first + PWA completa
- **Fases 3-6**: App completa, beta privada, lanzamiento público, escala

---

## 📁 ESTRUCTURA DE CARPETAS

### RAÍZ del proyecto
```
ciudapp/
├── .git/                          Git history
├── .claude/                       Config Claude Code
│   ├── commands/                  Comandos custom
│   └── settings.local.json        Overrides locales
├── .gitignore                     Archivos ignorados
├── CLAUDE.md                      ✅ ÍNDICE DE SESIÓN — CARGA PRIMERO
├── ESTRUCTURA.md                  Este archivo
├── package.json                   Dependencias Node
├── vite.config.js                 Config Vite build
├── index.html                     Entry point HTML
├── .npmrc                         Config npm (legacy-peer-deps)
├── .env.local                     Variables locales (NO SUBIR A GIT)
└── ...
```

### 📂 `/src` — CÓDIGO FUENTE PRINCIPAL

```
src/
├── main.jsx                       Entry point React
├── App.jsx                        App raíz
├── index.css                      Estilos globales
│
├── 🏗️ /app                        Estructura de la aplicación
│   ├── AppCiudadano.jsx          Shell ciudadano (stub)
│   ├── Router.jsx                (deprecated) — usar AppRouter
│   │
│   ├── /modules                   Módulos de feature (por pantalla)
│   │   ├── /auth                  🔐 Autenticación
│   │   │   ├── LoginScreen.jsx          Login con Supabase
│   │   │   ├── RegisterScreen.jsx       Registro + confirmación email
│   │   │   ├── ForgotPassword.jsx       Reset de contraseña
│   │   │   ├── AuthGuard.jsx            HOC que protege rutas
│   │   │   └── auth.service.js          (stub) — usar supabase.auth.js
│   │   │
│   │   ├── /map                   🗺️ Módulo Mapa
│   │   │   ├── MapScreen.jsx            Pantalla principal con Leaflet
│   │   │   ├── MapLayer.jsx             Configuración de tiles OSM
│   │   │   ├── IncidentMarker.jsx       Marcador individual en mapa
│   │   │   ├── MapFilters.jsx           Selector de categoría
│   │   │   └── HeatmapLayer.jsx         Mapa de calor (fut)
│   │   │
│   │   ├── /reports               ⚠️ Módulo Reportes
│   │   │   ├── CreateReportScreen.jsx   Wizard 3-tap: categoría → descripción → foto
│   │   │   ├── ReportCategories.jsx     Selector visual de 8 categorías
│   │   │   ├── PhotoUpload.jsx          Subida de fotos a Supabase Storage
│   │   │   ├── ReportCard.jsx           Card individual
│   │   │   ├── ReportStatus.jsx         Badge de estado del reporte
│   │   │   ├── ReportDetail.jsx         Detalle completo
│   │   │   └── reports.service.js       crearReporte, obtenerReportes, actualizarEstado
│   │   │
│   │   ├── /feed                  📰 Feed en Tiempo Real (SEM 7)
│   │   │   ├── FeedScreen.jsx           Lista de reportes recientes
│   │   │   ├── FeedItem.jsx             Item individual
│   │   │   ├── FeedFilter.jsx           Filtros de feed
│   │   │   └── (supabase.realtime.js va en /services)
│   │   │
│   │   ├── /alerts                🔔 Alertas (SEM 9-10)
│   │   │   ├── AlertBanner.jsx          Banner de alerta activa en mapa
│   │   │   ├── AlertDetail.jsx          Detalle de alerta
│   │   │   ├── PushPermission.jsx       Solicitar permiso de notificaciones
│   │   │   └── (push.service.js va en /services)
│   │   │
│   │   ├── /profile               👤 Perfil Usuario (SEM 8)
│   │   │   ├── ProfileScreen.jsx        Pantalla de perfil
│   │   │   ├── MyReports.jsx            Mis reportes enviados
│   │   │   └── EditProfile.jsx          Editar nombre/barrio/foto
│   │   │
│   │   └── /notifications         🔕 Notificaciones
│   │       ├── NotifItem.jsx
│   │       └── NotifList.jsx
│   │
│   └── /router                     🚀 Configuración de rutas
│       ├── AppRouter.jsx                Router principal — carga AppRouter.jsx desde aquí
│       ├── ciudadano.routes.jsx         Rutas de ciudadano (/login, /register, /*, etc)
│       └── admin.routes.jsx             Rutas de admin (fut)
│
├── 🛠️ /services                    Lógica de negocio (sin UI)
│   ├── supabase.client.js          Instancia de Supabase
│   ├── supabase.auth.js            ✨ signUp, signIn, signOut, resetPassword
│   ├── supabase.storage.js         Upload de fotos a bucket reportes-fotos
│   ├── supabase.realtime.js        Suscripción a tabla reportes (SEM 7)
│   ├── maps.service.js             Obtener GPS del usuario + ubicación actual
│   ├── offline.service.js          Detectar conexión/desconexión
│   └── push.service.js             Web Push Notifications (SEM 9)
│
├── 🏪 /store                       Estado global (Zustand)
│   ├── auth.store.js               ✨ user, session, loading, error
│   ├── map.store.js                filtroCategoria, selectedMarker
│   ├── reports.store.js            reportes, refreshTrigger
│   ├── ui.store.js                 reportarOpen (wizard modal)
│   └── ...other stores
│
├── 🪝 /hooks                       Custom React hooks
│   ├── useAuth.js                  ✨ Sesión global con onAuthStateChange
│   ├── useLocation.js              GPS del usuario (lat, lng)
│   ├── useReports.js               Obtener reportes con suscripción realtime
│   ├── useAlerts.js                Suscripción a alertas (SEM 9)
│   ├── useOffline.js               Detectar conexión online/offline
│   ├── useModal.js                 Abrir/cerrar modales
│   └── useToast.js                 Mostrar toasts
│
├── 🎨 /components                  Componentes reutilizables
│   ├── BottomNav.jsx               ✨ Barra inferior: Mapa | Alertas | Reportar | Noticias | Perfil
│   ├── AuthLayout.jsx              ✨ Layout wrapper para rutas autenticadas + BottomNav
│   ├── OfflineBar.jsx              Banner "sin conexión" (SEM 7)
│   ├── Toast.jsx                   Notificación flotante
│   └── Modal.jsx                   Modal genérico
│
├── ⚙️ /config                      Configuración constante
│   ├── constants.js                ✨ VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, etc
│   ├── theme.config.js             Colores: #3B82F6 (azul), #111318 (negro), etc
│   └── typography.config.js        Fuentes: Syne (titles), DM Sans (body)
│
├── 📝 /types                       TypeScript types (si usiamos TS)
│   └── index.d.ts
│
└── 🛠️ /utils                       Funciones utilitarias
    └── ...helpers
```

---

### 📚 `/docs` — DOCUMENTACIÓN

```
docs/
├── /desarrollador                 📖 Para developers
│   ├── README.md                   Inicio rápido
│   ├── ROADMAP.md                  Sem 1-8 detallado
│   ├── ROADMAP-fases-3-6.md       Sem 9-25+ planeado
│   ├── ARQUITECTURA.md             Decisiones de diseño
│   ├── STACK.md                    Tech stack completo
│   ├── AUDITORÍA.md                Seguridad, compliance, RLS
│   └── API.md                      Endpoints Supabase
│
├── /fundadores                     📋 Para Anthony, Sebastián, Ana
│   ├── CONTEXTO.md                 Historia de CiudApp
│   ├── MERCADO.md                  Análisis de mercado
│   └── HITO.md                     Milestones y KPIs
│
├── /usuario                        👥 Para ciudadanos (cuando existan)
│   ├── MANUAL.md                   Cómo crear un reporte
│   └── FAQ.md                      Preguntas frecuentes
│
└── /sesiones                       📹 Transcripciones de reuniones
    └── ...
```

---

### 📋 `/reglas` — NORMAS PERMANENTES

```
reglas/
└── REGLAS-PERMANENTES.md           ✅ TOKEN GUARD + CONDUCTA + ARQUITECTURA + FALLAS CONOCIDAS
```

---

### 🗺️ `/roadmap` — HISTÓRICO DE TAREAS

```
roadmap/
├── /activo/                        Tareas en curso (vacío = nada activo)
│   └── (si hay algo: YYYY-MM-DD-nombre.md)
│
└── /completado/                    ✅ Tareas cerradas
    ├── 2026-04-27-semana3-scaffold-react.md
    ├── 2026-04-27-semana4-mapa-base.md
    ├── 2026-04-27-semana5-modulo-reportes.md
    └── 2026-04-28-semana6-autenticacion.md
```

---

### 🎯 `/ideas` — BACKLOG

```
ideas/
└── BACKLOG.md                      Características futuras no planificadas
```

---

## 🔐 ENTORNO & BUILD

```
.env.local (NO VERSIONADO)
├── VITE_SUPABASE_URL=https://jnjvilxckkqxuugrgbam.supabase.co
└── VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Cloudflare Pages (Variables de entorno en dashboard)
├── VITE_SUPABASE_URL
└── VITE_SUPABASE_ANON_KEY
```

---

## 🚀 FLUJO DE TRABAJO

### 1️⃣ Inicio de sesión
```
/iniciar ← Lee roadmap/activo/ + roadmap/completado/ + CLAUDE.md
```

### 2️⃣ Durante la semana
```
roadmap/activo/YYYY-MM-DD-semana-X-nombre.md
├── Estado: en curso
├── Archivos a tocar: [...]
└── Pendientes: [ ] item1, [ ] item2...
```

### 3️⃣ Al cerrar tarea
```
1. Verificar: preview en navegador + deploy + env vars
2. Actualizar roadmap/activo/... → Estado: completado
3. git commit + git push (automático)
4. mv roadmap/activo/ → roadmap/completado/
5. Actualizar CLAUDE.md histórico
/cerrar
```

---

## 📱 DEPLOY & STAGING

```
Local (localhost:5173)
    ↓ npm run dev
    ↓
GitHub (Dranthonymarte/ciudapp)
    ↓ git push
    ↓
Cloudflare Pages
    ↓ auto-deploy
    ↓
ciudapp.pages.dev ← LA URL PÚBLICA
```

---

## 🎯 RESUMEN RÁPIDO

| Pregunta | Respuesta |
|---|---|
| **¿Dónde está TODO el código?** | `/src/` — todo lo que importa está ahí |
| **¿Dónde ver qué falta hacer?** | `docs/desarrollador/ROADMAP.md` + `roadmap/activo/` |
| **¿Dónde guardar notas?** | `reglas/REGLAS-PERMANENTES.md` (permanente) o `roadmap/completado/` (sesión) |
| **¿Dónde va componente nuevo?** | Si es reutilizable → `/components/` | Si es pantalla → `/app/modules/[feature]/` |
| **¿Dónde va lógica de servicio?** | `/services/` (sin UI) o `/hooks/` (con React) |
| **¿Dónde estado global?** | `/store/` con Zustand |
| **¿Cómo deployar?** | `git push` automático (Cloudflare Pages) |
| **¿Dónde están las reglas?** | `reglas/REGLAS-PERMANENTES.md` |

---

## 📍 ARCHIVO VERDAD PARA CADA SESIÓN

Carga SIEMPRE en orden:
1. **CLAUDE.md** ← indicador de sesión + histórico
2. **REGLAS-PERMANENTES.md** ← comportamiento permanente
3. **ROADMAP.md** ← qué falta hacer
4. **roadmap/activo/** ← tarea actual (si existe)
5. **Contexto específico** ← si la tarea lo requiere

---

**Última actualización:** 2026-04-28 — Semana 6 Autenticación completada
