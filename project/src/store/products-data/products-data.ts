import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { ProductsData } from '../../types/state';
import { fetchProductInfoAction, fetchProductsAction, fetchPromoProductAction, fetchSimilarProductsAction, searchProducts } from '../api-actions';

const initialState: ProductsData = {
  products: [],
  promoProduct: null,
  similarProducts: [],
  searchedProducts: [],
  productInfo: null,
  isDataLoading: false,
  isSearchingProducts: false
};

export const productsData = createSlice({
  name: NameSpace.Products,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProductsAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchProductsAction.rejected, (state) => {
        state.isDataLoading = false;
      })
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isDataLoading = false;
      })
      .addCase(searchProducts.pending, (state) => {
        state.isSearchingProducts = true;
      })
      .addCase(searchProducts.rejected, (state) => {
        state.isSearchingProducts = false;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.isSearchingProducts = false;
        state.searchedProducts = action.payload;
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
