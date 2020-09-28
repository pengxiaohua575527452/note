## 发布npm 包的基础流程
> 设置 镜像位置 `npm config set registry https://registry.npmjs.org`
> 创建包文件
> npm login  
> 验证 `npm who am i`
> npm init 初始化
> 编辑包
> 创建 .gigignore 文件 设置忽略内容
> npm publish 发布
> npm unpublish --force // 强制删除
> npm unpublish xxx@1.0.1 // 删除指定的版本


---
## 可能的问题
- 包的名字不能够和其他的人有冲突
- 每次更新都必须修改版本 - npm publish
- 