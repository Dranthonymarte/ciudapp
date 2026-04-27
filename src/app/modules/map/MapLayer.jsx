import { TileLayer } from 'react-leaflet'

const OSM_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const OSM_ATTR = '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'

export default function MapLayer() {
  return <TileLayer url={OSM_URL} attribution={OSM_ATTR} maxZoom={19} />
}
