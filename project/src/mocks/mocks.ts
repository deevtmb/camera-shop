import { createAPI } from '../services/api';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { Product } from '../types/product';
import { datatype, image, lorem, name } from 'faker';
import { Review } from '../types/review';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);

export const makeFakeProduct = (): Product => ({
  id: 0,
  name: name.firstName(),
  vendorCode: datatype.string(),
  type: lorem.word(),
  category: lorem.word(),
  description: lorem.sentence(),
  level: lorem.word(),
  rating: datatype.number({ min: 1, max: 5}),
  price: datatype.number({ min: 1, max: 50000}),
  previewImg: image.city(),
  previewImg2x: image.city(),
  previewImgWebp: image.city(),
  previewImgWebp2x: image.city(),
  reviewCount: datatype.number({ min: 1, max: 100}),
});

export const makeFakeProducts = (count: number): Product[] => Array.from({length: count}, (_, i) => {
  const product = makeFakeProduct();
  product.id = i + 1;
  return product;
});

export const makeFakeReviews = (count: number): Review[] => Array.from({length: count}, () => ({
  id: datatype.uuid(),
  userName: name.firstName(),
  advantage: lorem.sentence(),
  disadvantage: lorem.sentence(),
  review: lorem.sentence(),
  rating: datatype.number({ min: 1, max: 5}),
  createAt: datatype.string(),
  cameraId: datatype.number({ min: 1, max: 10}),
}));

export const makeFakePostReview = () => ({
  cameraId: datatype.number({ min: 1, max: 10}),
  userName: name.firstName(),
  advantage: lorem.sentence(),
  disadvantage: lorem.sentence(),
  review: lorem.sentence(),
  rating: datatype.number({ min: 1, max: 5}),
});

export const fakeStore = mockStore({
  PRODUCTS_DATA: {
    products: makeFakeProducts(20),
    promoProduct: makeFakeProduct(),
    similarProducts: makeFakeProducts(6),
    searchedProducts: makeFakeProducts(20),
    productInfo: makeFakeProduct(),
    isDataLoading: false,
    isSearchingProducts: false,
    productsPriceRange: [null, null],
    userPriceRange: [null, null],
  },
  REVIEWS_DATA: {
    reviews: makeFakeReviews(15),
  }
});
