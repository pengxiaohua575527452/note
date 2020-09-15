## 使用 XMLHttpRequest 方法下载文件
- 关键方法
- 创建 XMLHttpRequest 对象的实例
  ```
  const XHR = new XMLHttpRequest()
  ```
- 设置 XHR 的 responseType = 'blob' [这一点非常重要，直接决定了是否能够拿到适合的格式要求]
  ```
  XHR.responseType = 'bolb'
  ```
- 打开请求的链接
  ```
  XHR.open('GET', url, true)

  ```
- 发送请求
  ``` 
  XHR.send()
  ```
- 注册事件
  ```
  XHR.addEventListener('load', progressEvent => {
    // 在事件处理器中完成下载操作
    // 创建新的 blob 对象
    let blob = new Blob([progressEvent.target.response])
    
    // 根据blob创建一个 url 对象这个对象指向了 file 对象或 Blob 对象 DOMString 对象
    let url = URL.createObjectURL(blob)
    
    // 使用 HtmlAnchorElement 接口完成文件的下载
    // 创建一个满足 HTMLAnchorElement 接口的实例 DOM <a></a>
    let link = document.createElement('a')

    // 设定属性
        link.href = url
        link.download = '1.png'
    
    // 调用事件方法 - 完成链接的打开 - 实现下载
    // DOM 支持的事件 可以通过直接调用这个事件同名的方法实现
        link.click()
  })

  ```

---
## 实例
```

let XHR;
XHR = new XMLHttpRequest()
XHR.timeout = 6000
XHR.responseType = 'blob';
XHR.open('GET', '/download', true)
XHR.send()

XHR.addEventListener('load', progressEvent => {
  let blob, url, DOMA; 

  blob = new Blob([progressEvent.target.response])
  url = URL.createObjectURL(blob)
  DOMA = document.createElement('a')
  DOMA.href = url;
  DOMA.download = '1.png'
  DOMA.click()
})

XHR.addEventListener('err', progressEvent => {
  console.log('发生了错误： ')
})

XHR.addEventListener('timeout', progressEvent => {
  console.log('超时')
})

```