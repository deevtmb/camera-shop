import { useSearchParams } from 'react-router-dom';

type PaginationProps = {
  pagesCount: number;
  currentPage: number;
  onPageLinkClick: (arg: number) => void;
}

export default function Pagination({pagesCount, currentPage, onPageLinkClick}: PaginationProps): JSX.Element {
  const PAGE_STEP = 1;
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {currentPage > PAGE_STEP &&
          <li className="pagination__item">
            <span
              className="pagination__link pagination__link--text"
              onClick={() => {
                onPageLinkClick(currentPage - PAGE_STEP);
                searchParams.set('page', String(currentPage - PAGE_STEP));
                setSearchParams(searchParams);
              }}
            >
              Назад
            </span>
          </li>}

        {Array.from({length: pagesCount}).map((_, pageId) => (
          <li key={`page-${pageId + PAGE_STEP}`} className="pagination__item">
            <span
              className={`pagination__link ${currentPage === (pageId + PAGE_STEP) && 'pagination__link--active'}`}
              onClick={() => {
                onPageLinkClick(pageId + PAGE_STEP);
                searchParams.set('page', String(pageId + PAGE_STEP));
                setSearchParams(searchParams);
              }}
            >
              {pageId + PAGE_STEP}
            </span>
          </li>
        ))}

        {currentPage < pagesCount &&
          <li className="pagination__item">
            <span
              className="pagination__link pagination__link--text"
              onClick={() => {
                onPageLinkClick(currentPage + PAGE_STEP);
                searchParams.set('page', String(currentPage + PAGE_STEP));
                setSearchParams(searchParams);
              }}
            >
              Далее
            </span>
          </li>}
      </ul>
    </div>
  );
}
