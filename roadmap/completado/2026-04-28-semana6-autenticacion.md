# Semana 6 — Autenticación
Fecha inicio: 2026-04-28
Fase: 2
Objetivo: Usuario puede registrarse, iniciar sesión y tener perfil persistente en la app

Archivos a tocar:
- src/app/modules/auth/RegisterScreen.jsx
- src/app/modules/auth/LoginScreen.jsx
- src/app/modules/auth/AuthGuard.jsx
- src/app/modules/auth/ForgotPassword.jsx
- src/services/supabase.auth.js
- src/hooks/useAuth.js
- src/store/auth.store.js
- src/app/Router.jsx (rutas protegidas)
- src/components/BottomNav.jsx (mostrar/ocultar según auth)

Estado: completado

Pendientes:
- [x] supabase.auth.js — signUp, signIn, signOut, getSession, resetPassword
- [x] auth.store.js — Zustand: user, session, loading, error
- [x] useAuth.js — hook global de sesión
- [x] RegisterScreen.jsx — formulario email + contraseña + confirmación por correo
- [x] LoginScreen.jsx — login funcional con feedback de error
- [x] AuthGuard.jsx — redirige a /login si no hay sesión
- [x] ForgotPassword.jsx — enviar email de recuperación vía Supabase
- [x] AppRouter.jsx + ciudadano.routes.jsx — rutas protegidas integradas
- [x] BottomNav.jsx — Reportar redirige a /login si no autenticado
