<template>
  <div class="space-y-4">
    <!-- Lista de Rotinas -->
    <div class="space-y-4">
      <div
        v-for="rotina in rotinas"
        :key="rotina.id"
        class="bg-white shadow-sm rounded-lg overflow-hidden"
        :class="{'opacity-90': rotinaFinalizadaHoje(rotina)}"
      >
        <div class="px-4 py-5 sm:p-6">
          <div class="flex justify-between items-start">
            <div class="flex items-center gap-2">
              <div
                class="w-3 h-3 rounded-full"
                :class="rotina.ativa ? 'bg-amber-500' : 'bg-gray-300'"
              ></div>
              <h3 class="text-lg font-medium text-gray-900">{{ rotina.titulo }}</h3>
              <span v-if="rotinaFinalizadaHoje(rotina)" class="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">
                Finalizada hoje
              </span>
            </div>

            <div class="flex items-center space-x-2">
              <button
                @click="abrirModalFinalizarRotina(rotina)"
                class="inline-flex items-center rounded-md border border-gray-300 px-3 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                :class="rotinaFinalizadaHoje(rotina) 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-green-50 text-green-700 hover:bg-green-100'"
                :disabled="rotinaFinalizadaHoje(rotina)"
              >
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Finalizar
              </button>
              
              <button
                @click="$emit('editar', rotina)"
                class="inline-flex items-center rounded-md border border-gray-300 px-3 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                :class="rotinaFinalizadaHoje(rotina) 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'"
                :disabled="rotinaFinalizadaHoje(rotina)"
              >
                Editar
              </button>
              <button
                @click="$emit('excluir', rotina.id)"
                class="inline-flex items-center rounded-md border px-3 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 bg-red-600 text-white hover:bg-red-700 border-transparent"
              >
                Excluir
              </button>
            </div>
          </div>

          <p class="mt-2 text-sm text-gray-500">{{ rotina.descricao }}</p>

          <!-- Detalhes da rotina -->
          <div class="mt-3 flex items-center gap-4 text-sm text-gray-500">
            <div class="flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{{ rotina.horario }}</span>
            </div>
            
            <div class="flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{{ formatarDiasSemana(rotina.diasSemana) }}</span>
            </div>
          </div>

          <!-- Tarefas da rotina -->
          <div v-if="rotina.tarefas.length > 0" class="mt-4">
            <h4 class="text-sm font-medium text-gray-700 mb-2">Tarefas</h4>
            <ul class="space-y-1">
              <li
                v-for="tarefa in rotina.tarefas"
                :key="tarefa.id"
                class="flex items-center gap-2 text-sm"
              >
                <input
                  type="checkbox"
                  :checked="tarefa.concluida"
                  @change="handleTarefaChange(rotina.id, tarefa.id, $event)"
                  class="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                  :disabled="rotinaFinalizadaHoje(rotina)"
                  :class="{'opacity-60 cursor-not-allowed': rotinaFinalizadaHoje(rotina)}"
                />
                <span
                  :class="{
                    'text-gray-500 line-through': tarefa.concluida,
                    'text-gray-700': !tarefa.concluida
                  }"
                >
                  {{ tarefa.titulo }}
                </span>
              </li>
            </ul>
          </div>

          <!-- Data de criação e última execução -->
          <div class="mt-4 text-xs text-gray-400">
            Criada em: {{ formatarData(rotina.dataCriacao) }}
            <span v-if="rotina.ultimaExecucao">
              | Última execução: {{ formatarData(rotina.ultimaExecucao) }}
            </span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Modal para finalizar rotina -->
    <transition 
      enter-active-class="transition duration-200 ease-out" 
      enter-from-class="opacity-0" 
      enter-to-class="opacity-100" 
      leave-active-class="transition duration-150 ease-in" 
      leave-from-class="opacity-100" 
      leave-to-class="opacity-0"
    >
      <div
        v-if="mostrarModalFinalizar"
        class="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4"
        @click.self="fecharModalFinalizar"
      >
        <div 
          class="bg-white rounded-lg shadow-xl max-w-md w-full transform transition-all p-6"
          :class="{ 'opacity-100 scale-100': mostrarModalFinalizar, 'opacity-0 scale-95': !mostrarModalFinalizar }"
        >
          <h2 class="text-lg font-semibold text-gray-900 mb-2">Finalizar Rotina</h2>
          <p class="text-gray-600 mb-4">
            Deseja finalizar a rotina "{{ rotinaSelecionada?.titulo }}"? Isso marcará todas as tarefas como concluídas e registrará a execução da rotina.
          </p>
          
          <div v-if="rotinaSelecionada?.tarefas.length" class="mb-4 bg-amber-50 p-3 rounded-md">
            <h3 class="text-sm font-medium text-amber-800 mb-2">Tarefas da rotina:</h3>
            <ul class="space-y-1 ml-2">
              <li v-for="tarefa in rotinaSelecionada?.tarefas" :key="tarefa.id" class="text-sm text-amber-700">
                • {{ tarefa.titulo }}
              </li>
            </ul>
          </div>
          
          <div class="flex justify-end space-x-3">
            <button 
              @click="fecharModalFinalizar" 
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancelar
            </button>
            <button 
              @click="finalizarRotina"
              class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
            >
              Finalizar
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Rotina, DiaSemana } from '@/stores/rotinas'

