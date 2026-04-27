# Cloudflare — Config CiudApp

## Servicio
Cloudflare Pages — build + deploy del frontend React.

## Dominios
- `ciudapp.com` → App ciudadano (React PWA)
- `ciudapp.com/admin` → Dashboard alcaldía

## Build settings (Cloudflare Pages)
- Framework preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`
- Root directory: `/`

## Variables de entorno (Cloudflare dashboard → Pages → Settings)
```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

## Reglas duras
- Nunca subir `.env.local` al repo
- Variables sensibles solo en el dashboard de Cloudflare
- Preview deployments: permitidos para PRs
- Production deploy: solo desde `main`
