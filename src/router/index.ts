import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/tarefas',
      name: 'tarefas',
      component: () => import('../views/TarefasView.vue')
    },
    {
      path: '/eventos',
      name: 'eventos',
      component: () => import('../views/EventosView.vue')
    },
    {
      path: '/rotinas',
      name: 'rotinas',
      component: () => import('../views/RotinasView.vue')
    }
  ]
})

export default router 