import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute, KeyName, ProductTab } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { searchProducts } from '../../store/api-actions';
import { getSearchedProducts } from '../../store/products-data/selectors';

export default function HeaderSearch(): JSX.Element {
  const [search, setSearch] = useState('');
  const dispatch = useAppDispatch();
  const products = useAppSelector(getSearchedProducts);
  const navigate = useNavigate();

  useEffect(() => {
    if (search) {
      dispatch(searchProducts(search));
    }
  }, [search, dispatch]);

  return (
    <div className={`form-search ${search.length > 0 ? 'list-opened' : ''}`}>
      <form>
        <label>
          <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-lens"></use>
          </svg>
          <input
            className="form-search__input"
            type="text"
            autoComplete="off"
            placeholder="Поиск по сайту"
            onChange={(evt) => setSearch(evt.currentTarget.value)}
          />
        </label>
        <ul className="form-search__select-list">
          {products.length ? products.map(({name, id}) => (
            <li
              className="form-search__select-item"
              tabIndex={0}
              key={id}
              onClick={() => navigate(`${AppRoute.Product}${id}/${ProductTab.Characteristics}`)}
              onKeyDown={(evt) => {
                if (evt.key === KeyName.Enter) {
                  navigate(`${AppRoute.Product}${id}/${ProductTab.Characteristics}`);
                }
              }}
            >
              {name}
            </li>
          )) : <li className="form-search__select-item">Товар не найден</li>}
        </ul>
        {search &&
          <button className="form-search__reset" type="reset">
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg><span className="visually-hidden">Сбросить поиск</span>
          </button>}
      </form>
    </div>
  );
}
