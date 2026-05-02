import 'leaflet/dist/leaflet.css'
import { MapContainer, useMap, useMapEvents, Marker, Popup } from 'react-leaflet'
import { useEffect, useState, useRef } from 'react'
import L from 'leaflet'
import MapLayer from './MapLayer'
import IncidentMarker from './IncidentMarker'
import MapFilters from './MapFilters'
import UserMarker from './UserMarker'
import { useLocation } from '@/hooks/useLocation'
import { useMapStore } from '@/store/map.store'
import { useUiStore } from '@/store/ui.store'
import { supabase } from '@/services/supabase.client'
import CreateReportScreen from '@/app/modules/reports/CreateReportScreen'
import ReportDetail from '@/app/modules/reports/ReportDetail'
import { useReportsStore } from '@/store/reports.store'
import { reverseGeocode } from '@/utils/geo.utils'

const CARACAS = [10.4806, -66.9036]

const tapIcon = L.divIcon({
  className: '',
  html: `<div style="
    width:22px;height:22px;border-radius:50%;
    background:#3B82F6;border:3px solid #fff;
    box-shadow:0 2px 8px rgba(59,130,246,0.6);
  "></div>`,
  iconSize: [22, 22],
  iconAnchor: [11, 11],
})

function MapFlyTo({ lat, lng, trigger }) {
  const map = useMap()
  useEffect(() => {
    if (trigger > 0 && lat && lng) map.flyTo([lat, lng], 15, { animate: true })
  }, [trigger]) // eslint-disable-line react-hooks/exhaustive-deps
  return null
}

function TapHandler({ onTap }) {
  useMapEvents({
    click(e) {
      // Ignore clicks that propagate from markers / popups
      if (e.originalEvent.target.closest('.leaflet-marker-icon, .leaflet-popup')) return
      onTap({ lat: e.latlng.lat, lng: e.latlng.lng })
    },
  })
  return null
}

export default function MapScreen() {
  const { lat, lng }          = useLocation()
  const { filtroCategoria }   = useMapStore()
  const { refreshTrigger }    = useReportsStore()
  const { openReportarEn }    = useUiStore()
  const [reportes,         setReportes]  = useState([])
  const [totalActivos,     setTotal]     = useState(0)
  const [flyTrigger,       setFlyTrigger]= useState(0)
  const [selectedReporte,  setSelected]  = useState(null)
  const [tapPin,           setTapPin]    = useState(null)
  const [tapDireccion,     setTapDir]    = useState(null)
  const popupRef = useRef()

  useEffect(() => {
    async function cargar() {
      let q = supabase.from('reportes').select('id, titulo, categoria_id, lat, lng, estado')
      if (filtroCategoria !== 'todas') q = q.eq('categoria_id', filtroCategoria)
      const { data } = await q
      setReportes(data ?? [])
    }
    cargar()
  }, [filtroCategoria, refreshTrigger])

  useEffect(() => {
    supabase.from('reportes').select('id', { count: 'exact', head: true })
      .then(({ count }) => setTotal(count ?? 0))
      .catch(() => {})
  }, [refreshTrigger])

  async function handleTap({ lat: tLat, lng: tLng }) {
    setSelected(null)
    setTapPin({ lat: tLat, lng: tLng })
    setTapDir(null)
    const dir = await reverseGeocode(tLat, tLng)
    setTapDir(dir)
  }

  function handleReportarAqui() {
    if (!tapPin) return
    openReportarEn({ lat: tapPin.lat, lng: tapPin.lng })
    setTapPin(null)
    setTapDir(null)
  }

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#0A0C10' }}>

      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: 'calc(env(safe-area-inset-top) + 12px) 16px 12px',
        background: '#0A0C10', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 20 }}>⚠️</span>
          <span style={{ color: '#F0F2F5', fontWeight: 700, fontSize: 18 }}>CiudApp</span>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'rgba(59,130,246,0.10)', border: '1px solid rgba(59,130,246,0.22)',
          borderRadius: 999, padding: '5px 11px',
        }}>
          <div style={{
            width: 7, height: 7, borderRadius: '50%', background: '#3B82F6',
            animation: 'livePulse 2s ease-in-out infinite',
          }} />
          <span style={{ color: '#3B82F6', fontSize: 12, fontWeight: 600 }}>
            LIVE {totalActivos}
          </span>
        </div>
      </div>

      <MapFilters />

      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <MapContainer
          center={CARACAS}
          zoom={13}
          style={{ width: '100%', height: '100%' }}
          zoomControl={false}
        >
          <MapLayer />
          <TapHandler onTap={handleTap} />
          {lat && lng && <UserMarker lat={lat} lng={lng} />}
          <MapFlyTo lat={lat} lng={lng} trigger={flyTrigger} />
          {reportes.map(r => (
            <IncidentMarker
              key={r.id}
              reporte={{ ...r, categoria: r.categoria_id }}
              onSelect={r => { setTapPin(null); setSelected(r) }}
            />
          ))}

          {tapPin && (
            <Marker position={[tapPin.lat, tapPin.lng]} icon={tapIcon} ref={popupRef}>
              <Popup autoPan={false} closeButton={false} className="tap-popup">
                <div style={{
                  minWidth: 180, padding: '2px 0',
                  fontFamily: 'system-ui, sans-serif',
                }}>
                  <div style={{ fontSize: 11, color: '#6B7280', marginBottom: 6 }}>
                    {tapDireccion ?? 'Obteniendo dirección…'}
                  </div>
                  <button
                    onClick={handleReportarAqui}
                    style={{
                      width: '100%', padding: '8px 0', borderRadius: 8, border: 'none',
                      background: '#3B82F6', color: '#fff',
                      fontSize: 13, fontWeight: 700, cursor: 'pointer',
                    }}
                  >
                    📍 Reportar aquí
                  </button>
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>

        {/* Geoloc FAB */}
        <button
          onClick={() => setFlyTrigger(t => t + 1)}
          disabled={!lat || !lng}
          style={{
            position: 'absolute',
            bottom: 'calc(env(safe-area-inset-bottom) + 80px)',
            right: 16, zIndex: 800,
            width: 44, height: 44, borderRadius: '50%',
            background: '#111318', border: '1px solid rgba(255,255,255,0.12)',
            color: lat && lng ? '#3B82F6' : '#4B5563',
            fontSize: 18, cursor: lat && lng ? 'pointer' : 'default',
            boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >📍</button>
      </div>

      <CreateReportScreen />
      <ReportDetail reporte={selectedReporte} onClose={() => setSelected(null)} />

      <style>{`
        @keyframes livePulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(59,130,246,0.4); }
          50%       { opacity: 0.7; box-shadow: 0 0 0 4px rgba(59,130,246,0); }
        }
        .leaflet-control-attribution { display: none !important; }
        .tap-popup .leaflet-popup-content-wrapper {
          background: #1A1D24;
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 10px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.5);
        }
        .tap-popup .leaflet-popup-tip { background: #1A1D24; }
        .tap-popup .leaflet-popup-content { margin: 10px 12px; }
      `}</style>
    </div>
  )
}
