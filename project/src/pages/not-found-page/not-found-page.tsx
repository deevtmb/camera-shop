import { Link } from 'react-router-dom';
import Banner from '../../components/banner/banner';
import MainLayout from '../../components/main-layout/main-layout';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks/hooks';
import { getPromoProduct } from '../../store/products-data/selectors';

export default function NotFoundPage(): JSX.Element {
  const promoProduct = useAppSelector(getPromoProduct);

  return (
    <MainLayout>
      <main>
        {promoProduct && <Banner promoProduct={promoProduct}/>}
        <div className='page-content'>
          <div className='container'>
            <div className='info-wrapper'>
              <p className='big-text'>404</p>
              <p>Страница не найдена :(</p>
              <Link to={AppRoute.Main}>
                Вернуться на Главную страницу
              </Link>
            </div>
          </div>
        </div>
      </main>
    </MainLayout>
  );

}
