<template>
  <nav class="bg-white shadow-sm border-b border-gray-100">
    <div class="max-w-5xl mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center">
          <router-link to="/" class="text-xl font-medium text-indigo-600 flex items-center gap-2">
            <img src="/favicon.svg" alt="Logo" class="w-8 h-8">
            <span class="text-zinc-600 font-bold">TareFácil</span>
          </router-link>
        </div>
        
        <!-- Menu principal -->
        <div class="hidden md:block">
          <div class="flex items-center space-x-4">
            <router-link 
              v-for="item in menuItems" 
              :key="item.path" 
              :to="item.path"
              class="px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center"
              :class="[$route.path === item.path ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50']"
            >
              <span class="mr-1.5">
                <component :is="item.icon" class="w-5 h-5" aria-hidden="true" />
              </span>
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
          class="block px-3 py-2 text-base font-medium rounded-md transition-colors flex items-center"
          :class="[$route.path === item.path ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50']"
          @click="mobileMenuOpen = false"
        >
          <span class="mr-2">
            <component :is="item.icon" class="w-5 h-5" aria-hidden="true" />
          </span>
          {{ item.name }}
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, defineComponent, h } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const mobileMenuOpen = ref(false)

// Definição dos ícones
const HomeIcon = defineComponent({
  name: 'HomeIcon',
  render() {
    return h('svg', { 
      xmlns: 'http://www.w3.org/2000/svg', 
      fill: 'none', 
      viewBox: '0 0 24 24', 
      stroke: 'currentColor' 
    }, [
      h('path', { 
        'stroke-linecap': 'round', 
        'stroke-linejoin': 'round', 
        'stroke-width': '2', 
        d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' 
      })
    ])
  }
})

const TaskIcon = defineComponent({
  name: 'TaskIcon',
  render() {
    return h('svg', { 
      xmlns: 'http://www.w3.org/2000/svg', 
      fill: 'none', 
      viewBox: '0 0 24 24', 
      stroke: 'currentColor' 
    }, [
      h('path', { 
        'stroke-linecap': 'round', 
        'stroke-linejoin': 'round', 
        'stroke-width': '2', 
        d: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' 
      })
    ])
  }
})

const CalendarIcon = defineComponent({
  name: 'CalendarIcon',
  render() {
    return h('svg', { 
      xmlns: 'http://www.w3.org/2000/svg', 
      fill: 'none', 
      viewBox: '0 0 24 24', 
      stroke: 'currentColor' 
    }, [
      h('path', { 
        'stroke-linecap': 'round', 
        'stroke-linejoin': 'round', 
        'stroke-width': '2', 
        d: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' 
      })
    ])
  }
})

const ClockIcon = defineComponent({
  name: 'ClockIcon',
  render() {
    return h('svg', { 
      xmlns: 'http://www.w3.org/2000/svg', 
      fill: 'none', 
      viewBox: '0 0 24 24', 
      stroke: 'currentColor' 
    }, [
      h('path', { 
        'stroke-linecap': 'round', 
        'stroke-linejoin': 'round', 
        'stroke-width': '2', 
        d: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' 
      })
    ])
  }
})

const menuItems = [
  { name: 'Início', path: '/', icon: HomeIcon },
  { name: 'Tarefas', path: '/tarefas', icon: TaskIcon },
  { name: 'Eventos', path: '/eventos', icon: CalendarIcon },
  { name: 'Rotinas', path: '/rotinas', icon: ClockIcon }
]
</script> 