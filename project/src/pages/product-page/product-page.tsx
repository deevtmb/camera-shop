import MainLayout from '../../components/main-layout/main-layout';
import Product from '../../components/product/product';
import ScrollToTop from '../../components/scroll-to-top/scroll-to-top';

export default function ProductPage(): JSX.Element {
  return (
    <>
      <ScrollToTop />
      <MainLayout>
        <Product />
      </MainLayout>
    </>
  );
}
