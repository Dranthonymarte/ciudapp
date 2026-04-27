# CiudApp — Stack: Flujo y Entorno

> Parte 2/2 — Stack completo y razones en [STACK.md](STACK.md)

---

## FLUJO DE DESARROLLO CON CLAUDE

```
Anthony escribe instrucción precisa
        ↓
Claude genera código (React, JS)
        ↓
Anthony revisa en el navegador (Vite server local)
        ↓
Si funciona → git commit → push a GitHub
        ↓
Cloudflare Pages despliega automáticamente
        ↓
App actualizada en producción (~30s)
```

---

## VARIABLES DE ENTORNO (.env.local)

```bash
# Supabase
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Cloudflare (opcional, solo si se usa Workers)
# VITE_CF_TOKEN=...

# App
VITE_APP_NAME=CiudApp
VITE_APP_VERSION=0.1.0
```

> ⚠️ NUNCA subir `.env.local` a GitHub. Solo `.env.example` con los nombres vacíos.

---

## PLATAFORMAS ADICIONALES (futuro)

| Plataforma | Para qué | Cuándo |
|---|---|---|
| Stripe Atlas (~$500) | LLC en EE.UU. para cobros internacionales | Fase 5, si hay clientes internacionales |
| Resend / SendGrid | Emails transaccionales (confirmación de reporte) | Fase 3 |
| Sentry | Monitoreo de errores en producción | Fase 4 |
| PostHog | Analytics de comportamiento de usuario | Fase 4 |
| Cloudflare R2 | Storage para fotos a escala (más barato que Supabase) | Fase 5+ |
| Play Store | App Android nativa | Fase 5 |
| App Store | App iOS nativa | Fase 5 |

---

*Documento generado: 2026-04-16 | Actualizar al incorporar nuevas herramientas*
