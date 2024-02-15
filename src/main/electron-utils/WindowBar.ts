// WindowBar.ts
import { BrowserWindow, ipcMain } from 'electron';

function handleMinimize(mainWindow: BrowserWindow) {
  mainWindow.minimize();
}

function handleToggleMaximizeRestore(mainWindow: BrowserWindow) {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow.maximize();
  }
}

function handleClose(mainWindow: BrowserWindow) {
  mainWindow.close();
}

export function setupWindowControl(mainWindow: BrowserWindow) {
  console.log('Setting up window controls'); // 添加调试信息
  ipcMain.on('minimize-window', () => {
    console.log('Received minimize-window event'); // 添加调试信息
    handleMinimize(mainWindow);
  });
  ipcMain.on('toggle-maximize-restore', () => {
    console.log('Received toggle-maximize-restore event'); // 添加调试信息
    handleToggleMaximizeRestore(mainWindow);
  });
  ipcMain.on('close-window', () => {
    console.log('Received close-window event'); // 添加调试信息
    handleClose(mainWindow);
  });
}