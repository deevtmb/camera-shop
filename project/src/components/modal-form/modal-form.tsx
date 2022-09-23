import { SyntheticEvent, useState } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { fetchProductReviewsAction, postReviewAction } from '../../store/api-actions';

type ModalFormProps = {
  onModalClose: (arg: boolean) => void;
  onSuccessSubmit: () => void;
  productId: number;
}

export default function ModalForm({onModalClose, onSuccessSubmit, productId}: ModalFormProps): JSX.Element {
  const SUCCESS_SUBMIT_STATUS = 'fulfilled';
  const dispatch = useAppDispatch();

  const [reviewPost, setReviewPost] = useState({
    cameraId: productId,
    userName: '',
    advantage: '',
    disadvantage: '',
    review: '',
    rating: 0,
  });

  const [isFormChecked, setIsFormChecked] = useState(false);

  const handleFormSubmit = async (evt: SyntheticEvent) => {
    evt.preventDefault();
    setIsFormChecked(true);

    if (Object.values(reviewPost).every((value) => Boolean(value))) {
      const response = await dispatch(postReviewAction(reviewPost));
      if (response.meta.requestStatus === SUCCESS_SUBMIT_STATUS) {
        dispatch(fetchProductReviewsAction(String(productId)));
        onSuccessSubmit();
      }
    }
  };

  return (
    <div className="modal__content">
      <p className="title title--h4">Оставить отзыв</p>
      <div className="form-review">
        <form method="post" onSubmit={handleFormSubmit}>
          <div className="form-review__rate">
            <fieldset className={`rate form-review__item ${(!reviewPost.rating && isFormChecked) ? 'is-invalid' : ''}`}>
              <legend className="rate__caption">Рейтинг
                <svg width="9" height="9" aria-hidden="true">
                  <use xlinkHref="#icon-snowflake"></use>
                </svg>
              </legend>
              <div className="rate__bar">
                <div className="rate__group">
                  <input className="visually-hidden" id="star-5" name="rate" type="radio" value="5" onChange={(evt) => setReviewPost({...reviewPost, rating: +evt.currentTarget.value})} />
                  <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
                  <input className="visually-hidden" id="star-4" name="rate" type="radio" value="4" onChange={(evt) => setReviewPost({...reviewPost, rating: +evt.currentTarget.value})} />
                  <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
                  <input className="visually-hidden" id="star-3" name="rate" type="radio" value="3" onChange={(evt) => setReviewPost({...reviewPost, rating: +evt.currentTarget.value})} />
                  <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
                  <input className="visually-hidden" id="star-2" name="rate" type="radio" value="2" onChange={(evt) => setReviewPost({...reviewPost, rating: +evt.currentTarget.value})} />
                  <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
                  <input className="visually-hidden" id="star-1" name="rate" type="radio" value="1" onChange={(evt) => setReviewPost({...reviewPost, rating: +evt.currentTarget.value})} />
                  <label className="rate__label" htmlFor="star-1" title="Ужасно"></label>
                </div>
                <div className="rate__progress"><span className="rate__stars">{reviewPost.rating}</span> <span>/</span> <span className="rate__all-stars">5</span>
                </div>
              </div>
              <p className="rate__message">Нужно оценить товар</p>
            </fieldset>
            <div className={`custom-input form-review__item ${(!reviewPost.userName && isFormChecked) ? 'is-invalid' : ''}`}>
              <label>
                <span className="custom-input__label">Ваше имя
                  <svg width="9" height="9" aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <input type="text" name="user-name" placeholder="Введите ваше имя" required onChange={(evt) => setReviewPost({...reviewPost, userName: evt.currentTarget.value})} />
              </label>
              <p className="custom-input__error">Нужно указать имя</p>
            </div>
            <div className={`custom-input form-review__item ${(!reviewPost.advantage && isFormChecked) ? 'is-invalid' : ''}`}>
              <label>
                <span className="custom-input__label">Достоинства
                  <svg width="9" height="9" aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <input type="text" name="user-plus" placeholder="Основные преимущества товара" required onChange={(evt) => setReviewPost({...reviewPost, advantage: evt.currentTarget.value})} />
              </label>
              <p className="custom-input__error">Нужно указать достоинства</p>
            </div>
            <div className={`custom-input form-review__item ${(!reviewPost.disadvantage && isFormChecked) ? 'is-invalid' : ''}`}>
              <label>
                <span className="custom-input__label">Недостатки
                  <svg width="9" height="9" aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <input type="text" name="user-minus" placeholder="Главные недостатки товара" required onChange={(evt) => setReviewPost({...reviewPost, disadvantage: evt.currentTarget.value})} />
              </label>
              <p className="custom-input__error">Нужно указать недостатки</p>
            </div>
            <div className={`custom-textarea form-review__item ${(!reviewPost.review && isFormChecked) ? 'is-invalid' : ''}`}>
              <label>
                <span className="custom-textarea__label">Комментарий
                  <svg width="9" height="9" aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <textarea
                  name="user-comment"
                  minLength={5}
                  placeholder="Поделитесь своим опытом покупки"
                  onChange={(evt) => setReviewPost({...reviewPost, review: evt.currentTarget.value})}
                >
                </textarea>
              </label>
              <div className="custom-textarea__error">Нужно добавить комментарий</div>
            </div>
          </div>
          <button className="btn btn--purple form-review__btn" type="submit">Отправить отзыв</button>
        </form>
      </div>
      <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={() => onModalClose(false)}>
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </div>
  );
}
