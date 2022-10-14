import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Product } from '../../types/product';
import { CartData } from '../../types/state';

const initialState: CartData = {
  productsInCart: [],
  coupon: null,
  discount: 0,
};

export const cartData = createSlice({
  name: NameSpace.Cart,
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      const product = state.productsInCart.find(({id}) => id === action.payload.id);
      product && product.cartCount
        ? product.cartCount++
        : state.productsInCart.push({...action.payload, cartCount: 1});
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.productsInCart = state.productsInCart.filter(({id}) => id !== action.payload);
    },
    increaseCount: (state, action: PayloadAction<number>) => {
      const product = state.productsInCart.find(({id}) => id === action.payload);
      if (product?.cartCount !== undefined) {
        product.cartCount++;
      }
    },
    decreaseCount: (state, action: PayloadAction<number>) => {
      const product = state.productsInCart.find(({id}) => id === action.payload);
      if (product?.cartCount) {
        product.cartCount--;
      }
    },
    changeCount: (state, action: PayloadAction<{id: number, count: number}>) => {
      const product = state.productsInCart.find(({id}) => id === action.payload.id);
      if (product?.cartCount !== undefined) {
        product.cartCount = action.payload.count;
      }
    }
  },
});

export const {addProduct, increaseCount, decreaseCount, changeCount, deleteProduct} = cartData.actions;
