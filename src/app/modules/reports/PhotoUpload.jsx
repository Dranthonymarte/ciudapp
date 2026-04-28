import { useRef, useState } from 'react'

export default function PhotoUpload({ onPhoto }) {
  const inputRef = useRef()
  const [preview, setPreview] = useState(null)

  function handleFile(e) {
    const file = e.target.files[0]
    if (!file) return
    setPreview(URL.createObjectURL(file))
    onPhoto(file)
  }

  function quitar() {
    setPreview(null)
    onPhoto(null)
    inputRef.current.value = ''
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: 'none' }}
        onChange={handleFile}
      />

      {preview ? (
        <div style={{ position: 'relative' }}>
          <img
            src={preview}
            alt="preview"
            style={{ width: '100%', maxHeight: 200, objectFit: 'cover', borderRadius: 12 }}
          />
          <button
            onClick={quitar}
            style={{
              position: 'absolute', top: 8, right: 8,
              background: 'rgba(0,0,0,0.65)', border: 'none',
              borderRadius: '50%', width: 28, height: 28,
              color: '#fff', cursor: 'pointer', fontSize: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >×</button>
        </div>
      ) : (
        <button
          onClick={() => inputRef.current.click()}
          style={{
            width: '100%', padding: '20px 12px', borderRadius: 12,
            background: '#1A1D24', border: '2px dashed rgba(255,255,255,0.15)',
            color: '#8B95A5', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          }}
        >
          <span style={{ fontSize: 28 }}>📷</span>
          <span style={{ fontSize: 13 }}>Agregar foto (opcional)</span>
          <span style={{ fontSize: 11, color: '#4B5563' }}>Cámara o galería</span>
        </button>
      )}
    </div>
  )
}
