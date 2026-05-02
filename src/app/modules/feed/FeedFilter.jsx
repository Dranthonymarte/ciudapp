import { CATEGORIAS } from '@/store/map.store'

const ESTADOS = [
  { id: 'todos',      label: 'Todos',      color: '#8B95A5' },
  { id: 'nuevo',      label: 'Nuevo',      color: '#3B82F6' },
  { id: 'en_proceso', label: 'En proceso', color: '#F59E0B' },
  { id: 'resuelto',   label: 'Resuelto',   color: '#10B981' },
  { id: 'rechazado',  label: 'Rechazado',  color: '#EF4444' },
  { id: 'emergencia', label: 'Emergencia', color: '#EF4444' },
]

const scrollStyle = {
  display:         'flex',
  gap:             6,
  overflowX:       'auto',
  overflowY:       'hidden',
  scrollbarWidth:  'none',
  WebkitOverflowScrolling: 'touch',
  padding:         '0 16px',
}

function hexToRgba(hex, alpha) {
  const n = parseInt(hex.slice(1), 16)
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`
}

function CatPill({ cat, active, onClick }) {
  return (
    <button
      onClick={() => onClick(cat.id)}
      style={{
        padding:      '7px 14px',
        borderRadius: 999,
        fontSize:     12,
        fontWeight:   600,
        fontFamily:   'inherit',
        border:       active
          ? '1px solid transparent'
          : '1px solid rgba(255,255,255,0.10)',
        background:   active ? cat.color : 'transparent',
        color:        active ? '#fff' : '#8B95A5',
        cursor:       'pointer',
        whiteSpace:   'nowrap',
        flexShrink:   0,
        transition:   'background 0.15s ease-out, color 0.15s ease-out, border-color 0.15s ease-out',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {cat.label}
    </button>
  )
}

function EstadoPill({ est, active, onClick }) {
  const isDefault = est.id === 'todos'
  return (
    <button
      onClick={() => onClick(est.id)}
      style={{
        padding:      '6px 12px',
        borderRadius: 999,
        fontSize:     11,
        fontWeight:   600,
        fontFamily:   'inherit',
        display:      'inline-flex',
        alignItems:   'center',
        gap:          5,
        border:       active
          ? `1px solid ${hexToRgba(est.color, 0.35)}`
          : '1px solid rgba(255,255,255,0.10)',
        background:   active
          ? hexToRgba(est.color, isDefault ? 0.06 : 0.12)
          : 'transparent',
        color:        active ? est.color : '#8B95A5',
        cursor:       'pointer',
        whiteSpace:   'nowrap',
        flexShrink:   0,
        transition:   'background 0.15s ease-out, color 0.15s ease-out, border-color 0.15s ease-out',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {active && !isDefault && (
        <span style={{
          width:        5,
          height:       5,
          borderRadius: '50%',
          background:   est.color,
          flexShrink:   0,
        }} />
      )}
      {est.label}
    </button>
  )
}

export default function FeedFilter({ catActiva = 'todas', estadoActivo = 'todos', onCat, onEstado }) {
  return (
    <div style={{
      background:   '#0A0C10',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      paddingBottom: 10,
    }}>
      <div
        style={{ ...scrollStyle, paddingTop: 10, paddingBottom: 0 }}
        onTouchStart={e => e.stopPropagation()}
      >
        {CATEGORIAS.map(cat => (
          <CatPill
            key={cat.id}
            cat={cat}
            active={catActiva === cat.id}
            onClick={onCat}
          />
        ))}
      </div>

      <div
        style={{ ...scrollStyle, paddingTop: 8 }}
        onTouchStart={e => e.stopPropagation()}
      >
        {ESTADOS.map(est => (
          <EstadoPill
            key={est.id}
            est={est}
            active={estadoActivo === est.id}
            onClick={onEstado}
          />
        ))}
      </div>
    </div>
  )
}
