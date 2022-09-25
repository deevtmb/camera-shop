import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductRating from './product-rating';

describe('Component: ProductRating', () => {
  it('Case: 1-star rating', () => {
    render(
      <MemoryRouter>
        <ProductRating rating={1}/>
      </MemoryRouter>
    );

    expect(screen.getByTestId('full star')).toBeInTheDocument();
  });

  it('Case: 3-star rating', () => {
    render(
      <MemoryRouter>
        <ProductRating rating={3}/>
      </MemoryRouter>
    );

    expect(screen.getAllByTestId('full star').length).toEqual(3);
  });
});
