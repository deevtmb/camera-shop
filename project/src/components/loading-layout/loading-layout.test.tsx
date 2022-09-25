import { render, screen } from '@testing-library/react';
import LoadingLayout from './loading-layout';

describe('Component: LoadingLayout', () => {
  it('Case: rendered correctly', () => {
    render(<LoadingLayout />);

    expect(screen.getByTestId('loading component')).toBeInTheDocument();
  });
});
