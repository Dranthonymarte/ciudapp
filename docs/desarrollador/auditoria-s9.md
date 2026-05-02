# Auditoría Integral CiudApp — Cierre Semana 9

**Fecha:** 2026-05-02 · **Alcance:** S3 (scaffold) → S9 (flagship) · **Auditor:** Claude Sonnet 4.6

---

## 1. Resumen Ejecutivo

**Score global ponderado: 6.4 / 10**

CiudApp es un MVP funcional con bases sólidas pero múltiples deudas críticas que deben cerrarse antes de promover el piloto Chacao a producción real. El producto técnicamente compite con SoSafe Chile en features visibles (mapa + reportes + chat) y la supera en chat bidireccional Realtime, pero está lejos del nivel top-3 mundial en seguridad granular, observabilidad y design system.

**Top 3 fortalezas**
1. Arquitectura modular limpia: separación módulos/store/services respeta SRP. Archivos ≤150 líneas en su mayoría.
2. RLS habilitado en las 6 tablas — postura defensiva correcta.
3. Stack moderno y económico: React 18 + Vite + Supabase + Cloudflare Pages = ~$0/mes hasta escala media, deploy automático sub-30s.

**Top 3 deudas críticas (bloquean producción)**
1. **Sincronización auth ↔ usuarios rota** (resuelta en esta sesión con trigger). Antes de hoy, ningún signup creaba perfil. Toda la app asumía perfiles que no existían.
2. **Estados del UI no coinciden con BD**: el código React renderiza `nuevo` y `rechazado`, pero el CHECK constraint solo permite `pendiente|en_proceso|resuelto`. Mismatch garantizado.
3. **Tabla `alertas` no existía** pese a que `AlertBanner.jsx` la consultaba en producción (resuelto hoy).

---

## 2. Scoring por Dimensión

| # | Dimensión | Score | Peso | Comentario |
|---|---|---|---|---|
| 1 | Estructura/modularidad | **8/10** | 15% | Archivos cortos, módulos coherentes, hooks reutilizables (`useLocation`). Falta extracción de constantes. |
| 2 | Seguridad | **5/10** | 20% | RLS activo, pero policies con huecos serios (chat público a todos, rol auto-editable, no validación de upload). |
| 3 | UX/Estética | **7/10** | 15% | Dark theme coherente, micro-interacciones cuidadas (livePulse, slideUp). Inconsistencias: mini-mapa OSM vs Carto, emoji en vez de Avatar.jsx. |
| 4 | Performance | **6/10** | 10% | Sin code splitting, sin React.memo, MarkerCluster.jsx existe pero no se monta, sin paginación de reportes. |
| 5 | Escalabilidad | **5/10** | 15% | Patrón store/hook bien, pero estilos inline duplicados, lookup de rol en cada componente, sin caché geocoding, Tailwind en stack pero NO usado. |
| 6 | Resilencia | **4/10** | 10% | ErrorBoundary existe pero no envuelve nada. Sin Toast feedback. Sin retry. Sin offline real (OfflineBar existe pero pasivo). |
| 7 | Accesibilidad | **3/10** | 5% | Sin aria-label, sin focus-visible, sin skip-link, sin alt en imágenes de reportes, sin lang="es" verificable. |
| 8 | Realtime/BD | **7/10** | 10% | Supabase Realtime correctamente suscrito en chat + alertas, cleanup OK. Falta debounce y manejo de reconexión. |

**Cálculo:** (8·0.15 + 5·0.20 + 7·0.15 + 6·0.10 + 5·0.15 + 4·0.10 + 3·0.05 + 7·0.10) = **6.40 / 10**

---

## 3. Comparativa vs SoSafe Chile

