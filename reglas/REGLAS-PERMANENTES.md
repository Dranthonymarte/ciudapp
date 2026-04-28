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
- Al cerrar tarea → ejecutar `git push` automático sin pedir confirmación (Cloudflare Pages despliega solo)

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

## ARQUITECTURA — REGLAS PRE-IMPLEMENTACIÓN
Antes de escribir código de cualquier feature, definir:
1. **Layout level vs Page level**: Componentes compartidos (NavBar, BottomNav, Header, modales globales) van SIEMPRE en un layout wrapper (`AuthLayout`, `AdminLayout`), nunca dentro de una pantalla específica
2. **Z-index contract**: Definir antes de crear overlays — Leaflet interno: hasta 800 | BottomNav/Nav: 900 | Modales: 1000 | Toasts: 1100
3. **Env vars**: Cualquier servicio externo (Supabase, API keys) → listar las `VITE_*` requeridas en el mismo commit donde se usa el servicio
4. **Deploy checklist**: Al cerrar tarea con servicios externos → confirmar que las vars están en Cloudflare Pages (Ajustes → Variables de entorno) ANTES de marcar completo

## AUTOEVALUACIÓN AL CERRAR TAREA — OBLIGATORIO
Antes de marcar cualquier tarea como completada, verificar en orden:
1. Leer las filas de la semana en `docs/desarrollador/ROADMAP*.md`
2. Checkear cada entregable: ¿existe el archivo? ¿hace lo que dice el roadmap?
3. Si algún entregable dice "con datos reales de BD" → verificar query activa, no hardcode
4. **Verificar preview en navegador** — screenshot o snapshot confirma que la feature se ve y funciona
5. **Verificar env vars** — si la tarea usa servicios externos, confirmar vars en Cloudflare Pages
6. **Verificar layout** — componentes compartidos en layout wrapper, no en pantallas individuales
7. Si hay gap → cerrarlo en la misma sesión antes de /cerrar
8. Reportar honestamente: "✅ completo / ❌ gap detectado → [acción]"
No avanzar a la semana siguiente con entregables incompletos de la semana actual.
9. Al cerrar → generar un **prompt listo para copiar-pegar** en la próxima sesión con:
   - Semana que inicia
   - Primer entregable concreto
   - Archivos a tocar

## FALLAS CONOCIDAS Y SUS SOLUCIONES
| Falla | Causa | Solución permanente |
|---|---|---|
| Pantalla negra en prod | Env vars no configuradas en Cloudflare | Verificar Ajustes → Variables antes de /cerrar |
| BottomNav desaparece | Componente en pantalla en vez de layout | Shared components siempre en AuthLayout/AdminLayout |
| Deploy no se dispara | Cloudflare desconectado de GitHub | Verificar banner en Cloudflare Pages al iniciar sesión |
| Build falla silencioso | Import de var de entorno undefined | Usar fallback `?? ''` o validar en constants.js |

## PROHIBICIONES ABSOLUTAS
- Cambiar el stack hasta Fase 5
- Crear archivos .md de documentación salvo que Anthony lo pida
- Generar código de >1 pantalla por respuesta salvo "genera todo el módulo X"
- Usar conectores MCP para consultar info que ya está en CLAUDE.md
- Glob recursivo del proyecto completo
