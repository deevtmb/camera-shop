import { Product } from '../../types/product';
import ProductCard from '../product-card/product-card';

type CatalogCardsListProps = {
  products: Product[]
};

export default function CatalogCardsList({products}: CatalogCardsListProps): JSX.Element {
  return (
    <div className="cards catalog__cards">
      {products.map((product) => <ProductCard key={product.id} product={product} />)}
    </div>
  );
}
