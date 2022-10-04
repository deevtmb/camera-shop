import { SyntheticEvent } from 'react';
import { SortOrder, SortParams, SortType } from '../../const';

type CatalogSortProps = {
  onSortChange: (evt: SyntheticEvent<HTMLInputElement>) => void;
  searchParams: string;
}
export default function CatalogSort({onSortChange, searchParams}: CatalogSortProps): JSX.Element {
  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPrice"
                name="sort"
                onChange={onSortChange}
                data-sort-type={SortType.Price}
                data-sort-param={SortParams.Sort}
                checked={searchParams.includes(SortType.Price)}
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPopular"
                name="sort"
                onChange={onSortChange}
                data-sort-type={SortType.Rating}
                data-sort-param={SortParams.Sort}
                checked={searchParams.includes(SortType.Rating)}
              />
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input
                type="radio"
                id="up"
                name="sort-icon"
                aria-label="По возрастанию"
                onChange={onSortChange}
                data-sort-type={SortOrder.Up}
                data-sort-param={SortParams.Order}
              />
              <label htmlFor="up">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input
                type="radio"
                id="down"
                name="sort-icon"
                aria-label="По убыванию"
                onChange={onSortChange}
                data-sort-type={SortOrder.Down}
                data-sort-param={SortParams.Order}
              />
              <label htmlFor="down">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
