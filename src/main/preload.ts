// preload.ts
import { contextBridge, ipcRenderer } from 'electron';



contextBridge.exposeInMainWorld('electron', {

/////////////////////////////////////////////窗口栏缩小方法关闭功能//////////////////////
    closeWindow: () => ipcRenderer.send('close-window'),
    minimizeWindow: () => ipcRenderer.send('minimize-window'),
    maximizeWindow: () => ipcRenderer.send('maximize-window'),


/////////////DataReadMe组件读写文件功能///////////////////////////////////////////////
    send: (channel, data) => {
        // 向主进程发送消息
        ipcRenderer.send(channel, data);
      },
      on: (channel, func) => {
        // 从主进程接收消息
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      },
      readTextFile: (filePath) => {
        // 读取文本文件的方法
        const fs = require('fs');
        return fs.readFileSync(filePath, 'utf8');
      },
      writeTextFile: (filePath, content) => {
        // 写入文本文件的方法
        const fs = require('fs');
        fs.writeFileSync(filePath, content);
      }
})
