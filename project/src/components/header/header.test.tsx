import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import Header from './header';

describe('Component: Header', () => {
  it('Case: rendered correctly', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    expect(screen.getByText(/Гарантии/i)).toBeInTheDocument();
    expect(screen.getByText(/Доставка/i)).toBeInTheDocument();
  });

  it('Case: check route to catalog page', async () => {
    render(
      <MemoryRouter initialEntries={[AppRoute.Main]}>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<Header />}
          />
          <Route
            path={AppRoute.Catalog}
            element={<h1>Страница каталога</h1>}
          />
        </Routes>
      </MemoryRouter>
    );

    await userEvent.click(screen.getByText(/Каталог/i));

    expect(screen.getByText(/Страница каталога/i)).toBeInTheDocument();
  });
});
