import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';

export default function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__info">
          <Link className="footer__logo" to={AppRoute.Main} aria-label="Переход на главную">
            <svg width="100" height="36" aria-hidden="true">
              <use xlinkHref="#icon-logo-mono"></use>
            </svg>
          </Link>
          <p className="footer__description">Интернет-магазин фото- и видеотехники</p>
          <ul className="social">
            <li className="social__item">
              <Link className="link" to={useLocation()} aria-label="Переход на страницу вконтатке">
                <svg width="20" height="20" aria-hidden="true">
                  <use xlinkHref="#icon-vk"></use>
                </svg>
              </Link>
            </li>
            <li className="social__item">
              <Link className="link" to={useLocation()} aria-label="Переход на страницу pinterest">
                <svg width="20" height="20" aria-hidden="true">
                  <use xlinkHref="#icon-pinterest"></use>
                </svg>
              </Link>
            </li>
            <li className="social__item">
              <Link className="link" to={useLocation()} aria-label="Переход на страницу reddit">
                <svg width="20" height="20" aria-hidden="true">
                  <use xlinkHref="#icon-reddit"></use>
                </svg>
              </Link>
            </li>
          </ul>
        </div>
        <ul className="footer__nav">
          <li className="footer__nav-item">
            <p className="footer__title">Навигация</p>
            <ul className="footer__list">
              <li className="footer__item">
                <Link className="link" to={AppRoute.Catalog}>Каталог
                </Link>
              </li>
              <li className="footer__item">
                <Link className="link" to={useLocation()}>Гарантии
                </Link>
              </li>
              <li className="footer__item">
                <Link className="link" to={useLocation()}>Доставка
                </Link>
              </li>
              <li className="footer__item">
                <Link className="link" to={useLocation()}>О компании
                </Link>
              </li>
            </ul>
          </li>
          <li className="footer__nav-item">
            <p className="footer__title">Ресурсы</p>
            <ul className="footer__list">
              <li className="footer__item">
                <Link className="link" to={useLocation()}>Курсы операторов
                </Link>
              </li>
              <li className="footer__item">
                <Link className="link" to={useLocation()}>Блог
                </Link>
              </li>
              <li className="footer__item">
                <Link className="link" to={useLocation()}>Сообщество
                </Link>
              </li>
            </ul>
          </li>
          <li className="footer__nav-item">
            <p className="footer__title">Поддержка</p>
            <ul className="footer__list">
              <li className="footer__item">
                <Link className="link" to={useLocation()}>FAQ
                </Link>
              </li>
              <li className="footer__item">
                <Link className="link" to={useLocation()}>Задать вопрос
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </footer>
  );
}
