# Promise
[查看](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)

Promise 对象是一个异步对象
Promise.then()可以在任意的时候调用-会把Promise对象中持有的值作为参数传递给 then 函数的形参；


## Promise的对象的使用方式
- 在异步函数中通过 await 取值
```
async function _async(){
	// vv 就能够拿去到 somePromiseObject 对象中返回的值
	let vv = await somePromiseObject
}

```
- 把promise 作为参数传递在需要的地方使用then获取
```
let _promise = somePromiseObject

// 在需要的地方
_promise.then(v=>)

```