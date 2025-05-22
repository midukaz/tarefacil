<template>
  <div class="max-w-5xl mx-auto w-full p-4 py-6">
    <!-- Título da página -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Eventos</h1>
      <p class="text-gray-600">Organize seus compromissos e eventos importantes</p>
    </div>

    <!-- Tabs para alternar entre eventos normais e arquivados -->
    <div class="mb-6 border-b border-gray-200 overflow-x-auto">
      <nav class="-mb-px flex space-x-8" aria-label="Tabs">
        <button
          @click="visualizacao = 'ativos'"
          class="py-2 px-1 border-b-2 text-sm font-medium whitespace-nowrap"
          :class="visualizacao === 'ativos' 
            ? 'border-amber-500 text-amber-600' 
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
        >
          Eventos Ativos
        </button>
        <button
          @click="visualizacao = 'arquivados'"
          class="py-2 px-1 border-b-2 text-sm font-medium whitespace-nowrap"
          :class="visualizacao === 'arquivados' 
            ? 'border-amber-500 text-amber-600' 
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
        >
          Eventos Arquivados
          <span v-if="eventosStore.eventosArquivados.length > 0" 
            class="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-amber-500 rounded-full">
            {{ eventosStore.eventosArquivados.length }}
          </span>
        </button>
      </nav>
    </div>

    <!-- Barra de filtros (apenas para eventos ativos) -->
    <div class="bg-white rounded-lg shadow-sm mb-6 p-4" v-if="visualizacao === 'ativos'">
      <div class="flex flex-col gap-4">
        <!-- Busca -->
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            v-model="eventosStore.filtro.busca"
            type="search"
            placeholder="Buscar eventos..."
            class="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-md focus:ring-1 focus:ring-amber-300 focus:border-amber-300 outline-none"
          />
        </div>
        
        <!-- Filtros avançados -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Filtro por categorias -->
          <div>
            <label for="categorias" class="block text-sm font-medium text-gray-500 mb-1">Categorias</label>
            <select
              id="categorias"
              v-model="categoriaSelecionada"
              @change="handleCategoriaChange"
              class="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-md focus:ring-1 focus:ring-amber-300 focus:border-amber-300 outline-none"
            >
              <option value="">Todas as categorias</option>
              <option v-for="categoria in eventosStore.categoriasDisponiveis" :key="categoria" :value="categoria">
                {{ categoria }}
              </option>
            </select>
          </div>
          
          <!-- Filtro por prioridade -->
          <div>
            <label for="prioridade" class="block text-sm font-medium text-gray-500 mb-1">Prioridade</label>
            <select
              id="prioridade"
              v-model="prioridadeSelecionada"
              @change="handlePrioridadeChange"
              class="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-md focus:ring-1 focus:ring-amber-300 focus:border-amber-300 outline-none"
            >
              <option value="">Todas as prioridades</option>
              <option value="baixa">Baixa</option>
              <option value="media">Média</option>
              <option value="alta">Alta</option>
            </select>
          </div>
          
          <!-- Filtro por status -->
          <div>
            <label for="status" class="block text-sm font-medium text-gray-500 mb-1">Status</label>
            <div class="flex items-center gap-2 mt-1.5">
              <input
                type="checkbox"
                id="mostrarConcluidos"
                v-model="eventosStore.filtro.concluidos"
                class="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
              />
              <label for="mostrarConcluidos" class="text-sm text-gray-700">
                Mostrar apenas concluídos
              </label>
            </div>
          </div>
        </div>
        
        <!-- Segunda linha de filtros e botões -->
        <div class="flex flex-col sm:flex-row flex-wrap items-end justify-between gap-4">
          <!-- Filtro por período -->
          <div class="flex flex-wrap gap-4">
            <div>
              <label for="dataInicio" class="block text-sm font-medium text-gray-500 mb-1">A partir de</label>
              <input
                type="date"
                id="dataInicio"
                v-model="dataInicioFiltro"
                @change="aplicarFiltroData"
                class="px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-md focus:ring-1 focus:ring-amber-300 focus:border-amber-300 outline-none"
              />
            </div>
            
            <div>
              <label for="dataFim" class="block text-sm font-medium text-gray-500 mb-1">Até</label>
              <input
                type="date"
                id="dataFim"
                v-model="dataFimFiltro"
                @change="aplicarFiltroData"
                class="px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-md focus:ring-1 focus:ring-amber-300 focus:border-amber-300 outline-none"
              />
            </div>
            
            <div class="flex items-end">
              <button
                @click="limparFiltros"
                class="px-3 py-2 text-sm font-medium text-gray-500 bg-gray-100 border border-gray-200 rounded-md hover:bg-gray-200"
              >
                Limpar filtros
              </button>
            </div>
          </div>
          
          <!-- Botão de adicionar -->
          <button
            @click="mostrarFormulario = true"
            class="flex items-center gap-1.5 rounded-md bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600 transition-colors"
          >
            <svg class="w-4 h-4" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>Novo evento</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Lista de eventos -->
    <div>
      <!-- Eventos ativos -->
      <div v-if="visualizacao === 'ativos'">
        <ListaEventos
          :eventos="eventosStore.eventosFiltrados"
          @editar="editarEvento"
          @excluir="excluirEvento"
          @concluir="marcarComoConcluido"
          @arquivar="marcarEventoComoArquivado"
        />
        
        <div v-if="eventosStore.eventosFiltrados.length === 0" class="py-12 flex flex-col items-center justify-center text-center">
          <svg class="w-16 h-16 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p class="text-gray-500 mb-1">Nenhum evento encontrado</p>
          <p class="text-sm text-gray-400">Crie um novo evento ou ajuste os filtros</p>
        </div>
      </div>

      <!-- Eventos arquivados -->
      <div v-if="visualizacao === 'arquivados'">
        <ListaEventos
          :eventos="eventosStore.eventosArquivados"
          @editar="editarEvento"
          @excluir="excluirEvento"
          @concluir="marcarComoConcluido"
          @arquivar="desarquivarEvento"
        />
        
        <div v-if="eventosStore.eventosArquivados.length === 0" class="py-12 flex flex-col items-center justify-center text-center">
          <svg class="w-16 h-16 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
          <p class="text-gray-500 mb-1">Nenhum evento arquivado</p>
          <p class="text-sm text-gray-400">Os eventos arquivados aparecerão aqui</p>
        </div>
      </div>
    </div>

    <!-- Botão flutuante minimalista -->
    <button
      @click="mostrarFormulario = true"
      class="fixed bottom-5 right-5 z-40 flex md:hidden items-center justify-center w-12 h-12 rounded-full bg-amber-500 text-white shadow-lg hover:bg-amber-600 transition-colors"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
    </button>

    <!-- Modal suave e minimalista -->
    <transition 
      enter-active-class="transition duration-200 ease-out" 
      enter-from-class="opacity-0" 
      enter-to-class="opacity-100" 
      leave-active-class="transition duration-150 ease-in" 
      leave-from-class="opacity-100" 
      leave-to-class="opacity-0"
    >
      <div
        v-if="mostrarFormulario"
        class="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4"
        @click.self="fecharFormulario"
      >
        <div 
          class="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto transform transition-all"
          :class="{ 'opacity-100 scale-100': mostrarFormulario, 'opacity-0 scale-95': !mostrarFormulario }"
        >
          <EventoForm
            :evento="eventoSelecionado"
            :categorias="eventosStore.categoriasDisponiveis"
            @salvar="salvarEvento"
            @cancelar="fecharFormulario"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useEventosStore } from '../stores/eventos'
