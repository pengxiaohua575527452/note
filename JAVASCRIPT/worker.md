
# 单一woker
(查看文档)[http://www.ruanyifeng.com/blog/2018/07/web-worker.html]
## 主线程
```
// opstions 可以定义 woker 中使用的path/filename.js 文件是否是模块类型的文件
// 也就是是否可以使用 import
const woker = new Woker('path/filename.js', options)

// 可以通过 importScripts('./module.js')
// 导入一个模块.js 文件实现模拟的错误
// 在woker.type === 'module' 的情况下不可以使用 importScripts()
worker.onerror = err => {
  console.log('发生错误的回调函数')
}


worker.onmessage = e => {
  console.log('接收到 从子线程发送回来的消息')
}

worker.onmessageerror = e => {
  console.log('消息无法序列化后的错误回调')
}

worker.postMessage(copydata)

worker.terminate() // 结束worker , path/filename.js 文件里面的代码会立即停止执行
```


## worker 线程
```
// 引入其他的js文件
// js 文件不能够是模块类型的文件
// 就不不能够有 export 
// 导入文件中声明的 变量 在当前woker 中能够直接访问
// 等于与在当前worker 的JS文件中声明了
importScript('path/filename1.js', 'path/filename2.js')


self.onmessage = e => {
  console.log(e.data)
}

self.onmessageerror = e =>{
  console.log('接收的数据无法序列化')
}

self.close() // 关闭

self.postMessage(copyData) //发送拷贝的信息 
```


---

# sharedWorker - 共享woker 可以是同源策略下的不同窗口可以同时访问
(查看文档)[https://developer.mozilla.org/zh-CN/docs/Web/API/SharedWorker]
- 相关的方法/属性 说明：
| 方法/属性 名称 | 说明 |
| :- | :- |
| SharedWorker | [全局的构造函数](https://developer.mozilla.org/zh-CN/docs/Web/API/SharedWorker/SharedWorker)，new SharedWorker('path/filename.js', 'name') |
|  |  |
|  |  |
|  |  |
|  |  |
|  |  |
|  |  |
|  |  |
|  |  |
|  |  |
|  |  |
|  |  |
|  |  |
|  |  |
|  |  |

## 备注
- 在sharedWorker 的线程不能够使用 console.log()
- 不太方便调试，而且现在的支持度不是很好