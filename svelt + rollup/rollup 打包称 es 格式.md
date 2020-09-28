## rollup 打包称 es 格式

- 需要修改的地方；
> rollup.config.js 文件
···

output: {
	……
	// 设定打包的格式
	format: 'es',
},

···

- 打包后的JS文件
	- 标准样式
```
var it = new (class extends J {
  constructor(t) {
    super(), I(this, t, st, rt, c, {});
  }
})({ target: document.body });
export default it;

```
	- 如果需要自定控制修改为
```
 
export default class extends J {
  constructor(t) {
    super(), I(this, t, st, rt, c, {});
  }
} 


// 需要使用当前模块的地方
import Page from 'path/*.js'

// 传递 DOM 实例化
let path = new Page(targetDom)

```class extends J {
  constructor(t) {
    super(), I(this, t, st, rt, c, {});
  }
} 