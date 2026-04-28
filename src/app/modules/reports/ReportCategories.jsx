export const CATEGORIAS_REPORTE = [
  { id: 'agua',       label: 'Agua',        emoji: '💧', color: '#3B82F6', desc: 'Sin agua, tubería rota'         },
  { id: 'luz',        label: 'Luz',         emoji: '⚡', color: '#F59E0B', desc: 'Corte eléctrico, poste caído'   },
  { id: 'basura',     label: 'Basura',      emoji: '🗑️', color: '#10B981', desc: 'Desechos, contenedor lleno'    },
  { id: 'vialidad',   label: 'Vialidad',    emoji: '🛣️', color: '#EF4444', desc: 'Baches, semáforos, señales'    },
  { id: 'seguridad',  label: 'Seguridad',   emoji: '🚨', color: '#8B5CF6', desc: 'Robo, situación peligrosa'     },
  { id: 'gas',        label: 'Gas',         emoji: '🔥', color: '#F97316', desc: 'Gas doméstico, cola gasolina'   },
  { id: 'salud',      label: 'Salud',       emoji: '🏥', color: '#EC4899', desc: 'Hospital, medicamentos, urgencia' },
  { id: 'transporte', label: 'Transporte',  emoji: '🚌', color: '#06B6D4', desc: 'Sin buseta, ruta cancelada'    },
]

export default function ReportCategories({ selected, onSelect }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '12px',
    }}>
      {CATEGORIAS_REPORTE.map(cat => {
        const active = selected === cat.id
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat)}
            style={{
              background:  active ? `${cat.color}22` : '#1A1D24',
              border:      `2px solid ${active ? cat.color : 'rgba(255,255,255,0.08)'}`,
              borderRadius: '16px',
              padding:     '16px 12px',
              cursor:      'pointer',
              textAlign:   'left',
              transition:  'all 0.2s ease',
              transform:   active ? 'scale(1.02)' : 'scale(1)',
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 6 }}>{cat.emoji}</div>
            <div style={{ color: '#F0F2F5', fontSize: 14, fontWeight: 600, marginBottom: 3 }}>{cat.label}</div>
            <div style={{ color: '#8B95A5', fontSize: 11, lineHeight: '1.3' }}>{cat.desc}</div>
          </button>
        )
      })}
    </div>
  )
}
