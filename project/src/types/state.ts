import { store } from '../store';
import { Product } from './product';
import { PromoProduct } from './promo-product';
import { Review } from './review';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type ProductsData = {
  products: Product[];
  promoProduct: PromoProduct | null;
  similarProducts: Product[];
  productInfo: Product | null;
};

export type ReviewsData = {
  reviews: Review[];
}
