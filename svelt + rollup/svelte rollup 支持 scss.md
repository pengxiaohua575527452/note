## 使用 scss 插件

[查看文档](https://daveceddia.com/svelte-with-sass-in-vscode/)

- 安装文件
> npm install svelte-preprocess node-sass

- 修改 rollup.config.js 文件
```
import preprocess from 'svelte-preprocess';

plugins: [
	svelte({
	  /* ... */
	  preprocess: preprocess()
	})
}),

```

- 使用
```
<style type="text/scss">
  $color: red;

  h1 {
    color: $color;
  }
</style>

```