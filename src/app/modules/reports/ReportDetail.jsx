import { useEffect, useState } from 'react'
import { reverseGeocode } from '@/utils/geo.utils'
import { obtenerReportePorId } from './reports.service'
import ReportChat from './ReportChat'

const COLORS = {
  agua: '#3B82F6', luz: '#F59E0B', basura: '#10B981',
  vialidad: '#EF4444', seguridad: '#8B5CF6', gas: '#F97316',
  salud: '#EC4899', transporte: '#06B6D4', default: '#6B7280',
}
const EMOJI = {
  agua: '💧', luz: '💡', basura: '🗑️', vialidad: '🚧',
  seguridad: '🚨', gas: '🔥', salud: '🏥', transporte: '🚌', default: '📍',
}
const ESTADO = {
  nuevo:      { label: 'Nuevo',      color: '#3B82F6' },
  en_proceso: { label: 'En proceso', color: '#F59E0B' },
  resuelto:   { label: 'Resuelto',   color: '#10B981' },
  rechazado:  { label: 'Rechazado',  color: '#EF4444' },
}

function miniMapUrl(lat, lng) {
  return `https://staticmap.openstreetmap.de/staticmap.php?center=${lat},${lng}&zoom=15&size=400x180&markers=${lat},${lng},red`
}

function formatFecha(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('es-VE', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function ReportDetail({ reporte, onClose }) {
  const [full,      setFull]      = useState(null)
  const [direccion, setDireccion] = useState(null)

  useEffect(() => {
    if (!reporte) { setFull(null); setDireccion(null); return }
    obtenerReportePorId(reporte.id).then(setFull)
    reverseGeocode(reporte.lat, reporte.lng).then(setDireccion)
  }, [reporte?.id])

  if (!reporte) return null

  const data  = full ?? reporte
  const cat   = data.categoria_id
  const color = COLORS[cat] ?? COLORS.default
  const est   = ESTADO[data.estado] ?? { label: data.estado, color: '#6B7280' }

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{ position: 'absolute', inset: 0, zIndex: 999, background: 'rgba(0,0,0,0.45)' }}
      />

      {/* Sheet */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 1000,
        background: '#111318', borderRadius: '16px 16px 0 0',
        maxHeight: '78vh', overflowY: 'auto',
        paddingBottom: 'calc(env(safe-area-inset-bottom) + 80px)',
      }}>
        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 8px' }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.12)' }} />
        </div>

        {/* Mini mapa */}
        <div style={{ margin: '0 16px 14px', borderRadius: 12, overflow: 'hidden', height: 140, background: '#0A0C10' }}>
          <img
            src={miniMapUrl(reporte.lat, reporte.lng)}
            alt="ubicación"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={e => { e.target.style.display = 'none' }}
          />
        </div>

        <div style={{ padding: '0 16px' }}>
          {/* Categoría + Estado */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{
              background: `${color}1A`, border: `1px solid ${color}44`,
              borderRadius: 999, padding: '4px 10px',
              color, fontSize: 12, fontWeight: 600,
            }}>
              {EMOJI[cat] ?? EMOJI.default} {cat}
            </span>
            <span style={{
              background: `${est.color}1A`, borderRadius: 999, padding: '4px 10px',
              color: est.color, fontSize: 12, fontWeight: 600,
            }}>
              {est.label}
            </span>
          </div>

          {/* Título */}
          <h2 style={{ color: '#F0F2F5', fontSize: 17, fontWeight: 700, margin: '0 0 8px', lineHeight: 1.3 }}>
            {data.titulo}
          </h2>

          {/* Dirección */}
          {direccion && (
            <p style={{ color: '#6B7280', fontSize: 13, margin: '0 0 10px', display: 'flex', gap: 5, alignItems: 'flex-start' }}>
              <span>📍</span><span>{direccion}</span>
            </p>
          )}

          {/* Descripción */}
          {data.descripcion && (
            <p style={{ color: '#9CA3AF', fontSize: 14, lineHeight: 1.55, margin: '0 0 14px' }}>
              {data.descripcion}
            </p>
          )}

          {/* Foto */}
          {data.foto_url && (
            <div style={{ borderRadius: 12, overflow: 'hidden', marginBottom: 14, height: 180 }}>
              <img src={data.foto_url} alt="foto" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}

          {/* Autor */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 12px', borderRadius: 10,
            background: 'rgba(255,255,255,0.04)',
            marginBottom: 20,
          }}>
            <div style={{
              width: 34, height: 34, borderRadius: '50%',
              background: `${color}22`, border: `1px solid ${color}44`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15,
            }}>
              👤
            </div>
            <div>
              <div style={{ color: '#6B7280', fontSize: 11 }}>Reportado el</div>
              <div style={{ color: '#D1D5DB', fontSize: 13, fontWeight: 500 }}>{formatFecha(data.created_at)}</div>
            </div>
          </div>
        </div>

        {/* Divisor chat */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', margin: '0 16px 4px' }} />

        {/* Chat bidireccional */}
        <ReportChat reporteId={data.id} />
      </div>
    </>
  )
}
