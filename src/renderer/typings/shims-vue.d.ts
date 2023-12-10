//这个文件的作用是让 TypeScript 理解 .vue 文件的导入。在 Vue 项目中，.vue 文件是单文件组件（SFC），该声明文件确保 TypeScript 能够正确处理这些文件的导入，从而使得类型检查和自动补全等功能能够在 .vue 文件中正常工作。
//shims" 指的是一个小的库或工具，其目的是充当一个兼容层，使旧的 API 能够与新的 API 一起使用，或使不同的软件组件能够一起工作。

// 声明一个模块，用于处理以 .vue 结尾的文件
declare module '*.vue' {
  // 从 vue 包中导入 DefineComponent 类型
  import type { DefineComponent } from 'vue'

  // 定义一个 component 常量，它是一个 DefineComponent 类型
  const component: DefineComponent<{}, {}, any>
  // 导出这个 component
  export default component
}
