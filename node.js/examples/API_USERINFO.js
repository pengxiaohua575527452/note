const PATH = require('path')
const { BASE_URL } = require(PATH.resolve('node.js/mock/server.config.js'))
const COMMON = require(PATH.resolve('node.js/common/'))
module.exports = {
  GET(req, res){
    const _URL = new URL(req.url, BASE_URL)  
    const queryParamsID = _URL.id 
    const data = {name: 'bill', age: 10, test: '测试中文'}
    res.setHeader('Content-Type', 'text/json; charset=utf-8')
    res.end( JSON.stringify(new COMMON.ResponseSuccess(data)))
  },
  POST(req, res){
    let data = '';
    req.on('data', dataChunk => {
      data+= dataChunk
    })
    
    req.on('end', () =>{
      setTimeout(() => {
        console.log(`[模拟保存数据成功]: ${data}`)
        res.end(
          JSON.stringify(new COMMON.ResponseSuccess(data))
        )
      }, 200)
    })
  },
  PATCH(req, res){
    let data = '';
    
    req.on('data', dataChunk => {
      data += dataChunk
    })

    req.on('end', () => [
      setTimeout(() => {
        console.log(`[模拟更新数据成功]: ${data}`)
        res.end(
          JSON.stringify(new COMMON.ResponseSuccess(data))
        )
      }, 200)
    ])

    req.on('close', e => {
      console.log('请求被关闭了',)
    })

    req.on('error', e => {
      console.log('请求发生了错误', e)
    })
  },
  DELETE(req, res){
    let data = '';

    req.on('data', chunk => {
      data += chunk
    })

    req.on('end', () =>{
      setTimeout(()=>{
        console.log(`[模式删除数据成功]: ${data}`)
        res.end(
          JSON.stringify(new COMMON.ResponseSuccess(null))
        )
      }, 200)
    })
    req.on('close', () => {
      console.log('[请求被关闭了]')
    })

    req.on('error', () => {
      console.log('[请求发生了错误]')
    })

  }
}