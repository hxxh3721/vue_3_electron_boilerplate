//这个脚本用于启动和管理您的 Electron 应用程序的开发服务器。它通过 Vite 启动渲染器，并使用 Electron 来启动主进程。脚本还包括监听文件变化并重启 Electron 进程的逻辑，以便在开发过程中实现热重载。


// 设置环境变量为开发模式
process.env.NODE_ENV = 'development';

// 引入所需模块
const Vite = require('vite');
const ChildProcess = require('child_process');
const Path = require('path');
const Chalk = require('chalk');
const Chokidar = require('chokidar');
const Electron = require('electron');
const compileTs = require('./private/tsc');
const FileSystem = require('fs');
const { EOL } = require('os');

// 初始化一些变量
let viteServer = null;
let electronProcess = null;
let electronProcessLocker = false;
let rendererPort = 0;

// 定义启动渲染器的异步函数
async function startRenderer() {
    viteServer = await Vite.createServer({
        configFile: Path.join(__dirname, '..', 'vite.config.js'),
        mode: 'development',
    });
    return viteServer.listen();
}

// 定义启动 Electron 的异步函数
async function startElectron() {
    // 检查是否已经启动 Electron 进程，避免重复启动
    if (electronProcess) {
        return; // 如果已经启动，直接返回
    }
    
    try {
        // 编译 TypeScript 代码，如果出错则捕获异常
        await compileTs(Path.join(__dirname, '..', 'src', 'main'));
    } catch {
        // 如果编译出错，输出错误信息，然后设置标志
        console.log(Chalk.redBright('无法启动 Electron，因为存在 TypeScript 错误。'));
        electronProcessLocker = false;
        return;
    }
    
    // 构建启动 Electron 进程所需的参数数组
    const args = [Path.join(__dirname, '..', 'build', 'main', 'main.js'), rendererPort];
    
    // 使用 ChildProcess.spawn 方法启动 Electron 主进程，注意方法名字虽然是子进程，但是实际启动的是electron主进程
    electronProcess = ChildProcess.spawn(Electron, args);
    
    // 设置标志，表示 Electron 进程已启动
    electronProcessLocker = false;

    // 配置 Electron 主进程的输出
    electronProcess.stdout.on('data', data => {
        if (data == EOL) {
            return; // 忽略空数据
        }
        // 将 Electron 主进程的标准输出写入标准输出流，并添加标识
        process.stdout.write(Chalk.blueBright(`[electron] `) + Chalk.white(data.toString()))
    });

    electronProcess.stderr.on('data', data => {
        // 将 Electron 主进程的标准错误写入标准错误流，并添加标识
        process.stderr.write(Chalk.blueBright(`[electron] `) + Chalk.white(data.toString()))
    });

    // 监听 Electron 主进程的退出事件，然后调用 stop 函数
    electronProcess.on('exit', () => stop());

}


// 重启 Electron 进程的函数
function restartElectron() {
    if (electronProcess) {
        electronProcess.removeAllListeners('exit');
        electronProcess.kill();
        electronProcess = null;
    }
    if (!electronProcessLocker) {
        electronProcessLocker = true;
        startElectron();
    }
}



// 复制文件的辅助函数
/*
Electron的工作目录是build/main，而不是src/main，这是因为使用了TypeScript。
tsc不会复制静态文件，因此需要手动将它们复制到开发服务器中。
*/
function copy(path) {
    FileSystem.cpSync(
        Path.join(__dirname, '..', 'src', 'main', path),
        Path.join(__dirname, '..', 'build', 'main', path),
        { recursive: true }
    );
}


// 复制静态文件到构建目录
function copyStaticFiles() {
    copy('static');
}



// 停止服务和退出程序的函数
function stop() {
    viteServer.close();
    process.exit();
}

// 主函数，用于启动整个开发服务器
async function start() {
    // 输出启动信息
    console.log(`${Chalk.greenBright('=======================================')}`);
    console.log(`${Chalk.greenBright('Starting Electron + Vite Dev Server...')}`);
    console.log(`${Chalk.greenBright('=======================================')}`);

    // 启动渲染器开发服务器，获取其配置中的端口号
    const devServer = await startRenderer();
    rendererPort = devServer.config.server.port;

    // 复制静态文件到构建目录
    copyStaticFiles();

    // 启动 Electron 主进程
    startElectron();

    // 监听文件变动，用于重启 Electron 进程
    const path = Path.join(__dirname, '..', 'src', 'main');

    // 使用 Chokidar 模块创建文件变动的监听器，监视指定目录中的文件变动
    Chokidar.watch(path, { cwd: path }).on('change', (changedFilePath) => {
        // 打印文件变动信息，包括文件路径和提示消息
        console.log(Chalk.blueBright(`[electron] `) + `文件 ${changedFilePath} 发生变动，正在重载... 🚀`);

        // 检查变动的文件是否位于静态文件目录
        if (changedFilePath.startsWith(Path.join('static', '/'))) {
            // 如果是静态文件目录中的文件变动，执行以下操作：

            // 复制变动的文件到构建目录，以确保最新的静态文件被更新到构建目录
            copy(changedFilePath);
        }

        // 重启 Electron 进程，以应用最新的代码和资源变动
        restartElectron();
    });
}

// 调用主函数启动开发服务器
start();



