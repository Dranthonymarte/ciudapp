import { supabase } from '@/services/supabase.client'

export async function crearReporte({ categoria_id, titulo, descripcion, lat, lng, foto_url }) {
  const { data, error } = await supabase
    .from('reportes')
    .insert([{ categoria_id, titulo, descripcion, lat, lng, foto_url, estado: 'nuevo' }])
    .select()
    .single()
  if (error) throw error
  return data
}

export async function obtenerReportes({ categoria_id } = {}) {
  let q = supabase.from('reportes').select('*').order('created_at', { ascending: false })
  if (categoria_id && categoria_id !== 'todas') q = q.eq('categoria_id', categoria_id)
  const { data, error } = await q
  if (error) throw error
  return data ?? []
}

export async function obtenerReportePorId(id) {
  const { data, error } = await supabase.from('reportes').select('*').eq('id', id).single()
  if (error) throw error
  return data
}

export async function actualizarEstado(id, estado) {
  const { error } = await supabase.from('reportes').update({ estado }).eq('id', id)
  if (error) throw error
}
