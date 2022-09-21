export const AppRoute = {
  Main: '/',
  Catalog: '/catalog',
  CatalogPage: '/catalog/:page',
  Product: '/product/',
  ProductInfo: '/product/:id',
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
