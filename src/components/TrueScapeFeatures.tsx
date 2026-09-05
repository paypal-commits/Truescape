import React from 'react';
import { Check, CheckCircle2, Download, Laptop, ShieldCheck, Sparkles, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const TrueScapeFeatures: React.FC = () => {
  const { setView } = useStore();

  const comparisonRows = [
    {
      feature: 'Access & Delivery',
      truescape: 'Instant digital download immediately after purchase',
      traditional: 'Wait 3 to 7 days for physical delivery',
      highlight: true,
    },
    {
      feature: 'Device Compatibility',
      truescape: 'Read on phone, tablet, laptop, Kindle, or e-reader',
      traditional: 'Single physical paper copy bound to one place',
      highlight: false,
    },
    {
      feature: 'Content Structure',
      truescape: 'Practical, concise, distilled, and immediately actionable',
      traditional: 'Often padded with filler chapters and generic theory',
      highlight: true,
    },
    {
      feature: 'Shipping & Logistics',
      truescape: 'Zero shipping fees, zero lost packages, zero environmental footprint',
      traditional: 'High shipping costs, fragile packaging, delivery delays',
      highlight: false,
    },
    {
      feature: 'Lifetime Portability',
      truescape: 'Stored permanently in your digital library; always accessible',
      traditional: 'Vulnerable to damage, water, physical loss, or wear',
      highlight: true,
    },
  ];

  const pillars = [
    {
      title: 'Read Instantly',
      desc: 'Digital downloads available immediately on all your devices upon checkout.',
      icon: Download,
      accent: '#B85D38',
    },
    {
      title: 'Access Anywhere',
      desc: 'Read seamlessly on your phone, tablet, e-reader, or computer anytime.',
      icon: Laptop,
      accent: '#236B5E',
    },
    {
      title: 'Practical Content',
      desc: 'Clear, direct, and actionable guidance you can apply to your life immediately.',
      icon: Sparkles,
      accent: '#C58B39',
    },
    {
      title: 'Secure Checkout',
      desc: 'Simple, encrypted, and protected online payment processing with fast confirmation.',
      icon: ShieldCheck,
      accent: '#264653',
    },
  ];

  return (
    <div className="space-y-20 py-16 bg-[#FAF7F2]">
      {/* 4 Value Pillars: Why Readers Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#B85D38] block">
            The Digital Advantage
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#221F1C]">
            Why Readers Choose Us
          </h2>
          <p className="text-sm sm:text-base text-[#6C645C]">
            Practical knowledge delivered instantly, designed to fit into your modern life without friction.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl border border-[#E8E1D5] p-6 sm:p-7 artisan-card hover:border-[#D49746] transition-all duration-200 group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-5 shadow-xs group-hover:scale-105 transition-transform"
                  style={{ backgroundColor: pillar.accent }}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-editorial text-xl font-bold text-[#221F1C] mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#236B5E] flex-shrink-0" />
                  <span>{pillar.title}</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#6C645C] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why Choose TrueScape Comparison Matrix */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#B85D38] block">
            Direct Comparison
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#221F1C]">
            Why Choose TrueScape
          </h2>
          <p className="text-sm sm:text-base text-[#6C645C]">
            Practical knowledge delivered instantly and accessible anywhere.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E8E1D5] overflow-hidden artisan-card shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 border-b border-[#E8E1D5] bg-[#F4EFE6] text-xs font-bold uppercase tracking-wider text-[#5A524A]">
            <div className="p-4 md:col-span-4 flex items-center">Feature</div>
            <div className="p-4 md:col-span-4 bg-[#EBE3D3] text-[#221F1C] flex items-center justify-between">
              <span className="font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#236B5E]" />
                TrueScape
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#236B5E] text-white font-semibold">
                Recommended
              </span>
            </div>
            <div className="p-4 md:col-span-4 text-[#786E64] flex items-center">
              Traditional Books
            </div>
          </div>

          <div className="divide-y divide-[#E8E1D5]">
            {comparisonRows.map((row, idx) => (
              <div
                key={idx}
                className={`grid grid-cols-1 md:grid-cols-12 text-xs sm:text-sm transition-colors ${
                  row.highlight ? 'bg-[#FCFBF8]' : 'bg-white'
                }`}
              >
                <div className="p-4 md:col-span-4 font-semibold text-[#221F1C] flex items-center">
                  {row.feature}
                </div>

                <div className="p-4 md:col-span-4 bg-[#F7F3EB]/60 font-medium text-[#221F1C] flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#236B5E] flex-shrink-0 mt-0.5" />
                  <span>{row.truescape}</span>
                </div>

                <div className="p-4 md:col-span-4 text-[#786E64] flex items-start gap-2.5">
                  <X className="w-4 h-4 text-[#B85D38] flex-shrink-0 mt-0.5" />
                  <span>{row.traditional}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-[#FAF7F2] border-t border-[#E8E1D5] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#5A524A] text-center sm:text-left">
              <strong>All 7 titles by author Hamza Al_madhrahi</strong> include instant PDF & EPUB downloads.
            </div>
            <button
              onClick={() => setView('catalog')}
              className="px-6 py-2.5 rounded-xl bg-[#221F1C] text-white hover:bg-[#38322B] text-xs font-bold transition-all shadow-xs cursor-pointer border border-[#38322B]"
            >
              Browse TrueScape eBooks
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
