# /iniciar — Sesión CiudApp

## Proceso
1. `grep` headers en `roadmap/activo/` → tarea activa
2. `ls -t roadmap/completado/ | head -1` → última completada
3. Detectar última actividad por fecha más reciente de archivo modificado
4. Obtener pendiente de sesión anterior:
   a. `ls -t roadmap/completado/ | head -1` → obtener último archivo completado
   b. `grep -A5 "Pendiente\|Próximo paso" roadmap/completado/[ese archivo]`
   c. Mostrar exactamente lo que diga ese campo
   d. Si no hay campo → mostrar "revisar roadmap/completado/[archivo] manualmente"

## Salida OBLIGATORIA (formato exacto)
```
─────────────────────────
🚀 CiudApp — Sesión activa
📌 Tarea activa: [roadmap/activo/ o "ninguna"]
✅ Última completada: [roadmap/completado/ más reciente]
⚡ Pendiente de sesión anterior: [grep de Pendiente/Próximo paso]
📊 Última actividad: [fecha último archivo modificado]

¿Qué hacemos hoy?
1. /continuar — Retomar tarea activa
2. /nueva-tarea — Elegir del roadmap
3. /reunion — Procesar transcripción
4. /idea — Agregar al BACKLOG
5. /regla — Agregar regla permanente
6. /auditoria — Revisar seguridad módulo
7. /status — Estado completo
8. /comandos — Ver todos los comandos
─────────────────────────
Sugerencia: [comando más relevante según tarea activa]
```

## Restricciones
- NO abrir archivos completos — solo grep de headers
- NO pedir confirmación para mostrar el menú
- Sugerencia al final SIEMPRE, basada en tarea activa
