import React from 'react';
import { BookOpen, CheckCircle2, Download, Eye, FileText, Library, Share2, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { SAMPLE_BOOKS } from '../data/books';

export const OrderConfirmationPage: React.FC = () => {
  const { lastOrder, setView, addToast, setSampleModalBook } = useStore();

  if (!lastOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <p className="text-[#64748B]">No recent order found.</p>
        <button
          onClick={() => setView('catalog')}
          className="px-6 py-2.5 rounded-lg bg-[#191E24] text-white text-xs font-semibold"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  const handleSimulateDownload = (bookTitle: string, format: string) => {
    addToast(
      'Download Started',
      `Generating DRM-free ${format} for "${bookTitle}". Your file will begin downloading.`,
      'success'
    );
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Success Header */}
        <div className="text-center space-y-3 bg-white p-8 rounded-2xl border border-[#E8E1D5] artisan-card">
          <div className="w-16 h-16 bg-[#EAF3F0] text-[#236B5E] border border-[#D0E5DF] rounded-full flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#236B5E] block">
            Payment Confirmed • Digital Access Granted
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#221F1C]">
            Thank You for Your Order!
          </h1>
          <p className="text-sm text-[#5A524A] max-w-md mx-auto">
            Order <strong className="text-[#221F1C] font-mono">{lastOrder.id}</strong> has been processed. A receipt and backup download keys have been dispatched to <strong className="text-[#221F1C]">{lastOrder.customer.email}</strong>.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              id="confirm-open-library-btn"
              onClick={() => setView('library')}
              className="px-6 py-3 rounded-xl bg-[#221F1C] text-white hover:bg-[#38322B] text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer border border-[#38322B]"
            >
              <Library className="w-4 h-4" />
              <span>Go to My Digital Library</span>
            </button>
            <button
              onClick={() => setView('catalog')}
              className="px-6 py-3 rounded-xl bg-white border border-[#D8CFBF] text-[#221F1C] hover:bg-[#F4EFE6] text-xs font-semibold transition-colors cursor-pointer"
            >
              Browse More Books
            </button>
          </div>
        </div>

        {/* Immediate Download Hub */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8E1D5] artisan-card space-y-6">
          <div className="flex items-center justify-between border-b border-[#F2ECE0] pb-4">
            <div>
              <h2 className="font-editorial text-xl sm:text-2xl font-bold text-[#221F1C]">
                Download Your eBooks
              </h2>
              <p className="text-xs text-[#786E64] mt-0.5">
                DRM-free files. Transfer directly to Kindle, Apple Books, Kobo, or read in browser.
              </p>
            </div>
            <span className="text-xs font-semibold text-[#236B5E] bg-[#EAF3F0] border border-[#D0E5DF] px-3 py-1 rounded-full">
              Permanent Access
            </span>
          </div>

          <div className="space-y-4">
            {lastOrder.items.map((item) => {
              const fullBook = SAMPLE_BOOKS.find((b) => b.id === item.bookId);
              return (
                <div
                  key={item.bookId}
                  className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="w-14 h-20 rounded-md object-cover flex-shrink-0 book-shadow"
                    />
                    <div className="min-w-0">
                      <h3 className="font-editorial text-base font-bold text-[#221F1C] leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#786E64]">by {item.author}</p>
                      <div className="flex gap-2 mt-1">
                        <span className="text-[10px] font-mono font-semibold bg-white px-2 py-0.5 rounded border border-[#E8E1D5] text-[#5A524A]">
                          DRM-FREE
                        </span>
                        <span className="text-[10px] font-mono text-[#786E64] bg-white px-2 py-0.5 rounded border border-[#E8E1D5]">
                          EPUB • PDF
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Download and Read buttons */}
                  <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                    {fullBook && (
                      <button
                        onClick={() => setSampleModalBook(fullBook)}
                        className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-white border border-[#D8CFBF] hover:bg-[#F4EFE6] text-xs font-semibold text-[#221F1C] flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#C58B39]" />
                        <span>Read Online</span>
                      </button>
                    )}
                    <button
                      onClick={() => handleSimulateDownload(item.title, 'EPUB')}
                      className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-[#221F1C] hover:bg-[#38322B] text-xs font-bold text-white flex items-center justify-center gap-1.5 shadow-xs cursor-pointer border border-[#38322B]"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download EPUB</span>
                    </button>
                    <button
                      onClick={() => handleSimulateDownload(item.title, 'PDF')}
                      className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-[#F4EFE6] hover:bg-[#EAE2D5] text-xs font-bold text-[#4A443E] flex items-center justify-center gap-1.5 cursor-pointer border border-[#D8CFBF]"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>PDF</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Guide to Reading on Devices */}
          <div className="p-4 rounded-xl bg-[#F4EFE6] border border-[#E8E1D5] text-xs text-[#5A524A] space-y-2">
            <h4 className="font-bold text-[#221F1C] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#B85D38]" />
              <span>How to read on your favorite devices:</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div>
                <strong className="text-[#221F1C] block mb-0.5">Kindle Devices & Apps</strong>
                <p>Use Amazon's free "Send to Kindle" webpage or email your EPUB file directly to your @kindle.com address.</p>
              </div>
              <div>
                <strong className="text-[#221F1C] block mb-0.5">iPad & iPhone (Apple Books)</strong>
                <p>Simply tap the downloaded EPUB file in Safari; it will automatically open into Apple Books.</p>
              </div>
              <div>
                <strong className="text-[#221F1C] block mb-0.5">Kobo & Android</strong>
                <p>Drag the EPUB file via USB into your Kobo storage, or open in apps like Moon+ Reader, ReadEra, or Google Play Books.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Receipt Details */}
        <div className="bg-white p-6 rounded-2xl border border-[#E8E1D5] artisan-card text-xs text-[#5A524A] space-y-3">
          <div className="flex justify-between items-center border-b border-[#F2ECE0] pb-2 font-bold text-[#221F1C]">
            <span>Receipt Details</span>
            <span>Date: {lastOrder.date}</span>
          </div>
          <div className="flex justify-between">
            <span>Payment Method:</span>
            <span className="font-semibold text-[#221F1C]">
              {lastOrder.paymentMethod} (Ending in {lastOrder.paymentLast4 || '4242'})
            </span>
          </div>
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${lastOrder.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Michigan State Sales Tax (6%):</span>
            <span>${lastOrder.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm font-bold text-[#221F1C] pt-2 border-t border-[#F2ECE0]">
            <span>Total Paid:</span>
            <span>${lastOrder.total.toFixed(2)}</span>
          </div>
        </div>

      </div>
    </div>
  );
};
