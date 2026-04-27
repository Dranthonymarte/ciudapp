# limpieza-estructura-docs

**Fecha:** 2026-04-23
**Estado:** completado
**Tipo:** mantenimiento · sin tarea activa previa (registro retroactivo)

## Objetivo
Auditar y limpiar la estructura del proyecto antes de iniciar código de Fase 2. Eliminar archivos sueltos en raíz, consolidar carpetas con un solo archivo, dividir docs >150 líneas y documentar dónde va cada tipo de archivo.

## Archivos tocados

### Movimientos/renames
- `Contexto de sesion.md` → `docs/sesiones/SESION-000-legacy.md`
- `UI-SYSTEM.md` → `docs/desarrollador/UI-SYSTEM.md` (luego split)
- `Captures sosafe/` → `docs/desarrollador/benchmark-sosafe/` (8 jpg)
- `Presentaciones/` → `docs/fundadores/presentaciones/` (4 pptx + subcarpeta piloto)
- `docs/desarrollador/CiudApp.html` → `docs/desarrollador/prototipos/CiudApp.html`
- `docs/fundadores/anthony.txt` → `docs/fundadores/anthony.md`
- `docs/errores/ERRORES-LOG.md` → `seguridad/ERRORES-LOG.md` (+ rmdir)
- `docs/upgrades/UPGRADE-v0.1.md` → `docs/desarrollador/CHANGELOG.md` (+ rmdir)

### Splits de docs (9 archivos nuevos, todos ≤150 líneas)
- `PRESENTACION-TECH.md` (439) → fundamentos (137) + seguridad (139) + stack (76) + roadmap (91)
- `ARQUITECTURA.md` (281) → modulos-ciudadano (60) + modulos-dashboard (50) + infraestructura (139) + decisiones (47)
- `UI-SYSTEM.md` (412) → tokens (174) + componentes (71) + layout (111) + patrones (60)
- Originales eliminados.

### Creados
- `.claude/commands/archivo.md` → comando /archivo (11 comandos totales ahora)
- `docs/reuniones/README.md` + `docs/reuniones/GUIA-ARCHIVOS.md`
- `.gitkeep` en ideas/, roadmap/activo/, seguridad/, contexto/empresa/

### Editados
- `CLAUDE.md` → añadido "Código fuente: aún no iniciado", "Repo GitHub: pendiente", y línea de sesiones narrativas vs tareas cerradas (42 líneas, sigue ≤80)

## Deuda pendiente (4 archivos docs/desarrollador/ aún >150)
- `ROADMAP.md` (256) — split por fases
- `AUDITORIA.md` (224) — mover a `seguridad/AUDITORIA-2026-04-16.md`
- `STACK.md` (184) — split por capa
- `UI-SYSTEM-tokens.md` (174) — split colores vs tipografía

## Próximo paso
Resolver deuda de 4 archivos >150 O iniciar scaffold de Fase 2 (repo GitHub + Vite + estructura `src/` según ARQUITECTURA-modulos-*.md). Decisión de Anthony.
