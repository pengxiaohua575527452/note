## 文件下载load.js写法
- 设置 返回的header 在里面写文件的名称的其他非文件主体的信息
- 读取文件流
  - FS.createReadStream(path)
- 通过管道把文件流写入返回的数据中
  - .pipe(res)
  
```
FS
.createReadStream()
.pipe(res)

```