import { useEffect } from 'react'
import { useAuthStore } from '@/store/auth.store'
import { getSession, onAuthStateChange } from '@/services/supabase.auth'

export function useAuth() {
  const { user, session, loading, error, setSession, setLoading } = useAuthStore()

  useEffect(() => {
    getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })

    const { data: { subscription } } = onAuthStateChange((_event, session) => {
      setSession(session)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  return { user, session, loading, error }
}
