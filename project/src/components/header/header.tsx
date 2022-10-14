import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks/hooks';
import { getCartProducts } from '../../store/cart-data/selectors';
import HeaderSearch from '../header-search/header-search';

export default function Header(): JSX.Element {
  const cartProductsCount = useAppSelector(getCartProducts)
    .reduce((total, product) => total + (product.cartCount ?? 0), 0);

  return (
    <header className="header" id="header">
      <div className="container">
        <Link className="header__logo" to={AppRoute.Main} aria-label="Переход на главную">
          <svg width="100" height="36" aria-hidden="true">
            <use xlinkHref="#icon-logo"></use>
          </svg>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link className="main-nav__link" to={AppRoute.Catalog}>Каталог</Link>
            </li>
            <li className="main-nav__item">
              <Link className="main-nav__link" to={useLocation()}>Гарантии</Link>
            </li>
            <li className="main-nav__item">
              <Link className="main-nav__link" to={useLocation()}>Доставка</Link>
            </li>
            <li className="main-nav__item">
              <Link className="main-nav__link" to={useLocation()}>О компании</Link>
            </li>
          </ul>
        </nav>
        <HeaderSearch />
        <Link className="header__basket-link" to={AppRoute.Cart}>
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          {cartProductsCount > 0 && <span className="header__basket-count">{cartProductsCount}</span>}
        </Link>
      </div>
    </header>
  );
}
