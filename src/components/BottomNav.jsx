import { useNavigate, useLocation } from 'react-router-dom'
import { useUiStore } from '@/store/ui.store'

const TABS = [
  { id: 'mapa',      label: 'Mapa',     icon: '🗺️',  path: '/'        },
  { id: 'alertas',   label: 'Alertas',  icon: '🔔',  path: '/alertas' },
  { id: 'reportar',  label: 'Reportar', icon: '⚠️',  path: null       },
  { id: 'feed',      label: 'Noticias', icon: '📰',  path: '/feed'    },
  { id: 'perfil',    label: 'Perfil',   icon: '👤',  path: '/perfil'  },
]

export default function BottomNav() {
  const { openReportar } = useUiStore()
  const navigate  = useNavigate()
  const { pathname } = useLocation()

  return (
    <nav style={{
      position:    'fixed',
      bottom:      0, left: 0, right: 0,
      background:  '#111318',
      borderTop:   '1px solid rgba(255,255,255,0.06)',
      display:     'flex',
      paddingBottom: 'env(safe-area-inset-bottom)',
      zIndex:      100,
    }}>
      {TABS.map(tab => {
        const isReportar = tab.id === 'reportar'
        const isActive   = !isReportar && tab.path === pathname

        return (
          <button
            key={tab.id}
            onClick={() => isReportar ? openReportar() : tab.path && navigate(tab.path)}
            style={{
              flex: 1,
              padding: isReportar ? '6px 0 10px' : '10px 0 12px',
              background: 'transparent', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            }}
          >
            {isReportar ? (
              <div style={{
                background:   '#3B82F6',
                borderRadius: '50%',
                width: 46, height: 46,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20,
                marginTop: -10,
                boxShadow: '0 0 18px rgba(59,130,246,0.55)',
              }}>⚠️</div>
            ) : (
              <span style={{ fontSize: 20 }}>{tab.icon}</span>
            )}
            <span style={{
              fontSize:   10,
              fontWeight: 500,
              color: isActive   ? '#3B82F6'
                   : isReportar ? '#3B82F6'
                   : '#8B95A5',
            }}>{tab.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
