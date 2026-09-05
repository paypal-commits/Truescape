import React, { useEffect, useState } from 'react';
import { ArrowUp, BookOpen, Compass, Heart, ShieldCheck, Sparkles } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedBooks } from './components/FeaturedBooks';
import { CategorySection } from './components/CategorySection';
import { CatalogPage } from './components/CatalogPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutPage } from './components/CheckoutPage';
import { OrderConfirmationPage } from './components/OrderConfirmationPage';
import { CustomerLibraryPage } from './components/CustomerLibraryPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { Footer } from './components/Footer';
import { TrueScapeFeatures } from './components/TrueScapeFeatures';
import { SampleReaderModal } from './components/SampleReaderModal';
import { SearchModal } from './components/SearchModal';
import { LegalModals } from './components/LegalModals';
import { ToastContainer } from './components/ToastContainer';
import { StoreProvider, useStore } from './context/StoreContext';

const MainContent: React.FC = () => {
  const { view, setView } = useStore();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#221F1C]">
      {/* Sticky Responsive Header */}
      <Navbar />

      {/* Main View Switcher */}
      <main className="flex-1">
        {view === 'home' && (
          <>
            <Hero />
            
            {/* Editorial Value Strip */}
            <section className="bg-[#FDFBF7] border-b border-[#E8E1D5] py-8">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-4 p-2">
                    <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] border border-[#E8E1D5] flex items-center justify-center text-[#221F1C] flex-shrink-0 artisan-card">
                      <ShieldCheck className="w-6 h-6 text-[#236B5E]" />
                    </div>
                    <div>
                      <h4 className="font-editorial text-lg font-bold text-[#221F1C]">
                        DRM-Free Freedom
                      </h4>
                      <p className="text-xs text-[#786E64] mt-1 leading-relaxed">
                        Read on any device. Download genuine EPUB and PDF editions with permanent personal ownership.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center md:items-start gap-4 p-2">
                    <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] border border-[#E8E1D5] flex items-center justify-center text-[#221F1C] flex-shrink-0 artisan-card">
                      <Sparkles className="w-6 h-6 text-[#B85D38]" />
                    </div>
                    <div>
                      <h4 className="font-editorial text-lg font-bold text-[#221F1C]">
                        Curated Literary Substance
                      </h4>
                      <p className="text-xs text-[#786E64] mt-1 leading-relaxed">
                        Handpicked by readers who value enduring ideas, insightful fiction, and rigorous non-fiction.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center md:items-start gap-4 p-2">
                    <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] border border-[#E8E1D5] flex items-center justify-center text-[#221F1C] flex-shrink-0 artisan-card">
                      <Compass className="w-6 h-6 text-[#4A443E]" />
                    </div>
                    <div>
                      <h4 className="font-editorial text-lg font-bold text-[#221F1C]">
                        Hamtramck Heritage
                      </h4>
                      <p className="text-xs text-[#786E64] mt-1 leading-relaxed">
                        Rooted in Michigan's storied community of cultural resilience, craftsmanship, and discovery.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <FeaturedBooks />
            <TrueScapeFeatures />
            <CategorySection />

            {/* Editorial Invitation Banner */}
            <section className="py-16 sm:py-20 bg-[#F4EFE6] border-b border-[#E8E1D5]">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#B85D38]">
                  From Hamtramck, Michigan to Readers Everywhere
                </span>
                <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#221F1C] leading-tight max-w-2xl mx-auto">
                  Expand Your Library with Works That Matter
                </h2>
                <p className="text-sm sm:text-base text-[#5A524A] max-w-xl mx-auto font-sans">
                  Join our community of thoughtful readers. Enjoy instant delivery, DRM-free downloads, and human-first customer service.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={() => setView('catalog')}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#221F1C] text-white hover:bg-[#38322B] text-sm font-bold transition-all shadow-xs cursor-pointer border border-[#38322B]"
                  >
                    Browse Complete Catalog
                  </button>
                  <button
                    onClick={() => setView('about')}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white border border-[#D8CFBF] text-[#221F1C] hover:bg-[#FAF7F2] text-sm font-semibold transition-colors cursor-pointer"
                  >
                    Our Story & Mission
                  </button>
                </div>
              </div>
            </section>
          </>
        )}

        {view === 'catalog' && <CatalogPage />}
        {view === 'categories' && (
          <div className="py-8">
            <CategorySection />
          </div>
        )}
        {view === 'product-detail' && <ProductDetailPage />}
        {view === 'checkout' && <CheckoutPage />}
        {view === 'order-confirmation' && <OrderConfirmationPage />}
        {view === 'library' && <CustomerLibraryPage />}
        {view === 'about' && <AboutPage />}
        {view === 'contact' && <ContactPage />}
      </main>

      {/* Comprehensive Footer */}
      <Footer />

      {/* Global Interactive Overlays */}
      <CartDrawer />
      <SampleReaderModal />
      <SearchModal />
      <LegalModals />
      <ToastContainer />

      {/* Floating Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 p-3 rounded-full bg-[#221F1C] text-white hover:bg-[#38322B] border border-[#38322B] shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Scroll back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}
