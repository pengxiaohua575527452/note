## AJAX 原生的写法
- 通过 XMLHttpRequest 对象实现
- 使用到的方法包括 [查看详情](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest)
- 创建请求的对象-实例化 `let oReq = new XMLHttpRequest()`
- 设置请求的头 `oReq.setRequestHeader('label', 'value)`
- 监听请求的状态 
    - 请求完成
    ```
      
      new XMLHttpRequest().addListener('load', progressEvent => {

      })
    ```
    - 请求超时
    ```
      new XMLHttpRequest().addListener('timeout', progressEvent => {

      })

    ```
    - 请求出错
    ```
      new XMLHttpRequest().addEventListener('error), progressEvent => {

      }

    ```
    - 请求进度
    ```
      new XMLHtrpRequest().addEventListener('progress', progressEvent => {

      })

    ```
- 获取返回的数据
  ```
    let XHR = new XMLHttpRequest()

    XHR.addEventListener('load', progressEvent => {
      // 当前某一个阶段返回的数据 - 还没有仔细证明过
      let currResponse = progressEvent.currentTarget.response
      // 所有返回的数据 - 没有仔细证明过
      let response = progressEvent.target.response
    })

  ```  
- 设置请求超时范围 `new XMLHttpRequest().timeout = 6000`
- 监听进度 ProgressEvent.loaded【已经完成的进度】 / ProgressEvent.total【总的需求】
- GET 请求如何发送body数据 ?? 好像是没有办法
- PSOT / 请求发送数据
  ```
    const XHR = new XMLHttpRequest()
    // 通过 send 方法 发送数据
    XHR.send( data )

  ```
- DELETE 请求发送数据
- UPDATE 请求发送数据
- UPLOAD 请求发送数据
- 发送 formData 
- HTTP 请求的方法说明
  - POST 用来创建资源 成功返回201
  - GET 用来读取资源 正常的情况下返回的响应码是 200, 找不到资源返回404 , 错误返回400
  - PATCH  补丁 用来修改资源 成功返回200
  - DELTE 用来删除资源

- 上传文件
 