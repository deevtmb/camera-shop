import { render, screen } from '@testing-library/react';
import CatalogSort from './catalog-sort';

describe('Component: CatalogSort', () => {
  it('Case: rendered correctly', () => {
    render(
      <CatalogSort />
    );

    expect(screen.getByText(/Сортировать:/i)).toBeInTheDocument();
    expect(screen.getByText(/по цене/i)).toBeInTheDocument();
    expect(screen.getByText(/по популярности/i)).toBeInTheDocument();
  });
});
