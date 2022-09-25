import { makeFakeProduct, makeFakeProducts } from '../../mocks/mocks';
import { Product } from '../../types/product';
import { ProductsData } from '../../types/state';
import { fetchProductInfoAction, fetchProductsAction, fetchPromoProductAction, fetchSimilarProductsAction } from '../api-actions';
import { productsData } from './products-data';

describe('Reducer test: productsData', () => {
  const state: ProductsData = {
    products: [],
    promoProduct: null,
    similarProducts: [],
    productInfo: null,
    isDataLoading: false,
  };

  const product: Product = makeFakeProduct();
  const products: Product[] = makeFakeProducts(20);

  it('Case: change isDataLoading status when fetchProducts action pending', () => {
    expect(productsData.reducer(state, {type: fetchProductsAction.pending.type}))
      .toEqual({...state, isDataLoading: true});
  });

  it('Case: change isDataLoading status when fetchProducts action rejected', () => {
    expect(productsData.reducer(state, {type: fetchProductsAction.rejected.type}))
      .toEqual({...state, isDataLoading: false});
  });

  it('Case: load products when fetchProducts action fulfilled', () => {
    expect(productsData.reducer(state, {type: fetchProductsAction.fulfilled.type, payload: products}))
      .toEqual({...state, products: products, isDataLoading: false});
  });

  it('Case: load promo product to state when fetchPromoProduct action fulfilled', () => {
    expect(productsData.reducer(state, {type: fetchPromoProductAction.fulfilled.type, payload: product}))
      .toEqual({...state, promoProduct: product});
  });

  it('Case: load similar products when fetchSimilarProducts action fulfilled', () => {
    expect(productsData.reducer(state, {type: fetchSimilarProductsAction.fulfilled.type, payload: products}))
      .toEqual({...state, similarProducts: products});
  });

  it('Case: load product info to state when fetchProductInfo action fulfilled', () => {
    expect(productsData.reducer(state, {type: fetchProductInfoAction.fulfilled.type, payload: product}))
      .toEqual({...state, productInfo: product});
  });
});
