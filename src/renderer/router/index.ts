import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Customer from '../views/Customer.vue'// 导入 AddCustomer 组件
import CustomerAdd from '../views/CustomerAdd.vue' 
import OrderAdd from '../views/OrderAdd.vue'// 导入 Order组件
import OrderSubmit from '../views/OrderSubmit.vue'
import OrderManage from '../views/OrderManage.vue'
import DataReadMe from '../views/DataReadMe.vue'

const routes = [
  { path: '/', component: Home },

  { path: '/about', component: About },


    // 客户信息管理组件
  {
    path: '/customer', 
    name: 'Customer',
    component: Customer
  },

  { path: '/customeradd', 
    name: 'CustomerAdd',
    component: CustomerAdd }, 

    // 订单相关组件
    { path: '/orderadd', 
    name: 'OrderAdd',
    component: OrderAdd }, 

    { path: '/ordersubmit', 
    name: 'OrderSubmit',
    component: OrderSubmit }, 

    { path: '/ordermanage', 
    name: 'OrderManage',
    component: OrderManage }, 

  {
    path: '/datareadme', // 你希望用于导航到 DataReadMe 组件的路径
    name: 'DataReadMe',
    component: DataReadMe
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router