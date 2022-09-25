import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MainLayout from './main-layout';

describe('Component: MainLayout', () => {
  it('Case: rendered correctly', () => {
    render(
      <MemoryRouter>
        <MainLayout>
          <h1>Main Layout</h1>
        </MainLayout>
      </MemoryRouter>
    );

    expect(screen.getByTestId('main layout')).toBeInTheDocument();
    expect(screen.getByText(/Main Layout/i)).toBeInTheDocument();
  });
});
