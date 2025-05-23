<template>
  <div class="bg-white">
    <!-- Cabeçalho elegante -->
    <div class="px-6 py-4 border-b border-gray-100">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-medium text-gray-900">
          {{ rotina ? 'Editar rotina' : 'Nova rotina' }}
        </h3>
        <button 
          type="button" 
          @click="$emit('cancelar')" 
          class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Formulário -->
    <form @submit.prevent="salvar" class="p-6">
      <div class="space-y-6">
        <!-- Título -->
        <div>
          <label for="titulo" class="block text-sm font-medium text-gray-700 mb-2">Título</label>
          <input
            type="text"
            id="titulo"
            v-model="form.titulo"
            class="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-gray-200 focus:bg-white transition-all duration-200 text-sm"
            required
            placeholder="Ex: Exercícios matinais"
          />
        </div>

        <!-- Descrição -->
        <div>
          <label for="descricao" class="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
          <textarea
            id="descricao"
            v-model="form.descricao"
            rows="3"
            class="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-gray-200 focus:bg-white transition-all duration-200 text-sm resize-none"
            placeholder="Descreva os detalhes da rotina"
          ></textarea>
        </div>

        <!-- Horário -->
        <div>
          <label for="horario" class="block text-sm font-medium text-gray-700 mb-2">Horário</label>
          <input
            type="time"
            id="horario"
            v-model="form.horario"
            class="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-gray-200 focus:bg-white transition-all duration-200 text-sm"
            required
          />
        </div>

        <!-- Dias da semana -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-3">Dias da semana</label>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <label 
              v-for="dia in diasSemana" 
              :key="dia.valor" 
              class="relative flex items-center cursor-pointer"
            >
              <input 
                type="checkbox" 
                :value="dia.valor" 
                v-model="form.diasSemana" 
                class="sr-only"
              />
              <div
                class="flex items-center justify-center w-full px-3 py-2.5 text-sm font-medium rounded-lg border transition-all duration-200"
                :class="form.diasSemana.includes(dia.valor) 
                  ? 'bg-gray-900 text-white border-gray-900 shadow-sm' 
                  : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'"
              >
                {{ dia.nome }}
              </div>
            </label>
          </div>
        </div>

        <!-- Status ativo/inativo -->
        <div class="flex items-center gap-3">
          <button 
            type="button"
            @click="form.ativa = !form.ativa"
            class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
            :class="form.ativa ? 'bg-gray-900' : 'bg-gray-200'"
          >
            <span
              class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
              :class="form.ativa ? 'translate-x-6' : 'translate-x-1'"
            ></span>
          </button>
          <span class="text-sm font-medium text-gray-700">
            {{ form.ativa ? 'Rotina ativa' : 'Rotina inativa' }}
          </span>
        </div>

        <!-- Tarefas da rotina -->
        <div>
          <div class="flex items-center justify-between mb-3">
            <label class="block text-sm font-medium text-gray-700">Tarefas da rotina</label>
            <button 
              type="button" 
              @click="adicionarTarefa" 
              class="text-xs text-gray-900 hover:text-gray-700 font-medium transition-colors"
            >
              + Adicionar
            </button>
          </div>
          
          <div v-if="form.tarefas.length === 0" class="text-sm text-gray-400 text-center py-8 border-2 border-dashed border-gray-100 rounded-lg">
            Nenhuma tarefa adicionada
          </div>
          
          <div v-else class="space-y-2">
            <div v-for="(tarefa, index) in form.tarefas" :key="index" class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <input
                v-model="tarefa.titulo"
                class="flex-1 px-3 py-2 bg-white border-0 rounded-md focus:ring-2 focus:ring-gray-200 transition-all duration-200 text-sm"
                placeholder="Nome da tarefa"
              />
              <button 
                type="button" 
                @click="removerTarefa(index)" 
                class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Botões -->
      <div class="flex gap-3 pt-6 mt-6 border-t border-gray-100">
        <button
          type="button"
          @click="$emit('cancelar')"
          class="flex-1 px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          class="flex-1 px-4 py-3 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors"
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
  id?: string;
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
  // Validação do formulário
  if (!form.value.titulo.trim()) {
    alert('O título da rotina é obrigatório');
    return;
  }
  
  if (form.value.diasSemana.length === 0) {
    alert('Selecione pelo menos um dia da semana');
    return;
  }
  
  // Remover tarefas com título vazio
  const tarefasValidas = form.value.tarefas.filter(t => t.titulo.trim() !== '');
  
  // Adicionar ID às tarefas para facilitar a manipulação
  const tarefasComId = tarefasValidas.map(t => ({
    ...t,
    id: t.id || Math.random().toString(36).substring(2, 9)
  }));
  
  // Emite o evento para salvar a rotina
  emit('salvar', {
    ...form.value,
    tarefas: tarefasComId
  });
}
</script> 