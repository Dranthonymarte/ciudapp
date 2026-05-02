import { supabase } from '@/services/supabase.client'

const COLS = 'id, titulo, descripcion, estado, lat, lng, foto_url, created_at, categoria_id, categoria'

export async function fetchFeed({ limit = 30, offset = 0 } = {}) {
  const { data, error } = await supabase
    .from('reportes')
    .select(COLS)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)
  if (error) throw error
  return data ?? []
}
