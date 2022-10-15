import { Link } from 'react-router-dom';
import { AppRoute, ModalSuccessTitleMap, ModalType } from '../../const';

type ModalResultProps = {
  onModalClose: (arg: boolean) => void;
  modalType: string;
}

export default function ModalResult({onModalClose, modalType}: ModalResultProps): JSX.Element {
  const renderResultIcon = (type: string) => {
    switch (type) {
      case ModalType.Add:
        return (
          <svg className="modal__icon" width="80" height="78" aria-hidden="true">
            <use xlinkHref="#icon-success"></use>
          </svg>
        );
      case ModalType.BuyError:
        return (
          <svg className="modal__icon" width="60" height="60" aria-hidden="true" fill="#ed6041">
            <use xlinkHref="#icon-error"></use>
          </svg>
        );
      default:
        return (
          <svg className="modal__icon" width="86" height="80" aria-hidden="true">
            <use xlinkHref="#icon-review-success"></use>
          </svg>
        );
    }
  };

  const renderModalButtons = (type: string) => {
    switch (type) {
      case ModalType.Add:
        return (
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
          </>
        );

      case ModalType.BuyError:
        return (
          <button
            className="btn btn--purple modal__btn modal__btn--fit-width"
            type="button"
            onClick={() => onModalClose(false)}
          >Попробовать снова
          </button>
        );

      case ModalType.BuySuccess:
        return (
          <Link
            className="btn btn--purple modal__btn modal__btn--fit-width"
            onClick={() => onModalClose(false)}
            to={AppRoute.Catalog}
          >Вернуться к покупкам
          </Link>
        );

      default:
        return (
          <button
            className="btn btn--purple modal__btn modal__btn--fit-width"
            type="button"
            onClick={() => onModalClose(false)}
          >Вернуться к покупкам
          </button>
        );
    }
  };

  return (
    <div className="modal__content">
      <p className="title title--h4">{ModalSuccessTitleMap[modalType]}</p>
      {renderResultIcon(modalType)}
      <div className="modal__buttons">
        {renderModalButtons(modalType)}
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
