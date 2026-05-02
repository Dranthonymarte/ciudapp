import { CATEGORIAS, useMapStore } from '@/store/map.store'

export default function MapFilters() {
  const { filtroCategoria, setFiltro } = useMapStore()

  return (
    <div className="map-filters" style={{
      display: 'flex', gap: 6, flexShrink: 0,
      overflowX: 'auto', scrollbarWidth: 'none',
      padding: '8px 16px',
      background: '#0A0C10',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      <style>{`
        .map-filters::-webkit-scrollbar { display: none; }
      `}</style>
      {CATEGORIAS.map(cat => {
        const active = filtroCategoria === cat.id
        return (
          <button
            key={cat.id}
            onClick={() => setFiltro(cat.id)}
            style={{
              padding: '6px 14px', borderRadius: 999, flexShrink: 0,
              border: active ? 'none' : '1px solid rgba(255,255,255,0.12)',
              cursor: 'pointer', fontSize: 12, fontWeight: 600,
              whiteSpace: 'nowrap', transition: 'background 0.15s, color 0.15s',
              background: active ? cat.color : 'transparent',
              color: active ? '#fff' : '#8B95A5',
              minHeight: 32,
            }}
          >
            {cat.label}
          </button>
        )
      })}
    </div>
  )
}
