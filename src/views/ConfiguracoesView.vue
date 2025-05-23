<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
    <div class="max-w-4xl mx-auto px-4 py-8">
      <!-- Cabeçalho elegante -->
      <div class="mb-8">
        <h1 class="text-3xl font-light text-gray-900 dark:text-white mb-2">Configurações</h1>
        <p class="text-gray-500 dark:text-gray-400 text-sm">Personalize sua experiência no TareFácil</p>
      </div>

      <!-- Grid de configurações -->
      <div class="space-y-6">
        <!-- Seção Perfil -->
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden transition-colors duration-200">
          <div class="px-6 py-4 border-b border-gray-50 dark:border-gray-700">
            <h2 class="font-medium text-gray-900 dark:text-white flex items-center">
              <svg class="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Perfil
            </h2>
          </div>
          <div class="p-6 space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nome</label>
              <input
                v-model="configuracoes.nome"
                type="text"
                placeholder="Seu nome"
                class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-0 rounded-lg focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 focus:bg-white dark:focus:bg-gray-600 transition-all duration-200 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
              <input
                v-model="configuracoes.email"
                type="email"
                placeholder="seu@email.com"
                class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-0 rounded-lg focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 focus:bg-white dark:focus:bg-gray-600 transition-all duration-200 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        <!-- Seção Preferências -->
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden transition-colors duration-200">
          <div class="px-6 py-4 border-b border-gray-50 dark:border-gray-700">
            <h2 class="font-medium text-gray-900 dark:text-white flex items-center">
              <svg class="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
              Preferências
            </h2>
          </div>
          <div class="p-6 space-y-6">
            <!-- Tema -->
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-medium text-gray-900 dark:text-white">Tema escuro</h3>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Ativar modo escuro da interface</p>
              </div>
              <button
                @click="toggleTema"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200"
                :class="configuracoes.temaEscuro ? 'bg-gray-900 dark:bg-indigo-600' : 'bg-gray-200 dark:bg-gray-600'"
              >
                <span
                  class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200"
                  :class="configuracoes.temaEscuro ? 'translate-x-6' : 'translate-x-1'"
                />
              </button>
            </div>

            <!-- Linguagem -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Idioma</label>
              <select
                v-model="configuracoes.idioma"
                class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-0 rounded-lg focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 transition-all duration-200 text-sm text-gray-900 dark:text-white"
              >
                <option value="pt-BR">Português (Brasil)</option>
                <option value="en-US">English (US)</option>
                <option value="es-ES">Español</option>
              </select>
            </div>

            <!-- Fuso horário -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Fuso horário</label>
              <select
                v-model="configuracoes.fusoHorario"
                class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-0 rounded-lg focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 transition-all duration-200 text-sm text-gray-900 dark:text-white"
              >
                <option value="America/Sao_Paulo">Brasília (GMT-3)</option>
                <option value="America/New_York">Nova York (GMT-5)</option>
                <option value="Europe/London">Londres (GMT+0)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Seção Notificações -->
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden transition-colors duration-200">
          <div class="px-6 py-4 border-b border-gray-50 dark:border-gray-700">
            <h2 class="font-medium text-gray-900 dark:text-white flex items-center">
              <svg class="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              Notificações
            </h2>
          </div>
          <div class="p-6 space-y-6">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-medium text-gray-900 dark:text-white">Notificações por email</h3>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Receber lembretes por email</p>
              </div>
              <button
                @click="configuracoes.notificacoes.email = !configuracoes.notificacoes.email"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200"
                :class="configuracoes.notificacoes.email ? 'bg-gray-900 dark:bg-indigo-600' : 'bg-gray-200 dark:bg-gray-600'"
              >
                <span
                  class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200"
                  :class="configuracoes.notificacoes.email ? 'translate-x-6' : 'translate-x-1'"
                />
              </button>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-medium text-gray-900 dark:text-white">Notificações push</h3>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Receber notificações no navegador</p>
              </div>
              <button
                @click="configuracoes.notificacoes.push = !configuracoes.notificacoes.push"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200"
                :class="configuracoes.notificacoes.push ? 'bg-gray-900 dark:bg-indigo-600' : 'bg-gray-200 dark:bg-gray-600'"
              >
                <span
                  class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200"
                  :class="configuracoes.notificacoes.push ? 'translate-x-6' : 'translate-x-1'"
                />
              </button>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-medium text-gray-900 dark:text-white">Lembretes de tarefas</h3>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Lembrar de tarefas próximas ao vencimento</p>
              </div>
              <button
                @click="configuracoes.notificacoes.tarefas = !configuracoes.notificacoes.tarefas"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200"
                :class="configuracoes.notificacoes.tarefas ? 'bg-gray-900 dark:bg-indigo-600' : 'bg-gray-200 dark:bg-gray-600'"
              >
                <span
                  class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200"
                  :class="configuracoes.notificacoes.tarefas ? 'translate-x-6' : 'translate-x-1'"
                />
              </button>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-medium text-gray-900 dark:text-white">Lembretes de eventos</h3>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Lembrar de eventos próximos</p>
              </div>
              <button
                @click="configuracoes.notificacoes.eventos = !configuracoes.notificacoes.eventos"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200"
                :class="configuracoes.notificacoes.eventos ? 'bg-gray-900 dark:bg-indigo-600' : 'bg-gray-200 dark:bg-gray-600'"
              >
                <span
                  class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200"
                  :class="configuracoes.notificacoes.eventos ? 'translate-x-6' : 'translate-x-1'"
                />
              </button>
            </div>
          </div>
        </div>

        <!-- Seção Dados -->
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden transition-colors duration-200">
          <div class="px-6 py-4 border-b border-gray-50 dark:border-gray-700">
            <h2 class="font-medium text-gray-900 dark:text-white flex items-center">
              <svg class="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
              Dados e Privacidade
            </h2>
          </div>
          <div class="p-6 space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                @click="exportarDados"
                class="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-200 text-sm font-medium"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Exportar dados
              </button>

              <button
                @click="importarDados"
                class="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-200 text-sm font-medium"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
                Importar dados
              </button>
            </div>

            <div class="pt-4 border-t border-gray-100 dark:border-gray-700">
              <button
                @click="limparDados"
                class="flex items-center justify-center gap-2 px-4 py-3 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-700 dark:text-red-400 rounded-lg transition-colors duration-200 text-sm font-medium w-full"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Limpar todos os dados
              </button>
            </div>
          </div>
        </div>

        <!-- Botões de ação -->
        <div class="flex flex-col sm:flex-row gap-3">
          <button
            @click="salvarConfiguracoes"
            class="flex-1 px-6 py-3 bg-gray-900 dark:bg-indigo-600 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-indigo-700 transition-colors duration-200 text-sm font-medium"
          >
            Salvar configurações
          </button>
          
          <button
            @click="resetarConfiguracoes"
            class="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 text-sm font-medium"
          >
            Resetar para padrão
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useTheme } from '../composables/useTheme'

