//build.js 负责构建整个 Electron 应用程序，包括渲染器和主进程。它使用 Vite 来构建渲染器进程，并使用自定义的 TypeScript 编译脚本来编译主进程。
//它和tsc.js共同确保了您的应用程序可以从源代码正确地编译和构建，为后续的打包和发布做好准备。


// 导入 Node.js 的 path 模块，用于处理文件路径
const Path = require('path');

// 导入 chalk 模块，用于在控制台输出彩色文本
const Chalk = require('chalk');

// 导入 Node.js 的 fs 模块，用于文件系统操作
const FileSystem = require('fs');

// 导入 Vite 模块，一个现代前端构建工具
const Vite = require('vite');

// 导入自定义的 TypeScript 编译模块
const compileTs = require('./private/tsc');

// 定义一个函数来构建渲染器进程，使用 Vite 并指定配置文件和运行模式
function buildRenderer() {
    return Vite.build({
        configFile: Path.join(__dirname, '..', 'vite.config.js'),
        base: './',
        mode: 'production'
    });
}

// 定义一个函数来构建主进程，编译位于特定路径的 TypeScript 代码
function buildMain() {
    const mainPath = Path.join(__dirname, '..', 'src', 'main');
    return compileTs(mainPath);
}

// 删除 build 目录及其内容，以准备新的构建
FileSystem.rmSync(Path.join(__dirname, '..', 'build'), {
    recursive: true,
    force: true,
})

// 在控制台输出蓝色的提示信息，表示开始转译渲染器和主进程
console.log(Chalk.blueBright('Transpiling renderer & main...'));

// 并行执行渲染器和主进程的构建任务，完成后输出绿色的成功信息
Promise.allSettled([
    buildRenderer(),
    buildMain(),
]).then(() => {
    console.log(Chalk.greenBright('Renderer & main successfully transpiled! (ready to be built with electron-builder)'));
});
