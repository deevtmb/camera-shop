import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { makeFakeProduct } from '../../mocks/mocks';
import Cart from './cart';
import { createAPI } from '../../services/api';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);

describe('Component: Cart', () => {
  it('Case: empty cart rendered correctly', () => {
    const store = mockStore({
      CART_DATA: {
        productsInCart: [],
        coupon: null,
        discount: 15,
      }
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Cart />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/^Корзина$/)).toBeInTheDocument();
    expect(screen.getByText(/Ваша корзина пуста/i)).toBeInTheDocument();
  });

  it('Case: cart with product rendered correctly', () => {
    const mockProduct = {...makeFakeProduct(), cartCount: 2};
    const store = mockStore({
      CART_DATA: {
        productsInCart: [mockProduct],
        coupon: null,
        discount: 15,
      }
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Cart />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/^Корзина$/)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockProduct.level))).toBeInTheDocument();
  });
});
