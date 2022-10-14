import { useEffect, useState } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import { useParams } from 'react-router-dom';
import { DocumentTitle, ModalType, RequestStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchProductInfoAction, fetchProductReviewsAction, fetchSimilarProductsAction } from '../../store/api-actions';
import { getProductInfo, getSimilarProducts } from '../../store/products-data/selectors';
import { getReviews } from '../../store/reviews-data/selectors';
import { ModalData } from '../../types/modal-data';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import LoadingLayout from '../loading-layout/loading-layout';
import Modal from '../modal/modal';
import ProductInfo from '../product-info/product-info';
import ProductReviewsList from '../product-reviews-list/product-reviews-list';
import ProductsSlider from '../products-slider/products-slider';

type ProductProps = {
  onRequestStatusChange: (status: string) => void;
}

export default function Product({onRequestStatusChange}: ProductProps): JSX.Element {
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const product = useAppSelector(getProductInfo);
  const similarProducts = useAppSelector(getSimilarProducts);
  const reviews = useAppSelector(getReviews);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<ModalData>({product: product, type: ModalType.Form});

  const onModalOpenHandler = (data: ModalData, isOpen: boolean) => {
    setModalData(data);
    setIsModalOpen(isOpen);
  };

  const checkProductId = () => Boolean(product && id && product.id === +id);

  useEffect(() => {
    document.title = DocumentTitle.Product;
    onRequestStatusChange(RequestStatus.Fulfilled);

    const fetchData = async () => {
      if (id) {
        const response = await dispatch(fetchProductInfoAction(id));
        dispatch(fetchSimilarProductsAction(id));
        dispatch(fetchProductReviewsAction(id));

        onRequestStatusChange(response.meta.requestStatus);
      }
    };

    fetchData();
  }, [dispatch, id, onRequestStatusChange]);

  return (
    <main>
      <div className="page-content">
        {product && <Breadcrumbs productName={product.name}/>}
        <div className="page-content__section">
          {product && checkProductId()
            ? <ProductInfo product={product} onAddToCartButtonClick={onModalOpenHandler}/>
            : <LoadingLayout />}
        </div>
        <div className="page-content__section">
          {(!!similarProducts.length && checkProductId())
            && <ProductsSlider similarProducts={similarProducts} onBuyButtonClick={onModalOpenHandler} />}
        </div>
        <div className="page-content__section">
          <ProductReviewsList reviews={reviews} onReviewButtonClick={onModalOpenHandler} />
        </div>
      </div>
      {(isModalOpen && id) &&
        <RemoveScroll>
          <Modal onModalClose={setIsModalOpen} modalProduct={modalData.product} modalType={modalData.type} />
        </RemoveScroll>}
    </main>
  );
}
