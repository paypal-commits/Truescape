import React, { useState } from 'react';
import { BookOpen, Moon, ShoppingBag, Sun, Type, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const SampleReaderModal: React.FC = () => {
  const { sampleModalBook, setSampleModalBook, addToCart, setView } = useStore();
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('base');
  const [theme, setTheme] = useState<'parchment' | 'light' | 'dark'>('parchment');

  if (!sampleModalBook) return null;

  const handleBuy = () => {
    addToCart(sampleModalBook, 1);
    setSampleModalBook(null);
    setView('checkout');
  };

  const getThemeStyles = () => {
    switch (theme) {
      case 'dark':
        return 'bg-[#1F1D1A] text-[#EDE8DF] border-[#38342E]';
      case 'light':
        return 'bg-white text-[#221F1C] border-[#E8E1D5]';
      case 'parchment':
      default:
        return 'bg-[#FAF7F2] text-[#221F1C] border-[#E8E1D5]';
    }
  };

  const getTextSize = () => {
    switch (fontSize) {
      case 'sm':
        return 'text-sm sm:text-base leading-relaxed';
      case 'lg':
        return 'text-lg sm:text-xl leading-relaxed';
      case 'xl':
        return 'text-xl sm:text-2xl leading-loose';
      case 'base':
      default:
        return 'text-base sm:text-lg leading-relaxed';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-3xl rounded-2xl shadow-2xl border overflow-hidden flex flex-col max-h-[90vh] ${getThemeStyles()}`}
      >
        {/* Header Toolbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-inherit bg-black/5">
          <div className="flex items-center gap-3 min-w-0">
            <BookOpen className="w-5 h-5 text-[#C58B39] flex-shrink-0" />
            <div className="min-w-0">
              <h3 className="font-editorial text-base sm:text-lg font-bold truncate">
                {sampleModalBook.title}
              </h3>
              <p className="text-xs opacity-75 truncate">
                by {sampleModalBook.author} • Sample Chapter
              </p>
            </div>
          </div>

          {/* Controls: Font Size, Theme, Close */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Font size toggle */}
            <div className="flex items-center gap-1 bg-black/10 rounded-lg p-1">
              <button
                onClick={() => setFontSize('sm')}
                className={`px-2 py-1 text-xs font-bold rounded cursor-pointer ${
                  fontSize === 'sm' ? 'bg-white text-black shadow-xs' : 'opacity-70 hover:opacity-100'
                }`}
                title="Small text"
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('base')}
                className={`px-2 py-1 text-xs font-bold rounded cursor-pointer ${
                  fontSize === 'base' ? 'bg-white text-black shadow-xs' : 'opacity-70 hover:opacity-100'
                }`}
                title="Normal text"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className={`px-2 py-1 text-xs font-bold rounded cursor-pointer ${
                  fontSize === 'lg' ? 'bg-white text-black shadow-xs' : 'opacity-70 hover:opacity-100'
                }`}
                title="Large text"
              >
                A+
              </button>
            </div>

            {/* Theme selector */}
            <div className="flex items-center gap-1 bg-black/10 rounded-lg p-1">
              <button
                onClick={() => setTheme('parchment')}
                className={`w-6 h-6 rounded-md bg-[#FAF7F2] border border-[#D8CFBF] cursor-pointer ${
                  theme === 'parchment' ? 'ring-2 ring-[#C58B39]' : ''
                }`}
                title="Parchment Theme"
              />
              <button
                onClick={() => setTheme('light')}
                className={`w-6 h-6 rounded-md bg-white border border-[#D8CFBF] cursor-pointer ${
                  theme === 'light' ? 'ring-2 ring-[#C58B39]' : ''
                }`}
                title="Light Theme"
              />
              <button
                onClick={() => setTheme('dark')}
                className={`w-6 h-6 rounded-md bg-[#1F1D1A] border border-[#443E37] cursor-pointer ${
                  theme === 'dark' ? 'ring-2 ring-[#C58B39]' : ''
                }`}
                title="Dark Theme"
              />
            </div>

            {/* Close Button */}
            <button
              onClick={() => setSampleModalBook(null)}
              className="p-2 rounded-lg hover:bg-black/10 transition-colors ml-1 cursor-pointer"
              aria-label="Close Sample Reader"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Reader Body */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-12 py-8 space-y-6 font-editorial">
          <div className="text-center pb-6 border-b border-inherit">
            <span className="text-xs uppercase tracking-widest opacity-60 font-sans font-semibold">
              Truescape Digital Edition Excerpt
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2">
              {sampleModalBook.sampleChapterTitle}
            </h2>
          </div>

          <div className={`space-y-5 ${getTextSize()}`}>
            {sampleModalBook.sampleChapterContent.map((paragraph, index) => (
              <p key={index} className="indent-6 sm:indent-8 font-serif leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* End of Sample Notice and Purchase Prompt */}
          <div className="mt-12 pt-8 border-t border-inherit text-center space-y-4 font-sans">
            <div className="inline-block p-4 sm:p-5 rounded-2xl bg-black/5 border border-inherit max-w-lg mx-auto">
              <span className="text-xs uppercase font-bold tracking-wider text-[#B85D38] block mb-1">
                End of Sample Chapter
              </span>
              <p className="text-sm opacity-90 mb-3 font-sans">
                Enjoyed this preview? Continue reading the complete unabridged edition ({sampleModalBook.pageCount} pages) immediately.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleBuy}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#221F1C] text-white hover:bg-[#38322B] text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer border border-[#38322B]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Buy Complete eBook (${sampleModalBook.price.toFixed(2)})</span>
                </button>
                <button
                  onClick={() => setSampleModalBook(null)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-inherit text-xs font-semibold hover:bg-black/5 transition-colors cursor-pointer"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
