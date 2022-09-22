import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { ReviewsData } from '../../types/state';
import { fetchProductReviewsAction } from '../api-actions';

const initialState: ReviewsData = {
  reviews: []
};

export const reviewsData = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProductReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      });
  },
});
