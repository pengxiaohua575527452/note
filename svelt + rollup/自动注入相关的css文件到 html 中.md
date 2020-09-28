## 自动注入相关的css文件到 html 中
- App.svelte
```
<div>
	<svelte:head>
		// 指向css 文件存储的位置即可
		// 而且这个插入是响应式的，
		// 模块销毁插入标签也会被删除
		<link  rel="stylesheel" href="./index.js"/>
	</svelte:head>
</div>
<style type="text/css">

</style>
```