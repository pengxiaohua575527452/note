module.exports = function(buffer){
  let files = []
  let bufferLen = buffer.length;
  let preIndex = 0
  let next = 'disposition'
 
  for(let i = 0; i < bufferLen; i++){
    let buf = buffer[i]
    // 判断当前是否到了换行的地方
    if(buf === 13 && buffer[i+1] === 10){
      // 获取当前buffer到换行位置还没有处理过的数据
      let chunk = buffer.slice(preIndex, i)
      let str = chunk.toString()

      // 判断字符串
      if(next === 'disposition' && str.indexOf('Content-Disposition') !== -1){
        files.push({
          disposition: str.slice(str.indexOf('Content-Disposition'))
        })
        preIndex = i + 2;
        next = 'contentType'
        continue;
      }

     
      if(next === 'contentType' && str.indexOf('Content-Type') !== -1){
        files[files.length - 1].contentType = str;
        preIndex = i+4;
        next = 'content'
        continue;
      }

      if(next === 'content' && buffer.slice(i+2, i+26).toString() === '------WebKitFormBoundary'){
        files[files.length - 1].fileBody = chunk
        preIndex = i + 2;
        next = 'disposition';
        continue;
      }
    }
  }
  return files
}