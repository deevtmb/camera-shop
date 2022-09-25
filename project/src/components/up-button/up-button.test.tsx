import { render, screen } from '@testing-library/react';
import UpButton from './up-button';

describe('Component: UpButton', () => {
  it('Case: rendered correctly', () => {
    render(<UpButton />);

    expect(screen.getByTestId('up button')).toBeInTheDocument();
  });
});
