import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'

const Path = require('path');
const { defineConfig } = require('vite');

/**
 * https://vitejs.dev/config
 */
const config = defineConfig({
    root: Path.join(__dirname, 'src', 'renderer'),
    publicDir: 'public',
    server: {
        port: 8080,
    },
    open: false,
    build: {
        outDir: Path.join(__dirname, 'build', 'renderer'),
        emptyOutDir: true,
    },
    plugins: [
        // 使用 Object.assign 或者 spread operator 来合并 plugins 选项
        Object.assign(vue(), {
          template: {
            compilerOptions: {
              // 这里是 experimentalTemplateCompilerOptions 的配置
              // 开启 script setup 语法
              enableScriptSetup: true,
              // 开启 <style vars> 语法
              enableStyleVars: true,
              // 开启 <style scoped> 语法
              enableStyleScoped: true
            }
          }
        }),
        AutoImport({
          resolvers: [ElementPlusResolver()],
        }),
        Components({
          resolvers: [ElementPlusResolver()],
        }),
    ],
});

module.exports = config;
