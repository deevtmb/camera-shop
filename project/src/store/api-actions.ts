import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, FilterParam } from '../const';
import { Product } from '../types/product';
import { PromoProduct } from '../types/promo-product';
import { Review } from '../types/review';
import { ReviewPost } from '../types/review-post';
import { PriceRange } from '../types/state';


export const fetchProductsAction = createAsyncThunk<
{products: Product[], productsPriceRange: PriceRange, userPriceRange: PriceRange},
URLSearchParams,
{extra: AxiosInstance}
>(
  'data/fetchProducts',
  async (params, {extra: api}) => {
    let [minUserPrice, maxUserPrice]: PriceRange = [params.get(FilterParam.PriceFrom), params.get(FilterParam.PriceTo)];
    let productsPriceRange: PriceRange = [null, null];
    maxUserPrice = ((maxUserPrice && minUserPrice) && (+minUserPrice > +maxUserPrice)) ? minUserPrice : maxUserPrice;

    if (maxUserPrice) {
      params.set(FilterParam.PriceTo, maxUserPrice);
    }

    const {data} = await api.get<Product[]>(`${APIRoute.Products}?${params.toString()}`);

    if (data.length) {
      const productPrices = data.map(({price}) => price);
      productsPriceRange = [String(Math.min(...productPrices)), String(Math.max(...productPrices))];
      [minUserPrice, maxUserPrice] = [
        minUserPrice && String(Math.min(...productPrices)),
        maxUserPrice && String(Math.max(...productPrices))
      ];
    }

    return {
      products: data,
      productsPriceRange: productsPriceRange,
      userPriceRange: [minUserPrice, maxUserPrice]
    };
  }
);

export const searchProducts = createAsyncThunk<Product[], string, {extra: AxiosInstance}>(
  'data/searchProducts',
  async (search, {extra: api}) => {
    const {data} = await api.get<Product[]>(`${APIRoute.Products}?name_like=${search}`);
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
    const {data} = await api.post(APIRoute.Reviews, review);
    return data;
  }
);

