## 用来测试校验worker的方法；
- 用来检测worker运行在其他线程
-*.js
```
// 开启子线程
const worker = new Worker('path/worker.js')

// 开启主线程的定时任务
let count=0;
setInterval(()=>{
  console.log('main thread: ', count++)
},1000)

// 定时挂起主线程
setTimout(()=>{
  alert()
},3000)

```

- worker.js
```
let count = 0;

// 开启线程的定时任务
setInterval(()=>{
  console.log('child thread: ', count++)
},1000)

```