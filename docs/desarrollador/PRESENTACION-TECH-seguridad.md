# Presentación Tech · Seguridad

> Parte 2/3 · Ver: [fundamentos](PRESENTACION-TECH-fundamentos.md) · [stack](PRESENTACION-TECH-stack.md) · [roadmap](PRESENTACION-TECH-roadmap.md)

Secciones: Separación de accesos · Verificación funcionarios · 5 hackeos · Políticas y moderación

---

## 4. SEGURIDAD Y SEPARACIÓN DE ACCESOS

### La pregunta crítica
**¿Puede un ciudadano acceder al dashboard de la alcaldía aunque tenga las credenciales (usuario y contraseña) de un funcionario?**

**Respuesta: NO. Nunca. Aquí está por qué:**

### La analogía del edificio corporativo

Imagina un edificio con sistema de acceso por tarjeta:
- **Tarjeta azul** = ciudadano. Le abre el lobby, los baños y las áreas públicas.
- **Tarjeta roja** = funcionario. Le abre las oficinas administrativas, archivos y salas de reunión.

Si un funcionario le entrega su tarjeta roja a un ciudadano, ¿puede este entrar a las oficinas? **No.** Porque el sistema no solo verifica la tarjeta — verifica que la persona que la usa fue registrada originalmente como empleado. Si el sistema no encuentra ese registro, la puerta no abre, independientemente de qué tarjeta presente.

En CiudApp, el rol de cada usuario (ciudadano o funcionario) vive en el servidor, no en el teléfono. No se puede falsificar porque el teléfono nunca tiene acceso a modificarlo.

### Las 4 capas de seguridad

**Capa 1 — Roles en base de datos**
Cada cuenta tiene asignado un rol en el servidor: `ciudadano` o `funcionario_municipal`. Este rol no puede ser modificado desde el teléfono ni desde el navegador. Solo el administrador del sistema puede cambiarlo, con credenciales propias.

**Capa 2 — RLS (Row Level Security)**
Supabase aplica reglas automáticas en cada consulta a la base de datos. La regla dice: "esta información (reportes de gestión, asignaciones de equipos, estadísticas municipales) solo puede ser leída por un usuario con rol `funcionario_municipal`." El servidor verifica el rol antes de entregar cualquier dato. El ciudadano nunca recibe datos del dashboard, aunque lo pida directamente.

**Capa 3 — Login institucional separado**
El dashboard de la alcaldía tiene su propia pantalla de acceso en una URL diferente (por ejemplo `ciudapp.com/admin`). Esta URL no está vinculada ni anunciada en ningún lugar de la app ciudadana. No es indexable por Google. El ciudadano promedio nunca sabrá que existe.

**Capa 4 — Registro auditado**
Cada acción dentro del dashboard queda registrada: quién entró, desde qué IP, cuándo, qué acción realizó. Si ocurre algo sospechoso, hay un historial completo para investigar.

---

## 5. VERIFICACIÓN DE FUNCIONARIOS MUNICIPALES

**El registro de un usuario de alcaldía no es como crear un Gmail. Es un proceso formal con documentación.**

### ¿Por qué es necesario este proceso?
El dashboard de la alcaldía tiene acceso a datos sensibles: ubicación de todos los reportes ciudadanos, identidades de usuarios, estadísticas de seguridad. Un acceso no verificado podría comprometer la privacidad de los ciudadanos, generar conflictos políticos o ser usado para vigilancia indebida.

### El proceso en 4 pasos

**Paso 1 — Solicitud formal**
El funcionario llena un formulario dentro de la plataforma con:
- Nombre completo y cédula de identidad
- Cargo oficial dentro de la alcaldía
- Municipio al que pertenece
- Correo institucional (de la alcaldía, no Gmail ni Hotmail)
- Nombre del superior inmediato

**Paso 2 — Documentación obligatoria**
El funcionario sube (foto o escaneo):
- Carnet de identificación municipal vigente, o
- Oficio de designación firmado y sellado por la alcaldía, o
- Constancia de trabajo en papel membrete oficial

**Paso 3 — Revisión y aprobación manual**
El equipo de CiudApp (en coordinación con Ana, COO) revisa los documentos. El proceso toma máximo 48 horas hábiles. Se verifica:
- Que el documento sea auténtico y no esté alterado
- Que el municipio solicitante sea un cliente activo de CiudApp
- Que el correo institucional corresponda al municipio declarado

**Paso 4 — Activación controlada**
Se crean credenciales únicas para ese funcionario, ligadas exclusivamente a su municipio. El funcionario solo puede ver y gestionar los datos de su alcaldía. Si hay 5 municipios usando CiudApp, el funcionario del Municipio A no puede ver ni un solo dato del Municipio B.

### Medidas adicionales
- Las cuentas de funcionarios vencen automáticamente si no se renuevan anualmente
- El alcalde o director de TI del municipio puede revocar accesos en cualquier momento
- Se puede configurar acceso por rangos horarios (solo durante horario laboral)

