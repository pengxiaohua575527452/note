 
// 静态服务器 
// 提供html 和 icon
const HTTP = require("http")
const PATH = require('path')
const FS = require('fs')
const COMMON = require(PATH.resolve('node.js/common/'))
const MODULE_USERINFO = require(PATH.resolve('node.js/examples/API_USERINFO.js'))


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
    console.time()
    // 持续接受 formData 传递过来的数据
    let formData = []
    req.on('data', buf => {
      formData.push(buf)
    })

    // 数据接受完成后
    req.on('end', () => {
      // 用buffer 把数据保存起来
      let buffer = Buffer.concat(formData)
      let preIndex = 0
      let bufferArr = []
      
      buffer.forEach((buf,index)=>{
        if(parseInt(buf) === 13 && parseInt(buffer[index + 1]) === 10){
          let str = buffer.slice(preIndex, index).toString()
          if(str.indexOf('Content-Disposition') != -1){
            bufferArr.push({
              description: str,
            })
          }else if(
            str.indexOf('Content-Type') != -1
            // 防止HTML文件中的 ccontent-type
            &&  !bufferArr[bufferArr.length - 1].contentType   
          ){
            bufferArr[bufferArr.length - 1].contentType = str
          }else if(
            str.indexOf('------WebKitFormBoundary') == -1 
            && str.length !== 0  
            && bufferArr.length != 0
          ){
            bufferArr[bufferArr.length - 1].fileBody = buffer.slice(preIndex, index)
          }
           
          if(
            !(str.length === 4 && str.indexOf('PNG')!== -1)
          ){
            preIndex = index + 2
          }
        }
      })

      

      // res.end()


      // 获取 buffer 数据中换行的位置
      // 需要 根据换行的为止查找内容
      // let rnIndexes = []
      // buffer.forEach((v, index) => {
      //   if(parseInt(v) === 13 && parseInt(buffer[index + 1]) === 10){
      //     rnIndexes.push(index)
      //   }
      // })

      // console.log('rnIndexes: ', rnIndexes)
      // 处理过个文件文件上传
      // 不能够采用这样的方式, 格式的不同可以导致，排列是不同的
      // let len = ~~(rnIndexes.length / 5)
      // console.log('len: ', len)
      // let bufferArr = []
      // for(let i =0; i<len; i++){
      //   let descriptionStartIndex = i * 5
      //   let descriptionEndIndex = descriptionStartIndex + 1;
      //   let contentTypeStartIndex = descriptionEndIndex;
      //   let contentTypeEndIndex = contentTypeStartIndex + 1;
      //   let fileBodyStartIndex = contentTypeEndIndex + 1;
      //   let fileBodyEndIndex = fileBodyStartIndex + 1;
        
      //   bufferArr.push({
      //     description: buffer.slice(rnIndexes[descriptionStartIndex]+2, rnIndexes[descriptionEndIndex]),
      //     contentType: buffer.slice(rnIndexes[contentTypeStartIndex] + 2, rnIndexes[contentTypeEndIndex]),
      //     fileBody: buffer.slice(rnIndexes[fileBodyStartIndex] + 2, rnIndexes[fileBodyEndIndex])
      //   })
      // }
      // // console.log('bufferArr: ', bufferArr)
      try{
        res.setHeader('Content-Type', 'application/josn; charset=utf-8')
        let data = []
        bufferArr.forEach(async (buffer, index) => {
          console.log(' buffer.description.toString(): ',  buffer.description.toString())
          let filename = buffer.description.toString().match(/filename=".*"/g)[0].split('"')[1];
          let contentType = buffer.contentType.toString().split(':')[1].trim()
          // console.log('filename: ', filename)
          await FS
          .writeFile(`./resource/${filename}`, buffer.fileBody, err=>{
            console.log('完成一个： ',filename, err)
            if(err){
              console.log('error: ', error)
              throw new Error(err)
            }else{
              data.push({
                fileName : filename,
              })

              if(index === bufferArr.length - 1){
                console.log('index: ', index)
                console.log('bufferArr.length: ',bufferArr.length)
                done()
              }
            }
          })
        })
        
        function done(){
          res
          .end(
            JSON.stringify(new COMMON.ResponseSuccess(data))
          )
          console.timeEnd()
        }
      }catch(err){
        
        res
        .end(
          JSON.stringify(new COMMON.ResponseErr(err))
        )
      }
     












      // // 处理当个的文件上传
      // // 获取buffer 数据的第二行 content-descripton 的内容
      // let bufferContentDescription = buffer.slice(rnIndexes[0]+2, rnIndexes[1])
      // let contentDescription = bufferContentDescription.toString()
      // // 获取文件的名称
      // let filename = contentDescription.match(/filename=".*"/)[0].split('"')[1]
      // // 获取buffer 数据的第三行文件的格式
      // let bufferContentType = buffer.slice(rnIndexes[1]+2, rnIndexes[2])
      // // 获取文件的格式
      // let contentType = bufferContentType.toString().split(':')[1].trim().split('/')[0]
      // console.log('contentType: ', contentType, contentType === 'image')
      // // 根据文件的格式获取文件的保存路径
      // let path = `./resource/${contentType}/${filename}`  
      // // 获取 buffer 数据的第四行 文件的具体数据
      // let bufferFileBody = buffer.slice(rnIndexes[3]+2, rnIndexes[4])
      // // 保存文件
      // FS
      // .writeFile(path, bufferFileBody, err=>{
      //   if(err){
      //     res
      //     .end(
      //       JSON.stringify(new COMMON.ResponseErr(err))
      //     )
      //   }else{
      //     res
      //     .end(
      //       JSON.stringify(new COMMON.ResponseSuccess({path: path}))
      //     )
      //   }
      // })
     
    })
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

// 使用表单直接上传
// 40,     137,    163,    165,    35063, 35105,
// 35190,  35215,  35217,  129582, 129626

// 使用 ajax 实现上传多文件
// 多个文件上传 
// 第一个文件描述 rnIndex[0]+2 ~ rnIndex[1]
// 第一个文件的类型 rnIndex[1]+2 ~ rnIndex[2]
// 第一个文件的主体 rnIndex[3]+2 ~ rnIndex[4]
// 第二个文件的描述 rnIndex[5]+2 ~ rnIndex[6]
// 第二个文件的类型 rnIndex[6] + 2 ~ rnIndex[7]
// // 第二个文件的主体 rnIndex[8]+2 ~ rnIndex[9]
// 40,    132,     158,    160,    35058,  35100,
// 35180,   35205,  35207,  129572, 129616

 

// // 文件的主体是 3~4  / 8~9 /

// 0         1      2       3        4
// 40,     132,    158,    160,    35058,
// 5       6       7       8       9  
// 35100,  35180,  35205,  35207,  129572,
// 10      11      12      13      14         
// 129614, 129677, 129703, 129705, 129707, 
// 15
// 129751

// 不需要-描述-类型-null-主体-
// 不需要-描述-类型-null-主体-
// 不需要-描述-类型-null-主体-
// 不需要

/**

40,   104,   129, 131,   137,  6227,
6269,  6333,  6359, 6361, 18451, 18495





 */