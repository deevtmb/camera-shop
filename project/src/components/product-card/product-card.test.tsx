import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import { fakeStore, makeFakeProduct } from '../../mocks/mocks';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import ProductInfo from '../product-info/product-info';
import ProductCard from './product-card';

describe('Component: ProductCard', () => {
  const product = makeFakeProduct();

  it('Case: rendered correctly', () => {
    render(
      <MemoryRouter>
        <ProductCard product={product}/>
      </MemoryRouter>
    );

    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(product.reviewCount)).toBeInTheDocument();
  });

  it('Case: click on button redirects to /product/{id}', async () => {
    render(
      <Provider store={fakeStore}>
        <MemoryRouter initialEntries={[AppRoute.Catalog]}>
          <Routes>
            <Route
              path={AppRoute.Catalog}
              element={<ProductCard product={product} />}
            />
            <Route
              path={AppRoute.ProductInfo}
              element={<ProductInfo product={product} />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByText(/Подробнее/i));

    expect(screen.getByText(product.reviewCount)).toBeInTheDocument();
  });
});
