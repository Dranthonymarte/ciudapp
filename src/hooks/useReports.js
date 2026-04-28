import { useEffect } from 'react'
import { useReportsStore } from '@/store/reports.store'
import { obtenerReportes } from '@/app/modules/reports/reports.service'

export function useReports({ categoria_id } = {}) {
  const { reportes, setReportes, refreshTrigger } = useReportsStore()

  useEffect(() => {
    obtenerReportes({ categoria_id }).then(setReportes).catch(console.error)
  }, [categoria_id, refreshTrigger])

  return { reportes }
}
