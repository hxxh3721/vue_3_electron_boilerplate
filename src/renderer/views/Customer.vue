<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'; // 导入 useRouter



// 初始化 router 实例
const router = useRouter();

// 新增客户按钮点击事件处理函数
const navigateToAddCustomer = () => {
  router.push('/customeradd'); // 使用 router.push 跳转到 AddCustomer 视图
};


/*设置无限滚动*/
const count = ref(0)
const load = () => {
  count.value += 2
}



/*设置spacer自动填充空隙*/
const fillRatio = ref(30)


/*设置添加商家按钮样式*/
const buttonStyle = ref({
  background: 'linear-gradient(90deg, #051937, #004d7a, #008793, #00bf72, #a8eb12)',
});
</script>


<template>
    <div class="common-layout">
      <el-container>
        <el-header class="custom-header">
          <el-button :style="buttonStyle" class="custom-active-button" type="info" @click="navigateToAddCustomer">新增客户</el-button>
        </el-header>
        <el-main v-infinite-scroll="load" class="main-content">
            <el-space fill      
            :fill-ratio="fillRatio"
            wrap :size="30" shadow="hover" style="width: 100%">
        <el-card v-for="i in 200" :key="i" class="box-card" style="width: 250px">
        <template #header>
        <div class="card-header">
          <span>商户名</span>
          <el-button class="button" text>修改信息</el-button>
        </div>
      </template>
      <div v-for="o in 5" :key="o" class="text item">
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

  .card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

  .main-content {
    overflow: hidden;
    overflow-y: auto; /* 当内容超过元素高度时显示滚动条，否则不显示 */
    max-height: 100vh; /* 设置最大高度为视口的高度 */
    /* 保留你的其他样式 */
  }


.custom-active-button{
  color: '#FFDD00', /* 设置文本颜色为白色*/
}

.custom-active-button:active {
  color: #050505; /* 黑色文本 */
  font-weight: bold; /* 加粗字体 */
}
  </style>