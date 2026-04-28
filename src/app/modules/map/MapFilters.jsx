import { CATEGORIAS, useMapStore } from '@/store/map.store'

export default function MapFilters() {
  const { filtroCategoria, setFiltro } = useMapStore()

  return (
    <div style={{
      position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
      zIndex: 1000, display: 'flex', gap: 6, flexWrap: 'nowrap',
      background: 'rgba(10,12,16,0.85)', backdropFilter: 'blur(8px)',
      borderRadius: 999, padding: '6px 10px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.5)',
      maxWidth: 'calc(100vw - 24px)', overflowX: 'auto',
    }}>
      {CATEGORIAS.map(cat => {
        const active = filtroCategoria === cat.id
        return (
          <button
            key={cat.id}
            onClick={() => setFiltro(cat.id)}
            style={{
              padding: '4px 12px', borderRadius: 999, border: 'none', cursor: 'pointer',
              fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap', transition: 'all 0.15s',
              background: active ? cat.color : 'transparent',
              color: active ? '#fff' : '#9CA3AF',
              outline: active ? `2px solid ${cat.color}40` : 'none',
            }}
          >
            {cat.label}
          </button>
        )
      })}
    </div>
  )
}
