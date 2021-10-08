export function debounce(callback: (...args: any[]) => void, timeout: number) {
  let timer: number;
  return function (this: any, ...args: any[]) {
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      callback.apply(this, args);
    }, timeout);
  };
}
