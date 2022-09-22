import { Navigate, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import CatalogPage from '../../pages/catalog-page/catalog-page';
import ProductPage from '../../pages/product-page/product-page';

export default function App(): JSX.Element {
  return (
    <Routes>
      <Route path={AppRoute.Main} element={<Navigate to={AppRoute.Catalog} replace />} />
      <Route path={AppRoute.Catalog} element={<CatalogPage />} />
      <Route path={AppRoute.CatalogPage} element={<CatalogPage />} />
      <Route path={AppRoute.ProductInfo} element={<ProductPage />} />
      <Route path={`${AppRoute.ProductInfo}${AppRoute.ProductTab}`} element={<ProductPage />} />
    </Routes>
  );
}
