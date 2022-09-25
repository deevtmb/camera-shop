import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { makeFakeReviews } from '../../mocks/mocks';
import ProductReviewsList from './product-reviews-list';

describe('Component: ProductReviewsList', () => {
  it ('Case: rendered correctly', () => {
    const reviews = makeFakeReviews(3);
    render(
      <MemoryRouter>
        <ProductReviewsList reviews={reviews} onReviewButtonClick={jest.fn()} />
      </MemoryRouter>
    );

    reviews.forEach((review) => expect(screen.getByText(review.userName)).toBeInTheDocument());
    expect(screen.getByText(/Оставить свой отзыв/i)).toBeInTheDocument();
  });
});
