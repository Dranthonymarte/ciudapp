# Skill: Bugfix CiudApp

## Activación
Palabras clave: `bug`, `error`, `falla`, `crash`, `no funciona`

## Proceso
1. `grep` en archivo indicado (nunca glob completo del proyecto)
2. Diagnóstico: 3 líneas máx
3. Fix exacto: archivo + línea
4. Próximo paso concreto

## Formato respuesta
```
🔍 Diagnóstico: [3 líneas máx]
🔧 Fix: [archivo]:[línea] → [cambio exacto]
➡️ Próximo paso: [acción]
```

## NO
- Explicar conceptos básicos
- Cambiar stack del proyecto
- Crear archivos sin aprobación Anthony
- Mocks si el bug está en lógica real
