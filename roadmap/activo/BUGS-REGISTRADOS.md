# BUGS REGISTRADOS — CiudApp
> Actualizado: 2026-05-02 · Auditoría sesión semana 7

## ✅ RESUELTOS ESTA SESIÓN

| # | Severidad | Archivo | Descripción | Fix aplicado |
|---|-----------|---------|-------------|--------------|
| B-01 | 🔴 CRÍTICO | `hooks/useAuth.js` | Doble suscripción a onAuthStateChange — race condition en auth state | useAuth simplificado a solo leer store; AppRouter es el único suscriptor |
| B-02 | 🔴 CRÍTICO | `reports/CreateReportScreen.jsx:70` | Z-index 1000 igual que ReportDetail — colisión visual | Subido a 1001 |
| B-03 | ⚠️ MEDIO | `reports/PhotoUpload.jsx:10` | Memory leak — URL.createObjectURL sin revokeObjectURL | useEffect cleanup + revoke en quitar() |
| B-04 | ⚠️ MEDIO | `map/MapScreen.jsx:45` | Supabase count query sin .catch() | .catch(() => {}) añadido |
| B-05 | ⚠️ MEDIO | `utils/geo.utils.js:7` | Nominatim sin validar res.ok antes de res.json() | if (!res.ok) throw new Error() añadido |

---

## ⚠️ PENDIENTES (registrados, no bloqueantes hoy)

| # | Severidad | Archivo | Descripción | Prioridad |
|---|-----------|---------|-------------|-----------|
| B-06 | 🟡 MENOR | `map/MapScreen.jsx:21` | MapFlyTo useEffect deps suprimidas con eslint-disable | Documentar intención o refactorizar en S8 |
| B-07 | 🟡 MENOR | `router/admin.routes.jsx` | Vacío — rutas /admin retornan null sin 404 | Implementar en S9 (admin dashboard) |
| B-08 | 🟡 MENOR | Múltiples archivos | Inline styles sin memoización (objetos nuevos en cada render) | Optimizar en S10 con useMemo o StyleSheet |
| B-09 | 🟡 MENOR | `router/AppRouter.jsx` | getSession() + onAuthStateChange en cascada — potencial timing gap en Supabase v2 | Monitorear; si aparece loading flash → refactorizar a solo onAuthStateChange |

---

## 🔴 DEUDA TÉCNICA (no bugs, pero riesgo)

| # | Archivo(s) | Descripción | Semana objetivo |
|---|-----------|-------------|-----------------|
| D-01 | `services/supabase.realtime.js` | Vacío — mapa no es realtime | S9 |
| D-02 | `services/offline.service.js` | Vacío — sin soporte offline | S10 |
| D-03 | `components/ErrorBoundary.jsx` | Vacío — crashes no capturados | S10 |
| D-04 | `components/Toast.jsx` | Vacío — sin feedback global de errores | S8 |
| D-05 | `app/modules/alerts/` | Módulo completo vacío | S8 |
| D-06 | `app/modules/feed/` | Módulo completo vacío | S8 |
| D-07 | `app/modules/profile/` | Módulo completo vacío | S8 |
| D-08 | `map/HeatmapLayer.jsx` | Stub — no renderiza nada | S12 |
| D-09 | `map/MarkerCluster.jsx` | Stub — marcadores no agrupados | S11 |
| D-10 | 22 archivos `export {}` | Servicios y tipos vacíos | S8-S10 según módulo |

---

## CONTEO
- Resueltos hoy: **5**
- Pendientes menores: **4**
- Deuda técnica: **10**
- **Total registrado: 19**
