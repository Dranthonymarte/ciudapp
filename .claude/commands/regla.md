# /regla — Agregar regla permanente

## Proceso
1. Capturar regla propuesta de Anthony
2. `grep -i "[palabra-clave-regla]" reglas/REGLAS-PERMANENTES.md` → verificar no duplique ni contradiga
3. Si contradice regla existente → `⚠️ ALERTA` con cita + esperar decisión
4. Si no contradice → append en sección correcta (TOKEN GUARD, CONDUCTA, ARCHIVOS, SEGURIDAD, etc.)

## Clasificación por keywords
- "tokens", "contexto", "leer" → TOKEN GUARD
- "respuesta", "tono", "diagnóstico" → CONDUCTA
- "archivo", "línea", "dividir" → ARCHIVOS
- "clave", "secret", ".env" → SEGURIDAD
- Sin match claro → preguntar sección a Anthony

## Restricciones
- NO reescribir reglas existentes sin aprobación
- NO abrir archivos CTX — solo reglas/
