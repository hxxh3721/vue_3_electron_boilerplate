<script lang="ts" setup>
import { ref } from 'vue'
const count = ref(0)
const load = () => {
  count.value += 2
}
const fillRatio = ref(30)

</script>


<template>
    <div class="common-layout">
      <el-container>
        <el-header class="custom-header">
          <el-button type="warning">新增客户</el-button>
        </el-header>
        <el-main v-infinite-scroll="load" class="main-content">
            <el-space fill      
            :fill-ratio="fillRatio"
            wrap :size="30" shadow="hover" style="width: 100%">
        <el-card v-for="i in 20" :key="i" class="box-card" style="width: 250px">
        <template #header>
        <div class="card-header">
          <span>Card name</span>
          <el-button class="button" text>Operation button</el-button>
        </div>
      </template>
      <div v-for="o in 4" :key="o" class="text item">
        {{ 'List item ' + o }}
      </div>
    </el-card>
    </el-space>
    </el-main>
    </el-container>
    </div>
  </template>
  
  <style scoped>
  .common-layout {
    height: 100vh; /* 100%视口高度 */
  }
  
  .custom-header {
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    padding: 10px 0px 10px 0px;
    border-bottom: 1px dashed white; /* 下边界的白色虚线 */
    height: calc(100% - 20px); /* 高度减去上下内边距 */
  }
  
  .el-header .el-button {
    width: calc(100% - 20px); /* 宽度为header宽度减去左右的内边距 */
    height: calc(100% - 20px); /* 高度为header高度减去上下的内边距 */
    text-align: center; /* 文字水平居中 */
    font-size: 30px; /* 文字大小随着宽度等比例变化 */
    padding: 10px; /* 内边距 */
    box-sizing: border-box; /* 使padding包含在宽高计算内 */
  }

  .main-content {
  overflow: hidden;
}
  </style>