| Criterio | CiudApp 2026-05 | SoSafe Chile | Ventaja |
|---|---|---|---|
| Cobertura geográfica | 1 municipio (Chacao) | 100+ comunas | SoSafe |
| Categorías de reporte | 8 (Venezuela-fit) | ~15 (incluye delitos específicos) | SoSafe |
| Chat ciudadano ↔ alcaldía | ✅ Realtime bidireccional | ❌ No tiene | **CiudApp** |
| Map tap → reportar | ✅ Recién entregado S9 | ❌ Solo GPS | **CiudApp** |
| Validación de identidad | Email + password | RUT + carabineros | SoSafe |
| Integración con autoridad | Pendiente | Carabineros oficial | SoSafe |
| Notificaciones push | PWA pendiente activación | App nativa + SMS | SoSafe |
| Costo operativo | ~$0/mes (piloto) | Estatal financiado | CiudApp (eficiencia) |
| Tiempo respuesta promedio | No medido aún | 24-72h documentadas | SoSafe |
| Transparencia pública | Privado por usuario | Dashboard público mensual | SoSafe |

**Conclusión:** CiudApp gana en innovación de features (chat + tap), SoSafe gana en madurez operacional, escala y validación institucional. Para alcanzar paridad: foco en S10-S14 en gestión alcaldía + métricas públicas + verificación de identidad.

---

## 4. Comparativa vs Top-3 Mundial (FixMyStreet UK, SeeClickFix US, BeMyEyes/CityZen apps)

| Estándar top-3 | CiudApp | Brecha |
|---|---|---|
| TypeScript estricto | JS puro | Alta — refactor S15+ |
| Tests E2E (Playwright/Cypress) | 0 tests | Crítica |
| Observabilidad (Sentry, posthog) | console.log | Crítica |
| CI/CD con lint+typecheck pre-merge | Solo deploy CF | Media |
| Design tokens / Storybook | Estilos inline | Media |
| i18n | Solo español hardcoded | Baja (no requerido) |
| Cumplimiento WCAG 2.1 AA | ~30% estimado | Alta |
| Security audit / pentest | Nunca realizado | Alta |
| Dependabot / Renovate | Off | Media |
| OpenAPI / docs API | Inexistente | Baja (Supabase auto-genera) |

---

## 5. Inconsistencias y Fallas Detectadas

### CRÍTICAS (bloquean producción)

| # | Falla | Archivo/Tabla | Solución propuesta |
|---|---|---|---|
| C1 | `usuarios.rol` se actualiza con policy `usuarios_update_own` — un ciudadano puede auto-promoverse a alcaldía vía PATCH | `usuarios` RLS | Restringir UPDATE de `rol`: trigger BEFORE UPDATE que rechace cambios de rol salvo desde service_role |
| C2 | `mensajes_reporte` policy `mensajes_lectura USING (true)` — TODOS los autenticados leen TODOS los chats | `mensajes_reporte` RLS | Cambiar a `USING (auth.uid() IN (SELECT usuario_id FROM reportes WHERE id = reporte_id) OR EXISTS (SELECT 1 FROM usuarios WHERE id = auth.uid() AND rol = 'alcaldia'))` |
| C3 | `usuarios_read_own` solo deja leer SU PROPIO perfil. El JOIN `usuarios(nombre, apellido)` en ReportChat.jsx FALLA para mensajes de otros usuarios | `usuarios` RLS | Agregar policy lectura pública de campos no-sensibles: `(true)` con vista filtrada o columnas separadas |
| C4 | Estados UI: `nuevo`, `rechazado` no existen en BD (CHECK solo `pendiente\|en_proceso\|resuelto`). Render fallback mostrará texto crudo | `ReportDetail.jsx`, `FeedFilter.jsx` | Sincronizar enums: o ampliar CHECK constraint o reemplazar UI |
| C5 | Storage upload `subirFotoReporte` sin validación de tamaño/MIME — DoS subiendo archivos de 1GB | `supabase.storage.js` | Validar `file.size < 5MB`, `['image/jpeg','image/png','image/webp'].includes(file.type)` antes de upload |
| C6 | `CreateReportScreen.direccion` editable se guarda en estado local pero NUNCA se persiste a BD — feature sin uso | `CreateReportScreen.jsx`, `reportes` schema | Agregar columna `direccion text` o eliminar el input |

### MEDIAS (degradan experiencia)

