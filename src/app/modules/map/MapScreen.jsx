import 'leaflet/dist/leaflet.css'
import { MapContainer, useMap } from 'react-leaflet'
import { useEffect, useState } from 'react'
import L from 'leaflet'
import MapLayer from './MapLayer'
import IncidentMarker from './IncidentMarker'
import MapFilters from './MapFilters'
import { useLocation } from '@/hooks/useLocation'
import { useMapStore } from '@/store/map.store'
import { supabase } from '@/services/supabase.client'

const CARACAS = [10.4806, -66.9036]

const USER_ICON = L.divIcon({
  className: '',
  html: `<div style="
    width:16px;height:16px;border-radius:50%;
    background:#3B82F6;border:3px solid #fff;
    box-shadow:0 0 0 4px rgba(59,130,246,0.35);
  "></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
})

function UserMarker({ lat, lng }) {
  const map = useMap()
  useEffect(() => {
    const marker = L.marker([lat, lng], { icon: USER_ICON, zIndexOffset: 1000 })
      .addTo(map)
      .bindTooltip('Estás aquí', { permanent: false, direction: 'top' })
    map.setView([lat, lng], map.getZoom(), { animate: true })
    return () => marker.remove()
  }, [lat, lng, map])
  return null
}

export default function MapScreen() {
  const { lat, lng } = useLocation()
  const { filtroCategoria } = useMapStore()
  const [reportes, setReportes] = useState([])

  useEffect(() => {
    async function cargar() {
      const query = supabase
        .from('reportes')
        .select('id, titulo, categoria_id, lat, lng, estado')
      if (filtroCategoria !== 'todas') query.eq('categoria_id', filtroCategoria)
      const { data } = await query
      setReportes(data ?? [])
    }
    cargar()
  }, [filtroCategoria])

  return (
    <div style={{ width: '100%', height: '100dvh', background: '#0A0C10', position: 'relative' }}>
      <MapFilters />
      <MapContainer
        center={CARACAS}
        zoom={13}
        style={{ width: '100%', height: '100%' }}
        zoomControl={false}
      >
        <MapLayer />
        {lat && lng && <UserMarker lat={lat} lng={lng} />}
        {reportes.map(r => (
          <IncidentMarker key={r.id} reporte={{ ...r, categoria: r.categoria_id }} />
        ))}
      </MapContainer>
    </div>
  )
}
