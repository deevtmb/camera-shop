import { useAppSelector } from '../../hooks/hooks';
import { getProducts } from '../../store/products-data/selectors';
import Banner from '../banner/banner';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import CatalogCardsList from '../catalog-cards-list/catalog-cards-list';
import CatalogFilter from '../catalog-filter/catalog-filter';
import CatalogSort from '../catalog-sort/catalog-sort';
import Pagination from '../pagination/pagination';

export default function Catalog(): JSX.Element {
  const products = useAppSelector(getProducts);

  return (
    <main>
      <Banner />
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
                <CatalogCardsList products={products} />
                <Pagination/>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
