# /auditoria — Seguridad módulo

## Proceso (solo grep, sin glob completo)
```
grep -rn "supabase_key\|password\|token" src/
grep -rn "select('\*')" src/
grep -rn "supabase.from" src/app/
wc -l src/**/*.jsx | sort -rn | head -10
```

## Reporte (clasificar por severidad)
- **🔴 Crítico** — secrets expuestos, SELECT * con datos sensibles
- **🟠 Alto** — queries en componentes, archivos >300 líneas
- **🟡 Medio** — falta RLS, console.log residual

## Formato salida por hallazgo
```
[severidad] [archivo]:[línea] — [descripción 1 línea] → [fix sugerido]
```

## Persistencia
- Hallazgos críticos → append a `seguridad/VULNERABILIDADES.md`
- Altos y medios → solo en chat

## Restricciones
- NO abrir archivos completos — solo grep con `-n`
- NO ejecutar el fix automáticamente → reportar y esperar
