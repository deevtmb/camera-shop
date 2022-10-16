import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartQuantity, NameSpace } from '../../const';
import { CartProduct, Product } from '../../types/product';
import { CartData } from '../../types/state';
import { getDiscountAction, postOrderAction } from '../api-actions';

const DEFAULT_DISCOUNT = 0;

const initialState: CartData = {
  productsInCart: [],
  coupon: null,
  discount: DEFAULT_DISCOUNT,
};

export const cartData = createSlice({
  name: NameSpace.Cart,
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.productsInCart.push({...action.payload, cartCount: CartQuantity.Min});
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.productsInCart = state.productsInCart.filter(({id}) =>
        id !== action.payload);
    },
    increaseCount: (state, action: PayloadAction<number>) => {
      const product = state.productsInCart.find(({id}) =>
        id === action.payload) as CartProduct;
      product.cartCount < CartQuantity.Max && product.cartCount++;
    },
    decreaseCount: (state, action: PayloadAction<number>) => {
      const product = state.productsInCart.find(({id}) =>
        id === action.payload) as CartProduct;
      product.cartCount--;
    },
    changeCount: (state, action: PayloadAction<{id: number, count: number}>) => {
      const product = state.productsInCart.find(({id}) =>
        id === action.payload.id) as CartProduct;
      product.cartCount = action.payload.count;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getDiscountAction.rejected, (state) => {
        state.discount = DEFAULT_DISCOUNT;
        state.coupon = null;
      })
      .addCase(getDiscountAction.fulfilled, (state, action) => {
        const [discount, coupon] = action.payload;
        state.discount = discount;
        state.coupon = coupon;
      })
      .addCase(postOrderAction.fulfilled, (state) => {
        state.productsInCart = [];
        state.discount = DEFAULT_DISCOUNT;
        state.coupon = null;
      });
  },
});

export const {
  addProduct, increaseCount, decreaseCount, changeCount, deleteProduct
} = cartData.actions;
