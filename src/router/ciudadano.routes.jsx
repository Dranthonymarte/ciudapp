import { Route }         from 'react-router-dom'
import MapScreen         from '@/app/modules/map/MapScreen'
import FeedScreen        from '@/app/modules/feed/FeedScreen'
import ProfileScreen     from '@/app/modules/profile/ProfileScreen'
import LoginScreen       from '@/app/modules/auth/LoginScreen'
import RegisterScreen    from '@/app/modules/auth/RegisterScreen'
import ForgotPassword    from '@/app/modules/auth/ForgotPassword'
import AuthGuard         from '@/app/modules/auth/AuthGuard'
import AuthLayout        from '@/components/AuthLayout'

function Guarded({ children }) {
  return (
    <AuthGuard>
      <AuthLayout>{children}</AuthLayout>
    </AuthGuard>
  )
}

export function ciudadanoRoutes() {
  return (
    <>
      <Route path="/login"           element={<LoginScreen />} />
      <Route path="/register"        element={<RegisterScreen />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/feed"            element={<Guarded><FeedScreen /></Guarded>} />
      <Route path="/perfil"          element={<Guarded><ProfileScreen /></Guarded>} />
      <Route path="/*"               element={<Guarded><MapScreen /></Guarded>} />
    </>
  )
}
