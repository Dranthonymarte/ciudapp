# CiudApp — Roadmap Fases 3-6

> Parte 2/2 — Fases 1-2 en [ROADMAP.md](ROADMAP.md)

---

## FASE 3 — APP COMPLETA
**Semanas 9-14 | Incluye Dashboard Alcaldía**

### Semana 9-10 — Alertas y Notificaciones
| Tarea | Entregable |
|---|---|
| modules/alerts/AlertBanner.jsx | Banner de alerta activa en mapa |
| services/push.service.js | Web Push Notifications |
| hooks/useAlerts.js | Alertas en tiempo real |
| PushPermission.jsx | Solicitar permiso notificaciones |
| Notif al ciudadano cuando su reporte cambia estado | Loop completo de comunicación |

### Semana 11-12 — Dashboard Alcaldía (v1)
| Tarea | Entregable |
|---|---|
| dashboard/DashboardAlcaldia.jsx | Shell del panel |
| dashboard/modules/auth/ | Login institucional separado |
| dashboard/modules/overview/ | Vista general con stats |
| dashboard/modules/map-admin/ | Mapa con todos los reportes |
| dashboard/modules/incidents/ | Tabla de gestión de incidentes |
| AdminGuard.jsx | Solo alcaldías pueden entrar |
| BD: tabla equipos + asignaciones | Asignar equipos a reportes |

### Semana 13 — Dashboard Alcaldía (v2)
| Tarea | Entregable |
|---|---|
| dashboard/modules/alerts-admin/ | Enviar alertas masivas a ciudadanos |
| dashboard/modules/settings/ | Config del municipio |
| dashboard/modules/analytics/ | Stats básicas por zona/tipo |
| **DEMO con municipio piloto** | Primera reunión técnica real |

### Semana 14 — Offline-first + PWA Completa
| Tarea | Entregable |
|---|---|
| public/sw.js | Service Worker completo |
| services/offline.service.js | Cache de datos para offline |
| Reportes en cola offline | Se envían al recuperar conexión |
| PWA completa instalable | Íconos, splash, shortcuts |

---

## FASE 4 — BETA PRIVADA
**Semanas 15-18 | 50-100 usuarios reales**

| Semana | Foco | Meta |
|---|---|---|
| 15 | Onboarding de usuarios beta | 20 usuarios instalados |
| 16 | Monitoreo y correcciones en vivo | Bugs críticos resueltos |
| 17 | Iteración basada en feedback real | 3 mejoras de UX implementadas |
| 18 | Preparación para lanzamiento público | App estable, dashboard probado |

**KPIs de Beta:**
- Tiempo promedio para crear reporte: < 45 segundos
- Tasa de abandono en flujo de reporte: < 30%
- Errores críticos en producción: 0
- Primer municipio con acceso al dashboard

---

## FASE 5 — LANZAMIENTO PÚBLICO
**Semanas 19-24**

| Semana | Foco |
|---|---|
| 19-20 | Play Store ($25) + configuración App Store ($99/año) |
| 21 | Dominio ciudapp.com o .ve + migración a Supabase Pro |
| 22 | Marketing digital (coordinado con Sebastián) |
| 23 | Soporte activo primer municipio |
| 24 | Evaluación, métricas, ajustes |

---

## FASE 6 — ESCALA
**Semana 25 en adelante**

- Segundo y tercer municipio
- Analytics avanzados (PostHog, Sentry)
- Monetización data regional
- Evaluación inversión externa
- Expansión Colombia (marco legal preparado por Ana)

---

## CATEGORÍAS DE INCIDENTES — Venezuela

> Definir esto ANTES de crear la BD en Semana 4

| Categoría | Ícono sugerido | Color |
|---|---|---|
| Seguridad / Robo | 🚨 | Rojo |
| Vialidad (huecos, semáforos) | 🚧 | Naranja |
| Servicios (agua, luz, gas) | ⚡ | Amarillo |
| Animales (perros sueltos) | 🐕 | Verde |
| Salud pública (basura, dengue) | 🏥 | Morado |
| Desastre natural | 🌧️ | Azul oscuro |
| Emergencia | 🆘 | Rojo brillante |
| Otro | 📌 | Gris |

---

## REGLAS DE TRABAJO CON CLAUDE

1. **Cada sesión = un módulo completo** — No dejar archivos a medias
2. **Siempre decirle a Claude qué archivo tocar** — "Modifica solo reports.service.js"
3. **Testear antes de avanzar** — No pasar a semana siguiente con bugs conocidos
4. **Commitear al finalizar cada sesión** — `git commit -m "feat: módulo de reportes completo"`
5. **Actualizar SESION-XXX.md** — Documenta qué se hizo, qué falló, siguiente paso
6. **Archivos < 150 líneas** — Si Claude genera más, pedir que lo divida
7. **Un cambio = un commit** — No acumular cambios grandes sin guardar

---

## SINCRONIZACIÓN CON ANA (Ventas)

| Hito técnico de Anthony | Hito comercial de Ana | Semana |
|---|---|---|
| MVP Core funcional (ciudadano) | Mapeo de alcaldías piloto | Sem 8 |
| Dashboard v1 listo | Deck ejecutivo con demo en vivo | Sem 12-13 |
| Beta estable | Primera reunión con alcaldía piloto | Sem 15-16 |
| App en producción | Firma de primer contrato | Sem 20-22 |

---

*Documento generado: 2026-04-16 | Actualizar semanalmente con avances reales*
