<template>
  <div class="space-y-4">

    <!-- Lista de Tarefas -->
    <div class="space-y-4">
      <div
        v-for="tarefa in tarefas"
        :key="tarefa.id"
        class="bg-white shadow sm:rounded-lg overflow-hidden"
      >
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <h3 class="text-lg font-medium text-gray-900">{{ tarefa.titulo }}</h3>
              <span
                :class="{
                  'bg-yellow-100 text-yellow-800': tarefa.status === 'pendente',
                  'bg-blue-100 text-blue-800': tarefa.status === 'em_andamento',
                  'bg-green-100 text-green-800': tarefa.status === 'concluida'
                }"
                class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
              >
                {{ statusLabel[tarefa.status] }}
              </span>
              <span
                :class="{
                  'bg-gray-100 text-gray-800': tarefa.prioridade === 'baixa',
                  'bg-orange-100 text-orange-800': tarefa.prioridade === 'media',
                  'bg-red-100 text-red-800': tarefa.prioridade === 'alta'
                }"
                class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
              >
                {{ prioridadeLabel[tarefa.prioridade] }}
              </span>
            </div>
            <div class="flex justify-between mt-4">
              <div class="flex space-x-3">
                <button
                  type="button"
                  @click="$emit('editar', tarefa)"
                  class="flex items-center rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  <svg class="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Editar
                </button>
                <button
                  type="button"
                  @click="$emit('excluir', tarefa.id)"
                  class="flex items-center rounded-md text-sm font-medium text-red-600 hover:text-red-500"
                >
                  <svg class="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  Excluir
                </button>
                <button
                  v-if="tarefa.status !== 'arquivada'"
                  type="button"
                  @click="$emit('arquivar', tarefa.id)"
                  class="flex items-center rounded-md text-sm font-medium text-gray-600 hover:text-gray-500"
                >
                  <svg class="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                    <path fill-rule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clip-rule="evenodd" />
                  </svg>
                  Arquivar
                </button>
                <button
                  v-if="tarefa.status === 'arquivada'"
                  type="button"
                  @click="$emit('arquivar', tarefa.id)"
                  class="flex items-center rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  <svg class="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M5 2a1 1 0 011 1v1h8V3a1 1 0 112 0v1h1a2 2 0 012 2v2H1V6a2 2 0 012-2h1V3a1 1 0 011-1zm11 9H4v8a1 1 0 001 1h10a1 1 0 001-1v-8z" clip-rule="evenodd" />
                  </svg>
                  Desarquivar
                </button>
              </div>
            </div>
          </div>

          <p class="mt-2 text-sm text-gray-500">{{ tarefa.descricao }}</p>

          <!-- Tags -->
          <div class="mt-3 flex flex-wrap gap-2">
            <span
              v-for="tag in tarefa.tags"
              :key="tag"
              class="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800"
            >
              {{ tag }}
            </span>
          </div>

          <!-- Subtarefas -->
          <div v-if="tarefa.subtarefas.length > 0" class="mt-4">
            <h4 class="text-sm font-medium text-gray-700">Subtarefas</h4>
            <ul class="mt-2 space-y-2">
              <li
                v-for="subtarefa in tarefa.subtarefas"
                :key="subtarefa.id"
                class="flex items-center space-x-2"
              >
                <input
                  type="checkbox"
                  :checked="subtarefa.concluida"
                  @change="handleSubtarefaChange(tarefa.id, subtarefa.id, $event)"
                  class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span
                  :class="{
                    'text-gray-500 line-through': subtarefa.concluida,
                    'text-gray-700': !subtarefa.concluida
                  }"
                  class="text-sm"
                >
                  {{ subtarefa.titulo }}
                </span>
              </li>
            </ul>
          </div>

          <div class="mt-4 text-sm text-gray-500">
            Criada em: {{ new Date(tarefa.dataCriacao).toLocaleDateString() }}
            <span v-if="tarefa.dataConclusao">
              | Concluída em: {{ new Date(tarefa.dataConclusao).toLocaleDateString() }}
            </span>
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
</script> 