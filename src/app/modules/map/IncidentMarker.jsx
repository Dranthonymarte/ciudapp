import { Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

const COLORS = {
  agua: '#3B82F6',
  luz: '#F59E0B',
  basura: '#10B981',
  vialidad: '#EF4444',
  seguridad: '#8B5CF6',
  default: '#6B7280',
}

function makeIcon(color) {
  return L.divIcon({
    className: '',
    html: `<div style="
      width:14px;height:14px;border-radius:50%;
      background:${color};border:2px solid #fff;
      box-shadow:0 0 6px ${color}88;
    "></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  })
}

export default function IncidentMarker({ reporte }) {
  const color = COLORS[reporte.categoria] ?? COLORS.default
  return (
    <Marker position={[reporte.lat, reporte.lng]} icon={makeIcon(color)}>
      <Popup>
        <strong>{reporte.titulo}</strong><br />
        <span style={{ fontSize: 12, color: '#6B7280' }}>{reporte.categoria}</span>
      </Popup>
    </Marker>
  )
}
