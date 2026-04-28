import { BrowserRouter, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthStore } from '@/store/auth.store'
import { getSession, onAuthStateChange } from '@/services/supabase.auth'
import { ciudadanoRoutes } from './ciudadano.routes'

export function AppRouter() {
  const { setSession, setLoading } = useAuthStore()

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

  return (
    <BrowserRouter>
      <Routes>
        {ciudadanoRoutes()}
      </Routes>
    </BrowserRouter>
  )
}
