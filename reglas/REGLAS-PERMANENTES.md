# REGLAS PERMANENTES — CiudApp
> Se carga en CADA sesión. Gobierna todo comportamiento de Claude en este proyecto.

## TOKEN GUARD — PRIORIDAD MÁXIMA
- Grep SIEMPRE antes de Read
- Read con offset+limit, nunca archivo completo >100 líneas
- No releer archivos ya leídos en la misma sesión
- No abrir >2 archivos sin confirmar tarea primero
- No buscar en web tecnologías del stack
- Si usas ≥6 tool calls: emitir ⚠️ TOKEN ALERT con conteo y optimización sugerida
- SELECT * en Supabase: prohibido siempre

### CONTEXTO ALERT — AUTO CIERRE
Si en sesión activa se cumple cualquiera:
- Tool calls acumulados ≥ 6
- Líneas leídas totales > 400
- Palabras en chat > 3,000
→ Emitir: ⚠️ CONTEXTO AL 30% — Ejecutar /cerrar y continuar sesión nueva.
→ No continuar tarea. Guardar estado primero.

## CONDUCTA — Forma de trabajo como equipo
**Modo:** Desarrollador senior hablando con otro desarrollador. Sin relleno pedagógico, sin explicar conceptos básicos.
**Pensamiento antes de acción:**
- SIEMPRE verificar si existe (grep, ls) antes de crear/mover/eliminar
- Si veo riesgo o duplicado potencial → emitir ALERTA con razonamiento
- Sugerir alternativa (pregunta, no orden)
- Respetar decisión final de Anthony
**En respuestas:**
- Diagnóstico de bugs: 3 líneas máximo, luego el fix
- Si tarea ambigua: hacer UNA pregunta, no varias
- Cada respuesta termina con: "Próximo paso: [acción concreta]"
- Si existe falla de lógica en el proceso → informar y sugerir ruta óptima (top 3 mundial, ahorro máximo tokens)
**Máxima:** Somos equipo de expertos. No jefe-empleado.
---

## ARCHIVOS
- Archivos ≤150 líneas siempre. Si supera: dividir sin que se pida
- Un archivo = una responsabilidad
- Nunca mezclar UI + lógica + servicios en el mismo archivo
- Al crear una skill → guardar en skills/[categoría]/ automáticamente
- Al crear una regla → guardar en reglas/ automáticamente
- Al terminar tarea → actualizar roadmap/activo/ automáticamente

## CONTEXTO — JERARQUÍA DE CARGA
1. CLAUDE.md raíz (siempre, gratis)
2. reglas/REGLAS-PERMANENTES.md (siempre, gratis)
3. roadmap/activo/ (solo al iniciar sesión de trabajo)
4. CTX relevante para la tarea (solo cuando la tarea lo requiere)
5. Nunca cargar todos los CTX juntos

## SEGURIDAD
- Nunca escribir claves, tokens o secrets en ningún archivo del repo
- Variables sensibles solo en .env.local (está en .gitignore)
- Nunca sugerir subir .env a GitHub
- Archivos en contexto/empresa/ → nunca en repo remoto

## AUTO-RUTEO
- Nueva skill creada → skills/[categoría]/[nombre].md
- Nueva regla → reglas/REGLAS-PERMANENTES.md (append)
- Tarea completada → roadmap/completado/[fecha]-[nombre].md
- Nueva idea → ideas/BACKLOG.md (append con estado: pendiente)
- Bug encontrado → seguridad/VULNERABILIDADES.md si es de seguridad

## AUTOEVALUACIÓN AL CERRAR TAREA — OBLIGATORIO
Antes de marcar cualquier tarea como completada, verificar contra el roadmap:
1. Leer las filas de la semana en `docs/desarrollador/ROADMAP*.md` (o equivalente)
2. Checkear cada entregable: ¿existe el archivo? ¿hace lo que dice el roadmap?
3. Si algún entregable dice "con datos reales de BD" → verificar query activa, no hardcode
4. Si hay gap → cerrarlo en la misma sesión antes de /cerrar
5. Reportar honestamente: "✅ completo / ❌ gap detectado → [acción]"
No avanzar a la semana siguiente con entregables incompletos de la semana actual.
6. Al cerrar → generar un **prompt listo para copiar-pegar** en la próxima sesión con:
   - Semana que inicia
   - Primer entregable concreto
   - Archivos a tocar

## PROHIBICIONES ABSOLUTAS
- Cambiar el stack hasta Fase 5
- Crear archivos .md de documentación salvo que Anthony lo pida
- Generar código de >1 pantalla por respuesta salvo "genera todo el módulo X"
- Usar conectores MCP para consultar info que ya está en CLAUDE.md
- Glob recursivo del proyecto completo
