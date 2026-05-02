import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/services/supabase.client'
import { useAuthStore } from '@/store/auth.store'

export default function ReportChat({ reporteId }) {
  const { user } = useAuthStore()
  const [mensajes, setMensajes] = useState([])
  const [texto,    setTexto]    = useState('')
  const [enviando, setEnviando] = useState(false)
  const [rolUsuario, setRol]   = useState('ciudadano')
  const bottomRef = useRef()

  // Cargar rol del usuario actual
  useEffect(() => {
    if (!user) return
    supabase.from('usuarios').select('rol').eq('id', user.id).single()
      .then(({ data }) => { if (data?.rol) setRol(data.rol) })
  }, [user])

  // Cargar historial
  useEffect(() => {
    if (!reporteId) return
    supabase.from('mensajes_reporte')
      .select('id, user_id, rol, contenido, created_at, usuarios(nombre, apellido)')
      .eq('reporte_id', reporteId)
      .order('created_at', { ascending: true })
      .then(({ data }) => setMensajes(data ?? []))
  }, [reporteId])

  // Realtime subscription
  useEffect(() => {
    if (!reporteId) return
    const channel = supabase
      .channel(`chat:${reporteId}`)
      .on('postgres_changes', {
        event: 'INSERT', schema: 'public', table: 'mensajes_reporte',
        filter: `reporte_id=eq.${reporteId}`,
      }, payload => {
        setMensajes(prev => [...prev, payload.new])
      })
      .subscribe()
    return () => supabase.removeChannel(channel)
  }, [reporteId])

  // Auto-scroll al nuevo mensaje
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensajes])

  async function enviar() {
    const contenido = texto.trim()
    if (!contenido || !user || enviando) return
    setEnviando(true)
    setTexto('')
    await supabase.from('mensajes_reporte').insert({
      reporte_id: reporteId,
      user_id: user.id,
      rol: rolUsuario,
      contenido,
    })
    setEnviando(false)
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); enviar() }
  }

  if (!user) return null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 340 }}>

      {/* Header chat */}
      <div style={{
        padding: '10px 16px 8px',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        fontSize: 12, fontWeight: 600, color: '#8B95A5',
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <span>💬</span> Chat con la alcaldía
      </div>

      {/* Lista de mensajes */}
      <div style={{
        flex: 1, overflowY: 'auto', padding: '12px 14px',
        display: 'flex', flexDirection: 'column', gap: 8,
      }}>
        {mensajes.length === 0 && (
          <div style={{ textAlign: 'center', color: '#4B5563', fontSize: 13, marginTop: 40 }}>
            Aún no hay mensajes. Sé el primero en escribir.
          </div>
        )}
        {mensajes.map(m => (
          <MensajeBurbuja key={m.id} mensaje={m} esMio={m.user_id === user?.id} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{
        padding: '8px 12px 12px',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        display: 'flex', gap: 8, alignItems: 'flex-end',
      }}>
        <textarea
          value={texto}
          onChange={e => setTexto(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Escribe un mensaje…"
          rows={1}
          maxLength={500}
          style={{
            flex: 1, background: '#1A1D24',
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: 12, padding: '10px 14px',
            color: '#F0F2F5', fontSize: 13,
            fontFamily: 'inherit', resize: 'none', outline: 'none',
            lineHeight: 1.4,
          }}
        />
        <button
          onClick={enviar}
          disabled={!texto.trim() || enviando}
          style={{
            width: 38, height: 38, borderRadius: '50%', border: 'none',
            background: texto.trim() ? '#3B82F6' : '#1A1D24',
            color: '#fff', cursor: texto.trim() ? 'pointer' : 'default',
            fontSize: 16, flexShrink: 0, transition: 'background 0.2s',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          ➤
        </button>
      </div>
    </div>
  )
}

function MensajeBurbuja({ mensaje, esMio }) {
  const esAlcaldia = mensaje.rol === 'alcaldia'
  const nombre = mensaje.usuarios
    ? `${mensaje.usuarios.nombre ?? ''} ${mensaje.usuarios.apellido ?? ''}`.trim()
    : 'Usuario'

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignItems: esMio ? 'flex-end' : 'flex-start',
    }}>
      {!esMio && (
        <div style={{
          fontSize: 10, color: '#6B7280', marginBottom: 3,
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          {nombre}
          {esAlcaldia && (
            <span style={{
              background: 'rgba(59,130,246,0.15)', color: '#3B82F6',
              borderRadius: 4, padding: '1px 5px', fontSize: 9, fontWeight: 700,
            }}>
              ✓ Alcaldía
            </span>
          )}
        </div>
      )}
      <div style={{
        maxWidth: '78%', padding: '9px 13px', borderRadius: esMio
          ? '14px 14px 4px 14px'
          : '14px 14px 14px 4px',
        background: esMio
          ? '#3B82F6'
          : esAlcaldia ? 'rgba(59,130,246,0.12)' : '#1A1D24',
        border: esAlcaldia && !esMio ? '1px solid rgba(59,130,246,0.25)' : 'none',
        fontSize: 13, color: '#F0F2F5', lineHeight: 1.5,
        wordBreak: 'break-word',
      }}>
        {mensaje.contenido}
      </div>
      <div style={{ fontSize: 10, color: '#4B5563', marginTop: 3 }}>
        {new Date(mensaje.created_at).toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  )
}
