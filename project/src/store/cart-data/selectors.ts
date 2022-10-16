import { NameSpace } from '../../const';
import { CartProduct } from '../../types/product';
import { State } from '../../types/state';

export const getCartProducts = (state: State): CartProduct[] => state[NameSpace.Cart].productsInCart;

export const getDiscount = (state: State): number => state[NameSpace.Cart].discount;

export const getCoupon = (state: State): string | null => state[NameSpace.Cart].coupon;
