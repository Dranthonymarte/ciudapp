import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signIn } from '@/services/supabase.auth'
import { useAuthStore } from '@/store/auth.store'

export default function LoginScreen() {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState(null)
  const navigate   = useNavigate()
  const setSession = useAuthStore(s => s.setSession)

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true); setError(null)
    const { data, error } = await signIn(email, password)
    setLoading(false)
    if (error) return setError(error.message)
    setSession(data.session)
    navigate('/')
  }

  return (
    <div style={S.page}>

      {/* Logo + marca */}
      <div style={S.logoSection}>
        <div style={S.pulseWrap}>
          <div style={S.ring2} />
          <div style={S.ring1} />
          <div style={S.iconCircle}>
            <span style={{ fontSize: 34 }}>⚠️</span>
          </div>
        </div>
        <h1 style={S.title}>CiudApp</h1>
        <p style={S.subtitle}>Red ciudadana de Chacao</p>
      </div>

      {/* Formulario */}
      <div style={S.formSection}>
        <form onSubmit={handleLogin} style={S.form}>
          <input
            style={S.input} type="email" placeholder="Correo electrónico"
            value={email} onChange={e => setEmail(e.target.value)}
            required autoComplete="email"
          />
          <input
            style={S.input} type="password" placeholder="Contraseña"
            value={password} onChange={e => setPassword(e.target.value)}
            required autoComplete="current-password"
          />
          {error && <p style={S.error}>{error}</p>}
          <button style={S.btnPrimary} type="submit" disabled={loading}>
            {loading ? 'Entrando…' : 'Entrar como Ciudadano →'}
          </button>
        </form>

        <button onClick={() => navigate('/admin/login')} style={S.btnSecondary}>
          Acceso Alcaldía
        </button>

        <div style={S.links}>
          <Link to="/forgot-password" style={S.link}>¿Olvidaste tu contraseña?</Link>
          <Link to="/register"        style={S.link}>Crear cuenta</Link>
        </div>

        <p style={S.terms}>
          Al continuar aceptas los Términos de Servicio y Política de Privacidad
        </p>
      </div>

      <style>{`
        @keyframes ringPulse1 {
          0%, 100% { transform: scale(1);    opacity: 0.25; }
          50%       { transform: scale(1.08); opacity: 0.12; }
        }
        @keyframes ringPulse2 {
          0%, 100% { transform: scale(1);    opacity: 0.12; }
          50%       { transform: scale(1.15); opacity: 0.06; }
        }
      `}</style>
    </div>
  )
}

const S = {
  page: {
    minHeight: '100dvh', background: '#0A0C10',
    display: 'flex', flexDirection: 'column',
    paddingTop: 'env(safe-area-inset-top)',
    paddingBottom: 'env(safe-area-inset-bottom)',
  },
  logoSection: {
    flex: 1, display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    padding: '48px 24px 32px',
    gap: 16,
  },
  pulseWrap: { position: 'relative', width: 88, height: 88 },
  ring1: {
    position: 'absolute', inset: -20, borderRadius: '50%',
    background: 'rgba(59,130,246,0.18)',
    animation: 'ringPulse1 2.8s ease-in-out infinite',
  },
  ring2: {
    position: 'absolute', inset: -38, borderRadius: '50%',
    background: 'rgba(59,130,246,0.09)',
    animation: 'ringPulse2 2.8s ease-in-out infinite',
  },
  iconCircle: {
    position: 'absolute', inset: 0, borderRadius: '50%',
    background: '#111318', border: '1px solid rgba(59,130,246,0.28)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  title: {
    color: '#F0F2F5', fontSize: 30, fontWeight: 700,
    margin: 0, textAlign: 'center',
  },
  subtitle: {
    color: '#8B95A5', fontSize: 14, textAlign: 'center', margin: 0,
  },
  formSection: {
    padding: '0 24px 28px',
    display: 'flex', flexDirection: 'column', gap: 12,
  },
  form: { display: 'flex', flexDirection: 'column', gap: 12 },
  input: {
    background: '#111318', border: '1px solid rgba(255,255,255,0.10)',
    borderRadius: 12, padding: '14px 16px', color: '#F0F2F5',
    fontSize: 15, outline: 'none', width: '100%',
    fontFamily: 'inherit',
  },
  error: {
    color: '#F87171', fontSize: 13, margin: 0,
    background: 'rgba(248,113,113,0.08)', padding: '10px 14px', borderRadius: 8,
  },
  btnPrimary: {
    background: '#3B82F6', color: '#fff', border: 'none', borderRadius: 12,
    padding: '15px 20px', fontSize: 15, fontWeight: 600, cursor: 'pointer',
    width: '100%', minHeight: 52, fontFamily: 'inherit',
  },
  btnSecondary: {
    background: 'transparent', color: '#F0F2F5',
    border: '1px solid rgba(255,255,255,0.14)',
    borderRadius: 12, padding: '15px 20px', fontSize: 15, fontWeight: 500,
    cursor: 'pointer', width: '100%', minHeight: 52, fontFamily: 'inherit',
  },
  links: { display: 'flex', justifyContent: 'space-between', paddingTop: 4 },
  link:  { color: '#3B82F6', fontSize: 13, textDecoration: 'none' },
  terms: {
    color: '#4B5563', fontSize: 11, textAlign: 'center',
    lineHeight: 1.6, margin: 0,
  },
}
