import { Product } from '../../types/product';
import CatalogCard from '../catalog-card/catalog-card';

type CatalogCardsListProps = {
  products: Product[]
};

export default function CatalogCardsList({products}: CatalogCardsListProps): JSX.Element {
  return (
    <div className="cards catalog__cards">
      {products.map((product) => <CatalogCard key={product.id} product={product} />)}
    </div>
  );
}
