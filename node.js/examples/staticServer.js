 
// 静态服务器 
// 提供html 和 icon
const HTTP = require("http")
const PATH = require('path')
const FS = require('fs')
const COMMON = require(PATH.resolve('node.js/common/'))
const MODULE_USERINFO = require(PATH.resolve('node.js/examples/API_USERINFO.js'))
const bufferParseToFile = require(PATH.resolve('node.js/examples/bufferParseToFiles.js'))

const {
  PORT,
  PROTOCAL,
  HOST,
  BASE_URL
} = require(PATH.resolve('node.js/mock/server.config.js'))

 
const serverByPathname = {
  '/': function(req, res, method){
    FS
    .createReadStream(
      PATH.resolve('front/index.html')
    )
    .pipe(res)
  },
  '/favicon.png': function(req, res, method){
    try{
      FS
      .createReadStream(
        PATH.resolve('front', 'src', 'assets', 'favicon.png')
      )
      .pipe(res)
    }catch(err){
      console.log('err: ', err)
      res.end()
    }
  },
  '/userinfo':function(req, res, method){
    MODULE_USERINFO[method](req, res)
  },
  '/src/js/API.js': function(req, res, method){
    res.setHeader('Content-type', 'text/javascript; charset=utf-8')
    FS
    .createReadStream(
      PATH.resolve(`front/src/js/API.js`)
    )
    .pipe(res)
      
  },
  '/src/config/api.config.js': function(req, res, method){
    res.setHeader('Content-Type', 'text/javascript; charset=utf-8')
    FS
    .createReadStream(
      PATH.resolve('front', 'src', 'config', 'api.config.js')
    )
    .pipe(res)
  },
  '/upload': function(req, res, method){
    // console.time()
    // 持续接受 formData 传递过来的数据

    let formData = []

    

    req.on('data', chunk => {
      formData.push(chunk)
    })


    req.on('end', () => {
      let buffer = Buffer.concat(formData)
      let files = bufferParseToFile(buffer)
      let resData = []
      console.log('files: ', files)
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      files.forEach(file => {
        let filename = file.disposition.match(/filename=".*"/g)[0].split('"')[1]
        let contentType = file.contentType.split(':')[1].trim()

        FS
        .writeFile(`./resource/${filename}`, file.fileBody, err=>{
          if(err){
            console.log('err: ', err)
            res
            .end(JSON.stringify(new COMMON.ResponseErr(err)))
          }else{
            resData.push({
              filename: filename
            })

            if(resData.length === files.length){
              res
              .end(JSON.stringify(new COMMON.ResponseSuccess(resData)))
            }
          }
        })
      })
    })
  },
  '/download': function(req, res){
    // setHeader 不妨碍 传递的数据
    // res.setHeader('Content-Disposition','attachment; filename=1.png',)
    // res.setHeader("Content-type", "application/octet-stream",)
 
    FS
    .createReadStream('./resource/5f0680bdf346fb1ae59c7255.png')
    .pipe(res)
  }
 
}
 

function server(req, res){
  
  let _URL
  try{
    _URL = new URL(req.url, BASE_URL)
    console.log('-------------------------------------------')
    console.log(`[请求的pathname]: ${_URL.pathname}`)
    console.log(`[请求的method]: ${req.method}`)
    serverByPathname[_URL.pathname](req, res, req.method)
  }catch(err){
    console.log(`[错误]: ${err}`)
    const ERR_MESSAGE = `ERROR: ${err}`
    res.setHeader('Content-Type', 'json');
    const RESPONSE_STR = JSON.stringify(new COMMON.ResponseErr(ERR_MESSAGE))
    res.end(RESPONSE_STR, 'utf-8')
  }
}
// 返回中文问题 

HTTP
.createServer(server)
.listen(PORT, HOST, ()=>{
  COMMON.infoServerBaseURL(BASE_URL)
})
