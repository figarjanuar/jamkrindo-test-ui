import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import AddKlaim from '../views/AddKlaim.vue'
import ActivityLog from '../views/ActivityLog.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/add-klaim',
    name: 'AddKlaim',
    component: AddKlaim
  },
  {
    path: '/activity-log',
    name: 'ActivityLog',
    component: ActivityLog
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router