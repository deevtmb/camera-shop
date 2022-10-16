import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { fakeStore, makeFakeProduct } from '../../mocks/mocks';
import { Provider } from 'react-redux';
import ModalCartChange from './modal-cart-change';
import { ModalType } from '../../const';

describe('Component: ModalCartChange', () => {
  const product = makeFakeProduct();
  it('Case: rendered correctly with Add modal type', () => {
    render(
      <Provider store={fakeStore}>
        <MemoryRouter>
          <ModalCartChange
            product={product}
            type={ModalType.Add}
            onModalClose={jest.fn}
            onSuccessProductAdd={jest.fn()}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Добавить товар в корзину/i)).toBeInTheDocument();
    expect(screen.getByText(/Добавить в корзину/i)).toBeInTheDocument();
  });

  it('Case: rendered correctly with Delete modal type', () => {
    render(
      <Provider store={fakeStore}>
        <MemoryRouter>
          <ModalCartChange
            product={product}
            type={ModalType.Delete}
            onModalClose={jest.fn}
            onSuccessProductAdd={jest.fn()}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Удалить этот товар?/i)).toBeInTheDocument();
    expect(screen.getByText(/^Удалить$/)).toBeInTheDocument();
    expect(screen.getByText(/Продолжить покупки/i)).toBeInTheDocument();
  });
});
