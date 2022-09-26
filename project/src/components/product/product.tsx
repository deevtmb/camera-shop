import { useEffect, useState } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import { useParams } from 'react-router-dom';
import { DocumentTitle } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchProductInfoAction, fetchProductReviewsAction, fetchSimilarProductsAction } from '../../store/api-actions';
import { getProductInfo, getSimilarProducts } from '../../store/products-data/selectors';
import { getReviews } from '../../store/reviews-data/selectors';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import LoadingLayout from '../loading-layout/loading-layout';
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

  const checkProductId = () => Boolean(product && id && product.id === +id);

  useEffect(() => {
    document.title = DocumentTitle.Product;

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
          {product && checkProductId() ? <ProductInfo product={product}/> : <LoadingLayout />}
        </div>
        <div className="page-content__section">
          {(!!similarProducts.length && checkProductId()) && <ProductsSlider similarProducts={similarProducts} />}
        </div>
        <div className="page-content__section">
          <ProductReviewsList reviews={reviews} onReviewButtonClick={setIsModalOpen} />
        </div>
      </div>
      {(isModalOpen && id !== undefined) &&
        <RemoveScroll>
          <Modal onModalClose={setIsModalOpen} />
        </RemoveScroll>}
    </main>
  );
}
