# Supabase — Config CiudApp

## Variables requeridas (`.env.local`)
```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

## Esquema (miniatura)
`usuarios | municipios | categorias | reportes | alertas | equipos | asignaciones`

Schema completo: `docs/desarrollador/README.md`

## Reglas duras
- `SELECT *` prohibido siempre
- RLS obligatorio en toda tabla nueva
- Queries solo en `src/services/` — nunca en componentes
- Claves nunca en código — solo en `.env.local`

## Migraciones
Carpeta: `supabase/migrations/` (crear cuando exista)
Formato: `YYYYMMDDHHMMSS_nombre-kebab.sql`
