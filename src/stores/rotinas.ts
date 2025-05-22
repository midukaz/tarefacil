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

// Chave para armazenar os dados no localStorage
const STORAGE_KEY = 'tarefacil-rotinas'

// Mapeamento dos dias da semana para números (0 = domingo, 1 = segunda, etc.)
const DIAS_SEMANA_MAP: Record<DiaSemana, number> = {
  domingo: 0,
  segunda: 1,
  terca: 2,
  quarta: 3,
  quinta: 4,
  sexta: 5,
  sabado: 6
}

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
      // Obter o dia da semana atual quando nenhum dia está selecionado
      let diasFiltro = state.filtro.diasSemana;
      
      if (diasFiltro.length === 0) {
        const hoje = new Date();
        const diaSemanaHoje = hoje.getDay(); // 0 = Domingo, 1 = Segunda, etc.
        
        const diasSemanaMap: Record<number, DiaSemana> = {
          0: 'domingo',
          1: 'segunda',
          2: 'terca',
          3: 'quarta',
          4: 'quinta',
          5: 'sexta',
          6: 'sabado'
        };
        
        const diaHoje = diasSemanaMap[diaSemanaHoje];
        diasFiltro = [diaHoje];
      }
      
      return state.rotinas.filter(rotina => {
        // Verifica se a rotina tem algum dos dias selecionados no filtro
        const matchDias = rotina.diasSemana.some(dia => diasFiltro.includes(dia));
        
        const matchBusca = state.filtro.busca === '' || 
          rotina.titulo.toLowerCase().includes(state.filtro.busca.toLowerCase()) ||
          rotina.descricao.toLowerCase().includes(state.filtro.busca.toLowerCase());
        
        return matchDias && matchBusca;
      });
    },
    
    // Rotinas para hoje
    rotinasHoje: (state) => {
      const hoje = new Date();
      const diaSemanaHoje = hoje.getDay(); // 0 = Domingo, 1 = Segunda, etc.
      
      const diasSemanaMap: Record<number, DiaSemana> = {
        0: 'domingo',
        1: 'segunda',
        2: 'terca',
        3: 'quarta',
        4: 'quinta',
        5: 'sexta',
        6: 'sabado'
      };
      
      const diaHoje = diasSemanaMap[diaSemanaHoje];
      
      return state.rotinas.filter(rotina => 
        rotina.ativa && rotina.diasSemana.includes(diaHoje)
      ).sort((a, b) => a.horario.localeCompare(b.horario));
    }
  },

  actions: {
    // Carregar dados do localStorage
    carregarDados() {
      try {
        const dadosSalvos = localStorage.getItem(STORAGE_KEY);
        if (dadosSalvos) {
          const dados = JSON.parse(dadosSalvos);
          
          // Convertendo strings de data de volta para objetos Date
          this.rotinas = dados.map((rotina: any) => ({
            ...rotina,
            dataCriacao: new Date(rotina.dataCriacao),
            ultimaExecucao: rotina.ultimaExecucao ? new Date(rotina.ultimaExecucao) : undefined
          }));
        }
      } catch (error) {
        console.error('Erro ao carregar dados do localStorage:', error);
      }
    },

    // Salvar dados no localStorage
    salvarDados() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.rotinas));
      } catch (error) {
        console.error('Erro ao salvar dados no localStorage:', error);
      }
    },

    adicionarRotina(rotina: Omit<Rotina, 'id' | 'dataCriacao'>) {
      const novaRotina: Rotina = {
        ...rotina,
        id: crypto.randomUUID(),
        dataCriacao: new Date()
      }
      this.rotinas.push(novaRotina)
      this.salvarDados()
    },

    atualizarRotina(id: string, atualizacoes: Partial<Rotina>) {
      const index = this.rotinas.findIndex(r => r.id === id)
      if (index !== -1) {
        this.rotinas[index] = { ...this.rotinas[index], ...atualizacoes }
        this.salvarDados()
      }
    },

    removerRotina(id: string) {
      this.rotinas = this.rotinas.filter(r => r.id !== id)
      this.salvarDados()
    },

    adicionarTarefaRotina(rotinaId: string, tarefa: Omit<TarefaRotina, 'id'>) {
      const rotina = this.rotinas.find(r => r.id === rotinaId)
      if (rotina) {
        rotina.tarefas.push({
          ...tarefa,
          id: crypto.randomUUID()
        })
        this.salvarDados()
      }
    },

    atualizarTarefaRotina(rotinaId: string, tarefaId: string, concluida: boolean) {
      const rotina = this.rotinas.find(r => r.id === rotinaId)
      if (rotina) {
        const tarefa = rotina.tarefas.find(t => t.id === tarefaId)
        if (tarefa) {
          tarefa.concluida = concluida
          this.salvarDados()
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
        this.salvarDados()
      }
    }
  }
}) 