import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  user:    null,
  session: null,
  loading: true,
  error:   null,

  setSession: (session) => set({ session, user: session?.user ?? null }),
  setLoading:  (loading) => set({ loading }),
  setError:    (error)   => set({ error }),
  clear:       ()        => set({ user: null, session: null, error: null }),
}))
