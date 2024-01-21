// 引入 Electron 的 contextBridge 和 ipcRenderer 模块
import {contextBridge, ipcRenderer} from 'electron';

// 通过 contextBridge 在渲染器的全局作用域中暴露一个 electronAPI 对象
contextBridge.exposeInMainWorld('electronAPI', {
  // 提供 sendMessage 方法，允许渲染器进程通过 ipcRenderer 向主进程发送消息
  sendMessage: (message: string) => ipcRenderer.send('message', message)
})

// 再次使用 contextBridge 暴露一个 electron 对象
contextBridge.exposeInMainWorld('electron', {
  // 提供 send 方法，用于从渲染器进程发送 IPC 消息
  send: ipcRenderer.send,
  // 提供 on 方法，用于监听主进程发送的 IPC 消息
  on: (channel, func) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  },
  minimizeWindow: () => ipcRenderer.send('minimize-window'),
  toggleMaximizeRestore: () => ipcRenderer.send('toggle-maximize-restore'),
  closeWindow: () => ipcRenderer.send('close-window')
});
