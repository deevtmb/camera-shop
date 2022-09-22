import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { DateData } from '../../const';
import { Review } from '../../types/review';
import ProductRating from '../product-rating/product-rating';

type ProductReviewProps = {
  productReview: Review;
}

export default function ProductReview({productReview}: ProductReviewProps): JSX.Element {
  const {userName, createAt ,rating, advantage, disadvantage, review} = productReview;

  return (
    <li className="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{userName}</p>
        <time
          className="review-card__data"
          dateTime={dayjs(createAt).format(DateData.DateTimeFormat)}
        >
          {dayjs(createAt).locale(DateData.Locale).format(DateData.ReviewFormat)}
        </time>
      </div>
      <div className="rate review-card__rate">
        <ProductRating rating={rating} />
        <p className="visually-hidden">Оценка: {rating}</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list"><span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{advantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{disadvantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{review}</p>
        </li>
      </ul>
    </li>
  );
}
