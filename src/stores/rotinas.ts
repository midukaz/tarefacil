import { defineStore } from 'pinia'

export interface Rotina {
  id: string
  titulo: string
  descricao: string
  diasSemana: DiaSemana[]
  horario: string
  ativa: boolean
  dataCriacao: Date
  ultimaExecucao?: Date
  tarefas: TarefaRotina[]
}

export interface TarefaRotina {
  id: string
  titulo: string
  concluida: boolean
}

export type DiaSemana = 'segunda' | 'terca' | 'quarta' | 'quinta' | 'sexta' | 'sabado' | 'domingo'

export const useRotinasStore = defineStore('rotinas', {
  state: () => ({
    rotinas: [] as Rotina[],
    filtro: {
      diasSemana: [] as DiaSemana[],
      busca: ''
    }
  }),

  getters: {
    rotinasFiltradas: (state) => {
      return state.rotinas.filter(rotina => {
        const matchDias = state.filtro.diasSemana.length === 0 || 
          rotina.diasSemana.some(dia => state.filtro.diasSemana.includes(dia))
        
        const matchBusca = state.filtro.busca === '' || 
          rotina.titulo.toLowerCase().includes(state.filtro.busca.toLowerCase()) ||
          rotina.descricao.toLowerCase().includes(state.filtro.busca.toLowerCase())
        
        return matchDias && matchBusca
      })
    }
  },

  actions: {
    adicionarRotina(rotina: Omit<Rotina, 'id' | 'dataCriacao'>) {
      const novaRotina: Rotina = {
        ...rotina,
        id: crypto.randomUUID(),
        dataCriacao: new Date()
      }
      this.rotinas.push(novaRotina)
    },

    atualizarRotina(id: string, atualizacoes: Partial<Rotina>) {
      const index = this.rotinas.findIndex(r => r.id === id)
      if (index !== -1) {
        this.rotinas[index] = { ...this.rotinas[index], ...atualizacoes }
      }
    },

    removerRotina(id: string) {
      this.rotinas = this.rotinas.filter(r => r.id !== id)
    },

    adicionarTarefaRotina(rotinaId: string, tarefa: Omit<TarefaRotina, 'id'>) {
      const rotina = this.rotinas.find(r => r.id === rotinaId)
      if (rotina) {
        rotina.tarefas.push({
          ...tarefa,
          id: crypto.randomUUID()
        })
      }
    },

    atualizarTarefaRotina(rotinaId: string, tarefaId: string, concluida: boolean) {
      const rotina = this.rotinas.find(r => r.id === rotinaId)
      if (rotina) {
        const tarefa = rotina.tarefas.find(t => t.id === tarefaId)
        if (tarefa) {
          tarefa.concluida = concluida
        }
      }
    },

    definirFiltro(filtro: Partial<typeof this.filtro>) {
      this.filtro = { ...this.filtro, ...filtro }
    },

    registrarExecucao(id: string) {
      const rotina = this.rotinas.find(r => r.id === id)
      if (rotina) {
        rotina.ultimaExecucao = new Date()
      }
    }
  }
}) 