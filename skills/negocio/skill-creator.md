# Skill: Skill Creator

## Activación
- **Automática**: misma tarea ejecutada 2+ veces en sesiones distintas
- **Manual**: `crea skill para X` / `nueva skill`

## Proceso
1. **ALERTA**: `⚠️ Detecté patrón en [X]. ¿Creo skill?`
2. Esperar aprobación Anthony (sí/no/editar)
3. Crear en `skills/[categoría]/[nombre-kebab].md`
4. `grep` en `reglas/REGLAS-PERMANENTES.md` → verificar no contradice
5. Reportar: nombre, ubicación, activación, qué hace, qué NO hace

## Plantilla skill nueva
```markdown
# Skill: [Nombre]

## Activación
Palabras clave: `k1`, `k2`

## Proceso

## NO
```

## Categorías válidas
- `skills/dev/` — código
- `skills/ux/` — diseño y UI
- `skills/negocio/` — estrategia
- `skills/auditoria/` — seguridad y tests

## NO
- Crear skill sin aprobación
- Duplicar skill existente (verificar con `ls skills/**/*.md` primero)
- Contradecir reglas permanentes
