import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { ProductsData } from '../../types/state';
import { fetchProductInfoAction, fetchProductsAction, fetchPromoProductAction, fetchSimilarProductsAction } from '../api-actions';

const initialState: ProductsData = {
  products: [],
  promoProduct: null,
  similarProducts: [],
  productInfo: null,
  isDataLoading: false,
};

export const productsData = createSlice({
  name: NameSpace.Products,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProductsAction.pending, (state, action) => {
        state.isDataLoading = true;
      })
      .addCase(fetchProductsAction.rejected, (state, action) => {
        state.isDataLoading = false;
      })
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isDataLoading = false;
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
