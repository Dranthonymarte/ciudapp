# /reunion — Procesar transcripción

## Proceso
1. Esperar transcripción pegada o ruta en `docs/reuniones/`
2. Extraer y guardar en `docs/reuniones/REUNION-[YYYY-MM-DD].md`

## Estructura archivo
```markdown
# Reunión [YYYY-MM-DD]

## Acuerdos tomados
- 

## Tareas
| Quién | Qué | Cuándo |
|-------|-----|--------|

## Riesgos o inconsistencias
- 

## Próxima decisión requerida
- 
```

## Restricciones
- NO asumir datos no mencionados
- NO modificar CTX ni REGLAS sin aprobación Anthony
- Si hay contradicción con CTX → ALERTA antes de guardar
