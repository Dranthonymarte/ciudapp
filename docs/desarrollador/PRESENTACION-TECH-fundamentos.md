# Presentación Tech · Fundamentos

> Parte 1/3 · Ver: [seguridad](PRESENTACION-TECH-seguridad.md) · [stack](PRESENTACION-TECH-stack.md) · [roadmap](PRESENTACION-TECH-roadmap.md)

Secciones: Qué construimos · Tipos de app · Dos experiencias · Registro ciudadano

---

## 1. ¿QUÉ CONSTRUIMOS?

**En una línea:** Una sola aplicación web con dos niveles de acceso — uno para ciudadanos y otro para funcionarios municipales — que comparten la misma base de datos y el mismo backend.

**La analogía del banco:**
Cuando vas a un banco hay una ventanilla para clientes y una oficina privada para empleados. Es la misma institución, los mismos sistemas internos, pero lo que cada persona puede ver y hacer es completamente distinto. CiudApp funciona igual.

- **El ciudadano** entra a la app, reporta incidentes, ve el mapa, recibe alertas. Acceso libre, gratuito, sin restricciones de uso.
- **El funcionario municipal** entra al dashboard, gestiona todos los reportes de su municipio, despacha equipos, envía alertas masivas y genera estadísticas. Acceso verificado, institucional y de pago.

**¿Por qué una sola app y no dos separadas?**
Porque comparten el 80% de la tecnología: la base de datos, el sistema de autenticación, el mapa, las categorías de incidentes. Hacer dos apps separadas significaría duplicar trabajo, duplicar costos de mantenimiento y complicar las actualizaciones. Con una sola base de código, cuando se mejora algo (por ejemplo el mapa), mejora para ambos al mismo tiempo.

---

## 2. TIPOS DE APLICACIONES

**¿Qué tipo de aplicación es CiudApp y por qué?**

Existen 4 tipos de aplicaciones móviles/web. Comprender la diferencia es clave para entender por qué tomamos la decisión correcta.

### Tipo 1 — App Nativa (iOS o Android puro)
**¿Qué es?** Una app construida específicamente para un sistema operativo. Instagram, WhatsApp y Maps son ejemplos.
**Ventajas:** Máximo rendimiento, acceso completo al hardware del teléfono.
**Desventajas:** Requiere dos equipos de desarrollo (uno para iOS, uno para Android), meses de trabajo adicional, y pagar cuotas de desarrollador ($25 a Play Store una vez, $99/año a App Store) desde el primer día, incluso antes de tener un solo usuario.
**¿Para CiudApp?** Es la meta en Fase 5, cuando ya tengamos usuarios reales y presupuesto validado.

### Tipo 2 — Sitio Web clásico
**¿Qué es?** Una página web tradicional que se abre en el navegador pero no se instala en el teléfono.
**Ventajas:** Simple de hacer.
**Desventajas:** No tiene acceso al GPS del teléfono, no puede usar la cámara, no puede enviar notificaciones push. Completamente inútil para una app de emergencias que necesita ubicación en tiempo real.
**¿Para CiudApp?** No. Descartado.

### Tipo 3 — App Híbrida (React Native, Flutter)
**¿Qué es?** Una app que se escribe una sola vez pero se publica en ambas tiendas (iOS y Android).
**Ventajas:** Un solo equipo de desarrollo para ambas plataformas.
**Desventajas:** Requiere aprobación de tiendas desde el día 1, incluso para la versión de prueba. El proceso de aprobación puede tomar semanas y tiene requisitos estrictos.
**¿Para CiudApp?** Posible en Fase 5-6 si la PWA tiene limitaciones. No ahora.

### Tipo 4 — PWA (Progressive Web App) ✅ NUESTRA ELECCIÓN
**¿Qué es?** Una aplicación web que se comporta exactamente como una app nativa. Se instala en el teléfono directamente desde el navegador Chrome o Safari, sin pasar por ninguna tienda.
**Ventajas:**
- Se instala con un toque desde el navegador
- Accede al GPS, la cámara y las notificaciones push
- Funciona sin internet (offline) gracias al Service Worker
- Costo de publicación: $0
- Se actualiza automáticamente (no hay que "actualizar la app")
- Funciona en Android, iOS, Windows y Mac con el mismo código
**Desventajas:**
- En iOS (iPhone) tiene algunas limitaciones en notificaciones (mejorando con cada versión de iOS)
- No aparece en la App Store hasta Fase 5

