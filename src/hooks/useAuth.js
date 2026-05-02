// Suscripción y setup de sesión viven en AppRouter.
// Este hook solo lee del store — una sola fuente de verdad.
import { useAuthStore } from '@/store/auth.store'

export function useAuth() {
  const { user, session, loading, error } = useAuthStore()
  return { user, session, loading, error }
}
