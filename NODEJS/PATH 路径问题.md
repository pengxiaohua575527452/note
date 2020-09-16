

- PATH.resolve([path])
  - path 以 '/' 开头表示以当前所在的盘为初始路径的绝对路径 E:/path
  - path : './' === '../' === 'path' 都是以当前 npm inti 为起点生成 绝对路径 E:\note\front
  - path : __dirname 以当前代码所在的文件所在文件夹作为目标参考点

--- 
还有问题需要详情说明
- foldername>node path/xxx.js
- 在不同的foldername de 前提之下 path 路径的解析完全不同？？？？