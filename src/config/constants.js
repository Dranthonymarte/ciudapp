export const APP_NAME    = import.meta.env.VITE_APP_NAME    ?? 'CiudApp'
export const APP_VERSION = import.meta.env.VITE_APP_VERSION ?? '0.1.0'
export const SUPABASE_URL      = import.meta.env.VITE_SUPABASE_URL
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

export const MAP_CENTER_VE   = { lat: 10.4806, lng: -66.9036 } // Caracas
export const MAP_DEFAULT_ZOOM = 13
export const CHACAO_BOUNDS = {
  sw: { lat: 10.475, lng: -66.875 },
  ne: { lat: 10.510, lng: -66.840 },
}
