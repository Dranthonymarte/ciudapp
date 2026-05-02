import { create } from 'zustand'

export const useUiStore = create(set => ({
  reportarOpen: false,
  tapCoords:    null,
  openReportar:    ()           => set({ reportarOpen: true,  tapCoords: null }),
  openReportarEn:  ({ lat, lng }) => set({ reportarOpen: true,  tapCoords: { lat, lng } }),
  closeReportar:   ()           => set({ reportarOpen: false, tapCoords: null }),
}))
