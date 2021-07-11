import { IMessage } from './types/giscus';

export function emitData<T>(data: T, origin: string) {
  window.parent.postMessage({ giscus: data } as IMessage<T>, origin);
}
