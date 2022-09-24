import { useParams } from 'react-router-dom';
import MainLayout from '../../components/main-layout/main-layout';
import Product from '../../components/product/product';
import ScrollToTop from '../../components/scroll-to-top/scroll-to-top';
import UpButton from '../../components/up-button/up-button';
import { useAppSelector } from '../../hooks/hooks';
import { getProducts } from '../../store/products-data/selectors';
import NotFoundPage from '../not-found-page/not-found-page';

export default function ProductPage(): JSX.Element {
  const {id} = useParams();
  const prodcts = useAppSelector(getProducts);

  if (!id || !Number(id) || !prodcts.find((product) => product.id === +id)) {
    return (
      <NotFoundPage />
    );
  }

  return (
    <>
      <ScrollToTop />
      <MainLayout>
        <>
          <Product />
          <UpButton />
        </>
      </MainLayout>
    </>
  );
}
