import { useState } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import { Link } from 'react-router-dom';
import { AppRoute, ModalType } from '../../const';
import { useAppSelector } from '../../hooks/hooks';
import { getCartProducts } from '../../store/cart-data/selectors';
import { ModalData } from '../../types/modal-data';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import CartSummary from '../cart-summary/cart-summary';
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
            {cartProducts.length ?
              <ul className="basket__list">
                {cartProducts.map((product) => (
                  <li className="basket-item" key={product.id}>
                    <ProductCartCard product={product} onDeleteButtonClick={onModalOpenHandler}/>
                  </li>
                ))}
              </ul> :
              <div className="basket__empty">
                <h2>Ваша корзина пуста :(</h2>
                <p>
                  <span>Давайте это исправим! </span>
                  <Link to={AppRoute.Catalog}>Перейти к выбору товаров.</Link>
                </p>
              </div>}
            <CartSummary onSendOrderButtonClick={onModalOpenHandler} />
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
