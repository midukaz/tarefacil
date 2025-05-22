<template>
  <nav class="bg-white shadow-sm border-b border-gray-100">
    <div class="max-w-5xl mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center">
          <router-link to="/" class="text-xl font-medium text-indigo-600 flex items-center gap-2">
            <img src="/favicon.svg" alt="Logo" class="w-8 h-8">
            <span class="text-zinc-600 font-bold">TarefaFácil</span>
          </router-link>
        </div>
        
        <!-- Menu principal -->
        <div class="hidden md:block">
          <div class="flex items-center space-x-4">
            <router-link 
              v-for="item in menuItems" 
              :key="item.path" 
              :to="item.path"
              class="px-3 py-2 text-sm font-medium rounded-md transition-colors"
              :class="[$route.path === item.path ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50']"
            >
              {{ item.name }}
            </router-link>
          </div>
        </div>
        
        <!-- Menu mobile (ícone) -->
        <div class="block md:hidden">
          <button 
            @click="mobileMenuOpen = !mobileMenuOpen" 
            class="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
          >
            <svg
              class="h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                :class="{'hidden': mobileMenuOpen, 'inline-flex': !mobileMenuOpen }"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                :class="{'hidden': !mobileMenuOpen, 'inline-flex': mobileMenuOpen }"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Menu mobile (expandido) -->
    <div :class="{'block': mobileMenuOpen, 'hidden': !mobileMenuOpen}" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <router-link 
          v-for="item in menuItems" 
          :key="item.path" 
          :to="item.path"
          class="block px-3 py-2 text-base font-medium rounded-md transition-colors"
          :class="[$route.path === item.path ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50']"
          @click="mobileMenuOpen = false"
        >
          {{ item.name }}
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const mobileMenuOpen = ref(false)

const menuItems = [
  { name: 'Início', path: '/' },
  { name: 'Tarefas', path: '/tarefas' },
  { name: 'Eventos', path: '/eventos' },
  { name: 'Rotinas', path: '/rotinas' }
]
</script> 