import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { fakeStore } from '../../mocks/mocks';
import HeaderSearch from './header-search';

describe('Component: HeaderSearch', () => {
  it ('Case: rendered correctly', () => {
    render(
      <Provider store={fakeStore}>
        <MemoryRouter>
          <HeaderSearch />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByPlaceholderText(/Поиск по сайту/i)).toBeInTheDocument();
  });

  it ('Case: enter search info', async () => {
    render(
      <Provider store={fakeStore}>
        <MemoryRouter>
          <HeaderSearch />
        </MemoryRouter>
      </Provider>
    );

    const input: HTMLInputElement = screen.getByPlaceholderText(/Поиск по сайту/i);

    await userEvent.type(input, 'Not existed product');

    expect(input.value).toBe('Not existed product');
  });
});
