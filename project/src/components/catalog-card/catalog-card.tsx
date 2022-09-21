import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Product } from '../../types/product';
import { getFormatedPrice } from '../../utils/common';

type CatalogCardProps = {
  product: Product;
}

export default function CatalogCard({product}: CatalogCardProps): JSX.Element {
  const STARS_COUNT = 5;

  const {id, name, price, rating, reviewCount, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x} = product;

  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`} />
          <img src={`${previewImg}`} srcSet={`${previewImg2x} 2x`} width="280" height="240" alt={name} />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {Array.from({length: STARS_COUNT}).map((_, starId) => (
            starId < rating ?
              <svg width="17" height="16" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg> :
              <svg width="17" height="16" aria-hidden="true">
                <use xlinkHref="#icon-star"></use>
              </svg>
          ))}
          <p className="visually-hidden">Рейтинг: {rating}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{getFormatedPrice(price)} ₽</p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button">Купить</button>
        <Link className="btn btn--transparent" to={`${AppRoute.Product}${id}`}>Подробнее</Link>
      </div>
    </div>
  );
}
