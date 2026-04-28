import { create } from 'zustand'

export const CATEGORIAS = [
  { id: 'todas',     label: 'Todas',     color: '#6B7280' },
  { id: 'agua',      label: 'Agua',      color: '#3B82F6' },
  { id: 'luz',       label: 'Luz',       color: '#F59E0B' },
  { id: 'basura',    label: 'Basura',    color: '#10B981' },
  { id: 'vialidad',  label: 'Vialidad',  color: '#EF4444' },
  { id: 'seguridad', label: 'Seguridad', color: '#8B5CF6' },
]

export const useMapStore = create(set => ({
  filtroCategoria: 'todas',
  setFiltro: cat => set({ filtroCategoria: cat }),
}))
