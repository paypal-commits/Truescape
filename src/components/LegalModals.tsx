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
              <p className="font-semibold text-[#221F1C]">Last Updated: August 2026</p>
              <p>
                TrueScape values your privacy. We do not sell or trade your personal information. Information gathered during your order is strictly utilized to process transactions, deliver digital eBooks, and provide customer assistance.
              </p>
              <h4 className="font-bold text-[#221F1C] text-sm pt-2 font-editorial">1. Information We Collect</h4>
              <p>
                We collect essential details to fulfill your digital orders: name, email address, and billing information securely processed through our certified payment gateway.
              </p>
              <h4 className="font-bold text-[#221F1C] text-sm pt-2 font-editorial">2. Digital Security</h4>
              <p>
                All data transmission is encrypted via industry-standard SSL/TLS protocols. We never store complete credit card information on our servers.
              </p>
              <h4 className="font-bold text-[#221F1C] text-sm pt-2 font-editorial">3. Contact Official Headquarters</h4>
              <p>
                Should you have any questions about our privacy practices or this Privacy Policy, please call <strong>+1 313-564-9075</strong>, email us at <strong>Truescape00@yahoo.com</strong>, or write to us at <strong>2727 Yemans St, Hamtramck MI 48212, United States</strong>.
              </p>
            </>
          )}

          {legalModal === 'terms' && (
            <>
              <p className="font-semibold text-[#221F1C]">Last updated: August 27, 2026</p>
              <p>
                By accessing or purchasing from this store, you agree to the following terms.
              </p>
              <h4 className="font-bold text-[#221F1C] text-sm pt-2 font-editorial">1. Digital Products</h4>
              <p>
                All products sold are digital e-books delivered electronically. No physical goods will be shipped. Upon completing your purchase, you will receive access to download your e-book immediately.
              </p>
              <h4 className="font-bold text-[#221F1C] text-sm pt-2 font-editorial">2. Personal Use Only</h4>
              <p>
                All e-books are for personal use only. You may not reproduce, distribute, resell, or share the content in any form without written permission from the author.
              </p>
              <h4 className="font-bold text-[#221F1C] text-sm pt-2 font-editorial">3. Intellectual Property</h4>
              <p>
                All content within our e-books is protected by copyright. Unauthorized use or piracy is strictly prohibited.
              </p>
              <h4 className="font-bold text-[#221F1C] text-sm pt-2 font-editorial">4. Pricing & Currency</h4>
              <p>
                All prices are listed in USD. We reserve the right to change prices at any time without notice.
              </p>
              <h4 className="font-bold text-[#221F1C] text-sm pt-2 font-editorial">5. Limitation of Liability</h4>
              <p>
                We are not liable for any indirect, incidental, or consequential damages arising from the use of our digital products.
              </p>
              <h4 className="font-bold text-[#221F1C] text-sm pt-2 font-editorial">6. Governing Law & Contact</h4>
              <p>
                These terms are governed by the laws of the United States. For any questions, contact us at <strong>Truescape00@yahoo.com</strong> or call <strong>+1 313-564-9075</strong> (2727 Yemans St, Hamtramck MI 48212).
              </p>
            </>
          )}

          {legalModal === 'refund' && (
            <>
              <p className="font-semibold text-[#221F1C]">Last updated: August 26, 2026</p>
              <p className="font-medium text-[#B85D38]">
                Due to the digital nature of our products, all sales are final and non-refundable once the e-book has been delivered or accessed.
              </p>
              <h4 className="font-bold text-[#221F1C] text-sm pt-2 font-editorial">No Refunds on Digital Products</h4>
              <p>
                Because our e-books are delivered instantly as digital downloads, we are unable to offer refunds, exchanges, or cancellations after purchase. This policy exists because digital files cannot be "returned" once accessed.
              </p>
              <h4 className="font-bold text-[#221F1C] text-sm pt-2 font-editorial">Exceptions</h4>
              <p>
                We will issue a full refund in the following cases:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>You were charged more than once for the same order</li>
                <li>The file is corrupted or cannot be opened, and we are unable to provide a working replacement within 3 business days</li>
              </ul>
              <h4 className="font-bold text-[#221F1C] text-sm pt-2 font-editorial">How to Request a Refund</h4>
              <p>
                If you believe you qualify for a refund under the exceptions above, please contact us at <strong>Truescape00@yahoo.com</strong> within 7 days of your purchase, including your order number and a description of the issue.
              </p>
              <h4 className="font-bold text-[#221F1C] text-sm pt-2 font-editorial">Chargebacks</h4>
              <p>
                We take fraudulent chargebacks seriously. Filing a chargeback for a successfully delivered digital product may result in being permanently banned from purchasing from our store.
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
