import { useState, useEffect } from 'react'
import { supabase } from '@/services/supabase.client'

const NIVEL_COLOR = {
  info:      { bg: 'rgba(59,130,246,0.12)',  border: 'rgba(59,130,246,0.3)',  text: '#3B82F6',  icon: 'ℹ️' },
  aviso:     { bg: 'rgba(245,158,11,0.12)',  border: 'rgba(245,158,11,0.3)',  text: '#F59E0B',  icon: '⚠️' },
  urgente:   { bg: 'rgba(239,68,68,0.12)',   border: 'rgba(239,68,68,0.35)',  text: '#EF4444',  icon: '🚨' },
  emergencia:{ bg: 'rgba(239,68,68,0.18)',   border: 'rgba(239,68,68,0.5)',   text: '#EF4444',  icon: '🆘' },
}

export default function AlertBanner() {
  const [alerts,    setAlerts]    = useState([])
  const [dismissed, setDismissed] = useState(new Set())

  useEffect(() => {
    // Initial fetch — last 3 active alerts
    supabase
      .from('alertas')
      .select('id, titulo, mensaje, nivel, created_at')
      .eq('activa', true)
      .order('created_at', { ascending: false })
      .limit(3)
      .then(({ data }) => { if (data?.length) setAlerts(data) })

    // Realtime: push new alerts as they arrive
    const channel = supabase
      .channel('alertas-ciudadano')
      .on('postgres_changes', {
        event:  'INSERT',
        schema: 'public',
        table:  'alertas',
        filter: 'activa=eq.true',
      }, (payload) => {
        setAlerts(prev => [payload.new, ...prev].slice(0, 3))
      })
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [])

  const visible = alerts.filter(a => !dismissed.has(a.id))
  if (visible.length === 0) return null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '8px 16px 0' }}>
      {visible.map(alert => {
        const style = NIVEL_COLOR[alert.nivel] ?? NIVEL_COLOR.info
        return (
          <div
            key={alert.id}
            style={{
              background:   style.bg,
              border:       `1px solid ${style.border}`,
              borderRadius: 10,
              padding:      '10px 12px',
              display:      'flex',
              alignItems:   'flex-start',
              gap:          8,
            }}
          >
            <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>{style.icon}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: '0 0 2px', color: style.text, fontSize: 12, fontWeight: 700 }}>
                {alert.titulo}
              </p>
              {alert.mensaje && (
                <p style={{
                  margin:          0,
                  color:           '#9CA3AF',
                  fontSize:        11,
                  lineHeight:      1.4,
                  display:         '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow:        'hidden',
                }}>
                  {alert.mensaje}
                </p>
              )}
            </div>
            <button
              onClick={() => setDismissed(d => new Set([...d, alert.id]))}
              style={{
                background:  'transparent',
                border:      'none',
                color:       '#4B5563',
                fontSize:    16,
                cursor:      'pointer',
                padding:     '0 0 0 4px',
                lineHeight:  1,
                flexShrink:  0,
              }}
            >
              ×
            </button>
          </div>
        )
      })}
    </div>
  )
}
