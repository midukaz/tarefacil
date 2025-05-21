import { PiniaPluginContext } from 'pinia'

export function localStoragePlugin({ store }: PiniaPluginContext) {
  // Restaura estado do localStorage quando o store é inicializado
  const savedState = localStorage.getItem(store.$id)
  
  if (savedState) {
    try {
      const parsedState = JSON.parse(savedState)
      
      // Restaura datas para os objetos Date
      if (store.$id === 'tarefas' && parsedState.tarefas) {
        parsedState.tarefas = parsedState.tarefas.map((tarefa: any) => ({
          ...tarefa,
          dataCriacao: new Date(tarefa.dataCriacao),
          dataConclusao: tarefa.dataConclusao ? new Date(tarefa.dataConclusao) : undefined
        }))
      }
      
      store.$patch(parsedState)
    } catch (error) {
      console.error('Erro ao carregar estado do localStorage:', error)
      localStorage.removeItem(store.$id)
    }
  }

  // Observa mudanças no estado e salva no localStorage
  store.$subscribe((mutation, state) => {
    localStorage.setItem(store.$id, JSON.stringify(state))
  })
} 