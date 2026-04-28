import { useState, useEffect } from 'react'
import { watchPosition } from '@/services/maps.service'

export function useLocation() {
  const [state, setState] = useState({ lat: null, lng: null, accuracy: null, loading: true, error: null })

  useEffect(() => {
    const unwatch = watchPosition(
      pos => setState({ ...pos, loading: false, error: null }),
      err => setState(s => ({ ...s, loading: false, error: err.message })),
    )
    return unwatch
  }, [])

  return state
}
