const PRICE_DIVIDER = 1000;

export const getFormatedPrice = (price: number) => {
  const thousands = Math.floor(price / PRICE_DIVIDER);
  const hundreds = price % PRICE_DIVIDER;
  return thousands ? `${thousands} ${hundreds}` : hundreds;
};
