import { useState } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import { ModalType } from '../../const';
import { useAppSelector } from '../../hooks/hooks';
import { getCartProducts } from '../../store/cart-data/selectors';
import { ModalData } from '../../types/modal-data';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import Modal from '../modal/modal';
import ProductCartCard from '../product-cart-card/product-cart-card';

export default function Cart(): JSX.Element {
  const cartProducts = useAppSelector(getCartProducts);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<ModalData>({product: null, type: ModalType.Add});

  const onModalOpenHandler = (data: ModalData, isOpen: boolean) => {
    setModalData(data);
    setIsModalOpen(isOpen);
  };

  return (
    <main>
      <div className="page-content">
        <Breadcrumbs />

        <section className="basket">
          <div className="container">
            <h1 className="title title--h2">Корзина</h1>
            {!!cartProducts.length &&
              <ul className="basket__list">
                {cartProducts.map((product) => (
                  <li className="basket-item" key={product.id}>
                    <ProductCartCard product={product} onDeleteButtonClick={onModalOpenHandler}/>
                  </li>
                ))}
              </ul>}
            <div className="basket__summary">
              <div className="basket__promo">
                <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
                <div className="basket-form">
                  <form action="#">
                    <div className="custom-input">
                      <label><span className="custom-input__label">Промокод</span>
                        <input type="text" name="promo" placeholder="Введите промокод" />
                      </label>
                      <p className="custom-input__error">Промокод неверный</p>
                      <p className="custom-input__success">Промокод принят!</p>
                    </div>
                    <button className="btn" type="submit">Применить
                    </button>
                  </form>
                </div>
              </div>
              <div className="basket__summary-order">
                <p className="basket__summary-item"><span className="basket__summary-text">Всего:</span><span className="basket__summary-value">111 390 ₽</span></p>
                <p className="basket__summary-item"><span className="basket__summary-text">Скидка:</span><span className="basket__summary-value basket__summary-value--bonus">0 ₽</span></p>
                <p className="basket__summary-item"><span className="basket__summary-text basket__summary-text--total">К оплате:</span><span className="basket__summary-value basket__summary-value--total">111 390 ₽</span></p>
                <button className="btn btn--purple" type="submit">Оформить заказ
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>
      {isModalOpen &&
        <RemoveScroll>
          <Modal onModalClose={setIsModalOpen} modalProduct={modalData.product} modalType={modalData.type} />
        </RemoveScroll>}
    </main>
  );
}
