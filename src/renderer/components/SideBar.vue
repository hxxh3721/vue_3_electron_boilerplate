<template>
  <el-row class="sidebar">
    <el-col>
      <el-menu class="menu">
        <!-- 第一个菜单项 -->
        <el-menu-item index="1" class="menu-item menu-item-1">
          <router-link to="/customer" class="button" data-text="商家管理" active-class="active">
            <span class="actual-text">&nbsp;商家管理&nbsp;</span>
            <span class="hover-text">&nbsp;商家管理&nbsp;</span>
          </router-link>
        </el-menu-item>

        <!-- 第二个菜单项 -->
        <el-menu-item index="2" class="menu-item menu-item-2">
          <router-link to="/orders" class="button" data-text="订单管理" active-class="active">
            <span class="actual-text">&nbsp;订单管理&nbsp;</span>
            <span class="hover-text">&nbsp;订单管理&nbsp;</span>
          </router-link>
        </el-menu-item>

        <!-- 第三个菜单项 -->
        <el-menu-item index="3" class="menu-item menu-item-3">
          <router-link to="/products" class="button" data-text="产品管理" active-class="active">
            <span class="actual-text">&nbsp;产品管理&nbsp;</span>
            <span class="hover-text">&nbsp;产品管理&nbsp;</span>
          </router-link>
        </el-menu-item>

        <!-- 第四个菜单项 -->
        <el-menu-item index="4" class="menu-item menu-item-4">
          <router-link to="/analytics" class="button" data-text="分析报告" active-class="active">
            <span class="actual-text">&nbsp;分析报告&nbsp;</span>
            <span class="hover-text">&nbsp;分析报告&nbsp;</span>
          </router-link>
        </el-menu-item>

        <!-- 第五个菜单项 -->
        <el-menu-item index="5" class="menu-item menu-item-5">
          <router-link to="/datareadme" class="button" data-text="客户数据操作日志" active-class="active">
            <span class="actual-text">&nbsp;客户数据操作日志&nbsp;</span>
            <span class="hover-text">&nbsp;客户数据操作日志&nbsp;</span>
          </router-link>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<style scoped>
.sidebar {
  height: 100vh;
  overflow: hidden; /* 隐藏溢出部分 */
}

.menu {
  background-color: #212121; /* 设置背景色 */
  height: 100vh;
  overflow-y: auto; /* 允许垂直滚动 */
  scrollbar-width: none; /* Firefox 浏览器隐藏滚动条 */
}

.menu::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera 浏览器隐藏滚动条 */
}

.menu-item {
  height: 50px; /* 设置每个菜单项的高度 */
  border-right: none; /* 去除右边框 */
  --el-menu-item-height: 30px;
}

.el-menu-item:hover {
    background-color: transparent; /* 设置背景色为透明 */
}

.button {
  margin: 0;
  height: auto;
  background: transparent;
  padding: 0;
  border: none;
  cursor: pointer;
  --border-right: 6px;
  --text-stroke-color: rgba(255, 255, 255, 0.6);
  --fs-size: 1.2em;
  letter-spacing: 3px;
  text-decoration: none;
  font-size: var(--fs-size);
  font-family: "Arial";
  position: relative;
  text-transform: uppercase;
  color: #fff;
}

/* 定义不同菜单项的动画颜色 */
.menu-item-1 .hover-text { --animation-color: #37FF8B; }
.menu-item-2 .hover-text { --animation-color: #FF5733; }
.menu-item-3 .hover-text { --animation-color: #FFC300; }
.menu-item-4 .hover-text { --animation-color: #DAF7A6; }
.menu-item-5 .hover-text { --animation-color: #581845; }

.hover-text {
  position: absolute;
  box-sizing: border-box;
  color: var(--animation-color);
  width: 0%;
  inset: 0;
  border-right: var(--border-right) solid var(--animation-color);
  overflow: hidden;
  transition: 0.5s;
  -webkit-text-stroke: 1px var(--animation-color);
}

.button.active .hover-text, .button:hover .hover-text {
  width: 100%;
  filter: drop-shadow(0 0 15px var(--animation-color));
}
/*取消选中动画*/
.button:not(.active) .hover-text {
  transition: width 0.5s ease, filter 0.5s ease;
}
</style>
