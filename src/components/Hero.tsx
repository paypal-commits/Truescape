import React from 'react';
import { ArrowRight, BookOpen, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import heroBgImage from '../assets/images/bookstore_hero_bg_1788636090859.jpg';

export const Hero: React.FC = () => {
  const { setView } = useStore();

  return (
    <section className="relative overflow-hidden pt-10 pb-18 lg:pt-16 lg:pb-24 border-b border-[#E8E1D5] bg-[#FAF7F2]">
      {/* Photographic Bookstore Background with Editorial Veil */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={heroBgImage}
          alt="Sunlit shelves of an artisan bookstore"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Warm parchment gradient overlay ensuring pristine contrast & readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/92 via-[#FAF7F2]/82 to-[#FAF7F2]/95 backdrop-blur-[1px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#DFD5C5] text-[#705E4C] text-xs sm:text-sm font-medium shadow-2xs backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-[#C58B39] animate-pulse" />
            <span>Independent Digital Bookstore • Hamtramck, MI</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#221F1C] leading-[1.12] drop-shadow-2xs">
            Stories, Knowledge & Ideas — <span className="italic font-normal text-[#B85D38]">All in One Place.</span>
          </h1>

          <p className="text-lg sm:text-xl text-[#4A443E] leading-relaxed max-w-2xl mx-auto font-sans">
            Discover digital books that inspire, educate, entertain, and expand your world. 
            Enjoy instant DRM-free downloads, clean typography, and timeless curation.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              id="hero-explore-ebooks-btn"
              onClick={() => setView('catalog')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#221F1C] text-[#FAF7F2] hover:bg-[#38322B] font-medium text-base transition-all duration-200 shadow-md flex items-center justify-center gap-2.5 group cursor-pointer border border-[#38322B]"
            >
              <span>Explore eBooks</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              id="hero-browse-categories-btn"
              onClick={() => setView('categories')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/95 text-[#221F1C] hover:bg-[#F2ECE0] border border-[#D8CFBF] font-medium text-base transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer backdrop-blur-xs"
            >
              <BookOpen className="w-4 h-4 text-[#786E64]" />
              <span>Browse Categories</span>
            </button>
          </div>

          {/* Trust Markers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-[#E8E1D5]/80 text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#236B5E] flex-shrink-0" />
              <span className="text-xs sm:text-sm text-[#4A443E] font-medium">Instant DRM-Free EPUB & PDF</span>
            </div>
            <div className="flex items-center justify-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#236B5E] flex-shrink-0" />
              <span className="text-xs sm:text-sm text-[#4A443E] font-medium">Compatible with Kindle & Kobo</span>
            </div>
            <div className="flex items-center justify-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#236B5E] flex-shrink-0" />
              <span className="text-xs sm:text-sm text-[#4A443E] font-medium">Permanent Library Access</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
