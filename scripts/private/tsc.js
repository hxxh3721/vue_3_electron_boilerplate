// 引入 Node.js 的 child_process 模块，用于创建子进程
const ChildProcess = require('child_process');

// 引入 chalk 模块，用于在控制台输出彩色文本
const Chalk = require('chalk');

// 定义一个编译函数，用于编译 TypeScript 代码
function compile(directory) {
  // 返回一个新的 Promise 对象
  return new Promise((resolve, reject) => {
    // 创建一个子进程来执行 tsc 命令
    const tscProcess = ChildProcess.exec('tsc', {
      cwd: directory, // 设置当前工作目录为传入的 directory
    });

    // 当子进程有标准输出时，将输出的数据写入到主进程的标准输出
    tscProcess.stdout.on('data', data => 
        process.stdout.write(Chalk.yellowBright(`[tsc] `) + Chalk.white(data.toString()))
    );

    // 当子进程退出时，根据退出代码来决定是解决还是拒绝 Promise
    tscProcess.on('exit', exitCode => {
      if (exitCode > 0) {
        reject(exitCode); // 如果退出代码大于 0，拒绝 Promise
      } else {
        resolve(); // 否则解决 Promise
      }
    });
  });
}

// 导出 compile 函数
module.exports = compile;


/*将 tsc.js 放在一个名为 private 的文件夹中，而不是与 dev-server.js 和 build.js 放在同一个 scripts 文件夹中，可能有几个原因：

模块化和组织结构：作者可能想要保持项目的结构清晰和模块化。将特定功能的脚本放在不同的目录中可以帮助维护代码的清晰度和可管理性。例如，private 文件夹可能用于存放那些不打算被外部直接调用的辅助模块。

重用和封装：tsc.js 可能被设计为一个更通用的 TypeScript 编译工具，可以在多个项目中重用，而不仅仅是在当前项目中。通过将其放在一个单独的文件夹中，作者可以更容易地维护和更新这个脚本，而不会影响到其他脚本。

隐藏实现细节：将 tsc.js 放在 private 文件夹中可能是为了隐藏其实现细节，使得项目的其他部分不需要关心 TypeScript 编译的具体方式。这样一来，dev-server.js 和 build.js 可以作为更高层次的脚本来运行，而不用关心底层的编译细节。

安全或策略考虑：在某些情况下，特定的脚本或代码可能需要被放在单独的目录中以满足安全或项目策略的要求。这可以防止不小心修改或删除重要的辅助脚本。

每个项目的组织结构都有其特定的逻辑和原因，这些原因可能因项目、团队习惯或个人偏好而异。 */