<template>
  <div class="max-w-5xl mx-auto w-full p-4 py-6">
    <!-- Alerta de lembretes importantes -->
    <div v-if="showAlert && alertItems.length > 0" class="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg overflow-hidden shadow-sm">
      <div class="px-4 py-3 bg-yellow-100 border-b border-yellow-200 flex items-center justify-between">
        <h2 class="font-semibold text-yellow-800 flex items-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          Lembretes Importantes
        </h2>
        <button @click="closeAlert" class="text-yellow-800 hover:text-yellow-900">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div class="p-4">
        <ul class="divide-y divide-yellow-100">
          <li v-for="(item, index) in alertItems.slice(0, 3)" :key="index" class="py-3 flex items-start">
            <span class="h-5 w-5 mt-0.5 flex-shrink-0" :class="getAlertIconClass(item.type)">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getAlertIconPath(item.type)" />
              </svg>
            </span>
            <div class="ml-3 flex-1">
              <p class="text-sm font-medium text-gray-800">{{ item.titulo }}</p>
              <p class="text-xs mt-0.5" :class="getAlertTextClass(item.type)">
                {{ item.mensagem }}
              </p>
              
              <div class="mt-2 flex gap-2">
                <button 
                  v-if="item.tipo === 'tarefa'"
                  @click="marcarTarefaComoArquivada(item.item.id)" 
                  class="text-xs px-2 py-1 text-gray-600 bg-gray-50 hover:bg-gray-100 rounded border border-gray-200 flex items-center"
                >
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  Arquivar
                </button>
                
                <button 
                  v-if="item.tipo === 'evento'"
                  @click="marcarEventoComoArquivado(item.item.id)" 
                  class="text-xs px-2 py-1 text-gray-600 bg-gray-50 hover:bg-gray-100 rounded border border-gray-200 flex items-center"
                >
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  Arquivar
                </button>
              </div>
            </div>
          </li>
        </ul>
        
        <div v-if="alertItems.length > 3" class="mt-3 text-center">
          <button @click="showAllAlerts" class="text-sm text-yellow-700 hover:text-yellow-900 font-medium">
            Ver todos os {{ alertItems.length }} lembretes
          </button>
        </div>
      </div>
    </div>
    
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
    <div class="flex justify-end mb-6 border-b border-gray-100 pb-4">
      
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
import { onMounted, ref, onBeforeUnmount, computed } from 'vue'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const tarefasStore = useTarefasStore()
const eventosStore = useEventosStore()
const rotinasStore = useRotinasStore()

// Estado para o alerta
const showAlert = ref(true)

function closeAlert() {
  showAlert.value = false
}

// Adicionar tipos para os alertas
type AlertType = 'danger' | 'warning' | 'info' | 'success';

interface AlertItem {
  tipo: 'tarefa' | 'evento' | 'rotina';
  type: AlertType;
  titulo: string;
  mensagem: string;
  item: any;
}

// Items para o alerta
const alertItems = computed<AlertItem[]>(() => {
  const items: AlertItem[] = [];
  
  // Adicionar tarefas atrasadas
  tarefasStore.tarefasAtrasadas.slice(0, 2).forEach(tarefa => {
    if (tarefa.dataVencimento) {
      items.push({
        tipo: 'tarefa',
        type: 'danger',
        titulo: tarefa.titulo,
        mensagem: `Tarefa atrasada! Venceu em ${formatarData(tarefa.dataVencimento)}`,
        item: tarefa
      });
    }
  });
  
  // Adicionar eventos de hoje
  eventosStore.eventosHoje.slice(0, 2).forEach(evento => {
    items.push({
      tipo: 'evento',
      type: 'info',
      titulo: evento.titulo,
      mensagem: `Evento hoje às ${formatarHora(evento.dataInicio)} em ${evento.local}`,
      item: evento
    });
  });
  
  // Adicionar tarefas para hoje
  tarefasStore.tarefasHoje.slice(0, 2).forEach(tarefa => {
    items.push({
      tipo: 'tarefa',
      type: 'warning',
      titulo: tarefa.titulo,
      mensagem: `Tarefa para hoje - ${statusFormatado(tarefa.status)}`,
      item: tarefa
    });
  });
  
  // Adicionar rotinas para hoje
  rotinasStore.rotinasHoje.slice(0, 2).forEach(rotina => {
    items.push({
      tipo: 'rotina',
      type: 'success',
      titulo: rotina.titulo,
      mensagem: `Rotina programada para ${rotina.horario}`,
      item: rotina
    });
  });
  
  return items.sort((a, b) => {
    // Prioridade: 1. Tarefas atrasadas, 2. Eventos de hoje, 3. Tarefas para hoje, 4. Rotinas
    const prioridade = { danger: 0, info: 1, warning: 2, success: 3 }
    return prioridade[a.type] - prioridade[b.type]
  })
})

function showAllAlerts() {
  // Aqui você poderia abrir um modal com todos os alertas ou navegar para uma página de alertas
  // Por enquanto apenas mantém o alert aberto
  showAlert.value = true
}

function getAlertIconClass(type: AlertType): string {
  switch(type) {
    case 'danger': return 'text-red-500';
    case 'warning': return 'text-yellow-500';
    case 'info': return 'text-blue-500';
    case 'success': return 'text-green-500';
    default: return 'text-gray-500';
  }
}

function getAlertTextClass(type: AlertType): string {
  switch(type) {
    case 'danger': return 'text-red-600';
    case 'warning': return 'text-yellow-600';
    case 'info': return 'text-blue-600';
    case 'success': return 'text-green-600';
    default: return 'text-gray-600';
  }
}

function getAlertIconPath(type: AlertType): string {
  switch(type) {
    case 'danger':
      return 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
    case 'warning':
      return 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z';
    case 'info':
      return 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z';
    case 'success':
      return 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z';
    default:
      return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
  }
}

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
  switch (status) {
    case 'pendente':
      return 'Pendente';
    case 'em_andamento':
      return 'Em andamento';
    case 'concluida':
      return 'Concluída';
    default:
      return status;
  }
}

function marcarTarefaComoArquivada(id: string) {
  tarefasStore.marcarComoArquivada(id, true);
  // Atualiza a lista de alertas removendo o item arquivado
  showAlert.value = alertItems.value.length > 0;
}

function marcarEventoComoArquivado(id: string) {
  eventosStore.marcarComoArquivado(id, true);
  // Atualiza a lista de alertas removendo o item arquivado
  showAlert.value = alertItems.value.length > 0;
}
</script> 