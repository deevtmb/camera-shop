import { render, screen } from '@testing-library/react';
import CatalogFilter from './catalog-filter';

describe('Component: CatalogFilter', () => {
  it ('Case: rendered correctly', () => {
    render(
      <CatalogFilter />
    );

    expect(screen.getByText(/Категория/i)).toBeInTheDocument();
    expect(screen.getByText(/Тип камеры/i)).toBeInTheDocument();
    expect(screen.getByText(/Уровень/i)).toBeInTheDocument();
    expect(screen.getByText(/Сбросить фильтры/i)).toBeInTheDocument();
  });
});
