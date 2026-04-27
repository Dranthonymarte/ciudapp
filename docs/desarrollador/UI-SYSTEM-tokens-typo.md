# UI-SYSTEM · Tipografía y CSS Variables

> Parte 2/3 — Theme tokens: [UI-SYSTEM-tokens.md](UI-SYSTEM-tokens.md) · Componentes: [UI-SYSTEM-componentes.md](UI-SYSTEM-componentes.md)

---

## TOKENS DE TIPOGRAFÍA — typography.config.js

```js
// config/typography.config.js
export const typography = {
  fonts: {
    display: "'Syne', sans-serif",      // Headings, números grandes, UI bold
    body:    "'DM Sans', sans-serif",    // Body, labels, inputs, descripciones
    mono:    "'JetBrains Mono', monospace", // Coordenadas, IDs, código
  },

  // Google Fonts import (en index.html o App.jsx)
  // @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

  scale: {
    xs:   { size: '11px', line: '16px', weight: '500' },
    sm:   { size: '13px', line: '20px', weight: '400' },
    base: { size: '15px', line: '24px', weight: '400' },
    md:   { size: '17px', line: '26px', weight: '500' },
    lg:   { size: '20px', line: '28px', weight: '600' },
    xl:   { size: '24px', line: '32px', weight: '700' },
    '2xl':{ size: '30px', line: '38px', weight: '700' },
    '3xl':{ size: '38px', line: '46px', weight: '800' },
  },
}
```

---

## CSS VARIABLES GLOBALES — :root

```css
:root {
  /* Colores */
  --bg-primary:    #0A0C10;
  --bg-secondary:  #111318;
  --bg-tertiary:   #1A1D24;
  --bg-elevated:   #222631;
  --brand:         #3B82F6;
  --brand-hover:   #1D4ED8;
  --accent:        #F59E0B;
  --text-primary:  #F0F2F5;
  --text-secondary:#8B95A5;
  --text-muted:    #4B5563;
  --border-subtle: rgba(255,255,255,0.06);
  --border-default:rgba(255,255,255,0.10);
  --border-focus:  rgba(59,130,246,0.50);

  /* Radios */
  --radius-sm: 8px; --radius-md: 12px;
  --radius-lg: 16px; --radius-xl: 24px;
  --radius-full: 9999px;

  /* Tipografía */
  --font-display: 'Syne', sans-serif;
  --font-body:    'DM Sans', sans-serif;
  --font-mono:    'JetBrains Mono', monospace;

  /* Transiciones */
  --t-fast:   0.15s cubic-bezier(0.4, 0, 0.2, 1);
  --t-normal: 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  --t-spring: 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```
