import { makeFakeReviews } from '../../mocks/mocks';
import { Review } from '../../types/review';
import { ReviewsData } from '../../types/state';
import { fetchProductReviewsAction } from '../api-actions';
import { reviewsData } from './reviews-data';

describe('Reducer test: reviewsData', () => {
  const state: ReviewsData = {
    reviews: [],
  };

  const reviews: Review[] = makeFakeReviews(10);

  it('Case: load reviews to state when fetchProductReviews action fulfilled', () => {
    expect(reviewsData.reducer(state, {type: fetchProductReviewsAction.fulfilled.type, payload: reviews}))
      .toEqual({reviews});
  });
});
