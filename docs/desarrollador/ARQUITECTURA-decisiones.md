# CiudApp — Arquitectura · Decisiones y Principios

> **Versión:** v0.1 · **Fecha:** 2026-04-16
> Parte 2/2 — Ver también: [ARQUITECTURA-modulos.md](ARQUITECTURA-modulos.md)

Principio rector: **Un archivo = una función. Modular. Ligero. Legible por Claude.**

---

## DECISIÓN ARQUITECTURAL CENTRAL

### DOS interfaces, UN backend, UN repositorio

```
ciudapp/
├── App Ciudadano     (src/app/)          → El vecino con el celular
└── Dashboard Alcaldía (src/dashboard/)   → El funcionario en la oficina
    Comparten → src/services/ + src/components/ + supabase
```

**Por qué un solo repo:** Comparten base de datos, servicios, autenticación y componentes UI. Dos repos sería duplicación y pesadilla de mantenimiento.

**Por qué dos interfaces:** El ciudadano necesita móvil-first, mapa central, reporte rápido. La alcaldía necesita desktop, tablas, estadísticas, gestión. Son experiencias opuestas.


---

## PRINCIPIOS DE ARQUITECTURA


### 1. Un módulo = una carpeta = una función del negocio
No mezclar lógica de mapa con lógica de reportes. Si falla el mapa, no afecta el auth.

### 2. Los servicios no saben de UI
`reports.service.js` solo habla con Supabase. El componente `CreateReportScreen.jsx` habla con el servicio. Nunca el servicio toca el DOM.

### 3. Cambiar toda la app visual = 2 archivos
- `config/theme.config.js` → colores
- `config/typography.config.js` → fuentes
Nada más. Ningún componente tiene colores hardcodeados.

### 4. Archivos < 150 líneas
Cada archivo debe ser lo suficientemente pequeño para que Claude lo lea completo sin gastar tokens excesivos. Si un archivo crece más de 200 líneas, se divide.

### 5. Nombres descriptivos, sin abreviaciones
`CreateReportScreen.jsx` no `CRS.jsx`. Claude y Anthony deben entender qué es cada archivo sin abrirlo.

