import { createRouter, createWebHistory } from 'vue-router'
import NewGame from './NewGame.vue'
import CurrentGame from './CurrentGame.vue'
import Home from './Home.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/game', component: NewGame },
  { path: '/current', component: CurrentGame }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router