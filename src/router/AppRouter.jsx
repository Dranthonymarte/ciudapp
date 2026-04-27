import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MapScreen from '@/app/modules/map/MapScreen'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<MapScreen />} />
      </Routes>
    </BrowserRouter>
  )
}
