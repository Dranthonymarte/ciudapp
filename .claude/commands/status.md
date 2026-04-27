# /status — Estado del proyecto

## Proceso (solo grep de headers)
1. `ls roadmap/activo/` → tarea activa
2. `ls -t roadmap/completado/ | head -3` → últimas 3
3. `grep -c "pendiente" ideas/BACKLOG.md` → total ideas
4. `ls seguridad/` → vulnerabilidades abiertas

## Salida (≤20 líneas)
```
📊 CiudApp — Status

🔨 Activa: [tarea o "ninguna"]
✅ Últimas 3:
  1. [tarea]
  2. [tarea]
  3. [tarea]
💡 Ideas pendientes: [N]
🔴 Vulnerabilidades abiertas: [N o "sin reportes"]
📅 Última actividad: [fecha]
```

## Restricciones
- Resumen ≤20 líneas
- NO abrir archivos completos
