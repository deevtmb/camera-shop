import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import Footer from './footer';

describe('Component: Footer', () => {
  it('Case: rendered correctly', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByText(/Навигация/i)).toBeInTheDocument();
    expect(screen.getByText(/Ресурсы/i)).toBeInTheDocument();
    expect(screen.getByText(/Поддержка/i)).toBeInTheDocument();
  });

  it('Case: check route to catalog page', async () => {
    render(
      <MemoryRouter initialEntries={[AppRoute.Main]}>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<Footer />}
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
