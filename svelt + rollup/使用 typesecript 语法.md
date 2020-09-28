## 在svelte中使用typescript语法的方法
- 安装依赖
```
svelte-preprocess
typescript
// 文档有两个部分 ，有的推荐 rollup-plugin-typescript 
// 有的对剑 rollup-plugin-typescript2
npm install rollup-plugin-typescript2
svelte-check
```

### 修改 rollup.config.js 文件
```
// 在plugins 中添加 插件
exprot default {
	plugins: [
	typeCheck(),
		typescript({ sourceMap: !production }),
		svelte({
		  preprocess: sveltePreprocess(),
		  dev: !production,
		  css: css => {
		    css.write("public/build/bundle.css");
		  }
		}),
	]

}



// 添加类型检查的方法
function typeCheck() {
  return {
    writeBundle() {
      require('child_process').spawn('svelte-check', {
        stdio: ['ignore', 'inherit', 'inherit'],
        shell: true
      });
    }
  }
}
```

### 在package.json 同级目录下增加 tsconfig.js 文件
```
{
  "include": ["src/**/*"],
  "exclude": ["node_modules/*", "public/*"],
  "compilerOptions": {
    "target": "ESNEXT",
    "lib": ["ESNEXT", "dom"],
    "module": "ESNEXT",
    "moduleResolution": "node",

    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "strictNullChecks": true
  }
}
```

### 修改 main.js 的文件名称 为 main.ts
- 在文件的顶部增加 `// @ts-ignore` 忽略导入的错误

### 在svelte文件中 `<script lang="ts"><script>`

### 注意事项
- 在 svelte.script 标签中如果需要导入typescript 需要导入两次 [查看详情](https://blog.scottlogic.com/2020/07/24/svelte-ts.html)
```
import {searchBinaryTree} from "./tree"
import type {BinaryTree, BinaryTreeNode} from "./tree"

```

- 如果需要使用响应式申明 `$:` 必须要先做类型申明，才能普通的使用；
```
let inverseSliderValue: number;
$: inverseSliderValue = 10 - sliderValue;

```

- 类型只在 `<script></script>` 标签之中检查



### 打包后同时导出 .d.ts 文件的方法
- 只要使用了相关类型的 .ts 文件，就会把这个ts文件的申明文件导出
- 只要关联了相关的 .ts 文件就会把这个相关的ts文件的申明导出
- main.ts 的申明文件 有点特殊 可以在 文件中直接声明一个 App 的类型导出. 但是如何使用还没有研究明白；
  ``` 
  type App = { (arg: {target: string, props: { title: string}}): any};
  export type { App };
  ``` 

### 其他
- 如果需要导出 typescript 的申明文件 请使用 rollup-plugin-typescript2 
- typescript+rollup编译生成类库声明文件失败 [查看](https://blog.csdn.net/qq_29722281/article/details/96586890)
- rollup-plugin-typescript2 文档 [查看](https://www.npmjs.com/package/rollup-plugin-typescript2)
- 官方实例的位置[查看](https://github.com/stevenwaterman/svelte-ts) [github](https://github.com/ezolenko/rollup-plugin-typescript2)
 



  
 