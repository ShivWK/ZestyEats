function createDebounce(toCall, delay) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(toCall, delay);
  };
}

export default createDebounce;

