# CiudApp — Log de Errores y Soluciones

> Registrar CADA error encontrado durante el desarrollo.
> Formato: fecha, error, causa, solución, lección aprendida.

---

## CÓMO USAR ESTE ARCHIVO

Cuando encuentres un error:
1. Anota la fecha
2. Describe el error exacto (copia el mensaje si es posible)
3. Escribe qué lo causó
4. Escribe cómo se resolvió
5. Escribe la lección para no repetirlo

---

## ERRORES RESUELTOS

### ERR-001 · 2026-04-16 · Instalación de markitdown
**Error:** `No module named markitdown` al intentar leer archivos PPTX
**Causa:** Módulo no instalado en el entorno Python
**Solución:** `pip install "markitdown[pptx]" python-pptx --user`
**Lección:** Verificar dependencias instaladas antes de usar herramientas de lectura de archivos.

---

## ERRORES PENDIENTES

*(Ninguno por ahora)*

---

## ALERTAS ACTIVAS (no son errores, son riesgos)

| # | Alerta | Impacto | Acción requerida |
|---|---|---|---|
| A-001 | Nombre CiudApp vs CuidApp inconsistente | Alto — afecta dominio, marca, SAPI | Decidir en equipo esta semana |
| A-002 | Esquema BD Supabase sin crear | Alto — bloquea módulo de reportes | Crear en Semana 4 |
| A-003 | Categorías venezolanas sin definir | Medio — necesarias antes de la BD | Definir antes de Semana 4 |
| A-004 | Sincronización Anthony-Ana no coordinada | Medio — dashboard debe estar listo antes del primer contrato | Alinear fechas con Ana |
| A-005 | Supabase free tier tiene límites | Bajo (Fase 1-4) | Planificar migración a Pro en Fase 5 |

---

## PLANTILLA PARA NUEVOS ERRORES

```
### ERR-XXX · YYYY-MM-DD · Título breve
**Error:** Mensaje exacto del error
**Archivo:** src/modules/.../archivo.jsx (línea X)
**Causa:** Por qué ocurrió
**Solución:** Cómo se resolvió
**Lección:** Qué aprendimos para no repetirlo
```

---

*Actualizar con cada sesión de desarrollo*
