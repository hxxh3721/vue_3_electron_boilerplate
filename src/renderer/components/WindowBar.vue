<template>
  <div class="window-bar">
    <div class="drag-region"></div>
    <div class="window-controls">
      <button @click="minimizeWindow" @mouseover="hoverMinimize=true" @mouseleave="hoverMinimize=false">
        <img :src="hoverMinimize ? 'windowbar/11.png' : 'windowbar/1.png'"/>
      </button>
      <button @click="maximizeWindow" @mouseover="hoverMaximize=true" @mouseleave="hoverMaximize=false">
        <img :src="hoverMaximize ? 'windowbar/22.png' : 'windowbar/2.png'"/>
      </button>
      <button @click="closeWindow" @mouseover="hoverClose=true" @mouseleave="hoverClose=false">
        <img :src="hoverClose ? 'windowbar/33.png' : 'windowbar/3.png'"/>
      </button>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';

// 定义响应式状态
const hoverMinimize = ref(false);
const hoverMaximize = ref(false);
const hoverClose = ref(false);

// 定义方法
const closeWindow = () => window.electron.closeWindow();
const minimizeWindow = () => window.electron.minimizeWindow();
const maximizeWindow = () => window.electron.maximizeWindow();
</script>


<style scoped>
.window-bar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  -webkit-app-region: drag;
  height: 30px;
  width: 100%;
  background-color: #242424;
  overflow: hidden; /* 隐藏溢出内容 */
}

.window-controls {
  display: flex;
  height: 100%; /* 确保控制按钮区域不超过窗口栏的高度 */
}

.window-controls button {
  -webkit-app-region: no-drag;
  background-color: #242424;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex; /* 使得 img 能够在按钮内居中 */
  align-items: center; /* 垂直居中图标 */
  justify-content: center; /* 水平居中图标 */
}


.window-controls button:hover img {
  filter: none; /* 恢复图标原色 */
}

.window-controls button:active img,
.window-controls button.close:hover img {
  background-color: red; /* 这可能需要根据您的具体需求调整 */
}
</style>
