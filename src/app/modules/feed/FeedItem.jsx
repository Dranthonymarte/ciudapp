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
  nuevo:      { label: 'Nuevo',      color: '#3B82F6' },
  en_proceso: { label: 'En proceso', color: '#F59E0B' },
  resuelto:   { label: 'Resuelto',   color: '#10B981' },
  rechazado:  { label: 'Rechazado',  color: '#6B7280' },
  emergencia: { label: 'Emergencia', color: '#EF4444' },
}

function timeAgo(iso) {
  const s = Math.floor((Date.now() - new Date(iso)) / 1000)
  if (s < 60)    return 'Ahora'
  if (s < 3600)  return `${Math.floor(s / 60)}m`
  if (s < 86400) return `${Math.floor(s / 3600)}h`
  return `${Math.floor(s / 86400)}d`
}

function hexAlpha(hex, a) {
  const n = parseInt(hex.slice(1), 16)
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`
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
        background:              '#1A1D24',
        borderRadius:            14,
        overflow:                'hidden',
        cursor:                  'pointer',
        marginBottom:            10,
        border:                  '1px solid rgba(255,255,255,0.06)',
        boxShadow:               '0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)',
        display:                 'flex',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      <div style={{ flex: 1, padding: '12px 14px', minWidth: 0 }}>

        {/* Category + status badges */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, gap: 8 }}>
          <span style={{
            display:      'inline-flex',
            alignItems:   'center',
            gap:          5,
            background:   hexAlpha(color, 0.16),
            color:        color,
            borderRadius: 999,
            padding:      '4px 10px',
            fontSize:     11,
            fontWeight:   600,
            whiteSpace:   'nowrap',
          }}>
            <span style={{ fontSize: 12, lineHeight: 1 }}>{emoji}</span>
            {cat ? cat.charAt(0).toUpperCase() + cat.slice(1) : 'Reporte'}
          </span>

          <span style={{
            background:   hexAlpha(status.color, 0.12),
            color:        status.color,
            borderRadius: 999,
            padding:      '4px 10px',
            fontSize:     11,
            fontWeight:   600,
            whiteSpace:   'nowrap',
            flexShrink:   0,
          }}>
            {status.label}
          </span>
        </div>

        {/* Title */}
        <p style={{
          margin:      '0 0 6px',
          color:       '#F0F2F5',
          fontSize:    15,
          fontWeight:  700,
          lineHeight:  1.35,
        }}>
          {report.titulo}
        </p>

        {/* Description */}
        {report.descripcion && (
          <p style={{
            margin:              '0 0 8px',
            color:               '#8B95A5',
            fontSize:            13,
            lineHeight:          1.45,
            display:             '-webkit-box',
            WebkitLineClamp:     2,
            WebkitBoxOrient:     'vertical',
            overflow:            'hidden',
          }}>
            {report.descripcion}
          </p>
        )}

        {/* Meta */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: '#4B5563' }}>
            {timeAgo(report.created_at)}
          </span>
          {report.direccion && (
            <>
              <span style={{ color: '#4B5563', fontSize: 11 }}>·</span>
              <span style={{
                color:        '#4B5563',
                fontSize:     11,
                overflow:     'hidden',
                whiteSpace:   'nowrap',
                textOverflow: 'ellipsis',
              }}>
                📍 {report.direccion}
              </span>
            </>
          )}
          {!report.direccion && report.lat && (
            <>
              <span style={{ color: '#4B5563', fontSize: 11 }}>·</span>
              <span style={{ color: '#4B5563', fontSize: 11, fontFamily: 'monospace' }}>
                {Number(report.lat).toFixed(3)}, {Number(report.lng).toFixed(3)}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Photo thumbnail */}
      {report.foto_url && (
        <img
          src={report.foto_url}
          alt=""
          style={{
            width:        80,
            height:       'auto',
            minHeight:    80,
            objectFit:    'cover',
            flexShrink:   0,
            borderRadius: '0 14px 14px 0',
          }}
        />
      )}
    </div>
  )
}
