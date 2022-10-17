import { FormEvent, useRef, useState } from 'react';
import { ModalType, RequestStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getDiscountAction, postOrderAction } from '../../store/api-actions';
import { getCartProducts, getCoupon, getDiscount } from '../../store/cart-data/selectors';
import { ModalData } from '../../types/modal-data';
import { getFormatedPrice } from '../../utils/common';

type CartSummaryProps = {
  onSendOrderButtonClick: (data: ModalData, isOpen: boolean) => void;
}

export default function CartSummary({onSendOrderButtonClick}: CartSummaryProps): JSX.Element {
  const dispatch = useAppDispatch();
  const products = useAppSelector(getCartProducts);
  const discount = useAppSelector(getDiscount);
  const coupon = useAppSelector(getCoupon);
  const totalPrice = products
    .reduce((prev, {price, cartCount}) => prev + (price * Number(cartCount)), 0);
  const totalDiscount = Math.floor(totalPrice * (discount / 100));

  const couponInputRef = useRef<HTMLInputElement | null>(null);
  const [couponValidityClass, setCouponValidityClass] = useState('');

  const handleFormSubmit = async (evt: FormEvent) => {
    evt.preventDefault();
    if (couponInputRef.current?.value) {
      const {payload} = await dispatch(getDiscountAction(couponInputRef.current.value));
      setCouponValidityClass(payload ? 'is-valid' : 'is-invalid');
    }
  };

  const handleSendOrderButtonClick = async () => {
    const request = await dispatch(postOrderAction({
      camerasIds: products.map(({id}) => id),
      coupon
    }));

    onSendOrderButtonClick({
      product: null,
      type: request.meta.requestStatus === RequestStatus.Fulfilled
        ? ModalType.BuySuccess
        : ModalType.BuyError
    }, true);

    if (request.meta.requestStatus === RequestStatus.Fulfilled
        && couponInputRef.current) {
      setCouponValidityClass('');
      couponInputRef.current.value = '';
    }
  };

  return (
    <div className="basket__summary">
      <div className="basket__promo">
        <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
        <div className="basket-form">
          <form
            action="#"
            onSubmit={handleFormSubmit}
          >
            <div
              className={`custom-input ${couponValidityClass}`}
            >
              <label><span className="custom-input__label">Промокод</span>
                <input
                  type="text"
                  name="promo"
                  placeholder="Введите промокод"
                  defaultValue={coupon ? coupon : ''}
                  ref={couponInputRef}
                  onChange={(evt) => {
                    evt.target.value = evt.target.value.replace(/\s/g, '');
                  }}
                />
              </label>
              <p className="custom-input__error">Промокод неверный</p>
              <p className="custom-input__success">Промокод принят!</p>
            </div>
            <button
              className="btn"
              type="submit"
              disabled={!products.length}
            >
              Применить
            </button>
          </form>
        </div>
      </div>
      <div className="basket__summary-order">
        <p className="basket__summary-item">
          <span className="basket__summary-text">Всего:</span>
          <span className="basket__summary-value">
            {getFormatedPrice(totalPrice)} ₽
          </span>
        </p>
        <p className="basket__summary-item">
          <span className="basket__summary-text">Скидка:</span>
          <span className={`basket__summary-value ${totalDiscount ? 'basket__summary-value--bonus' : ''}`}>
            {getFormatedPrice(totalDiscount)} ₽
          </span>
        </p>
        <p className="basket__summary-item">
          <span className="basket__summary-text basket__summary-text--total">К оплате:</span>
          <span className="basket__summary-value basket__summary-value--total">
            {getFormatedPrice(totalPrice - totalDiscount)} ₽
          </span>
        </p>
        <button
          className="btn btn--purple"
          type="submit"
          disabled={!products.length}
          onClick={handleSendOrderButtonClick}
        >
          Оформить заказ
        </button>
      </div>
    </div>
  );
}
