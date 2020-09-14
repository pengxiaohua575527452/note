 

const http = require('http');
const port = '8888';
const host = '127.0.0.1';

// 服务处理器
function server(res, request){

}

// 启用服务监听后的回调
function listencallback(){
  console.log(`Server Run At: http://${host}:${port}`)
}

http
.createServer(server)
.listen(port, host, listencallback)