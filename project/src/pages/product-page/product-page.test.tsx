import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import { fakeStore } from '../../mocks/mocks';
import ProductPage from './product-page';

describe('Component: ProductPage', () => {
  it('Case: rendered correctly', () => {
    render(
      <Provider store={fakeStore}>
        <MemoryRouter initialEntries={[`${AppRoute.Product}1`]}>
          <Routes>
            <Route path={AppRoute.ProductInfo} element={<ProductPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Оставить свой отзыв/i)).toBeInTheDocument();
  });
});
