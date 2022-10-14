const DEFAULT_TIMEOUT_DELAY = 400;

export const getFormatedPrice = (price: number) =>
  price.toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, `${'$1'} `);

export const debounce = <F extends (...args: Parameters<F>) => ReturnType<F>>(
  cb: F,
  timeoutDelay = DEFAULT_TIMEOUT_DELAY,
): (...args: Parameters<F>) => void => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<F>): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => cb(...args), timeoutDelay);
  };
};
