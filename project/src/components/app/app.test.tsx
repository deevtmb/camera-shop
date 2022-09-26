import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { AppRoute } from '../../const';
import { fakeStore } from '../../mocks/mocks';
import App from './app';

const store = fakeStore;

const fakeApp = (route: string) => (
  <Provider store={store}>
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>
  </Provider>
);

describe('Test: App Routing', () => {
  it('Case: render main screen by route /', () => {
    render(fakeApp(AppRoute.Main));

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
  });

  it('Case: render catalog screen by route /catalog', () => {
    render(fakeApp(AppRoute.Catalog));

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
  });

  it('Case: render favorites screen by route /product/{id}', () => {
    render(fakeApp(`${AppRoute.Product}1`));

    expect(screen.getByText(/Оставить свой отзыв/i)).toBeInTheDocument();
  });

  it('Case: render not-found screen by route /wrong/route', () => {
    const wrongRoute = '/wrong/route';
    render(fakeApp(wrongRoute));

    expect(screen.getByText(/Страница не найдена/i)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться на Главную страницу/i)).toBeInTheDocument();
  });
});
