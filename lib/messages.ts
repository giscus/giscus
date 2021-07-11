import { IMessage } from './types/giscus';

export function emitData<T>(data: T, origin: string) {
  window.parent.postMessage({ giscus: data } as IMessage<T>, origin);
}

export function sendData<T>(data: T, origin: string) {
  const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
  if (!iframe) return;
  iframe.contentWindow.postMessage({ giscus: data } as IMessage<T>, origin);
}
