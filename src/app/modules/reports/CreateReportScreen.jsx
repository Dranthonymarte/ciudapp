import { useState, useEffect } from 'react'
import { useUiStore } from '@/store/ui.store'
import { useLocation } from '@/hooks/useLocation'
import { useReportsStore } from '@/store/reports.store'
import ReportCategories from './ReportCategories'
import PhotoUpload from './PhotoUpload'
import { crearReporte } from './reports.service'
import { subirFotoReporte } from '@/services/supabase.storage'
import { reverseGeocode } from '@/utils/geo.utils'

const PASO = { CAT: 0, DETALLE: 1, CONFIRMAR: 2 }

const TITULOS = ['Selecciona categoría', 'Detalles', 'Confirmar envío']

export default function CreateReportScreen() {
  const { reportarOpen, closeReportar } = useUiStore()
  const { lat, lng } = useLocation()
  const { addReporte } = useReportsStore()

  const [paso,        setPaso]       = useState(PASO.CAT)
  const [categoria,   setCategoria]  = useState(null)
  const [foto,        setFoto]       = useState(null)
  const [descripcion, setDescripcion]= useState('')
  const [enviando,    setEnviando]   = useState(false)
  const [error,       setError]      = useState(null)
  const [direccion,   setDireccion]  = useState('')

  useEffect(() => {
    if (lat && lng) reverseGeocode(lat, lng).then(setDireccion)
  }, [lat, lng])

  function reset() {
    setPaso(PASO.CAT); setCategoria(null)
    setFoto(null); setDescripcion(''); setError(null)
  }

  function cerrar() { reset(); closeReportar() }

  function atras() {
    if (paso === PASO.CAT) cerrar()
    else setPaso(p => p - 1)
  }

  async function enviar() {
    if (!categoria || !lat || !lng) return
    setEnviando(true); setError(null)
    try {
      const foto_url = foto ? await subirFotoReporte(foto) : null
      const reporte  = await crearReporte({
        categoria_id: categoria.id,
        titulo:       `${categoria.emoji} ${categoria.label} reportado`,
        descripcion:  descripcion.trim() || null,
        lat, lng, foto_url,
      })
      addReporte(reporte)
      cerrar()
    } catch (e) {
      setError(e.message)
    } finally {
      setEnviando(false)
    }
  }

  if (!reportarOpen) return null

  const pct = `${((paso + 1) / 3) * 100}%`

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1001,
      background: '#0A0C10',
      display: 'flex', flexDirection: 'column',
      animation: 'slideUp 0.28s cubic-bezier(0.34,1.56,0.64,1)',
    }}>
      {/* Header */}
      <div style={{
        padding: '52px 20px 14px',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <button onClick={atras} style={btnCircle}>←</button>
        <div style={{ flex: 1 }}>
          <div style={{ color: '#F0F2F5', fontWeight: 700, fontSize: 17 }}>
            {TITULOS[paso]}
          </div>
          <div style={{ color: '#8B95A5', fontSize: 11 }}>Paso {paso + 1} de 3</div>
        </div>
        <button onClick={cerrar} style={{ ...btnCircle, fontSize: 20, background: 'transparent', border: 'none' }}>
          ×
        </button>
      </div>

      {/* Progress */}
      <div style={{ height: 2, background: '#1A1D24', margin: '0 20px 4px' }}>
        <div style={{ height: '100%', background: '#3B82F6', width: pct, transition: 'width 0.3s' }} />
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 20px 8px' }}>

        {paso === PASO.CAT && (
          <ReportCategories
            selected={categoria?.id}
            onSelect={cat => { setCategoria(cat); setPaso(PASO.DETALLE) }}
          />
        )}

        {paso === PASO.DETALLE && categoria && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{
              background: `${categoria.color}18`,
              border: `1px solid ${categoria.color}44`,
              borderRadius: 12, padding: '12px 16px',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ fontSize: 22 }}>{categoria.emoji}</span>
              <div>
                <div style={{ color: '#F0F2F5', fontWeight: 600, fontSize: 14 }}>{categoria.label}</div>
                <div style={{ color: '#8B95A5', fontSize: 11 }}>{categoria.desc}</div>
              </div>
            </div>

            <PhotoUpload onPhoto={setFoto} />

            <textarea
              placeholder="Describe el problema (opcional)…"
              value={descripcion}
              onChange={e => setDescripcion(e.target.value)}
              maxLength={300}
              style={{
                background: '#1A1D24', border: '1px solid rgba(255,255,255,0.10)',
                borderRadius: 12, padding: '14px', color: '#F0F2F5',
                fontSize: 14, resize: 'none', height: 90,
                fontFamily: 'inherit', outline: 'none',
              }}
            />
          </div>
        )}

        {paso === PASO.CONFIRMAR && categoria && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ background: '#1A1D24', borderRadius: 16, padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: descripcion ? 14 : 0 }}>
                <span style={{ fontSize: 28 }}>{categoria.emoji}</span>
                <div>
                  <div style={{ color: '#F0F2F5', fontWeight: 700, fontSize: 16 }}>{categoria.label}</div>
                  <div style={{ color: '#8B95A5', fontSize: 12 }}>Categoría seleccionada</div>
                </div>
              </div>
              {descripcion ? (
                <div style={{
                  color: '#8B95A5', fontSize: 13,
                  borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 12,
                }}>{descripcion}</div>
              ) : null}
            </div>

            <div style={{
              background: '#1A1D24', borderRadius: 12, padding: '12px 16px',
              display: 'flex', gap: 10, alignItems: 'center',
            }}>
              <span>📍</span>
              <div>
                <div style={{ color: '#F0F2F5', fontSize: 13, fontWeight: 600 }}>Ubicación GPS</div>
                <div style={{ color: '#8B95A5', fontSize: 11 }}>
                  {direccion || (lat && lng ? `${lat.toFixed(4)}, ${lng.toFixed(4)}` : 'Obteniendo ubicación...')}
                </div>
              </div>
            </div>

            {foto && (
              <div style={{ background: '#1A1D24', borderRadius: 12, padding: 12 }}>
                <div style={{ color: '#8B95A5', fontSize: 11, marginBottom: 8 }}>Foto adjunta ✓</div>
                <img
                  src={URL.createObjectURL(foto)}
                  alt="preview"
                  style={{ width: '100%', borderRadius: 8, maxHeight: 160, objectFit: 'cover' }}
                />
              </div>
            )}

            {error && (
              <div style={{ color: '#EF4444', fontSize: 13, textAlign: 'center', padding: '8px 0' }}>
                {error}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer CTA */}
      {paso > PASO.CAT && (
        <div style={{
          padding: '14px 20px',
          paddingBottom: 'calc(14px + env(safe-area-inset-bottom))',
        }}>
          <button
            onClick={paso === PASO.DETALLE ? () => setPaso(PASO.CONFIRMAR) : enviar}
            disabled={enviando || (paso === PASO.CONFIRMAR && (!lat || !lng))}
            style={{
              width: '100%', padding: '16px', borderRadius: 14, border: 'none',
              background: '#3B82F6', color: '#fff',
              fontSize: 16, fontWeight: 700, cursor: 'pointer',
              opacity: (enviando || (paso === PASO.CONFIRMAR && (!lat || !lng))) ? 0.55 : 1,
              transition: 'opacity 0.2s',
            }}
          >
            {paso === PASO.DETALLE
              ? 'Continuar →'
              : enviando ? 'Enviando...' : '✅ Enviar reporte'}
          </button>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
    </div>
  )
}

const btnCircle = {
  background: '#1A1D24', border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '50%', width: 36, height: 36,
  color: '#F0F2F5', cursor: 'pointer', fontSize: 17,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
}
