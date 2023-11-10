<template>
    <el-row class="tac">
      <el-col>
        <el-menu class="el-menu-vertical-demo">
          <el-menu-item index="1">
            <el-icon><icon-menu /></el-icon>
            <span>Navigator Two</span>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon><icon-menu /></el-icon>
            <span>Navigator Two</span>
          </el-menu-item>
          <el-menu-item index="3">
            <el-icon><document /></el-icon>
            <span>Navigator Three</span>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon><setting /></el-icon>
            <span>Navigator Four</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </template>
  
  <script lang="ts" setup>
  import {
    Document,
    Menu as IconMenu,
    Setting,
  } from '@element-plus/icons-vue'
  </script> 

  

<style scoped>
.el-menu-vertical-demo{
  height: 100vh; /* 这会使菜单栏的高度等于视口的100% */
}
</style>

