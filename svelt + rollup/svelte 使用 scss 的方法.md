## svelte 使用 scss 的方法
[查看](https://github.com/sveltejs/language-tools/blob/master/docs/preprocessors/scss-less.md)

- 安装依赖
> npm install sass
> npm install node-sass
> npm install svelte-preprocess

- 创建配置文件
- svelte.config.js
```
const sveltePreprocess = require('svelte-preprocess');

module.exports = {
    preprocess: sveltePreprocess(),
};
```

- 使用
```
<style type='text/scss'>
……
</style>
```