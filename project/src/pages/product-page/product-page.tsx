import MainLayout from '../../components/main-layout/main-layout';
import Product from '../../components/product/product';
import ScrollToTop from '../../components/scroll-to-top/scroll-to-top';
import UpButton from '../../components/up-button/up-button';

export default function ProductPage(): JSX.Element {
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
