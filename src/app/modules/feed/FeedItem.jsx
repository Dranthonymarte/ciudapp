const COLORS = {
  agua: '#3B82F6', luz: '#F59E0B', basura: '#10B981',
  vialidad: '#EF4444', seguridad: '#8B5CF6', gas: '#F97316',
  salud: '#EC4899', transporte: '#06B6D4',
}
const EMOJI = {
  agua: '💧', luz: '💡', basura: '🗑️',
  vialidad: '🚧', seguridad: '🚨', gas: '🔥',
  salud: '🏥', transporte: '🚌',
}
const STATUS = {
  nuevo:      { label: 'Nuevo',      color: '#3B82F6', bg: 'rgba(59,130,246,0.12)'  },
  en_proceso: { label: 'En proceso', color: '#F59E0B', bg: 'rgba(245,158,11,0.12)'  },
  resuelto:   { label: 'Resuelto',   color: '#10B981', bg: 'rgba(16,185,129,0.12)'  },
  rechazado:  { label: 'Rechazado',  color: '#EF4444', bg: 'rgba(239,68,68,0.12)'   },
}

function timeAgo(iso) {
  const s = Math.floor((Date.now() - new Date(iso)) / 1000)
  if (s < 60)    return 'Ahora'
  if (s < 3600)  return `${Math.floor(s / 60)}m`
  if (s < 86400) return `${Math.floor(s / 3600)}h`
  return `${Math.floor(s / 86400)}d`
}

export default function FeedItem({ report, onClick }) {
  const cat    = report.categoria ?? report.categoria_id ?? ''
  const color  = COLORS[cat] ?? '#8B95A5'
  const emoji  = EMOJI[cat]  ?? '📍'
  const status = STATUS[report.estado] ?? STATUS.nuevo

  return (
    <div
      onClick={onClick}
      style={{
        background:   '#111318',
        borderRadius: 14,
        overflow:     'hidden',
        cursor:       'pointer',
        marginBottom: 10,
        display:      'flex',
        border:       '1px solid rgba(255,255,255,0.05)',
        activeOpacity: 0.8,
      }}
    >
      <div style={{ width: 4, background: color, flexShrink: 0 }} />

      <div style={{ flex: 1, padding: '12px 14px', minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
          <span style={{ fontSize: 18, lineHeight: 1 }}>{emoji}</span>
          <span style={{
            flex:       1,
            color:      '#F0F2F5',
            fontSize:   14,
            fontWeight: 600,
            lineHeight: 1.35,
            minWidth:   0,
          }}>
            {report.titulo}
          </span>
          <span style={{
            fontSize:     10,
            fontWeight:   600,
            color:        status.color,
            background:   status.bg,
            padding:      '3px 7px',
            borderRadius: 99,
            whiteSpace:   'nowrap',
            flexShrink:   0,
          }}>
            {status.label}
          </span>
        </div>

        {report.descripcion && (
          <p style={{
            margin:            '0 0 8px',
            color:             '#8B95A5',
            fontSize:          13,
            lineHeight:        1.45,
            display:           '-webkit-box',
            WebkitLineClamp:   2,
            WebkitBoxOrient:   'vertical',
            overflow:          'hidden',
          }}>
            {report.descripcion}
          </p>
        )}

        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <span style={{ color: '#4B5563', fontSize: 11 }}>{timeAgo(report.created_at)}</span>
          {report.lat && (
            <>
              <span style={{ color: '#4B5563', fontSize: 11 }}>·</span>
              <span style={{ color: '#4B5563', fontSize: 11 }}>
                {Number(report.lat).toFixed(3)}, {Number(report.lng).toFixed(3)}
              </span>
            </>
          )}
        </div>
      </div>

      {report.foto_url && (
        <img
          src={report.foto_url}
          alt=""
          style={{ width: 80, objectFit: 'cover', flexShrink: 0 }}
        />
      )}
    </div>
  )
}
