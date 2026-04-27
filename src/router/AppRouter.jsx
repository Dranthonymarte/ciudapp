import { BrowserRouter, Routes, Route } from 'react-router-dom'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              height: '100dvh', flexDirection: 'column', gap: 12,
            }}>
              <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: '#3B82F6' }}>
                CiudApp
              </span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#8B95A5' }}>
                Scaffold OK — Fase 2 Semana 3
              </span>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
