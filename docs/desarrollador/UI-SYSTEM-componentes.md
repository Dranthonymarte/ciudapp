# UI-SYSTEM · Componentes

> Parte 1/3 · Ver: [layout](UI-SYSTEM-layout.md) · [patrones](UI-SYSTEM-patrones.md) · [tokens](UI-SYSTEM-tokens.md)

## COMPONENTES BASE — PATRONES OBLIGATORIOS

### Button
```jsx
// Variantes: primary | secondary | ghost | danger
// Nunca usar <button> sin estas clases base

const buttonStyles = {
  primary: {
    background: 'var(--color-brand-primary)',
    color: '#fff',
    borderRadius: 'var(--radius-md)',
    padding: '12px 20px',
    font: '600 15px var(--font-body)',
    transition: 'var(--transition-fast)',
    border: 'none',
    cursor: 'pointer',
    // Hover: brightness(1.1) + glow
    // Active: scale(0.97)
    // Disabled: opacity 0.4 + cursor not-allowed
  }
}
```

### Card
```jsx
// Anatomía de card: borde sutil, bg secondary, radio lg
const cardStyle = {
  background: 'var(--bg-secondary)',
  border: '1px solid var(--border-subtle)',
  borderRadius: 'var(--radius-lg)',
  padding: 'var(--spacing-4)',
  // Hover en cards interactivas: border-color → var(--border-default), translateY(-1px)
}
```

### Input
```jsx
const inputStyle = {
  background: 'var(--bg-tertiary)',
  border: '1px solid var(--border-default)',
  borderRadius: 'var(--radius-md)',
  padding: '12px 16px',
  color: 'var(--text-primary)',
  font: '400 15px var(--font-body)',
  // Focus: border-color → var(--border-focus) + box-shadow glow
  // Placeholder: color → var(--text-muted)
}
```

### ReportCard
```jsx
// Siempre incluir: categoría coloreada (dot/badge) | título | dirección | tiempo relativo | estado badge
// Foto thumbnail si existe (60x60, radius md, object-cover)
// Tap → abre ReportDetail con slide-up animation
// Long-press / swipe → acciones rápidas (votar, compartir)
```

### MapMarker
```jsx
// Marcador = círculo coloreado por categoría + ícono blanco
// Tamaño: 36px normal, 44px seleccionado
// Cluster: fondo oscuro + número en Syne bold
// Pulso animado en reportes nuevos (< 10 min)
// Sombra: box-shadow: 0 2px 8px [color-categoría]60
```

