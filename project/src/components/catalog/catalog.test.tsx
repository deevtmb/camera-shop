import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { fakeStore } from '../../mocks/mocks';
import Catalog from './catalog';

describe('Component: Catalog', () => {
  it('Case: rendered correctly', () => {
    render(
      <Provider store={fakeStore}>
        <MemoryRouter>
          <Catalog />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
  });
});