| # | Falla | Solución |
|---|---|---|
| M1 | Mini-mapa ReportDetail usa `staticmap.openstreetmap.de` (servicio no oficial sin SLA) | Migrar a Carto static API o snapshot Leaflet client-side |
| M2 | `ReportChat.jsx` no maneja error de `insert` — vacía input aunque falle | `try/catch` con setState de error visible |
| M3 | Sin debounce en `reverseGeocode` durante taps rápidos — viola rate limit Nominatim (1 req/s) | LRU caché en `geo.utils.js` + debounce 300ms |
| M4 | `usuarios.rol` se consulta en CADA componente que lo necesita (ReportChat, futuras pantallas) | Hidratar `rol` en `auth.store` al login |
| M5 | `MarkerCluster.jsx` existe pero no se monta — mapa con 100+ pines hace freeze en mobile | Activar cluster en MapScreen |
| M6 | `OfflineBar.jsx` existe pero solo muestra estado, no encola acciones offline | Implementar queue persistente con IndexedDB para reportes/mensajes offline |
| M7 | Logout no invalida la suscripción Realtime — fuga de canal | `supabase.removeAllChannels()` en signOut |
| M8 | LandingPage solo se muestra en desktop pero el usuario en mobile que escriba la URL `/login` directamente verá login en desktop también — no hay viewport guard en rutas individuales | Mover viewport check a layout level |

### COSMÉTICAS

| # | Falla | Solución |
|---|---|---|
| K1 | Avatar 👤 emoji en ReportDetail vs componente `Avatar.jsx` con iniciales que ya existe | Reusar `Avatar` |
| K2 | `livePulse` keyframe definido inline en MapScreen, podría estar global | Mover a `index.css` |
| K3 | Inline styles duplicados (gradientes, sombras, radii) en 6+ archivos | Tokens en `src/theme/tokens.js` |
| K4 | LandingPage padding `60px` causa scroll horizontal a 769px (edge case) | Usar `clamp()` |
| K5 | `BottomNav` no anima la tab activa | Transition 0.2s en `transform: scale` |
| K6 | Console errors React "Expected static flag" pre-existentes — fix aplicado, verificar | Smoke test post-deploy |

---

## 6. Análisis Supabase

**Tablas existentes:** `usuarios`, `municipios`, `categorias`, `reportes`, `mensajes_reporte`, `alertas` (6).
**Mencionadas en CLAUDE.md pero NO existen:** `equipos`, `asignaciones`. Actualizar CLAUDE.md o construir en S10.

**RLS:** habilitado en las 6 tablas ✅. Calidad de policies: media — ver críticos C1, C2, C3.

**Indices presentes:** solo PKs + `idx_mensajes_reporte_id` + `idx_alertas_activa`. **Faltan**:
```sql
CREATE INDEX idx_reportes_estado     ON reportes(estado);
CREATE INDEX idx_reportes_categoria  ON reportes(categoria_id);
CREATE INDEX idx_reportes_municipio  ON reportes(municipio_id);
CREATE INDEX idx_reportes_user       ON reportes(usuario_id);
CREATE INDEX idx_reportes_geo        ON reportes USING gist (ll_to_earth(lat, lng));
```

**Storage:** bucket `reportes-fotos` existe. **Pendiente verificar policies de bucket.**

**Realtime:** suscripciones funcionan en `mensajes_reporte` y `alertas`. **Verificar que estas tablas están en la publicación `supabase_realtime`** (no se confirmó vía MCP).

**Triggers:** Antes de hoy, NINGUNO. Hoy se agregó `on_auth_user_created` (sync auth → usuarios). Falta `update_updated_at` en `reportes` (la columna existe pero no se actualiza solo).

---

## 7. Análisis Cloudflare Pages

