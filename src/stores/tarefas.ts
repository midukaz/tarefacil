import { defineStore } from 'pinia'

export interface Tarefa {
  id: string
  titulo: string
  descricao: string
  status: 'pendente' | 'em_andamento' | 'concluida'
  prioridade: 'baixa' | 'media' | 'alta'
  dataCriacao: Date
  dataConclusao?: Date
  subtarefas: Subtarefa[]
  tags: string[]
}

export interface Subtarefa {
  id: string
  titulo: string
  concluida: boolean
}

export const useTarefasStore = defineStore('tarefas', {
  state: () => ({
    tarefas: [] as Tarefa[],
    filtro: {
      status: 'todos' as 'todos' | 'pendente' | 'em_andamento' | 'concluida',
      prioridade: 'todos' as 'todos' | 'baixa' | 'media' | 'alta',
      busca: ''
    }
  }),

  getters: {
    tarefasFiltradas: (state) => {
      return state.tarefas.filter(tarefa => {
        const matchStatus = state.filtro.status === 'todos' || tarefa.status === state.filtro.status
        const matchPrioridade = state.filtro.prioridade === 'todos' || tarefa.prioridade === state.filtro.prioridade
        const matchBusca = state.filtro.busca === '' || 
          tarefa.titulo.toLowerCase().includes(state.filtro.busca.toLowerCase()) ||
          tarefa.descricao.toLowerCase().includes(state.filtro.busca.toLowerCase())
        
        return matchStatus && matchPrioridade && matchBusca
      })
    }
  },

  actions: {
    adicionarTarefa(tarefa: Omit<Tarefa, 'id' | 'dataCriacao'>) {
      const novaTarefa: Tarefa = {
        ...tarefa,
        id: crypto.randomUUID(),
        dataCriacao: new Date()
      }
      this.tarefas.push(novaTarefa)
    },

    atualizarTarefa(id: string, atualizacoes: Partial<Tarefa>) {
      const index = this.tarefas.findIndex(t => t.id === id)
      if (index !== -1) {
        this.tarefas[index] = { ...this.tarefas[index], ...atualizacoes }
      }
    },

    removerTarefa(id: string) {
      this.tarefas = this.tarefas.filter(t => t.id !== id)
    },

    adicionarSubtarefa(tarefaId: string, subtarefa: Omit<Subtarefa, 'id'>) {
      const tarefa = this.tarefas.find(t => t.id === tarefaId)
      if (tarefa) {
        tarefa.subtarefas.push({
          ...subtarefa,
          id: crypto.randomUUID()
        })
      }
    },

    atualizarSubtarefa(tarefaId: string, subtarefaId: string, concluida: boolean) {
      const tarefa = this.tarefas.find(t => t.id === tarefaId)
      if (tarefa) {
        const subtarefa = tarefa.subtarefas.find(s => s.id === subtarefaId)
        if (subtarefa) {
          subtarefa.concluida = concluida
        }
      }
    },

    definirFiltro(filtro: Partial<typeof this.filtro>) {
      this.filtro = { ...this.filtro, ...filtro }
    }
  }
}) 