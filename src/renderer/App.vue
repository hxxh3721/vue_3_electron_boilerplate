<script setup lang="ts">
import { ElConfigProvider, formContextKey } from 'element-plus'
import SideBar from './components/SideBar.vue';
import  WindowBar from  './components/WindowBar.vue';

const zIndex = 3000
const size = 'small' as 'small'
</script>

<template>
  <div>
  <el-config-provider :size="size" :z-index="zIndex">
  <div class="common-layout">
    <el-container>
        <WindowBar/>   
    </el-container>
    <el-container>
      <el-aside width="200px">
      <SideBar/>
      </el-aside>
      <el-main class="scrollable-container">
        <router-view/>
      </el-main>
    </el-container>
  </div>
  </el-config-provider>
</div>
</template>

<style scoped>
.el-main {
  --el-main-padding: 0px;
}

.el-main, .el-container {
  flex: 1;
  overflow: auto; /* 如果内容超出则在此容器内显示滚动条 */
}

.scrollable-container {
  flex: 1;
  overflow: auto;
}

.common-layout {
  height: 100vh; /* 确保父容器占满整个视口高度 */
  overflow: hidden; /* 隐藏超出部分 */
}
</style>
