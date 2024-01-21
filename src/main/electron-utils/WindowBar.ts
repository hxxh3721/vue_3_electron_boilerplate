// WindowBar.ts
import { BrowserWindow, ipcMain } from 'electron';

export function setupWindowControl(mainWindow: BrowserWindow) {
  ipcMain.on('minimize-window', () => {
    mainWindow.minimize();
  });

  ipcMain.on('toggle-maximize-restore', () => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  });

  ipcMain.on('close-window', () => {
    mainWindow.close();
  });
}
