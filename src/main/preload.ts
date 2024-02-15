// preload.ts

import { ipcRenderer } from 'electron';

export {};

declare global {
  interface Window {
    minimizeWindow: () => void;
    maximizeWindow: () => void;
    closeWindow: () => void;
  }
}

window.minimizeWindow = () => {
  ipcRenderer.send('minimize-window');
};

window.maximizeWindow = () => {
  ipcRenderer.send('maximize-window');
};

window.closeWindow = () => {
  ipcRenderer.send('close-window');
};
