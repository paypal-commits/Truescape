import React, { createContext, useContext, useEffect, useState } from 'react';
import { SAMPLE_BOOKS } from '../data/books';
import { CartItem, CustomerInfo, EBook, Order, ToastMessage, ViewMode } from '../types';

interface StoreContextType {
  view: ViewMode;
  setView: (view: ViewMode) => void;
  selectedBook: EBook | null;
  setSelectedBook: (book: EBook | null) => void;
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  sampleModalBook: EBook | null;
  setSampleModalBook: (book: EBook | null) => void;
  legalModal: 'privacy' | 'terms' | 'refund' | null;
  setLegalModal: (modal: 'privacy' | 'terms' | 'refund' | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
  cart: CartItem[];
  addToCart: (book: EBook, quantity?: number) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartTax: number;
  cartTotal: number;
  orders: Order[];
  purchasedBookIds: string[];
  lastOrder: Order | null;
  placeOrder: (customer: CustomerInfo, paymentMethod: string, paymentLast4?: string) => Promise<Order>;
  user: CustomerInfo;
  updateUser: (info: Partial<CustomerInfo>) => void;
  toasts: ToastMessage[];
  addToast: (title: string, message?: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
  navigateToBook: (book: EBook) => void;
  navigateToCategory: (categoryName: string) => void;
  isBookPurchased: (bookId: string) => boolean;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'truescape_cart_v1';
const ORDERS_STORAGE_KEY = 'truescape_orders_v1';
const LIBRARY_STORAGE_KEY = 'truescape_library_v1';
const USER_STORAGE_KEY = 'truescape_user_v1';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [view, setViewState] = useState<ViewMode>('home');
  const [selectedBook, setSelectedBook] = useState<EBook | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sampleModalBook, setSampleModalBook] = useState<EBook | null>(null);
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | 'refund' | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // User Profile
  const [user, setUser] = useState<CustomerInfo>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load user info from storage', e);
    }
    return {
      name: 'Hamza Reader',
      email: 'reader@example.com',
      address: '11400 Joseph Campau Ave',
      city: 'Hamtramck',
      state: 'MI',
      zip: '48212',
    };
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load cart from storage', e);
    }
    return [];
  });

  // Purchased Book IDs
  const [purchasedBookIds, setPurchasedBookIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LIBRARY_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load library from storage', e);
    }
    // Seed initial library with 1 sample book so user sees instant digital access capability
    return ['the-quiet-architecture'];
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load orders from storage', e);
    }
    return [
      {
        id: 'TS-84920',
        date: '2025-02-14',
        customer: {
          name: 'Hamza Reader',
          email: 'reader@example.com',
          city: 'Hamtramck',
          state: 'MI',
        },
        items: [
          {
            bookId: 'the-quiet-architecture',
            title: 'The Quiet Architecture',
            author: 'Elena Vance-Corso',
            price: 14.99,
            coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop',
            formats: ['EPUB', 'PDF', 'MOBI'],
          },
        ],
        subtotal: 14.99,
        tax: 0.90,
        total: 15.89,
        paymentMethod: 'Credit Card',
        paymentLast4: '4242',
      },
    ];
  });

  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('Error saving cart', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(LIBRARY_STORAGE_KEY, JSON.stringify(purchasedBookIds));
    } catch (e) {
      console.warn('Error saving library', e);
    }
  }, [purchasedBookIds]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.warn('Error saving orders', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } catch (e) {
      console.warn('Error saving user', e);
    }
  }, [user]);

  const setView = (newView: ViewMode) => {
    setViewState(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToast = (title: string, message?: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (book: EBook, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.book.id === book.id);
      if (existing) {
        return prev.map((item) =>
          item.book.id === book.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { book, quantity }];
    });
    addToast('Added to Cart', `"${book.title}" added to your digital bag.`, 'success');
  };

  const removeFromCart = (bookId: string) => {
    setCart((prev) => prev.filter((item) => item.book.id !== bookId));
    addToast('Removed from Cart', 'Item removed from your bag.', 'info');
  };

  const updateQuantity = (bookId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.book.id === bookId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = Number(cart.reduce((acc, item) => acc + item.book.price * item.quantity, 0).toFixed(2));
  const cartTax = Number((cartSubtotal * 0.06).toFixed(2)); // Michigan 6% sales tax
  const cartTotal = Number((cartSubtotal + cartTax).toFixed(2));

  const placeOrder = async (
    customer: CustomerInfo,
    paymentMethod: string,
    paymentLast4: string = '4242'
  ): Promise<Order> => {
    const newOrderId = `TS-${Math.floor(10000 + Math.random() * 90000)}`;
    const orderItems = cart.map((item) => ({
      bookId: item.book.id,
      title: item.book.title,
      author: item.book.author,
      price: item.book.price,
      coverImage: item.book.coverImage,
      formats: item.book.formats,
    }));

    const newOrder: Order = {
      id: newOrderId,
      date: new Date().toISOString().split('T')[0],
      customer,
      items: orderItems,
      subtotal: cartSubtotal,
      tax: cartTax,
      total: cartTotal,
      paymentMethod,
      paymentLast4,
    };

    // Add purchased books to user library
    const newBookIds = cart.map((c) => c.book.id);
    setPurchasedBookIds((prev) => Array.from(new Set([...prev, ...newBookIds])));
    setOrders((prev) => [newOrder, ...prev]);
    setLastOrder(newOrder);
    clearCart();

    addToast('Order Confirmed!', `Your eBooks are now available in your Digital Library.`, 'success');
    return newOrder;
  };

  const updateUser = (info: Partial<CustomerInfo>) => {
    setUser((prev) => ({ ...prev, ...info }));
    addToast('Profile Updated', 'Your customer information was saved.', 'info');
  };

  const navigateToBook = (book: EBook) => {
    setSelectedBook(book);
    setView('product-detail');
  };

  const navigateToCategory = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setView('catalog');
  };

  const isBookPurchased = (bookId: string) => {
    return purchasedBookIds.includes(bookId);
  };

  return (
    <StoreContext.Provider
      value={{
        view,
        setView,
        selectedBook,
        setSelectedBook,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        sampleModalBook,
        setSampleModalBook,
        legalModal,
        setLegalModal,
        isCartOpen,
        setIsCartOpen,
        isSearchModalOpen,
        setIsSearchModalOpen,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        cartTax,
        cartTotal,
        orders,
        purchasedBookIds,
        lastOrder,
        placeOrder,
        user,
        updateUser,
        toasts,
        addToast,
        removeToast,
        navigateToBook,
        navigateToCategory,
        isBookPurchased,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
