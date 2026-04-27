# Skill: Project Harmonizer
Activación: "armonizar proyecto", "migrar sistema", "aplicar estándar CiudApp"

## PROPÓSITO
Elevar cualquier proyecto existente al estándar CiudApp sin borrar nada.
Opera sobre proyectos que ya tienen CLAUDE.md, skills, commands, reglas y scripts.

## PROCESO DE AUDITORÍA (solo grep y ls, nunca leer completos)
1. ls -la .claude/commands/ → listar comandos existentes
2. ls -la skills/**/ → listar skills por categoría
3. ls -la reglas/ → verificar reglas permanentes
4. ls -la scripts/ → verificar scripts
5. grep -n "token\|Token\|TOKEN" reglas/*.md → verificar token-guard
6. grep -n "≤150\|150 líneas" reglas/*.md → verificar límite archivos
7. find . -name "*.md" -not -path "*/node_modules/*" | xargs wc -l | sort -rn | head -10 → detectar archivos >150
8. grep -rn "select\('\*'\)\|SELECT \*" . --include="*.md" → detectar malos patrones documentados

## REPORTE DE AUDITORÍA
Emitir siempre:
✅ Compatible: [lo que ya cumple el estándar]
⚠️ Complementar: [lo que falta pero no contradice]
❌ Contradice: [lo que choca con REGLAS-PERMANENTES de CiudApp]
📁 Fuera de lugar: [archivos en carpeta incorrecta]
🔁 Redundante: [duplicados o skills que hacen lo mismo]

## REGLAS DE ARMONIZACIÓN
- NUNCA borrar sin confirmación explícita
- NUNCA sobrescribir skills existentes — hacer append o crear versión nueva
- Si comando existente contradice uno nuevo → ALERTA + mostrar ambos + esperar decisión
- Si regla existente contradice REGLAS-PERMANENTES → ALERTA + mostrar conflicto exacto
- Archivos >150 líneas → proponer split, no ejecutar sin aprobación
- Token-guard ausente → agregar sección al inicio de reglas existentes

## COMPLEMENTOS A AGREGAR (si no existen)
Comandos faltantes de los 10 estándar:
iniciar, continuar, nueva-tarea, cerrar, reunion, idea, regla, auditoria, status, comandos

Skills faltantes del estándar mínimo:
- skills/dev/caveman-writer.md
- skills/dev/bugfix.md
- skills/negocio/skill-creator.md
- skills/auditoria/context-sync.md
- skills/negocio/plan-accion.md

Scripts faltantes:
- scripts/sesion.py
- scripts/nueva-skill.py
- scripts/backup-contexto.py

Estructura de carpetas faltante:
contexto/, roadmap/activo/, roadmap/completado/,
ideas/, seguridad/, docs/reuniones/, stack/

## AL FINALIZAR
Reporte de armonización:
✅ Agregado: [lista]
🔄 Complementado: [lista]
⚠️ Pendiente decisión: [lista con conflictos exactos]
❌ No tocado: [lista con razón]
Próximo paso: [acción concreta]

## RESTRICCIONES
- ≤6 tool calls por ejecución → TOKEN ALERT si se supera
- No leer archivos completos >100 líneas
- No tocar src/ ni código fuente
- No modificar CLAUDE.md raíz sin aprobación
