<template>
    <el-row class="tac">
      <el-col>
        <el-menu class="el-menu-vertical-demo">
          <el-menu-item index="1">
            <el-icon><avatar /></el-icon>
            <span>商家管理</span>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon><list /></el-icon>
            <span>创建订单</span>
          </el-menu-item>
          <el-menu-item index="3">
            <el-icon><Search /></el-icon>
            <span>查看订单</span>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon><Printer /></el-icon>
            <span>核销订单</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </template>
  
  <script lang="ts" setup>
  import {
    Avatar,
    List,
    Search,
    Printer,
  } from '@element-plus/icons-vue'
  </script> 

  

<style scoped>
.el-menu-vertical-demo {
  height: 100vh; 
  display: flex; /* 使用Flex布局 */
  flex-direction: column; /* 子元素垂直排列 */
}

.el-menu-item {
  flex-grow: 1; /* 平分高度 */
  display: flex; /* 使用Flex布局 */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  background-color: #f5f5f5; /* 默认背景色 */
}

/* 不同层次的灰色 */
.el-menu-item:nth-child(1) {
  background: linear-gradient(180deg, #6D888F, #658689);
}
.el-menu-item:nth-child(2) {
  background: linear-gradient(180deg, #658689, #5F8380);
}
.el-menu-item:nth-child(3) {
  background: linear-gradient(180deg, #5F8380, #5C8077);
}

.el-menu-item:nth-child(4) {
  background: linear-gradient(180deg, #5C8077, #5C7D6C);
}

.el-menu-item.is-active {
  color: #FFDD00; /* Set text color to black */
  font-weight: bold; /* 设置字体加粗 */
}
</style>
                                   
