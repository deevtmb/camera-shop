import FocusTrap from 'focus-trap-react';
import { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import ModalForm from '../modal-form/modal-form';
import ModalSuccess from '../modal-success/modal-success';

type ModalProps = {
  onModalClose: (arg: boolean) => void;
}

export default function Modal({onModalClose}: ModalProps): JSX.Element {
  const {id} = useParams();
  const [isSuccessPost, setIsSuccessPost] = useState(false);

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

  return (
    <FocusTrap>
      <div className="modal is-active">
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={() => onModalClose(false)}></div>
          {(id !== undefined && !isSuccessPost) && <ModalForm onModalClose={onModalClose} onSuccessSubmit={() => setIsSuccessPost(true)} productId={+id} />}
          {isSuccessPost && <ModalSuccess onModalClose={onModalClose} />}
        </div>
      </div>
    </FocusTrap>
  );
}
