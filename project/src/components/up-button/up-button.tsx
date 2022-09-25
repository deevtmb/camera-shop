export default function UpButton(): JSX.Element {
  return (
    <a className="up-btn" href="#header" onClick={(evt) => {
      evt.preventDefault();
      document.documentElement.style.scrollBehavior = 'smooth';
      window.scrollTo(0, 0);
      setTimeout(() => {
        document.documentElement.style.scrollBehavior = 'auto';
      }, 2000);
    }}
    data-testid='up button'
    >
      <svg width="12" height="18" aria-hidden="true">
        <use xlinkHref="#icon-arrow2"></use>
      </svg>
    </a>
  );
}
