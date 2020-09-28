

- App.svelte
```
<script lang="ts">
  export let title: string;
</script>
<h1>{title}</h1>

```


- main.js
```

import App from './App.svelte';

export default new App({
  target: document.body,
  props: {
  	// 注入数据
  	// 等同于 <comp title="Awesom Slider Demo"></comp> 效果
    title: "Awesome Slider Demo"
  }
});


```

- [查看详情](https://github.com/stevenwaterman/svelte-ts/tree/master/src)


### 备注：
- 如何向打包称js文件的svelte组件传递数据？？
	- 可以通过暴露 new App() 这个方法实现数据的传递