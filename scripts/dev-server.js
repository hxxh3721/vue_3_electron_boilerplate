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
    if (electronProcess) {
        return;
    }
    try {
        await compileTs(Path.join(__dirname, '..', 'src', 'main'));
    } catch {
        console.log(Chalk.redBright('无法启动 Electron，因为存在 TypeScript 错误。'));
        electronProcessLocker = false;
        return;
    }
    const args = [Path.join(__dirname, '..', 'build', 'main', 'main.js'), rendererPort];
    electronProcess = ChildProcess.spawn(Electron, args);
    electronProcessLocker = false;

    // 配置 Electron 子进程的输出
    electronProcess.stdout.on('data', data => {
        if (data == EOL) {
            return;
        }
        process.stdout.write(Chalk.blueBright(`[electron] `) + Chalk.white(data.toString()))
    });

    electronProcess.stderr.on('data', data => 
        process.stderr.write(Chalk.blueBright(`[electron] `) + Chalk.white(data.toString()))
    );

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

// 复制静态文件到构建目录
function copyStaticFiles() {
    copy('static');
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

// 停止服务和退出程序的函数
function stop() {
    viteServer.close();
    process.exit();
}

// 主函数，用于启动整个开发服务器
async function start() {
    console.log(`${Chalk.greenBright('=======================================')}`);
    console.log(`${Chalk.greenBright('Starting Electron + Vite Dev Server...')}`);
    console.log(`${Chalk.greenBright('=======================================')}`);

    const devServer = await startRenderer();
    rendererPort = devServer.config.server.port;

    copyStaticFiles();
    startElectron();

    // 监听文件变动，重启 Electron 进程
    const path = Path.join(__dirname, '..', 'src', 'main');
    Chokidar.watch(path, { cwd: path }).on('change', (path) => {
        console.log(Chalk.blueBright(`[electron] `) + `文件 ${path} 发生变动，正在重载... 🚀`);

        if (path.startsWith(Path.join('static', '/'))) {
            copy(path);
        }

        restartElectron();
    });
}

start();



