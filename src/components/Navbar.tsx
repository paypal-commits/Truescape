import React, { useState } from 'react';
import { BookOpen, Library, Menu, Search, ShoppingBag, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ViewMode } from '../types';

export const Navbar: React.FC = () => {
  const {
    view,
    setView,
    cartCount,
    setIsCartOpen,
    setIsSearchModalOpen,
    purchasedBookIds,
    setSelectedCategory,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (targetView: ViewMode, category: string | null = null) => {
    setSelectedCategory(category);
    setView(targetView);
    setMobileMenuOpen(false);
  };

  return (
    <div className="sticky top-0 z-40">
      {/* Top Announcement Bar from truescape.us */}
      <div className="bg-[#221F1C] text-[#FAF7F2] text-[11px] sm:text-xs py-2 px-4 border-b border-[#38322B]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C58B39] animate-ping" />
            <span className="tracking-wide font-medium">
              Instant eBook Downloads • Read Anytime, Anywhere
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-5 text-[#C8BFB3] text-[11px]">
            <a href="tel:3135649075" className="hover:text-white transition-colors">
              Support: 313-564-9075
            </a>
            <span className="text-[#5E554C]">|</span>
            <a href="mailto:Truescape00@yahoo.com" className="hover:text-white transition-colors">
              Truescape00@yahoo.com
            </a>
          </div>
        </div>
      </div>

      <header className="bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8E1D5] transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Origin Tag */}
          <div className="flex items-center space-x-3">
            <button
              id="brand-logo-btn"
              onClick={() => handleNav('home')}
              className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-[#221F1C] text-[#FAF7F2] flex items-center justify-center shadow-xs group-hover:bg-[#38322B] transition-colors border border-[#3D3732]">
                <BookOpen className="w-5 h-5 text-[#FAF7F2]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[#221F1C]">
                    Truescape
                  </span>
                  <span className="hidden sm:inline-block text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full bg-[#F3EDE2] text-[#705E4C] border border-[#DFD5C5]">
                    Hamtramck, MI
                  </span>
                </div>
                <p className="text-[11px] text-[#786E64] tracking-normal font-sans hidden sm:block">
                  Modern Digital Bookstore
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              id="nav-link-home"
              onClick={() => handleNav('home')}
              className={`text-sm font-medium transition-colors hover:text-[#221F1C] cursor-pointer ${
                view === 'home' ? 'text-[#221F1C] font-semibold underline underline-offset-8 decoration-[#C58B39]' : 'text-[#6C645C]'
              }`}
            >
              Home
            </button>
            <button
              id="nav-link-ebooks"
              onClick={() => handleNav('catalog')}
              className={`text-sm font-medium transition-colors hover:text-[#221F1C] cursor-pointer ${
                view === 'catalog' ? 'text-[#221F1C] font-semibold underline underline-offset-8 decoration-[#C58B39]' : 'text-[#6C645C]'
              }`}
            >
              eBooks
            </button>
            <button
              id="nav-link-categories"
              onClick={() => handleNav('categories')}
              className={`text-sm font-medium transition-colors hover:text-[#221F1C] cursor-pointer ${
                view === 'categories' ? 'text-[#221F1C] font-semibold underline underline-offset-8 decoration-[#C58B39]' : 'text-[#6C645C]'
              }`}
            >
              Categories
            </button>
            <button
              id="nav-link-about"
              onClick={() => handleNav('about')}
              className={`text-sm font-medium transition-colors hover:text-[#221F1C] cursor-pointer ${
                view === 'about' ? 'text-[#221F1C] font-semibold underline underline-offset-8 decoration-[#C58B39]' : 'text-[#6C645C]'
              }`}
            >
              About
            </button>
            <button
              id="nav-link-contact"
              onClick={() => handleNav('contact')}
              className={`text-sm font-medium transition-colors hover:text-[#221F1C] cursor-pointer ${
                view === 'contact' ? 'text-[#221F1C] font-semibold underline underline-offset-8 decoration-[#C58B39]' : 'text-[#6C645C]'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Action Icons: Search, Library, Cart, Mobile Menu */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search Button */}
            <button
              id="header-search-btn"
              onClick={() => setIsSearchModalOpen(true)}
              aria-label="Search eBooks"
              className="p-2.5 rounded-full text-[#5E554C] hover:text-[#221F1C] hover:bg-[#F2ECE0] transition-colors cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* My Digital Library */}
            <button
              id="header-library-btn"
              onClick={() => handleNav('library')}
              aria-label="My Digital Library"
              className={`relative p-2.5 rounded-full transition-colors cursor-pointer ${
                view === 'library'
                  ? 'text-[#221F1C] bg-[#EBE2D4]'
                  : 'text-[#5E554C] hover:text-[#221F1C] hover:bg-[#F2ECE0]'
              }`}
              title="My Digital Library"
            >
              <Library className="w-5 h-5" />
              {purchasedBookIds.length > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#236B5E] rounded-full ring-2 ring-[#FAF7F2]" />
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              id="header-cart-btn"
              onClick={() => setIsCartOpen(true)}
              aria-label="View Shopping Cart"
              className="relative flex items-center gap-2 p-2.5 sm:px-4 sm:py-2 rounded-full bg-[#221F1C] text-[#FAF7F2] hover:bg-[#38322B] transition-colors shadow-xs cursor-pointer border border-[#38322B]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider">
                Cart
              </span>
              {cartCount > 0 && (
                <span className="bg-[#C58B39] text-white text-[11px] font-bold px-2 py-0.5 rounded-full leading-none">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-lg text-[#5E554C] hover:text-[#221F1C] hover:bg-[#F2ECE0] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF7F2] border-b border-[#E8E1D5] px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => handleNav('home')}
              className={`text-left text-base font-medium py-2 ${
                view === 'home' ? 'text-[#221F1C] font-bold' : 'text-[#6C645C]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNav('catalog')}
              className={`text-left text-base font-medium py-2 ${
                view === 'catalog' ? 'text-[#221F1C] font-bold' : 'text-[#6C645C]'
              }`}
            >
              eBooks Catalog
            </button>
            <button
              onClick={() => handleNav('categories')}
              className={`text-left text-base font-medium py-2 ${
                view === 'categories' ? 'text-[#221F1C] font-bold' : 'text-[#6C645C]'
              }`}
            >
              Categories
            </button>
            <button
              onClick={() => handleNav('library')}
              className={`text-left text-base font-medium py-2 flex items-center justify-between ${
                view === 'library' ? 'text-[#221F1C] font-bold' : 'text-[#6C645C]'
              }`}
            >
              <span>My Digital Library</span>
              <span className="text-xs bg-[#EBE2D4] text-[#221F1C] px-2 py-0.5 rounded-full font-semibold">
                {purchasedBookIds.length} books
              </span>
            </button>
            <button
              onClick={() => handleNav('about')}
              className={`text-left text-base font-medium py-2 ${
                view === 'about' ? 'text-[#221F1C] font-bold' : 'text-[#6C645C]'
              }`}
            >
              About Truescape
            </button>
            <button
              onClick={() => handleNav('contact')}
              className={`text-left text-base font-medium py-2 ${
                view === 'contact' ? 'text-[#221F1C] font-bold' : 'text-[#6C645C]'
              }`}
            >
              Contact & Support
            </button>
          </div>

          <div className="pt-4 border-t border-[#E8E1D5] text-xs text-[#786E64] flex justify-between items-center">
            <span>Hamtramck, Michigan</span>
            <span>313-564-9075</span>
          </div>
        </div>
      )}
      </header>
    </div>
  );
};
