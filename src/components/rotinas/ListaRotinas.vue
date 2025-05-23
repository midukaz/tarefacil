<template>
  <div class="space-y-3">
    <!-- Lista de Rotinas -->
    <div class="space-y-3">
      <div
        v-for="rotina in rotinas"
        :key="rotina.id"
        class="group bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md hover:border-gray-200 transition-all duration-200"
      >
        <!-- Cabeçalho da rotina -->
        <div class="flex items-start justify-between mb-4">
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-3 mb-2">
              <h3 class="text-lg font-medium text-gray-900 truncate">{{ rotina.titulo }}</h3>
              <div class="flex gap-1.5">
                <!-- Status ativo/inativo -->
                <span
                  :class="{
                    'bg-green-50 text-green-700 border-green-200': rotina.ativa,
                    'bg-gray-50 text-gray-600 border-gray-200': !rotina.ativa
                  }"
                  class="px-2 py-1 text-xs font-medium rounded-md border"
                >
                  {{ rotina.ativa ? 'Ativa' : 'Inativa' }}
                </span>
                <!-- Horário -->
                <span class="px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 rounded-md">
                  {{ rotina.horario }}
                </span>
              </div>
            </div>
            <p v-if="rotina.descricao" class="text-sm text-gray-600 leading-relaxed mb-3">{{ rotina.descricao }}</p>
            
            <!-- Dias da semana -->
            <div class="flex flex-wrap gap-1">
              <span
                v-for="dia in rotina.diasSemana"
                :key="dia"
                class="px-2 py-1 text-xs font-medium bg-amber-50 text-amber-700 rounded-md"
              >
                {{ diasSemanaLabel[dia] }}
              </span>
            </div>
          </div>

          <!-- Menu de ações -->
          <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              @click="$emit('toggle-ativa', rotina.id, !rotina.ativa)"
              class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              :title="rotina.ativa ? 'Desativar rotina' : 'Ativar rotina'"
            >
              <svg v-if="rotina.ativa" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button
              v-if="rotina.ativa"
              @click="$emit('executar', rotina.id)"
              class="p-2 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded-lg transition-colors"
              title="Executar rotina"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </button>
            <button
              @click="$emit('editar', rotina)"
              class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              title="Editar rotina"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              @click="$emit('excluir', rotina.id)"
              class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Excluir rotina"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Tarefas da rotina -->
        <div v-if="rotina.tarefas.length > 0" class="mb-4">
          <h4 class="text-sm font-medium text-gray-700 mb-3">Tarefas</h4>
          <div class="space-y-2">
            <label
              v-for="tarefa in rotina.tarefas"
              :key="tarefa.id"
              class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <input
                type="checkbox"
                :checked="tarefa.concluida"
                @change="handleTarefaChange(rotina.id, tarefa.id, $event)"
                class="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-200 focus:ring-2"
              />
              <span
                :class="{
                  'text-gray-500 line-through': tarefa.concluida,
                  'text-gray-700': !tarefa.concluida
                }"
                class="text-sm flex-1"
              >
                {{ tarefa.titulo }}
              </span>
            </label>
          </div>
        </div>

        <!-- Rodapé com informações -->
        <div class="flex items-center justify-between pt-4 border-t border-gray-50">
          <div class="text-xs text-gray-400">
            Criada em {{ new Date(rotina.dataCriacao).toLocaleDateString('pt-BR') }}
            <span v-if="rotina.ultimaExecucao" class="ml-2">
              • Última execução em {{ new Date(rotina.ultimaExecucao).toLocaleDateString('pt-BR') }}
            </span>
          </div>
          
          <!-- Indicador de progresso das tarefas -->
          <div v-if="rotina.tarefas.length > 0" class="flex items-center gap-2 text-xs text-gray-500">
            <span>{{ tarefasConcluidas(rotina) }}/{{ rotina.tarefas.length }}</span>
            <div class="w-12 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div 
                class="h-full bg-gray-400 rounded-full transition-all duration-300"
                :style="{ width: `${progressoTarefas(rotina)}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Rotina } from '@/stores/rotinas'

const props = defineProps<{
  rotinas: Rotina[]
}>()

const emit = defineEmits<{
  (e: 'editar', rotina: Rotina): void
  (e: 'excluir', id: string): void
  (e: 'atualizar-tarefa', rotinaId: string, tarefaId: string, concluida: boolean): void
  (e: 'toggle-ativa', id: string, ativa: boolean): void
  (e: 'executar', id: string): void
}>()

const diasSemanaLabel: Record<string, string> = {
  'segunda': 'Seg',
  'terca': 'Ter', 
  'quarta': 'Qua',
  'quinta': 'Qui',
  'sexta': 'Sex',
  'sabado': 'Sáb',
  'domingo': 'Dom'
}

function handleTarefaChange(rotinaId: string, tarefaId: string, event: Event) {
  const target = event.target as HTMLInputElement;
  emit('atualizar-tarefa', rotinaId, tarefaId, target.checked);
}

function tarefasConcluidas(rotina: Rotina): number {
  return rotina.tarefas.filter(t => t.concluida).length;
}

function progressoTarefas(rotina: Rotina): number {
  if (rotina.tarefas.length === 0) return 0;
  return (tarefasConcluidas(rotina) / rotina.tarefas.length) * 100;
}
</script> 