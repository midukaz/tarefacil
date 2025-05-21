import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    tarefas: [],
    eventos: [],
    rotinas: []
  }),
  actions: {
    // Ações serão adicionadas conforme necessário
  }
}) 