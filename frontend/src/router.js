import { createRouter, createWebHistory } from 'vue-router'
import TaskList from './pages/TaskList.vue'
import TaskNew from './pages/TaskNew.vue'
import Login from './pages/Login.vue'

const routes = [
  { path: '/', component: TaskList },
  { path: '/new', component: TaskNew },
  { path: '/login', component: Login }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router