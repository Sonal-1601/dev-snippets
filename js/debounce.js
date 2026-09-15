/**
 * Returns a function that delays calling `fn` until `wait` ms have passed
 * since the last invocation. The returned function has a `.cancel()`.
 */
export function debounce(fn, wait = 100) {
  let timer = null;

  function debounced(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, args);
    }, wait);
  }

  debounced.cancel = () => {
    clearTimeout(timer);
    timer = null;
  };

  return debounced;
}
