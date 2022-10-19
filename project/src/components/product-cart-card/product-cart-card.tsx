import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, CartQuantity, KeyName, ModalType, ProductTab } from '../../const';
import { useAppDispatch } from '../../hooks/hooks';
import { changeCount, decreaseCount, increaseCount } from '../../store/cart-data/cart-data';
import { ModalData } from '../../types/modal-data';
import { Product } from '../../types/product';
import { getFormatedPrice } from '../../utils/common';

type ProductCartCardProps = {
  product: Product;
  isExtended?: boolean;
  onDeleteButtonClick?: (data: ModalData, isOpen: boolean) => void;
}

export default function ProductCartCard({onDeleteButtonClick, product, isExtended = true}: ProductCartCardProps): JSX.Element {
  const {previewImg, previewImg2x, previewImgWebp, previewImgWebp2x,
    name, vendorCode, level, type, category, price, cartCount, id} = product;

  const dispatch = useAppDispatch();
  const productsCount = cartCount ? cartCount : CartQuantity.Min;

  const [count, setCount] = useState<number | string>(productsCount);

  useEffect(() => {
    setCount(productsCount);
  }, [productsCount]);

  return (
    <>
      <div className="basket-item__img">
        <picture>
          <source type="image/webp" srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`} />
          <img src={`/${previewImg}`} srcSet={`/${previewImg2x} 2x`} width="140" height="120" alt={name} />
        </picture>
      </div>
      <div className="basket-item__description">
        {isExtended ?
          <Link
            className="basket-item__title basket-item__title--link"
            to={`${AppRoute.Product}${id}/${ProductTab.Characteristics}`}
          >{name}
          </Link> :
          <p className="basket-item__title">{name}</p>}
        <ul className="basket-item__list">
          <li className="basket-item__list-item">
            <span className="basket-item__article">Артикул:</span>
            <span className="basket-item__number"> {vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{type} {category.toLowerCase()}</li>
          <li className="basket-item__list-item">{level} уровень</li>
        </ul>
        {!isExtended &&
          <p className="basket-item__price">
            <span className="visually-hidden">Цена:</span>{getFormatedPrice(price)} ₽
          </p>}
      </div>
      {(isExtended && onDeleteButtonClick) &&
      <>
        <p className="basket-item__price">
          <span className="visually-hidden">Цена:</span>{getFormatedPrice(price)} ₽
        </p>
        <div className="quantity">
          <button
            className="btn-icon btn-icon--prev"
            aria-label="уменьшить количество товара"
            disabled={CartQuantity.Min === productsCount}
            onClick={() => {
              dispatch(decreaseCount(id));
            }}
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
          <label className="visually-hidden" htmlFor="counter1"></label>
          <input
            type="number"
            id="counter1"
            value={count}
            min="1"
            max="99"
            aria-label="количество товара"
            onChange={(evt) => {
              if (+evt.target.value > CartQuantity.Max) {
                dispatch(changeCount({id, count: Math.min(CartQuantity.Max, +evt.target.value)}));
                setCount(Math.min(CartQuantity.Max, +evt.target.value));
              } else if (+evt.target.value > CartQuantity.Min) {
                dispatch(changeCount({id, count: +evt.target.value}));
                setCount(+evt.target.value);
              } else {
                setCount(evt.target.value && Math.max(CartQuantity.Min, +evt.target.value));
              }
            }}
            onBlur={(evt) => {
              dispatch(changeCount({id, count: Math.max(CartQuantity.Min, +evt.target.value)}));
              setCount(Math.max(CartQuantity.Min, +evt.target.value));
            }}
            onKeyDown={(evt) => {
              if (evt.key === KeyName.Enter) {
                dispatch(changeCount({id, count: Math.max(CartQuantity.Min, +evt.currentTarget.value)}));
                setCount(Math.max(CartQuantity.Min, +evt.currentTarget.value));
              }
            }}
          />
          <button
            className="btn-icon btn-icon--next"
            aria-label="увеличить количество товара"
            disabled={CartQuantity.Max === productsCount}
            onClick={() => {
              dispatch(increaseCount(id));
            }}
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
        </div>
        <div className="basket-item__total-price">
          <span className="visually-hidden">Общая цена:</span>{getFormatedPrice(price * productsCount)} ₽
        </div>
        <button
          className="cross-btn"
          type="button"
          aria-label="Удалить товар"
          onClick={() => onDeleteButtonClick({
            product: product,
            type: ModalType.Delete,
          }, true)}
        >
          <svg width="10" height="10" aria-hidden="true">
            <use xlinkHref="#icon-close"></use>
          </svg>
        </button>
      </>}
    </>
  );
}
