const debounce = (
  debouncedFunction: (...args: any[]) => void,
  delay: number
) => {
  let timeoutId: number | undefined;
  return function (...args: any[]) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      debouncedFunction.apply(null, args);
    }, delay);
  };
};

export default debounce;
