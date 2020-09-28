## worker - dom 中使用 svelte 打包的 自定义事件问题
```
在 workder-dom 之中， document 对象不是正常的document 对象
所以 不能使用 document.createEvent("CustomEvent"); 这个对象
```

- 为了能够支持 需要修改部分code
- 原来的部分 [查看](https://developer.mozilla.org/zh-CN/docs/Web/API/CustomEvent/initCustomEvent)
```
const e = document.createEvent("CustomEvent");
return e.initCustomEvent(t, !1, !1, n), e;
```

- 需要修改为 [查看](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/Event)

```
const e = new Event('CustomEvent',{bubbles: false, cancelable: false, composed: false})

return e,e

```