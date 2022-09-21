import { Product } from '../../types/product';
import { getFormatedPrice } from '../../utils/common';
import ProductRating from '../product-rating/product-rating';

type ProductInfoProps = {
  product: Product;
}

export default function ProductInfo({product}: ProductInfoProps): JSX.Element {
  const {name, price, reviewCount, rating, description, vendorCode, type, category, level,
    previewImg, previewImg2x, previewImgWebp, previewImgWebp2x} = product;

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
          <button className="btn btn--purple" type="button">
            <svg width="24" height="16" aria-hidden="true">
              <use xlinkHref="#icon-add-basket"></use>
            </svg>Добавить в корзину
          </button>
          <div className="tabs product__tabs">
            <div className="tabs__controls product__tabs-controls">
              <button className="tabs__control is-active" type="button">Характеристики</button>
              <button className="tabs__control" type="button">Описание</button>
            </div>
            <div className="tabs__content">
              <div className="tabs__element is-active">
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
              <div className="tabs__element">
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
