import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { fakeStore, makeFakeReviews } from '../../mocks/mocks';
import ProductReviewsList from './product-reviews-list';

describe('Component: ProductReviewsList', () => {
  it ('Case: rendered correctly', () => {
    const reviews = makeFakeReviews(3);
    render(
      <Provider store={fakeStore}>
        <MemoryRouter>
          <ProductReviewsList reviews={reviews} onReviewButtonClick={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );

    reviews.forEach((review) => expect(screen.getByText(review.userName)).toBeInTheDocument());
    expect(screen.getByText(/Оставить свой отзыв/i)).toBeInTheDocument();
  });
});