import type { Evento } from '../stores/eventos'
import ListaEventos from '../components/eventos/ListaEventos.vue'
import EventoForm from '../components/eventos/EventoForm.vue'
import { parseISO } from 'date-fns'

const eventosStore = useEventosStore()
const mostrarFormulario = ref(false)
const eventoSelecionado = ref<Evento | undefined>()
const visualizacao = ref<'ativos' | 'arquivados'>('ativos')

// Estado local para os filtros
const categoriaSelecionada = ref('')
const prioridadeSelecionada = ref('')
const dataInicioFiltro = ref('')
const dataFimFiltro = ref('')

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

function marcarEventoComoArquivado(id: string) {
  if (confirm('Deseja arquivar este evento?')) {
    eventosStore.marcarComoArquivado(id, true)
  }
}

function desarquivarEvento(id: string) {
  if (confirm('Deseja desarquivar este evento?')) {
    eventosStore.marcarComoArquivado(id, false)
  }
}

function handleCategoriaChange() {
  if (categoriaSelecionada.value) {
    eventosStore.definirFiltro({ categorias: [categoriaSelecionada.value] })
  } else {
    eventosStore.definirFiltro({ categorias: [] })
  }
}

function handlePrioridadeChange() {
  if (prioridadeSelecionada.value) {
    eventosStore.definirFiltro({ prioridades: [prioridadeSelecionada.value] })
  } else {
    eventosStore.definirFiltro({ prioridades: [] })
  }
}

function aplicarFiltroData() {
  const filtro: Record<string, any> = {}
  
  if (dataInicioFiltro.value) {
    filtro.dataInicio = parseISO(dataInicioFiltro.value)
  }
  
  if (dataFimFiltro.value) {
    filtro.dataFim = parseISO(dataFimFiltro.value)
  }
  
  eventosStore.definirFiltro(filtro)
}

function limparFiltros() {
  categoriaSelecionada.value = ''
  prioridadeSelecionada.value = ''
  dataInicioFiltro.value = ''
  dataFimFiltro.value = ''
  
  eventosStore.definirFiltro({
    busca: '',
    dataInicio: undefined,
    dataFim: undefined,
    categorias: [],
    prioridades: [],
    concluidos: false,
    mostrarArquivados: false
  })
}

function fecharFormulario() {
  mostrarFormulario.value = false
  eventoSelecionado.value = undefined
}
</script> 