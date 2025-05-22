<template>
  <div class="max-w-5xl mx-auto w-full p-4 py-6">
    <!-- Título da página -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Rotinas</h1>
      <p class="text-gray-600">Estabeleça hábitos e rotinas diárias</p>
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
            placeholder="Buscar rotinas..."
            class="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-md focus:ring-1 focus:ring-amber-300 focus:border-amber-300 outline-none"
          />
        </div>
        
        <!-- Filtros de dias da semana -->
        <div class="flex flex-col sm:flex-row flex-wrap gap-2">
          <div class="text-sm text-gray-500 self-center mr-2">Filtrar por dia:</div>
          
          <div class="flex flex-wrap gap-1.5">
            <button
              v-for="dia in diasSemana"
              :key="dia.valor"
              @click="toggleFiltroDia(dia.valor)"
              class="px-2.5 py-1 text-xs font-medium rounded-md transition-colors"
              :class="[
                store.filtro.diasSemana.includes(dia.valor) 
                  ? 'bg-amber-100 text-amber-800' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
            >
              {{ dia.nome }}
            </button>
            
            <button
              v-if="store.filtro.diasSemana.length > 0"
              @click="limparFiltroDias"
              class="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors ml-1"
            >
              Limpar
            </button>
          </div>

          <button
            @click="mostrarFormulario = true"
            class="ml-auto flex items-center gap-1.5 rounded-md bg-amber-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-amber-600 transition-colors sm:mt-0 mt-2"
          >
            <svg class="w-4 h-4" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>Nova rotina</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Lista de rotinas -->
    <div>
      <ListaRotinas
        :rotinas="store.rotinasFiltradas"
        @editar="editarRotina"
        @excluir="excluirRotina"
        @atualizar-tarefa="atualizarTarefaRotina"
        @finalizar-rotina="finalizarRotina"
      />
      
      <div v-if="store.rotinasFiltradas.length === 0" class="py-12 flex flex-col items-center justify-center text-center">
        <svg class="w-16 h-16 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-gray-500 mb-1">Nenhuma rotina encontrada</p>
        <p class="text-sm text-gray-400">Crie uma nova rotina ou ajuste os filtros</p>
      </div>
    </div>

    <!-- Botão flutuante minimalista -->
    <button
      @click="mostrarFormulario = true"
      class="fixed bottom-5 right-5 z-40 flex md:hidden items-center justify-center w-12 h-12 rounded-full bg-amber-500 text-white shadow-lg hover:bg-amber-600 transition-colors"
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
          class="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto transform transition-all"
          :class="{ 'opacity-100 scale-100': mostrarFormulario, 'opacity-0 scale-95': !mostrarFormulario }"
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
import { ref } from 'vue'
import { useRotinasStore } from '../stores/rotinas'
import type { Rotina, DiaSemana } from '../stores/rotinas'
import ListaRotinas from '../components/rotinas/ListaRotinas.vue'
import RotinaForm from '../components/rotinas/RotinaForm.vue'

const store = useRotinasStore()
const mostrarFormulario = ref(false)
const rotinaSelecionada = ref<Rotina | undefined>()

const diasSemana = [
  { nome: 'Seg', valor: 'segunda' as const },
  { nome: 'Ter', valor: 'terca' as const },
  { nome: 'Qua', valor: 'quarta' as const },
  { nome: 'Qui', valor: 'quinta' as const },
  { nome: 'Sex', valor: 'sexta' as const },
  { nome: 'Sáb', valor: 'sabado' as const },
  { nome: 'Dom', valor: 'domingo' as const }
]

function toggleFiltroDia(dia: DiaSemana) {
  const dias = [...store.filtro.diasSemana]
  const index = dias.indexOf(dia)
  
  if (index === -1) {
    dias.push(dia)
  } else {
    dias.splice(index, 1)
  }
  
  store.definirFiltro({ diasSemana: dias })
}

function limparFiltroDias() {
  store.definirFiltro({ diasSemana: [] })
}

function editarRotina(rotina: Rotina) {
  rotinaSelecionada.value = rotina
  mostrarFormulario.value = true
}

function excluirRotina(id: string) {
  if (confirm('Tem certeza que deseja excluir esta rotina?')) {
    store.removerRotina(id)
  }
}

function salvarRotina(rotina: Omit<Rotina, 'id' | 'dataCriacao'>) {
  if (rotinaSelecionada.value) {
    store.atualizarRotina(rotinaSelecionada.value.id, rotina)
  } else {
    store.adicionarRotina(rotina)
  }
  fecharFormulario()
}

function atualizarTarefaRotina(rotinaId: string, tarefaId: string, concluida: boolean) {
  store.atualizarTarefaRotina(rotinaId, tarefaId, concluida)
}

function finalizarRotina(rotinaId: string) {
  // Obter a rotina selecionada
  const rotina = store.rotinas.find(r => r.id === rotinaId)
  if (!rotina) return
  
  // Marcar todas as tarefas como concluídas
  rotina.tarefas.forEach(tarefa => {
    store.atualizarTarefaRotina(rotinaId, tarefa.id, true)
  })
  
  // Registrar a execução
  store.registrarExecucao(rotinaId)
  
  alert(`Rotina "${rotina.titulo}" finalizada com sucesso!`)
}

function fecharFormulario() {
  mostrarFormulario.value = false
  rotinaSelecionada.value = undefined
}
</script> 