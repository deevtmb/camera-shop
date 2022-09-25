import { render, screen } from '@testing-library/react';
import ModalSuccess from './modal-success';

describe('Component: ModalSuccess', () => {
  it('Case: rendered correctly', () => {
    render(<ModalSuccess onModalClose={jest.fn()} />);

    expect(screen.getByText(/Спасибо за отзыв/i)).toBeInTheDocument();
  });
});
