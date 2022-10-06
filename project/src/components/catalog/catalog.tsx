import { SyntheticEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DocumentTitle, SortParam, SortType } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchProductsAction } from '../../store/api-actions';
import { getLoadingStatus, getProducts, getPromoProduct } from '../../store/products-data/selectors';
import Banner from '../banner/banner';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import CatalogCardsList from '../catalog-cards-list/catalog-cards-list';
import CatalogFilter from '../catalog-filter/catalog-filter';
import CatalogSort from '../catalog-sort/catalog-sort';
import LoadingLayout from '../loading-layout/loading-layout';
import Pagination from '../pagination/pagination';

export default function Catalog(): JSX.Element {
  const PRODUCTS_PER_VIEW = 9;
  const DEFAULT_PAGE = 1;
  const pageParam = 'page';

  const dispatch = useAppDispatch();
  const products = useAppSelector(getProducts);
  const promoProduct = useAppSelector(getPromoProduct);
  const isDataLoading = useAppSelector(getLoadingStatus);

  const productPrices = products.map(({price}) => price);
  const pagesCount = Math.ceil(products.length / PRODUCTS_PER_VIEW);

  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
  const [searchParams, setSearchParams] = useSearchParams();

  const onSortChange = (evt: SyntheticEvent<HTMLInputElement>) => {
    const target = evt.currentTarget;
    if (target.dataset.sortParam && target.dataset.sortType) {
      searchParams.set(target.dataset.sortParam, target.dataset.sortType);

      if (searchParams.toString().includes(SortParam.Order) &&
        !searchParams.toString().includes(SortParam.Sort)) {
        searchParams.set(SortParam.Sort, SortType.Price);
      }

      if (products.length) {
        setSearchParams(searchParams);
      }
    }
  };

  useEffect(() => {
    document.title = DocumentTitle.Catalog;
  }, []);

  useEffect(() => {
    const page = searchParams.get(pageParam);
    if (page) {
      setCurrentPage(+page);
    }
    dispatch(fetchProductsAction(searchParams.toString()));
  }, [dispatch, searchParams]);

  return (
    <main>
      {promoProduct && <Banner promoProduct={promoProduct}/>}
      <div className="page-content">
        <Breadcrumbs />
        <section className="catalog">
          <div className="container">
            <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
            <div className="page-content__columns">
              <div className="catalog__aside">
                <CatalogFilter productPrices={productPrices} />
              </div>
              <div className="catalog__content">
                <CatalogSort onSortChange={onSortChange} searchParams={searchParams.toString() }/>
                {isDataLoading ?
                  <LoadingLayout /> :
                  <CatalogCardsList products={products
                    .slice(PRODUCTS_PER_VIEW * currentPage - PRODUCTS_PER_VIEW, PRODUCTS_PER_VIEW * currentPage)}
                  />}
                {!!products.length &&
                  <Pagination
                    pagesCount={pagesCount}
                    currentPage={currentPage}
                    onPageLinkClick={(page: number) => setCurrentPage(page)}
                  />}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
