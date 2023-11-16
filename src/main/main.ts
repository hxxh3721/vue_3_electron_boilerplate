import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import fs from 'fs';

// 设置窗口图标路径
const iconPath = process.env.NODE_ENV === 'development'
  ? path.join(__dirname, 'static', 'buttons.ico')
  : path.join(app.getAppPath(), 'static', 'buttons.ico');


// 创建浏览器窗口的函数
function createWindow() {
  const mainWindow = new BrowserWindow({
    icon: iconPath, // 设置窗口图标
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
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


// 复制文件并在文件开头添加路径信息
function copyFileWithHeader(src, dest) {
  fs.copyFileSync(src, dest);
  const header = `本文件位于：${dest}\n`;
  const content = fs.readFileSync(dest, 'utf8');
  fs.writeFileSync(dest, header + content, 'utf8');
}


// 当Electron应用准备就绪后执行
app.whenReady().then(() => {
  createWindow(); // 创建窗口

  if (process.env.NODE_ENV !== 'development') {
    const userDataPath = app.getPath('userData');
    const destFilePath = path.join(userDataPath, 'DataReadMe.md');
    const srcFilePath = path.join(app.getAppPath(), 'static', 'data', 'DataReadMe.md');

    // 生产模式下，如果文件不存在，则复制并添加路径头
    if (!fs.existsSync(destFilePath)) {
      copyFileWithHeader(srcFilePath, destFilePath);
    }
  }
});



// 当所有窗口关闭时退出应用（MacOS除外）
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// 处理读取文件的请求
ipcMain.on('read-file', (event) => {
  const userDataPath = app.getPath('userData');
  const filePath = process.env.NODE_ENV === 'development'
    ? path.join(__dirname, 'static', 'data', 'DataReadMe.md')
    : path.join(userDataPath, 'DataReadMe.md');

  // 读取文件并发送内容到渲染器进程
  const data = fs.readFileSync(filePath, 'utf8');
  event.reply('file-content', data);
});

// 处理写入文件的请求
ipcMain.on('write-file', (event, updatedContent) => {
  const userDataPath = app.getPath('userData');
  const filePath = process.env.NODE_ENV === 'development'
    ? path.join(__dirname, 'static', 'data', 'DataReadMe.md')
    : path.join(userDataPath, 'DataReadMe.md');

  // 将更新后的内容写入文件
  fs.writeFileSync(filePath, updatedContent, 'utf8');
})
