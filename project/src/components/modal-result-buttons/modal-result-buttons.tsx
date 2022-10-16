import { Link } from 'react-router-dom';
import { AppRoute, ModalType } from '../../const';

type ModalResultButtonsProps = {
  onModalClose: (arg: boolean) => void;
  modalType: string;
}

export default function ModalResultButtons({modalType, onModalClose}: ModalResultButtonsProps): JSX.Element {
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
    <>
      {renderModalButtons(modalType)}
    </>
  );
}
