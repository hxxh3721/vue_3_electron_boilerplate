// 在主进程中使用
import { ipcMain, BrowserWindow } from 'electron';

export const setupWindowControls = (mainWindow: BrowserWindow) => {
  ipcMain.on('close-window', () => mainWindow.close());
  ipcMain.on('minimize-window', () => mainWindow.minimize());
  ipcMain.on('maximize-window', () => {
    if (mainWindow.isMaximized()) {
      mainWindow.restore();
    } else {
      mainWindow.maximize();
    }
  });
};