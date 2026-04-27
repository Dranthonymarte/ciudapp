# UI-SYSTEM · Layout y Animaciones

> Parte 2/3 · Ver: [componentes](UI-SYSTEM-componentes.md) · [patrones](UI-SYSTEM-patrones.md) · [tokens](UI-SYSTEM-tokens.md)

## LAYOUT — REGLAS MÓVIL-FIRST

### App Ciudadano (móvil-first)
```
┌─────────────────────┐
│   StatusBar area    │  → safe-area-inset-top
├─────────────────────┤
│                     │
│     CONTENT         │  → flex-1, overflow-y auto
│   (MapScreen /      │
│    FeedScreen /     │
│    etc.)            │
│                     │
├─────────────────────┤
│    BottomNav        │  → 64px + safe-area-inset-bottom
│  [Map][Feed][+][Me] │
└─────────────────────┘

BottomNav FAB (+):
- Botón central flotante, azul, 56px, elevation alta
- Tap → CreateReport sheet sube desde abajo (bottom sheet)
```

### Safe Areas (crítico para PWA)
```css
.screen {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
}
.bottom-nav {
  padding-bottom: max(16px, env(safe-area-inset-bottom));
}
```

### Dashboard Alcaldía (desktop-first)
```
┌──────┬──────────────────────────────┐
│      │        TopBar                │
│ Side │──────────────────────────────│
│ Nav  │                              │
│(240) │        Content               │
│      │        (flex-1)              │
│      │                              │
└──────┴──────────────────────────────┘
```

---

## ANIMACIONES — GUÍA PRECISA

```css
/* Entrada de pantalla (slide-up sutil) */
@keyframes screenEnter {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
.screen { animation: screenEnter 0.2s cubic-bezier(0.4, 0, 0.2, 1); }

/* Bottom sheet */
@keyframes sheetUp {
  from { transform: translateY(100%); }
  to   { transform: translateY(0); }
}

/* Nuevo reporte (pulso en marcador) */
@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.4); }
  50%       { box-shadow: 0 0 0 8px rgba(59,130,246,0); }
}

/* Skeleton loading */
@keyframes shimmer {
  from { background-position: -200% center; }
  to   { background-position: 200% center; }
}
.skeleton {
  background: linear-gradient(90deg,
    var(--bg-tertiary) 25%,
    var(--bg-elevated) 50%,
    var(--bg-tertiary) 75%
  ) 200% center / 400% 100%;
  animation: shimmer 1.5s ease infinite;
}
```

**Reglas de animación:**
- Mobile: reducir/eliminar si `prefers-reduced-motion`
- Duración máx en móvil: 300ms
- Nunca animar `height` → usar `max-height` o `transform: scaleY`
- Preferir `transform` + `opacity` (GPU-accelerated)

---

## MAPA — REGLAS VISUALES

```js
// Tile layer oscuro obligatorio
const tileLayer = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
// Attribution: CartoDB (gratuito, no requiere API key)

// Zoom: default 14 (barrio), min 10, max 18
// Center default: Caracas [-66.9036, 10.4806] hasta que GPS resuelva
// Sin controles de zoom nativos de Leaflet → usar botones custom (+/-)

// Panel lateral (desktop) o Bottom sheet (móvil) para lista de reportes
// Mapa siempre visible detrás — nunca cubrirlo completamente
```
