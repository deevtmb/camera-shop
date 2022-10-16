import { render, screen } from '@testing-library/react';
import { ModalType } from '../../const';
import ModalResultIcon from './modal-result-icon';

describe('Component: ModalResultIcon', () => {
  it('Case: rendered correctly with Form type', () => {
    render(<ModalResultIcon modalType={ModalType.Form} />);

    expect(screen.getByTestId('icon-review-success')).toBeInTheDocument();
  });

  it('Case: rendered correctly with Add type', () => {
    render(<ModalResultIcon modalType={ModalType.Add} />);

    expect(screen.getByTestId('icon-success')).toBeInTheDocument();
  });

  it('Case: rendered correctly with BuyError type', () => {
    render(<ModalResultIcon modalType={ModalType.BuyError} />);

    expect(screen.getByTestId('icon-error')).toBeInTheDocument();
  });
});
