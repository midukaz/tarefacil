<template>
  <div class="space-y-3">
    <!-- Lista de Tarefas -->
    <div class="space-y-3">
      <div
        v-for="tarefa in tarefas"
        :key="tarefa.id"
        class="group bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md hover:border-gray-200 transition-all duration-200"
      >
        <!-- Cabeçalho da tarefa -->
        <div class="flex items-start justify-between mb-4">
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-3 mb-2">
              <h3 class="text-lg font-medium text-gray-900 truncate">{{ tarefa.titulo }}</h3>
              <div class="flex gap-1.5">
                <!-- Status badge -->
                <span
                  :class="{
                    'bg-amber-50 text-amber-700 border-amber-200': tarefa.status === 'pendente',
                    'bg-blue-50 text-blue-700 border-blue-200': tarefa.status === 'em_andamento',
                    'bg-green-50 text-green-700 border-green-200': tarefa.status === 'concluida'
                  }"
                  class="px-2 py-1 text-xs font-medium rounded-md border"
                >
                  {{ statusLabel[tarefa.status] }}
                </span>
                <!-- Prioridade badge -->
                <span
                  :class="{
                    'bg-gray-50 text-gray-600 border-gray-200': tarefa.prioridade === 'baixa',
                    'bg-orange-50 text-orange-700 border-orange-200': tarefa.prioridade === 'media',
                    'bg-red-50 text-red-700 border-red-200': tarefa.prioridade === 'alta'
                  }"
                  class="px-2 py-1 text-xs font-medium rounded-md border"
                >
                  {{ prioridadeLabel[tarefa.prioridade] }}
                </span>
              </div>
            </div>
            <p v-if="tarefa.descricao" class="text-sm text-gray-600 leading-relaxed">{{ tarefa.descricao }}</p>
          </div>

          <!-- Menu de ações -->
          <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              @click="$emit('editar', tarefa)"
              class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              title="Editar tarefa"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              @click="$emit('arquivar', tarefa.id)"
              class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              :title="tarefa.status === 'arquivada' ? 'Desarquivar' : 'Arquivar'"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </button>
            <button
              @click="$emit('excluir', tarefa.id)"
              class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Excluir tarefa"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Tags -->
        <div v-if="tarefa.tags.length > 0" class="flex flex-wrap gap-1 mb-4">
          <span
            v-for="tag in tarefa.tags"
            :key="tag"
            class="px-2 py-1 text-xs font-medium bg-gray-50 text-gray-600 rounded-md"
          >
            {{ tag }}
          </span>
        </div>

        <!-- Subtarefas -->
        <div v-if="tarefa.subtarefas.length > 0" class="mb-4">
          <h4 class="text-sm font-medium text-gray-700 mb-3">Subtarefas</h4>
          <div class="space-y-2">
            <label
              v-for="subtarefa in tarefa.subtarefas"
              :key="subtarefa.id"
              class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <input
                type="checkbox"
                :checked="subtarefa.concluida"
                @change="handleSubtarefaChange(tarefa.id, subtarefa.id, $event)"
                class="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-200 focus:ring-2"
              />
              <span
                :class="{
                  'text-gray-500 line-through': subtarefa.concluida,
                  'text-gray-700': !subtarefa.concluida
                }"
                class="text-sm flex-1"
              >
                {{ subtarefa.titulo }}
              </span>
            </label>
          </div>
        </div>

        <!-- Rodapé com data -->
        <div class="flex items-center justify-between pt-4 border-t border-gray-50">
          <div class="text-xs text-gray-400">
            Criada em {{ new Date(tarefa.dataCriacao).toLocaleDateString('pt-BR') }}
            <span v-if="tarefa.dataConclusao" class="ml-2">
              • Concluída em {{ new Date(tarefa.dataConclusao).toLocaleDateString('pt-BR') }}
            </span>
          </div>
          
          <!-- Indicador de progresso das subtarefas -->
          <div v-if="tarefa.subtarefas.length > 0" class="flex items-center gap-2 text-xs text-gray-500">
            <span>{{ subtarefasConcluidas(tarefa) }}/{{ tarefa.subtarefas.length }}</span>
            <div class="w-12 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div 
                class="h-full bg-gray-400 rounded-full transition-all duration-300"
                :style="{ width: `${progressoSubtarefas(tarefa)}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Tarefa } from '@/stores/tarefas'

const props = defineProps<{
  tarefas: Tarefa[]
}>()

const emit = defineEmits<{
  (e: 'editar', tarefa: Tarefa): void
  (e: 'excluir', id: string): void
  (e: 'atualizar-subtarefa', tarefaId: string, subtarefaId: string, concluida: boolean): void
  (e: 'arquivar', id: string): void
}>()

const statusLabel: Record<string, string> = {
  'pendente': 'Pendente',
  'em_andamento': 'Em andamento',
  'concluida': 'Concluída',
  'arquivada': 'Arquivada'
}

const prioridadeLabel: Record<string, string> = {
  'baixa': 'Baixa',
  'media': 'Média',
  'alta': 'Alta'
}

function handleSubtarefaChange(tarefaId: string, subtarefaId: string, event: Event) {
  const target = event.target as HTMLInputElement;
  
  if (!subtarefaId) {
    console.error('[ListaTarefas] ERRO: ID da subtarefa está ausente!');
    console.log('[ListaTarefas] Tarefa ID:', tarefaId);
    console.log('[ListaTarefas] Valor do checkbox:', target.checked);
    
    // Encontrar a tarefa e mostrar suas subtarefas para debug
    const tarefa = props.tarefas.find(t => t.id === tarefaId);
    if (tarefa) {
      console.log('[ListaTarefas] Subtarefas da tarefa:', 
        tarefa.subtarefas.map(s => ({id: s.id || 'SEM_ID', titulo: s.titulo, concluida: s.concluida}))
      );
    }
    return;
  }
  
  console.log(`[ListaTarefas] Atualizando subtarefa - Tarefa ID: ${tarefaId}, Subtarefa ID: ${subtarefaId}, Valor: ${target.checked}`);
  emit('atualizar-subtarefa', tarefaId, subtarefaId, target.checked);
}

function subtarefasConcluidas(tarefa: Tarefa): number {
  return tarefa.subtarefas.filter(s => s.concluida).length;
}

function progressoSubtarefas(tarefa: Tarefa): number {
  if (tarefa.subtarefas.length === 0) return 0;
  return (subtarefasConcluidas(tarefa) / tarefa.subtarefas.length) * 100;
}
</script> 