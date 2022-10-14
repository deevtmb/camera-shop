import { store } from '../store';
import { Product } from './product';
import { PromoProduct } from './promo-product';
import { Review } from './review';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type PriceRange = [string | null, string | null]

export type ProductsData = {
  products: Product[];
  promoProduct: PromoProduct | null;
  similarProducts: Product[];
  searchedProducts: Product[];
  productInfo: Product | null;
  isDataLoading: boolean;
  isSearchingProducts: boolean;
  productsPriceRange: PriceRange;
  userPriceRange: PriceRange;
};

export type ReviewsData = {
  reviews: Review[];
}

export type CartData = {
  productsInCart: Product[];
  coupon: string | null;
  discount: number;
}
