import {app, BrowserWindow, ipcMain, session} from 'electron';
import {join} from 'path';
const fs = require('fs');
const path = require('path');



//设置窗口图标
const iconPath = process.env.NODE_ENV === 'development'
  ? path.join(__dirname, 'static', 'buttons.ico')
  : path.join(app.getAppPath(), 'static', 'buttons.ico');

function createWindow () {
  const mainWindow = new BrowserWindow({
    icon: iconPath,// 设置窗口图标
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });


//打开窗口默认最大化
  mainWindow.maximize();


// 这将移除菜单栏
  mainWindow.setMenu(null); 



// 设置调试按钮
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



//创建窗口
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



//监听关闭窗口
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});





// 辅助函数：确保文件从asar包复制到userData目录
// src - 源文件路径
// dest - 目标文件路径
function ensureFileCopied(src, dest) {
  // 检查文件是否已存在于目标路径
  if (fs.existsSync(src) && !fs.existsSync(dest)) {
    // 如果不存在，复制文件到目标路径
    fs.copyFileSync(src, dest);

    // 读取目标文件的内容
    const fileContent = fs.readFileSync(dest, 'utf8');

    // 创建要添加的文本行，包括目标文件的路径
    const lineToAdd = `本文档位于: ${dest}\n`;

    // 将新行和原始内容组合
    const updatedContent = lineToAdd + fileContent;

    // 写回更新后的内容到目标文件
    fs.writeFileSync(dest, updatedContent, 'utf8');
  }
}

// 处理读取文件的请求
ipcMain.on('read-file', (event) => {
  let filePath;
  // 检查当前是否处于开发模式
  if (process.env.NODE_ENV === 'development') {
    // 在开发模式下，直接从项目文件夹中的路径读取文件
    filePath = path.join(__dirname, 'static', 'data', 'DataReadMe.md');
  } else {
    // 在生产模式下，使用userData路径
    const userDataPath = app.getPath('userData');
    const destFilePath = path.join(userDataPath, 'DataReadMe.md');
    const srcFilePath = path.join(process.resourcesPath, 'static', 'data', 'DataReadMe.md');
    // 确保文件已从asar包中复制到userData目录
    ensureFileCopied(srcFilePath, destFilePath);
    // 设置文件路径为userData目录中的路径
    filePath = destFilePath;
  }

  // 读取文件内容
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      // 如果出现错误，向前端发送错误信息
      console.error('读取文件出错', err);
      event.reply('file-error', err.message);
      return;
    }
    // 成功读取后，发送文件内容
    event.reply('file-content', data);
  });
});

// 处理写入文件的请求
ipcMain.on('write-file', (event, updatedContent) => {
  let filePath;
  // 检查当前是否处于开发模式
  if (process.env.NODE_ENV === 'development') {
    // 在开发模式下，直接使用项目文件夹中的路径
    filePath = path.join(__dirname, 'static', 'data', 'DataReadMe.md');
  } else {
    // 在生产模式下，使用userData路径
    filePath = path.join(app.getPath('userData'), 'DataReadMe.md');
  }

  // 将更新后的内容写入文件
  fs.writeFile(filePath, updatedContent, 'utf8', (err) => {
    if (err) {
      // 如果写入过程出错，向前端发送错误信息
      console.error('写入文件出错', err);
      event.reply('file-error', err.message);
      return;
    }
    // 写入成功后，通知前端
    event.reply('file-write-success');
  });
});
