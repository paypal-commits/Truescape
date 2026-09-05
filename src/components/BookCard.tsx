import React from 'react';
import { Eye, ShoppingBag, Star, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { EBook } from '../types';

interface BookCardProps {
  book: EBook;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { navigateToBook, addToCart, setSampleModalBook, isBookPurchased } = useStore();
  const purchased = isBookPurchased(book.id);

  return (
    <article className="group bg-white rounded-2xl border border-[#E8E1D5] p-4 sm:p-5 flex flex-col justify-between hover:border-[#D8CFBF] artisan-card hover:shadow-lg transition-all duration-300">
      <div>
        {/* Book Cover Container with spine highlight */}
        <div
          onClick={() => navigateToBook(book)}
          className="relative aspect-[2/3] w-full rounded-xl overflow-hidden cursor-pointer bg-[#F4EFE6] mb-4 book-shadow group-hover:scale-[1.02] transition-transform duration-300"
        >
          <img
            src={book.coverImage}
            alt={`Cover of ${book.title}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Spine simulation shadow */}
          <div className="absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-black/40 via-black/15 to-transparent pointer-events-none" />
          
          {/* Badges */}
          <div className="absolute top-2.5 right-2.5 flex flex-col gap-1 items-end">
            {purchased && (
              <span className="bg-[#236B5E] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                <Check className="w-3 h-3" />
                In Library
              </span>
            )}
            {book.bestseller && !purchased && (
              <span className="bg-[#221F1C] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                Bestseller
              </span>
            )}
            {book.newRelease && !book.bestseller && !purchased && (
              <span className="bg-[#C58B39] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                New
              </span>
            )}
          </div>

          {/* Quick Preview Hover Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 p-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSampleModalBook(book);
              }}
              className="px-3.5 py-2 rounded-xl bg-white/95 text-[#221F1C] text-xs font-semibold hover:bg-white shadow-md flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-[#C58B39]" />
              <span>Read Sample</span>
            </button>
          </div>
        </div>

        {/* Category & Rating */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[11px] font-semibold tracking-wider uppercase text-[#B85D38]">
            {book.category}
          </span>
          <div className="flex items-center gap-1 text-[#C58B39]">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="text-xs font-bold text-[#221F1C]">{book.rating.toFixed(1)}</span>
            <span className="text-[11px] text-[#9E9488]">({book.reviewCount})</span>
          </div>
        </div>

        {/* Title */}
        <h3
          onClick={() => navigateToBook(book)}
          className="font-editorial text-lg font-bold text-[#221F1C] leading-snug cursor-pointer hover:text-[#C58B39] transition-colors line-clamp-1 mb-1"
          title={book.title}
        >
          {book.title}
        </h3>

        {/* Author */}
        <p className="text-xs text-[#786E64] mb-2 font-sans">
          by <span className="text-[#4A443E] font-medium">{book.author}</span>
        </p>

        {/* Short Description */}
        <p className="text-xs text-[#5A524A] line-clamp-2 leading-relaxed mb-4">
          {book.shortDescription}
        </p>
      </div>

      {/* Pricing and Action Buttons */}
      <div className="pt-3.5 border-t border-[#F2ECE0] space-y-3">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-lg font-bold text-[#221F1C]">
              ${book.price.toFixed(2)}
            </span>
            {book.originalPrice && (
              <span className="text-xs text-[#9E9488] line-through ml-2">
                ${book.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <span className="text-[10px] text-[#786E64] font-mono tracking-tight bg-[#F4EFE6] px-2 py-0.5 rounded-full border border-[#E8E1D5]">
            {book.formats.join(' • ')}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => navigateToBook(book)}
            className="w-full py-2.5 px-3 rounded-xl border border-[#D8CFBF] text-xs font-semibold text-[#38322B] hover:bg-[#F4EFE6] transition-colors text-center cursor-pointer"
          >
            View Details
          </button>

          <button
            onClick={() => addToCart(book, 1)}
            className="w-full py-2.5 px-3 rounded-xl bg-[#221F1C] hover:bg-[#38322B] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer border border-[#38322B]"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </article>
  );
};
