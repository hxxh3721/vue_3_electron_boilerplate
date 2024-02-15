<template>
  <div class="window-bar">
    <div class="drag-region"></div>
    <div class="window-controls">
      <button @click="minimizeWindow">─</button>
      <button @click="maximizeWindow">□</button>
      <button @click="closeWindow">X</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    minimizeWindow() {
      window.minimizeWindow();
    },
    maximizeWindow() {
      window.maximizeWindow();
    },
    closeWindow() {
      window.closeWindow();
    },
  },
};
</script>

<style scoped>
.window-bar {
  -webkit-app-region: drag;
  display: flex;
  justify-content: space-between;
  /* Your styling here */
}
.drag-region {
  -webkit-app-region: drag;
  flex-grow: 1;
}
.window-controls button {
  -webkit-app-region: no-drag;
  /* Button styling */
}
</style>
