/* eslint-disable */ // 禁用 ESLint 的代码检查
/* prettier-ignore */ // 让 Prettier 忽略此文件的格式化
// @ts-nocheck // 让 TypeScript 忽略此文件的类型检查
// Generated by unplugin-vue-components // 由 unplugin-vue-components 插件生成
// 了解更多：https://github.com/vuejs/core/pull/3399
export {}

// 扩展 Vue 模块的声明
declare module 'vue' {
  // 声明全局组件
  export interface GlobalComponents {
    // 以下是一系列从 element-plus/es 导入的组件声明
    ElAside: typeof import('element-plus/es')['ElAside']
    ElButton: typeof import('element-plus/es')['ElButton']
    // ... 其他组件声明
  }
  // 声明组件自定义属性
  export interface ComponentCustomProperties {
    vInfiniteScroll: typeof import('element-plus/es')['ElInfiniteScroll']
  }
}

//这个 components.d.ts 文件是由 unplugin-vue-components 插件自动生成的 TypeScript 声明文件，主要用于声明 Vue 应用中使用的全局组件。这样做可以在不显式导入组件的情况下，在模板中直接使用这些组件。
//这个文件使得在 Vue 的 SFC (单文件组件) 中可以无需显式地导入 Element Plus 组件或其他库中的组件，提高了开发效率。