interface Configuracoes {
  nome: string
  email: string
  temaEscuro: boolean
  idioma: string
  fusoHorario: string
  notificacoes: {
    email: boolean
    push: boolean
    tarefas: boolean
    eventos: boolean
  }
}

const { setTheme } = useTheme()

const configuracoes = ref<Configuracoes>({
  nome: '',
  email: '',
  temaEscuro: false,
  idioma: 'pt-BR',
  fusoHorario: 'America/Sao_Paulo',
  notificacoes: {
    email: true,
    push: true,
    tarefas: true,
    eventos: true
  }
})

onMounted(() => {
  carregarConfiguracoes()
})

// Observar mudanças no tema para atualizar o toggle
watch(() => configuracoes.value.temaEscuro, (novoValor) => {
  setTheme(novoValor)
})

function toggleTema() {
  configuracoes.value.temaEscuro = !configuracoes.value.temaEscuro
}

function carregarConfiguracoes() {
  const saved = localStorage.getItem('tarefacil-configuracoes')
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      configuracoes.value = { ...configuracoes.value, ...parsed }
    } catch (error) {
      console.error('Erro ao carregar configurações:', error)
    }
  }
}

function salvarConfiguracoes() {
  try {
    localStorage.setItem('tarefacil-configuracoes', JSON.stringify(configuracoes.value))
    
    // Simular feedback de sucesso
    const button = document.querySelector('button:has-text("Salvar configurações")') as HTMLButtonElement
    if (button) {
      const originalText = button.textContent
      button.textContent = '✓ Salvo!'
      button.classList.add('bg-green-600', 'hover:bg-green-700')
      button.classList.remove('bg-gray-900', 'hover:bg-gray-800')
      
      setTimeout(() => {
        button.textContent = originalText
        button.classList.remove('bg-green-600', 'hover:bg-green-700')
        button.classList.add('bg-gray-900', 'hover:bg-gray-800')
      }, 2000)
    }
  } catch (error) {
    console.error('Erro ao salvar configurações:', error)
    alert('Erro ao salvar configurações. Tente novamente.')
  }
}

function resetarConfiguracoes() {
  if (confirm('Tem certeza que deseja resetar todas as configurações para o padrão?')) {
    configuracoes.value = {
      nome: '',
      email: '',
      temaEscuro: false,
      idioma: 'pt-BR',
      fusoHorario: 'America/Sao_Paulo',
      notificacoes: {
        email: true,
        push: true,
        tarefas: true,
        eventos: true
      }
    }
    localStorage.removeItem('tarefacil-configuracoes')
  }
}

function exportarDados() {
  try {
    const dados = {
      configuracoes: configuracoes.value,
      tarefas: JSON.parse(localStorage.getItem('tarefacil-tarefas') || '[]'),
      eventos: JSON.parse(localStorage.getItem('tarefacil-eventos') || '[]'),
      rotinas: JSON.parse(localStorage.getItem('tarefacil-rotinas') || '[]'),
      dataExportacao: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `tarefacil-backup-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Erro ao exportar dados:', error)
    alert('Erro ao exportar dados. Tente novamente.')
  }
}

function importarDados() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.json'
  
  input.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (!file) return
    
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const dados = JSON.parse(e.target?.result as string)
        
        if (dados.configuracoes) {
          configuracoes.value = { ...configuracoes.value, ...dados.configuracoes }
        }
        
        if (dados.tarefas) {
          localStorage.setItem('tarefacil-tarefas', JSON.stringify(dados.tarefas))
        }
        
        if (dados.eventos) {
          localStorage.setItem('tarefacil-eventos', JSON.stringify(dados.eventos))
        }
        
        if (dados.rotinas) {
          localStorage.setItem('tarefacil-rotinas', JSON.stringify(dados.rotinas))
        }
        
        alert('Dados importados com sucesso! Recarregue a página para ver as mudanças.')
      } catch (error) {
        console.error('Erro ao importar dados:', error)
        alert('Arquivo inválido. Verifique se é um backup válido do TareFácil.')
      }
    }
    
    reader.readAsText(file)
  }
  
  input.click()
}

function limparDados() {
  if (confirm('⚠️ ATENÇÃO: Esta ação irá apagar TODOS os seus dados (tarefas, eventos, rotinas e configurações). Esta ação não pode ser desfeita.\n\nTem certeza que deseja continuar?')) {
    if (confirm('Última confirmação: Todos os dados serão perdidos permanentemente. Continuar?')) {
      localStorage.clear()
      location.reload()
    }
  }
}
</script> 