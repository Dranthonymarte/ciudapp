# /cerrar — Cerrar tarea activa

## Proceso
1. Detectar tarea activa en `roadmap/activo/[tarea].md`
2. Cambiar `Estado: en curso` → `Estado: completado`
3. `mv roadmap/activo/[tarea].md roadmap/completado/[YYYY-MM-DD]-[tarea].md`
4. Append en `CLAUDE.md`: `✅ [fecha] — [tarea completada]`
5. Resumen: qué se hizo + archivos tocados + próxima tarea sugerida

## Restricciones
- NO preguntar si hay tarea activa evidente → actuar directo
- NO abrir archivos de contexto largos — solo roadmap/activo/
- Resumen ≤5 líneas
