import { Link, Navigate, useLocation } from 'react-router-dom';
import { AppRoute, ModalType, ProductTab } from '../../const';
import { ModalData } from '../../types/modal-data';
import { Product } from '../../types/product';
import { getFormatedPrice } from '../../utils/common';
import ProductRating from '../product-rating/product-rating';

type ProductInfoProps = {
  product: Product;
  onAddToCartButtonClick: (data: ModalData, isOpen: boolean) => void;
}

export default function ProductInfo({product, onAddToCartButtonClick}: ProductInfoProps): JSX.Element {
  const {id, name, price, reviewCount, rating, description, vendorCode, type, category, level,
    previewImg, previewImg2x, previewImgWebp, previewImgWebp2x} = product;

  const {pathname} = useLocation();

  if (!Object.values(ProductTab).some((tab) => pathname.includes(tab))) {
    return (
      <Navigate to={`${AppRoute.Product}${id}/${ProductTab.Characteristics}`} />
    );
  }

  return (
    <section className="product">
      <div className="container">
        <div className="product__img">
          <picture>
            <source type="image/webp" srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`} />
            <img src={`/${previewImg}`} srcSet={`/${previewImg2x} 2x`} width="560" height="480" alt={name} />
          </picture>
        </div>
        <div className="product__content">
          <h1 className="title title--h3">{name}</h1>
          <div className="rate product__rate">
            <ProductRating rating={rating} />
            <p className="visually-hidden">Рейтинг: {rating}</p>
            <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
          </div>
          <p className="product__price"><span className="visually-hidden">Цена:</span>{getFormatedPrice(price)} ₽</p>
          <button
            className="btn btn--purple"
            type="button"
            onClick={() => onAddToCartButtonClick({
              product: product,
              type: ModalType.Add
            }, true)}
          >
            <svg width="24" height="16" aria-hidden="true">
              <use xlinkHref="#icon-add-basket"></use>
            </svg>Добавить в корзину
          </button>
          <div className="tabs product__tabs">
            <div className="tabs__controls product__tabs-controls">
              <Link
                to={`${AppRoute.Product}${id}/${ProductTab.Characteristics}`}
                className={`tabs__control ${pathname.includes(ProductTab.Characteristics) ? 'is-active' : ''}`}
                type="button"
              >
                Характеристики
              </Link>
              <Link
                to={`${AppRoute.Product}${id}/${ProductTab.Description}`}
                className={`tabs__control ${pathname.includes(ProductTab.Description) ? 'is-active' : ''}`}
                type="button"
              >
                Описание
              </Link>
            </div>
            <div className="tabs__content">
              <div className={`tabs__element ${pathname.includes(ProductTab.Characteristics) ? 'is-active' : ''}`}>
                <ul className="product__tabs-list">
                  <li className="item-list"><span className="item-list__title">Артикул:</span>
                    <p className="item-list__text">{vendorCode}</p>
                  </li>
                  <li className="item-list"><span className="item-list__title">Категория:</span>
                    <p className="item-list__text">{category}</p>
                  </li>
                  <li className="item-list"><span className="item-list__title">Тип камеры:</span>
                    <p className="item-list__text">{type}</p>
                  </li>
                  <li className="item-list"><span className="item-list__title">Уровень:</span>
                    <p className="item-list__text">{level}</p>
                  </li>
                </ul>
              </div>
              <div className={`tabs__element ${pathname.includes(ProductTab.Description) ? 'is-active' : ''}`}>
                <div className="product__tabs-text">
                  <p>{description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
