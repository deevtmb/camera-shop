import { useState } from 'react';
import { useAppSelector } from '../../hooks/hooks';
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

  const products = useAppSelector(getProducts);
  const promoProduct = useAppSelector(getPromoProduct);
  const isDataLoading = useAppSelector(getLoadingStatus);

  const pagesCount = Math.ceil(products.length / PRODUCTS_PER_VIEW);

  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);

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
                <CatalogFilter />
              </div>
              <div className="catalog__content">
                <CatalogSort />
                {isDataLoading ?
                  <LoadingLayout /> :
                  <CatalogCardsList products={products.slice(PRODUCTS_PER_VIEW * currentPage - PRODUCTS_PER_VIEW, PRODUCTS_PER_VIEW * currentPage)} />}
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
