import { TileLayer } from 'react-leaflet'

const CARTO_URL  = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
const CARTO_ATTR = '&copy; <a href="https://carto.com">CARTO</a>'

export default function MapLayer() {
  return <TileLayer url={CARTO_URL} attribution={CARTO_ATTR} maxZoom={20} />
}
