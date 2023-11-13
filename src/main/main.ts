import {app, BrowserWindow, ipcMain, session} from 'electron';
import {join} from 'path';
const fs = require('fs');
const path = require('path');

function createWindow () {
  const mainWindow = new BrowserWindow({
    icon: __dirname + './static/heart.ico', // 设置窗口图标的路径
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.maximize();     //打开窗口默认最大化
  mainWindow.setMenu(null); // 这将移除菜单栏

  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.type === 'keyDown' && input.key === 'F12') {
      mainWindow.webContents.openDevTools();
    }
  });

  if (process.env.NODE_ENV === 'development') {
    const rendererPort = process.argv[2];
    mainWindow.loadURL(`http://localhost:${rendererPort}`);
  }
  else {
    mainWindow.loadFile(join(app.getAppPath(), 'renderer', 'index.html'));
  }
}

app.whenReady().then(() => {
  createWindow();

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ['script-src \'self\'']
      }
    })
  })

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});

ipcMain.on('message', (event, message) => {
  console.log(message);
})

// 数据说明模块读取文档
ipcMain.on('read-file', (event) => {
  const filePath = path.join(__dirname, '../data/DataReadMe.md');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      // 处理错误，如文件不存在等
      console.error('读取文件出错', err);
      return;
    }
    event.reply('file-content', data);
  });
});

// 数据说明模块提交文档
ipcMain.on('write-file', (event, updatedContent) => {
  const filePath = path.join(__dirname, '../data/DataReadMe.md');
  fs.writeFile(filePath, updatedContent, 'utf8', (err) => {
    if (err) {
      // 处理错误
      console.error('写入文件出错', err);
      return;
    }
    // 可选：发送成功的确认信息
  });
});