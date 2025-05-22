<template>
  <div class="max-w-5xl mx-auto w-full p-4 py-6">
    <!-- Título da página -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Tarefas</h1>
      <p class="text-gray-600">Organize suas tarefas e acompanhe seu progresso</p>
    </div>

    <!-- Barra de filtros -->
    <div class="bg-white rounded-lg shadow-sm mb-6 p-4">
      <div class="flex flex-col gap-4">
        <!-- Busca -->
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            v-model="store.filtro.busca"
            type="search"
            placeholder="Buscar tarefas..."
            class="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-md focus:ring-1 focus:ring-indigo-300 focus:border-indigo-300 outline-none"
          />
        </div>
        
        <!-- Seletores de filtro -->
        <div class="flex flex-wrap gap-3">
          <div class="text-sm text-gray-500 self-center mr-2">Filtrar por:</div>
          <select 
            v-model="store.filtro.status" 
            class="text-sm rounded-md border-gray-200  py-1.5 pr-8 focus:ring-1 focus:ring-indigo-300 focus:border-indigo-300"
          >
            <option value="todos">Todos os status</option>
            <option value="pendente">Pendente</option>
            <option value="em_andamento">Em andamento</option>
            <option value="concluida">Concluída</option>
          </select>
          
          <select 
            v-model="store.filtro.prioridade" 
            class="text-sm rounded-md border-gray-200 py-1.5 pr-8 focus:ring-1 focus:ring-indigo-300 focus:border-indigo-300"
          >
            <option value="todos">Todas prioridades</option>
            <option value="baixa">Baixa</option>
            <option value="media">Média</option>
            <option value="alta">Alta</option>
          </select>

          <button
            @click="mostrarFormulario = true"
            class="ml-auto flex items-center gap-1.5 rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-600 transition-colors hidden md:block "
          >
            Nova tarefa
          </button>
        </div>
      </div>
    </div>

    <!-- Lista de tarefas -->
    <div>
      <ListaTarefas
        :tarefas="store.tarefasFiltradas"
        @editar="editarTarefa"
        @excluir="excluirTarefa"
        @atualizar-subtarefa="atualizarSubtarefa"
      />
      
      <div v-if="store.tarefasFiltradas.length === 0" class="py-12 flex flex-col items-center justify-center text-center">
        <svg class="w-16 h-16 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <p class="text-gray-500 mb-1">Nenhuma tarefa encontrada</p>
        <p class="text-sm text-gray-400">Crie uma nova tarefa ou ajuste os filtros</p>
      </div>
    </div>

    <!-- Botão flutuante minimalista -->
    <button
      @click="mostrarFormulario = true"
      class="fixed bottom-5 right-5 z-40 flex md:hidden items-center justify-center w-12 h-12 rounded-full bg-indigo-500 text-white shadow-lg hover:bg-indigo-600 transition-colors"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
    </button>

    <!-- Modal suave e minimalista -->
    <transition 
      enter-active-class="transition duration-200 ease-out" 
      enter-from-class="opacity-0" 
      enter-to-class="opacity-100" 
      leave-active-class="transition duration-150 ease-in" 
      leave-from-class="opacity-100" 
      leave-to-class="opacity-0"
    >
      <div
        v-if="mostrarFormulario"
        class="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4"
        @click.self="fecharFormulario"
      >
        <div 
          class="bg-white rounded-lg shadow-xl max-w-md w-full transform transition-all"
          :class="{ 'opacity-100 scale-100': mostrarFormulario, 'opacity-0 scale-95': !mostrarFormulario }"
        >
          <TarefaForm
            :tarefa="tarefaSelecionada"
            @salvar="salvarTarefa"
            @cancelar="fecharFormulario"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTarefasStore } from '../stores/tarefas'
import type { Tarefa } from '../stores/tarefas'
import ListaTarefas from '../components/tarefas/ListaTarefas.vue'
import TarefaForm from '../components/tarefas/TarefaForm.vue'

const store = useTarefasStore()
const mostrarFormulario = ref(false)
const tarefaSelecionada = ref<Tarefa | undefined>()

// Carregar dados ao iniciar o componente
onMounted(() => {
  store.carregarDados()
})

function editarTarefa(tarefa: Tarefa) {
  tarefaSelecionada.value = tarefa
  mostrarFormulario.value = true
}

function excluirTarefa(id: string) {
  if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
    store.removerTarefa(id)
  }
}

function salvarTarefa(tarefa: Omit<Tarefa, 'id' | 'dataCriacao'>) {
  if (tarefaSelecionada.value) {
    store.atualizarTarefa(tarefaSelecionada.value.id, tarefa)
  } else {
    store.adicionarTarefa(tarefa)
  }
  fecharFormulario()
}

function atualizarSubtarefa(tarefaId: string, subtarefaId: string, concluida: boolean) {
  store.atualizarSubtarefa(tarefaId, subtarefaId, concluida)
}

function fecharFormulario() {
  mostrarFormulario.value = false
  tarefaSelecionada.value = undefined
}
</script> 