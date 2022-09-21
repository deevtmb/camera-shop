import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';

type BreadcrumbsProps = {
  productName?: string | null;
}

export default function Breadcrumbs({productName}: BreadcrumbsProps): JSX.Element {
  const {pathname} = useLocation();

  return (
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <Link className="breadcrumbs__link" to={AppRoute.Main}>Главная
              <svg width="5" height="8" aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini"></use>
              </svg>
            </Link>
          </li>
          <li className="breadcrumbs__item">
            {pathname.includes(AppRoute.Catalog) ?
              <span className={`breadcrumbs__link ${pathname === AppRoute.Catalog && 'breadcrumbs__link--active'}`}>Каталог</span> :
              <Link className="breadcrumbs__link" to={AppRoute.Catalog}>Каталог
                <svg width="5" height="8" aria-hidden="true">
                  <use xlinkHref="#icon-arrow-mini"></use>
                </svg>
              </Link>}
          </li>
          {productName &&
            <li className="breadcrumbs__item">
              <span className="breadcrumbs__link breadcrumbs__link--active">{productName}</span>
            </li>}
        </ul>
      </div>
    </div>
  );
}
