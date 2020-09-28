
```
{
	// 工程 或 包的名称
	"name": "svelte-ts",
	// 版本
	"version": "1.0.0",
	// 许可证
	"license": "MIT",
	// 仓库位置
	"repository": "https://github.com/stevenwaterman/svelte-ts",
	// npm 命令行工具
	"scripts": {
		// 打包指令 通过配置文件实现管理
		"build": "rollup -c",
		
		// 开发指令
		// 通过配置文件可以实现热更新
		// 一般通过 配置文件调用下面的 start 指令
		"dev": "rollup -c -w",

		// 运行前端服务器的 指令
		// 这个指令会在 >rollup 的指令中调用
		// public 是定义 当前服务器指向的基础文件夹
		"start": "sirv public"
	},
	// 开发依赖项
	// 如果是包的情况下，在下载当前包的时候不会下载里面的依赖向
	"devDependencies": {
		"@rollup/plugin-commonjs": "^14.0.0",
		"@rollup/plugin-node-resolve": "^8.4.0",
		"@rollup/plugin-typescript": "^5.0.2",
		"node-sass": "^4.14.1",
		"npm-run-all": "^4.1.5",
		"rollup": "^2.22.1",
		"rollup-plugin-livereload": "^1.3.0",
		"rollup-plugin-svelte": "^5.2.3",
		"rollup-plugin-terser": "^6.1.0",
		"rollup-plugin-typescript2": "^0.27.2",
		"svelte": "^3.24.0",
		"svelte-check": "^0.1.55",
		"svelte-preprocess": "^4.0.8",
		"typescript": "^3.9.7"
	},
	// 包或 工程依赖项
	// 如果是包 的情况下，在下载当前包的时候会同步下载里面指定的依赖项
	"dependencies": {
		"sass": "^1.26.11",
		"sirv-cli": "^1.0.3"
	}
}


```