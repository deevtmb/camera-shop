import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { makeFakeProducts } from '../../mocks/mocks';
import ProductsSlider from './products-slider';

describe('Component: ProductsSlider', () => {
  it ('Case: rendered correctly', () => {
    const products = makeFakeProducts(5);

    render(
      <MemoryRouter>
        <ProductsSlider similarProducts={products} />
      </MemoryRouter>
    );

    products.forEach((product) => expect(screen.getByText(product.name)).toBeInTheDocument());
    expect(screen.getByText(/Похожие товары/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Предыдущий слайд/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Следующий слайд/i)).toBeInTheDocument();
  });
});
