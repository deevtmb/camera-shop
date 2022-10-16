import { makeFakeProduct } from '../../mocks/mocks';
import { Order } from '../../types/order';
import { CartProduct } from '../../types/product';
import { CartData } from '../../types/state';
import { getDiscountAction, postOrderAction } from '../api-actions';
import { addProduct, cartData, changeCount, decreaseCount, deleteProduct, increaseCount } from './cart-data';

describe('Reducer test: cartData', () => {
  const fakeCartProduct = {...makeFakeProduct(), cartCount: 2, id: 1} as CartProduct;
  const fakeProduct = makeFakeProduct();

  const state: CartData = {
    productsInCart: [fakeCartProduct],
    coupon: 'camera-333',
    discount: 15
  };

  const order: Order = {
    camerasIds: [1,2],
    coupon: null,
  };

  it('Case: set initial discount when getDiscount action rejected', () => {
    expect(cartData.reducer(state, {type: getDiscountAction.rejected.type}))
      .toEqual({...state, coupon: null, discount: 0});
  });

  it('Case: get discount when getDiscount action fulfilled', () => {
    expect(cartData.reducer(state, {type: getDiscountAction.fulfilled.type, payload: [20, 'camera-444']}))
      .toEqual({...state, coupon: 'camera-444', discount: 20});
  });

  it('Case: reset cart state when postOrder action fulfilled', () => {
    expect(cartData.reducer(state, {type: postOrderAction.fulfilled.type, payload: order}))
      .toEqual({productsInCart: [], coupon: null, discount: 0});
  });

  it('Case: increase cart count', () => {
    expect(cartData.reducer(state, increaseCount(1)))
      .toEqual({...state, productsInCart: [{...fakeCartProduct, cartCount: 3}]});
  });

  it('Case: decrease cart count', () => {
    expect(cartData.reducer(state, decreaseCount(1)))
      .toEqual({...state, productsInCart: [{...fakeCartProduct, cartCount: 1}]});
  });

  it('Case: set cart count', () => {
    expect(cartData.reducer(state, changeCount({id: 1, count: 10})))
      .toEqual({...state, productsInCart: [{...fakeCartProduct, cartCount: 10}]});
  });

  it('Case: add product to cart', () => {
    expect(cartData.reducer(state, addProduct(fakeProduct)))
      .toEqual({...state, productsInCart: [fakeCartProduct, {...fakeProduct, cartCount: 1}]});
  });

  it('Case: delete product from cart', () => {
    expect(cartData.reducer(state, deleteProduct(1)))
      .toEqual({...state, productsInCart: []});
  });
});
