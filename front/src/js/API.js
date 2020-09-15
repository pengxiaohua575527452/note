// 向后台请求数据的js

// 查询的通用API
import * as API_CONFIG from '../config/api.config.js'
 
function paramsFormat(params){
  let str = "?"
  let keys = Object.keys(params)
  let len = keys.length

  for(let i= 0; i< len; i++){
    let key = keys[i]
    let curr = params[key]
    let _type = typeof curr
    if(_type === 'string' || _type === 'number'){
      let pre = i === 0 ? "" : "&"
      str+=`${pre}${key}=${params[key]}`
    }else{
      throw new Error(`params 参数的值只能够是字符串或数字, ${key} 的值不是一个数组或字符串 == ${curr}`)
    }
  }
  return str
}


function get(url, params){
  let XHR = new XMLHttpRequest()
  XHR.timeout= API_CONFIG.TIMEOUT
  return new Promise((resolve, reject)=>{
    XHR.addEventListener('load', progressEvent =>{
      resolve(progressEvent.target.response)
    })
  
    XHR.addEventListener('error', progressEvent => {
      throw new Error('error')
    })
  
    XHR.addEventListener('timeout', () => {
      throw new Error('timeout')
    })
    const queryStr = params ? paramsFormat(params) : '';
    XHR.open('GET', `${url}${queryStr}`,true)
    XHR.send()
  })
}

function post(url, params){
  let XHR = new XMLHttpRequest()
      XHR.timeout = API_CONFIG.TIMEOUT
     
      return new Promise((resolve, reject) => {
        
        XHR.addEventListener('load', progressEvent => {
          resolve(progressEvent.target.response)
        })

        XHR.addEventListener('error', progressEvent => {
          throw new Error('error')
        })

        XHR.addEventListener('timeout', progressEvent => {
          throw new Error('timeout')
        })

        try{
          XHR.open('POST', url, true)
          XHR.setRequestHeader('Content-Type', 'text/json; charset=utf-8')
          XHR.send(JSON.stringify(params))
        }catch(err){
          reject(err)
        }
      })
}

// formData 类型的数据是不需要通过 RESTful 类型接口那样，序列化的
function upload(url, params){
  let XHR = new XMLHttpRequest()
      XHR.timeout = API_CONFIG.TIMEOUT
       
      return new Promise((resolve, reject) => {
        
        XHR.addEventListener('load', progressEvent => {
          resolve(progressEvent.target.response)
        })

        XHR.addEventListener('error', progressEvent => {
          throw new Error('error')
        })

        XHR.addEventListener('timeout', progressEvent => {
          throw new Error('timeout')
        })

        try{
 
          XHR.open('POST', url, true)
          XHR.send(params)
        }catch(err){
          reject(err)
        }
      })
}

function patch(url, params){
  let XHR = new XMLHttpRequest()
      XHR.timeout= API_CONFIG.TIMEOUT
  return new Promise((resolve, reject) => {
    XHR.addEventListener('load', progressEvent => {
      resolve(progressEvent.target.response)
    })
    XHR.addEventListener('error', progressEvent => {
      throw new Error('error')
    })
    XHR.addEventListener('timeout', progressEvent => {
      throw new Error('timeout')
    })
    XHR.open('PATCH', url, true)
    XHR.setRequestHeader('Content-Type', 'text/json; charset=utf-8')
    XHR.send(JSON.stringify(params))
  })
}

function del(url, params){
  let XHR = new XMLHttpRequest();
      XHR.timeout = API_CONFIG.TIMEOUT;
  return new Promise((resolve, reject) => {
    XHR.addEventListener('load', progressEvent => {
      resolve(progressEvent.target.response)
    })
    XHR.addEventListener('error', progressEvent => {
      throw new Error('error')
    })
    XHR.addEventListener('timeout', ()=>{
      throw new Error('timeout')
    })
    XHR.open('DELETE', url, true)
    XHR.setRequestHeader('Content-Type', 'text/json; charset="utf-8"')
    XHR.send(JSON.stringify(params))
  })
}

export default {
  // 查询
  get,
  // 创建新的项目
  post,
  // 更新
  patch,
  // 删除
  del,
  // 上传文件
  upload
}