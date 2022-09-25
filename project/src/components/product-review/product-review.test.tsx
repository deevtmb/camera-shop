import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { makeFakeReviews } from '../../mocks/mocks';
import ProductReview from './product-review';

describe('Component: ProductReview', () => {
  const review = makeFakeReviews(1)[0];

  it('Case: rendered correctly', () => {
    render(
      <MemoryRouter>
        <ProductReview productReview={review}/>
      </MemoryRouter>
    );

    expect(screen.getByText(review.userName)).toBeInTheDocument();
    expect(screen.getByText(review.review)).toBeInTheDocument();
    expect(screen.getByText(/Достоинства/i)).toBeInTheDocument();
    expect(screen.getByText(/Недостатки/i)).toBeInTheDocument();
  });
});
