import { FocusEvent, KeyboardEvent, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterParam, KeyName, ProductCategory, ProductClass, ProductLevel } from '../../const';
import { useAppSelector } from '../../hooks/hooks';
import { getLoadingStatus } from '../../store/products-data/selectors';

type CatalogFilterProps = {
  productPrices: number[];
};

export default function CatalogFilter({productPrices}: CatalogFilterProps): JSX.Element {
  const DEFAULT_PAGE = 1;
  const pageParam = 'page';
  const numberInput = 'number';
  const isDataLoading = useAppSelector(getLoadingStatus);

  const minPriceRef = useRef<HTMLInputElement | null>(null);
  const maxPriceRef = useRef<HTMLInputElement | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterChanged, setIsFilterChanged] = useState(false);

  const [price, setPrice] = useState({
    min: productPrices.length ? Math.min(...productPrices) : '',
    max: productPrices.length ? Math.max(...productPrices) : '',
  });

  const handleFilterChange = (evt: SyntheticEvent<HTMLInputElement>) => {
    const target = evt.currentTarget;

    if (target.dataset.filterParam && target.dataset.filterData) {
      const data = target.dataset.filterData;
      const parameter = target.dataset.filterParam;

      if (target.checked && !searchParams.getAll(parameter).includes(data)) {
        searchParams.append(parameter, data);
      } else if (target.type !== numberInput) {
        const selectedParams = [...searchParams.getAll(parameter)];
        searchParams.delete(parameter);
        selectedParams.filter((value) => value !== data).forEach((value) => searchParams.append(parameter, value));
      }

      if (minPriceRef.current?.dataset.filterData && maxPriceRef.current?.dataset.filterData) {
        searchParams.set(FilterParam.PriceFrom, minPriceRef.current.dataset.filterData);
        searchParams.set(
          FilterParam.PriceTo,
          String(Math.max(+minPriceRef.current.dataset.filterData, +maxPriceRef.current.dataset.filterData))
        );
      }

      if (searchParams.has(pageParam)) {
        searchParams.set(pageParam, String(DEFAULT_PAGE));
      }
      setIsFilterChanged(true);
      setSearchParams(searchParams);
    }
  };

  const resetFilter = () => {
    if (isFilterChanged) {
      Object.values(FilterParam).forEach((value) => searchParams.delete(value));
      if (searchParams.has(pageParam)) {
        searchParams.set(pageParam, String(DEFAULT_PAGE));
      }
      setIsFilterChanged(false);
      setSearchParams(searchParams);
    }
  };

  const handlePriceEnterKeydown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (
      evt.key === KeyName.Enter &&
      (searchParams.get(FilterParam.PriceFrom) !== String(price.min) ||
        searchParams.get(FilterParam.PriceTo) !== String(price.max))
    ) {
      handleFilterChange(evt);
      evt.currentTarget.blur();
    }
  };

  const handlePriceInputBlur = (evt: FocusEvent<HTMLInputElement>) => {
    if (
      searchParams.get(FilterParam.PriceFrom) !== String(price.min) ||
      searchParams.get(FilterParam.PriceTo) !== String(price.max)
    ) {
      handleFilterChange(evt);
    }
  };

  useEffect(() => {
    const priceGte = searchParams.get(FilterParam.PriceFrom);
    const priceLte = searchParams.get(FilterParam.PriceTo);

    if (minPriceRef.current && maxPriceRef.current && !productPrices.length) {
      setPrice({
        min: priceGte ? priceGte : minPriceRef.current.value,
        max:
          priceLte && priceGte
            ? Math.max(+priceGte, +priceLte)
            : Math.max(+minPriceRef.current.value, +maxPriceRef.current.value),
      });
    } else if (productPrices.length) {
      setPrice({
        min: isDataLoading && priceGte ? priceGte : Math.min(...productPrices),
        max: isDataLoading && priceLte ? priceLte : Math.max(...productPrices),
      });
    }

    if (minPriceRef.current && maxPriceRef.current && productPrices.length) {
      searchParams.set(FilterParam.PriceFrom, minPriceRef.current.value);
      searchParams.set(FilterParam.PriceTo, maxPriceRef.current.value);
    }

    if (Object.values(FilterParam).some((value) => searchParams.has(value))) {
      setIsFilterChanged(true);
    }
  }, [searchParams, isDataLoading, productPrices]);

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
                  placeholder="от"
                  value={price.min}
                  data-filter-param={FilterParam.PriceFrom}
                  data-filter-data={price.min}
                  onChange={(evt) => setPrice({ ...price, min: +evt.target.value >= 0 ? +evt.target.value : 0 })}
                  onBlur={handlePriceInputBlur}
                  onKeyDown={handlePriceEnterKeydown}
                  ref={minPriceRef}
                />
              </label>
            </div>
            <div className="custom-input">
              <label>
                <input
                  type="number"
                  name="priceUp"
                  placeholder="до"
                  value={price.max}
                  data-filter-param={FilterParam.PriceTo}
                  data-filter-data={+price.max > +price.min ? price.max : price.min}
                  onChange={(evt) => setPrice({ ...price, max: +evt.target.value >= 0 ? +evt.target.value : 0 })}
                  onBlur={handlePriceInputBlur}
                  onKeyDown={handlePriceEnterKeydown}
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
                onChange={handleFilterChange}
                data-filter-param={FilterParam.Category}
                data-filter-data={ProductCategory.Photo}
                checked={decodeURI(searchParams.toString()).includes(ProductCategory.Photo)}
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
                onChange={handleFilterChange}
                data-filter-param={FilterParam.Category}
                data-filter-data={ProductCategory.Video}
                checked={decodeURI(searchParams.toString()).includes(ProductCategory.Video)}
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
                onChange={handleFilterChange}
                data-filter-param={FilterParam.Class}
                data-filter-data={ProductClass.Digital}
                checked={decodeURI(searchParams.toString()).includes(ProductClass.Digital)}
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
                onChange={handleFilterChange}
                data-filter-param={FilterParam.Class}
                data-filter-data={ProductClass.Film}
                checked={decodeURI(searchParams.toString()).includes(ProductClass.Film)}
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
                onChange={handleFilterChange}
                data-filter-param={FilterParam.Class}
                data-filter-data={ProductClass.Instant}
                checked={decodeURI(searchParams.toString()).includes(ProductClass.Instant)}
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
                onChange={handleFilterChange}
                data-filter-param={FilterParam.Class}
                data-filter-data={ProductClass.Collection}
                checked={decodeURI(searchParams.toString()).includes(ProductClass.Collection)}
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
                onChange={handleFilterChange}
                data-filter-param={FilterParam.Level}
                data-filter-data={ProductLevel.Beginner}
                checked={decodeURI(searchParams.toString()).includes(ProductLevel.Beginner)}
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
                onChange={handleFilterChange}
                data-filter-param={FilterParam.Level}
                data-filter-data={ProductLevel.Regular}
                checked={decodeURI(searchParams.toString()).includes(ProductLevel.Regular)}
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
                onChange={handleFilterChange}
                data-filter-param={FilterParam.Level}
                data-filter-data={ProductLevel.Professional}
                checked={decodeURI(searchParams.toString()).includes(ProductLevel.Professional)}
              />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Профессиональный</span>
            </label>
          </div>
        </fieldset>
        <button className="btn catalog-filter__reset-btn" type="reset" onClick={resetFilter}>
          Сбросить фильтры
        </button>
      </form>
    </div>
  );
}
