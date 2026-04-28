import { create } from 'zustand'

export const useUiStore = create(set => ({
  reportarOpen: false,
  openReportar:  () => set({ reportarOpen: true }),
  closeReportar: () => set({ reportarOpen: false }),
}))
