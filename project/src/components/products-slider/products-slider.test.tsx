import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { fakeStore, makeFakeProducts } from '../../mocks/mocks';
import ProductsSlider from './products-slider';

describe('Component: ProductsSlider', () => {
  it ('Case: rendered correctly', () => {
    const products = makeFakeProducts(5);

    render(
      <Provider store={fakeStore}>
        <MemoryRouter>
          <ProductsSlider similarProducts={products} onBuyButtonClick={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );

    products.forEach((product) => expect(screen.getByText(product.name)).toBeInTheDocument());
    expect(screen.getByText(/Похожие товары/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Предыдущий слайд/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Следующий слайд/i)).toBeInTheDocument();
  });
});
