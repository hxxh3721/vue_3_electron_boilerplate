/*
  这个文件的主要作用是在 TypeScript 中声明全局的 window 对象上的 electronAPI 和 electron 属性，从而使渲染器进程能够以类型安全的方式访问 Electron 提供的 API。
 * 应与 main/preload.ts 中的类型匹配，以在渲染器中提供 TypeScript 支持
 */
export default interface ElectronApi {
  sendMessage: (message: string) => void // 定义一个方法用于发送消息
}

declare global {
  interface Window {
    electronAPI: ElectronApi, // 在全局 Window 对象上声明 electronAPI，具有 ElectronApi 接口
    electron: {
      send: (channel: string, data?: any) => void; // 定义一个方法用于发送 IPC 消息
      on: (channel: string, func: (...args: any[]) => void) => void; // 定义一个方法用于监听 IPC 消息
    }
  }
}
