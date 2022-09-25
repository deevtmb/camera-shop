import { useParams } from 'react-router-dom';
import MainLayout from '../../components/main-layout/main-layout';
import Product from '../../components/product/product';
import ScrollToTop from '../../components/scroll-to-top/scroll-to-top';
import UpButton from '../../components/up-button/up-button';
import NotFoundPage from '../not-found-page/not-found-page';

export default function ProductPage(): JSX.Element {
  const {id} = useParams();

  if (!id || !Number(id)) {
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
