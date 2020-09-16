## rollup 打包 svelte 文件的说明

```
main.js 里面的文件决定了问价的组织架构的关系

import App from 'app.svelte'

import App from './App.svelte';

// 打包的时候回把这部分代码全部添加到 bundle.js 的里面
// 所以我们可以在这里添加自己的执行程序
 
var app = new App({
	// target: document.body
	// 可以用我们指定的的容器替换
  // 也可以不在这里替换通过改造 bundle.js 传递参数进去实现
	target: document.getElementById('container')
});

```