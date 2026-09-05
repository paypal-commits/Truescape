import React from 'react';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  FileText,
  Heart,
  HelpCircle,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Check
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { SAMPLE_BOOKS } from '../data/books';
import { BookCard } from './BookCard';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedBook,
    setView,
    addToCart,
    setSampleModalBook,
    isBookPurchased,
    addToast,
    navigateToBook,
  } = useStore();

  if (!selectedBook) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-600 mb-4">No eBook selected.</p>
        <button
          onClick={() => setView('catalog')}
          className="px-6 py-2.5 bg-[#191E24] text-white rounded-lg text-sm"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  const purchased = isBookPurchased(selectedBook.id);

  const handleBuyNow = () => {
    addToCart(selectedBook, 1);
    setView('checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Link Copied', 'Book link copied to your clipboard.', 'info');
    }
  };

  const relatedBooks = SAMPLE_BOOKS.filter(
    (b) => b.category === selectedBook.category && b.id !== selectedBook.id
  ).slice(0, 3);

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-[#E8E1D5] pb-4">
          <button
            onClick={() => setView('catalog')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#6C645C] hover:text-[#221F1C] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Catalog</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-[#6C645C] hover:text-[#221F1C] hover:bg-[#F4EFE6] transition-colors cursor-pointer"
              title="Share Book"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Top Product Section: Left Large Cover, Right Editorial Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Large Book Cover & Quick Action Prompts */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm rounded-2xl overflow-hidden book-shadow-lg bg-white p-2.5 border border-[#E8E1D5]">
              <div className="relative aspect-[2/3] w-full rounded-xl overflow-hidden bg-[#F4EFE6]">
                <img
                  src={selectedBook.coverImage}
                  alt={selectedBook.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/40 via-black/15 to-transparent pointer-events-none" />
                
                {purchased && (
                  <div className="absolute top-3 right-3 bg-[#236B5E] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    <span>In Your Library</span>
                  </div>
                )}
              </div>
            </div>

            {/* Reading Sample Action Trigger */}
            <div className="w-full max-w-sm mt-4">
              <button
                id="product-read-sample-btn"
                onClick={() => setSampleModalBook(selectedBook)}
                className="w-full py-3 px-4 rounded-xl bg-white border border-[#D8CFBF] hover:bg-[#F4EFE6] text-[#221F1C] font-semibold text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Eye className="w-4 h-4 text-[#C58B39]" />
                <span>Read Free Sample Chapter</span>
              </button>
            </div>

            {/* DRM-Free & Device Guarantee Box */}
            <div className="w-full max-w-sm mt-6 p-4 rounded-xl bg-[#F4EFE6] border border-[#E8E1D5] text-xs text-[#5A524A] space-y-2">
              <div className="flex items-center gap-2 font-semibold text-[#221F1C]">
                <ShieldCheck className="w-4 h-4 text-[#236B5E]" />
                <span>Truescape Freedom Promise</span>
              </div>
              <p className="leading-relaxed font-sans">
                100% DRM-free. You own your files forever. Easily send to Kindle, Apple Books, Kobo, or read directly in your browser.
              </p>
            </div>
          </div>

          {/* Right Column: Title, Author, Specs, Highlights, Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-bold tracking-wider uppercase text-[#B85D38] bg-[#F3EDE2] border border-[#DFD5C5] px-2.5 py-1 rounded-full">
                  {selectedBook.category}
                </span>
                <span className="text-xs text-[#786E64]">ISBN: {selectedBook.isbn}</span>
              </div>

              <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#221F1C] leading-tight">
                {selectedBook.title}
              </h1>

              <p className="text-base sm:text-lg text-[#5A524A] mt-2 font-sans">
                By <span className="text-[#221F1C] font-semibold">{selectedBook.author}</span>
              </p>

              {/* Rating & Reviews pill */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1 text-[#C58B39]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(selectedBook.rating)
                          ? 'fill-current'
                          : 'stroke-current fill-none'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-[#221F1C]">
                  {selectedBook.rating.toFixed(1)}
                </span>
                <span className="text-sm text-[#786E64]">
                  ({selectedBook.reviewCount} customer reviews)
                </span>
              </div>
            </div>

            {/* Price & Buying Block */}
            <div className="p-6 rounded-2xl bg-white border border-[#E8E1D5] artisan-card space-y-5">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-3xl font-bold text-[#221F1C]">
                    ${selectedBook.price.toFixed(2)}
                  </span>
                  {selectedBook.originalPrice && (
                    <span className="text-sm text-[#9E9488] line-through ml-2.5">
                      ${selectedBook.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="block text-xs text-[#236B5E] font-semibold mt-0.5">
                    Instant Digital Delivery via Email & Library
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-xs font-semibold text-[#786E64] uppercase tracking-wider block">
                    Available Formats
                  </span>
                  <div className="flex gap-1.5 mt-1">
                    {selectedBook.formats.map((fmt) => (
                      <span
                        key={fmt}
                        className="px-2 py-0.5 rounded bg-[#FAF7F2] border border-[#E8E1D5] text-[11px] font-mono font-bold text-[#4A443E]"
                      >
                        {fmt}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  id="product-add-to-cart-btn"
                  onClick={() => addToCart(selectedBook, 1)}
                  className="w-full py-3.5 px-5 rounded-xl border border-[#D8CFBF] text-[#221F1C] hover:bg-[#F4EFE6] font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Digital Bag</span>
                </button>

                <button
                  id="product-buy-now-btn"
                  onClick={handleBuyNow}
                  className="w-full py-3.5 px-5 rounded-xl bg-[#221F1C] text-white hover:bg-[#38322B] font-semibold text-sm transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer border border-[#38322B]"
                >
                  <span>Buy Now with 1-Click</span>
                </button>
              </div>

              {purchased && (
                <div className="text-center pt-2">
                  <button
                    onClick={() => setView('library')}
                    className="text-xs font-semibold text-[#236B5E] hover:underline cursor-pointer"
                  >
                    You own this eBook. Open in My Digital Library &rarr;
                  </button>
                </div>
              )}
            </div>

            {/* Reading Estimation Metrics */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-white border border-[#E8E1D5] text-center artisan-card">
                <BookOpen className="w-4 h-4 text-[#C58B39] mx-auto mb-1" />
                <span className="text-xs text-[#786E64] block font-medium">Length</span>
                <span className="text-sm font-bold text-[#221F1C]">{selectedBook.pageCount} Pages</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-[#E8E1D5] text-center artisan-card">
                <Clock className="w-4 h-4 text-[#C58B39] mx-auto mb-1" />
                <span className="text-xs text-[#786E64] block font-medium">Read Time</span>
                <span className="text-sm font-bold text-[#221F1C]">{selectedBook.readingTimeHours} Hours</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-[#E8E1D5] text-center artisan-card">
                <FileText className="w-4 h-4 text-[#C58B39] mx-auto mb-1" />
                <span className="text-xs text-[#786E64] block font-medium">Word Count</span>
                <span className="text-sm font-bold text-[#221F1C]">{selectedBook.wordCount.toLocaleString()}</span>
              </div>
            </div>

            {/* Full Book Description */}
            <div className="space-y-3 pt-2">
              <h2 className="font-editorial text-2xl font-bold text-[#221F1C]">
                About this eBook
              </h2>
              <p className="text-sm sm:text-base text-[#4A443E] leading-relaxed">
                {selectedBook.fullDescription}
              </p>
            </div>

            {/* Key Highlights */}
            {selectedBook.keyHighlights && selectedBook.keyHighlights.length > 0 && (
              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E8E1D5] artisan-card space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C58B39]" />
                  <h3 className="font-editorial text-lg font-bold text-[#221F1C]">
                    Key Highlights & Insights
                  </h3>
                </div>
                <ul className="space-y-2">
                  {selectedBook.keyHighlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4A443E]">
                      <CheckCircle2 className="w-4 h-4 text-[#236B5E] flex-shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Format Information Table */}
            <div className="border border-[#E8E1D5] rounded-2xl overflow-hidden bg-white text-xs artisan-card">
              <div className="bg-[#F4EFE6] px-4 py-2.5 font-bold text-[#221F1C] border-b border-[#E8E1D5]">
                Digital Edition Specifications
              </div>
              <div className="divide-y divide-[#F2ECE0]">
                <div className="grid grid-cols-2 px-4 py-2.5">
                  <span className="text-[#786E64]">Publisher</span>
                  <span className="font-medium text-[#221F1C]">Truescape Editions (Hamtramck, MI)</span>
                </div>
                <div className="grid grid-cols-2 px-4 py-2.5">
                  <span className="text-[#786E64]">Publication Date</span>
                  <span className="font-medium text-[#221F1C]">{selectedBook.publishedDate}</span>
                </div>
                <div className="grid grid-cols-2 px-4 py-2.5">
                  <span className="text-[#786E64]">Language</span>
                  <span className="font-medium text-[#221F1C]">{selectedBook.language}</span>
                </div>
                <div className="grid grid-cols-2 px-4 py-2.5">
                  <span className="text-[#786E64]">Digital Rights (DRM)</span>
                  <span className="font-medium text-[#236B5E]">None (Open EPUB/PDF Standard)</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Customer Reviews Section */}
        <section className="border-t border-[#E8E1D5] pt-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#221F1C]">
                Customer Reviews
              </h2>
              <p className="text-xs sm:text-sm text-[#786E64] mt-1">
                Verified reader feedback from Truescape digital patrons.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-2xl font-bold text-[#221F1C] block leading-none">
                  {selectedBook.rating.toFixed(1)} / 5
                </span>
                <span className="text-[11px] text-[#786E64]">Based on {selectedBook.reviewCount} reviews</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {selectedBook.reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E8E1D5] artisan-card space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#C58B39]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? 'fill-current' : 'stroke-current fill-none'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-[#9E9488]">{rev.date}</span>
                </div>

                <h4 className="font-editorial text-base font-bold text-[#221F1C]">
                  {rev.title}
                </h4>

                <p className="text-xs sm:text-sm text-[#5A524A] leading-relaxed">
                  "{rev.comment}"
                </p>

                <div className="flex items-center justify-between pt-2 text-xs border-t border-[#F2ECE0]">
                  <span className="font-medium text-[#4A443E]">{rev.author}</span>
                  {rev.verifiedPurchase && (
                    <span className="text-[#236B5E] flex items-center gap-1 font-semibold text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Verified eBook Reader
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Related Category Recommendations */}
        {relatedBooks.length > 0 && (
          <section className="border-t border-[#E8E1D5] pt-12">
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#B85D38] block">
                More in {selectedBook.category}
              </span>
              <h3 className="font-editorial text-2xl font-bold text-[#221F1C]">
                You May Also Enjoy
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};