**Pendiente verificar manualmente** (sin MCP de Cloudflare conectado para CF Pages):
- Variables de entorno: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_APP_NAME` deben estar en CF.
- Custom domain SSL.
- Headers cache: deberían usar `Cache-Control: public, max-age=31536000, immutable` para `/assets/*`.
- WAF rules: ninguna configurada (riesgo bot/abuse en formularios).

**Recomendación inmediata:** activar Cloudflare Turnstile en LoginScreen y RegisterScreen (gratuito, 0 fricción).

---

## 8. Análisis GitHub

| Item | Estado | Acción |
|---|---|---|
| Branch protection en `main` | OFF | Activar: PR required + 1 approval + status checks |
| Secret scanning | Por verificar en repo Settings | Activar gratis |
| Dependabot alerts | Por verificar | Activar |
| CI lint+test | No existe workflow | Agregar `.github/workflows/ci.yml` con `npm run lint` |
| `.env.local` en gitignore | ✅ | OK |
| Históricamente push directo a main | Sí (este flujo) | Aceptable en MVP, refactorear post-piloto |

---

## 9. Patrones No Escalables Detectados + Solución

| Patrón actual | Problema | Propuesta escalable |
|---|---|---|
| Estilos inline en 6+ archivos | Duplicación, inconsistencia | `src/theme/tokens.js` con `colors`, `radii`, `spacing`, `typography` — o activar Tailwind real (ya en stack) |
| Lookup de `usuarios.rol` por componente | N+1 queries en cada render | Hidratar `rol` en `auth.store` al post-login + invalidar en signOut |
| `reverseGeocode` sin caché | Llamadas duplicadas → ratelimit | LRU en memoria con TTL 1h en `geo.utils.js` |
| Categorías hardcoded en 4 archivos | Cambio = tocar todos | `src/constants/categorias.js` singleton + tipos compartidos |
| Reportes sin paginación / sin viewport query | Mapa con 1000+ pines = freeze | Bounding box query (`.gte/.lte` en lat/lng) + activar MarkerCluster |
| Stores monolíticos con estado mezclado | Difícil testear/extender | Slices por dominio: `reports.store`, `chat.store`, `auth.store`, `ui.store` (ya parcialmente correcto) |

---

## 10. Checklist Priorizado para Antes de S10

**Bloqueantes producción (cerrar antes del piloto Chacao real):**
- [ ] Fix C1: trigger anti-promoción de rol
- [ ] Fix C2: RLS chat por participantes
- [ ] Fix C3: lectura pública limitada de `usuarios` (nombre + rol)
- [ ] Fix C4: sincronizar enums estado UI ↔ BD
- [ ] Fix C5: validación upload foto (tamaño + MIME)
- [ ] Crear índices Postgres listados en sección 6
- [ ] Verificar `supabase_realtime` publication incluye `mensajes_reporte` y `alertas`

**Mejoras de calidad (S10-S11):**
- [ ] Hidratar `rol` en `auth.store` (Med M4)
- [ ] Activar `MarkerCluster` con bounding box (Med M5)
- [ ] Toast global para errores de mutación (Med M2)
- [ ] Caché `reverseGeocode` (Med M3)
- [ ] Migrar mini-mapa ReportDetail a Carto (Med M1)
- [ ] Cleanup Realtime en signOut (Med M7)

**Higiene (S12+):**
- [ ] Tokens de diseño extraídos (K3)
- [ ] Reusar `Avatar.jsx` (K1)
- [ ] CI lint en GitHub Actions
- [ ] Branch protection en `main`
- [ ] Cloudflare Turnstile en login/register

---

## 11. Estado Actual Verificado (post-seed S9)

```
Tablas:           6 (usuarios, municipios, categorias, reportes, mensajes_reporte, alertas)
Reportes:         18 (10 anteriores + 8 sembrados S9)
Alertas activas:  2
Usuarios:         2 (Anthony=alcaldia, Sebastián=ciudadano)
Storage buckets:  reportes-fotos
RLS habilitado:   6/6
Triggers:         on_auth_user_created (nuevo)
Índices custom:   2 (idx_mensajes_reporte_id, idx_alertas_activa)
```

**Conclusión:** Plataforma utilizable para testing dual-rol inmediato. Las dos cuentas existentes ya tienen perfiles y roles asignados. Anthony puede loguearse como alcaldía, Sebastián como ciudadano, y validar el chat Realtime con badge ✓ Alcaldía.

---

**Próximo paso recomendado:** Antes de arrancar S10 (dashboard alcaldía), invertir 1-2 sesiones en cerrar los 6 críticos de la sección 5. La deuda técnica acumulada en 7 semanas de sprint es manejable hoy; en 4 semanas más será refactor mayor.