**¿Por qué es ideal para Venezuela ahora mismo?**
Twitter Lite y Uber usaron PWA cuando entraron a mercados con internet lento e infraestructura limitada. Exactamente el contexto venezolano. La PWA consume menos datos, carga más rápido en conexiones lentas y funciona parcialmente sin conexión.

**Decisión final:** PWA en Fases 1–4 (gratis, funcional, instalable). App Store/Play Store en Fase 5 cuando ya tengamos usuarios reales pidiendo la app en la tienda.

---

## 3. DOS EXPERIENCIAS, UNA SOLA APP

**La experiencia del ciudadano y la del funcionario son completamente distintas, aunque viven dentro de la misma aplicación.**

### App Ciudadano — Móvil First, Gratuita

**Principio de diseño:** El ciudadano no debe pensar. Debe actuar.

| Elemento | Decisión de diseño | Por qué |
|---|---|---|
| Pantalla principal | Mapa con incidentes en tiempo real | El ciudadano debe ver el estado de su vecindario al instante |
| Crear un reporte | Máximo 3 toques | En una emergencia, la velocidad es lo primero |
| Diseño visual | Minimalista, modo oscuro, colores de alerta claros | Fácil de usar de noche, bajo estrés o con una sola mano |
| Velocidad | Optimizado para internet lento | Pensado para la realidad venezolana (4G variable, 3G frecuente) |
| Costo | Siempre gratuita | La adopción masiva es el argumento de venta a las alcaldías |

**Flujo de reporte (3 toques):**
1. Abrir app → el mapa está ahí
2. Tocar el botón "+" → elegir categoría del incidente
3. Confirmar ubicación (GPS automático) → enviar

### Dashboard Alcaldía — Desktop First, Institucional

**Principio de diseño:** El funcionario gestiona, decide y despacha.

| Elemento | Decisión de diseño | Por qué |
|---|---|---|
| Pantalla principal | Tabla de incidentes + mapa admin | Visión general de toda la ciudad al mismo tiempo |
| Filtros | Por zona, tipo, hora, equipo asignado | El funcionario trabaja con decenas de reportes simultáneos |
| Estadísticas | Gráficos, tendencias, zonas críticas | Tomar decisiones basadas en datos reales |
| Alertas masivas | Enviar notificación a toda una zona | Comunicación directa en emergencias |
| Reportes PDF | Generados automáticamente cada mes | Rendición de cuentas institucional |

**Branding:** Mismo logo, misma paleta de colores, misma tipografía que la app ciudadana. Pero layout completamente distinto — más denso en información, más tablas, más controles. Como la diferencia entre la app de Uber del pasajero (simple, un destino) y la del conductor (mapa con múltiples viajes, métricas, ganancias).

---

## 3.5 REGISTRO DEL CIUDADANO: FLUJO Y VERIFICACIÓN

**Sin registro, sin acceso.** La app no muestra nada sin cuenta activa. Esto impulsa el registro y elimina el uso anónimo no controlado.

### 4 pasos del registro ciudadano

**Paso 1 — Número de teléfono + OTP**
Campo principal de identidad. Se envía un código de 6 dígitos por SMS. Sin OTP confirmado, no se crea la cuenta. Un número de teléfono = una sola cuenta.

**Paso 2 — Cédula de identidad venezolana**
Campo único en la base de datos. El sistema rechaza automáticamente cualquier intento de registrar la misma cédula dos veces. Esto hace que las multi-cuentas sean prácticamente imposibles sin cometer suplantación de identidad — que es un delito.

**Paso 3 — Datos básicos**
Nombre de usuario y contraseña. Solo lo esencial.

**Paso 4 — Cuenta activa**
Acceso completo: mapa en tiempo real, crear reportes, recibir alertas, seguir el estado de sus incidentes reportados.

### ¿Por qué teléfono + cédula y no email?
| Método | Costo de crear cuenta falsa | Efectividad anti-abuso |
|---|---|---|
| Solo email | Segundos, gratis, ilimitado | Baja |
| Email + teléfono | Requiere SIM por cuenta | Media |
| **Teléfono + cédula** | **Requiere SIM + identidad real** | **Alta** |

La cédula es el identificador único más poderoso de Venezuela. Es el mismo mecanismo que usan Yummy y Cashea para controlar sus usuarios.

### Protección de identidad
- Los reportes pueden publicarse de forma anónima en la vista pública
- La cédula y el teléfono están cifrados en el servidor
- Nunca son visibles para otros ciudadanos ni para funcionarios municipales

---
