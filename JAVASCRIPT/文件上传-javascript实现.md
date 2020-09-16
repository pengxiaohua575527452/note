```
let files = DOM_INPUT.files
console.log('files:', files)
let formData = new FormData()

for(let i = 0; i< files.length; i++){
  formData.append(i, files[i])
}

const XHR = new XMLHttpRequest();
      XHR.timeout = 6000

XHR.open('POST','/upload',true)
XHR.setRequestHeader('Content-Type', 'multipart/form-data;')
XHR.send(formData)

```