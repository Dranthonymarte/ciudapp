# Arquitectura · Módulos Dashboard Alcaldía

> Parte 2/3 · Ver: [ciudadano](ARQUITECTURA-modulos-ciudadano.md) · [infraestructura](ARQUITECTURA-infraestructura.md) · [decisiones](ARQUITECTURA-decisiones.md)

Módulos de `src/dashboard/` — la experiencia desktop-first del funcionario municipal.

```
│   ├── dashboard/                          ← DASHBOARD ALCALDÍA (desktop-first)
│   │   ├── DashboardAlcaldia.jsx           → Componente raíz del dashboard
│   │   │
│   │   ├── modules/
│   │   │   │
│   │   │   ├── auth/                       ← MÓDULO: Login institucional
│   │   │   │   ├── AdminLogin.jsx          → Login solo para funcionarios
│   │   │   │   └── AdminGuard.jsx          → Protege rutas del dashboard
│   │   │   │
│   │   │   ├── overview/                   ← MÓDULO: Vista general
│   │   │   │   ├── OverviewScreen.jsx      → Resumen: stats + mapa + alertas activas
│   │   │   │   ├── StatsCards.jsx          → Cards con métricas clave
│   │   │   │   └── RecentActivity.jsx      → Últimos reportes recibidos
│   │   │   │
│   │   │   ├── map-admin/                  ← MÓDULO: Mapa administrativo
│   │   │   │   ├── AdminMapScreen.jsx      → Mapa con todos los reportes
│   │   │   │   ├── ReportPopup.jsx         → Popup al clickear reporte en mapa
│   │   │   │   └── ZoneFilter.jsx          → Filtrar por zona municipal
│   │   │   │
│   │   │   ├── incidents/                  ← MÓDULO: Gestión de incidentes
│   │   │   │   ├── IncidentsScreen.jsx     → Tabla de todos los incidentes
│   │   │   │   ├── IncidentRow.jsx         → Fila en tabla de incidentes
│   │   │   │   ├── IncidentDetail.jsx      → Modal detalle + cambiar estado
│   │   │   │   ├── AssignTeam.jsx          → Asignar equipo de respuesta
│   │   │   │   └── incidents.service.js    → Gestión de estados en Supabase
│   │   │   │
│   │   │   ├── alerts-admin/               ← MÓDULO: Enviar alertas masivas
│   │   │   │   ├── CreateAlert.jsx         → Formulario crear alerta de emergencia
│   │   │   │   ├── AlertHistory.jsx        → Historial de alertas enviadas
│   │   │   │   └── alerts-admin.service.js → Broadcast a ciudadanos via Supabase
│   │   │   │
│   │   │   ├── analytics/                  ← MÓDULO: Estadísticas y reportes
│   │   │   │   ├── AnalyticsScreen.jsx     → Dashboard de métricas
│   │   │   │   ├── HeatmapChart.jsx        → Mapa de calor por zona
│   │   │   │   ├── TrendChart.jsx          → Tendencias por período
│   │   │   │   ├── CategoryChart.jsx       → Distribución por tipo
│   │   │   │   └── ExportPDF.jsx           → Generar reporte mensual PDF
│   │   │   │
│   │   │   └── settings/                   ← MÓDULO: Configuración municipal
│   │   │       ├── MunicipalSettings.jsx   → Config del municipio
│   │   │       ├── UserManagement.jsx      → Gestión de funcionarios
│   │   │       └── ZonesConfig.jsx         → Definir zonas/barrios del municipio
```
