import 'leaflet/dist/leaflet.css'
import { MapContainer } from 'react-leaflet'
import MapLayer from './MapLayer'
import IncidentMarker from './IncidentMarker'

const CARACAS = [10.4806, -66.9036]

const MOCK_REPORTES = [
  { id: 1, titulo: 'Tubería rota', categoria: 'agua', lat: 10.4891, lng: -66.8775 },
  { id: 2, titulo: 'Apagón sector norte', categoria: 'luz', lat: 10.4750, lng: -66.9200 },
  { id: 3, titulo: 'Basura sin recoger', categoria: 'basura', lat: 10.4820, lng: -66.9100 },
  { id: 4, titulo: 'Hueco en avenida', categoria: 'vialidad', lat: 10.4680, lng: -66.8950 },
  { id: 5, titulo: 'Alumbrado dañado', categoria: 'luz', lat: 10.4930, lng: -66.8850 },
  { id: 6, titulo: 'Fuga de agua', categoria: 'agua', lat: 10.4760, lng: -66.9050 },
  { id: 7, titulo: 'Semáforo roto', categoria: 'vialidad', lat: 10.4710, lng: -66.9150 },
  { id: 8, titulo: 'Robo en parque', categoria: 'seguridad', lat: 10.4840, lng: -66.8900 },
  { id: 9, titulo: 'Contenedor lleno', categoria: 'basura', lat: 10.4790, lng: -66.9000 },
  { id: 10, titulo: 'Cable caído', categoria: 'luz', lat: 10.4870, lng: -66.9080 },
]

export default function MapScreen() {
  return (
    <div style={{ width: '100%', height: '100dvh', background: '#0A0C10' }}>
      <MapContainer
        center={CARACAS}
        zoom={13}
        style={{ width: '100%', height: '100%' }}
        zoomControl={false}
      >
        <MapLayer />
        {MOCK_REPORTES.map(r => <IncidentMarker key={r.id} reporte={r} />)}
      </MapContainer>
    </div>
  )
}
