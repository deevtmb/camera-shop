import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ModalType } from '../../const';
import ModalResultButtons from './modal-result-buttons';

describe('Component: ModalResultButtons', () => {
  it('Case: rendered correctly with Add type', () => {
    render(
      <MemoryRouter>
        <ModalResultButtons modalType={ModalType.Add} onModalClose={jest.fn()} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Продолжить покупки/i)).toBeInTheDocument();
    expect(screen.getByText(/Перейти в корзину/i)).toBeInTheDocument();
  });

  it('Case: rendered correctly with BuyError type', () => {
    render(<ModalResultButtons modalType={ModalType.BuyError} onModalClose={jest.fn()} />);

    expect(screen.getByText(/Попробовать снова/i)).toBeInTheDocument();
  });

  it('Case: rendered correctly with BuySuccess type', () => {
    render(
      <MemoryRouter>
        <ModalResultButtons modalType={ModalType.BuySuccess} onModalClose={jest.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Вернуться к покупкам/i)).toBeInTheDocument();
  });
});
