import { useState } from 'react'
import { Link } from 'react-router-dom'
import { resetPassword } from '@/services/supabase.auth'

export default function ForgotPassword() {
  const [email,   setEmail]   = useState('')
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)
  const [sent,    setSent]    = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await resetPassword(email)
    setLoading(false)
    if (error) return setError(error.message)
    setSent(true)
  }

  return (
    <div style={S.page}>
      <div style={S.card}>
        {sent ? (
          <>
            <div style={{ fontSize: 48, textAlign: 'center', marginBottom: 16 }}>📨</div>
            <h2 style={{ color: '#fff', textAlign: 'center', marginBottom: 8 }}>Correo enviado</h2>
            <p style={{ color: '#8B95A5', textAlign: 'center', fontSize: 14 }}>
              Revisa tu bandeja y sigue el enlace para restablecer tu contraseña.
            </p>
            <Link to="/login" style={{ ...S.btn, display: 'block', textAlign: 'center', textDecoration: 'none', marginTop: 24 }}>
              Volver al inicio
            </Link>
          </>
        ) : (
          <>
            <h1 style={S.title}>Recuperar contraseña</h1>
            <p style={S.sub}>Te enviamos un enlace a tu correo</p>
            <form onSubmit={handleSubmit} style={S.form}>
              <input
                style={S.input} type="email" placeholder="Correo electrónico"
                value={email} onChange={e => setEmail(e.target.value)} required
              />
              {error && <p style={S.error}>{error}</p>}
              <button style={{ ...S.btn, width: '100%' }} type="submit" disabled={loading}>
                {loading ? 'Enviando…' : 'Enviar enlace'}
              </button>
            </form>
            <div style={{ textAlign: 'center', marginTop: 20 }}>
              <Link to="/login" style={S.link}>Volver al inicio</Link>
            </div>
          </>
        )}
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
  btn:   { background: '#3B82F6', color: '#fff', border: 'none', borderRadius: 10, padding: 14, fontSize: 15, fontWeight: 600, cursor: 'pointer', marginTop: 4, boxSizing: 'border-box' },
  link:  { color: '#3B82F6', fontSize: 13, textDecoration: 'none' },
}
