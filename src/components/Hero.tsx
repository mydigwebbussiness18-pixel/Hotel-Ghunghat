import React, { useState, useEffect } from 'react';
import { Star, ChevronRight, Calendar, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { HOTEL_IMAGES, HOTEL_INFO } from '../constants/hotelData';

interface HeroProps {
  onOpenBooking: (initialData?: { checkIn?: string; checkOut?: string; adults?: number }) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const { t } = useLanguage();
  
  // Quick booking state
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [adults, setAdults] = useState(2);

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenBooking({ checkIn, checkOut, adults });
  };

  return (
    <section id="home" className="relative min-h-[92vh] flex flex-col justify-between pt-28 pb-12 overflow-hidden">
      {/* Background Image with Cinematic 3D Depth Parallax & Contrast Scrim */}
      <div
        className="absolute inset-0 -z-10 overflow-hidden"
        style={{
          transform: `translate3d(0, ${scrollY * 0.32}px, 0) scale(${1 + scrollY * 0.00025})`,
          willChange: 'transform'
        }}
      >
        <img
          src={HOTEL_IMAGES.hero}
          alt="Hotel Ghunghat exterior entrance dusk architecture in Gandhinagar"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1325] via-[#0B1325]/75 to-[#0B1325]/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1325]/90 via-[#0B1325]/60 to-transparent" />
        <div className="absolute inset-0 bg-radial-[circle_at_center,_transparent_0%,_rgba(11,19,37,0.4)_100%]" />
      </div>

      {/* Main Hero Content with 3D Spatial Drift */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-12"
        style={{
          transform: `translate3d(0, ${scrollY * 0.12}px, 0)`,
          opacity: Math.max(0.1, 1 - scrollY / 850),
          willChange: 'transform, opacity'
        }}
      >
        <div className="max-w-3xl space-y-6">
          
          {/* Provenance Tag */}
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium tracking-[0.2em] text-[#E6CA65] uppercase">
            <span>Gandhinagar</span>
            <span aria-hidden="true" className="w-1 h-1 rounded-full bg-[#E6CA65]/60" />
            <span>Sector-26 GIDC</span>
            <span aria-hidden="true" className="w-1 h-1 rounded-full bg-[#E6CA65]/60" />
            <span>Gujarat</span>
          </div>

          {/* Heading */}
          <div className="flex items-center gap-3 pt-1">
            <span className="h-px w-6 sm:w-10 bg-gradient-to-r from-transparent to-[#E6CA65]" aria-hidden="true" />
            <h2 className="font-serif text-sm sm:text-base lg:text-lg font-medium tracking-[0.15em] uppercase text-[#E6CA65] drop-shadow-sm">
              {t('hero_eyebrow')}
            </h2>
            <span className="h-px w-6 sm:w-10 bg-gradient-to-l from-transparent to-[#E6CA65]" aria-hidden="true" />
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl xl:text-[5rem] font-bold text-black tracking-tight leading-[1.06] text-balance">
            {t('hero_headline')}
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg lg:text-xl text-black font-normal leading-relaxed max-w-2xl">
            {t('hero_subtitle')}
          </p>

          {/* Verified Google Rating Trust Signal */}
          <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300 pt-1">
            <div className="flex items-center text-[#E6CA65]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < 4
                      ? 'fill-[#E6CA65] text-[#E6CA65]'
                      : 'fill-[#E6CA65]/30 text-[#E6CA65]'
                  }`}
                />
              ))}
            </div>
            <span className="font-semibold text-white">{HOTEL_INFO.rating} / {HOTEL_INFO.maxRating}</span>
            <span className="text-slate-400">·</span>
            <a
              href={HOTEL_INFO.googleBusinessProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
            >
              Google Business Profile
            </a>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => onOpenBooking()}
              className="btn-luxury-gold px-7 py-3.5 text-sm sm:text-base font-semibold rounded-xl cursor-pointer shadow-lg"
            >
              {t('hero_btn_book')}
            </button>

            <a
              href="#about"
              className="px-7 py-3.5 text-sm sm:text-base font-medium rounded-xl flex items-center gap-2 whitespace-nowrap cursor-pointer bg-red-600 text-white border border-red-600 shadow-lg transition-all duration-300 hover:bg-red-600 hover:text-[#0B1325] hover:border-red-600 hover:-translate-y-0.5 hover:shadow-[0_10px_25px_-2px_rgba(220,38,38,0.45)] active:translate-y-0"
            >
              <span>{t('hero_btn_explore')}</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Full-Width Quick Booking Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <form
          onSubmit={handleQuickSearch}
          aria-label="Quick Room Search"
          className="bg-[#0F1E36]/90 backdrop-blur-md border border-[#C5A880]/30 rounded-xl p-4 sm:p-5 shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end"
        >
          {/* Check-In */}
          <div className="space-y-1.5">
            <label htmlFor="quick-check-in" className="flex items-center gap-1.5 text-xs font-medium text-slate-300">
              <Calendar className="w-3.5 h-3.5 text-[#E6CA65]" />
              <span>{t('hero_check_in')}</span>
            </label>
            <input
              id="quick-check-in"
              type="date"
              value={checkIn}
              min={today}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-[#0B1325] border border-white/15 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#E6CA65] transition-colors"
              required
            />
          </div>

          {/* Check-Out */}
          <div className="space-y-1.5">
            <label htmlFor="quick-check-out" className="flex items-center gap-1.5 text-xs font-medium text-slate-300">
              <Calendar className="w-3.5 h-3.5 text-[#E6CA65]" />
              <span>{t('hero_check_out')}</span>
            </label>
            <input
              id="quick-check-out"
              type="date"
              value={checkOut}
              min={checkIn || today}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-[#0B1325] border border-white/15 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#E6CA65] transition-colors"
              required
            />
          </div>

          {/* Guests */}
          <div className="space-y-1.5">
            <label htmlFor="quick-guests" className="flex items-center gap-1.5 text-xs font-medium text-slate-300">
              <Users className="w-3.5 h-3.5 text-[#E6CA65]" />
              <span>{t('hero_guests')}</span>
            </label>
            <select
              id="quick-guests"
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              className="w-full bg-[#0B1325] border border-white/15 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#E6CA65] transition-colors"
            >
              <option value={1} className="bg-[#0B1325]">1 Guest</option>
              <option value={2} className="bg-[#0B1325]">2 Guests</option>
              <option value={3} className="bg-[#0B1325]">3 Guests</option>
              <option value={4} className="bg-[#0B1325]">4+ Guests / Family</option>
            </select>
          </div>

          {/* Check Availability CTA */}
          <div>
            <button
              type="submit"
              className="btn-luxury-gold w-full py-3 px-4 text-sm font-semibold rounded-lg cursor-pointer"
            >
              {t('hero_check_availability')}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
