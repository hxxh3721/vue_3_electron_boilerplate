import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { initDataReadMeModule } from './electron-utils/DataReadMe';
import { setupWindowControl } from './electron-utils/WindowBar';

// 设置窗口图标路径
const iconPath = process.env.NODE_ENV === 'development'
  ? path.join(__dirname, 'static', 'buttons.ico')
  : path.join(app.getAppPath(), 'static', 'buttons.ico');



let mainWindow; // 将 mainWindow 定义在顶层作用域

// 创建浏览器窗口的函数
function createWindow() {
  mainWindow = new BrowserWindow({
    frame: false,
    icon: iconPath, // 设置窗口图标
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    backgroundColor: '#000000', // 设置背景颜色为黑色
  });

  mainWindow.maximize(); // 打开窗口默认最大化
  mainWindow.setMenu(null); // 移除菜单栏

  // 在开发模式下，加载开发服务器的URL
  if (process.env.NODE_ENV === 'development') {
    const rendererPort = process.argv[2];
    mainWindow.loadURL(`http://localhost:${rendererPort}`);
  } else {
    // 在生产模式下，加载编译后的HTML文件
    mainWindow.loadFile(path.join(app.getAppPath(), 'renderer', 'index.html'));
  }
}



// 当Electron应用准备就绪后执行
app.whenReady().then(() => {
  createWindow(); // 创建窗口
  setupWindowControl(mainWindow); // 使用 setupWindowControl
  initDataReadMeModule(); // 初始化 DataReadMe 模块
});



// 当所有窗口关闭时退出应用（MacOS除外）
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
