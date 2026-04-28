import BottomNav from './BottomNav'
import { useUiStore } from '@/store/ui.store'

export default function AuthLayout({ children }) {
  const reportarOpen = useUiStore(s => s.reportarOpen)

  return (
    <div style={{ width: '100%', height: '100dvh', position: 'relative' }}>
      {children}
      {!reportarOpen && <BottomNav />}
    </div>
  )
}
