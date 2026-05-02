# CTX-03 — Stack Tecnológico

**Costos:** Fase 1-4 = $0 | Fase 5+ = ~$25-50/mes

**Frontend:** React 18 + Vite + React Router v6 + Zustand + Tailwind CSS

**Backend:** Supabase (PostgreSQL + Auth + Realtime + Storage)

**Hosting:** Cloudflare Pages (CDN óptimo Latinoamérica)

**Mapa:** Leaflet.js + Carto Light tiles (OpenStreetMap data, aspecto limpio tipo Google Maps, gratuito, sin API key)

**PWA:** Vite PWA Plugin + Web Push API

**BD principal (Fase 2):**
- usuarios | reportes | categorías | municipios | equipos_municipales

**.env.local:**
VITE_SUPABASE_URL=https://[project].supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
VITE_APP_NAME=CiudApp
(Nunca en GitHub. .env.local en .gitignore)

**Deploy:** local dev → git commit → push GitHub → Cloudflare deploya automático (~30s)
