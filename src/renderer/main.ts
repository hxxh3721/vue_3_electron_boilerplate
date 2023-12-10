// 导入 Vue 函数
import { createApp } from 'vue'
// 导入 App 组件
import App from './App.vue'
// 导入 Pinia 状态管理库
import { createPinia } from 'pinia'
// 导入 Vue 路由
import router from './router'

// 导入样式文件
import './style.css';
// 导入 Element Plus 的暗色主题样式
import 'element-plus/theme-chalk/dark/css-vars.css'

// 创建 Vue 应用实例
const app = createApp(App);
// 创建 Pinia 实例
const pinia = createPinia()
// 使用 Pinia 和 Vue 路由
app.use(pinia)
app.use(router)
// 将 Vue 应用挂载到 DOM 元素上
app.mount('#app');
