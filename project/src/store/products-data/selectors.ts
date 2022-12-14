import { NameSpace } from '../../const';
import { Product } from '../../types/product';
import { PromoProduct } from '../../types/promo-product';
import { PriceRange, State } from '../../types/state';

export const getProducts = (state: State): Product[] => state[NameSpace.Products].products;

export const getSearchedProducts = (state: State): Product[] => state[NameSpace.Products].searchedProducts;

export const getPromoProduct = (state: State): PromoProduct | null => state[NameSpace.Products].promoProduct;

export const getSimilarProducts = (state: State): Product[] => state[NameSpace.Products].similarProducts;

export const getProductInfo = (state: State): Product | null => state[NameSpace.Products].productInfo;

export const getLoadingStatus = (state: State): boolean => state[NameSpace.Products].isDataLoading;

export const geatSearchingStatus = (state: State): boolean => state[NameSpace.Products].isSearchingProducts;

export const getProductsPriceRange = (state: State): PriceRange => state[NameSpace.Products].productsPriceRange;

export const getUserPriceRange = (state: State): PriceRange => state[NameSpace.Products].userPriceRange;
