import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { fakeStore } from '../../mocks/mocks';
import Product from './product';

describe('Component: Product', () => {
  it('Case: rendered correctly', () => {
    render(
      <Provider store={fakeStore}>
        <MemoryRouter>
          <Product />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('loading component')).toBeInTheDocument();
    expect(screen.getByText(/Оставить свой отзыв/i)).toBeInTheDocument();
  });
});
