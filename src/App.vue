<script setup lang="ts">
import { onMounted } from 'vue'
import AppNavbar from './components/AppNavbar.vue'
import { useTheme } from './composables/useTheme'

const { loadTheme } = useTheme()

// Carregar tema na inicialização
onMounted(() => {
  loadTheme()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex flex-col transition-colors duration-200">
    <AppNavbar />
    <div class="flex-1">
      <router-view />
    </div>
  </div>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: 'Inter', 'Helvetica', 'Arial', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
