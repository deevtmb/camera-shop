import { ModalData } from '../../types/modal-data';
import { Product } from '../../types/product';
import ProductCard from '../product-card/product-card';

type CatalogCardsListProps = {
  products: Product[];
  onBuyButtonClick: (data: ModalData, isOpen: boolean) => void;
};

export default function CatalogCardsList({products, onBuyButtonClick}: CatalogCardsListProps): JSX.Element {
  if (!products.length) {
    return (
      <div className="catalog__empty">
        <h2>По вашему запросу ничего не найдено.</h2>
        <p>Попробуйте изменить параметры поиска.</p>
      </div>
    );
  }

  return (
    <div className="cards catalog__cards">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onBuyButtonClick={onBuyButtonClick} />))}
    </div>
  );
}
