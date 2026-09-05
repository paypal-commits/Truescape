export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface EBook {
  id: string;
  title: string;
  author: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  coverImage: string;
  coverAccent: string;
  formats: ('EPUB' | 'PDF' | 'MOBI')[];
  pageCount: number;
  wordCount: number;
  readingTimeHours: number;
  publishedDate: string;
  isbn: string;
  language: string;
  featured: boolean;
  bestseller?: boolean;
  newRelease?: boolean;
  keyHighlights: string[];
  sampleChapterTitle: string;
  sampleChapterContent: string[];
  reviews: Review[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  count: number;
  accent: string;
}

export interface CartItem {
  book: EBook;
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  email: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
}

export interface OrderItem {
  bookId: string;
  title: string;
  author: string;
  price: number;
  coverImage: string;
  formats: ('EPUB' | 'PDF' | 'MOBI')[];
}

export interface Order {
  id: string;
  date: string;
  customer: CustomerInfo;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: string;
  paymentLast4?: string;
}

export type ViewMode =
  | 'home'
  | 'catalog'
  | 'categories'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'order-confirmation'
  | 'library'
  | 'about'
  | 'contact';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message?: string;
}
