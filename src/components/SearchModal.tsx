import React, { useMemo, useState } from 'react';
import { ArrowRight, BookOpen, Search, Star, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES, SAMPLE_BOOKS } from '../data/books';

export const SearchModal: React.FC = () => {
  const { isSearchModalOpen, setIsSearchModalOpen, navigateToBook, navigateToCategory } = useStore();
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return SAMPLE_BOOKS.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        b.shortDescription.toLowerCase().includes(q)
    );
  }, [query]);

  if (!isSearchModalOpen) return null;

  const handleSelectBook = (book: any) => {
    setIsSearchModalOpen(false);
    navigateToBook(book);
  };

  const handleSelectCategory = (catName: string) => {
    setIsSearchModalOpen(false);
    navigateToCategory(catName);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 px-4">
      <div className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#E8E1D5] overflow-hidden animate-in fade-in zoom-in-95 duration-150 artisan-card">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#E8E1D5] bg-white flex items-center gap-3">
          <Search className="w-5 h-5 text-[#9E9488] flex-shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search eBooks by title, author, or genre..."
            className="w-full text-base sm:text-lg text-[#221F1C] placeholder-[#9E9488] focus:outline-none bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-[#9E9488] hover:text-[#221F1C] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchModalOpen(false)}
            className="p-1.5 rounded-lg text-[#786E64] hover:bg-[#F4EFE6] transition-colors cursor-pointer"
          >
            <span className="text-xs font-semibold px-1 font-mono">ESC</span>
          </button>
        </div>

        {/* Search Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-4">
          {query.trim() ? (
            results.length > 0 ? (
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#786E64] block mb-2">
                  Matching eBooks ({results.length})
                </span>
                {results.map((book) => (
                  <div
                    key={book.id}
                    onClick={() => handleSelectBook(book)}
                    className="p-3 rounded-xl bg-white hover:bg-[#F4EFE6] border border-[#E8E1D5] cursor-pointer flex items-center justify-between gap-4 transition-colors group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-10 h-14 rounded object-cover flex-shrink-0 shadow-2xs"
                      />
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#B85D38]">
                          {book.category}
                        </span>
                        <h4 className="font-editorial text-sm font-bold text-[#221F1C] truncate group-hover:text-[#B85D38]">
                          {book.title}
                        </h4>
                        <p className="text-xs text-[#786E64] truncate">by {book.author}</p>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <span className="text-sm font-bold text-[#221F1C]">
                        ${book.price.toFixed(2)}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] text-[#C58B39] justify-end">
                        <Star className="w-3 h-3 fill-current" />
                        <span>{book.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 space-y-2">
                <BookOpen className="w-8 h-8 text-[#9E9488] mx-auto" />
                <p className="text-sm font-semibold text-[#221F1C]">
                  No books found for "{query}"
                </p>
                <p className="text-xs text-[#786E64]">
                  Try searching for keywords like "architecture", "venture", "sleep", or "fiction".
                </p>
              </div>
            )
          ) : (
            /* Quick Category Suggestions */
            <div className="space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#786E64] block">
                Popular Categories
              </span>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleSelectCategory(cat.name)}
                    className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#F4EFE6] border border-[#E8E1D5] text-xs font-semibold text-[#4A443E] transition-colors cursor-pointer"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              <div className="pt-2 border-t border-[#E8E1D5]">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#786E64] block mb-2">
                  Staff Picks
                </span>
                <div className="space-y-2">
                  {SAMPLE_BOOKS.slice(0, 2).map((book) => (
                    <div
                      key={book.id}
                      onClick={() => handleSelectBook(book)}
                      className="p-2.5 rounded-xl bg-white hover:bg-[#F4EFE6] border border-[#E8E1D5] flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-8 h-11 rounded object-cover"
                        />
                        <div>
                          <p className="font-editorial text-xs font-bold text-[#221F1C]">
                            {book.title}
                          </p>
                          <p className="text-[11px] text-[#786E64]">by {book.author}</p>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#9E9488]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
