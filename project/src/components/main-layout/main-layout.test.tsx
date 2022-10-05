import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { fakeStore } from '../../mocks/mocks';
import MainLayout from './main-layout';

describe('Component: MainLayout', () => {
  it('Case: rendered correctly', () => {
    render(
      <Provider store={fakeStore}>
        <MemoryRouter>
          <MainLayout>
            <h1>Main Layout</h1>
          </MainLayout>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('main layout')).toBeInTheDocument();
    expect(screen.getByText(/Main Layout/i)).toBeInTheDocument();
  });
});
