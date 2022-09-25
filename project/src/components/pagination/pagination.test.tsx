import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Pagination from './pagination';

describe('Component: Pagination', () => {
  it('Case: fisrt page', () => {
    render(
      <MemoryRouter>
        <Pagination pagesCount={2} currentPage={1} onPageLinkClick={jest.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByText(1)).toBeInTheDocument();
    expect(screen.getByText(2)).toBeInTheDocument();
    expect(screen.queryByText(/Назад/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Далее/i)).toBeInTheDocument();
  });

  it('Case: page in the middle', () => {
    render(
      <MemoryRouter>
        <Pagination pagesCount={3} currentPage={2} onPageLinkClick={jest.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByText(1)).toBeInTheDocument();
    expect(screen.getByText(2)).toBeInTheDocument();
    expect(screen.getByText(3)).toBeInTheDocument();
    expect(screen.getByText(/Назад/i)).toBeInTheDocument();
    expect(screen.getByText(/Далее/i)).toBeInTheDocument();
  });

  it('Case: last page', () => {
    render(
      <MemoryRouter>
        <Pagination pagesCount={2} currentPage={3} onPageLinkClick={jest.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByText(1)).toBeInTheDocument();
    expect(screen.getByText(2)).toBeInTheDocument();
    expect(screen.getByText(/Назад/i)).toBeInTheDocument();
    expect(screen.queryByText(/Далее/i)).not.toBeInTheDocument();
  });

});
