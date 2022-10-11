export const AppRoute = {
  Main: '/',
  Catalog: '/catalog',
  CatalogPage: '/catalog/:page',
  Product: '/product/',
  ProductInfo: '/product/:id',
  ProductTab: '/:tab',
  NotFoundPage: '*',
} as const;

export const APIRoute = {
  Products: '/cameras',
  Reviews: '/reviews',
  Similar: '/similar',
  Promo: '/promo',
} as const;

export const NameSpace = {
  Products: 'PRODUCTS_DATA',
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

export const DocumentTitle = {
  Catalog: 'Каталог - Фотошоп',
  Product: 'Продукт - Фотошоп',
} as const;

export const RequestStatus = {
  Fulfilled: 'fulfilled',
  Rejected: 'rejected',
} as const;

export const SortType = {
  Price: 'price',
  Rating: 'rating',
} as const;

export const SortOrder = {
  Up: 'asc',
  Down: 'desc'
} as const;

export const SortParam = {
  Sort: '_sort',
  Order: '_order',
} as const;

export const FilterParam = {
  PriceFrom: 'price_gte',
  PriceTo: 'price_lte',
  Category: 'category',
  Class: 'type',
  Level: 'level',
} as const;

export const ProductCategory = {
  Photo: 'Фотоаппарат',
  Video: 'Видеокамера',
} as const;

export const ProductClass = {
  Digital: 'Цифровая',
  Film: 'Плёночная',
  Collection: 'Коллекционная',
  Instant: 'Моментальная',
} as const;

export const ProductLevel = {
  Beginner: 'Нулевой',
  Regular: 'Любительский',
  Professional: 'Профессиональный',
} as const;

export const KeyName = {
  Enter: 'Enter',
} as const;

export const NavigateParam = {
  Page: 'page'
} as const;

export const EventType = {
  Keydown: 'keydown',
  Blur: 'blur',
  Change: 'change'
} as const;
