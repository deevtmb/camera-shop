import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Breadcrumbs from './breadcrumbs';
import {AppRoute} from '../../const';
import { makeFakeProduct } from '../../mocks/mocks';

describe('Component: Breadcrumbs', () => {
  it ('Case: rendered correctly at catalog page', () => {
    render(
      <MemoryRouter initialEntries={[AppRoute.Catalog]}>
        <Breadcrumbs />
      </MemoryRouter>
    );

    expect(screen.getByText(/Главная/i)).toBeInTheDocument();
    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
  });

  it ('Case: rendered correctly at product page', () => {
    const product = makeFakeProduct();
    render(
      <MemoryRouter initialEntries={[AppRoute.Product]}>
        <Breadcrumbs productName={product.name}/>
      </MemoryRouter>
    );

    expect(screen.getByText(/Главная/i)).toBeInTheDocument();
    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    expect(screen.getByText(product.name)).toBeInTheDocument();
  });
});
