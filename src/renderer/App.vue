<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import SideBar from './components/SideBar.vue';

const zIndex = 3000
const size = 'small'
</script>

<template>
  <div>
  <el-config-provider :size="size" :z-index="zIndex">
  <div class="common-layout">
    <el-container>
      <el-aside>
      <SideBar/>
      </el-aside>
      <el-container>
        <router-view></router-view>
      </el-container>
    </el-container>
  </div>
  </el-config-provider>
</div>
</template>

<style scoped>

</style>
