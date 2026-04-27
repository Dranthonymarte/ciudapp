# /nueva-tarea — Crear tarea del roadmap

## Proceso
1. `grep -n "^- \[ \]" docs/desarrollador/ROADMAP.md` → tareas pendientes por fase
2. Mostrar lista numerada agrupada por fase
3. Anthony elige por número
4. Crear `roadmap/activo/[YYYY-MM-DD]-[nombre-kebab].md` con plantilla

## Plantilla archivo nuevo
```markdown
# [nombre-tarea]
Fecha inicio: [hoy]
Fase: [X]
Objetivo:
Archivos a tocar:
Estado: en curso
Pendientes:
- [ ] 
```

## Restricciones
- NO abrir ROADMAP.md completo — solo grep de líneas pendientes
- NO crear tarea si ya existe una activa sin cerrar → alertar y sugerir `/cerrar`
- Esperar elección numerada, no asumir
