import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { makeFakeProducts } from '../../mocks/mocks';
import CatalogCardsList from './catalog-cards-list';


describe('Component: CatalogCardsList', () => {
  const products = makeFakeProducts(10);
  it ('Case: rendered correctly', () => {
    render(
      <MemoryRouter>
        <CatalogCardsList products={products}/>
      </MemoryRouter>
    );

    products.forEach((product) => expect(screen.getByText(product.name)).toBeInTheDocument());
  });
});
