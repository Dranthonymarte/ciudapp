import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { fetchFeed } from './feed.service'
import FeedItem    from './FeedItem'
import FeedFilter  from './FeedFilter'
import Spinner     from '@/components/Spinner'

const THRESHOLD = 65

export default function FeedScreen() {
  const [items,      setItems]      = useState([])
  const [loading,    setLoading]    = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error,      setError]      = useState(null)
  const [pullY,      setPullY]      = useState(0)
  const [catActiva,  setCatActiva]  = useState('todas')
  const [estadoActivo, setEstado]   = useState('todos')

  const scrollRef = useRef(null)
  const startY    = useRef(0)

  const load = useCallback(async () => {
    try {
      const data = await fetchFeed()
      setItems(data)
      setError(null)
    } catch (e) {
      setError(e.message)
    }
  }, [])

  useEffect(() => {
    load().finally(() => setLoading(false))
  }, [load])

  const filtrados = useMemo(() => {
    return items
      .filter(r => {
        if (catActiva === 'todas') return true
        return (r.categoria ?? r.categoria_id) === catActiva
      })
      .filter(r => estadoActivo === 'todos' || r.estado === estadoActivo)
  }, [items, catActiva, estadoActivo])

  const hayFiltroActivo = catActiva !== 'todas' || estadoActivo !== 'todos'

  function onTouchStart(e) {
    startY.current = e.touches[0].clientY
  }

  function onTouchMove(e) {
    if ((scrollRef.current?.scrollTop ?? 0) > 0) return
    const delta = e.touches[0].clientY - startY.current
    if (delta <= 0) return
    e.preventDefault()
    setPullY(Math.min(delta * 0.45, THRESHOLD))
  }

  async function onTouchEnd() {
    if (pullY >= THRESHOLD * 0.85) {
      setRefreshing(true)
      await load()
      setRefreshing(false)
    }
    setPullY(0)
  }

  const count = loading ? null : filtrados.length

  return (
    <div style={{ height: '100%', background: '#0A0C10', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <div style={{
        padding:        '14px 20px 10px',
        paddingTop:     'max(14px, env(safe-area-inset-top))',
        background:     '#0A0C10',
        borderBottom:   '1px solid rgba(255,255,255,0.06)',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        flexShrink:     0,
      }}>
        <div>
          <h1 style={{ margin: 0, color: '#F0F2F5', fontSize: 20, fontWeight: 700, lineHeight: 1.2 }}>
            Feed
          </h1>
          <span style={{ color: '#8B95A5', fontSize: 12 }}>
            {count !== null
              ? `${count} reporte${count !== 1 ? 's' : ''}${hayFiltroActivo ? ' filtrados' : ''}`
              : 'Cargando…'}
          </span>
        </div>
        {refreshing && <Spinner size={22} />}
      </div>

      {/* Filters */}
      <FeedFilter
        catActiva={catActiva}
        estadoActivo={estadoActivo}
        onCat={setCatActiva}
        onEstado={setEstado}
      />

      {/* Pull indicator */}
      {pullY > 0 && (
        <div style={{
          height:         pullY,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          overflow:       'hidden',
          flexShrink:     0,
        }}>
          <Spinner size={20} color={pullY >= THRESHOLD * 0.85 ? '#3B82F6' : '#4B5563'} />
        </div>
      )}

      {/* List */}
      <div
        ref={scrollRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ flex: 1, overflowY: 'auto', padding: '12px 16px', paddingBottom: 90 }}
      >
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 48 }}>
            <Spinner size={36} />
          </div>
        )}

        {!loading && error && (
          <div style={{ textAlign: 'center', padding: '48px 20px' }}>
            <p style={{ margin: '0 0 14px', fontSize: 14, color: '#EF4444' }}>
              Error cargando reportes
            </p>
            <button
              onClick={() => { setLoading(true); load().finally(() => setLoading(false)) }}
              style={{
                background:   'transparent',
                border:       '1px solid #EF4444',
                color:        '#EF4444',
                borderRadius: 8,
                padding:      '8px 18px',
                cursor:       'pointer',
                fontSize:     13,
              }}
            >
              Reintentar
            </button>
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#4B5563' }}>
            <div style={{ fontSize: 44, marginBottom: 12 }}>📭</div>
            <p style={{ margin: '0 0 6px', fontSize: 14, color: '#8B95A5' }}>Sin reportes aún</p>
            <p style={{ margin: 0, fontSize: 12, color: '#4B5563' }}>Sé el primero en reportar</p>
          </div>
        )}

        {!loading && !error && items.length > 0 && filtrados.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 20px', color: '#4B5563' }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🔍</div>
            <p style={{ margin: '0 0 12px', fontSize: 14, color: '#8B95A5' }}>
              Sin reportes para este filtro
            </p>
            <button
              onClick={() => { setCatActiva('todas'); setEstado('todos') }}
              style={{
                background:   'transparent',
                border:       '1px solid rgba(255,255,255,0.16)',
                color:        '#8B95A5',
                borderRadius: 999,
                padding:      '8px 18px',
                cursor:       'pointer',
                fontSize:     13,
                fontWeight:   600,
              }}
            >
              Limpiar filtros
            </button>
          </div>
        )}

        {!loading && !error && filtrados.map(r => (
          <FeedItem key={r.id} report={r} />
        ))}
      </div>
    </div>
  )
}
