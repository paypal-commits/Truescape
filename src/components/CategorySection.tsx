import React from 'react';
import { ArrowRight, Bookmark, Compass, Cpu, Heart, Layers, Lightbulb, ShieldAlert, Sparkles, UserCheck, Activity } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES, SAMPLE_BOOKS } from '../data/books';

export const CategorySection: React.FC = () => {
  const { navigateToCategory } = useStore();

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'fiction':
        return <Bookmark className="w-5 h-5" />;
      case 'business':
        return <Layers className="w-5 h-5" />;
      case 'self-development':
        return <Lightbulb className="w-5 h-5" />;
      case 'romance':
        return <Heart className="w-5 h-5" />;
      case 'mystery-thriller':
        return <ShieldAlert className="w-5 h-5" />;
      case 'biography':
        return <UserCheck className="w-5 h-5" />;
      case 'health-wellness':
        return <Activity className="w-5 h-5" />;
      case 'education':
        return <Compass className="w-5 h-5" />;
      case 'technology':
        return <Cpu className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-[#F4EFE6] border-y border-[#E8E1D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#B85D38] block mb-2">
            Explore by Subject
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#221F1C] tracking-tight">
            Browse by Category
          </h2>
          <p className="text-sm sm:text-base text-[#5A524A] mt-2 font-sans">
            From industrial history to cutting-edge software architecture and mindful reflection.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.map((cat) => {
            const bookCount = SAMPLE_BOOKS.filter(
              (b) => b.category.toLowerCase() === cat.name.toLowerCase()
            ).length;

            return (
              <div
                key={cat.id}
                onClick={() => navigateToCategory(cat.name)}
                className="group relative bg-white p-6 sm:p-7 rounded-2xl border border-[#E8E1D5] hover:border-[#C58B39] artisan-card hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-[#FAF7F2] text-[#221F1C] flex items-center justify-center group-hover:bg-[#221F1C] group-hover:text-white transition-colors duration-200 border border-[#E8E1D5] shadow-2xs">
                      {getCategoryIcon(cat.id)}
                    </div>
                    <span className="text-xs font-semibold text-[#705E4C] bg-[#F3EDE2] border border-[#DFD5C5] px-2.5 py-1 rounded-full">
                      {bookCount} {bookCount === 1 ? 'eBook' : 'eBooks'}
                    </span>
                  </div>

                  <h3 className="font-editorial text-xl font-bold text-[#221F1C] group-hover:text-[#C58B39] transition-colors mb-2">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#5A524A] leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#F2ECE0] flex items-center justify-between text-xs font-semibold text-[#B85D38]">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
