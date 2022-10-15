import { render, screen } from '@testing-library/react';
import { ModalType } from '../../const';
import ModalSuccess from './modal-result';

describe('Component: ModalSuccess', () => {
  it('Case: rendered correctly', () => {
    render(<ModalSuccess onModalClose={jest.fn()} modalType={ModalType.Form}/>);

    expect(screen.getByText(/Спасибо за отзыв/i)).toBeInTheDocument();
  });
});
