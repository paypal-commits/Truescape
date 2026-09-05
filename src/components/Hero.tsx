import React, { useState, useRef } from 'react';
import { ArrowRight, BookOpen, CheckCircle2, Volume2, VolumeX } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const HERO_VIDEO_URL = 'https://8pvw5imkidnwvz61.public.blob.vercel-storage.com/Create_video_for_eBook_company_202609060000.mp4';

export const Hero: React.FC = () => {
  const { setView } = useStore();
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleAudio = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
      if (!nextMuted) {
        videoRef.current.play().catch(() => {
          // Fallback if browser blocks unmuted playback
        });
      }
    }
  };

  return (
    <section className="relative overflow-hidden pt-10 pb-18 lg:pt-16 lg:pb-24 border-b border-[#E8E1D5] bg-[#FAF7F2]">
      {/* Cinematic Bookstore Background Video with Editorial Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          src={HERO_VIDEO_URL}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Warm parchment gradient overlay calibrated for 25% higher video visibility while keeping text crisp */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/65 via-[#FAF7F2]/50 to-[#FAF7F2]/70" />
      </div>

      {/* Floating Audio Toggle in the Hero Corner */}
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-8 z-20">
        <button
          id="hero-video-mute-toggle"
          type="button"
          onClick={toggleAudio}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#221F1C]/80 hover:bg-[#221F1C] text-[#FAF7F2] text-xs font-semibold backdrop-blur-md border border-[#FAF7F2]/25 shadow-md transition-all cursor-pointer hover:scale-105 active:scale-95"
          aria-label={isMuted ? 'Unmute hero video audio' : 'Mute hero video audio'}
          title={isMuted ? 'Unmute video audio' : 'Mute video audio'}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-4 h-4 text-[#B85D38]" />
              <span className="hidden sm:inline">Unmute Audio</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-[#236B5E]" />
              <span className="hidden sm:inline">Mute Audio</span>
            </>
          )}
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#DFD5C5] text-[#705E4C] text-xs sm:text-sm font-medium shadow-2xs backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-[#C58B39] animate-pulse" />
            <span>Instant eBook Downloads • Read Anytime, Anywhere</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#221F1C] leading-[1.12] drop-shadow-2xs">
            Discover eBooks That <br className="hidden sm:inline" />
            <span className="italic font-normal text-[#B85D38]">Make Life Easier</span>
          </h1>

          <p className="text-lg sm:text-xl text-[#4A443E] leading-relaxed max-w-2xl mx-auto font-sans font-medium">
            Practical digital guides to help you simplify life, master your mindset, strengthen relationships, and reach your highest goals.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              id="hero-explore-ebooks-btn"
              onClick={() => setView('catalog')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#221F1C] text-[#FAF7F2] hover:bg-[#38322B] font-medium text-base transition-all duration-200 shadow-md flex items-center justify-center gap-2.5 group cursor-pointer border border-[#38322B]"
            >
              <span>Browse eBooks</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              id="hero-browse-categories-btn"
              onClick={() => setView('categories')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/95 text-[#221F1C] hover:bg-[#F2ECE0] border border-[#D8CFBF] font-medium text-base transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer backdrop-blur-xs"
            >
              <BookOpen className="w-4 h-4 text-[#786E64]" />
              <span>Explore Categories</span>
            </button>
          </div>

          {/* Trust Markers from truescape.us */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-[#E8E1D5]/80 text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#236B5E] flex-shrink-0" />
              <span className="text-xs sm:text-sm text-[#4A443E] font-medium">Instant Digital Downloads</span>
            </div>
            <div className="flex items-center justify-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#236B5E] flex-shrink-0" />
              <span className="text-xs sm:text-sm text-[#4A443E] font-medium">Read on Any Device</span>
            </div>
            <div className="flex items-center justify-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#236B5E] flex-shrink-0" />
              <span className="text-xs sm:text-sm text-[#4A443E] font-medium">Practical, Actionable Content</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
