## worker-dom.js 插线  woker类型的插件，但是可以在子线程中操作线程容器范围内的HTML元素




### 安装
`npm install @ampproject/worker-dom`

### 引入使用
- *.html
```
// worker.js 是子线程执行的程序
<div id='container' src='worker.js'>
  // 内部的 HTMLElement 可以在 worker.js 中访问的到
  <div id='inside'></div>
<div>

```

- *.js
```

// 引入方法
improt { upgradeElement } from "path/dist/main.js"


// 提升 HTMLElement
upgradeElement(
  // HTMLElement 元素
  document.getElementById('container'),
  'path/dist/worker/worker.mjs'
)

```

-workder.js
```
const dom = document.getElementById('inside')
// …… 其他操作

```

---
### 修改
- 修改UI得方法通过 .innerHTML = '设置'
- 修改 innerText 没有效果


