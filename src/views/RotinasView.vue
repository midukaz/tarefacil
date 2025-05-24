<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
    <div class="max-w-4xl mx-auto px-4 py-8">
      <!-- Cabeçalho elegante -->
      <div class="mb-8">
        <h1 class="text-3xl font-light text-gray-900 dark:text-white mb-2">Rotinas</h1>
        <p class="text-gray-500 dark:text-gray-400 text-sm">Organize suas atividades diárias com consistência</p>
      </div>

      <!-- Navegação minimalista -->
      <div class="mb-8">
        <nav class="flex space-x-1 bg-white dark:bg-gray-800 rounded-xl p-1 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
          <button
            @click="rotinasStore.definirFiltro({ diasSemana: [] })"
            class="flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200"
            :class="rotinasStore.filtro.diasSemana.length === 0 
              ? 'bg-gray-900 dark:bg-indigo-600 text-white shadow-sm' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'"
          >
            Hoje
            <span v-if="rotinasStore.rotinasHoje.length > 0" 
              class="ml-2 text-xs opacity-75">
              {{ rotinasStore.rotinasHoje.length }}
            </span>
          </button>
          <button
            @click="mostrarTodasRotinas"
            class="flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200"
            :class="rotinasStore.filtro.diasSemana.length > 0 
              ? 'bg-gray-900 dark:bg-indigo-600 text-white shadow-sm' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'"
          >
            Todas
            <span v-if="rotinasStore.rotinas.length > 0" 
              class="ml-2 text-xs opacity-75">
              {{ rotinasStore.rotinas.length }}
            </span>
          </button>
        </nav>
      </div>

      <!-- Filtros elegantes -->
      <div class="mb-8">
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 transition-colors duration-200">
          <!-- Busca -->
          <div class="relative mb-4">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              v-model="rotinasStore.filtro.busca"
              type="search"
              placeholder="Buscar rotinas..."
              class="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border-0 rounded-lg focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 focus:bg-white dark:focus:bg-gray-600 transition-all duration-200 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
          
          <!-- Filtros em linha -->
          <div class="flex flex-wrap items-center gap-3">
            <!-- Filtros de dias da semana -->
            <div class="flex flex-wrap gap-2">
              <button
                v-for="dia in diasSemana"
                :key="dia.valor"
                @click="toggleDiaSemana(dia.valor)"
                class="px-3 py-2 text-xs font-medium rounded-lg border transition-all duration-200"
                :class="rotinasStore.filtro.diasSemana.includes(dia.valor)
                  ? 'bg-gray-900 dark:bg-indigo-600 text-white border-gray-900 dark:border-indigo-600'
                  : 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'"
              >
                {{ dia.abrev }}
              </button>
            </div>

            <div class="ml-auto">
              <button
                @click="mostrarFormulario = true"
                class="hidden lg:inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-indigo-600 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-indigo-700 transition-all duration-200 text-sm font-medium shadow-sm"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Nova rotina
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Lista de rotinas -->
      <div>
        <ListaRotinas
          :rotinas="rotinasStore.rotinasFiltradas"
          @editar="editarRotina"
          @excluir="excluirRotina"
          @atualizar-tarefa="atualizarTarefaRotina"
          @toggle-ativa="toggleAtiva"
          @executar="executarRotina"
        />
        
        <div v-if="rotinasStore.rotinasFiltradas.length === 0" class="text-center py-16">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
            <svg class="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Nenhuma rotina encontrada</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">Crie uma nova rotina ou ajuste os filtros</p>
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
          <RotinaForm
            :rotina="rotinaSelecionada"
            @salvar="salvarRotina"
            @cancelar="fecharFormulario"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRotinasStore } from '../stores/rotinas'
import type { Rotina, DiaSemana } from '../stores/rotinas'
import ListaRotinas from '../components/rotinas/ListaRotinas.vue'
import RotinaForm from '../components/rotinas/RotinaForm.vue'

const rotinasStore = useRotinasStore()
const mostrarFormulario = ref(false)
const rotinaSelecionada = ref<Rotina | undefined>()

const diasSemana = [
  { nome: 'Segunda', valor: 'segunda' as const, abrev: 'Seg' },
  { nome: 'Terça', valor: 'terca' as const, abrev: 'Ter' },
  { nome: 'Quarta', valor: 'quarta' as const, abrev: 'Qua' },
  { nome: 'Quinta', valor: 'quinta' as const, abrev: 'Qui' },
  { nome: 'Sexta', valor: 'sexta' as const, abrev: 'Sex' },
  { nome: 'Sábado', valor: 'sabado' as const, abrev: 'Sáb' },
  { nome: 'Domingo', valor: 'domingo' as const, abrev: 'Dom' }
]

// Carregar dados ao iniciar o componente
onMounted(() => {
  rotinasStore.carregarDados()
})

function mostrarTodasRotinas() {
  const todosDias: DiaSemana[] = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo']
  rotinasStore.definirFiltro({ diasSemana: todosDias })
}

function toggleDiaSemana(dia: DiaSemana) {
  const dias = [...rotinasStore.filtro.diasSemana]
  const index = dias.indexOf(dia)
  
  if (index >= 0) {
    dias.splice(index, 1)
  } else {
    dias.push(dia)
  }
  
  rotinasStore.definirFiltro({ diasSemana: dias })
}

function editarRotina(rotina: Rotina) {
  rotinaSelecionada.value = rotina
  mostrarFormulario.value = true
}

function excluirRotina(id: string) {
  if (confirm('Tem certeza que deseja excluir esta rotina?')) {
    rotinasStore.removerRotina(id)
  }
}

function salvarRotina(rotina: Omit<Rotina, 'id' | 'dataCriacao'>) {
  if (rotinaSelecionada.value) {
    rotinasStore.atualizarRotina(rotinaSelecionada.value.id, rotina)
  } else {
    rotinasStore.adicionarRotina(rotina)
  }
  fecharFormulario()
}

function atualizarTarefaRotina(rotinaId: string, tarefaId: string, concluida: boolean) {
  rotinasStore.atualizarTarefaRotina(rotinaId, tarefaId, concluida)
}

function toggleAtiva(rotinaId: string, ativa: boolean) {
  rotinasStore.atualizarRotina(rotinaId, { ativa })
}

function executarRotina(rotinaId: string) {
  // Obter a rotina selecionada
  const rotina = rotinasStore.rotinas.find(r => r.id === rotinaId)
  if (!rotina) return
  
  // Marcar todas as tarefas como concluídas
  rotina.tarefas.forEach(tarefa => {
    rotinasStore.atualizarTarefaRotina(rotinaId, tarefa.id, true)
  })
  
  // Registrar a execução
  rotinasStore.registrarExecucao(rotinaId)
  
  alert(`Rotina "${rotina.titulo}" finalizada com sucesso!`)
}

function fecharFormulario() {
  mostrarFormulario.value = false
  rotinaSelecionada.value = undefined
}
</script> 