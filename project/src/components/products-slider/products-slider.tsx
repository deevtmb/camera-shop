import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductSlider } from '../../const';
import { ModalData } from '../../types/modal-data';
import { Product } from '../../types/product';
import ProductCard from '../product-card/product-card';

type ProductsSliderProps = {
  similarProducts: Product[]
  onBuyButtonClick: (data: ModalData, isOpen: boolean) => void;
};

export default function ProductsSlider({similarProducts, onBuyButtonClick}: ProductsSliderProps): JSX.Element {
  const {id} = useParams();

  const [currentFirstSlide, setCurrentFirstSlide] = useState<number>(ProductSlider.FirstSlideId);
  const [currentProductId, setCurrentProductId] = useState(id);

  useEffect(() => {
    if (id !== currentProductId) {
      setCurrentFirstSlide(ProductSlider.FirstSlideId);
      setCurrentProductId(id);
    }
  }, [id, currentProductId]);

  return (
    <section className="product-similar">
      <div className="container">
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <div className="product-similar__slider-list">
            {similarProducts.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                isActive={i >= currentFirstSlide && i < ProductSlider.SlidesPerView + currentFirstSlide}
                onBuyButtonClick={onBuyButtonClick}
              />))}
          </div>
          <button
            className={`${true && 'slider-controls'} slider-controls--prev`}
            type="button"
            aria-label="Предыдущий слайд"
            disabled={currentFirstSlide === ProductSlider.FirstSlideId}
            onClick={() => setCurrentFirstSlide(currentFirstSlide - ProductSlider.SlidesStep)}
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
          <button
            className={`${true && 'slider-controls'} slider-controls--next`}
            type="button"
            aria-label="Следующий слайд"
            disabled={similarProducts.length - ProductSlider.SlidesPerView === currentFirstSlide}
            onClick={() => setCurrentFirstSlide(currentFirstSlide + ProductSlider.SlidesStep)}
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
