import { useEffect, useState } from 'react';
import { Review } from '../../types/review';
import ProductReview from '../product-review/product-review';

type ProductReviewsListProps = {
  reviews: Review[];
  onReviewButtonClick: (arg: boolean) => void;
}

export default function ProductReviewsList({reviews, onReviewButtonClick}: ProductReviewsListProps): JSX.Element {
  const REVIEWS_PER_VIEW = 3;

  const [visibleReviewsCount, setVisibleReviewsCount] = useState(REVIEWS_PER_VIEW);
  const visibleReviews = [...reviews]
    .sort((reviewA, reviewB) => -reviewA.createAt.localeCompare(reviewB.createAt))
    .slice(0, visibleReviewsCount);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (document.documentElement.scrollTop + document.documentElement.clientHeight === document.documentElement.scrollHeight) {
        window.scrollTo(0, document.documentElement.scrollHeight - 1);
        setVisibleReviewsCount((prev) => prev + REVIEWS_PER_VIEW);
      }
    });
  }, []);

  return (
    <section className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
          <button className="btn" type="button" onClick={() => onReviewButtonClick(true)}>Оставить свой отзыв</button>
        </div>
        <ul className="review-block__list">
          {visibleReviews.map((review) => <ProductReview key={review.id} productReview={review}/>)}
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
