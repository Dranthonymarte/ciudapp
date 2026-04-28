import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signUp } from '@/services/supabase.auth'

export default function RegisterScreen() {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState(null)
  const [success,  setSuccess]  = useState(false)
  const navigate = useNavigate()

  async function handleRegister(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await signUp(email, password)
    setLoading(false)
    if (error) return setError(error.message)
    setSuccess(true)
  }

  if (success) return (
    <div style={S.page}>
      <div style={S.card}>
        <div style={{ fontSize: 48, textAlign: 'center', marginBottom: 16 }}>✉️</div>
        <h2 style={{ color: '#fff', textAlign: 'center', marginBottom: 8 }}>Revisa tu correo</h2>
        <p style={{ color: '#8B95A5', textAlign: 'center', fontSize: 14 }}>
          Enviamos un enlace de confirmación a <strong style={{ color: '#fff' }}>{email}</strong>
        </p>
        <button style={{ ...S.btn, marginTop: 24, width: '100%' }} onClick={() => navigate('/login')}>
          Ir a iniciar sesión
        </button>
      </div>
    </div>
  )

  return (
    <div style={S.page}>
      <div style={S.card}>
        <h1 style={S.title}>Crear cuenta</h1>
        <p style={S.sub}>Únete a la red ciudadana de Chacao</p>

        <form onSubmit={handleRegister} style={S.form}>
          <input
            style={S.input} type="email" placeholder="Correo electrónico"
            value={email} onChange={e => setEmail(e.target.value)} required
          />
          <input
            style={S.input} type="password" placeholder="Contraseña (mín. 6 caracteres)"
            value={password} onChange={e => setPassword(e.target.value)} minLength={6} required
          />
          {error && <p style={S.error}>{error}</p>}
          <button style={{ ...S.btn, width: '100%' }} type="submit" disabled={loading}>
            {loading ? 'Creando cuenta…' : 'Crear cuenta'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Link to="/login" style={S.link}>¿Ya tienes cuenta? Entra aquí</Link>
        </div>
      </div>
    </div>
  )
}

const S = {
  page:  { minHeight: '100dvh', background: '#0D0F14', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 },
  card:  { width: '100%', maxWidth: 400, background: '#111318', borderRadius: 16, padding: '32px 24px', border: '1px solid rgba(255,255,255,0.06)' },
  title: { color: '#fff', fontSize: 24, fontWeight: 700, textAlign: 'center', margin: '0 0 4px' },
  sub:   { color: '#8B95A5', fontSize: 14, textAlign: 'center', margin: '0 0 28px' },
  form:  { display: 'flex', flexDirection: 'column', gap: 12 },
  input: { background: '#1A1D24', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '13px 16px', color: '#fff', fontSize: 15, outline: 'none' },
  error: { color: '#F87171', fontSize: 13, margin: 0, background: 'rgba(248,113,113,0.08)', padding: '10px 14px', borderRadius: 8 },
  btn:   { background: '#3B82F6', color: '#fff', border: 'none', borderRadius: 10, padding: 14, fontSize: 15, fontWeight: 600, cursor: 'pointer', marginTop: 4 },
  link:  { color: '#3B82F6', fontSize: 13, textDecoration: 'none' },
}
