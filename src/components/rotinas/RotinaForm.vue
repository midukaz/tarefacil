<template>
  <div class="overflow-hidden">
    <!-- Cabeçalho -->
    <div class="px-5 py-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
      <h3 class="text-lg font-medium text-gray-700">
        {{ rotina ? 'Editar rotina' : 'Nova rotina' }}
      </h3>
      <button 
        type="button" 
        @click="$emit('cancelar')" 
        class="text-gray-400 hover:text-gray-500"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    
    <!-- Formulário -->
    <form @submit.prevent="salvar" class="p-5 space-y-5">
      <!-- Título -->
      <div>
        <label for="titulo" class="block text-sm font-medium text-gray-700 mb-1">Título</label>
        <input
          type="text"
          id="titulo"
          v-model="form.titulo"
          class="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-md focus:ring-1 focus:ring-indigo-300 focus:border-indigo-300 outline-none"
          required
          placeholder="Ex: Exercícios matinais"
        />
      </div>

      <!-- Descrição -->
      <div>
        <label for="descricao" class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
        <textarea
          id="descricao"
          v-model="form.descricao"
          rows="3"
          class="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-md focus:ring-1 focus:ring-indigo-300 focus:border-indigo-300 outline-none"
          placeholder="Descreva os detalhes da rotina"
        ></textarea>
      </div>

      <!-- Horário -->
      <div>
        <label for="horario" class="block text-sm font-medium text-gray-700 mb-1">Horário</label>
        <input
          type="time"
          id="horario"
          v-model="form.horario"
          class="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-md focus:ring-1 focus:ring-indigo-300 focus:border-indigo-300 outline-none"
          required
        />
      </div>

      <!-- Dias da semana -->
      <div>
        <span class="block text-sm font-medium text-gray-700 mb-3">Dias da semana</span>
        <div class="flex flex-wrap gap-2">
          <label 
            v-for="dia in diasSemana" 
            :key="dia.valor" 
            class="inline-flex items-center border rounded-md px-3 py-2 cursor-pointer text-sm"
            :class="form.diasSemana.includes(dia.valor) ? 'bg-amber-50 border-amber-200 text-amber-800' : 'bg-white border-gray-200 text-gray-600'"
          >
            <input 
              type="checkbox" 
              :value="dia.valor" 
              v-model="form.diasSemana" 
              class="sr-only"
            />
            <span>{{ dia.nome }}</span>
          </label>
        </div>
      </div>

      <!-- Ativa toggle -->
      <div class="flex items-center">
        <button 
          type="button"
          @click="form.ativa = !form.ativa"
          class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
          :class="form.ativa ? 'bg-amber-500' : 'bg-gray-200'"
        >
          <span
            class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
            :class="form.ativa ? 'translate-x-6' : 'translate-x-1'"
          ></span>
        </button>
        <span class="ml-3 text-sm font-medium text-gray-700">
          {{ form.ativa ? 'Rotina ativa' : 'Rotina inativa' }}
        </span>
      </div>

      <!-- Tarefas da rotina -->
      <div>
        <div class="flex justify-between items-center mb-1">
          <label class="block text-sm font-medium text-gray-700">Tarefas da rotina</label>
          <button 
            type="button" 
            @click="adicionarTarefa" 
            class="text-xs text-amber-500 hover:text-amber-600"
          >
            + Adicionar
          </button>
        </div>
        
        <div v-if="form.tarefas.length === 0" class="text-sm text-gray-400 text-center py-2 border border-dashed border-gray-200 rounded-md">
          Nenhuma tarefa adicionada
        </div>
        
        <ul v-else class="space-y-2">
          <li v-for="(tarefa, index) in form.tarefas" :key="index" class="flex items-center gap-2">
            <input
              v-model="tarefa.titulo"
              class="flex-1 px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-md focus:ring-1 focus:ring-indigo-300 focus:border-indigo-300 outline-none"
              placeholder="Nome da tarefa"
            />
            <button 
              type="button" 
              @click="removerTarefa(index)" 
              class="text-gray-400 hover:text-gray-600"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </li>
        </ul>
      </div>

      <!-- Botões -->
      <div class="flex justify-end gap-3 pt-2">
        <button
          type="button"
          @click="$emit('cancelar')"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          class="px-4 py-2 text-sm font-medium text-white bg-amber-500 border border-transparent rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
        >
          {{ rotina ? 'Atualizar' : 'Criar' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Rotina, DiaSemana, TarefaRotina } from '../../stores/rotinas'

const props = defineProps<{
  rotina?: Rotina
}>()

const emit = defineEmits<{
  (e: 'salvar', rotina: Omit<Rotina, 'id' | 'dataCriacao'>): void
  (e: 'cancelar'): void
}>()

interface FormTarefa {
  titulo: string;
  concluida: boolean;
}

const form = ref({
  titulo: '',
  descricao: '',
  horario: '08:00',
  diasSemana: [] as DiaSemana[],
  ativa: true,
  tarefas: [] as FormTarefa[]
})

const diasSemana = [
  { nome: 'Segunda', valor: 'segunda' as const },
  { nome: 'Terça', valor: 'terca' as const },
  { nome: 'Quarta', valor: 'quarta' as const },
  { nome: 'Quinta', valor: 'quinta' as const },
  { nome: 'Sexta', valor: 'sexta' as const },
  { nome: 'Sábado', valor: 'sabado' as const },
  { nome: 'Domingo', valor: 'domingo' as const }
]

onMounted(() => {
  if (props.rotina) {
    form.value = {
      titulo: props.rotina.titulo,
      descricao: props.rotina.descricao,
      horario: props.rotina.horario,
      diasSemana: [...props.rotina.diasSemana],
      ativa: props.rotina.ativa,
      tarefas: props.rotina.tarefas.map(t => ({
        titulo: t.titulo,
        concluida: t.concluida
      }))
    }
  }
})

function adicionarTarefa() {
  form.value.tarefas.push({ titulo: '', concluida: false })
}

function removerTarefa(index: number) {
  form.value.tarefas.splice(index, 1)
}

function salvar() {
  if (form.value.diasSemana.length === 0) {
    alert('Selecione pelo menos um dia da semana')
    return
  }
  
  // Remover tarefas com título vazio
  const tarefasValidas = form.value.tarefas.filter(t => t.titulo.trim() !== '')
  
  // Importante: Omitimos o campo id das tarefas aqui, mas a store vai adicionar no momento da criação
  emit('salvar', {
    ...form.value,
    tarefas: tarefasValidas
  })
}
</script> 