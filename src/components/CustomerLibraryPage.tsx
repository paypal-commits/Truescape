import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  FileText,
  History,
  Key,
  Library,
  Mail,
  Receipt,
  RotateCcw,
  Save,
  ShieldCheck,
  User
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { SAMPLE_BOOKS } from '../data/books';
import { EBook } from '../types';

export const CustomerLibraryPage: React.FC = () => {
  const {
    purchasedBookIds,
    orders,
    user,
    updateUser,
    setSampleModalBook,
    setView,
    addToast,
    navigateToBook,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'library' | 'orders' | 'profile'>('library');
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [address, setAddress] = useState(user.address || '');
  const [city, setCity] = useState(user.city || 'Hamtramck');
  const [state, setState] = useState(user.state || 'MI');
  const [zip, setZip] = useState(user.zip || '48212');

  const purchasedBooks: EBook[] = SAMPLE_BOOKS.filter((b) =>
    purchasedBookIds.includes(b.id)
  );

  const handleDownload = (title: string, format: string) => {
    addToast(
      'Download Started',
      `Downloading "${title}" in DRM-free ${format} format.`,
      'success'
    );
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, email, address, city, state, zip });
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Account Header */}
        <div className="bg-white rounded-2xl border border-[#E8E1D5] p-6 sm:p-8 artisan-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#221F1C] text-[#FAF7F2] flex items-center justify-center font-editorial text-2xl font-bold border border-[#38322B] shadow-xs">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-[#221F1C]">
                  {user.name}
                </h1>
                <span className="text-[11px] font-semibold bg-[#EAF3F0] text-[#236B5E] border border-[#D0E5DF] px-2.5 py-0.5 rounded-full">
                  Patron Member
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#786E64] mt-0.5 flex items-center gap-2">
                <span>{user.email}</span>
                <span>•</span>
                <span>Hamtramck, MI</span>
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3">
            <div className="bg-[#FAF7F2] border border-[#E8E1D5] px-4 py-2 rounded-xl text-center">
              <span className="text-xs text-[#786E64] block">Owned Books</span>
              <strong className="text-lg text-[#221F1C]">{purchasedBooks.length}</strong>
            </div>
            <div className="bg-[#FAF7F2] border border-[#E8E1D5] px-4 py-2 rounded-xl text-center">
              <span className="text-xs text-[#786E64] block">Past Orders</span>
              <strong className="text-lg text-[#221F1C]">{orders.length}</strong>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-[#E8E1D5] pb-2">
          <button
            onClick={() => setActiveTab('library')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'library'
                ? 'bg-[#221F1C] text-white shadow-xs'
                : 'text-[#786E64] hover:text-[#221F1C] hover:bg-[#F4EFE6]'
            }`}
          >
            <Library className="w-4 h-4" />
            <span>Digital Bookshelf ({purchasedBooks.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-[#221F1C] text-white shadow-xs'
                : 'text-[#786E64] hover:text-[#221F1C] hover:bg-[#F4EFE6]'
            }`}
          >
            <Receipt className="w-4 h-4" />
            <span>Order Receipts ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-[#221F1C] text-white shadow-xs'
                : 'text-[#786E64] hover:text-[#221F1C] hover:bg-[#F4EFE6]'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Account Details</span>
          </button>
        </div>

        {/* Tab 1: Digital Bookshelf */}
        {activeTab === 'library' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
              <div>
                <h2 className="font-editorial text-2xl font-bold text-[#221F1C]">
                  My Purchased eBooks
                </h2>
                <p className="text-xs text-[#786E64]">
                  All your titles are stored DRM-free. Read right in your browser or download for Kindle & e-readers.
                </p>
              </div>
              <button
                onClick={() => setView('catalog')}
                className="text-xs font-semibold text-[#B85D38] hover:underline cursor-pointer"
              >
                + Browse New Releases
              </button>
            </div>

            {purchasedBooks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {purchasedBooks.map((book) => (
                  <div
                    key={book.id}
                    className="bg-white rounded-2xl border border-[#E8E1D5] p-5 artisan-card flex flex-col justify-between space-y-4 hover:border-[#D8CFBF] transition-colors"
                  >
                    <div className="flex gap-4 items-start">
                      <div
                        onClick={() => navigateToBook(book)}
                        className="w-20 h-28 rounded-md overflow-hidden bg-[#F4EFE6] flex-shrink-0 book-shadow cursor-pointer"
                      >
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1 space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#B85D38]">
                          {book.category}
                        </span>
                        <h3
                          onClick={() => navigateToBook(book)}
                          className="font-editorial text-base font-bold text-[#221F1C] leading-snug cursor-pointer hover:text-[#B85D38] transition-colors line-clamp-2"
                        >
                          {book.title}
                        </h3>
                        <p className="text-xs text-[#786E64] truncate">by {book.author}</p>
                        <div className="pt-1 text-[11px] text-[#5A524A]">
                          <span>{book.pageCount} pages</span> • <span>{book.readingTimeHours}h read</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-3 border-t border-[#F2ECE0] flex flex-col gap-2">
                      <button
                        onClick={() => setSampleModalBook(book)}
                        className="w-full py-2 px-3 rounded-xl bg-[#221F1C] text-white hover:bg-[#38322B] text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer border border-[#38322B]"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#C58B39]" />
                        <span>Read in Browser</span>
                      </button>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleDownload(book.title, 'EPUB')}
                          className="py-1.5 px-2 rounded-xl bg-white border border-[#D8CFBF] hover:bg-[#F4EFE6] text-[11px] font-semibold text-[#4A443E] flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Download className="w-3 h-3" />
                          <span>EPUB</span>
                        </button>
                        <button
                          onClick={() => handleDownload(book.title, 'PDF')}
                          className="py-1.5 px-2 rounded-xl bg-white border border-[#D8CFBF] hover:bg-[#F4EFE6] text-[11px] font-semibold text-[#4A443E] flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <FileText className="w-3 h-3" />
                          <span>PDF</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-[#E8E1D5] p-12 text-center space-y-4 artisan-card">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#FAF7F2] border border-[#E8E1D5] flex items-center justify-center text-[#786E64]">
                  <Library className="w-6 h-6" />
                </div>
                <h3 className="font-editorial text-2xl font-bold text-[#221F1C]">
                  No eBooks in your bookshelf yet
                </h3>
                <p className="text-xs text-[#786E64] max-w-sm mx-auto">
                  When you acquire books from Truescape, they remain permanently available here with DRM-free downloads.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setView('catalog')}
                    className="px-6 py-2.5 rounded-xl bg-[#221F1C] text-white text-xs font-semibold hover:bg-[#38322B] transition-colors cursor-pointer border border-[#38322B]"
                  >
                    Explore the Catalog
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Orders History */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h2 className="font-editorial text-2xl font-bold text-[#221F1C]">
              Order History & Invoices
            </h2>

            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-2xl border border-[#E8E1D5] p-6 artisan-card space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#F2ECE0] pb-3 gap-2">
                      <div className="flex items-center gap-3">
                        <strong className="text-sm font-bold text-[#221F1C] font-mono">
                          {order.id}
                        </strong>
                        <span className="text-xs text-[#786E64]">Placed on {order.date}</span>
                      </div>
                      <span className="text-xs font-semibold text-[#236B5E] bg-[#EAF3F0] border border-[#D0E5DF] px-2.5 py-0.5 rounded-full self-start sm:self-auto">
                        Completed (Delivered Digitally)
                      </span>
                    </div>

                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div key={item.bookId} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.coverImage}
                              alt={item.title}
                              className="w-8 h-11 rounded-md object-cover border border-[#E8E1D5]"
                            />
                            <div>
                              <p className="font-bold text-[#221F1C] font-editorial text-sm">
                                {item.title}
                              </p>
                              <p className="text-[#786E64]">by {item.author}</p>
                            </div>
                          </div>
                          <span className="font-semibold text-[#221F1C]">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-[#F2ECE0] text-xs text-[#5A524A]">
                      <span>
                        Paid with {order.paymentMethod} (•••• {order.paymentLast4 || '4242'})
                      </span>
                      <span className="font-bold text-sm text-[#221F1C]">
                        Total: ${order.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#786E64]">No orders on record.</p>
            )}
          </div>
        )}

        {/* Tab 3: Account Profile Settings */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl border border-[#E8E1D5] p-6 sm:p-8 artisan-card max-w-2xl space-y-6">
            <h2 className="font-editorial text-2xl font-bold text-[#221F1C]">
              Account & Delivery Settings
            </h2>
            <p className="text-xs text-[#786E64]">
              Manage the default credentials used for electronic delivery and tax calculations.
            </p>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#4A443E] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CFBF] text-sm text-[#221F1C] focus:outline-none focus:ring-2 focus:ring-[#221F1C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A443E] mb-1">
                  Delivery Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CFBF] text-sm text-[#221F1C] focus:outline-none focus:ring-2 focus:ring-[#221F1C]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#4A443E] mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CFBF] text-sm text-[#221F1C] focus:outline-none focus:ring-2 focus:ring-[#221F1C]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4A443E] mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CFBF] text-sm text-[#221F1C] focus:outline-none focus:ring-2 focus:ring-[#221F1C]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#221F1C] text-white hover:bg-[#38322B] text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer border border-[#38322B]"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Account Information</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
