export function throttle(callback: (...args: any[]) => void, timeout: number) {
  let timer: number;
  return function (this: any, ...args: any[]) {
    if (timer) {
      return;
    } else {
      timer = window.setTimeout(() => {
        callback.apply(this, args);
      }, timeout);
    }
  };
}
