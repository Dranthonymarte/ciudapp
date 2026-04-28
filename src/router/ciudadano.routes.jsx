import { Route } from 'react-router-dom'
import MapScreen        from '@/app/modules/map/MapScreen'
import LoginScreen      from '@/app/modules/auth/LoginScreen'
import RegisterScreen   from '@/app/modules/auth/RegisterScreen'
import ForgotPassword   from '@/app/modules/auth/ForgotPassword'
import AuthGuard        from '@/app/modules/auth/AuthGuard'

export function ciudadanoRoutes() {
  return (
    <>
      <Route path="/login"           element={<LoginScreen />} />
      <Route path="/register"        element={<RegisterScreen />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/*" element={
        <AuthGuard>
          <MapScreen />
        </AuthGuard>
      } />
    </>
  )
}
