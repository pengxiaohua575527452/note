// 解析url获取查询的参数和路径

const http = require('http')
const config = require('../mock/server.config.js')
 

function server(req, res){
  // 解析 url
  const url = new URL(req.url, config.BASE_URL)
  // 获取路径
  const path = url.pathname 
  // 获取查询的参数
  const searchParams = url.searchParams
  
  // 向返回的可写流写入数据
  res.end('hello world!')
}

function listencallback(){
  console.log(`Server Run At: ${config.BASE_URL}`)
}

http
.createServer(server)
.listen(config.PORT, config.HOST, listencallback)
