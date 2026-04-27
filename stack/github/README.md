# GitHub — Config CiudApp

## Repo
Host del código fuente de CiudApp (frontend + docs + scripts).

## Branch strategy
- `main` → producción (deploy automático a Cloudflare Pages)
- `dev` → integración
- Feature branches: `feat/[nombre-kebab]`, `fix/[nombre-kebab]`

## Commits (convencional)
```
feat(scope): descripción
fix(scope): descripción
refactor(scope): descripción
docs(scope): descripción
chore(scope): descripción
```

## Archivos nunca commiteados
- `.env.local`
- `contexto/empresa/`
- `backups/`
- `node_modules/`
- `dist/`

## PRs
- Título: imperativo en español, ≤60 chars
- Descripción: qué cambia, por qué, cómo probar
- Merge solo con revisión Anthony
