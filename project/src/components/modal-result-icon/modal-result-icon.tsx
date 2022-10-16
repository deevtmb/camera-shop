import { ModalType } from '../../const';

type ModalResultIconProps = {
  modalType: string;
}

export default function ModalResultIcon({modalType}: ModalResultIconProps): JSX.Element {
  const renderResultIcon = (type: string) => {
    switch (type) {
      case ModalType.Add:
        return (
          <svg className="modal__icon" width="80" height="78" aria-hidden="true" data-testid="icon-success">
            <use xlinkHref="#icon-success"></use>
          </svg>
        );
      case ModalType.BuyError:
        return (
          <svg className="modal__icon" width="60" height="60" aria-hidden="true" fill="#ed6041" data-testid="icon-error">
            <use xlinkHref="#icon-error"></use>
          </svg>
        );
      default:
        return (
          <svg className="modal__icon" width="86" height="80" aria-hidden="true" data-testid="icon-review-success">
            <use xlinkHref="#icon-review-success"></use>
          </svg>
        );
    }
  };

  return (
    <>
      {renderResultIcon(modalType)}
    </>
  );
}
