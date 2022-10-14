import FocusTrap from 'focus-trap-react';
import { useEffect, useState} from 'react';
import { ModalType } from '../../const';
import { Product } from '../../types/product';
import ModalCartChange from '../modal-cart-change/modal-cart-change';
import ModalForm from '../modal-form/modal-form';
import ModalSuccess from '../modal-success/modal-success';

type ModalProps = {
  modalProduct: Product | null;
  modalType: string;
  onModalClose: (arg: boolean) => void;
}

export default function Modal({onModalClose, modalProduct, modalType}: ModalProps): JSX.Element {
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const handleEscKeydown = (evt: KeyboardEvent): void => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        onModalClose(false);
      }
    };

    document.addEventListener('keydown', handleEscKeydown);

    return () => document.removeEventListener('keydown', handleEscKeydown);
  }, [onModalClose]);

  const renderModalContent = (type: string): JSX.Element | undefined => {
    if (modalProduct) {
      switch (type) {
        case ModalType.Form:
          return (
            <ModalForm
              onModalClose={onModalClose}
              onSuccessSubmit={() => setIsSuccess(true)}
            />
          );
        default:
          return (
            <ModalCartChange
              onModalClose={onModalClose}
              onSuccessProductAdd={() => setIsSuccess(true)}
              product={modalProduct}
              type={modalType}
            />
          );
      }
    }
  };

  return (
    <FocusTrap focusTrapOptions={{initialFocus: false}}>
      <div className={`modal is-active ${isSuccess ? 'modal--narrow' : ''}`}>
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={() => onModalClose(false)}></div>
          {!isSuccess
            ? renderModalContent(modalType)
            : <ModalSuccess onModalClose={onModalClose} modalType={modalType}/>}
        </div>
      </div>
    </FocusTrap>
  );
}
