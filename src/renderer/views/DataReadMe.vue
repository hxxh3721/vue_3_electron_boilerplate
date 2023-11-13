<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ipcRenderer } from 'electron';

const content = ref<string>('');
const isReadOnly = ref<boolean>(true);

onMounted(() => {
  ipcRenderer.send('read-file');
  ipcRenderer.on('file-content', (event: any, data: string) => {
    content.value = data;
  });
});

const toggleEdit = () => {
  isReadOnly.value = !isReadOnly.value;
};

const submitChanges = () => {
  ipcRenderer.send('write-file', content.value);
  isReadOnly.value = true;
};
</script>


<template>
    <el-row class="centered-row">
      <el-button type="primary" @click="toggleEdit">编辑</el-button>
      <el-button type="success" @click="submitChanges">提交</el-button>
    </el-row>
  
    <el-divider style="margin-top: 0px;"/>
  
    <el-row>
      <textarea class="full-width-textarea" v-model="content" :readonly="isReadOnly" cols="30" rows="10"></textarea>
    </el-row>
  </template>
  
  <style scoped>
  .centered-row {
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    height: 50px; /* 设置一个固定高度 */
  }
  
  .full-width-textarea {
    width: 100%; /* 宽度填充满容器 */
    box-sizing: border-box; /* 边框和内边距的空间包含在宽度内 */
  }
  </style>
  