import { Fragment } from 'react';

type ProductRatingProps = {
  rating: number;
}

export default function ProductRating({rating}: ProductRatingProps): JSX.Element {
  const STARS_COUNT = 5;

  return (
    <Fragment>
      {Array.from({length: STARS_COUNT}).map((_, starId) => (
        starId < rating ?
          <Fragment key={`star-${STARS_COUNT - starId}`}>
            <svg width="17" height="16" aria-hidden="true" data-testid='full star'>
              <use xlinkHref="#icon-full-star"></use>
            </svg>
          </Fragment> :
          <Fragment key={`star-${STARS_COUNT - starId}`} >
            <svg width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </Fragment>
      ))}
    </Fragment>
  );
}
