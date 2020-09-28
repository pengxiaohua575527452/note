## SVG

### svg 如何使用 font-size 定义实际的尺寸
```
// width= '1em' === font-size
<svg width="1em" height="1em" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
</svg>

```

### svg 如何使用 color 的颜色
```
// currentColor ==== color;
<svg width="1em" height="1em" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
	<rect x="0" y="0" width="100" height="100" fill="currentColor" stroke="none"/>
</svg>

```

### svg 组合标签
```
<svg width="1em" height="1em" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
	// 组合标签 能够统一操作里面的 变换等设置；
	<g>
		……
	</g>
</svg>


```