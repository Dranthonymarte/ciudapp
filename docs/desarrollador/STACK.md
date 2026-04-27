# CiudApp — Stack Tecnológico

> **Versión:** v0.1 · **Fecha:** 2026-04-16
> Filosofía: Costo $0 hasta Fase 4. Escalable cuando haya ingresos. Claude lo domina todo.
> Flujo de desarrollo, variables de entorno y plataformas futuras: ver [STACK-flujo-entorno.md](STACK-flujo-entorno.md)

---

## STACK COMPLETO

| Capa | Tecnología | Tier gratuito | Cuándo pagar |
|---|---|---|---|
| **Frontend** | React 18 + Vite | Siempre gratis | Nunca (open source) |
| **Base de datos** | Supabase (PostgreSQL) | 500MB BD, 2GB transfer | Fase 5+ (~$25/mes) |
| **Auth** | Supabase Auth | 50,000 usuarios/mes | Fase 5+ |
| **Storage (fotos)** | Supabase Storage | 1GB | Fase 5+ |
| **Realtime** | Supabase Realtime | 200 conexiones | Fase 5+ |
| **Hosting** | Cloudflare Pages | Ilimitado | Nunca (gratis) |
| **CDN + SSL** | Cloudflare | Ilimitado | Nunca |
| **Dominio** | Cloudflare Registrar | ~$8-10/año | Fase 2 |
| **Mapa** | Leaflet.js + OpenStreetMap | Siempre gratis | Nunca |
| **Control de versiones** | GitHub | Ilimitado público | Nunca |
| **CI/CD** | GitHub Actions | 2,000 min/mes | Rara vez |
| **Estado global** | Zustand | Siempre gratis | Nunca |
| **Router** | React Router v6 | Siempre gratis | Nunca |
| **PWA** | Vite PWA Plugin | Siempre gratis | Nunca |
| **Push notifications** | Web Push API | Siempre gratis | Nunca |
| **Moderación (Fase 5)** | Perspective API (Google) | Gratis | Nunca |

**Costo total Fase 1-4: $0** (excepto dominio ~$10/año si se registra)
**Costo Fase 5+: ~$25-50/mes** (Supabase Pro + posible Cloudflare Pro)

---

## POR QUÉ CADA TECNOLOGÍA

### React 18 + Vite
**¿Qué es?** React es la librería de UI más usada del mundo. Vite es el builder más rápido.
**Por qué SÍ:**
- Claude conoce React mejor que cualquier otro framework
- Modular por naturaleza (componentes = módulos)
- Ecosistema enorme: Leaflet, Supabase client, Zustand todo tiene soporte React
- Vite compila en < 1 segundo (desarrollo ultrarrápido)
- PWA con un solo plugin

**¿Es obligatorio?** No. Pero es la opción más inteligente para construir con IA.

---

### Supabase
**¿Qué es?** La alternativa open-source a Firebase. PostgreSQL + Auth + Storage + Realtime + API todo en uno, con dashboard visual.
**Por qué SÍ:**
- Un solo servicio reemplaza: base de datos, autenticación, subida de archivos, tiempo real
- Tier gratuito muy generoso para validar el producto
- Claude conoce Supabase perfectamente
- Dashboard visual: Anthony puede ver la BD sin código
- PostgreSQL = SQL estándar = más potente que Firestore
- Suscripciones en tiempo real nativas (reportes aparecen sin recargar)

**Límites del tier gratuito:**
- 500MB base de datos
- 1GB storage (fotos)
- 2GB de ancho de banda
- 50,000 usuarios activos/mes
- 200 conexiones simultáneas realtime

**Cuándo migrar a Pro ($25/mes):** Al superar 1 municipio activo con uso real o al llegar a Beta con 100+ usuarios.

---

### Cloudflare Pages
**¿Qué es?** Hosting gratuito para apps web estáticas con CDN global y SSL automático.
**Por qué SÍ:**
- Completamente gratuito, sin límite de ancho de banda
- CDN global = carga rápida desde Venezuela
- SSL automático (HTTPS) = requerido para geolocalización en móvil
- Deploy automático desde GitHub (push = publicar)
- Dominio personalizado gratis

**Por qué NO Vercel:** Cloudflare tiene mejor infraestructura en Latinoamérica. Menor latencia para usuarios venezolanos.

---

### Leaflet.js + OpenStreetMap
**¿Qué es?** La librería de mapas open-source más popular. OpenStreetMap = Google Maps pero gratis.
**Por qué SÍ:**
- 100% gratuito, sin API key, sin límites
- Venezuela está bien mapeada en OSM
- Leaflet es liviano y rápido
- Soporta marcadores, capas, clusters, heatmaps
- No depende de Google (que puede cambiar precios)

**Alternativa (Fase 5+):** Mapbox (más bonito, pero $0.5/1000 tiles). Considerar solo si se necesita diseño de mapa personalizado.

---

### GitHub
**¿Qué es?** Control de versiones y repositorio de código.
**Por qué SÍ:**
- Historial completo de cambios (si algo se rompe, se regresa)
- Integración directa con Cloudflare Pages (push = deploy)
- GitHub Actions para tests automáticos
- Gratis para repos públicos y privados

**Flujo de trabajo Anthony:**
1. Claude genera código → Anthony lo revisa
2. Se guarda en GitHub (commit)
3. Cloudflare detecta el cambio y despliega automáticamente
4. La app en vivo se actualiza en ~30 segundos

---

### Zustand
**¿Qué es?** Manejo de estado global. La "memoria" de la app entre pantallas.
**Por qué SÍ:** Más simple que Redux, menos código, Claude lo domina. Perfecto para guardar: usuario activo, reportes cargados, estado del mapa.

---

### PWA (Progressive Web App)
**¿Qué es?** Una web que se comporta como app nativa. Se puede instalar en Android/iPhone sin App Store.
**Por qué SÍ para Fase 1-4:**
- No cuesta nada (sin cuota de desarrollador)
- Se instala directamente desde Chrome/Safari
- Funciona offline con Service Worker
- Acceso a GPS, cámara, notificaciones push

**Cuándo pasar a App Store/Play Store (Fase 5):**
- Play Store: $25 (una sola vez) → Android nativo
- App Store: $99/año → iOS nativo
- Solo cuando haya usuarios reales pidiendo la app en la tienda

---
