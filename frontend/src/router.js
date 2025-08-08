import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import NewGame from './NewGame.vue'
import Home from './Home.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/game', component: NewGame }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router