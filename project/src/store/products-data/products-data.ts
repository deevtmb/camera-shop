import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { ProductsData } from '../../types/state';
import { fetchProductInfoAction, fetchProductsAction, fetchPromoProductAction, fetchSimilarProductsAction } from '../api-actions';

const initialState: ProductsData = {
  products: [],
  promoProduct: null,
  similarProducts: [],
  productInfo: null,
};

export const productsData = createSlice({
  name: NameSpace.Products,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(fetchPromoProductAction.fulfilled, (state, action) => {
        state.promoProduct = action.payload;
      })
      .addCase(fetchSimilarProductsAction.fulfilled, (state, action) => {
        state.similarProducts = action.payload;
      })
      .addCase(fetchProductInfoAction.fulfilled, (state, action) => {
        state.productInfo = action.payload;
      });
  },
});
