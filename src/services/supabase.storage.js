import { supabase } from '@/services/supabase.client'

const BUCKET        = 'reportes-fotos'
const MAX_SIZE      = 5 * 1024 * 1024                              // 5 MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export async function subirFotoReporte(file) {
  if (file.size > MAX_SIZE)
    throw new Error('La imagen no puede superar 5 MB')
  if (!ALLOWED_TYPES.includes(file.type))
    throw new Error('Solo se permiten imágenes JPEG, PNG o WebP')

  const ext  = file.name.split('.').pop() || 'jpg'
  const path = `public/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, { upsert: false })
  if (error) throw error
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl
}
