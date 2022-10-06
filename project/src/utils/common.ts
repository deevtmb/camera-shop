const PRICE_DIVIDER = 1000;
const HUNDREDS_DIGITS_COUNT = 3;
const DEFAULT_TIMEOUT_DELAY = 400;

export const getFormatedPrice = (price: number) => {
  const thousands = Math.floor(price / PRICE_DIVIDER);
  const hundreds = `${price}`.slice(-HUNDREDS_DIGITS_COUNT);
  return thousands ? `${thousands} ${hundreds}` : hundreds;
};

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