const props = defineProps<{
  rotinas: Rotina[]
}>()

const emit = defineEmits<{
  (e: 'editar', rotina: Rotina): void
  (e: 'excluir', id: string): void
  (e: 'atualizar-tarefa', rotinaId: string, tarefaId: string, concluida: boolean): void
  (e: 'finalizar-rotina', rotinaId: string): void
}>()

// Estado para o modal de finalizar rotina
const mostrarModalFinalizar = ref(false)
const rotinaSelecionada = ref<Rotina | null>(null)

function abrirModalFinalizarRotina(rotina: Rotina) {
  if (rotinaFinalizadaHoje(rotina)) return;
  
  rotinaSelecionada.value = rotina
  mostrarModalFinalizar.value = true
}

function fecharModalFinalizar() {
  mostrarModalFinalizar.value = false
  setTimeout(() => {
    rotinaSelecionada.value = null
  }, 200)
}

function finalizarRotina() {
  if (rotinaSelecionada.value) {
    emit('finalizar-rotina', rotinaSelecionada.value.id)
    fecharModalFinalizar()
  }
}

// Verificar se a rotina já foi finalizada hoje
function rotinaFinalizadaHoje(rotina: Rotina): boolean {
  if (!rotina.ultimaExecucao) return false;
  
  const hoje = new Date();
  const ultimaExecucao = new Date(rotina.ultimaExecucao);
  
  return (
    hoje.getDate() === ultimaExecucao.getDate() &&
    hoje.getMonth() === ultimaExecucao.getMonth() &&
    hoje.getFullYear() === ultimaExecucao.getFullYear()
  );
}

function formatarDiasSemana(dias: DiaSemana[]): string {
  if (dias.length === 7) return 'Todos os dias'
  
  const nomesDias: Record<DiaSemana, string> = {
    segunda: 'Seg',
    terca: 'Ter',
    quarta: 'Qua',
    quinta: 'Qui',
    sexta: 'Sex',
    sabado: 'Sáb',
    domingo: 'Dom'
  }
  
  return dias.map(dia => nomesDias[dia]).join(', ')
}

function formatarData(data: Date): string {
  return new Date(data).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

function handleTarefaChange(rotinaId: string, tarefaId: string, event: Event) {
  if (rotinaFinalizadaHoje(props.rotinas.find(r => r.id === rotinaId)!)) return;
  
  const target = event.target as HTMLInputElement
  emit('atualizar-tarefa', rotinaId, tarefaId, target.checked)
}
</script> 