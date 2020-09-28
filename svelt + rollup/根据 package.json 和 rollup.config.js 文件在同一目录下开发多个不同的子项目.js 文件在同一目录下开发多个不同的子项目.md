## 在同一目录项 利用相同的 node_module 运行不同的项目的方法
### 修改 packge.json 文件
```
// 修改script 里面的指令实现调动不同的配置文件

"scripts": {
    "build": "rollup -c",
    "dev": "rollup -c -w",
    "dev:indexpage": "rollup --config indexpage.config.js -w",
    // start 使用的 sirv 框架
    "start": "sirv public --port 5001",
    "start:indexpage":"sirv path/public"
  },

```

### 修改配置文件 config.js
```
// 修改入口文件的位置
input： "",

output: {
	// 修改输出文件的位置
	file: ""
}

plugins: [

	svelte({
		css: css => {
			// 修改 css 文件的输出位置
			css.write('')
		}
	})
]


// 修改运行 本地服务器的指令
function serve() {
  let started = false;
  return {
    writeBundle() {
      if (!started) {
        started = true;
        require('child_process')
        .spawn(
          'npm', 
          // 修改命令行指令参数
          // 需要搭配 package.json 修改
          ['run', 'start:indexpage', '--', '--dev'], 
          {
            stdio: ['ignore', 'inherit', 'inherit'],
            shell: true
          }
        );
      }
    }
  };
}

```