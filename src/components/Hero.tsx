import React, { useState, useEffect } from 'react';
import { Star, ChevronRight, Calendar, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { HOTEL_IMAGES, HOTEL_INFO } from '../constants/hotelData';
import { Hero3DBackground } from './Hero3DBackground';

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
    <section id="home" className="relative min-h-[92vh] flex flex-col justify-between pt-32 sm:pt-36 lg:pt-40 pb-12 overflow-hidden bg-[#0B1325]">
      {/* Dark Blue 3D Animated Background Layer with Interactive Parallax */}
      <Hero3DBackground scrollY={scrollY} />

      {/* Main Hero Content with 3D Spatial Drift */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-10 lg:py-14"
        style={{
          transform: `translate3d(0, ${scrollY * 0.1}px, 0)`,
          opacity: Math.max(0.1, 1 - scrollY / 850),
          willChange: 'transform, opacity'
        }}
      >
        {/* Luxury Glassmorphic Hero Showcase Card */}
        <div className="max-w-3xl space-y-6 rounded-3xl bg-[#061022]/45 backdrop-blur-md border border-[#E6CA65]/25 p-6 sm:p-9 lg:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.65)] relative overflow-hidden group">
          {/* Subtle Ambient Golden Shimmer Rim */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#E6CA65]/60 to-transparent pointer-events-none" />
          <div className="absolute top-0 -left-20 w-48 h-48 bg-[#E6CA65]/10 rounded-full blur-2xl pointer-events-none" />

          {/* Provenance Tag */}
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold tracking-[0.22em] text-[#E6CA65] uppercase">
            <span>Gandhinagar</span>
            <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#E6CA65]/80 shadow-[0_0_6px_#E6CA65]" />
            <span>Sector-26 GIDC</span>
            <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#E6CA65]/80 shadow-[0_0_6px_#E6CA65]" />
            <span>Gujarat</span>
          </div>

          {/* Heading Eyebrow */}
          <div className="flex items-center gap-3 pt-0.5">
            <span className="h-px w-6 sm:w-10 bg-gradient-to-r from-transparent to-[#E6CA65]" aria-hidden="true" />
            <h2 className="font-serif text-sm sm:text-base lg:text-lg font-medium tracking-[0.16em] uppercase text-[#E6CA65] drop-shadow-sm">
              {t('hero_eyebrow')}
            </h2>
            <span className="h-px w-6 sm:w-10 bg-gradient-to-l from-transparent to-[#E6CA65]" aria-hidden="true" />
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-[4.75rem] font-bold text-white tracking-tight leading-[1.07] text-balance drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
            {t('hero_headline')}
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-100 font-normal leading-relaxed max-w-2xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
            {t('hero_subtitle')}
          </p>

          {/* Verified Google Rating Trust Signal */}
          <div className="flex items-center flex-wrap gap-3 text-xs sm:text-sm text-slate-300 pt-1">
            <div className="flex items-center text-[#E6CA65] drop-shadow-[0_0_6px_rgba(230,202,101,0.5)]">
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
              className="text-blue-400 hover:text-blue-300 hover:underline transition-colors font-medium"
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

      {/* Full-Width Quick Booking Strip at Foot of Home */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8 pb-4">
        <form
          onSubmit={handleQuickSearch}
          aria-label="Quick Room Search"
          className="bg-[#0B1325] border border-[#C5A880]/35 rounded-xl p-4 sm:p-5 shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end relative z-10"
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
