import { Product } from '../../types/product';
import ProductCard from '../product-card/product-card';

type CatalogCardsListProps = {
  products: Product[]
};

export default function CatalogCardsList({products}: CatalogCardsListProps): JSX.Element {
  if (!products.length) {
    return (
      <div style={{marginTop: '5%'}}>
        <h2>По вашему запросу ничего не найдено.</h2>
        <p>Попробуйте изменить параметры поиска.</p>
      </div>
    );
  }

  return (
    <div className="cards catalog__cards">
      {products.map((product) => <ProductCard key={product.id} product={product} />)}
    </div>
  );
}
