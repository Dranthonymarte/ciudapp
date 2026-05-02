import { useEffect, useRef } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'

const USER_ICON = L.divIcon({
  className: '',
  html: `<div style="
    width:16px;height:16px;border-radius:50%;
    background:#3B82F6;border:3px solid #fff;
    box-shadow:0 0 0 4px rgba(59,130,246,0.35);
  "></div>`,
  iconSize:   [16, 16],
  iconAnchor: [8, 8],
})

export default function UserMarker({ lat, lng }) {
  const map      = useMap()
  const centrado = useRef(false)

  useEffect(() => {
    const marker = L.marker([lat, lng], { icon: USER_ICON, zIndexOffset: 1000 })
      .addTo(map)
      .bindTooltip('Estás aquí', { permanent: false, direction: 'top' })
    if (!centrado.current) {
      map.setView([lat, lng], 14, { animate: true })
      centrado.current = true
    }
    return () => marker.remove()
  }, [lat, lng, map])

  return null
}
