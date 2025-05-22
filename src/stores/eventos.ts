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

// Chave para armazenar os dados no localStorage
const STORAGE_KEY = 'tarefacil-eventos'

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
    },

    // Eventos para hoje
    eventosHoje: (state) => {
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);
      const amanha = new Date(hoje);
      amanha.setDate(amanha.getDate() + 1);
      
      return state.eventos.filter(evento => {
        const dataInicio = new Date(evento.dataInicio);
        return dataInicio >= hoje && dataInicio < amanha && !evento.concluido;
      }).sort((a, b) => new Date(a.dataInicio).getTime() - new Date(b.dataInicio).getTime());
    },
    
    // Próximos eventos (proximos 3 dias, excluindo hoje)
    eventosProximos: (state) => {
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);
      const amanha = new Date(hoje);
      amanha.setDate(amanha.getDate() + 1);
      const limite = new Date(hoje);
      limite.setDate(hoje.getDate() + 4); // Hoje + 3 dias
      
      return state.eventos.filter(evento => {
        const dataInicio = new Date(evento.dataInicio);
        return dataInicio >= amanha && dataInicio < limite && !evento.concluido;
      }).sort((a, b) => new Date(a.dataInicio).getTime() - new Date(b.dataInicio).getTime());
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
          this.eventos = dados.map((evento: any) => ({
            ...evento,
            dataCriacao: new Date(evento.dataCriacao),
            dataInicio: new Date(evento.dataInicio),
            dataFim: new Date(evento.dataFim),
            lembretes: evento.lembretes.map((lembrete: any) => ({
              ...lembrete,
              data: new Date(lembrete.data)
            }))
          }));
        }
      } catch (error) {
        console.error('Erro ao carregar dados do localStorage:', error);
      }
    },

    // Salvar dados no localStorage
    salvarDados() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.eventos));
      } catch (error) {
        console.error('Erro ao salvar dados no localStorage:', error);
      }
    },

    adicionarEvento(evento: Omit<Evento, 'id' | 'dataCriacao'>) {
      const novoEvento: Evento = {
        ...evento,
        id: crypto.randomUUID(),
        dataCriacao: new Date()
      };
      this.eventos.push(novoEvento);
      this.salvarDados();
    },

    atualizarEvento(id: string, atualizacoes: Partial<Evento>) {
      const index = this.eventos.findIndex(e => e.id === id);
      if (index !== -1) {
        this.eventos[index] = { ...this.eventos[index], ...atualizacoes };
        this.salvarDados();
      }
    },

    removerEvento(id: string) {
      this.eventos = this.eventos.filter(e => e.id !== id);
      this.salvarDados();
    },

    marcarComoConcluido(id: string, concluido: boolean) {
      const evento = this.eventos.find(e => e.id === id);
      if (evento) {
        evento.concluido = concluido;
        this.salvarDados();
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
        this.salvarDados();
      }
    },

    removerLembrete(eventoId: string, lembreteId: string) {
      const evento = this.eventos.find(e => e.id === eventoId);
      if (evento) {
        evento.lembretes = evento.lembretes.filter(l => l.id !== lembreteId);
        this.salvarDados();
      }
    },

    definirFiltro(filtro: Partial<typeof this.filtro>) {
      this.filtro = { ...this.filtro, ...filtro };
    }
  }
}); 