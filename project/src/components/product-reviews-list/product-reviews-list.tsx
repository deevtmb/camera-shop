import { useState } from 'react';
import { Review } from '../../types/review';
import ProductReview from '../product-review/product-review';

type ProductReviewsListProps = {
  reviews: Review[];
}

export default function ProductReviewsList({reviews}: ProductReviewsListProps): JSX.Element {
  const REVIEWS_PER_VIEW = 3;

  const [visibleReviewsCount, setVisibleReviewsCount] = useState(REVIEWS_PER_VIEW);

  return (
    <section className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
          <button className="btn" type="button">Оставить свой отзыв</button>
        </div>
        <ul className="review-block__list">
          {reviews.slice(0, visibleReviewsCount).map((review) => <ProductReview key={review.id} productReview={review}/>)}
        </ul>
        <div className="review-block__buttons">
          {visibleReviewsCount < reviews.length &&
          <button
            className="btn btn--purple"
            type="button"
            onClick={() => setVisibleReviewsCount((prev) => prev + REVIEWS_PER_VIEW)}
          >Показать больше отзывов
          </button>}
        </div>
      </div>
    </section>
  );
}
