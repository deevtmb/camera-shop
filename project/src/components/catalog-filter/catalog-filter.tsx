import { SyntheticEvent, useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { EventType, FilterParam, KeyName, NavigateParam, ProductCategory, ProductClass, ProductLevel } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchProductsAction } from '../../store/api-actions';
import { getLoadingStatus, getProductsPriceRange, getUserPriceRange } from '../../store/products-data/selectors';
import { debounce } from 'lodash';

const DEFAULT_PAGE = 1;
const PRICE_CHANGE_DELAY = 2500;
const CHANGE_DELAY = 600;

export default function CatalogFilter(): JSX.Element {
  const dispatch = useAppDispatch();
  const isDataLoading = useAppSelector(getLoadingStatus);
  const [minUserPrice, maxUserPrice] = useAppSelector(getUserPriceRange);
  const [minProductPrice, maxProductPrice] = useAppSelector(getProductsPriceRange);

  const minPriceRef = useRef<HTMLInputElement | null>(null);
  const maxPriceRef = useRef<HTMLInputElement | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const optimizedDispatch = useMemo(() => debounce(dispatch, CHANGE_DELAY), [dispatch]);
  const optimizedFilter = useMemo(() => debounce(setSearchParams, CHANGE_DELAY), [setSearchParams]);
  const optimizedPriceFilter = useMemo(() => debounce(setSearchParams, PRICE_CHANGE_DELAY), [setSearchParams]);
  const optimizedPriceDispatch = useMemo(() => debounce(dispatch, PRICE_CHANGE_DELAY), [dispatch]);

  const handleCheckboxChange = (evt: SyntheticEvent<HTMLInputElement>) => {
    const target = evt.currentTarget;

    if (target.dataset.filterParam && target.dataset.filterData) {
      const data = target.dataset.filterData;
      const parameter = target.dataset.filterParam;

      if (target.checked && !searchParams.getAll(parameter).includes(data)) {
        searchParams.append(parameter, data);
      } else {
        const selectedParams = [...searchParams.getAll(parameter)];
        searchParams.delete(parameter);
        selectedParams
          .filter((value) => value !== data)
          .forEach((value) => searchParams.append(parameter, value));
      }

      if (searchParams.has(NavigateParam.Page)) {
        searchParams.set(NavigateParam.Page, String(DEFAULT_PAGE));
      }

      optimizedFilter(searchParams);
      optimizedDispatch(fetchProductsAction(searchParams));
    }
  };

  const handlePriceInputChange = (evt: SyntheticEvent<HTMLInputElement>) => {
    const target = evt.currentTarget;
    const targetParam = target.dataset.filterParam;
    const initialPrice = targetParam === FilterParam.PriceFrom ? minUserPrice ?? '' : maxUserPrice ?? '';

    target.value = +target.value < 0 ? '0' : target.value;

    if (targetParam) {
      target.value
        ? searchParams.set(targetParam, target.value)
        : searchParams.delete(targetParam);
    }

    if (searchParams.has(NavigateParam.Page)) {
      searchParams.set(NavigateParam.Page, String(DEFAULT_PAGE));
    }

    if (target.value !== initialPrice && targetParam) {
      if (evt.type === EventType.Change) {
        optimizedPriceFilter(searchParams);
        optimizedPriceDispatch(fetchProductsAction(searchParams));
      } else {
        optimizedPriceDispatch.cancel();
        optimizedPriceFilter.cancel();
        setSearchParams(searchParams);
        dispatch(fetchProductsAction(searchParams));
      }
    } else {
      optimizedPriceDispatch.cancel();
      optimizedPriceFilter.cancel();
    }
  };

  const handleFilterReset = () => {
    if (Object.values(FilterParam).some((value) => searchParams.has(value))) {
      Object.values(FilterParam).forEach((value) => searchParams.delete(value));

      if (searchParams.has(NavigateParam.Page)) {
        searchParams.set(NavigateParam.Page, String(DEFAULT_PAGE));
      }

      setSearchParams(searchParams);
      dispatch(fetchProductsAction(searchParams));
    }
  };

  useEffect(() => {
    if (minPriceRef.current && maxPriceRef.current && !isDataLoading) {
      minUserPrice && searchParams.set(FilterParam.PriceFrom, minUserPrice);
      maxUserPrice && searchParams.set(FilterParam.PriceTo, maxUserPrice);

      minPriceRef.current.value = minUserPrice ?? '';
      maxPriceRef.current.value = maxUserPrice ?? '';
    }
  }, [
    minProductPrice,
    maxProductPrice,
    minUserPrice,
    maxUserPrice,
    searchParams,
    isDataLoading]);

  return (
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Цена, ₽</legend>
          <div className="catalog-filter__price-range">
            <div className="custom-input">
              <label>
                <input
                  type="number"
                  name="price"
                  placeholder={minProductPrice ?? 'от'}
                  data-filter-param={FilterParam.PriceFrom}
                  onChange={handlePriceInputChange}
                  onBlur={handlePriceInputChange}
                  onKeyDown={(evt) => {
                    if (evt.key === KeyName.Enter) {
                      handlePriceInputChange(evt);
                    }
                  }}
                  ref={minPriceRef}
                />
              </label>
            </div>
            <div className="custom-input">
              <label>
                <input
                  type="number"
                  name="priceUp"
                  placeholder={maxProductPrice ?? 'до'}
                  data-filter-param={FilterParam.PriceTo}
                  onChange={handlePriceInputChange}
                  onBlur={handlePriceInputChange}
                  onKeyDown={(evt) => {
                    if (evt.key === KeyName.Enter) {
                      handlePriceInputChange(evt);
                    }
                  }}
                  ref={maxPriceRef}
                />
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Категория</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="photocamera"
                onChange={handleCheckboxChange}
                data-filter-param={FilterParam.Category}
                data-filter-data={ProductCategory.Photo}
                defaultChecked={decodeURI(searchParams.toString()).includes(ProductCategory.Photo)}
              />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Фотокамера</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="videocamera"
                onChange={handleCheckboxChange}
                data-filter-param={FilterParam.Category}
                data-filter-data={ProductCategory.Video}
                defaultChecked={decodeURI(searchParams.toString()).includes(ProductCategory.Video)}
              />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Видеокамера</span>
            </label>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Тип камеры</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="digital"
                onChange={handleCheckboxChange}
                data-filter-param={FilterParam.Class}
                data-filter-data={ProductClass.Digital}
                defaultChecked={decodeURI(searchParams.toString()).includes(ProductClass.Digital)}
              />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Цифровая</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="film"
                onChange={handleCheckboxChange}
                data-filter-param={FilterParam.Class}
                data-filter-data={ProductClass.Film}
                defaultChecked={decodeURI(searchParams.toString()).includes(ProductClass.Film)}
                disabled={
                  decodeURI(searchParams.toString()).includes(ProductCategory.Video) &&
                  !decodeURI(searchParams.toString()).includes(ProductCategory.Photo)
                }
              />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Плёночная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="snapshot"
                onChange={handleCheckboxChange}
                data-filter-param={FilterParam.Class}
                data-filter-data={ProductClass.Instant}
                defaultChecked={decodeURI(searchParams.toString()).includes(ProductClass.Instant)}
                disabled={
                  decodeURI(searchParams.toString()).includes(ProductCategory.Video) &&
                  !decodeURI(searchParams.toString()).includes(ProductCategory.Photo)
                }
              />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Моментальная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="collection"
                onChange={handleCheckboxChange}
                data-filter-param={FilterParam.Class}
                data-filter-data={ProductClass.Collection}
                defaultChecked={decodeURI(searchParams.toString()).includes(ProductClass.Collection)}
              />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Коллекционная</span>
            </label>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Уровень</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="zero"
                onChange={handleCheckboxChange}
                data-filter-param={FilterParam.Level}
                data-filter-data={ProductLevel.Beginner}
                defaultChecked={decodeURI(searchParams.toString()).includes(ProductLevel.Beginner)}
              />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Нулевой</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="non-professional"
                onChange={handleCheckboxChange}
                data-filter-param={FilterParam.Level}
                data-filter-data={ProductLevel.Regular}
                defaultChecked={decodeURI(searchParams.toString()).includes(ProductLevel.Regular)}
              />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Любительский</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="professional"
                onChange={handleCheckboxChange}
                data-filter-param={FilterParam.Level}
                data-filter-data={ProductLevel.Professional}
                defaultChecked={decodeURI(searchParams.toString()).includes(ProductLevel.Professional)}
              />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Профессиональный</span>
            </label>
          </div>
        </fieldset>
        <button className="btn catalog-filter__reset-btn" type="reset" onClick={handleFilterReset}>
          Сбросить фильтры
        </button>
      </form>
    </div>
  );
}
