function createDebounce(toCall, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => toCall(...args), delay);
  };
}

export default createDebounce;

