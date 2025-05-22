<template>
  <div class="space-y-4">
    <!-- Lista de Rotinas -->
    <div class="space-y-4">
      <div
        v-for="rotina in rotinas"
        :key="rotina.id"
        class="bg-white shadow-sm rounded-lg overflow-hidden"
      >
        <div class="px-4 py-5 sm:p-6">
          <div class="flex justify-between items-start">
            <div class="flex items-center gap-2">
              <div
                class="w-3 h-3 rounded-full"
                :class="rotina.ativa ? 'bg-amber-500' : 'bg-gray-300'"
              ></div>
              <h3 class="text-lg font-medium text-gray-900">{{ rotina.titulo }}</h3>
            </div>

            <div class="flex items-center space-x-2">
              <button
                @click="$emit('editar', rotina)"
                class="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
              >
                Editar
              </button>
              <button
                @click="$emit('excluir', rotina.id)"
                class="inline-flex items-center rounded-md border border-transparent bg-red-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
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
  </div>
</template>

<script setup lang="ts">
import type { Rotina, DiaSemana } from '@/stores/rotinas'

const props = defineProps<{
  rotinas: Rotina[]
}>()

const emit = defineEmits<{
  (e: 'editar', rotina: Rotina): void
  (e: 'excluir', id: string): void
  (e: 'atualizar-tarefa', rotinaId: string, tarefaId: string, concluida: boolean): void
}>()

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
  const target = event.target as HTMLInputElement
  emit('atualizar-tarefa', rotinaId, tarefaId, target.checked)
}
</script> 