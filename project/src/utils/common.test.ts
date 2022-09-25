import { getFormatedPrice } from './common';

describe('Test utils functions', () => {
  it('getFormatedPrice function:', () => {
    expect(getFormatedPrice(56)).toEqual('56');
    expect(getFormatedPrice(3444)).toEqual('3 444');
    expect(getFormatedPrice(10000)).toEqual('10 000');
  });
});
