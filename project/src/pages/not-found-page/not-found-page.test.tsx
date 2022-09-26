import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { fakeStore } from '../../mocks/mocks';
import NotFoundPage from './not-found-page';

describe('Component: NotFoundPage', () => {
  it('Case: rendered correctly', () => {
    render(
      <Provider store={fakeStore}>
        <MemoryRouter>
          <NotFoundPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Страница не найдена/i)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться на Главную страницу/i)).toBeInTheDocument();
  });
});
