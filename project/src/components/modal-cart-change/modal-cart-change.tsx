import { ModalType } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { addProduct, deleteProduct, increaseCount } from '../../store/cart-data/cart-data';
import { getCartProducts } from '../../store/cart-data/selectors';
import { Product } from '../../types/product';
import ProductCartCard from '../product-cart-card/product-cart-card';

type ModalCartChangeProps = {
  product: Product;
  onModalClose: (arg: boolean) => void;
  onSuccessProductAdd: () => void;
  type: string;
}

export default function ModalCartChange(
  {type, product, onModalClose, onSuccessProductAdd}: ModalCartChangeProps
): JSX.Element {
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector(getCartProducts);

  const handleAddToCartButton = () => {
    cartProducts.find((cartProduct) => product.id === cartProduct.id)
      ? dispatch(increaseCount(product.id))
      : dispatch(addProduct(product));
    onSuccessProductAdd();
  };

  return (
    <div className="modal__content">
      <p className="title title--h4">
        {ModalType.Add === type ? 'Добавить товар в корзину' : 'Удалить этот товар?'}
      </p>
      <div className="basket-item basket-item--short">
        <ProductCartCard product={product} isExtended={false} />
      </div>
      <div className="modal__buttons">
        {ModalType.Add === type ?
          <button
            className="btn btn--purple modal__btn modal__btn--fit-width"
            type="button"
            onClick={handleAddToCartButton}
          >
            <svg width="24" height="16" aria-hidden="true">
              <use xlinkHref="#icon-add-basket"></use>
            </svg>Добавить в корзину
          </button> :
          <>
            <button
              className="btn btn--purple modal__btn modal__btn--half-width"
              type="button"
              onClick={() => {
                dispatch(deleteProduct(product.id));
                onModalClose(false);
              }}
            >
              Удалить
            </button>
            <button
              className="btn btn--transparent modal__btn modal__btn--half-width"
              onClick={() => onModalClose(false)}
            >
              Продолжить покупки
            </button>
          </>}
      </div>
      <button
        className="cross-btn"
        type="button"
        aria-label="Закрыть попап"
        onClick={() => onModalClose(false)}
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </div>
  );
}
