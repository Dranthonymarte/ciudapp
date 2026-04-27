# /continuar — Retomar tarea activa

## Proceso
1. `grep -l "Estado: en curso" roadmap/activo/*.md` → detectar tarea
2. `grep -A 20 "^## Pendientes" roadmap/activo/[tarea].md` → pendientes
3. `grep "^## Archivos a tocar" roadmap/activo/[tarea].md` → siguiente archivo

## Salida
- Qué falta (lista de pendientes sin marcar)
- Archivo a tocar (ruta exacta)
- Acción concreta (primer bullet pendiente)

## Restricciones
- NO releer archivos ya leídos en sesión
- NO abrir el archivo del roadmap completo — solo secciones por grep
- Si no hay tarea activa → redirigir a `/nueva-tarea`
