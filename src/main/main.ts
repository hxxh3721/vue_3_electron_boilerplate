// main.ts
import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { initDataReadMeModule } from './electron-utils/DataReadMe';
import { setupWindowControls } from './electron-utils/WindowBar';

// 设置窗口图标路径
const iconPath = process.env.NODE_ENV === 'development'
  ? path.join(__dirname, 'static', 'logo.ico')
  : path.join(app.getAppPath(), 'static', 'logo.ico');

let mainWindow;


function createWindow() {
  mainWindow = new BrowserWindow({
    frame: false,
    icon: iconPath,
    webPreferences: {
      devTools: true,
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    backgroundColor: '#000000',
  });

  mainWindow.maximize();
  // mainWindow.setMenu(null);

  if (process.env.NODE_ENV === 'development') {
    const rendererPort = process.argv[2];
    mainWindow.loadURL(`http://localhost:${rendererPort}`);
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), 'renderer', 'index.html'));
  }
}


app.whenReady().then(() => {
  createWindow();
  initDataReadMeModule();
  // 将 windowBar 传递给 IPC 事件处理函数
  setupWindowControls(mainWindow);
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

