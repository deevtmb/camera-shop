const PRICE_DIVIDER = 1000;
const HUNDREDS_DIGITS_COUNT = 3;

export const getFormatedPrice = (price: number) => {
  const thousands = Math.floor(price / PRICE_DIVIDER);
  const hundreds = `${price}`.slice(-HUNDREDS_DIGITS_COUNT);
  return thousands ? `${thousands} ${hundreds}` : hundreds;
};
