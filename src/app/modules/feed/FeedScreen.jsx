import { useState, useEffect, useRef, useCallback } from 'react'
import { fetchFeed } from './feed.service'
import FeedItem      from './FeedItem'
import Spinner       from '@/components/Spinner'

const THRESHOLD = 65

export default function FeedScreen() {
  const [items,      setItems]      = useState([])
  const [loading,    setLoading]    = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error,      setError]      = useState(null)
  const [pullY,      setPullY]      = useState(0)
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

  return (
    <div style={{ height: '100%', background: '#0A0C10', display: 'flex', flexDirection: 'column' }}>
      <div style={{
        padding:        '16px 20px 12px',
        paddingTop:     'max(16px, env(safe-area-inset-top))',
        background:     '#0A0C10',
        borderBottom:   '1px solid rgba(255,255,255,0.05)',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
      }}>
        <div>
          <h1 style={{ margin: 0, color: '#F0F2F5', fontSize: 20, fontWeight: 700 }}>
            📰 Feed
          </h1>
          <span style={{ color: '#8B95A5', fontSize: 12 }}>
            {items.length > 0 ? `${items.length} reportes` : 'Reportes recientes'}
          </span>
        </div>
        {refreshing && <Spinner size={22} />}
      </div>

      {pullY > 0 && (
        <div style={{
          height:         pullY,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          overflow:       'hidden',
        }}>
          <Spinner size={20} color={pullY >= THRESHOLD * 0.85 ? '#3B82F6' : '#4B5563'} />
        </div>
      )}

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
          <div style={{ textAlign: 'center', padding: '48px 20px', color: '#EF4444' }}>
            <p style={{ margin: '0 0 14px', fontSize: 14 }}>Error cargando reportes</p>
            <button
              onClick={() => { setLoading(true); load().finally(() => setLoading(false)) }}
              style={{
                background: 'transparent', border: '1px solid #EF4444',
                color: '#EF4444', borderRadius: 8, padding: '8px 18px',
                cursor: 'pointer', fontSize: 13,
              }}
            >
              Reintentar
            </button>
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#4B5563' }}>
            <div style={{ fontSize: 44, marginBottom: 12 }}>📭</div>
            <p style={{ margin: 0, fontSize: 14 }}>Sin reportes aún</p>
          </div>
        )}

        {!loading && !error && items.map(r => (
          <FeedItem key={r.id} report={r} />
        ))}
      </div>
    </div>
  )
}
