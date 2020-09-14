// 格式响应请求

const ERR_CODE = -1
const SUCCESS_CODE = 0
const ERR_MESSAGE = 'fail'
const SUCCESS_MESSAGE = 'success'
 
class Response {
  
  constructor(
    errCode,
    errMessage,
    data
  ){
    this.errCode = errCode;
    this.errMessage = errMessage;
    this.data = data;
  }

  errCode
  errMessage
  data

  errMessageUpdate(errMessage){
    this.errMessage(errMessage)
    return this
  }

  dataUpdate(data){
    this.data = data
  }
}

class ResponseErr extends Response{
  constructor(err_message){
    super(ERR_CODE, err_message !== null ? err_message : ERR_MESSAGE, {})
  }
}

class ResponseSuccess extends Response{
  constructor(data){
    super(SUCCESS_CODE, SUCCESS_MESSAGE, data)
  }
}

module.exports = {
  ResponseErr,
  ResponseSuccess
}





 

 


