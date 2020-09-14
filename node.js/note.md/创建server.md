```
// 导入 http 模块
const http = require('http')



http
// 创建一个 server 返回 <http.server> 的实例
.createServer(handleServer)
// 启动服务，监听链接 
// port 端口
// host 主机
// listCallback 监听成功后的回调函数
.listen(port, host, listCallbak)

```