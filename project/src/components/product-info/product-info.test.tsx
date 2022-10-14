import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { makeFakeProduct } from '../../mocks/mocks';
import ProductInfo from '../product-info/product-info';

describe('Component: ProductInfo', () => {
  const product = makeFakeProduct();

  it('Case: rendered correctly', () => {
    render(
      <MemoryRouter>
        <ProductInfo product={product} onAddToCartButtonClick={jest.fn()}/>
      </MemoryRouter>
    );

    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(product.reviewCount)).toBeInTheDocument();
    expect(screen.getByText(/Характеристики/i)).toBeInTheDocument();
    expect(screen.getByText(/Описание/i)).toBeInTheDocument();
  });
});
