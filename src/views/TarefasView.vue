<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
    <div class="max-w-4xl mx-auto px-4 py-8">
      <!-- Cabeçalho elegante -->
      <div class="mb-8">
        <h1 class="text-3xl font-light text-gray-900 dark:text-white mb-2">Tarefas</h1>
        <p class="text-gray-500 dark:text-gray-400 text-sm">Organize suas atividades com simplicidade</p>
      </div>

      <!-- Navegação minimalista -->
      <div class="mb-8">
        <nav class="flex space-x-1 bg-white dark:bg-gray-800 rounded-xl p-1 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
          <button
            @click="visualizacao = 'ativas'"
            class="flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200"
            :class="visualizacao === 'ativas' 
              ? 'bg-gray-900 dark:bg-indigo-600 text-white shadow-sm' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'"
          >
            Ativas
            <span v-if="tarefasStore.tarefasFiltradas.length > 0" 
              class="ml-2 text-xs opacity-75">
              {{ tarefasStore.tarefasFiltradas.length }}
            </span>
          </button>
          <button
            @click="visualizacao = 'arquivadas'"
            class="flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200"
            :class="visualizacao === 'arquivadas' 
              ? 'bg-gray-900 dark:bg-indigo-600 text-white shadow-sm' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'"
          >
            Arquivadas
            <span v-if="tarefasStore.tarefasArquivadas.length > 0" 
              class="ml-2 text-xs opacity-75">
              {{ tarefasStore.tarefasArquivadas.length }}
            </span>
          </button>
        </nav>
      </div>

      <!-- Filtros elegantes (apenas para tarefas ativas) -->
      <div v-if="visualizacao === 'ativas'" class="mb-8">
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 transition-colors duration-200">
          <!-- Busca -->
          <div class="relative mb-4">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              v-model="tarefasStore.filtro.busca"
              type="search"
              placeholder="Buscar tarefas..."
              class="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border-0 rounded-lg focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 focus:bg-white dark:focus:bg-gray-600 transition-all duration-200 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
          
          <!-- Filtros em linha -->
          <div class="flex flex-wrap items-center gap-3">
            <select
              v-model="tarefasStore.filtro.status"
              class="px-3 py-2 bg-gray-50 dark:bg-gray-700 border-0 rounded-lg text-sm focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 transition-all duration-200 text-gray-900 dark:text-white"
            >
              <option value="todos">Todos os status</option>
              <option value="pendente">Pendente</option>
              <option value="em_andamento">Em andamento</option>
              <option value="concluida">Concluída</option>
            </select>
            
            <select 
              v-model="tarefasStore.filtro.prioridade" 
              class="px-3 py-2 bg-gray-50 dark:bg-gray-700 border-0 rounded-lg text-sm focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 transition-all duration-200 text-gray-900 dark:text-white"
            >
              <option value="todos">Todas prioridades</option>
              <option value="baixa">Baixa</option>
              <option value="media">Média</option>
              <option value="alta">Alta</option>
            </select>

            <div class="ml-auto">
              <button
                @click="mostrarFormulario = true"
                class="hidden lg:inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-indigo-600 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-indigo-700 transition-all duration-200 text-sm font-medium shadow-sm"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Nova tarefa
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Lista de tarefas -->
      <div>
        <!-- Tarefas ativas -->
        <div v-if="visualizacao === 'ativas'">
          <ListaTarefas
            :tarefas="tarefasStore.tarefasFiltradas"
            @editar="editarTarefa"
            @excluir="excluirTarefa"
            @atualizar-subtarefa="atualizarSubtarefa"
            @arquivar="marcarComoArquivada"
          />
          
          <div v-if="tarefasStore.tarefasFiltradas.length === 0" class="text-center py-16">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
              <svg class="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Nenhuma tarefa encontrada</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">Crie uma nova tarefa ou ajuste os filtros</p>
          </div>
        </div>

        <!-- Tarefas arquivadas -->
        <div v-if="visualizacao === 'arquivadas'">
          <ListaTarefas
            :tarefas="tarefasStore.tarefasArquivadas"
            @editar="editarTarefa"
            @excluir="excluirTarefa"
            @atualizar-subtarefa="atualizarSubtarefa"
            @arquivar="desarquivarTarefa"
          />
          
          <div v-if="tarefasStore.tarefasArquivadas.length === 0" class="text-center py-16">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
              <svg class="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Nenhuma tarefa arquivada</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">As tarefas arquivadas aparecerão aqui</p>
          </div>
        </div>
      </div>

      <!-- Botão flutuante elegante -->
      <button
        @click="mostrarFormulario = true"
        class="fixed bottom-6 right-6 w-14 h-14 bg-gray-900 dark:bg-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center lg:hidden"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>

    <!-- Modal elegante -->
    <transition 
      enter-active-class="transition duration-300 ease-out" 
      enter-from-class="opacity-0" 
      enter-to-class="opacity-100" 
      leave-active-class="transition duration-200 ease-in" 
      leave-from-class="opacity-100" 
      leave-to-class="opacity-0"
    >
      <div
        v-if="mostrarFormulario"
        class="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4"
        @click.self="fecharFormulario"
      >
        <div 
          class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-all duration-300"
          :class="{ 'scale-100 opacity-100': mostrarFormulario, 'scale-95 opacity-0': !mostrarFormulario }"
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

const tarefasStore = useTarefasStore()
const mostrarFormulario = ref(false)
const tarefaSelecionada = ref<Tarefa | undefined>()
const visualizacao = ref<'ativas' | 'arquivadas'>('ativas')

// Carregar dados ao iniciar o componente
onMounted(() => {
  tarefasStore.carregarDados()
})

function editarTarefa(tarefa: Tarefa) {
  tarefaSelecionada.value = tarefa
  mostrarFormulario.value = true
}

function excluirTarefa(id: string) {
  if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
    tarefasStore.removerTarefa(id)
  }
}

function salvarTarefa(tarefa: Omit<Tarefa, 'id' | 'dataCriacao'>) {
  if (tarefaSelecionada.value) {
    tarefasStore.atualizarTarefa(tarefaSelecionada.value.id, tarefa)
  } else {
    tarefasStore.adicionarTarefa(tarefa)
  }
  fecharFormulario()
}

function marcarComoArquivada(id: string) {
  if (confirm('Deseja arquivar esta tarefa?')) {
    tarefasStore.marcarComoArquivada(id, true)
  }
}

function desarquivarTarefa(id: string) {
  if (confirm('Deseja desarquivar esta tarefa?')) {
    tarefasStore.marcarComoArquivada(id, false)
  }
}

function atualizarSubtarefa(tarefaId: string, subtarefaId: string, concluida: boolean) {
  tarefasStore.atualizarSubtarefa(tarefaId, subtarefaId, concluida)
}

function fecharFormulario() {
  mostrarFormulario.value = false
  tarefaSelecionada.value = undefined
}
</script> 