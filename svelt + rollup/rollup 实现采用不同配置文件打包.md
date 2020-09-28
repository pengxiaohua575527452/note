## rollup 实现采用不同的配置文件打包

- package.json 文件
```
……
// 采用默认配置打包
// rollup.config.js 文件作为配置文件
"script": {
	"build":"rollup -c",
}
……



// 采用自定义配置文件打包
// my.config.js 文件作文配置文件
"script": {
	"build": "rollup --config my.config.js"
}

```