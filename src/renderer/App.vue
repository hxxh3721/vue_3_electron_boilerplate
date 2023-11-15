<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import SideBar from './components/SideBar.vue';

const zIndex = 3000
const size = 'small' as 'small'
</script>

<template>
  <div>
  <el-config-provider :size="size" :z-index="zIndex">
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
      <SideBar/>
      </el-aside>
        <el-main><router-view/></el-main>
    </el-container>
  </div>
  </el-config-provider>
</div>
</template>

<style scoped>
.el-main {
  --el-main-padding: 0px;
}

</style>
