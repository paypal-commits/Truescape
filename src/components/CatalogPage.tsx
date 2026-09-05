import React, { useMemo, useState } from 'react';
import { Filter, RotateCcw, Search, SlidersHorizontal, Sparkles, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES, SAMPLE_BOOKS } from '../data/books';
import { BookCard } from './BookCard';

export const CatalogPage: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useStore();
  const [search, setSearch] = useState('');
  const [priceRange, setPriceRange] = useState<'all' | 'under-13' | '13-18' | 'over-18'>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [visibleCount, setVisibleCount] = useState<number>(8);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Filter and Sort Logic
  const filteredBooks = useMemo(() => {
    return SAMPLE_BOOKS.filter((book) => {
      // Category filter
      if (selectedCategory && book.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }

      // Search filter (title, author, description, highlights)
      if (search.trim()) {
        const query = search.toLowerCase();
        const matchesTitle = book.title.toLowerCase().includes(query);
        const matchesAuthor = book.author.toLowerCase().includes(query);
        const matchesCategory = book.category.toLowerCase().includes(query);
        const matchesDesc = book.shortDescription.toLowerCase().includes(query);
        if (!matchesTitle && !matchesAuthor && !matchesCategory && !matchesDesc) {
          return false;
        }
      }

      // Price filter
      if (priceRange === 'under-13' && book.price >= 13) return false;
      if (priceRange === '13-18' && (book.price < 13 || book.price > 18)) return false;
      if (priceRange === 'over-18' && book.price <= 18) return false;

      // Rating filter
      if (minRating > 0 && book.rating < minRating) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
      }
      if (sortBy === 'price-asc') {
        return a.price - b.price;
      }
      if (sortBy === 'price-desc') {
        return b.price - a.price;
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      // 'featured'
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, search, priceRange, minRating, sortBy]);

  const visibleBooks = filteredBooks.slice(0, visibleCount);
  const hasMore = visibleCount < filteredBooks.length;

  const handleResetFilters = () => {
    setSelectedCategory(null);
    setSearch('');
    setPriceRange('all');
    setMinRating(0);
    setSortBy('featured');
    setVisibleCount(8);
  };

  const hasActiveFilters =
    selectedCategory !== null ||
    search.trim() !== '' ||
    priceRange !== 'all' ||
    minRating > 0;

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-8 sm:mb-12 border-b border-[#E8E1D5] pb-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#B85D38] block mb-1">
            Explore Truescape Library
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#221F1C] tracking-tight">
            eBook Catalog
          </h1>
          <p className="text-sm sm:text-base text-[#5A524A] mt-2 font-sans max-w-2xl">
            Browse our curated selection of digital titles. Instantly download DRM-free EPUB, PDF, and MOBI formats compatible with all readers.
          </p>
        </div>

        {/* Search Bar & Mobile Filter Trigger */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-8">
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 text-[#9E9488] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setVisibleCount(8);
              }}
              placeholder="Search by title, author, topic, or keyword..."
              className="w-full pl-10 pr-10 py-3 bg-white border border-[#E8E1D5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#221F1C] focus:border-transparent text-[#221F1C] placeholder-[#9E9488] shadow-xs"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9E9488] hover:text-[#221F1C] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Sort Select */}
            <div className="relative flex-1 sm:flex-initial">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full sm:w-auto py-3 px-4 bg-white border border-[#E8E1D5] rounded-xl text-sm font-medium text-[#221F1C] focus:outline-none focus:ring-2 focus:ring-[#221F1C] shadow-xs cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="newest">Sort: Newest Releases</option>
                <option value="price-asc">Sort: Price: Low to High</option>
                <option value="price-desc">Sort: Price: High to Low</option>
                <option value="rating">Sort: Highest Rated</option>
              </select>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden px-4 py-3 bg-white border border-[#E8E1D5] rounded-xl text-sm font-medium text-[#221F1C] flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-[#C58B39]" />
              )}
            </button>
          </div>
        </div>

        {/* Category Horizontal Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === null
                ? 'bg-[#221F1C] text-white shadow-xs'
                : 'bg-white text-[#5A524A] border border-[#E8E1D5] hover:bg-[#F4EFE6]'
            }`}
          >
            All Categories ({SAMPLE_BOOKS.length})
          </button>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory?.toLowerCase() === cat.name.toLowerCase();
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(isSelected ? null : cat.name);
                  setVisibleCount(8);
                }}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#221F1C] text-white shadow-xs'
                    : 'bg-white text-[#5A524A] border border-[#E8E1D5] hover:bg-[#F4EFE6]'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Main Content Layout: Sidebar Filters + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Filter Sidebar */}
          <aside className={`lg:block ${mobileFilterOpen ? 'block' : 'hidden'} space-y-6`}>
            <div className="bg-white rounded-2xl border border-[#E8E1D5] p-5 sm:p-6 artisan-card space-y-6">
              <div className="flex items-center justify-between border-b border-[#F2ECE0] pb-3">
                <div className="flex items-center gap-2 text-[#221F1C] font-semibold text-sm">
                  <Filter className="w-4 h-4" />
                  <span>Refine Results</span>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={handleResetFilters}
                    className="text-xs text-[#B85D38] hover:underline flex items-center gap-1 font-medium cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                )}
              </div>

              {/* Price Filter */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#786E64] block mb-2.5">
                  Price Range
                </label>
                <div className="space-y-2 text-sm text-[#4A443E]">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      checked={priceRange === 'all'}
                      onChange={() => setPriceRange('all')}
                      className="accent-[#221F1C]"
                    />
                    <span>All Prices</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      checked={priceRange === 'under-13'}
                      onChange={() => setPriceRange('under-13')}
                      className="accent-[#221F1C]"
                    />
                    <span>Under $13.00</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      checked={priceRange === '13-18'}
                      onChange={() => setPriceRange('13-18')}
                      className="accent-[#221F1C]"
                    />
                    <span>$13.00 — $18.00</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      checked={priceRange === 'over-18'}
                      onChange={() => setPriceRange('over-18')}
                      className="accent-[#221F1C]"
                    />
                    <span>Over $18.00</span>
                  </label>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="border-t border-[#F2ECE0] pt-5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#786E64] block mb-2.5">
                  Minimum Rating
                </label>
                <div className="space-y-2 text-sm text-[#4A443E]">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      checked={minRating === 0}
                      onChange={() => setMinRating(0)}
                      className="accent-[#221F1C]"
                    />
                    <span>All Ratings</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      checked={minRating === 4.8}
                      onChange={() => setMinRating(4.8)}
                      className="accent-[#221F1C]"
                    />
                    <span>4.8 Stars & Above</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      checked={minRating === 4.5}
                      onChange={() => setMinRating(4.5)}
                      className="accent-[#221F1C]"
                    />
                    <span>4.5 Stars & Above</span>
                  </label>
                </div>
              </div>

              {/* Format Promise Note */}
              <div className="border-t border-[#F2ECE0] pt-5 bg-[#FAF7F2] p-4 rounded-xl text-xs text-[#5A524A] space-y-1 border border-[#E8E1D5]">
                <div className="font-semibold text-[#221F1C] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C58B39]" />
                  <span>Format Guarantee</span>
                </div>
                <p className="leading-relaxed">
                  Every purchase grants instant DRM-free access to EPUB and PDF editions with unlimited re-downloads.
                </p>
              </div>

            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-3">
            {/* Results Counter & Active Pills */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-medium text-[#5A524A]">
                Showing <strong className="text-[#221F1C]">{visibleBooks.length}</strong> of{' '}
                <strong className="text-[#221F1C]">{filteredBooks.length}</strong> {filteredBooks.length === 1 ? 'eBook' : 'eBooks'}
              </span>

              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-[#B85D38] hover:underline font-semibold cursor-pointer"
                >
                  Clear all filters
                </button>
              )}
            </div>

            {/* Books Grid */}
            {visibleBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {visibleBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-2xl border border-[#E8E1D5] p-12 text-center space-y-4 my-6 artisan-card">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#FAF7F2] border border-[#E8E1D5] flex items-center justify-center text-[#786E64]">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-editorial text-2xl font-bold text-[#221F1C]">
                  No matching eBooks found
                </h3>
                <p className="text-sm text-[#5A524A] max-w-md mx-auto">
                  We couldn't find any books matching your specific search or filter criteria. Try adjusting your search query or reset your filters.
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleResetFilters}
                    className="px-6 py-2.5 rounded-xl bg-[#221F1C] text-white text-xs font-semibold hover:bg-[#38322B] transition-colors shadow-xs cursor-pointer border border-[#38322B]"
                  >
                    Reset All Filters
                  </button>
                </div>
              </div>
            )}

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center pt-10">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="px-8 py-3 rounded-xl bg-white border border-[#D8CFBF] text-sm font-semibold text-[#221F1C] hover:bg-[#F4EFE6] transition-colors shadow-xs cursor-pointer"
                >
                  Load More eBooks ({filteredBooks.length - visibleBooks.length} remaining)
                </button>
              </div>
            )}
          </main>

        </div>

      </div>
    </div>
  );
};
