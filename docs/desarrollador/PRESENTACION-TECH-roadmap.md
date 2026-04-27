# CiudApp — Presentación Tech · Roadmap y Modelo de Negocio

> **Versión:** v0.1 · **Fecha:** 2026-04-16 · **Autor:** Anthony (CTO)
> Parte 2/2 — Ver también: [PRESENTACION-TECH-stack.md](PRESENTACION-TECH-stack.md)

Secciones: Roadmap tecnológico · Arquitectura de archivos · Modelo de negocio tecnológico

---

## 10. ROADMAP TECNOLÓGICO

*(Ver ROADMAP.md para el detalle completo semana por semana)*

| Fase | Período | Meta | Estado |
|---|---|---|---|
| Fase 1 — Piloto | Sem 1–2 | HTML interactivo + presentaciones | ✅ Completada |
| Fase 2 — MVP Core | Sem 3–8 | Mapa + reportes + login + feed | 🔄 En curso |
| Fase 3 — App Completa | Sem 9–14 | Dashboard alcaldía + alertas + PWA | ⏳ |
| Fase 4 — Beta | Sem 15–18 | 50–100 usuarios reales | ⏳ |
| Fase 5 — Lanzamiento | Sem 19–24 | App Store + primer contrato | ⏳ |
| Fase 6 — Escala | Sem 25+ | Más municipios + Colombia | ⏳ |

**Hito de sincronización con Ana:** El Dashboard de Alcaldía v1 estará listo en Semana 13. Ana tiene proyectado cerrar el primer contrato entre Mes 3–5 (semanas 12–20). Los tiempos están alineados.

---

## 11. ARQUITECTURA DE ARCHIVOS EXPLICADA

**~158 archivos al completar todas las fases. Cada uno con una función específica.**

### Principio fundamental: Un archivo = una función

Si algo falla, se sabe exactamente dónde buscar. Si se quiere cambiar algo, solo se toca ese archivo. Si Claude necesita modificar el mapa, solo lee el archivo del mapa, no toda la app. Esto ahorra tokens, tiempo y evita errores en cascada.

### Los grupos de archivos explicados

| Carpeta | Archivos | Función en lenguaje simple |
|---|---|---|
| `config/` | 3 | Los 2 archivos de tema (colores + fuentes) y uno de constantes (textos fijos, URLs). Cambiar aquí = cambia toda la app. |
| `app/modules/auth/` | 5 | Login, registro, recuperar contraseña y el "guardia" que impide acceso sin cuenta. |
| `app/modules/map/` | 7 | El mapa principal, los marcadores de incidentes, los filtros por categoría y el heatmap (mapa de calor). |
| `app/modules/reports/` | 7 | El formulario de crear reporte (3 toques), las tarjetas visuales, el badge de estado y la subida de fotos. |
| `app/modules/feed/` | 4 | La lista de reportes recientes que se actualiza sola en tiempo real. |
| `app/modules/alerts/` | 4 | Las alertas de emergencia que llegan desde la alcaldía y las notificaciones push. |
| `app/modules/profile/` | 4 | El perfil del ciudadano, su historial de reportes y la opción de editar sus datos. |
| `dashboard/` | 25+ | Todo el panel de la alcaldía: gestión de incidentes, estadísticas, alertas masivas, configuración del municipio. |
| `components/` | 14 | Piezas visuales reutilizables: botones, tarjetas, modales, spinner de carga, barra de navegación. |
| `services/` | 7 | La conexión con Supabase (BD, auth, storage, tiempo real), el servicio de mapas y el sistema de notificaciones push. |
| `hooks/` | 7 | Lógica reutilizable entre pantallas: el estado de login, el GPS, los reportes en tiempo real, si hay conexión o no. |
| `store/` | 4 | La "memoria" de la app mientras está abierta: quién está logueado, dónde está el mapa, qué modal está abierto. |
| `utils/` | 5 | Funciones de apoyo: formatear fechas en español, calcular distancias, validar formularios. |
| `public/` | 5+ | El ícono de la app, el Service Worker (offline), el manifest (config de la PWA instalada). |

### La regla de oro del código modular
Ningún componente de la app del ciudadano sabe que existe el dashboard de la alcaldía, y viceversa. Son dos mundos que solo comparten los servicios (la conexión a Supabase). Si el dashboard falla, la app del ciudadano sigue funcionando. Si hay un bug en el módulo de mapa, no afecta al módulo de perfil.

---

## 12. MODELO DE NEGOCIO TECNOLÓGICO

### La tecnología como argumento de venta

**Para el ciudadano: siempre gratuita**
La adopción masiva de ciudadanos es el argumento más poderoso que tiene Ana para venderle a una alcaldía. "Sus ciudadanos ya están usando la app. Ahora ¿quiere gestionarla?" Sin usuarios ciudadanos, no hay producto que vender. Por eso la app del ciudadano no tendrá nunca paywall, límites artificiales ni anuncios.

**Para la alcaldía: licencia institucional**

**Modelo anual — no mensual.** Se alinea con presupuestos municipales, elimina riesgo de cancelación, da margen de inversión tranquila y simplifica la administración para ambas partes.

| Plan | Precio/año | Incluye |
|---|---|---|
| Básico | $10,000 | Mapa de reportes, categorías básicas, alertas simples |
| Municipal | $11,000 | Todo lo anterior + estadísticas avanzadas + asignación de equipos + alertas masivas |
| Gobernación | $12,000 | Cobertura estatal + data intelligence + reportes ejecutivos PDF + múltiples municipios |

**Meta Año 1:** 3 alcaldías + 1 gobernación = **$42,000–$46,000 en contratos anuales**

### El activo secundario: Data Intelligence
Cada reporte genera un punto de dato georreferenciado con categoría, hora y zona. Con miles de reportes acumulados:
- ¿Qué zonas tienen más robos? ¿A qué hora?
- ¿Dónde aumentan los accidentes viales en lluvia?
- ¿Qué municipios tienen más fallas de servicios públicos?

Esta data anonimizada puede convertirse en reportes de inteligencia urbana vendidos a gobernaciones, ministerios o iniciativas Smart City. Es el upside de largo plazo más valioso del negocio.

### La ventaja tecnológica como barrera de entrada
Ningún competidor en Venezuela tiene una plataforma de este nivel. El tiempo que le tomaría a cualquier competidor construir algo comparable es el tiempo que CiudApp usa para establecerse en los municipios y crear contratos de largo plazo. La tecnología ES la barrera de entrada.

---

*Documento generado: 2026-04-16 | Versión: v0.1 | Actualizar con cada presentación del equipo*
