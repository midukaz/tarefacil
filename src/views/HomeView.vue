<template>
  <div class="max-w-5xl mx-auto w-full p-4 py-6">
    <!-- Cabeçalho com resumo -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">Olá</h1>
      <p class="text-gray-500 mt-1">Veja um resumo da sua produtividade hoje</p>
      
      <!-- Estatísticas Rápidas -->
      <div class="grid grid-cols-3 gap-4 mt-6">
        <div class="bg-indigo-50 rounded-lg p-4 flex flex-col items-center">
          <span class="text-xl font-semibold text-indigo-700">{{ tarefasStore.tarefasHoje.length }}</span>
          <span class="text-xs text-indigo-600 mt-1">Tarefas Hoje</span>
        </div>
        <div class="bg-rose-50 rounded-lg p-4 flex flex-col items-center">
          <span class="text-xl font-semibold text-rose-700">{{ eventosStore.eventosHoje.length }}</span>
          <span class="text-xs text-rose-600 mt-1">Eventos Hoje</span>
        </div>
        <div class="bg-amber-50 rounded-lg p-4 flex flex-col items-center">
          <span class="text-xl font-semibold text-amber-700">{{ rotinasStore.rotinasHoje.length }}</span>
          <span class="text-xs text-amber-600 mt-1">Rotinas Hoje</span>
        </div>
      </div>
    </div>
    
    <!-- Menu de navegação rápida -->
    <div class="flex justify-between mb-6 border-b border-gray-100 pb-4">
      <div class="flex space-x-6">
        <router-link to="/tarefas" class="flex items-center text-gray-500 hover:text-indigo-600">
          <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          <span class="text-sm font-medium">Tarefas</span>
        </router-link>
        <router-link to="/eventos" class="flex items-center text-gray-500 hover:text-rose-600">
          <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span class="text-sm font-medium">Eventos</span>
        </router-link>
        <router-link to="/rotinas" class="flex items-center text-gray-500 hover:text-amber-600">
          <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="text-sm font-medium">Rotinas</span>
        </router-link>
      </div>
      
      <!-- Dropdown de adicionar novo -->
      <div class="relative" ref="addMenuRef">
        <button 
          @click="toggleAddMenu" 
          class="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          <span>Adicionar</span>
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        <div v-if="showAddMenu" class="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-100">
          <router-link to="/tarefas?new=true" class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700">
            Nova Tarefa
          </router-link>
          <router-link to="/eventos?new=true" class="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-700">
            Novo Evento
          </router-link>
          <router-link to="/rotinas?new=true" class="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700">
            Nova Rotina
          </router-link>
        </div>
      </div>
    </div>
    
    <!-- Conteúdo principal em duas colunas -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Coluna da esquerda: Tarefas e Rotinas -->
      <div class="space-y-6">
        <!-- Tarefas de hoje -->
        <div class="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
          <div class="px-4 py-3 bg-white border-b border-gray-100 flex items-center justify-between">
            <h2 class="font-semibold text-gray-900 flex items-center">
              <svg class="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              Tarefas de Hoje
            </h2>
            <router-link to="/tarefas" class="text-xs text-indigo-600 hover:text-indigo-800 flex items-center">
              Ver todas
              <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </router-link>
          </div>
          <div class="p-4">
            <div v-if="tarefasStore.tarefasHoje.length === 0" class="text-center py-6 text-gray-400 text-sm flex flex-col items-center">
              <svg class="w-10 h-10 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Nenhuma tarefa para hoje
            </div>
            <ul v-else class="divide-y divide-gray-50">
              <li v-for="tarefa in tarefasStore.tarefasHoje.slice(0, 4)" :key="tarefa.id" class="py-3">
                <div class="flex items-start">
                  <div class="flex-shrink-0 h-4 w-4 mt-1">
                    <span :class="{
                      'bg-green-100 border-green-400': tarefa.prioridade === 'baixa',
                      'bg-yellow-100 border-yellow-400': tarefa.prioridade === 'media',
                      'bg-red-100 border-red-400': tarefa.prioridade === 'alta'
                    }" class="h-3 w-3 rounded-full border block"></span>
                  </div>
                  <div class="ml-2 flex-1">
                    <p class="text-sm font-medium text-gray-800">{{ tarefa.titulo }}</p>
                    <p class="text-xs text-gray-500 mt-0.5">{{ statusFormatado(tarefa.status) }}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <!-- Rotinas de hoje -->
        <div class="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
          <div class="px-4 py-3 bg-white border-b border-gray-100 flex items-center justify-between">
            <h2 class="font-semibold text-gray-900 flex items-center">
              <svg class="w-4 h-4 mr-2 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Rotinas de Hoje
            </h2>
            <router-link to="/rotinas" class="text-xs text-amber-600 hover:text-amber-800 flex items-center">
              Ver todas
              <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </router-link>
          </div>
          <div class="p-4">
            <div v-if="rotinasStore.rotinasHoje.length === 0" class="text-center py-6 text-gray-400 text-sm flex flex-col items-center">
              <svg class="w-10 h-10 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Nenhuma rotina para hoje
            </div>
            <ul v-else class="divide-y divide-gray-50">
              <li v-for="rotina in rotinasStore.rotinasHoje.slice(0, 4)" :key="rotina.id" class="py-3">
                <div class="flex items-start">
                  <div class="ml-2 flex-1">
                    <div class="flex justify-between">
                      <p class="text-sm font-medium text-gray-800">{{ rotina.titulo }}</p>
                      <p class="text-xs px-2 py-0.5 bg-amber-50 text-amber-800 rounded-full">{{ rotina.horario }}</p>
                    </div>
                    <p class="text-xs text-gray-500 mt-0.5 line-clamp-1">{{ rotina.descricao }}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <!-- Coluna da direita: Eventos e alertas -->
      <div class="space-y-6">
        <!-- Eventos de hoje -->
        <div class="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
          <div class="px-4 py-3 bg-white border-b border-gray-100 flex items-center justify-between">
            <h2 class="font-semibold text-gray-900 flex items-center">
              <svg class="w-4 h-4 mr-2 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Eventos de Hoje
            </h2>
            <router-link to="/eventos" class="text-xs text-rose-600 hover:text-rose-800 flex items-center">
              Ver todos
              <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </router-link>
          </div>
          <div class="p-4">
            <div v-if="eventosStore.eventosHoje.length === 0" class="text-center py-6 text-gray-400 text-sm flex flex-col items-center">
              <svg class="w-10 h-10 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Nenhum evento para hoje
            </div>
            <ul v-else class="divide-y divide-gray-50">
              <li v-for="evento in eventosStore.eventosHoje.slice(0, 4)" :key="evento.id" class="py-3">
                <div class="flex items-start">
                  <div class="ml-2 flex-1">
                    <div class="flex justify-between">
                      <p class="text-sm font-medium text-gray-800">{{ evento.titulo }}</p>
                      <p class="text-xs px-2 py-0.5 bg-rose-50 text-rose-800 rounded-full">{{ formatarHora(evento.dataInicio) }}</p>
                    </div>
                    <p class="text-xs text-gray-500 mt-0.5">{{ evento.local }}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <!-- Alertas (combinação de tarefas atrasadas e eventos próximos) -->
        <div class="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
          <div class="px-4 py-3 bg-white border-b border-gray-100 flex items-center justify-between">
            <h2 class="font-semibold text-gray-900 flex items-center">
              <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Alertas e Lembretes
            </h2>
          </div>
          <div class="p-4">
            <!-- Tarefas atrasadas -->
            <div v-if="tarefasStore.tarefasAtrasadas.length > 0">
              <h3 class="text-xs uppercase text-gray-500 font-semibold mb-2">Tarefas Atrasadas</h3>
              <ul class="mb-4 divide-y divide-gray-50">
                <li v-for="tarefa in tarefasStore.tarefasAtrasadas.slice(0, 2)" :key="tarefa.id" class="py-2">
                  <div class="flex items-start">
                    <span class="h-4 w-4 mt-0.5 flex-shrink-0 text-red-500">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    <div class="ml-2 flex-1">
                      <p class="text-sm font-medium text-gray-800">{{ tarefa.titulo }}</p>
                      <p class="text-xs text-red-600 mt-0.5" v-if="tarefa.dataVencimento">
                        Venceu em {{ formatarData(tarefa.dataVencimento) }}
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            
            <!-- Próximos eventos -->
            <div v-if="eventosStore.eventosProximos.length > 0">
              <h3 class="text-xs uppercase text-gray-500 font-semibold mb-2">Próximos Eventos</h3>
              <ul class="mb-4 divide-y divide-gray-50">
                <li v-for="evento in eventosStore.eventosProximos.slice(0, 2)" :key="evento.id" class="py-2">
                  <div class="flex items-start">
                    <span class="h-4 w-4 mt-0.5 flex-shrink-0 text-blue-500">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <div class="ml-2 flex-1">
                      <p class="text-sm font-medium text-gray-800">{{ evento.titulo }}</p>
                      <p class="text-xs text-blue-600 mt-0.5" v-if="evento.dataInicio">
                        {{ formatarData(evento.dataInicio) }}
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            
            <!-- Tarefas próximas -->
            <div v-if="tarefasStore.tarefasProximas.length > 0">
              <h3 class="text-xs uppercase text-gray-500 font-semibold mb-2">Tarefas Próximas</h3>
              <ul class="divide-y divide-gray-50">
                <li v-for="tarefa in tarefasStore.tarefasProximas.slice(0, 2)" :key="tarefa.id" class="py-2">
                  <div class="flex items-start">
                    <span class="h-4 w-4 mt-0.5 flex-shrink-0 text-indigo-500">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    <div class="ml-2 flex-1">
                      <p class="text-sm font-medium text-gray-800">{{ tarefa.titulo }}</p>
                      <p class="text-xs text-indigo-600 mt-0.5" v-if="tarefa.dataVencimento">
                        Vence em {{ formatarData(tarefa.dataVencimento) }}
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            
            <!-- Sem alertas -->
            <div v-if="tarefasStore.tarefasAtrasadas.length === 0 && 
                      eventosStore.eventosProximos.length === 0 && 
                      tarefasStore.tarefasProximas.length === 0" 
                class="text-center py-6 text-gray-400 text-sm flex flex-col items-center">
              <svg class="w-10 h-10 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M5 13l4 4L19 7" />
              </svg>
              Tudo em dia! Nenhum alerta pendente.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTarefasStore } from '../stores/tarefas'
