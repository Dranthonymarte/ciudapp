import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/auth.store'

export default function AuthGuard({ children }) {
  const { user, loading } = useAuthStore()

  if (loading) return (
    <div style={{ minHeight: '100dvh', background: '#0D0F14', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: '#8B95A5', fontSize: 14 }}>Cargando…</div>
    </div>
  )

  if (!user) return <Navigate to="/login" replace />

  return children
}
