/* eslint-disable prefer-const */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { KeyboardEvent, SyntheticEvent, useEffect, useState } from 'react';
import { FilterParam, KeyName, ProductCategory, ProductClass, ProductLevel } from '../../const';

type CatalogFilterProps = {
  onFilterChange: (evt: SyntheticEvent<HTMLInputElement>) => void;
  onFilterReset: () => void;
  searchParams: string;
  productPrices: number[];
}

export default function CatalogFilter(
  {onFilterChange, searchParams, onFilterReset, productPrices}: CatalogFilterProps
): JSX.Element {
  const [minPrice, maxPrice] = [Math.min(...productPrices), Math.max(...productPrices)];
  const [price, setPrice] = useState({min: productPrices.length ? minPrice : '', max: productPrices.length ? maxPrice : ''});
  // const [price, setPrice] = useState({min: Math.min(...productPrices), max: Math.max(...productPrices)});

  const handlePriceEnterKeydown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === KeyName.Enter) {
      onFilterChange(evt);
      evt.currentTarget.blur();
    }
  };

  useEffect(() => {
    setPrice({min: Math.min(...productPrices), max: Math.max(...productPrices)});
    // setPrice({min: minPrice, max: maxPrice});
  }, [minPrice, maxPrice, productPrices]);

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
                  onChange={(evt) => setPrice({...price, min: +evt.target.value})}
                  onBlur={onFilterChange}
                  onKeyDown={handlePriceEnterKeydown}
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
                  data-filter-data={price.max}
                  onChange={(evt) => setPrice({...price, max: +evt.target.value})}
                  onBlur={onFilterChange}
                  onKeyDown={handlePriceEnterKeydown}
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
                onChange={onFilterChange}
                data-filter-param={FilterParam.Category}
                data-filter-data={ProductCategory.Photo}
                checked={decodeURI(searchParams).includes(ProductCategory.Photo)}
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
                onChange={onFilterChange}
                data-filter-param={FilterParam.Category}
                data-filter-data={ProductCategory.Video}
                checked={decodeURI(searchParams).includes(ProductCategory.Video)}
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
                onChange={onFilterChange}
                data-filter-param={FilterParam.Class}
                data-filter-data={ProductClass.Digital}
                checked={decodeURI(searchParams).includes(ProductClass.Digital)}
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
                onChange={onFilterChange}
                data-filter-param={FilterParam.Class}
                data-filter-data={ProductClass.Film}
                disabled={decodeURI(searchParams).includes(ProductCategory.Video) &&
                  !decodeURI(searchParams).includes(ProductCategory.Photo)}
                checked={decodeURI(searchParams).includes(ProductClass.Film)}
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
                onChange={onFilterChange}
                data-filter-param={FilterParam.Class}
                data-filter-data={ProductClass.Instant}
                checked={decodeURI(searchParams).includes(ProductClass.Instant)}
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
                onChange={onFilterChange}
                data-filter-param={FilterParam.Class}
                data-filter-data={ProductClass.Collection}
                disabled={decodeURI(searchParams).includes(ProductCategory.Video) &&
                  !decodeURI(searchParams).includes(ProductCategory.Photo)}
                checked={decodeURI(searchParams).includes(ProductClass.Collection)}
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
                onChange={onFilterChange}
                data-filter-param={FilterParam.Level}
                data-filter-data={ProductLevel.Beginner}
                checked={decodeURI(searchParams).includes(ProductLevel.Beginner)}
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
                onChange={onFilterChange}
                data-filter-param={FilterParam.Level}
                data-filter-data={ProductLevel.Regular}
                checked={decodeURI(searchParams).includes(ProductLevel.Regular)}
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
                onChange={onFilterChange}
                data-filter-param={FilterParam.Level}
                data-filter-data={ProductLevel.Professional}
                checked={decodeURI(searchParams).includes(ProductLevel.Professional)}
              />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Профессиональный</span>
            </label>
          </div>
        </fieldset>
        <button
          className="btn catalog-filter__reset-btn"
          type="reset"
          onClick={onFilterReset}
        >Сбросить фильтры
        </button>
      </form>
    </div>
  );
}
