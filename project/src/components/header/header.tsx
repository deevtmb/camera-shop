import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';
import HeaderSearch from '../header-search/header-search';

export default function Header(): JSX.Element {
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
        <Link className="header__basket-link" to={useLocation()}>
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
        </Link>
      </div>
    </header>
  );
}
