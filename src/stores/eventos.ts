import { defineStore } from 'pinia'

export interface Evento {
  id: string
  titulo: string
  descricao: string
  dataInicio: Date
  dataFim: Date
  local: string
  categoria: string
  prioridade: 'baixa' | 'media' | 'alta'
  concluido: boolean
  dataCriacao: Date
  lembretes: Lembrete[]
}

export interface Lembrete {
  id: string
  data: Date
  enviado: boolean
}

export const useEventosStore = defineStore('eventos', {
  state: () => ({
    eventos: [] as Evento[],
    filtro: {
      busca: '',
      dataInicio: undefined as Date | undefined,
      dataFim: undefined as Date | undefined,
      categorias: [] as string[],
      prioridades: [] as string[],
      concluidos: false
    }
  }),

  getters: {
    eventosFiltrados: (state) => {
      return state.eventos.filter(evento => {
        // Filtro por texto (título ou descrição)
        const textoMatch = !state.filtro.busca || 
          evento.titulo.toLowerCase().includes(state.filtro.busca.toLowerCase()) ||
          evento.descricao.toLowerCase().includes(state.filtro.busca.toLowerCase()) ||
          evento.local.toLowerCase().includes(state.filtro.busca.toLowerCase());
        
        // Filtro por data de início
        const inicioMatch = !state.filtro.dataInicio || 
          evento.dataInicio >= state.filtro.dataInicio;
        
        // Filtro por data de fim
        const fimMatch = !state.filtro.dataFim || 
          evento.dataFim <= state.filtro.dataFim;
        
        // Filtro por categoria
        const categoriaMatch = state.filtro.categorias.length === 0 || 
          state.filtro.categorias.includes(evento.categoria);
        
        // Filtro por prioridade
        const prioridadeMatch = state.filtro.prioridades.length === 0 || 
          state.filtro.prioridades.includes(evento.prioridade);
        
        // Filtro por concluídos
        const concluidoMatch = !state.filtro.concluidos || 
          evento.concluido === state.filtro.concluidos;
        
        return textoMatch && inicioMatch && fimMatch && categoriaMatch && prioridadeMatch && concluidoMatch;
      });
    },
    
    categoriasDisponiveis: (state) => {
      const categorias = new Set<string>();
      state.eventos.forEach(evento => {
        if (evento.categoria) {
          categorias.add(evento.categoria);
        }
      });
      return Array.from(categorias);
    },
    
    proximosEventos: (state) => {
      const hoje = new Date();
      return state.eventos
        .filter(evento => !evento.concluido && evento.dataInicio >= hoje)
        .sort((a, b) => a.dataInicio.getTime() - b.dataInicio.getTime())
        .slice(0, 5);
    }
  },

  actions: {
    adicionarEvento(evento: Omit<Evento, 'id' | 'dataCriacao'>) {
      const novoEvento: Evento = {
        ...evento,
        id: crypto.randomUUID(),
        dataCriacao: new Date()
      };
      this.eventos.push(novoEvento);
    },

    atualizarEvento(id: string, atualizacoes: Partial<Evento>) {
      const index = this.eventos.findIndex(e => e.id === id);
      if (index !== -1) {
        this.eventos[index] = { ...this.eventos[index], ...atualizacoes };
      }
    },

    removerEvento(id: string) {
      this.eventos = this.eventos.filter(e => e.id !== id);
    },

    marcarComoConcluido(id: string, concluido: boolean) {
      const evento = this.eventos.find(e => e.id === id);
      if (evento) {
        evento.concluido = concluido;
      }
    },

    adicionarLembrete(eventoId: string, data: Date) {
      const evento = this.eventos.find(e => e.id === eventoId);
      if (evento) {
        evento.lembretes.push({
          id: crypto.randomUUID(),
          data,
          enviado: false
        });
      }
    },

    removerLembrete(eventoId: string, lembreteId: string) {
      const evento = this.eventos.find(e => e.id === eventoId);
      if (evento) {
        evento.lembretes = evento.lembretes.filter(l => l.id !== lembreteId);
      }
    },

    definirFiltro(filtro: Partial<typeof this.filtro>) {
      this.filtro = { ...this.filtro, ...filtro };
    }
  }
}); 