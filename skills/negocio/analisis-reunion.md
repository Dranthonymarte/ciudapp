# Skill: Análisis Reuniones

## Activación
`/reunion` + transcripción pegada o ruta a archivo en `docs/reuniones/`

## Proceso
1. Extraer **Acuerdos** (bullets exactos, palabras clave del hablante)
2. Extraer **Tareas** en tabla: `[quién] → [qué] → [cuándo]`
3. Identificar **Riesgos** detectados (inconsistencias, bloqueos, dependencias)
4. Guardar en `docs/reuniones/REUNION-[YYYY-MM-DD].md`

## Estructura output
```markdown
# Reunión [YYYY-MM-DD]

## Acuerdos
- 

## Tareas
| Quién | Qué | Cuándo |

## Riesgos
- 

## Próxima decisión
- 
```

## NO
- Asumir datos no mencionados en la transcripción
- Modificar `contexto/CTX-*.md` sin aprobación Anthony
- Inventar fechas si no se dicen
