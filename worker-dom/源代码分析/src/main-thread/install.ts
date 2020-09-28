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

import { MutationFromWorker, MessageType, MessageFromWorker } from '../transfer/Messages';
import { MutatorProcessor } from './mutator';
import { NodeContext } from './nodes';
import { StringContext } from './strings';
import { TransferrableKeys } from '../transfer/TransferrableKeys';
import { InboundWorkerDOMConfiguration, normalizeConfiguration } from './configuration';
import { WorkerContext } from './worker';
import { ObjectContext } from './object-context';
import { ExportedWorker } from './exported-worker';

const ALLOWABLE_MESSAGE_TYPES = [MessageType.MUTATE, MessageType.HYDRATE];

/**
 * @param baseElement
 * @param authorScriptURL
 * @param workerDOMURL
 * @param callbacks
 * @param sanitizer
 * @param debug
 */
// flow-002
export function fetchAndInstall(baseElement: HTMLElement, config: InboundWorkerDOMConfiguration): Promise<ExportedWorker | null> {
  const fetchPromise = Promise.all([
    // TODO(KB): Fetch Polyfill for IE11.
    // 读取资源 domURL 是woker-down 内部的资源  
    fetch(config.domURL).then((response) => response.text()),
    // 读取资源 authorURL 是自定i的 work.js 文件的位置
    fetch(config.authorURL).then((response) => response.text()),
  ]);
  return install(fetchPromise, baseElement, config);
}

/**
 * @param fetchPromise
 * @param baseElement
 * @param config
 */
// flow-003
export function install(
  fetchPromise: Promise<[string, string]>,
  baseElement: HTMLElement,
  config: InboundWorkerDOMConfiguration,
): Promise<ExportedWorker | null> {

  // 有私有属性 strings
  const stringContext = new StringContext();
  // 有私有的属性 objects 是一个map
  const objectContext = new ObjectContext();
  // 保存容器节点 和 所有子节点对象的 实例
  const nodeContext = new NodeContext(stringContext, baseElement);
  // 保存 authorURL 和 domURL
  const normalizedConfig = normalizeConfiguration(config);

  //
  return fetchPromise.then(([domScriptContent, authorScriptContent]) => {
    if (domScriptContent && authorScriptContent && config.authorURL) {
      // domScriptContent === worker-dom 库相关的 js 代码文本
      // authorScriptContent === 用户自定义的 js代码部分
      const workerContext = new WorkerContext(baseElement, nodeContext, domScriptContent, authorScriptContent, normalizedConfig);
      const mutatorContext = new MutatorProcessor(stringContext, nodeContext, workerContext, normalizedConfig, objectContext);
      workerContext.worker.onmessage = (message: MessageFromWorker) => {
        const { data } = message;

        if (!ALLOWABLE_MESSAGE_TYPES.includes(data[TransferrableKeys.type])) {
          return;
        }

        mutatorContext.mutate(
          (data as MutationFromWorker)[TransferrableKeys.phase],
          (data as MutationFromWorker)[TransferrableKeys.nodes],
          (data as MutationFromWorker)[TransferrableKeys.strings],
          new Uint16Array(data[TransferrableKeys.mutations]),
        );

        if (config.onReceiveMessage) {
          config.onReceiveMessage(message);
        }
      };

      return new ExportedWorker(workerContext, normalizedConfig);
    }
    return null;
  });
}
