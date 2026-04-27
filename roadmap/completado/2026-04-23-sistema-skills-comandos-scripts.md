# sistema-skills-comandos-scripts
Fecha inicio: 2026-04-23
Fecha cierre: 2026-04-23
Fase: 2
Estado: completado

## Objetivo
Crear sistema completo de skills + comandos + scripts para CiudApp.

## Archivos tocados
- `.claude/commands/` → +10 (iniciar, continuar, nueva-tarea, cerrar, reunion, idea, regla, auditoria, status, comandos)
- `skills/dev/` → +4 (bugfix-ciudapp, supabase-protocol, deploy-ciudapp, caveman-writer)
- `skills/ux/` → +1 (ux-designer-ciudapp) + rename `diseño → ux`
- `skills/negocio/` → +4 (analisis-reunion, plan-accion, pronostico, skill-creator)
- `skills/auditoria/` → +1 (seguridad-test)
- `scripts/` → +3 (sesion.py, nueva-skill.py, backup-contexto.py)
- `docs/usuario/` → +2 (MANUAL-CIUDADANO, MANUAL-ALCALDIA)
- `docs/desarrollador/MANUAL-DEV.md`
- `docs/fundadores/MANUAL-FUNDADORES.md`
- `docs/reuniones/` → creada
- `stack/supabase|cloudflare|github/README.md` → +3
- `.gitignore` → creado (incluye backups/, contexto/empresa/)
- `reglas/REGLAS-PERMANENTES.md` → +sección CONTEXTO ALERT 30%

## Notas
- Comandos antiguos (bugfix-ciudapp, deploy-ciudapp, supabase-protocol, cerrar-sesion, etc.) siguen en `.claude/commands/` sin borrar — decisión pendiente Anthony.
- Verificación final esperaba 9 comandos; se crearon 10 (spec listaba 10).
