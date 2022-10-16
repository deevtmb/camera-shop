import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { fakeStore, makeFakeProducts } from '../../mocks/mocks';
import CatalogCardsList from './catalog-cards-list';


describe('Component: CatalogCardsList', () => {
  const products = makeFakeProducts(10);
  it ('Case: rendered correctly', () => {
    render(
      <Provider store={fakeStore}>
        <MemoryRouter>
          <CatalogCardsList products={products} onBuyButtonClick={jest.fn}/>
        </MemoryRouter>
      </Provider>
    );

    products.forEach((product) => expect(screen.getByText(product.name)).toBeInTheDocument());
  });
});
