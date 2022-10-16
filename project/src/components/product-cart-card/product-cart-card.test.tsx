import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { fakeStore, makeFakeProduct } from '../../mocks/mocks';
import { Provider } from 'react-redux';
import ProductCartCard from './product-cart-card';

describe('Component: ProductCartCard', () => {
  it('Case: card rendered correctly', () => {
    const product = makeFakeProduct();

    render(
      <Provider store={fakeStore}>
        <MemoryRouter>
          <ProductCartCard
            onDeleteButtonClick={jest.fn()}
            product={product}
            isExtended={false}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(product.vendorCode)).toBeInTheDocument();
  });

  it('Case: extended card rendered correctly', () => {
    const cartProduct = {...makeFakeProduct(), cartCount: 3};

    render(
      <Provider store={fakeStore}>
        <MemoryRouter>
          <ProductCartCard
            onDeleteButtonClick={jest.fn()}
            product={cartProduct}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(cartProduct.name)).toBeInTheDocument();
    expect(screen.getByText(cartProduct.vendorCode)).toBeInTheDocument();
    expect(screen.getByDisplayValue(cartProduct.cartCount)).toBeInTheDocument();
  });
});
