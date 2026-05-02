import { BrowserRouter, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/auth.store'
import { getSession, onAuthStateChange } from '@/services/supabase.auth'
import { ciudadanoRoutes } from './ciudadano.routes'
import LandingPage from '@/app/LandingPage'

const DESKTOP_BREAKPOINT = 768

export function AppRouter() {
  const { setSession, setLoading } = useAuthStore()
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth > DESKTOP_BREAKPOINT)

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT + 1}px)`)
    const handler = e => setIsDesktop(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

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

  if (isDesktop) return <LandingPage />

  return (
    <BrowserRouter>
      <Routes>
        {ciudadanoRoutes()}
      </Routes>
    </BrowserRouter>
  )
}
