import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { productsData } from './products-data/products-data';

export const rootReducer = combineReducers({
  [NameSpace.Products]: productsData.reducer,
});
