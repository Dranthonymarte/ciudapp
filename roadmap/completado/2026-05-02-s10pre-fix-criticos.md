# S10-Pre — Fix 6 Críticos Auditoría S9

**Estado:** ✅ Cerrada · **Fecha:** 2026-05-02 · **Duración:** 1 sesión

## Entregables

- [x] **C1** — Trigger `prevent_rol_change()` en `usuarios`: bloquea auto-promoción de rol desde cliente autenticado (`auth.uid() IS NOT NULL`). Service_role (sin JWT) puede cambiar rol para operaciones admin.
- [x] **C2** — RLS `mensajes_reporte`: `mensajes_lectura` acotado a autor del reporte + rol alcaldía. `mensajes_insert` requiere que `auth.uid() = user_id` y sea participante.
- [x] **C3** — `usuarios` SELECT `USING(true)`: permite el JOIN `usuarios(nombre, apellido)` en `ReportChat.jsx` sin exponer datos sensibles adicionales.
- [x] **C4** — CHECK `estado` expandido a `nuevo|pendiente|en_proceso|resuelto|rechazado`. Default cambiado a `'nuevo'`. Filas existentes `pendiente` migradas a `nuevo`.
- [x] **C5** — `subirFotoReporte()` valida `file.size ≤ 5MB` y `file.type ∈ {jpeg, png, webp}` antes del upload. Error descriptivo al usuario.
- [x] **C6** — Columna `reportes.direccion text` agregada. `crearReporte()` acepta `direccion`. `CreateReportScreen.jsx` la persiste a BD.

## Archivos modificados

- `src/services/supabase.storage.js` (+7 líneas: MAX_SIZE + ALLOWED_TYPES + guards)
- `src/app/modules/reports/reports.service.js` (+1 param: direccion)
- `src/app/modules/reports/CreateReportScreen.jsx` (+1 línea: pasa direccion al servicio)

## Migración Supabase aplicada

`s10_fix_criticos_audit` — trigger C1, RLS C2+C3, CHECK C4, columna C6, 4 índices de performance:
```sql
idx_reportes_estado | idx_reportes_categoria | idx_reportes_municipio | idx_reportes_user
```

## Score post-fix (estimado)

| Dimensión | Pre-fix | Post-fix | Peso |
|-----------|---------|----------|------|
| Seguridad | 5/10 | 7.5/10 | 20% |
| Escalabilidad | 5/10 | 5.5/10 | 15% |
| Resto | — | sin cambio | 65% |
| **GLOBAL** | **6.4/10** | **~7.0/10** | — |

**Meta roadmap:** 8.5/10 antes de piloto Chacao real (ver `semana10-12-hardening-piloto.md`).
