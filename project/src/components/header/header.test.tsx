import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import { fakeStore } from '../../mocks/mocks';
import Header from './header';

describe('Component: Header', () => {
  it('Case: rendered correctly', () => {
    render(
      <Provider store={fakeStore}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    expect(screen.getByText(/Гарантии/i)).toBeInTheDocument();
    expect(screen.getByText(/Доставка/i)).toBeInTheDocument();
  });

  it('Case: check route to catalog page', async () => {
    render(
      <Provider store={fakeStore}>w
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
      </Provider>
    );

    await userEvent.click(screen.getByText(/Каталог/i));

    expect(screen.getByText(/Страница каталога/i)).toBeInTheDocument();
  });
});
