import React from 'react';
import { BookOpen, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/books';
import { ViewMode } from '../types';

export const Footer: React.FC = () => {
  const { setView, setSelectedCategory, setLegalModal } = useStore();
  const currentYear = new Date().getFullYear();

  const handleNav = (targetView: ViewMode, category: string | null = null) => {
    setSelectedCategory(category);
    setView(targetView);
  };

  return (
    <footer className="bg-[#1E1B18] text-[#FAF7F2] pt-16 pb-12 border-t border-[#2E2925]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#2E2925]">
          
          {/* Column 1: Brand Wordmark & Story */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#C58B39] text-[#1E1B18] flex items-center justify-center font-bold shadow-xs">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="font-editorial text-2xl font-bold tracking-tight text-white">
                Truescape
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#A69C91] leading-relaxed max-w-sm font-sans">
              An independent digital bookstore based in Hamtramck, Michigan. We curate enduring eBooks in DRM-free formats designed to inspire, educate, and expand your world.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#D4CBC0] pt-1">
              <ShieldCheck className="w-4 h-4 text-[#2A9D8F]" />
              <span>100% DRM-Free • Instant Delivery</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D49746]">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#D4CBC0]">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('catalog')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  All eBooks
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('categories')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Browse Categories
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('library')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  My Digital Library
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Truescape
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact & Support
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Featured Categories */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D49746]">
              eBook Categories
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-[#D4CBC0]">
              {CATEGORIES.slice(0, 8).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleNav('catalog', cat.name)}
                  className="text-left hover:text-white transition-colors truncate cursor-pointer"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Column 4: Contact Information */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D49746]">
              Contact Headquarters
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-[#D4CBC0]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D49746] flex-shrink-0 mt-0.5" />
                <span>
                  Truescape<br />
                  2727 Yemans St<br />
                  Hamtramck MI 48212, USA
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D49746] flex-shrink-0" />
                <a href="tel:3135649075" className="hover:text-white transition-colors">
                  +1 313-564-9075
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D49746] flex-shrink-0" />
                <a
                  href="mailto:Truescape00@yahoo.com"
                  className="hover:text-white transition-colors break-all"
                >
                  Truescape00@yahoo.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal & Attribution Bar */}
        <div className="pt-8 flex flex-col items-center justify-center space-y-4 text-xs text-[#A69C91] text-center">
          <div className="flex flex-wrap items-center justify-center gap-6 text-[#D4CBC0]">
            <button
              onClick={() => setLegalModal('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setLegalModal('terms')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <button
              onClick={() => setLegalModal('refund')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Refund Policy
            </button>
          </div>

          <p>
            &copy; {currentYear} Truescape. All rights reserved. Based in Hamtramck, Michigan.
          </p>

          <p className="text-xs text-[#8F857A]">
            Developed by <a href="https://iwebnext.com" target="_blank" rel="noopener noreferrer" className="text-[#D49746] hover:underline font-medium">iWebNext</a>
          </p>
        </div>

      </div>
    </footer>
  );
};
