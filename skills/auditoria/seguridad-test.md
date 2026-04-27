# Skill: Seguridad y Testing

## Activación
Palabras clave: `test`, `seguridad`, `vulnerabilidad`, `hackeo`, comando `/auditoria`

## Checklist (solo grep, nunca glob completo)
```
grep -rn "supabase_key\|password\|token" src/
grep -rn "select('\*')" src/
grep -rn "supabase.from" src/app/
wc -l src/**/*.jsx | sort -rn | head -10
```

## Clasificación severidad
- **🔴 Crítico** — secrets en código, SELECT * con datos sensibles
- **🟠 Alto** — queries en componentes, archivos >300 líneas
- **🟡 Medio** — falta RLS, console.log residual, sin error boundary

## Reporte por hallazgo
```
[severidad] [archivo]:[línea] — [descripción 1 línea] → [fix sugerido]
```

## Persistencia
- Críticos → append a `seguridad/VULNERABILIDADES.md`
- Altos/medios → reportar en chat únicamente

## NO
- Abrir archivos completos — solo grep con `-n`
- Ejecutar fix automático — reportar y esperar decisión Anthony
- Ignorar warning por ser "temporal"
