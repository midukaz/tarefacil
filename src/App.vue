<script setup lang="ts">
import AppNavbar from './components/AppNavbar.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
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
