import { ipcMain, app } from 'electron';
import fs from 'fs';
import path from 'path';

// 复制文件并在文件开头添加路径信息的函数
function copyFileWithHeader(src: string, dest: string) {
  fs.copyFileSync(src, dest);
  const header = `本文件位于：${dest}\n`;
  const content = fs.readFileSync(dest, 'utf8');
  fs.writeFileSync(dest, header + content, 'utf8');
}

// 设置文件环境的函数
function setupFileEnvironment() {
  if (process.env.NODE_ENV !== 'development') {
    const userDataPath = app.getPath('userData');
    const destFilePath = path.join(userDataPath, 'DataReadMe.md');
    // 这里的路径是正确的，它直接使用 app.getAppPath() 指向项目根目录
    const srcFilePath = path.join(app.getAppPath(), 'static', 'data', 'DataReadMe.md');

    if (!fs.existsSync(destFilePath)) {
      copyFileWithHeader(srcFilePath, destFilePath);
    }
  }
}

// 处理读取文件请求的函数
function handleReadFileRequest(event) {
  const userDataPath = app.getPath('userData');
  // 在开发环境中，需要添加 '..' 来从 electron-utils 文件夹返回到项目根目录
  const filePath = process.env.NODE_ENV === 'development'
    ? path.join(__dirname, '..', 'static', 'data', 'DataReadMe.md') 
    : path.join(userDataPath, 'DataReadMe.md');

  const data = fs.readFileSync(filePath, 'utf8');
  event.reply('file-content', data);
}

// 处理写入文件请求的函数
function handleWriteFileRequest(event, updatedContent) {
  const userDataPath = app.getPath('userData');
  // 在开发环境中，需要添加 '..' 来从 electron-utils 文件夹返回到项目根目录
  const filePath = process.env.NODE_ENV === 'development'
    ? path.join(__dirname, '..', 'static', 'data', 'DataReadMe.md') 
    : path.join(userDataPath, 'DataReadMe.md');

  fs.writeFileSync(filePath, updatedContent, 'utf8');
}

// 初始化 DataReadMe 模块的函数
export function initDataReadMeModule() {
  setupFileEnvironment();
  
  ipcMain.on('read-file', handleReadFileRequest);
  ipcMain.on('write-file', handleWriteFileRequest);
}
