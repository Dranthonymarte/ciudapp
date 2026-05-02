import { useState, useEffect } from 'react'
import { fetchMyReports } from './profile.service'
import FeedItem   from '@/app/modules/feed/FeedItem'
import Spinner    from '@/components/Spinner'

export default function MyReports({ userId, onSelect }) {
  const [items,   setItems]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    if (!userId) return
    fetchMyReports(userId)
      .then(setItems)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [userId])

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '32px 0' }}>
      <Spinner size={32} />
    </div>
  )

  if (error) return (
    <div style={{ textAlign: 'center', padding: '24px 16px' }}>
      <p style={{ margin: 0, fontSize: 13, color: '#EF4444' }}>{error}</p>
    </div>
  )

  if (items.length === 0) return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      <div style={{ fontSize: 40, marginBottom: 10 }}>📭</div>
      <p style={{ margin: '0 0 4px', fontSize: 14, color: '#8B95A5', fontWeight: 600 }}>
        Aún no tienes reportes
      </p>
      <p style={{ margin: 0, fontSize: 12, color: '#4B5563' }}>
        Toca el botón ⚠️ para reportar tu primera incidencia
      </p>
    </div>
  )

  return (
    <div>
      {items.map(r => (
        <FeedItem key={r.id} report={r} onClick={() => onSelect?.(r)} />
      ))}
    </div>
  )
}
