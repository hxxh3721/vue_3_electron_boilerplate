// 导入各种 Vite 插件和工具
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
import vuePlugin from '@vitejs/plugin-vue';

const Path = require('path');
const { defineConfig } = require('vite');

// Vite 配置文档：https://vitejs.dev/config
const config = defineConfig({
    // 设置项目的根目录
    root: Path.join(__dirname, 'src', 'renderer'),
    // 指定静态资源目录
    publicDir: 'public',
    // 配置开发服务器
    server: {
        port: 8080, // 指定服务器端口
    },
    open: false, // 是否在服务器启动时自动打开浏览器
    // 构建配置
    build: {
        outDir: Path.join(__dirname, 'build', 'renderer'), // 指定输出目录
        emptyOutDir: true, // 构建前清空输出目录
    },
    // 插件列表
    plugins: [
        vuePlugin(), // Vue 插件
        AutoImport({ // 自动导入插件
          resolvers: [ElementPlusResolver()],
        }),
        Components({ // Vue 组件插件
          resolvers: [ElementPlusResolver()],
        }),
    ],
});

module.exports = config;