import { useEffect, useState } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchProductInfoAction, fetchProductReviewsAction, fetchSimilarProductsAction } from '../../store/api-actions';
import { getProductInfo, getSimilarProducts } from '../../store/products-data/selectors';
import { getReviews } from '../../store/reviews-data/selectors';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import Modal from '../modal/modal';
import ProductInfo from '../product-info/product-info';
import ProductReviewsList from '../product-reviews-list/product-reviews-list';
import ProductsSlider from '../products-slider/products-slider';

export default function Product(): JSX.Element {
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const product = useAppSelector(getProductInfo);
  const similarProducts = useAppSelector(getSimilarProducts);
  const reviews = useAppSelector(getReviews);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductInfoAction(id));
      dispatch(fetchSimilarProductsAction(id));
      dispatch(fetchProductReviewsAction(id));
    }
  }, [dispatch, id]);

  return (
    <main>
      <div className="page-content">
        <Breadcrumbs productName={product ? product.name : null}/>
        <div className="page-content__section">
          {product && <ProductInfo product={product}/>}
        </div>
        <div className="page-content__section">
          <ProductsSlider similarProducts={similarProducts} />
        </div>
        <div className="page-content__section">
          <ProductReviewsList reviews={reviews} onReviewButtonClick={setIsModalOpen} />
        </div>
      </div>
      {isModalOpen &&
        <RemoveScroll>
          <Modal onModalClose={setIsModalOpen}/>
        </RemoveScroll>}
    </main>
  );
}
