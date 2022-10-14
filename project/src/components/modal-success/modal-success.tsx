import { Link } from 'react-router-dom';
import { AppRoute, ModalSuccessTitleMap, ModalType } from '../../const';

type ModalSuccessProps = {
  onModalClose: (arg: boolean) => void;
  modalType: string;
}

export default function ModalSuccess({onModalClose, modalType}: ModalSuccessProps): JSX.Element {

  return (
    <div className="modal__content">
      <p className="title title--h4">{ModalSuccessTitleMap[modalType]}</p>
      {ModalType.Add === modalType ?
        <svg className="modal__icon" width="80" height="78" aria-hidden="true">
          <use xlinkHref="#icon-review-success"></use>
        </svg> :
        <svg className="modal__icon" width="86" height="80" aria-hidden="true">
          <use xlinkHref="#icon-success"></use>
        </svg>}
      <div className="modal__buttons">
        {ModalType.Add === modalType ?
          <>
            <Link
              className="btn btn--transparent modal__btn"
              onClick={() => onModalClose(false)}
              to={AppRoute.Catalog}
            >Продолжить покупки
            </Link>
            <Link
              className="btn btn--purple modal__btn modal__btn--fit-width"
              to={AppRoute.Cart}
            >Перейти в корзину
            </Link>
          </> :
          <button
            className="btn btn--purple modal__btn modal__btn--fit-width"
            type="button"
            onClick={() => onModalClose(false)}
          >Вернуться к покупкам
          </button>}
      </div>
      <button
        className="cross-btn"
        type="button"
        aria-label="Закрыть попап"
        onClick={() => onModalClose(false)}
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </div>
  );
}
