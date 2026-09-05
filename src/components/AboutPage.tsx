import React from 'react';
import { BookOpen, CheckCircle2, Feather, HeartHandshake, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AboutPage: React.FC = () => {
  const { setView } = useStore();

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Editorial Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4EFE6] border border-[#E8E1D5] text-[#5A524A] text-xs font-semibold">
            <MapPin className="w-3.5 h-3.5 text-[#B85D38]" />
            <span>Rooted in Hamtramck, Michigan</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-[#221F1C] leading-tight">
            Reading as an Art, <br />
            <span className="italic font-normal text-[#B85D38]">Books Built to Last.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#5A524A] leading-relaxed font-sans">
            Truescape is an independent online bookstore based in Hamtramck, Michigan. We are dedicated to curating digital books that inform, inspire, and endure across generations.
          </p>
        </div>

        {/* Brand Story Section */}
        <section className="bg-white rounded-2xl border border-[#E8E1D5] p-8 sm:p-12 artisan-card space-y-6">
          <div className="flex items-center gap-2 text-[#B85D38] font-bold text-xs uppercase tracking-wider">
            <Feather className="w-4 h-4" />
            <span>Our Brand Story</span>
          </div>

          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#221F1C]">
            Why We Founded Truescape
          </h2>

          <div className="prose text-sm sm:text-base text-[#4A443E] space-y-4 leading-relaxed font-sans">
            <p>
              In a digital marketplace crowded with disposable content, algorithmically driven recommendations, and restrictive walled gardens, Truescape was established with a singular conviction: readers deserve digital books that feel like genuine personal treasures.
            </p>
            <p>
              Hamtramck, Michigan has always been defined by quiet craftsmanship, cultural diversity, and deep-seated independence. That same spirit shapes how we select every single title in our catalog. Rather than attempting to stock millions of unvetted titles, Truescape deliberately curates eBooks of notable depth, stylistic brilliance, and lasting relevance.
            </p>
            <p>
              When you purchase an eBook through Truescape, you receive universal, DRM-free files in standard EPUB and PDF formats. You can read them on any device you choose, back them up on your own storage, and enjoy them without platform lock-in.
            </p>
          </div>
        </section>

        {/* Mission & Purpose */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#F4EFE6] rounded-2xl border border-[#E8E1D5] p-8 artisan-card space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#221F1C] text-white flex items-center justify-center border border-[#38322B] shadow-xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-editorial text-2xl font-bold text-[#221F1C]">
              Our Mission
            </h3>
            <p className="text-sm text-[#5A524A] leading-relaxed">
              To make exceptional reading accessible, open, and respectful of the reader's autonomy. We champion clear typography, robust author voices, and digital ownership free from arbitrary restrictions.
            </p>
          </div>

          <div className="bg-[#F4EFE6] rounded-2xl border border-[#E8E1D5] p-8 artisan-card space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#B85D38] text-white flex items-center justify-center shadow-xs">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-editorial text-2xl font-bold text-[#221F1C]">
              Reader-First Publishing
            </h3>
            <p className="text-sm text-[#5A524A] leading-relaxed">
              We treat readers as discerning partners rather than data metrics. Every book formatting pass is checked for pristine typography, legible contrast, and broad device compatibility.
            </p>
          </div>
        </div>

        {/* What Makes Truescape Different (4 Pillars) */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#B85D38] block mb-1">
              Guiding Principles
            </span>
            <h2 className="font-editorial text-3xl font-bold text-[#221F1C]">
              What Makes Truescape Different
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#E8E1D5] artisan-card space-y-3">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#236B5E]" />
                <h4 className="font-editorial text-lg font-bold text-[#221F1C]">
                  True DRM-Free Ownership
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-[#5A524A] leading-relaxed">
                When you buy an eBook here, you own the actual digital file. We never revoke access, alter texts post-purchase, or tether you to proprietary reading software.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E8E1D5] artisan-card space-y-3">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#236B5E]" />
                <h4 className="font-editorial text-lg font-bold text-[#221F1C]">
                  Curated Catalog Quality
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-[#5A524A] leading-relaxed">
                Every title is personally evaluated for intellectual clarity, compelling narrative structure, and reader resonance. We prioritize substance over algorithm trends.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E8E1D5] artisan-card space-y-3">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#236B5E]" />
                <h4 className="font-editorial text-lg font-bold text-[#221F1C]">
                  Typographic Craftsmanship
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-[#5A524A] leading-relaxed">
                Our eBooks are calibrated with balanced leading, comfortable font pairings, and proper hyphenation dictionaries so long-form reading feels effortless on screens.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E8E1D5] artisan-card space-y-3">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#236B5E]" />
                <h4 className="font-editorial text-lg font-bold text-[#221F1C]">
                  Accessible Customer Care
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-[#5A524A] leading-relaxed">
                Reach a real human who cares about books. If you ever have trouble transferring a file to your e-reader, our Hamtramck support team is directly reachable by phone and email.
              </p>
            </div>
          </div>
        </section>

        {/* Editorial Community Banner */}
        <div className="bg-[#221F1C] text-[#FAF7F2] p-8 sm:p-12 rounded-2xl border border-[#38322B] shadow-xl text-center space-y-6">
          <span className="text-xs uppercase font-bold tracking-widest text-[#B85D38]">
            Hamtramck, Michigan Community
          </span>
          <blockquote className="font-editorial text-xl sm:text-2xl lg:text-3xl italic max-w-3xl mx-auto leading-relaxed">
            "A bookstore is not just a commercial warehouse of paper or pixels. It is a quiet sanctuary where ideas cross generations and strangers share a world."
          </blockquote>
          <div>
            <button
              onClick={() => setView('catalog')}
              className="px-8 py-3.5 rounded-xl bg-[#FAF7F2] text-[#221F1C] hover:bg-white text-xs font-bold transition-colors shadow-xs cursor-pointer border border-[#E8E1D5]"
            >
              Explore the Truescape Catalog &rarr;
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
