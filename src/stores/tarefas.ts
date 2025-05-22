import { defineStore } from 'pinia'
import { isToday, isPast, isFuture, addDays, isWithinInterval } from 'date-fns'

export interface Tarefa {
  id: string
  titulo: string
  descricao: string
  status: 'pendente' | 'em_andamento' | 'concluida' | 'arquivada'
  prioridade: 'baixa' | 'media' | 'alta'
  dataCriacao: Date
  dataConclusao?: Date
  dataArquivamento?: Date
  dataVencimento?: Date
  subtarefas: Subtarefa[]
  tags: string[]
}

export interface Subtarefa {
  id: string
  titulo: string
  concluida: boolean
}

// Chave para armazenar os dados no localStorage
const STORAGE_KEY = 'tarefacil-tarefas'

export const useTarefasStore = defineStore('tarefas', {
  state: () => ({
    tarefas: [] as Tarefa[],
    filtro: {
      status: 'todos' as 'todos' | 'pendente' | 'em_andamento' | 'concluida' | 'arquivada',
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
        
        // Não mostrar tarefas arquivadas, a menos que o status seja explicitamente 'arquivada'
        const isArquivada = tarefa.status === 'arquivada'
        const showArquivada = state.filtro.status === 'arquivada'
        
        return matchStatus && matchPrioridade && matchBusca && (!isArquivada || showArquivada)
      })
    },

    // Tarefas pendentes (não concluídas e não arquivadas)
    tarefasPendentes: (state) => {
      return state.tarefas.filter(tarefa => 
        tarefa.status !== 'concluida' && tarefa.status !== 'arquivada'
      ).sort((a, b) => {
        // Ordenar por prioridade (alta -> média -> baixa)
        const prioridadeOrdem: Record<string, number> = { 'alta': 0, 'media': 1, 'baixa': 2 };
        return prioridadeOrdem[a.prioridade] - prioridadeOrdem[b.prioridade];
      });
    },

    // Tarefas para hoje (com data de vencimento para hoje e não arquivadas)
    tarefasHoje: (state) => {
      return state.tarefas.filter(tarefa => 
        tarefa.dataVencimento && 
        isToday(new Date(tarefa.dataVencimento)) &&
        tarefa.status !== 'arquivada'
      ).sort((a, b) => {
        // Ordenar por prioridade
        const prioridadeOrdem: Record<string, number> = { 'alta': 0, 'media': 1, 'baixa': 2 };
        return prioridadeOrdem[a.prioridade] - prioridadeOrdem[b.prioridade];
      });
    },

    // Tarefas atrasadas (data de vencimento no passado, não concluídas e não arquivadas)
    tarefasAtrasadas: (state) => {
      return state.tarefas.filter(tarefa => 
        tarefa.status !== 'concluida' && 
        tarefa.status !== 'arquivada' && 
        tarefa.dataVencimento && 
        isPast(new Date(tarefa.dataVencimento)) &&
        !isToday(new Date(tarefa.dataVencimento))
      );
    },

    // Tarefas próximas (vencimento nos próximos 3 dias e não arquivadas)
    tarefasProximas: (state) => {
      const hoje = new Date();
      const limiteFuturo = addDays(hoje, 3);
      
      return state.tarefas.filter(tarefa => 
        tarefa.status !== 'concluida' && 
        tarefa.status !== 'arquivada' && 
        tarefa.dataVencimento && 
        isFuture(new Date(tarefa.dataVencimento)) &&
        isWithinInterval(new Date(tarefa.dataVencimento), {
          start: hoje,
          end: limiteFuturo
        })
      );
    },

    // Tarefas arquivadas
    tarefasArquivadas: (state) => {
      return state.tarefas.filter(tarefa => 
        tarefa.status === 'arquivada'
      );
    }
  },

  actions: {
    // Carregar dados do localStorage
    carregarDados() {
      try {
        const dadosSalvos = localStorage.getItem(STORAGE_KEY)
        if (dadosSalvos) {
          const dados = JSON.parse(dadosSalvos)
          
          // Convertendo strings de data de volta para objetos Date
          this.tarefas = dados.map((tarefa: any) => ({
            ...tarefa,
            dataCriacao: new Date(tarefa.dataCriacao),
            dataConclusao: tarefa.dataConclusao ? new Date(tarefa.dataConclusao) : undefined,
            dataArquivamento: tarefa.dataArquivamento ? new Date(tarefa.dataArquivamento) : undefined,
            dataVencimento: tarefa.dataVencimento ? new Date(tarefa.dataVencimento) : undefined
          }))
        }
      } catch (error) {
        console.error('Erro ao carregar dados do localStorage:', error)
      }
    },

    // Salvar dados no localStorage
    salvarDados() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tarefas))
      } catch (error) {
        console.error('Erro ao salvar dados no localStorage:', error)
      }
    },

    adicionarTarefa(tarefa: Omit<Tarefa, 'id' | 'dataCriacao'>) {
      const novaTarefa: Tarefa = {
        ...tarefa,
        id: crypto.randomUUID(),
        dataCriacao: new Date()
      }
      this.tarefas.push(novaTarefa)
      this.salvarDados()
    },

    atualizarTarefa(id: string, atualizacoes: Partial<Tarefa>) {
      const index = this.tarefas.findIndex(t => t.id === id)
      if (index !== -1) {
        this.tarefas[index] = { ...this.tarefas[index], ...atualizacoes }
        this.salvarDados()
      }
    },

    removerTarefa(id: string) {
      this.tarefas = this.tarefas.filter(t => t.id !== id)
      this.salvarDados()
    },

    adicionarSubtarefa(tarefaId: string, subtarefa: Omit<Subtarefa, 'id'>) {
      const tarefa = this.tarefas.find(t => t.id === tarefaId)
      if (tarefa) {
        tarefa.subtarefas.push({
          ...subtarefa,
          id: crypto.randomUUID()
        })
        this.salvarDados()
      }
    },

    atualizarSubtarefa(tarefaId: string, subtarefaId: string, concluida: boolean) {
      const tarefa = this.tarefas.find(t => t.id === tarefaId)
      if (tarefa) {
        const subtarefa = tarefa.subtarefas.find(s => s.id === subtarefaId)
        if (subtarefa) {
          subtarefa.concluida = concluida
          this.salvarDados()
        }
      }
    },

    definirFiltro(filtro: Partial<typeof this.filtro>) {
      this.filtro = { ...this.filtro, ...filtro }
    },

    marcarComoArquivada(id: string, arquivada: boolean) {
      const tarefa = this.tarefas.find(t => t.id === id)
      if (tarefa) {
        if (arquivada) {
          tarefa.status = 'arquivada'
          tarefa.dataArquivamento = new Date()
        } else {
          tarefa.status = tarefa.dataConclusao ? 'concluida' : 'pendente'
          tarefa.dataArquivamento = undefined
        }
        this.salvarDados()
      }
    }
  }
}) 