import { useEventosStore } from '../stores/eventos'
import { useRotinasStore } from '../stores/rotinas'
import { onMounted, ref, onBeforeUnmount } from 'vue'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const tarefasStore = useTarefasStore()
const eventosStore = useEventosStore()
const rotinasStore = useRotinasStore()

// Menu dropdown de adicionar
const showAddMenu = ref(false)
const addMenuRef = ref(null)

function toggleAddMenu() {
  showAddMenu.value = !showAddMenu.value
}

// Fechar menu quando clicar fora dele
function handleClickOutside(event: MouseEvent) {
  if (addMenuRef.value && !(addMenuRef.value as HTMLElement).contains(event.target as Node)) {
    showAddMenu.value = false
  }
}

onMounted(() => {
  // Carregar dados de todas as stores
  tarefasStore.carregarDados()
  eventosStore.carregarDados()
  rotinasStore.carregarDados()
  
  // Adicionar listener para fechar o menu
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  // Remover listener ao desmontar o componente
  document.removeEventListener('click', handleClickOutside)
})

// Funções de formatação
function formatarData(data: Date): string {
  return format(new Date(data), 'dd/MM/yyyy', { locale: ptBR })
}

function formatarHora(data: Date): string {
  return format(new Date(data), 'HH:mm', { locale: ptBR })
}

function statusFormatado(status: string): string {
  const statusMap: Record<string, string> = {
    'pendente': 'Pendente',
    'em_andamento': 'Em andamento',
    'concluida': 'Concluída'
  }
  return statusMap[status] || status
}
</script> 