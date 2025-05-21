<template>
  <div class="overflow-hidden">
    <!-- Cabeçalho -->
    <div class="px-5 py-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
      <h3 class="text-lg font-medium text-gray-700">
        {{ evento ? 'Editar evento' : 'Novo evento' }}
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
          placeholder="Ex: Reunião de equipe"
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
          placeholder="Descreva os detalhes do evento"
        ></textarea>
      </div>

      <!-- Data e horário -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="dataInicio" class="block text-sm font-medium text-gray-700 mb-1">Data e hora de início</label>
          <input
            type="datetime-local"
            id="dataInicio"
            v-model="form.dataInicioStr"
            class="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-md focus:ring-1 focus:ring-indigo-300 focus:border-indigo-300 outline-none"
            required
          />
        </div>
        <div>
          <label for="dataFim" class="block text-sm font-medium text-gray-700 mb-1">Data e hora de término</label>
          <input
            type="datetime-local"
            id="dataFim"
            v-model="form.dataFimStr"
            class="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-md focus:ring-1 focus:ring-indigo-300 focus:border-indigo-300 outline-none"
            required
          />
        </div>
      </div>

      <!-- Local -->
      <div>
        <label for="local" class="block text-sm font-medium text-gray-700 mb-1">Local</label>
        <input
          type="text"
          id="local"
          v-model="form.local"
          class="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-md focus:ring-1 focus:ring-indigo-300 focus:border-indigo-300 outline-none"
          placeholder="Ex: Sala de reuniões"
        />
      </div>

      <!-- Categoria -->
      <div>
        <label for="categoria" class="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
        <input
          type="text"
          id="categoria"
          list="categorias-disponiveis"
          v-model="form.categoria"
          class="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-md focus:ring-1 focus:ring-indigo-300 focus:border-indigo-300 outline-none"
          placeholder="Ex: Trabalho, Pessoal, Estudos"
        />
        <datalist id="categorias-disponiveis">
          <option v-for="categoria in categorias" :key="categoria" :value="categoria" />
        </datalist>
      </div>

      <!-- Prioridade -->
      <div>
        <span class="block text-sm font-medium text-gray-700 mb-1">Prioridade</span>
        <div class="flex gap-4">
          <label class="inline-flex items-center">
            <input type="radio" v-model="form.prioridade" value="baixa" class="form-radio text-amber-500 h-4 w-4" />
            <span class="ml-2 text-sm text-gray-700">Baixa</span>
          </label>
          <label class="inline-flex items-center">
            <input type="radio" v-model="form.prioridade" value="media" class="form-radio text-amber-500 h-4 w-4" />
            <span class="ml-2 text-sm text-gray-700">Média</span>
          </label>
          <label class="inline-flex items-center">
            <input type="radio" v-model="form.prioridade" value="alta" class="form-radio text-amber-500 h-4 w-4" />
            <span class="ml-2 text-sm text-gray-700">Alta</span>
          </label>
        </div>
      </div>

      <!-- Lembretes -->
      <div>
        <div class="flex justify-between items-center mb-1">
          <label class="block text-sm font-medium text-gray-700">Lembretes</label>
          <button 
            type="button" 
            @click="adicionarLembrete" 
            class="text-xs text-amber-500 hover:text-amber-600"
          >
            + Adicionar
          </button>
        </div>
        
        <div v-if="form.lembretes.length === 0" class="text-sm text-gray-400 text-center py-2 border border-dashed border-gray-200 rounded-md">
          Nenhum lembrete definido
        </div>
        
        <ul v-else class="space-y-2">
          <li v-for="(lembrete, index) in form.lembretes" :key="index" class="flex items-center gap-2">
            <input
              type="datetime-local"
              v-model="lembrete.dataStr"
              class="flex-1 px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-md focus:ring-1 focus:ring-indigo-300 focus:border-indigo-300 outline-none"
            />
            <button 
              type="button" 
              @click="removerLembrete(index)" 
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
          {{ evento ? 'Atualizar' : 'Criar' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { Evento, Lembrete } from '../../stores/eventos'
import { formatISO, parseISO } from 'date-fns'

const props = defineProps<{
  evento?: Evento
  categorias?: string[]
}>()

const emit = defineEmits<{
  (e: 'salvar', evento: Omit<Evento, 'id' | 'dataCriacao'>): void
  (e: 'cancelar'): void
}>()

interface FormLembrete {
  dataStr: string
}

// Utilizamos strings para os campos de data para compatibilidade com inputs datetime-local
const form = ref({
  titulo: '',
  descricao: '',
  dataInicioStr: formatISO(new Date(), { representation: 'date' }) + 'T' + new Date().toTimeString().slice(0, 5),
  dataFimStr: formatISO(new Date(Date.now() + 3600000), { representation: 'date' }) + 'T' + new Date(Date.now() + 3600000).toTimeString().slice(0, 5),
  local: '',
  categoria: '',
  prioridade: 'media' as 'baixa' | 'media' | 'alta',
  concluido: false,
  lembretes: [] as FormLembrete[]
})

onMounted(() => {
  if (props.evento) {
    form.value = {
      titulo: props.evento.titulo,
      descricao: props.evento.descricao,
      dataInicioStr: formatDateTimeLocal(props.evento.dataInicio),
      dataFimStr: formatDateTimeLocal(props.evento.dataFim),
      local: props.evento.local,
      categoria: props.evento.categoria,
      prioridade: props.evento.prioridade,
      concluido: props.evento.concluido,
      lembretes: props.evento.lembretes.map(l => ({
        dataStr: formatDateTimeLocal(l.data)
      }))
    }
  }
})

function formatDateTimeLocal(date: Date): string {
  return formatISO(date).slice(0, 16) // Formato yyyy-MM-ddThh:mm
}

function adicionarLembrete() {
  form.value.lembretes.push({ 
    dataStr: formatDateTimeLocal(new Date(Date.now() - 3600000)) // 1 hora antes do atual
  })
}

function removerLembrete(index: number) {
  form.value.lembretes.splice(index, 1)
}

function salvar() {
  // Validar que a data de término é posterior à de início
  const dataInicio = parseISO(form.value.dataInicioStr)
  const dataFim = parseISO(form.value.dataFimStr)
  
  if (dataFim <= dataInicio) {
    alert('A data de término deve ser posterior à de início')
    return
  }
  
  // Converter os lembretes de string para Date
  const lembretes = form.value.lembretes
    .map(l => ({
      id: '', // A store vai gerar os IDs
      data: parseISO(l.dataStr),
      enviado: false
    }))
  
  // Emitir o evento com o objeto completo
  emit('salvar', {
    titulo: form.value.titulo,
    descricao: form.value.descricao,
    dataInicio,
    dataFim,
    local: form.value.local,
    categoria: form.value.categoria,
    prioridade: form.value.prioridade,
    concluido: form.value.concluido,
    lembretes
  })
}
</script> 