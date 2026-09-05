import React from 'react';
import { ShieldCheck, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const LegalModals: React.FC = () => {
  const { legalModal, setLegalModal } = useStore();

  if (!legalModal) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#E8E1D5] overflow-hidden flex flex-col max-h-[85vh] artisan-card">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E1D5] bg-[#FAF7F2]">
          <div className="flex items-center gap-2 text-[#221F1C]">
            <ShieldCheck className="w-5 h-5 text-[#B85D38]" />
            <h3 className="font-editorial text-lg font-bold">
              {legalModal === 'privacy' && 'Privacy Policy'}
              {legalModal === 'terms' && 'Terms & Conditions'}
              {legalModal === 'refund' && 'Refund & Exchange Policy'}
            </h3>
          </div>
          <button
            onClick={() => setLegalModal(null)}
            className="p-1.5 rounded-lg text-[#786E64] hover:bg-[#F4EFE6] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-4 text-xs sm:text-sm text-[#4A443E] leading-relaxed">
          {legalModal === 'privacy' && (
            <>
              <p className="font-semibold text-[#221F1C]">Last Updated: {new Date().getFullYear()}</p>
              <p>
                At Truescape (Hamtramck, Michigan), we believe your reading habits are personal and sacred. We do not track page-turns, sell customer data to advertising brokers, or monitor reading speed.
              </p>
              <h4 className="font-bold text-[#221F1C] text-sm pt-2 font-editorial">1. Information We Collect</h4>
              <p>
                We only collect information strictly necessary to process your payment and deliver digital files (your name, email address, and payment credentials handled securely via our payment processor).
              </p>
              <h4 className="font-bold text-[#221F1C] text-sm pt-2 font-editorial">2. Data Security & Storage</h4>
              <p>
                All electronic transactions are processed using industry-standard 256-bit encryption. Payment card numbers are never stored in raw form on Truescape servers.
              </p>
              <h4 className="font-bold text-[#221F1C] text-sm pt-2 font-editorial">3. Contacting Us</h4>
              <p>
                Questions regarding our privacy practices may be directed to our Hamtramck headquarters at <strong>2018hamza750@gmail.com</strong> or by phone at <strong>313-564-9075</strong>.
              </p>
            </>
          )}

          {legalModal === 'terms' && (
            <>
              <p className="font-semibold text-[#221F1C]">Effective: {new Date().getFullYear()}</p>
              <p>
                By purchasing digital eBooks through Truescape, you enter into a digital agreement granting you a permanent, non-exclusive personal reading license.
              </p>
              <h4 className="font-bold text-[#221F1C] text-sm pt-2 font-editorial">1. DRM-Free Personal License</h4>
              <p>
                Truescape files are delivered without proprietary digital rights management (DRM) locks so you can read them on your chosen devices. However, you agree not to redistribute, resell, or publicly broadcast the files in violation of copyright law.
              </p>
              <h4 className="font-bold text-[#221F1C] text-sm pt-2 font-editorial">2. Immediate Delivery</h4>
              <p>
                Because items are digital goods, access begins immediately upon payment confirmation.
              </p>
              <h4 className="font-bold text-[#221F1C] text-sm pt-2 font-editorial">3. Jurisdiction</h4>
              <p>
                These terms are governed in accordance with the laws of the State of Michigan, United States.
              </p>
            </>
          )}

          {legalModal === 'refund' && (
            <>
              <p className="font-semibold text-[#221F1C]">Effective: {new Date().getFullYear()}</p>
              <p>
                We stand firmly behind the quality and integrity of our digital book editions.
              </p>
              <h4 className="font-bold text-[#221F1C] text-sm pt-2 font-editorial">1. Technical Guarantee</h4>
              <p>
                If a downloaded file is damaged, contains typographical defects, or fails to render on standard e-readers, our support team will promptly issue a corrected file or provide full technical assistance.
              </p>
              <h4 className="font-bold text-[#221F1C] text-sm pt-2 font-editorial">2. 14-Day Satisfaction Window</h4>
              <p>
                If an unresolved technical defect prevents you from enjoying the eBook, you may request a refund within 14 days of purchase by contacting <strong>2018hamza750@gmail.com</strong> with your order confirmation ID.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAF7F2] border-t border-[#E8E1D5] text-right">
          <button
            onClick={() => setLegalModal(null)}
            className="px-5 py-2.5 rounded-xl bg-[#221F1C] text-white text-xs font-semibold hover:bg-[#38322B] transition-colors cursor-pointer border border-[#38322B] shadow-xs"
          >
            I Understand & Close
          </button>
        </div>

      </div>
    </div>
  );
};
