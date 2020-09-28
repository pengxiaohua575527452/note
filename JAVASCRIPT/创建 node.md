## 创建 node 的方法
- document.createTextNode // 创建文本节点
- document.createComment // 创建注释
- document.createDocumentFragment()  //创建文档片段

ar i = document.createTextNode(o.stringContext.get(e[r + 3]));
              else if (8 === e[r + 1])
                // 创建一个注释节点 
                i = (o.stringContext.get(e[r + 3]));
                // 创建一个文档片段
              else if (11 === e[r + 1]) i = document.createDocumentFragment();
              else if (
                ((i = o.stringContext.get(e[r + 2])),
                (i =
                  0 !== e[r + 4]
                    // 创建指定命令空间的元素
                    ? document.createElementNS(o.stringContext.get(e[r + 4]), i)
                    // 创建元素
                    : document.createElement(i)),