---

## 6. LOS 5 HACKEOS MÁS COMUNES

**No esperamos a que ocurran. Los bloqueamos desde el primer día de desarrollo.**

### Hackeo 1 — Fuerza bruta (adivinar contraseñas)
**¿Qué es?** Un programa intenta miles de combinaciones de contraseña hasta encontrar la correcta.
**Cómo lo prevenimos:** Rate limiting — máximo 5 intentos de login por dispositivo/IP. Al 6to intento fallido, bloqueo automático de 30 minutos. Después de 3 bloqueos seguidos, la cuenta queda suspendida y se notifica al usuario por correo.

### Hackeo 2 — Inyección de código malicioso (SQL Injection / XSS)
**¿Qué es?** Un atacante escribe código dentro de un formulario (como el campo de descripción de un reporte) con la intención de que ese código se ejecute en el servidor o en el navegador de otro usuario.
**Cómo lo prevenimos:** Supabase usa consultas parametrizadas — el texto que escribe un usuario nunca se ejecuta como código. Solo se guarda como texto. Adicionalmente, todo el contenido generado por usuarios pasa por una capa de sanitización antes de mostrarse en pantalla.

### Hackeo 3 — Interceptación de datos en tránsito (Man in the Middle)
**¿Qué es?** Alguien en la misma red WiFi intercepta los datos que viajan entre el teléfono y el servidor (como una contraseña o una foto).
**Cómo lo prevenimos:** HTTPS obligatorio en toda la app. Todos los datos viajan cifrados con SSL/TLS. Cloudflare provee este certificado automáticamente y de forma gratuita. Una app sin HTTPS no puede acceder al GPS del teléfono — el navegador lo bloquea. Estamos forzados a tener HTTPS.

### Hackeo 4 — Acceso no autorizado a datos de otros usuarios (IDOR)
**¿Qué es?** Un usuario modifica la URL o una petición para acceder a los datos de otro usuario. Por ejemplo, cambia el ID en la URL de su perfil por el de otro ciudadano.
**Cómo lo prevenimos:** RLS (Row Level Security) en Supabase. Cada petición al servidor incluye automáticamente el ID del usuario autenticado. Las reglas de la base de datos solo devuelven registros que pertenezcan a ese usuario. Si alguien intenta acceder a datos de otro usuario, recibe un error vacío — ni siquiera sabe si ese registro existe.

### Hackeo 5 — Spam, denuncias falsas y abuso de la plataforma
**¿Qué es?** Un usuario (o bot) genera cientos de reportes falsos para saturar el sistema, crear alarma falsa o atacar la reputación de una zona.
**Cómo lo prevenimos:**
- Límite de reportes por usuario: máximo 10 por hora, 30 por día
- Sistema de reputación: los reportes verificados por la alcaldía suman puntos, los rechazados los restan
- Verificación por teléfono (OTP SMS) + cédula venezolana única: la combinación hace imposible las multi-cuentas. La cédula es campo único en BD — intentar registrar la misma dos veces es rechazado automáticamente
- Política de uso aceptable con consecuencias escalonadas: advertencia → suspensión temporal → baneo permanente
- Fase 5+: Perspective API de Google (gratuita) analiza automáticamente el texto de cada reporte y detecta contenido abusivo, odioso o irrelevante

---

## 7. POLÍTICAS, PRIVACIDAD Y MODERACIÓN

### Política de uso aceptable
Los ciudadanos que usan CiudApp aceptan que sus reportes deben ser:
- **Verídicos:** basados en hechos reales, no rumores
- **Relevantes:** relacionados con la seguridad o el estado urbano del municipio
- **Respetuosos:** sin contenido xenófobo, discriminatorio ni amenazante

**Conductas prohibidas:**
- Denuncias falsas o fabricadas
- Incluir datos personales identificables de terceros (nombres, placas, fotos de rostros)
- Uso con fines políticos o electorales
- Crear múltiples cuentas para evadir sanciones

### Privacidad de datos
- Los datos del ciudadano **no se venden** a terceros, nunca
- La ubicación GPS solo se usa durante el envío activo de un reporte
- Las fotos de reportes se almacenan cifradas y solo son accesibles para el ciudadano que las subió y los funcionarios del municipio donde ocurrió el incidente
- El ciudadano puede solicitar la eliminación completa de su cuenta y todos sus datos en cualquier momento (cumplimiento LOPD venezolana y mejores prácticas de GDPR europeo)
- Los datos de los municipios (estadísticas, reportes gestionados) **son propiedad del municipio**, no de CiudApp

### Moderación por etapas
| Fase | Método | Responsable |
|---|---|---|
| Fases 1–3 | Revisión manual de reportes reportados por usuarios | Equipo de operaciones (Ana) |
| Fase 4 | Reglas automáticas básicas (límites de frecuencia, palabras clave bloqueadas) | Sistema automático |
| Fase 5+ | Perspective API (Google) — análisis de toxicidad en texto, gratuita | IA + revisión humana |

