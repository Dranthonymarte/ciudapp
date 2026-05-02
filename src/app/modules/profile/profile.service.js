import { supabase } from '@/services/supabase.client'

const COLS = 'id, titulo, descripcion, estado, lat, lng, foto_url, created_at, categoria_id, categoria'

export async function fetchMyReports(userId) {
  const { data, error } = await supabase
    .from('reportes')
    .select(COLS)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data ?? []
}
