<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 py-6">
      <!-- Cabeçalho minimalista -->
      <div class="mb-8">
        <div class="text-center mb-6">
          <h1 class="text-2xl md:text-3xl font-light text-gray-900 mb-1">
            {{ getCurrentGreeting() }}
          </h1>
          <p class="text-gray-500 text-sm">
            {{ format(new Date(), "EEEE, dd 'de' MMMM", { locale: ptBR }) }}
          </p>
        </div>

        <!-- Resumo do dia -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Card Tarefas -->
          <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow duration-200">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h3 class="font-medium text-gray-900 text-sm">Tarefas</h3>
              </div>
              <router-link to="/tarefas" 
                class="text-blue-600 hover:text-blue-700 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </router-link>
            </div>
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-xs text-gray-500">Hoje</span>
                <span class="text-lg font-light text-gray-900">{{ tarefasStore.tarefasHoje.length }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-xs text-gray-500">Atrasadas</span>
                <span class="text-sm font-medium text-red-600">{{ tarefasStore.tarefasAtrasadas.length }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-xs text-gray-500">Total</span>
                <span class="text-sm text-gray-600">{{ tarefasStore.tarefas.length }}</span>
              </div>
            </div>
          </div>

          <!-- Card Eventos -->
          <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow duration-200">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 class="font-medium text-gray-900 text-sm">Eventos</h3>
              </div>
              <router-link to="/eventos" 
                class="text-purple-600 hover:text-purple-700 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </router-link>
            </div>
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-xs text-gray-500">Hoje</span>
                <span class="text-lg font-light text-gray-900">{{ eventosStore.eventosHoje.length }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-xs text-gray-500">Próximos</span>
                <span class="text-sm font-medium text-amber-600">{{ eventosStore.eventosProximos.length }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-xs text-gray-500">Total</span>
                <span class="text-sm text-gray-600">{{ eventosStore.eventos.length }}</span>
              </div>
            </div>
          </div>

          <!-- Card Rotinas -->
          <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow duration-200">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 class="font-medium text-gray-900 text-sm">Rotinas</h3>
              </div>
              <router-link to="/rotinas" 
                class="text-green-600 hover:text-green-700 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </router-link>
            </div>
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-xs text-gray-500">Hoje</span>
                <span class="text-lg font-light text-gray-900">{{ rotinasStore.rotinasHoje.length }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-xs text-gray-500">Ativas</span>
                <span class="text-sm font-medium text-green-600">{{ rotinasAtivas.length }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-xs text-gray-500">Total</span>
                <span class="text-sm text-gray-600">{{ rotinasStore.rotinas.length }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navegação por tipo -->
      <div class="mb-6">
        <nav class="flex space-x-1 bg-white rounded-xl p-1 shadow-sm border border-gray-100">
          <button
            @click="abaAtiva = 'hoje'"
            class="flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200"
            :class="abaAtiva === 'hoje' 
              ? 'bg-gray-900 text-white shadow-sm' 
              : 'text-gray-500 hover:text-gray-700'"
          >
            Hoje
          </button>
          <button
            @click="abaAtiva = 'pendencias'"
            class="flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200"
            :class="abaAtiva === 'pendencias' 
              ? 'bg-gray-900 text-white shadow-sm' 
              : 'text-gray-500 hover:text-gray-700'"
          >
            Pendências
            <span v-if="totalPendencias > 0" 
              class="ml-2 text-xs px-1.5 py-0.5 bg-red-500 text-white rounded-full">
              {{ totalPendencias }}
            </span>
          </button>
          <button
            @click="abaAtiva = 'visao'"
            class="flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200"
            :class="abaAtiva === 'visao' 
              ? 'bg-gray-900 text-white shadow-sm' 
              : 'text-gray-500 hover:text-gray-700'"
          >
            Visão geral
          </button>
        </nav>
      </div>

      <!-- Conteúdo das abas -->
      <div class="transition-all duration-300">
        <!-- Aba Hoje -->
        <div v-if="abaAtiva === 'hoje'" class="space-y-6">
          <!-- Tarefas de hoje -->
          <div v-if="tarefasStore.tarefasHoje.length > 0" 
            class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-50">
              <h3 class="font-medium text-gray-900 flex items-center">
                <svg class="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                Tarefas de hoje ({{ tarefasStore.tarefasHoje.length }})
              </h3>
            </div>
            <div class="p-6">
              <div class="space-y-3">
                <div v-for="tarefa in tarefasStore.tarefasHoje.slice(0, 5)" :key="tarefa.id" 
                  class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  @click="$router.push(`/tarefas?focus=${tarefa.id}`)">
                  <div class="flex-shrink-0">
                    <span :class="{
                      'bg-gray-100 border-gray-300': tarefa.prioridade === 'baixa',
                      'bg-amber-100 border-amber-300': tarefa.prioridade === 'media',
                      'bg-red-100 border-red-300': tarefa.prioridade === 'alta'
                    }" class="w-3 h-3 rounded-full border-2 block"></span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate">{{ tarefa.titulo }}</p>
                    <p class="text-xs text-gray-500">{{ statusFormatado(tarefa.status) }}</p>
                  </div>
                  <div class="flex-shrink-0">
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
              <div v-if="tarefasStore.tarefasHoje.length > 5" class="mt-4 text-center">
                <router-link to="/tarefas" 
                  class="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                  Ver todas as {{ tarefasStore.tarefasHoje.length }} tarefas
                </router-link>
              </div>
            </div>
          </div>

          <!-- Eventos de hoje -->
          <div v-if="eventosStore.eventosHoje.length > 0" 
            class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-50">
              <h3 class="font-medium text-gray-900 flex items-center">
                <svg class="w-4 h-4 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Eventos de hoje ({{ eventosStore.eventosHoje.length }})
              </h3>
            </div>
            <div class="p-6">
              <div class="space-y-3">
                <div v-for="evento in eventosStore.eventosHoje.slice(0, 5)" :key="evento.id" 
                  class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  @click="$router.push(`/eventos?focus=${evento.id}`)">
                  <div class="flex-shrink-0">
                    <div class="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                      <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate">{{ evento.titulo }}</p>
                    <p class="text-xs text-gray-500">{{ formatarHora(evento.dataInicio) }} • {{ evento.local }}</p>
                  </div>
                  <div class="flex-shrink-0">
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
              <div v-if="eventosStore.eventosHoje.length > 5" class="mt-4 text-center">
                <router-link to="/eventos" 
                  class="text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors">
                  Ver todos os {{ eventosStore.eventosHoje.length }} eventos
                </router-link>
              </div>
            </div>
          </div>

          <!-- Rotinas de hoje -->
          <div v-if="rotinasStore.rotinasHoje.length > 0" 
            class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-50">
              <h3 class="font-medium text-gray-900 flex items-center">
                <svg class="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Rotinas de hoje ({{ rotinasStore.rotinasHoje.length }})
              </h3>
            </div>
            <div class="p-6">
              <div class="space-y-3">
                <div v-for="rotina in rotinasStore.rotinasHoje.slice(0, 5)" :key="rotina.id" 
                  class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  @click="$router.push(`/rotinas?focus=${rotina.id}`)">
                  <div class="flex-shrink-0">
                    <div class="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                      <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate">{{ rotina.titulo }}</p>
                    <p class="text-xs text-gray-500">{{ rotina.horario }} • {{ rotina.tarefas.length }} tarefas</p>
                  </div>
                  <div class="flex-shrink-0">
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
              <div v-if="rotinasStore.rotinasHoje.length > 5" class="mt-4 text-center">
                <router-link to="/rotinas" 
                  class="text-sm text-green-600 hover:text-green-700 font-medium transition-colors">
                  Ver todas as {{ rotinasStore.rotinasHoje.length }} rotinas
                </router-link>
              </div>
            </div>
          </div>

          <!-- Estado vazio -->
          <div v-if="tarefasStore.tarefasHoje.length === 0 && 
                     eventosStore.eventosHoje.length === 0 && 
                     rotinasStore.rotinasHoje.length === 0" 
               class="text-center py-16">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v18m0 0l-8.5-8.5M12 21l8.5-8.5" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Nada programado para hoje</h3>
            <p class="text-sm text-gray-500 mb-6">Use a navegação para acessar suas tarefas, eventos ou rotinas.</p>
          </div>
        </div>

        <!-- Aba Pendências -->
        <div v-if="abaAtiva === 'pendencias'" class="space-y-6">
          <!-- Tarefas atrasadas -->
          <div v-if="tarefasStore.tarefasAtrasadas.length > 0" 
            class="bg-white rounded-xl border border-red-200 shadow-sm overflow-hidden">
            <div class="px-6 py-4 bg-red-50 border-b border-red-100">
              <h3 class="font-medium text-red-900 flex items-center">
                <svg class="w-4 h-4 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Tarefas atrasadas ({{ tarefasStore.tarefasAtrasadas.length }})
              </h3>
            </div>
            <div class="p-6">
              <div class="space-y-3">
                <div v-for="tarefa in tarefasStore.tarefasAtrasadas.slice(0, 5)" :key="tarefa.id" 
                  class="flex items-center gap-3 p-3 rounded-lg hover:bg-red-25 transition-colors cursor-pointer"
                  @click="$router.push(`/tarefas?focus=${tarefa.id}`)">
                  <div class="flex-shrink-0">
                    <div class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                      <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate">{{ tarefa.titulo }}</p>
                    <p class="text-xs text-red-600" v-if="tarefa.dataVencimento">
                      Venceu em {{ formatarData(tarefa.dataVencimento) }}
                    </p>
                  </div>
                  <div class="flex gap-2">
                    <button @click.stop="marcarTarefaComoArquivada(tarefa.id)"
                      class="text-xs px-2 py-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors">
                      Arquivar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Próximos eventos -->
          <div v-if="eventosStore.eventosProximos.length > 0" 
            class="bg-white rounded-xl border border-blue-200 shadow-sm overflow-hidden">
            <div class="px-6 py-4 bg-blue-50 border-b border-blue-100">
              <h3 class="font-medium text-blue-900 flex items-center">
                <svg class="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Próximos eventos ({{ eventosStore.eventosProximos.length }})
              </h3>
            </div>
            <div class="p-6">
              <div class="space-y-3">
                <div v-for="evento in eventosStore.eventosProximos.slice(0, 5)" :key="evento.id" 
                  class="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-25 transition-colors cursor-pointer"
                  @click="$router.push(`/eventos?focus=${evento.id}`)">
                  <div class="flex-shrink-0">
                    <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate">{{ evento.titulo }}</p>
                    <p class="text-xs text-blue-600" v-if="evento.dataInicio">
                      {{ formatarData(evento.dataInicio) }} às {{ formatarHora(evento.dataInicio) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Tarefas próximas -->
          <div v-if="tarefasStore.tarefasProximas.length > 0" 
            class="bg-white rounded-xl border border-amber-200 shadow-sm overflow-hidden">
            <div class="px-6 py-4 bg-amber-50 border-b border-amber-100">
              <h3 class="font-medium text-amber-900 flex items-center">
                <svg class="w-4 h-4 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Tarefas próximas ({{ tarefasStore.tarefasProximas.length }})
              </h3>
            </div>
            <div class="p-6">
              <div class="space-y-3">
                <div v-for="tarefa in tarefasStore.tarefasProximas.slice(0, 5)" :key="tarefa.id" 
                  class="flex items-center gap-3 p-3 rounded-lg hover:bg-amber-25 transition-colors cursor-pointer"
                  @click="$router.push(`/tarefas?focus=${tarefa.id}`)">
                  <div class="flex-shrink-0">
                    <div class="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                      <svg class="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate">{{ tarefa.titulo }}</p>
                    <p class="text-xs text-amber-600" v-if="tarefa.dataVencimento">
                      Vence em {{ formatarData(tarefa.dataVencimento) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Estado sem pendências -->
          <div v-if="totalPendencias === 0" class="text-center py-16">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Tudo em dia!</h3>
            <p class="text-sm text-gray-500">Não há pendências ou alertas no momento.</p>
          </div>
        </div>

        <!-- Aba Visão Geral -->
        <div v-if="abaAtiva === 'visao'" class="space-y-6">
          <!-- Estatísticas gerais -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Progressão mensal -->
            <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 class="font-medium text-gray-900 mb-4">Progresso este mês</h3>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600">Tarefas concluídas</span>
                  <span class="text-lg font-light text-blue-600">{{ tarefasConcluidas }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600">Eventos participados</span>
                  <span class="text-lg font-light text-purple-600">{{ eventosConcluidos }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600">Rotinas executadas</span>
                  <span class="text-lg font-light text-green-600">{{ rotinasExecutadas }}</span>
                </div>
              </div>
            </div>

            <!-- Produtividade -->
            <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 class="font-medium text-gray-900 mb-4">Produtividade</h3>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600">Taxa de conclusão</span>
                  <span class="text-lg font-light text-gray-900">{{ taxaConclusao }}%</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600">Média diária</span>
                  <span class="text-lg font-light text-gray-900">{{ mediaDiaria }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600">Sequência atual</span>
                  <span class="text-lg font-light text-gray-900">{{ sequenciaAtual }} dias</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Atividade recente -->
          <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-50">
              <h3 class="font-medium text-gray-900">Atividade recente</h3>
            </div>
            <div class="p-6">
              <div class="text-center py-8 text-gray-400 text-sm">
                <svg class="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>Histórico de atividades em breve</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTarefasStore } from '../stores/tarefas'
import { useEventosStore } from '../stores/eventos'
import { useRotinasStore } from '../stores/rotinas'
import { onMounted, ref, computed } from 'vue'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const tarefasStore = useTarefasStore()
const eventosStore = useEventosStore()
const rotinasStore = useRotinasStore()

// Estado das abas
const abaAtiva = ref<'hoje' | 'pendencias' | 'visao'>('hoje')

// Computed properties
const rotinasAtivas = computed(() => rotinasStore.rotinas.filter(r => r.ativa))

const totalPendencias = computed(() => 
  tarefasStore.tarefasAtrasadas.length + 
  eventosStore.eventosProximos.length + 
  tarefasStore.tarefasProximas.length
)

const tarefasConcluidas = computed(() => 
  tarefasStore.tarefas.filter(t => t.status === 'concluida').length
)

const eventosConcluidos = computed(() => 
  eventosStore.eventos.filter(e => e.concluido).length
)

const rotinasExecutadas = computed(() => 
  rotinasStore.rotinas.filter(r => r.ultimaExecucao).length
)

const taxaConclusao = computed(() => {
  const total = tarefasStore.tarefas.length
  if (total === 0) return 0
  return Math.round((tarefasConcluidas.value / total) * 100)
})

const mediaDiaria = computed(() => {
  // Simulação - poderia calcular com base em dados reais
  return Math.round(tarefasConcluidas.value / 30)
})

const sequenciaAtual = computed(() => {
  // Simulação - poderia calcular sequência real de dias produtivos
  return Math.floor(Math.random() * 15) + 1
})

onMounted(() => {
  // Carregar dados de todas as stores
  tarefasStore.carregarDados()
  eventosStore.carregarDados()
  rotinasStore.carregarDados()
})

// Funções de formatação
function formatarData(data: Date): string {
  return format(new Date(data), 'dd/MM/yyyy', { locale: ptBR })
}

function formatarHora(data: Date): string {
  return format(new Date(data), 'HH:mm', { locale: ptBR })
}

function statusFormatado(status: string): string {
  switch (status) {
    case 'pendente':
      return 'Pendente';
    case 'em_andamento':
      return 'Em andamento';
    case 'concluida':
      return 'Concluída';
    default:
      return status;
  }
}

function getCurrentGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) {
    return 'Bom dia!'
  } else if (hour < 18) {
    return 'Boa tarde!'
  } else {
    return 'Boa noite!'
  }
}

function marcarTarefaComoArquivada(id: string) {
  tarefasStore.marcarComoArquivada(id, true);
}
</script> 