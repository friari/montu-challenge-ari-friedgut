const debounce = <T extends (...args: any[]) => void>(
  debouncedFunction: T,
  delay: number
) => {
  let timeoutId: number | undefined;
  return function (...args: Parameters<T>) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      debouncedFunction.apply(null, args);
    }, delay);
  };
};

export default debounce;
