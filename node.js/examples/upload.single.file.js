// 上传单一文件的服务器
const HTTP = require('http');
const PATH = require('path');
const COMMON = require(PATH.resolve(__dirname, '../common'))

// 服务器处理入口
function server(req, res){
  // 接受前端formdata 传递过来的数据数据
  let formData = []
  req.on('data', buf => {
    formData.push(buf)
  })

  // 数据接受完成后
  req.on('end', () => {
    // 用buffer 把数据保存起来
    let buffer = Buffer.concat(formData)
    // 获取 buffer 数据中换行的位置
    let rnIndexes = []
    buffer.forEach((v, index) => {
      if(parseInt(v) === 13 && parseInt(buffer[index + 1]) === 10){
        rnIndexes.push(index)
      }
    })
    // 获取buffer 数据的第二行 content-descripton 的内容
    let bufferContentDescription = buffer.slice(rnIndexes[0]+2, rnIndexes[1])
    let contentDescription = bufferContentDescription.toString()
    // 获取文件的名称
    let filename = contentDescription.match(/filename=".*"/)[0].split('"')[1]
    // 获取buffer 数据的第三行文件的格式
    let bufferContentType = buffer.slice(rnIndexes[1]+2, rnIndexes[2])
    // 获取文件的格式
    let contentType = bufferContentType.toString().split(':')[1].trim().split('/')[0]
    console.log('contentType: ', contentType, contentType === 'image')
    // 根据文件的格式获取文件的保存路径
    let path = `./resource/${contentType}/${filename}`  
    // 获取 buffer 数据的第四行 文件的具体数据
    let bufferFileBody = buffer.slice(rnIndexes[3]+2, rnIndexes[4])
    // 保存文件
    FS
    .writeFile(path, bufferFileBody, err=>{
      if(err){
        res
        .end(
          JSON.stringify(new COMMON.ResponseErr(err))
        )
      }else{
        res
        .end(
          JSON.stringify(new COMMON.ResponseSuccess({path: path}))
        )
      }
    })
  })
}

// 服务器监听成功的回调
function listencallback(){
  COMMON.infoServerBaseURL(BASE_URL)
}

HTTP
.createServer(server)
.listen(PORT, HOST, listencallback)