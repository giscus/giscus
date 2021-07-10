export function emitData<T>(data: T, origin: string) {
  window.parent.postMessage({ giscus: data }, origin);
}
