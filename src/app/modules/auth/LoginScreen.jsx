import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signIn } from '@/services/supabase.auth'
import { useAuthStore } from '@/store/auth.store'

export default function LoginScreen() {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState(null)
  const navigate    = useNavigate()
  const setSession  = useAuthStore(s => s.setSession)

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { data, error } = await signIn(email, password)
    setLoading(false)
    if (error) return setError(error.message)
    setSession(data.session)
    navigate('/')
  }

  return (
    <div style={S.page}>
      <div style={S.card}>
        <h1 style={S.title}>CiudApp</h1>
        <p style={S.sub}>Inicia sesión para continuar</p>

        <form onSubmit={handleLogin} style={S.form}>
          <input
            style={S.input} type="email" placeholder="Correo electrónico"
            value={email} onChange={e => setEmail(e.target.value)} required
          />
          <input
            style={S.input} type="password" placeholder="Contraseña"
            value={password} onChange={e => setPassword(e.target.value)} required
          />
          {error && <p style={S.error}>{error}</p>}
          <button style={S.btn} type="submit" disabled={loading}>
            {loading ? 'Entrando…' : 'Entrar'}
          </button>
        </form>

        <div style={S.links}>
          <Link to="/forgot-password" style={S.link}>¿Olvidaste tu contraseña?</Link>
          <Link to="/register"        style={S.link}>Crear cuenta</Link>
        </div>
      </div>
    </div>
  )
}

const S = {
  page:  { minHeight: '100dvh', background: '#0D0F14', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 },
  card:  { width: '100%', maxWidth: 400, background: '#111318', borderRadius: 16, padding: '32px 24px', border: '1px solid rgba(255,255,255,0.06)' },
  title: { color: '#fff', fontSize: 28, fontWeight: 700, textAlign: 'center', margin: '0 0 4px' },
  sub:   { color: '#8B95A5', fontSize: 14, textAlign: 'center', margin: '0 0 28px' },
  form:  { display: 'flex', flexDirection: 'column', gap: 12 },
  input: { background: '#1A1D24', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '13px 16px', color: '#fff', fontSize: 15, outline: 'none' },
  error: { color: '#F87171', fontSize: 13, margin: 0, background: 'rgba(248,113,113,0.08)', padding: '10px 14px', borderRadius: 8 },
  btn:   { background: '#3B82F6', color: '#fff', border: 'none', borderRadius: 10, padding: 14, fontSize: 15, fontWeight: 600, cursor: 'pointer', marginTop: 4 },
  links: { display: 'flex', justifyContent: 'space-between', marginTop: 20 },
  link:  { color: '#3B82F6', fontSize: 13, textDecoration: 'none' },
}
