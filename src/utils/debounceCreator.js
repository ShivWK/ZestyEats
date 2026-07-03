function createDebounce(func, delay) {
  let timer = null;
  return function (...value) {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      func(...value);
    }, delay);
  };
}

export default createDebounce;
