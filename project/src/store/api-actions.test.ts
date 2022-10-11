import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { State } from '../types/state';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { makeFakePostReview, makeFakeProduct, makeFakeProducts, makeFakeReviews } from '../mocks/mocks';
import { APIRoute } from '../const';
import { fetchProductInfoAction, fetchProductReviewsAction, fetchProductsAction, fetchPromoProductAction, fetchSimilarProductsAction, postReviewAction, searchProducts } from './api-actions';

describe('Test: async api-actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  describe('Product data api-actions', () => {
    const mockProducts = makeFakeProducts(20);
    const mockProduct = makeFakeProduct();

    it('Case: dispatch fetchProducts action with GET request to /cameras?{params}', async () => {
      mockAPI.onGet(`${APIRoute.Products}?`).reply(200, mockProducts);

      const store = mockStore();

      await store.dispatch(fetchProductsAction(new URLSearchParams()));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchProductsAction.pending.type,
        fetchProductsAction.fulfilled.type
      ]);
    });

    it('Case: dispatch searchProducts action with GET request to /cameras?name_like={search}', async () => {
      mockAPI.onGet(`${APIRoute.Products}?name_like=${mockProduct.name}`).reply(200, mockProducts);

      const store = mockStore();

      await store.dispatch(searchProducts(mockProduct.name));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        searchProducts.pending.type,
        searchProducts.fulfilled.type
      ]);
    });

    it('Case: dispatch fetchProductInfo action with GET request to /cameras/{id}', async () => {
      mockAPI.onGet(`${APIRoute.Products}/${mockProduct.id}`).reply(200, mockProduct);

      const store = mockStore();

      await store.dispatch(fetchProductInfoAction(String(mockProduct.id)));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchProductInfoAction.pending.type,
        fetchProductInfoAction.fulfilled.type
      ]);
    });

    it('Case: dispatch fetchSimilarProducts action with GET request to /cameras/{id}/similar', async () => {
      mockAPI.onGet(`${APIRoute.Products}/${mockProduct.id}${APIRoute.Similar}`).reply(200, mockProducts);

      const store = mockStore();

      await store.dispatch(fetchSimilarProductsAction(String(mockProduct.id)));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchSimilarProductsAction.pending.type,
        fetchSimilarProductsAction.fulfilled.type
      ]);
    });

    it('Case: dispatch fetchPromoProduct action with GET request to /promo', async () => {
      mockAPI.onGet(APIRoute.Promo).reply(200, mockProduct);

      const store = mockStore();

      await store.dispatch(fetchPromoProductAction());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchPromoProductAction.pending.type,
        fetchPromoProductAction.fulfilled.type
      ]);
    });
  });


  describe('Reviews data api-actions', () => {
    const mockReviews = makeFakeReviews(10);
    const mockOffer = makeFakeProduct();
    const mockPostReview = makeFakePostReview();

    it('Case: dispatch fetchProductReviews action with GET request to /cameras/{id}/reviews', async () => {
      mockAPI.onGet(`${APIRoute.Products}/${mockOffer.id}${APIRoute.Reviews}`).reply(200, mockReviews);

      const store = mockStore();

      await store.dispatch(fetchProductReviewsAction(String(mockOffer.id)));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchProductReviewsAction.pending.type,
        fetchProductReviewsAction.fulfilled.type
      ]);
    });

    it('Case: dispatch postReview action with POST request to /reviews', async () => {
      mockAPI.onPost(APIRoute.Reviews).reply(200);

      const store = mockStore();

      await store.dispatch(postReviewAction(mockPostReview));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        postReviewAction.pending.type,
        postReviewAction.fulfilled.type
      ]);
    });
  });
});
