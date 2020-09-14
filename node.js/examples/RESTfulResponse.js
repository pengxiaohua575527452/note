let http = require('http')
const common = require('../common')
const {
  PORT,
  PROTOCAL,
  HOST,
  BASE_URL
} = require('../mock/server.config.js')

let bill = {name: 'bill'}
 
function server(req, res){
  
  res.writeHead(
    200,
    {
      'Content-Type': 'application/json'
    }
  )
  res.write(JSON.stringify(bill))
  res.end( )
}



http
.createServer(server)
.listen(PORT, HOST, ()=>{
  common.infoServerBaseURL(BASE_URL)
})