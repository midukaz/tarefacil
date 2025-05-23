<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 py-8">
      <!-- Cabeçalho elegante -->
      <div class="mb-8">
        <h1 class="text-3xl font-light text-gray-900 mb-2">Eventos</h1>
        <p class="text-gray-500 text-sm">Gerencie seus compromissos e atividades especiais</p>
      </div>

      <!-- Navegação minimalista -->
      <div class="mb-8">
        <nav class="flex space-x-1 bg-white rounded-xl p-1 shadow-sm border border-gray-100">
          <button
            @click="visualizacao = 'proximos'"
            class="flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200"
            :class="visualizacao === 'proximos' 
              ? 'bg-gray-900 text-white shadow-sm' 
              : 'text-gray-500 hover:text-gray-700'"
          >
            Próximos
            <span v-if="eventosStore.eventosProximos.length > 0" 
              class="ml-2 text-xs opacity-75">
              {{ eventosStore.eventosProximos.length }}
            </span>
          </button>
          <button
            @click="visualizacao = 'todos'"
            class="flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200"
            :class="visualizacao === 'todos' 
              ? 'bg-gray-900 text-white shadow-sm' 
              : 'text-gray-500 hover:text-gray-700'"
          >
            Todos
            <span v-if="eventosStore.eventosFiltrados.length > 0" 
              class="ml-2 text-xs opacity-75">
              {{ eventosStore.eventosFiltrados.length }}
            </span>
          </button>
          <button
            @click="visualizacao = 'passados'"
            class="flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200"
            :class="visualizacao === 'passados' 
              ? 'bg-gray-900 text-white shadow-sm' 
              : 'text-gray-500 hover:text-gray-700'"
          >
            Passados
            <span v-if="eventosPassados.length > 0" 
              class="ml-2 text-xs opacity-75">
              {{ eventosPassados.length }}
            </span>
          </button>
        </nav>
      </div>

      <!-- Filtros elegantes -->
      <div class="mb-8">
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <!-- Busca -->
          <div class="relative mb-4">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              v-model="eventosStore.filtro.busca"
              type="search"
              placeholder="Buscar eventos..."
              class="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-gray-200 focus:bg-white transition-all duration-200 text-sm"
            />
          </div>
          
          <!-- Filtros em linha -->
          <div class="flex flex-wrap items-center gap-3">
            <select
              v-model="categoriaSelecionada"
              @change="handleCategoriaChange"
              class="px-3 py-2 bg-gray-50 border-0 rounded-lg text-sm focus:ring-2 focus:ring-gray-200 transition-all duration-200"
            >
              <option value="">Todas as categorias</option>
              <option v-for="categoria in eventosStore.categoriasDisponiveis" :key="categoria" :value="categoria">
                {{ categoria }}
              </option>
            </select>

            <div class="ml-auto">
              <button
                @click="mostrarFormulario = true"
                class="hidden lg:inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-200 text-sm font-medium shadow-sm"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Novo evento
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Lista de eventos -->
      <div>
        <ListaEventos
          :eventos="eventosVisualizacao"
          @editar="editarEvento"
          @excluir="excluirEvento"
          @marcar-concluido="marcarComoConcluido"
        />
        
        <div v-if="eventosVisualizacao.length === 0" class="text-center py-16">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Nenhum evento encontrado</h3>
          <p class="text-sm text-gray-500">Crie um novo evento ou ajuste os filtros</p>
        </div>
      </div>

      <!-- Botão flutuante elegante -->
      <button
        @click="mostrarFormulario = true"
        class="fixed bottom-6 right-6 w-14 h-14 bg-gray-900 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center lg:hidden"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>

    <!-- Modal elegante -->
    <transition 
      enter-active-class="transition duration-300 ease-out" 
      enter-from-class="opacity-0" 
      enter-to-class="opacity-100" 
      leave-active-class="transition duration-200 ease-in" 
      leave-from-class="opacity-100" 
      leave-to-class="opacity-0"
    >
      <div
        v-if="mostrarFormulario"
        class="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4"
        @click.self="fecharFormulario"
      >
        <div 
          class="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-all duration-300"
          :class="{ 'scale-100 opacity-100': mostrarFormulario, 'scale-95 opacity-0': !mostrarFormulario }"
        >
          <EventoForm
            :evento="eventoSelecionado"
            @salvar="salvarEvento"
            @cancelar="fecharFormulario"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useEventosStore } from '../stores/eventos'
