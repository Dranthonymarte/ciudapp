import { supabase } from '@/services/supabase.client'

const BUCKET = 'reportes-fotos'

export async function subirFotoReporte(file) {
  const ext  = file.name.split('.').pop() || 'jpg'
  const path = `public/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, { upsert: false })
  if (error) throw error
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl
}
