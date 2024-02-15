// main.ts
import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { initDataReadMeModule } from './electron-utils/DataReadMe';

// 设置窗口图标路径
const iconPath = process.env.NODE_ENV === 'development'
  ? path.join(__dirname, 'static', 'buttons.ico')
  : path.join(app.getAppPath(), 'static', 'buttons.ico');

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

function handleMinimize() {
  mainWindow.minimize();
}

app.whenReady().then(() => {
  createWindow();
  initDataReadMeModule();
  ipcMain.on('minimize-window', () => {
    mainWindow.minimize();
  });

  ipcMain.on('maximize-window', () => {
    if (mainWindow.isMaximized()) {
      mainWindow.restore();
    } else {
      mainWindow.maximize();
    }
  });

  ipcMain.on('close-window', () => {
    mainWindow.close();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
