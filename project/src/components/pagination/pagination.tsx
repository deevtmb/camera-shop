import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type PaginationProps = {
  pagesCount: number;
  currentPage: number;
  onPageLinkClick: (arg: number) => void;
}

export default function Pagination({pagesCount, currentPage, onPageLinkClick}: PaginationProps): JSX.Element {
  const PAGE_STEP = 1;

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {currentPage > PAGE_STEP &&
          <li className="pagination__item">
            <Link
              className="pagination__link pagination__link--text"
              to={`${AppRoute.Catalog}/page_${currentPage - PAGE_STEP}`}
              onClick={() => onPageLinkClick(currentPage - PAGE_STEP)}
            >
              Назад
            </Link>
          </li>}

        {Array.from({length: pagesCount}).map((_, pageId) => (
          <li key={`page-${pageId + PAGE_STEP}`} className="pagination__item">
            <Link
              className={`pagination__link ${currentPage === (pageId + PAGE_STEP) && 'pagination__link--active'}`}
              to={`${AppRoute.Catalog}/page_${pageId + PAGE_STEP}`}
              onClick={() => onPageLinkClick(pageId + PAGE_STEP)}
            >
              {pageId + PAGE_STEP}
            </Link>
          </li>
        ))}

        {currentPage < pagesCount &&
          <li className="pagination__item">
            <Link
              className="pagination__link pagination__link--text"
              to={`${AppRoute.Catalog}/page_${currentPage + PAGE_STEP}`}
              onClick={() => onPageLinkClick(currentPage + PAGE_STEP)}
            >
              Далее
            </Link>
          </li>}
      </ul>
    </div>
  );
}
