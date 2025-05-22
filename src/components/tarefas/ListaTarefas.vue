<template>
  <div class="space-y-4">

    <!-- Lista de Tarefas -->
    <div class="space-y-4">
      <div
        v-for="tarefa in tarefasFiltradas"
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
            <div class="flex items-center space-x-2">
              <button
                @click="$emit('editar', tarefa)"
                class="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Editar
              </button>
              <button
                @click="$emit('excluir', tarefa.id)"
                class="inline-flex items-center rounded-md border border-transparent bg-red-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Excluir
              </button>
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
                  @change="$emit('atualizar-subtarefa', tarefa.id, subtarefa.id, $event.target.checked)"
                  class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span
                  :class="{
                    'text-gray-500 line-through': subtarefa.concluida
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
import { useTarefasStore } from '@/stores/tarefas'
import type { Tarefa } from '@/stores/tarefas'

const store = useTarefasStore()

const props = defineProps<{
  tarefas: Tarefa[]
}>()

const emit = defineEmits<{
  (e: 'editar', tarefa: Tarefa): void
  (e: 'excluir', id: string): void
  (e: 'atualizar-subtarefa', tarefaId: string, subtarefaId: string, concluida: boolean): void
}>()

const filtro = computed(() => store.filtro)
const tarefasFiltradas = computed(() => store.tarefasFiltradas)

const statusLabel = {
  pendente: 'Pendente',
  em_andamento: 'Em Andamento',
  concluida: 'Concluída'
}

const prioridadeLabel = {
  baixa: 'Baixa',
  media: 'Média',
  alta: 'Alta'
}
</script> 