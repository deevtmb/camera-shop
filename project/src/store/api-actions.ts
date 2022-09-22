import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../const';
import { Product } from '../types/product';
import { PromoProduct } from '../types/promo-product';
import { Review } from '../types/review';
import { ReviewPost } from '../types/review-post';


export const fetchProductsAction = createAsyncThunk<Product[], undefined, {extra: AxiosInstance}>(
  'data/fetchProducts',
  async (_args, {extra: api}) => {
    const {data} = await api.get<Product[]>(APIRoute.Products);
    return data;
  }
);

export const fetchProductInfoAction = createAsyncThunk<Product, string, {extra: AxiosInstance}>(
  'data/fetchProductInfo',
  async (id, {extra: api}) => {
    const {data} = await api.get<Product>(`${APIRoute.Products}/${id}`);
    return data;
  }
);

export const fetchPromoProductAction = createAsyncThunk<PromoProduct, undefined, {extra: AxiosInstance}>(
  'data/fetchPromoProduct',
  async (_args, {extra: api}) => {
    const {data} = await api.get<PromoProduct>(APIRoute.Promo);
    return data;
  }
);

export const fetchSimilarProductsAction = createAsyncThunk<Product[], string, {extra: AxiosInstance}>(
  'data/fetchSimilarProducts',
  async (id, {extra: api}) => {
    const {data} = await api.get<Product[]>(`${APIRoute.Products}/${id}${APIRoute.Similar}`);
    return data;
  }
);

export const fetchProductReviewsAction = createAsyncThunk<Review[], string, {extra: AxiosInstance}>(
  'data/fetchProductReviews',
  async (id, {extra: api}) => {
    const {data} = await api.get<Review[]>(`${APIRoute.Products}/${id}${APIRoute.Reviews}`);
    return data;
  }
);

export const postReviewAction = createAsyncThunk<void, ReviewPost, {extra: AxiosInstance}>(
  'data/postReview',
  async (review, {extra: api}) => {
    await api.post(APIRoute.Reviews, review);
  }
);

