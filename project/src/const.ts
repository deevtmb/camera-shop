export const AppRoute = {
  Main: '/',
  Catalog: '/catalog',
  CatalogPage: '/catalog/:page',
  Product: '/product/',
  ProductInfo: '/product/:id',
  ProductTab: '/:tab'
} as const;

export const APIRoute = {
  Products: '/cameras',
  Reviews: '/reviews',
  Similar: '/similar',
  Promo: '/promo',
} as const;

export const NameSpace = {
  Products: 'PORDUCTS_DATA',
  Reviews: 'REVIEWS_DATA',
} as const;

export const ProductTab = {
  Characteristics: 'characteristics',
  Description: 'description'
} as const;

export const DateData = {
  Locale: 'ru',
  ReviewFormat: 'DD MMMM',
  DateTimeFormat: 'YYYY-MM-DD',
} as const;

export const ProductSlider = {
  FirstSlideId: 0,
  SlidesPerView: 3,
  SlidesStep: 1,
} as const;
