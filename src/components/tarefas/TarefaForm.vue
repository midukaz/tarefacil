<template>
  <div class="overflow-hidden">
    <!-- Cabeçalho -->
    <div class="px-5 py-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
      <h3 class="text-lg font-medium text-gray-700">
        {{ tarefa ? 'Editar tarefa' : 'Nova tarefa' }}
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
          placeholder="Ex: Reunião de projeto"
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
          placeholder="Descreva os detalhes da tarefa"
        ></textarea>
      </div>

      <!-- Status e Prioridade -->
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label for="status" class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            id="status"
            v-model="form.status"
            class="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-md focus:ring-1 focus:ring-indigo-300 focus:border-indigo-300 outline-none"
          >
            <option value="pendente">Pendente</option>
            <option value="em_andamento">Em andamento</option>
            <option value="concluida">Concluída</option>
            <option value="arquivada">Arquivada</option>
          </select>
        </div>

        <div>
          <label for="prioridade" class="block text-sm font-medium text-gray-700 mb-1">Prioridade</label>
          <select
            id="prioridade"
            v-model="form.prioridade"
            class="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-md focus:ring-1 focus:ring-indigo-300 focus:border-indigo-300 outline-none"
          >
            <option value="baixa">Baixa</option>
            <option value="media">Média</option>
            <option value="alta">Alta</option>
          </select>
        </div>
      </div>

      <!-- Data de Vencimento -->
      <div>
        <label for="dataVencimento" class="block text-sm font-medium text-gray-700 mb-1">Data de Vencimento</label>
        <input
          type="date"
          id="dataVencimento"
          v-model="formattedDataVencimento"
          class="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-md focus:ring-1 focus:ring-indigo-300 focus:border-indigo-300 outline-none"
        />
      </div>

      <!-- Tags -->
      <div>
        <label for="tags" class="block text-sm font-medium text-gray-700 mb-1">Tags</label>
        <div class="flex">
          <input
            type="text"
            id="tags"
            v-model="novaTag"
            @keydown.enter.prevent="adicionarTag"
            placeholder="Digite uma tag e pressione Enter"
            class="flex-1 px-3 py-2 text-sm bg-white border border-gray-200 rounded-l-md focus:ring-1 focus:ring-indigo-300 focus:border-indigo-300 outline-none"
          />
          <button
            type="button"
            @click="adicionarTag"
            class="px-3 py-2 bg-gray-100 border border-gray-200 border-l-0 rounded-r-md text-gray-600 hover:bg-gray-200"
          >
            Adicionar
          </button>
        </div>
        
        <!-- Lista de tags -->
        <div class="mt-2 flex flex-wrap gap-2">
          <span
            v-for="tag in form.tags"
            :key="tag"
            class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
          >
            {{ tag }}
            <button
              type="button"
              @click="removerTag(tag)"
              class="ml-1.5 text-gray-400 hover:text-gray-600"
            >
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </span>
        </div>
      </div>

      <!-- Subtarefas - Interface simplificada -->
      <div>
        <div class="flex justify-between items-center mb-1">
          <label class="block text-sm font-medium text-gray-700">Subtarefas</label>
          <div class="flex gap-2">
            <button 
              type="button" 
              @click="marcarTodasSubtarefas(true)" 
              class="text-xs text-green-500 hover:text-green-600"
              v-if="form.subtarefas.length > 0"
            >
              Marcar todas
            </button>
            <button 
              type="button" 
              @click="marcarTodasSubtarefas(false)" 
              class="text-xs text-gray-500 hover:text-gray-600 ml-2"
              v-if="form.subtarefas.length > 0"
            >
              Desmarcar todas
            </button>
            <button 
              type="button" 
              @click="adicionarSubtarefa" 
              class="text-xs text-indigo-500 hover:text-indigo-600 ml-2"
            >
              + Adicionar
            </button>
          </div>
        </div>
        
        <div v-if="form.subtarefas.length === 0" class="text-sm text-gray-400 text-center py-2 border border-dashed border-gray-200 rounded-md">
          Nenhuma subtarefa adicionada
        </div>
        
        <ul v-else class="space-y-2">
          <li v-for="(subtarefa, index) in form.subtarefas" :key="subtarefa.id || index" class="flex items-center gap-2">
            <input
              type="checkbox"
              v-model="subtarefa.concluida"
              class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <input
              v-model="subtarefa.titulo"
              class="flex-1 px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-md focus:ring-1 focus:ring-indigo-300 focus:border-indigo-300 outline-none"
              placeholder="Nome da subtarefa"
            />
            <button 
              type="button" 
              @click="removerSubtarefa(index)" 
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
          class="px-4 py-2 text-sm font-medium text-white bg-indigo-500 border border-transparent rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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