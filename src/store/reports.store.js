import { create } from 'zustand'

export const useReportsStore = create(set => ({
  reportes:       [],
  refreshTrigger: 0,
  setReportes:    reportes => set({ reportes }),
  addReporte:     reporte  => set(s => ({
    reportes:       [reporte, ...s.reportes],
    refreshTrigger: s.refreshTrigger + 1,
  })),
}))
