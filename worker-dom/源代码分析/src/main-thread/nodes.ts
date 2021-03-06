/**
 * Copyright 2018 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NodeType, TransferrableNodeIndex } from '../transfer/TransferrableNodes';
import { StringContext } from './strings';

/**
 * IE11 doesn't support NodeList.prototype.forEach
 * https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach
 * @param list NodeList to iterate over
 * @param callback method to call with each node
 */
const nodeListEach = (list: NodeList, callback: (value: Node, key: number) => any): void => Array.prototype.forEach.call(list, callback);

export const BASE_ELEMENT_INDEX = 1;



export class NodeContext {
  // 绑定的容器对象
  public baseElement: HTMLElement;
  // 
  private stringContext: StringContext;
  // 计数器用来关联 容器和容器内部所有childNode的数量
  // 从 1 开始
  private count: number;
  // map 二维数组 
  //[[1,baseElement], [2, baseElemnt]] 依次向后添加childNodes 存储的策略是 先深度后广度
  // 先操作第一个元素，然后操作第一个元素的子元素，子元素操作完毕后再操作第二个元素
  private nodes: Map<number, Node>;

  /**
   * Called when initializing a Worker, ensures the nodes in baseElement are
   * known for transmission into the Worker and future mutation events from the
   * Worker.
   * @param baseElement Element that will be controlled by a Worker
   */
  constructor(stringContext: StringContext, baseElement: Element) {
    this.count = 2;
    this.stringContext = stringContext;

    // The nodes map is populated with two default values pointing to baseElement.
    // These are [document, document.body] from the worker.
    this.nodes = new Map([
      [BASE_ELEMENT_INDEX, baseElement],
      [2, baseElement],
    ]);
    this.baseElement = baseElement as HTMLElement;
    // To ensure a lookup works correctly from baseElement
    // add an index equal to the background thread document.body.
    baseElement._index_ = 2;
    // Lastly, it's important while initializing the document that we store
    // the default nodes present in the server rendered document.
    // 遍历子节点
    nodeListEach(baseElement.childNodes, (n: ChildNode) => this.storeNodes(n));
  }

  // 创建节点
  public createNodes = (buffer: ArrayBuffer, sanitizer?: Sanitizer): void => {
    //
    const nodeBuffer = new Uint16Array(buffer);
    const nodeBufferLength = nodeBuffer.length;

    for (let iterator = 0; iterator < nodeBufferLength; iterator += TransferrableNodeIndex.End) {
      let node: Node;
      if (nodeBuffer[iterator + TransferrableNodeIndex.NodeType] === NodeType.TEXT_NODE) {
        // 创建文本节点
        node = document.createTextNode(this.stringContext.get(nodeBuffer[iterator + TransferrableNodeIndex.TextContent]));
      } else if (nodeBuffer[iterator + TransferrableNodeIndex.NodeType] === NodeType.COMMENT_NODE) {
        // 创建 注释节点
        node = document.createComment(this.stringContext.get(nodeBuffer[iterator + TransferrableNodeIndex.TextContent]));
      } else if (nodeBuffer[iterator + TransferrableNodeIndex.NodeType] === NodeType.DOCUMENT_FRAGMENT_NODE) {
        // 创建文档片段
        node = document.createDocumentFragment();
      } else {
        const nodeName = this.stringContext.get(nodeBuffer[iterator + TransferrableNodeIndex.NodeName]);
        node =
          nodeBuffer[iterator + TransferrableNodeIndex.Namespace] !== 0
            // 创建带有 命名空间的 HTML 元素 - 创建 elementNode 
            ? document.createElementNS(this.stringContext.get(nodeBuffer[iterator + TransferrableNodeIndex.Namespace]), nodeName)
            // 创建 HTML 元素
            : document.createElement(nodeName);

        // TODO(KB): Restore Properties
        // skeleton.properties.forEach(property => {
        //   node[`${property.name}`] = property.value;
        // });
        // ((skeleton as TransferrableElement)[TransferrableKeys.childNodes] || []).forEach(childNode => {
        //   if (childNode[TransferrableKeys.transferred] === NumericBoolean.FALSE) {
        //     node.appendChild(this.createNode(childNode as TransferrableNode));
        //   }
        // });

        // If `node` is removed by the sanitizer, don't store it and return null.
        if (sanitizer && !sanitizer.sanitize(node)) {
          continue;
        }
      }
      // 添加到 nodes 数组总
      this.storeNode(node, nodeBuffer[iterator]);
    }
  };

  /**
   * Returns the real DOM Element corresponding to a serialized Element object.
   * @param id
   * @return RenderableElement | null
   */
  public getNode = (id: number): RenderableElement | null => {
    const node = this.nodes.get(id);

    if (node && node.nodeName === 'BODY') {
      // If the node requested is the "BODY"
      // Then we return the base node this specific <amp-script> comes from.
      // This encapsulates each <amp-script> node.
      return this.baseElement as RenderableElement;
    }
    return node as RenderableElement;
  };

  /**
   * Store the requested node and all of its children.
   * @param node node to store.
   */
  // 遍历子节点的回调函数
  private storeNodes = (node: Node): void => {
    // this 指向NodeContext的实例
    // 设置 node._index_ 的值
    // 同时把 node 添加到 nodes map对象里面
    this.storeNode(node, ++this.count);
    // 如果当前节点有子节点 继续遍历
    nodeListEach(node.childNodes, (n: ChildNode) => this.storeNodes(n));
  };

  /**
   * Establish link between DOM `node` and worker-generated identifier `id`.
   *
   * These _shouldn't_ collide between instances of <amp-script> since
   * each element creates it's own pool on both sides of the worker
   * communication bridge.
   * @param node
   * @param id
   */
  // 设置节点的 _index_ 属性的值
  // id 同count相关 
  private storeNode(node: Node, id: number): void {
    (node as Node)._index_ = id;
    // this 执行调用的对象
    // this.nodes === map 类型的数据
    // 把当前的node 对象添加到 nodes 数组里面
    this.nodes.set(id, node as Node);
  }
}
