export function debounce<Args extends unknown[]>(
  debouncedFunction: (...args: Args) => void,
  delay: number
) {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  return function (...args: Args) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      debouncedFunction(...args);
    }, delay);
  };
}
