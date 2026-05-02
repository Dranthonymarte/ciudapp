import { useState, useEffect } from 'react'
import { useNavigate }        from 'react-router-dom'
import { useAuthStore }       from '@/store/auth.store'
import { supabase }           from '@/services/supabase.client'
import MyReports              from './MyReports'
import ReportDetail           from '@/app/modules/reports/ReportDetail'

function initials(str) {
  if (!str) return '?'
  const parts = str.trim().split(/\s+/)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return str.slice(0, 2).toUpperCase()
}

function avatarColor(str) {
  if (!str) return '#3B82F6'
  const colors = ['#3B82F6','#8B5CF6','#10B981','#F59E0B','#EC4899','#06B6D4','#F97316']
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % colors.length
  return colors[h]
}

const ESTADO_LABEL = {
  nuevo: 'Nuevo', en_proceso: 'En proceso', resuelto: 'Resuelto',
  rechazado: 'Rechazado', emergencia: 'Emergencia',
}
const ESTADO_COLOR = {
  nuevo: '#3B82F6', en_proceso: '#F59E0B', resuelto: '#10B981',
  rechazado: '#6B7280', emergencia: '#EF4444',
}

export default function ProfileScreen() {
  const user     = useAuthStore(s => s.user)
  const clear    = useAuthStore(s => s.clear)
  const navigate = useNavigate()

  const [reporteSeleccionado, setReporteSeleccionado] = useState(null)
  const [signingOut, setSigningOut] = useState(false)
  const [reportCount, setReportCount] = useState(null)

  const displayName = user?.user_metadata?.name
    ?? user?.user_metadata?.full_name
    ?? user?.email?.split('@')[0]
    ?? 'Usuario'
  const email  = user?.email ?? ''
  const color  = avatarColor(displayName)
  const avatar = initials(displayName)

  useEffect(() => {
    if (!user?.id) return
    supabase
      .from('reportes')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .then(({ count }) => setReportCount(count ?? 0))
  }, [user?.id])

  async function handleSignOut() {
    setSigningOut(true)
    await supabase.auth.signOut()
    clear()
    navigate('/login', { replace: true })
  }

  return (
    <div style={{ height: '100%', background: '#0A0C10', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>

      {/* Header */}
      <div style={{
        padding:    '20px 20px 0',
        paddingTop: 'max(20px, env(safe-area-inset-top))',
        flexShrink: 0,
      }}>
        <h1 style={{ margin: '0 0 20px', color: '#F0F2F5', fontSize: 20, fontWeight: 700 }}>
          Perfil
        </h1>

        {/* Avatar card */}
        <div style={{
          background:   '#111318',
          borderRadius: 16,
          padding:      '20px 16px',
          border:       '1px solid rgba(255,255,255,0.06)',
          display:      'flex',
          alignItems:   'center',
          gap:          16,
          marginBottom: 12,
        }}>
          {/* Avatar circle */}
          <div style={{
            width:        58,
            height:       58,
            borderRadius: '50%',
            background:   `${color}22`,
            border:       `2px solid ${color}66`,
            display:      'flex',
            alignItems:   'center',
            justifyContent: 'center',
            fontSize:     22,
            fontWeight:   700,
            color,
            flexShrink:   0,
            letterSpacing: 1,
          }}>
            {avatar}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ margin: '0 0 2px', color: '#F0F2F5', fontSize: 17, fontWeight: 700, lineHeight: 1.2 }}>
              {displayName}
            </p>
            <p style={{
              margin:       0,
              color:        '#4B5563',
              fontSize:     12,
              overflow:     'hidden',
              whiteSpace:   'nowrap',
              textOverflow: 'ellipsis',
            }}>
              {email}
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div style={{
          display:      'flex',
          gap:          10,
          marginBottom: 20,
        }}>
          <StatChip
            icon="⚠️"
            label="Reportes"
            value={reportCount ?? '…'}
            color="#3B82F6"
          />
          <StatChip
            icon="🏙️"
            label="Municipio"
            value="Chacao"
            color="#8B5CF6"
          />
        </div>
      </div>

      {/* Mis reportes */}
      <div style={{ flex: 1, padding: '0 20px', paddingBottom: 100 }}>
        <div style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          marginBottom:   12,
        }}>
          <h2 style={{ margin: 0, color: '#F0F2F5', fontSize: 15, fontWeight: 700 }}>
            Mis reportes
          </h2>
          {reportCount !== null && reportCount > 0 && (
            <span style={{
              background:   'rgba(59,130,246,0.12)',
              color:        '#3B82F6',
              borderRadius: 999,
              padding:      '3px 10px',
              fontSize:     12,
              fontWeight:   600,
            }}>
              {reportCount}
            </span>
          )}
        </div>

        <MyReports userId={user?.id} onSelect={setReporteSeleccionado} />
      </div>

      {/* Sign out */}
      <div style={{
        position:      'fixed',
        bottom:        0,
        left:          0,
        right:         0,
        padding:       '12px 20px',
        paddingBottom: 'calc(12px + env(safe-area-inset-bottom) + 60px)',
        background:    'linear-gradient(to top, #0A0C10 70%, transparent)',
        pointerEvents: 'none',
      }}>
        <button
          onClick={handleSignOut}
          disabled={signingOut}
          style={{
            width:        '100%',
            padding:      '14px',
            borderRadius: 12,
            border:       '1px solid rgba(239,68,68,0.3)',
            background:   'rgba(239,68,68,0.08)',
            color:        '#EF4444',
            fontSize:     15,
            fontWeight:   600,
            cursor:       signingOut ? 'default' : 'pointer',
            opacity:      signingOut ? 0.55 : 1,
            transition:   'opacity 0.2s',
            pointerEvents: 'auto',
          }}
        >
          {signingOut ? 'Cerrando sesión…' : '↩ Cerrar sesión'}
        </button>
      </div>

      {/* Report detail sheet */}
      {reporteSeleccionado && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000 }}>
          <ReportDetail
            reporte={reporteSeleccionado}
            onClose={() => setReporteSeleccionado(null)}
          />
        </div>
      )}
    </div>
  )
}

function StatChip({ icon, label, value, color }) {
  return (
    <div style={{
      flex:         1,
      background:   '#111318',
      border:       '1px solid rgba(255,255,255,0.06)',
      borderRadius: 12,
      padding:      '12px 14px',
      display:      'flex',
      flexDirection:'column',
      gap:          4,
    }}>
      <span style={{ fontSize: 18 }}>{icon}</span>
      <span style={{ color, fontSize: 20, fontWeight: 700, lineHeight: 1 }}>{value}</span>
      <span style={{ color: '#4B5563', fontSize: 11 }}>{label}</span>
    </div>
  )
}
