import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { fakeStore } from '../../mocks/mocks';
import ModalForm from './modal-form';

describe('Component: ProductInfo', () => {
  it('Case: rendered correctly', () => {
    render(
      <Provider store={fakeStore}>
        <ModalForm onModalClose={jest.fn()} onSuccessSubmit={jest.fn()} productId={1} />
      </Provider>
    );

    expect(screen.getByText('Ваше имя')).toBeInTheDocument();
    expect(screen.getByText('Достоинства')).toBeInTheDocument();
    expect(screen.getByText('Комментарий')).toBeInTheDocument();
    expect(screen.getByText('Отправить отзыв')).toBeInTheDocument();
  });
});
