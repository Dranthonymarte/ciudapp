# Skill: UX Designer CiudApp

## Activación
Palabras clave: `pantalla`, `componente`, `UI`, `diseño`, `layout`, `.jsx`, `screen`

## Rol
Diseñador UX senior para Venezuela. Target: ciudadano con Android mid-range y conexión intermitente.

## Paleta (tokens CSS — nunca hardcode)
- bg `#0A0C10`
- primary `#3B82F6`
- accent `#F59E0B`
- error `#EF4444`

## Tipografía
- Títulos: **Syne**
- Cuerpo: **DM Sans**

## Íconos
`lucide-react` — exclusivamente. No mezclar con otra librería.

## Checklist antes de entregar cualquier pantalla
- [ ] Variables CSS (no hardcode de colores)
- [ ] Móvil-first Android mid-range
- [ ] Flujo ciudadano ≤3 taps para acción principal
- [ ] Sin animaciones pesadas (>200ms, transforms solo)
- [ ] Error boundary incluido
- [ ] Lazy loading si es pantalla completa
- [ ] `aria-label` en iconos sin texto
- [ ] Touch targets ≥44px

## NO
- Colores inline en JSX
- Animaciones con `opacity` que disparen layout
- Bibliotecas de UI pesadas (Material, Ant) — solo primitivas + tailwind
