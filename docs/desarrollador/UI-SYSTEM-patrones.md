# UI-SYSTEM · Patrones UX y Checklist

> Parte 3/3 · Ver: [componentes](UI-SYSTEM-componentes.md) · [layout](UI-SYSTEM-layout.md) · [tokens](UI-SYSTEM-tokens.md)

## PATRONES UX ESPECÍFICOS

### CreateReport (≤ 3 taps)
```
Tap 1: FAB (+) → Bottom sheet sube
         └→ Categorías en grid 2x4 con íconos grandes
Tap 2: Seleccionar categoría → Confirma ubicación (mapa mini centrado en GPS)
         └→ Botón "Confirmar ubicación" + campo título opcional
Tap 3: Enviar reporte → Animación de éxito → Cierra sheet → Marcador aparece en mapa
```

### Estado de Reporte (visual feedback)
```
nuevo      → Dot azul pulsando
en_proceso → Dot amarillo estático
resuelto   → Dot verde con check
rechazado  → Dot gris
```

### Offline State
```jsx
// OfflineBar: banner top (debajo de statusbar)
// Fondo: #F59E0B10 + border-bottom: 1px solid #F59E0B30
// Ícono WifiOff + "Sin conexión · Los reportes se enviarán al reconectar"
// Los reportes quedan en localStorage queue y se procesan en useOffline.js
```

### Empty States
```
No vacíos estériles ("No hay datos").
Siempre: ilustración SVG simple + título + CTA.
Ej: "Silencio total por aquí" + "Sé el primero en reportar en tu zona" [Reportar ahora →]
```

### Loading
```
Skeleton > Spinner
Usar skeleton cards del mismo tamaño que el contenido real.
Spinner solo para acciones (submit de formulario, etc.).
```


---

## CHECKLIST DE CALIDAD — antes de considerar un componente terminado

- [ ] ¿Funciona en 390px (iPhone SE) sin overflow horizontal?
- [ ] ¿Usa variables CSS (no colores hardcodeados)?
- [ ] ¿Tiene estado loading + error + empty?
- [ ] ¿Tiene feedback visual en tap/hover/focus?
- [ ] ¿Las fuentes cargan desde Google Fonts (Syne + DM Sans)?
- [ ] ¿Tile del mapa usa tema oscuro de CartoDB?
- [ ] ¿Los íconos son de lucide-react (no emojis)?
- [ ] ¿Respeta safe-area-inset en iOS?
- [ ] ¿Skeleton en lugar de spinner para listas?
- [ ] ¿Empty state tiene CTA, no solo texto?
