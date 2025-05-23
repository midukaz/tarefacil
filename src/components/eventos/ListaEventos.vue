<template>
  <div class="space-y-3">
    <!-- Lista de Eventos -->
    <div class="space-y-3">
      <div
        v-for="evento in eventos"
        :key="evento.id"
        class="group bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md hover:border-gray-200 transition-all duration-200"
      >
        <!-- Cabeçalho do evento -->
        <div class="flex items-start justify-between mb-4">
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-3 mb-2">
              <h3 class="text-lg font-medium text-gray-900 truncate">{{ evento.titulo }}</h3>
              <div class="flex gap-1.5">
                <!-- Status concluído -->
                <span
                  v-if="evento.concluido"
                  class="px-2 py-1 text-xs font-medium bg-green-50 text-green-700 border border-green-200 rounded-md"
                >
                  Concluído
                </span>
                <!-- Prioridade -->
                <span
                  :class="{
                    'bg-gray-50 text-gray-600 border-gray-200': evento.prioridade === 'baixa',
                    'bg-orange-50 text-orange-700 border-orange-200': evento.prioridade === 'media',
                    'bg-red-50 text-red-700 border-red-200': evento.prioridade === 'alta'
                  }"
                  class="px-2 py-1 text-xs font-medium rounded-md border"
                >
                  {{ prioridadeLabel[evento.prioridade] }}
                </span>
                <!-- Categoria -->
                <span class="px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 rounded-md">
                  {{ evento.categoria }}
                </span>
              </div>
            </div>
            <p v-if="evento.descricao" class="text-sm text-gray-600 leading-relaxed mb-3">{{ evento.descricao }}</p>
            
            <!-- Informações do evento -->
            <div class="space-y-2 text-sm text-gray-500">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{{ formatarDataHora(evento.dataInicio) }}</span>
                <span v-if="evento.dataInicio.getTime() !== evento.dataFim.getTime()">
                  até {{ formatarDataHora(evento.dataFim) }}
                </span>
              </div>
              <div v-if="evento.local" class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{{ evento.local }}</span>
              </div>
            </div>
          </div>

          <!-- Menu de ações -->
          <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              v-if="!evento.concluido"
              @click="$emit('marcar-concluido', evento.id, true)"
              class="p-2 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded-lg transition-colors"
              title="Marcar como concluído"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </button>
            <button
              v-if="evento.concluido"
              @click="$emit('marcar-concluido', evento.id, false)"
              class="p-2 text-gray-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors"
              title="Desmarcar conclusão"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <button
              @click="$emit('editar', evento)"
              class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              title="Editar evento"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              @click="$emit('excluir', evento.id)"
              class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Excluir evento"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Lembretes -->
        <div v-if="evento.lembretes.length > 0" class="mb-4">
          <h4 class="text-sm font-medium text-gray-700 mb-2">Lembretes</h4>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="lembrete in evento.lembretes"
              :key="lembrete.id"
              class="px-2 py-1 text-xs font-medium rounded-md"
              :class="lembrete.enviado 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-amber-50 text-amber-700 border border-amber-200'"
            >
              {{ formatarDataHora(lembrete.data) }}
              {{ lembrete.enviado ? '✓' : '⏰' }}
            </span>
          </div>
        </div>

        <!-- Rodapé com informações -->
        <div class="flex items-center justify-between pt-4 border-t border-gray-50">
          <div class="text-xs text-gray-400">
            Criado em {{ new Date(evento.dataCriacao).toLocaleDateString('pt-BR') }}
            <span v-if="evento.dataArquivamento" class="ml-2">
              • Arquivado em {{ new Date(evento.dataArquivamento).toLocaleDateString('pt-BR') }}
            </span>
          </div>
          
          <!-- Status do evento -->
          <div class="text-xs text-gray-500">
            {{ getStatusEvento(evento) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Evento } from '@/stores/eventos'

const props = defineProps<{
  eventos: Evento[]
}>()

const emit = defineEmits<{
  (e: 'editar', evento: Evento): void
  (e: 'excluir', id: string): void
  (e: 'marcar-concluido', id: string, concluido: boolean): void
}>()

const prioridadeLabel: Record<string, string> = {
  'baixa': 'Baixa',
  'media': 'Média',
  'alta': 'Alta'
}

function formatarDataHora(data: Date): string {
  return new Date(data).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function getStatusEvento(evento: Evento): string {
  const agora = new Date()
  const inicio = new Date(evento.dataInicio)
  const fim = new Date(evento.dataFim)
  
  if (evento.concluido) {
    return 'Concluído'
  } else if (fim < agora) {
    return 'Expirado'
  } else if (inicio <= agora && agora <= fim) {
    return 'Em andamento'
  } else if (inicio > agora) {
    return 'Agendado'
  }
  
  return ''
}
</script> 