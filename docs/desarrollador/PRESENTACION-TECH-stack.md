# Presentación Tech · Stack y Diseño

> Parte 3/3 · Ver: [fundamentos](PRESENTACION-TECH-fundamentos.md) · [seguridad](PRESENTACION-TECH-seguridad.md) · [roadmap](PRESENTACION-TECH-roadmap.md)

Secciones: Stack tecnológico · Diseño, marca y UX

---


## 8. STACK TECNOLÓGICO EXPLICADO

**Cada herramienta es la correcta para este proyecto. Costo total Fases 1–4: $0.**

### React + Vite — El motor de la app
**¿Qué es sin jerga?** React es el lenguaje con el que se construye la interfaz visual de la app (botones, pantallas, formularios, el mapa). Vite es la herramienta que convierte ese código en algo que el navegador puede ejecutar, de forma ultrarrápida.
**Por qué es el correcto:** Es el estándar de la industria usado por Meta, Airbnb y miles de empresas. Claude (la IA que construye la app junto a Anthony) lo conoce perfectamente. Es modular por naturaleza: cada pantalla es un componente independiente.
**Costo:** Gratuito. Siempre.
**Analogía:** React es el diseño arquitectónico del edificio. Vite es la constructora que lo levanta rápido.

### Supabase — El cerebro que guarda todo
**¿Qué es sin jerga?** Es el servicio que guarda todos los datos de la app: los reportes ciudadanos, los perfiles de usuario, las fotos subidas, las credenciales de login. También maneja quién puede ver qué dato (seguridad) y actualiza la app en tiempo real cuando hay un reporte nuevo.
**Por qué es el correcto:** Reemplaza 4 servicios en uno (base de datos, autenticación, almacenamiento de archivos, tiempo real). Tiene un plan gratuito muy generoso para validar el producto. Claude lo conoce bien.
**Límites del plan gratuito:** 500MB de base de datos, 1GB de almacenamiento de fotos, 50,000 usuarios activos al mes.
**Cuándo se paga:** Al superar esos límites o en Fase 5 (~$25/mes).
**Analogía:** Supabase es el archivo central del edificio donde se guarda todo, con un portero que decide quién puede ver cada carpeta.

### Cloudflare Pages — Donde vive la app en internet
**¿Qué es sin jerga?** Es el servicio de hospedaje donde la app vive en internet. Es el equivalente al terreno donde está construido el edificio.
**Por qué es el correcto:** Completamente gratuito sin importar cuántos usuarios tenga la app. Tiene servidores en Latinoamérica, lo que significa que la app carga más rápido desde Venezuela. Provee SSL (el candado de seguridad en la URL) automáticamente. Cuando Anthony hace un cambio y lo guarda en GitHub, Cloudflare publica el cambio en la app en vivo automáticamente en ~30 segundos.
**Costo:** Gratuito. Siempre.

### Leaflet + OpenStreetMap — El mapa
**¿Qué es sin jerga?** Leaflet es la librería que dibuja el mapa en pantalla y permite poner marcadores, zonas y capas visuales. OpenStreetMap es el mapa del mundo colaborativo (como Wikipedia pero de mapas) que usamos como base.
**Por qué es el correcto:** 100% gratuito, sin API key, sin límites de uso. Venezuela está bien mapeada. No dependemos de Google Maps, que puede cambiar sus precios o condiciones en cualquier momento.
**Costo:** Gratuito. Siempre.

### PWA — La app que se instala sin tienda
**¿Qué es sin jerga?** Un conjunto de tecnologías que convierten la web de CiudApp en una app que se puede instalar en el teléfono directamente desde Chrome, sin necesidad de ir a la Play Store ni a la App Store.
**Por qué es el correcto:** Cero costo de publicación. Acceso a GPS y cámara. Funciona sin internet (guarda reportes en cola y los envía cuando hay conexión). Se actualiza sola.

### GitHub — La memoria del proyecto
**¿Qué es sin jerga?** El servicio donde se guarda todo el código del proyecto con historial completo. Cada vez que se hace un cambio, queda registrado con fecha, hora y descripción.
**Por qué es el correcto:** Si algo se rompe, se puede regresar exactamente al punto anterior. Se integra directamente con Cloudflare Pages (guardar = publicar). Gratuito para repositorios privados.
**Analogía:** GitHub es como el historial de versiones de un documento de Word, pero para todo el código de la app.

---

## 9. DISEÑO: MARCA Y UX

### Estrategia en dos fases

**Fase actual — UX de referencia profesional (Fases 1–4)**
No esperamos a tener la marca definitiva para tener un diseño de nivel mundial. Usamos:
- **Dribbble:** La plataforma de referencia de diseño UX/UI a nivel mundial. Diseñadores de Google, Apple y Airbnb publican ahí su trabajo. Tomamos inspiración de interfaces similares (apps de seguridad, mapas, reportes ciudadanos).
- **Behance:** Portfolio de diseño de Adobe. Referencias de branding, pantallas e identidad visual.
- **Apps de referencia:** Waze (mapas y reportes), Citizen (alertas de seguridad en EE.UU.), SoSafe (inspiración directa con mejoras).

El piloto HTML ya tiene diseño oscuro profesional, paleta azul (#003F8A) + amarillo (#FFD700) que representa identidad venezolana, y tipografía Syne + DM Sans de nivel mundial.

**Fase de identidad — Sebastián (CEO & Diseñador)**
Cuando Sebastián tenga lista la identidad visual (logo, ícono de app, guía de colores, tipografía oficial), se implementa en CiudApp editando únicamente 2 archivos:
- `theme.config.js` → colores de toda la app
- `typography.config.js` → fuentes de toda la app

Esos 2 archivos controlan el 100% del aspecto visual. Cambiar la tipografía de toda la app = editar una línea en un archivo. Sin tocar nada más.

### Principios UX inamovibles (no cambian nunca)

| Principio | Implementación |
|---|---|
| Mapa como pantalla principal | Al abrir la app, el mapa está ahí. Sin pantalla de bienvenida, sin splash screen largo |
| Reporte en máximo 3 toques | Diseñado y validado antes de construir |
| Modo oscuro nativo | Desde Fase 1. Venezuela: uso nocturno frecuente, ahorro de batería crítico |
| Optimizado para internet lento | Imágenes comprimidas, carga progresiva, offline-first |
| Sin burocracia para el ciudadano | Cero formularios innecesarios. Solo lo esencial para el reporte |

