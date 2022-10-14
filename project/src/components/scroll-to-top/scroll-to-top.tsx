import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === AppRoute.Catalog
      || pathname.startsWith(AppRoute.Product)
      || pathname === AppRoute.Cart) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
