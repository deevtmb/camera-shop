import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { fakeStore } from '../../mocks/mocks';
import CatalogFilter from './catalog-filter';

describe('Component: CatalogFilter', () => {
  it ('Case: rendered correctly', () => {
    render(
      <Provider store={fakeStore}>
        <MemoryRouter>
          <CatalogFilter productPrices={[]} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Категория/i)).toBeInTheDocument();
    expect(screen.getByText(/Тип камеры/i)).toBeInTheDocument();
    expect(screen.getByText(/Уровень/i)).toBeInTheDocument();
    expect(screen.getByText(/Сбросить фильтры/i)).toBeInTheDocument();
  });
});
