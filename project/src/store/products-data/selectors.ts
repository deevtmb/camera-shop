import { NameSpace } from '../../const';
import { Product } from '../../types/product';
import { PromoProduct } from '../../types/promo-product';
import { State } from '../../types/state';

export const getProducts = (state: State): Product[] => state[NameSpace.Products].products;

export const getPromoProduct = (state: State): PromoProduct | null => state[NameSpace.Products].promoProduct;

export const getSimilarProducts = (state: State): Product[] => state[NameSpace.Products].similarProducts;

export const getProductInfo = (state: State): Product | null => state[NameSpace.Products].productInfo;