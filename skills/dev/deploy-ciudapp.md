# Skill: Deploy CiudApp

## Activación
Palabras clave: `deploy`, `publicar`, `Cloudflare`, `producción`, `push`

## Checklist obligatorio (bloquear si falla)
- [ ] `.env.local` no commiteado → `grep -c ".env.local" .gitignore` debe ser ≥1
- [ ] Sin `console.log` en producción → `grep -rn "console.log" src/ | wc -l` = 0
- [ ] Build local sin errores → `npm run build`
- [ ] Variables configuradas en Cloudflare Pages (manual check)

## Comandos
```bash
git status
git add [archivos específicos]   # nunca `git add .`
git commit -m "tipo(scope): descripción"
git push origin main
```

## Tipos de commit (convencional)
feat | fix | refactor | docs | chore | perf

## NO
- `git add .` → puede filtrar `.env`
- `git push --force`
- Deploy con tests rotos
