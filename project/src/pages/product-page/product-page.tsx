import { useState } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '../../components/main-layout/main-layout';
import Product from '../../components/product/product';
import UpButton from '../../components/up-button/up-button';
import { RequestStatus } from '../../const';
import NotFoundPage from '../not-found-page/not-found-page';

export default function ProductPage(): JSX.Element {
  const {id} = useParams();
  const [productInfoRequestStatus, setProductInfoRequestStatus] = useState<string>(RequestStatus.Fulfilled);

  if (!id || !Number(id) || productInfoRequestStatus === RequestStatus.Rejected) {
    return (
      <NotFoundPage />
    );
  }

  return (
    <MainLayout>
      <>
        <Product onRequestStatusChange={(status: string) => setProductInfoRequestStatus(status)}/>
        <UpButton />
      </>
    </MainLayout>
  );
}
