<template>
  <div class="max-w-5xl mx-auto w-full p-4 py-8">
    <div class="mb-8 text-center">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Bem-vindo ao TarefaFácil</h1>
      <p class="text-gray-600 max-w-2xl mx-auto">Organize suas tarefas, eventos e rotinas de forma simples e eficiente.</p>
    </div>
    
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <router-link to="/tarefas" class="block p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div class="flex flex-col items-center text-center">
          <div class="mb-4 p-3 bg-indigo-50 rounded-full">
            <svg class="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-900 mb-2">Tarefas</h2>
          <p class="text-gray-600">Organize suas tarefas diárias, defina prioridades e acompanhe o progresso.</p>
        </div>
      </router-link>
      
      <router-link to="/eventos" class="block p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div class="flex flex-col items-center text-center">
          <div class="mb-4 p-3 bg-rose-50 rounded-full">
            <svg class="w-8 h-8 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-900 mb-2">Eventos</h2>
          <p class="text-gray-600">Gerencie seus eventos, reuniões e compromissos com facilidade.</p>
        </div>
      </router-link>
      
      <router-link to="/rotinas" class="block p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div class="flex flex-col items-center text-center">
          <div class="mb-4 p-3 bg-amber-50 rounded-full">
            <svg class="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-900 mb-2">Rotinas</h2>
          <p class="text-gray-600">Estabeleça rotinas e hábitos para maior produtividade no seu dia a dia.</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
// HomeView
</script> 