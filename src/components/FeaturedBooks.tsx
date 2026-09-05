import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { SAMPLE_BOOKS } from '../data/books';
import { BookCard } from './BookCard';

export const FeaturedBooks: React.FC = () => {
  const { setView } = useStore();
  const [filterTab, setFilterTab] = useState<'all' | 'bestseller' | 'new'>('all');

  const filtered = SAMPLE_BOOKS.filter((b) => {
    if (filterTab === 'bestseller') return b.bestseller;
    if (filterTab === 'new') return b.newRelease;
    return b.featured;
  });

  return (
    <section className="py-16 sm:py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 border-b border-[#E8E1D5] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#C58B39]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#786E64]">
                Curated Recommendations
              </span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#221F1C] tracking-tight">
              Featured eBooks
            </h2>
            <p className="text-sm sm:text-base text-[#5A524A] mt-1 font-sans">
              Handpicked titles celebrated for depth, originality, and lasting literary value.
            </p>
          </div>

          {/* Filter Tabs & Catalog Link */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex bg-[#F3EDE2] p-1 rounded-xl border border-[#DFD5C5]">
              <button
                onClick={() => setFilterTab('all')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  filterTab === 'all'
                    ? 'bg-white text-[#221F1C] shadow-xs'
                    : 'text-[#6C645C] hover:text-[#221F1C]'
                }`}
              >
                All Featured
              </button>
              <button
                onClick={() => setFilterTab('bestseller')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  filterTab === 'bestseller'
                    ? 'bg-white text-[#221F1C] shadow-xs'
                    : 'text-[#6C645C] hover:text-[#221F1C]'
                }`}
              >
                Bestsellers
              </button>
              <button
                onClick={() => setFilterTab('new')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  filterTab === 'new'
                    ? 'bg-white text-[#221F1C] shadow-xs'
                    : 'text-[#6C645C] hover:text-[#221F1C]'
                }`}
              >
                New Releases
              </button>
            </div>

            <button
              onClick={() => setView('catalog')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C58B39] hover:text-[#B85D38] transition-colors ml-3 group cursor-pointer"
            >
              <span>View All ({SAMPLE_BOOKS.length})</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.slice(0, 8).map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
};
