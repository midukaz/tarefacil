<template>
  <div class="bg-white dark:bg-gray-800 transition-colors duration-200">
    <!-- Cabeçalho elegante -->
    <div class="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">
          {{ tarefa ? 'Editar tarefa' : 'Nova tarefa' }}
        </h3>
        <button 
          type="button" 
          @click="$emit('cancelar')" 
          class="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
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
          <label for="titulo" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Título</label>
          <input
            type="text"
            id="titulo"
            v-model="form.titulo"
            class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-0 rounded-lg focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 focus:bg-white dark:focus:bg-gray-600 transition-all duration-200 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            required
            placeholder="Ex: Reunião de projeto"
          />
        </div>

        <!-- Descrição -->
        <div>
          <label for="descricao" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Descrição</label>
          <textarea
            id="descricao"
            v-model="form.descricao"
            rows="3"
            class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-0 rounded-lg focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 focus:bg-white dark:focus:bg-gray-600 transition-all duration-200 text-sm resize-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="Descreva os detalhes da tarefa"
          ></textarea>
        </div>

        <!-- Status e Prioridade -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
            <select
              id="status"
              v-model="form.status"
              class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-0 rounded-lg focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 focus:bg-white dark:focus:bg-gray-600 transition-all duration-200 text-sm text-gray-900 dark:text-white"
            >
              <option value="pendente">Pendente</option>
              <option value="em_andamento">Em andamento</option>
              <option value="concluida">Concluída</option>
              <option value="arquivada">Arquivada</option>
            </select>
          </div>

          <div>
            <label for="prioridade" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Prioridade</label>
            <select
              id="prioridade"
              v-model="form.prioridade"
              class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-0 rounded-lg focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 focus:bg-white dark:focus:bg-gray-600 transition-all duration-200 text-sm text-gray-900 dark:text-white"
            >
              <option value="baixa">Baixa</option>
              <option value="media">Média</option>
              <option value="alta">Alta</option>
            </select>
          </div>
        </div>

        <!-- Data de Vencimento -->
        <div>
          <label for="dataVencimento" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Data de Vencimento</label>
          <input
            type="date"
            id="dataVencimento"
            v-model="formattedDataVencimento"
            class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-0 rounded-lg focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 focus:bg-white dark:focus:bg-gray-600 transition-all duration-200 text-sm text-gray-900 dark:text-white"
          />
        </div>

        <!-- Tags -->
        <div>
          <label for="tags" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags</label>
          <div class="flex gap-2">
            <input
              type="text"
              id="tags"
              v-model="novaTag"
              @keydown.enter.prevent="adicionarTag"
              placeholder="Digite uma tag e pressione Enter"
              class="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-700 border-0 rounded-lg focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 focus:bg-white dark:focus:bg-gray-600 transition-all duration-200 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
            <button
              type="button"
              @click="adicionarTag"
              class="px-4 py-3 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-lg text-gray-600 dark:text-gray-300 transition-colors text-sm font-medium"
            >
              Adicionar
            </button>
          </div>
          
          <!-- Lista de tags -->
          <div v-if="form.tags.length > 0" class="mt-3 flex flex-wrap gap-2">
            <span
              v-for="tag in form.tags"
              :key="tag"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
            >
              {{ tag }}
              <button
                type="button"
                @click="removerTag(tag)"
                class="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          </div>
        </div>

        <!-- Subtarefas -->
        <div>
          <div class="flex items-center justify-between mb-3">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Subtarefas</label>
            <div class="flex items-center gap-3">
              <button 
                v-if="form.subtarefas.length > 0"
                type="button" 
                @click="marcarTodasSubtarefas(true)" 
                class="text-xs text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
              >
                Marcar todas
              </button>
              <button 
                v-if="form.subtarefas.length > 0"
                type="button" 
                @click="marcarTodasSubtarefas(false)" 
                class="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                Desmarcar todas
              </button>
              <button 
                type="button" 
                @click="adicionarSubtarefa" 
                class="text-xs text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 font-medium transition-colors"
              >
                + Adicionar
              </button>
            </div>
          </div>
          
          <div v-if="form.subtarefas.length === 0" class="text-sm text-gray-400 dark:text-gray-500 text-center py-8 border-2 border-dashed border-gray-100 dark:border-gray-700 rounded-lg">
            Nenhuma subtarefa adicionada
          </div>
          
          <div v-else class="space-y-2">
            <div v-for="(subtarefa, index) in form.subtarefas" :key="subtarefa.id || index" class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <input
                type="checkbox"
                v-model="subtarefa.concluida"
                class="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-gray-900 dark:text-indigo-600 focus:ring-gray-200 dark:focus:ring-indigo-500 focus:ring-2 dark:bg-gray-700"
              />
              <input
                v-model="subtarefa.titulo"
                class="flex-1 px-3 py-2 bg-white dark:bg-gray-600 border-0 rounded-md focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-500 transition-all duration-200 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="Nome da subtarefa"
              />
              <button 
                type="button" 
                @click="removerSubtarefa(index)" 
                class="p-2 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
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
      <div class="flex gap-3 pt-6 mt-6 border-t border-gray-100 dark:border-gray-700">
        <button
          type="button"
          @click="$emit('cancelar')"
          class="flex-1 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          class="flex-1 px-4 py-3 text-sm font-medium text-white bg-gray-900 dark:bg-indigo-600 hover:bg-gray-800 dark:hover:bg-indigo-700 rounded-lg transition-colors"
        >
          {{ tarefa ? 'Atualizar' : 'Criar' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { Tarefa } from '../../stores/tarefas'

const props = defineProps<{
  tarefa?: Tarefa
}>()

const emit = defineEmits<{
  (e: 'salvar', tarefa: Omit<Tarefa, 'id' | 'dataCriacao'>): void
  (e: 'cancelar'): void
}>()

type FormType = {
  titulo: string;
  descricao: string;
  status: 'pendente' | 'em_andamento' | 'concluida' | 'arquivada';
  prioridade: 'baixa' | 'media' | 'alta';
  dataVencimento: Date | undefined;
  tags: string[];
  subtarefas: { id: string; titulo: string; concluida: boolean }[];
}

const form = ref<FormType>({
  titulo: '',
  descricao: '',
  status: 'pendente',
  prioridade: 'media',
  dataVencimento: undefined,
  tags: [],
  subtarefas: []
})

const novaTag = ref('')

// Formatação da data para o input type="date"
const formattedDataVencimento = computed({
  get() {
    if (!form.value.dataVencimento) return '';
    const date = new Date(form.value.dataVencimento);
    return date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
  },
  set(value: string) {
    form.value.dataVencimento = value ? new Date(value) : undefined;
  }
});

onMounted(() => {
  if (props.tarefa) {
    form.value = {
      titulo: props.tarefa.titulo,
      descricao: props.tarefa.descricao,
      status: props.tarefa.status,
      prioridade: props.tarefa.prioridade,
      dataVencimento: props.tarefa.dataVencimento,
      tags: [...props.tarefa.tags],
      subtarefas: props.tarefa.subtarefas.map(s => ({
        id: s.id,
        titulo: s.titulo,
        concluida: s.concluida
      }))
    }
  }
})

function adicionarTag() {
  if (novaTag.value.trim() && !form.value.tags.includes(novaTag.value.trim())) {
    form.value.tags.push(novaTag.value.trim())
    novaTag.value = ''
  }
}

function removerTag(tag: string) {
  form.value.tags = form.value.tags.filter(t => t !== tag)
}

function adicionarSubtarefa() {
  form.value.subtarefas.push({ 
    id: crypto.randomUUID(),
    titulo: '', 
    concluida: false 
  })
}

function removerSubtarefa(index: number) {
  form.value.subtarefas.splice(index, 1)
}

function marcarTodasSubtarefas(concluida: boolean) {
  form.value.subtarefas.forEach(subtarefa => {
    subtarefa.concluida = concluida;
  });
}

function salvar() {
  emit('salvar', form.value)
}
</script> 