import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Customer from '../views/Customer.vue'
import DataReadMe from '../views/DataReadMe.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  {
    path: '/customer', // 你希望用于导航到 Customer 组件的路径
    name: 'Customer',
    component: Customer
  },
  {
    path: '/datareadme', // 你希望用于导航到 DataReadMe 组件的路径
    name: 'DataReadMe',
    component: DataReadMe
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router