import type { Evento } from '../stores/eventos'
import ListaEventos from '../components/eventos/ListaEventos.vue'
import EventoForm from '../components/eventos/EventoForm.vue'
import { parseISO } from 'date-fns'

const eventosStore = useEventosStore()
const mostrarFormulario = ref(false)
const eventoSelecionado = ref<Evento | undefined>()
const visualizacao = ref<'proximos' | 'todos' | 'passados'>('proximos')

// Estado local para os filtros
const categoriaSelecionada = ref('')
const prioridadeSelecionada = ref('')
const dataInicioFiltro = ref('')
const dataFimFiltro = ref('')

// Carregar dados ao iniciar o componente
onMounted(() => {
  eventosStore.carregarDados()
})

function editarEvento(evento: Evento) {
  eventoSelecionado.value = evento
  mostrarFormulario.value = true
}

function excluirEvento(id: string) {
  if (confirm('Tem certeza que deseja excluir este evento?')) {
    eventosStore.removerEvento(id)
  }
}

function salvarEvento(evento: Omit<Evento, 'id' | 'dataCriacao'>) {
  if (eventoSelecionado.value) {
    eventosStore.atualizarEvento(eventoSelecionado.value.id, evento)
  } else {
    eventosStore.adicionarEvento(evento)
  }
  fecharFormulario()
}

function marcarComoConcluido(id: string, concluido: boolean) {
  eventosStore.marcarComoConcluido(id, concluido)
}

function handleCategoriaChange() {
  const categoria = categoriaSelecionada.value
  if (categoria) {
    eventosStore.definirFiltro({ categorias: [categoria] })
  } else {
    eventosStore.definirFiltro({ categorias: [] })
  }
}

function handlePrioridadeChange() {
  const prioridade = prioridadeSelecionada.value
  if (prioridade) {
    eventosStore.definirFiltro({ prioridades: [prioridade] })
  } else {
    eventosStore.definirFiltro({ prioridades: [] })
  }
}

function aplicarFiltroData() {
  const dataInicio = dataInicioFiltro.value ? new Date(dataInicioFiltro.value) : undefined
  const dataFim = dataFimFiltro.value ? new Date(dataFimFiltro.value) : undefined
  
  eventosStore.definirFiltro({ dataInicio, dataFim })
}

function limparFiltros() {
  categoriaSelecionada.value = ''
  prioridadeSelecionada.value = ''
  dataInicioFiltro.value = ''
  dataFimFiltro.value = ''
  
  eventosStore.definirFiltro({
    busca: '',
    categorias: [],
    prioridades: [],
    dataInicio: undefined,
    dataFim: undefined,
    concluidos: false
  })
}

function fecharFormulario() {
  mostrarFormulario.value = false
  eventoSelecionado.value = undefined
}

// Computed property for past events
const eventosPassados = computed(() => {
  const agora = new Date()
  return eventosStore.eventos.filter(evento => {
    return new Date(evento.dataInicio) < agora
  })
})

// Computed property to determine which events to display based on the selected view
const eventosVisualizacao = computed(() => {
  switch (visualizacao.value) {
    case 'proximos':
      return eventosStore.eventosProximos
    case 'todos':
      return eventosStore.eventosFiltrados
    case 'passados':
      return eventosPassados.value
    default:
      return []
  }
})
</script> 