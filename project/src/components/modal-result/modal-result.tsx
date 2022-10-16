import { ModalSuccessTitleMap } from '../../const';
import ModalResultButtons from '../modal-result-buttons/modal-result-buttons';
import ModalResultIcon from '../modal-result-icon/modal-result-icon';

type ModalResultProps = {
  onModalClose: (arg: boolean) => void;
  modalType: string;
}

export default function ModalResult({onModalClose, modalType}: ModalResultProps): JSX.Element {
  return (
    <div className="modal__content">
      <p className="title title--h4">{ModalSuccessTitleMap[modalType]}</p>
      <ModalResultIcon modalType={modalType} />
      <div className="modal__buttons">
        <ModalResultButtons modalType={modalType} onModalClose={onModalClose} />
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
