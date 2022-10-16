import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createAPI } from '../../services/api';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import CartSummary from './cart-summary';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);

describe('Component: CartSummary', () => {
  it('Case: rendered correctly', async () => {
    const store = mockStore({
      CART_DATA: {
        productsInCart: [],
        coupon: null,
        discount: 15,
      }
    });

    render(
      <Provider store={store}>
        <CartSummary onSendOrderButtonClick={jest.fn()} />
      </Provider>
    );

    expect(screen.getByText(/Если у вас есть промокод на скидку/)).toBeInTheDocument();
    expect(screen.getByText(/^Промокод$/)).toBeInTheDocument();
    expect(screen.getByText(/Оформить заказ/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Введите промокод/)).toBeInTheDocument();

    const input = screen.getByPlaceholderText(/Введите промокод/) as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'camera-555' }});
    expect(input.value).toBe('camera-555');
  });
});
