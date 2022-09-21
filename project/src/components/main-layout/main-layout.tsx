import Footer from '../footer/footer';
import Header from '../header/header';

type MainLayoutProps = {
  children: JSX.Element;
}

export default function MainLayout({children}: MainLayoutProps): JSX.Element {
  return (
    <div className="wrapper">
      <Header/>
      {children}
      <Footer />
    </div>
  );
}
