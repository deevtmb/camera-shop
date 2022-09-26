export default function UpButton(): JSX.Element {
  return (
    <a className="up-btn" href="#header" onClick={(evt) => {
      evt.preventDefault();
      window.scrollTo({top: 0, behavior: 'smooth'});
    }}
    data-testid='up button'
    >
      <svg width="12" height="18" aria-hidden="true">
        <use xlinkHref="#icon-arrow2"></use>
      </svg>
    </a>
  );
}
