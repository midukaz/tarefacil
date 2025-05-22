<template>
  <div class="space-y-4">
    <!-- Lista de Eventos -->
    <div class="space-y-4">
      <div
        v-for="evento in eventos"
        :key="evento.id"
        class="bg-white shadow-sm rounded-lg overflow-hidden"
      >
        <div class="px-4 py-5 sm:p-6">
          <div class="flex justify-between items-start">
            <div class="flex items-start gap-3">
              <div
                class="w-3 h-3 rounded-full mt-2"
                :class="getPrioridadeColor(evento.prioridade)"
              ></div>
              <div>
                <h3 class="text-lg font-medium text-gray-900">{{ evento.titulo }}</h3>
                <p class="text-sm text-gray-500 mt-1">{{ evento.descricao }}</p>
              </div>
            </div>

            <div class="flex items-center space-x-2">
              <button
                @click="$emit('editar', evento)"
                class="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
              >
                Editar
              </button>
              <button
                @click="$emit('excluir', evento.id)"
                class="inline-flex items-center rounded-md border border-transparent bg-red-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Excluir
              </button>
            </div>
          </div>

          <!-- Detalhes do evento -->
          <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="bg-gray-50 rounded-md p-3">
              <div class="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span class="font-medium">Data e hora</span>
              </div>
              <div class="text-sm text-gray-700">
                <div>Início: {{ formatarDataHora(evento.dataInicio) }}</div>
                <div>Término: {{ formatarDataHora(evento.dataFim) }}</div>
                <div class="text-xs text-gray-500 mt-1">Duração: {{ calcularDuracao(evento.dataInicio, evento.dataFim) }}</div>
              </div>
            </div>
            
            <div class="bg-gray-50 rounded-md p-3">
              <div class="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span class="font-medium">Local</span>
              </div>
              <div class="text-sm text-gray-700">
                {{ evento.local || 'Não especificado' }}
              </div>
            </div>
          </div>

          <!-- Tags de categoria e status -->
          <div class="mt-4 flex items-center gap-2">
            <span 
              v-if="evento.categoria" 
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800"
            >
              {{ evento.categoria }}
            </span>
            
            <span 
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
              :class="evento.concluido ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'"
            >
              {{ evento.concluido ? 'Concluído' : 'Pendente' }}
            </span>
          </div>

          <!-- Lembretes -->
          <div v-if="evento.lembretes.length > 0" class="mt-4">
            <h4 class="text-sm font-medium text-gray-700 mb-2">Lembretes</h4>
            <ul class="space-y-1">
              <li
                v-for="lembrete in evento.lembretes"
                :key="lembrete.id"
                class="flex items-center gap-2 text-sm"
              >
                <span
                  class="inline-flex items-center px-2 py-0.5 rounded text-xs"
                  :class="lembrete.enviado ? 'bg-gray-100 text-gray-600' : 'bg-amber-50 text-amber-700'"
                >
                  {{ formatarDataHora(lembrete.data) }}
                </span>
                <span v-if="lembrete.enviado" class="text-xs text-gray-500">
                  (Enviado)
                </span>
              </li>
            </ul>
          </div>

          <!-- Controle rápido para marcar como concluído -->
          <div class="mt-4 pt-3 border-t border-gray-100">
            <div class="flex items-center">
              <input
                type="checkbox"
                :checked="evento.concluido"
                @change="handleConcluidoChange(evento.id, $event)"
                class="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
              />
              <label class="ml-2 text-sm text-gray-700">
                Marcar como concluído
              </label>
            </div>
          </div>

          <!-- Data de criação -->
          <div class="mt-4 text-xs text-gray-400">
            Criado em: {{ formatarData(evento.dataCriacao) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { format, formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { Evento } from '@/stores/eventos'

const props = defineProps<{
  eventos: Evento[]
}>()

const emit = defineEmits<{
  (e: 'editar', evento: Evento): void
  (e: 'excluir', id: string): void
  (e: 'concluir', id: string, concluido: boolean): void
}>()

function formatarData(data: Date): string {
  return format(new Date(data), 'dd/MM/yyyy', { locale: ptBR })
}

function formatarDataHora(data: Date): string {
  return format(new Date(data), 'dd/MM/yyyy HH:mm', { locale: ptBR })
}

function calcularDuracao(inicio: Date, fim: Date): string {
  return formatDistance(new Date(fim), new Date(inicio), { locale: ptBR })
}

function getPrioridadeColor(prioridade: string): string {
  switch (prioridade) {
    case 'alta':
      return 'bg-red-500'
    case 'media':
      return 'bg-amber-500'
    case 'baixa':
      return 'bg-green-500'
    default:
      return 'bg-gray-500'
  }
}

function handleConcluidoChange(id: string, event: Event) {
  const target = event.target as HTMLInputElement
  emit('concluir', id, target.checked)
}
</script> 