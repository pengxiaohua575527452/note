
[new event()](https://developer.mozilla.org/en-US/docs/Web/API/Event/Event)
```
function custom_event(type, detail) {
  // const e = document.createEvent('CustomEvent');
  // e.initCustomEvent(type, false, false, detail);
  // 方法修改为下面的新方法
  const e = new Event("CustomEvent",{"bubbles":false, "cancelable":false});
  return e;
}

```