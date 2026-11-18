import React, { useState, useEffect } from 'react';
import { Utensils, Sparkles, Users2, MessageSquareText, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { HOTEL_IMAGES, HOTEL_INFO } from '../constants/hotelData';
import { createGeneralWhatsAppUrl } from '../utils/whatsapp';
import { ScrollReveal } from './ScrollReveal';
import { Parallax3DImage } from './Parallax3DImage';

export const Restaurant: React.FC = () => {
  const { t } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const diningMix = [
    {
      src: HOTEL_IMAGES.restaurant,
      alt: 'Hotel Ghunghat air-conditioned dining hall with modern wooden seating and warm ambient lighting',
      label: 'Dining Hall',
      objectPosition: 'center 52%',
    },
    {
      src: HOTEL_IMAGES.restaurantThali,
      alt: 'Authentic Gujarati Thali served fresh at Hotel Ghunghat with rotli, sabzis, kadhi, and crisp snacks',
      label: 'Gujarati Thali',
      objectPosition: 'center 20%',
    },
    {
      src: HOTEL_IMAGES.restaurantSizzler,
      alt: 'Special vegetarian platter garnished with roasted cashews, paneer, cheese, and fresh greens',
      label: 'Chef Special Dish',
      objectPosition: 'center 55%',
    },
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || isPaused) return;

    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % diningMix.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [isPaused, diningMix.length]);

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + diningMix.length) % diningMix.length);
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % diningMix.length);
  };

  return (
    <section id="restaurant" className="py-20 lg:py-28 bg-[#0B1325] text-white relative overflow-hidden">
      {/* Subtle gold ornamental accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C5A880]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#E6CA65] uppercase">
              <span>03</span>
              <span aria-hidden="true">/</span>
              <span>{t('dining_kicker')}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#FAF8F5] tracking-tight">
              {t('dining_title')}
            </h2>

            <p className="text-base text-slate-300 leading-relaxed">
              {t('dining_subtitle')}
            </p>
          </div>
        </ScrollReveal>

        {/* 2-Column Restaurant Feature Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Restaurant Dining Hall & 2 Dish Showcase Mix */}
          <div className="lg:col-span-6 relative">
            <ScrollReveal direction="left" delay={150}>
              <div
                className="space-y-3.5"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div
                  className="rounded-2xl overflow-hidden shadow-2xl border border-[#C5A880]/30 group relative animate-float-card-alt"
                  style={{ animationDelay: '0.75s' }}
                >
                  <Parallax3DImage
                    key={diningMix[activeSlide].src}
                    src={diningMix[activeSlide].src}
                    alt={diningMix[activeSlide].alt}
                    containerClassName="h-[380px] sm:h-[440px]"
                    className="h-full"
                    objectPosition={diningMix[activeSlide].objectPosition}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1325]/90 via-black/15 to-transparent pointer-events-none" />

                  {/* Prev / Next Slider Controls */}
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous dining photo"
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-[#0B1325]/75 text-white border border-white/20 hover:bg-[#E6CA65] hover:text-[#0B1325] hover:border-[#E6CA65] flex items-center justify-center opacity-85 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next dining photo"
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-[#0B1325]/75 text-white border border-white/20 hover:bg-[#E6CA65] hover:text-[#0B1325] hover:border-[#E6CA65] flex items-center justify-center opacity-85 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200 cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  {/* Active Slide Tag */}
                  <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-[#0B1325]/75 backdrop-blur-md border border-[#C5A880]/40 text-[11px] font-semibold text-[#E6CA65] tracking-wide uppercase pointer-events-none">
                    {diningMix[activeSlide].label}
                  </div>
                  
                  <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-[#0F1E36]/90 backdrop-blur-md border border-[#C5A880]/30 pointer-events-none">
                    <span className="text-xs uppercase tracking-wider text-[#E6CA65] font-semibold block mb-1">
                      Pure Vegetarian & Multi-Cuisine
                    </span>
                    <p className="text-xs text-slate-300">
                      {t('dining_disclaimer')}
                    </p>
                  </div>
                </div>

                {/* 3-Item Thumbnail Mix Strip (Dining Hall + 2 Dishes) */}
                <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                  {diningMix.map((item, idx) => (
                    <button
                      key={item.src}
                      type="button"
                      onClick={() => setActiveSlide(idx)}
                      aria-label={`View ${item.label}`}
                      className={`group/thumb relative rounded-xl overflow-hidden aspect-[4/3] border transition-all duration-300 cursor-pointer ${
                        idx === activeSlide
                          ? 'border-[#E6CA65] ring-2 ring-[#E6CA65]/40 shadow-lg scale-[1.02]'
                          : 'border-white/15 opacity-75 hover:opacity-100 hover:border-[#C5A880]/50'
                      }`}
                    >
                      <img
                        src={item.src}
                        alt={item.alt}
                        loading="lazy"
                        decoding="async"
                        style={{ objectPosition: item.objectPosition }}
                        className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                      <span className="absolute bottom-1.5 left-2 right-2 text-[11px] font-medium text-white truncate text-left">
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Culinary Pillars & Table Enquiry */}
          <div className="lg:col-span-6">
            <ScrollReveal direction="right" delay={250}>
              <div className="space-y-8">
                {/* Gujarati Speciality */}
                <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-[#C5A880]/40 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-[#C5A880]/20 flex items-center justify-center text-[#E6CA65]">
                      <Utensils className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-xl font-medium text-white">
                      {t('dining_gujarati_title')}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed pl-13">
                    {t('dining_gujarati_desc')}
                  </p>
                </div>

                {/* Punjabi & North Indian */}
                <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-[#C5A880]/40 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-[#C5A880]/20 flex items-center justify-center text-[#E6CA65]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-xl font-medium text-white">
                      {t('dining_punjabi_title')}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed pl-13">
                    {t('dining_punjabi_desc')}
                  </p>
                </div>

                {/* Family & Group Dining */}
                <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-[#C5A880]/40 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-[#C5A880]/20 flex items-center justify-center text-[#E6CA65]">
                      <Users2 className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-xl font-medium text-white">
                      {t('dining_family_title')}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed pl-13">
                    {t('dining_family_desc')}
                  </p>
                </div>

                {/* CTA Box */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href={createGeneralWhatsAppUrl('Restaurant & Dining Table Booking')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-luxury-gold px-6 py-3.5 text-sm font-semibold rounded-xl whitespace-nowrap cursor-pointer"
                  >
                    <MessageSquareText className="w-4 h-4" />
                    <span>{t('dining_cta_btn')}</span>
                  </a>

                  <a
                    href={`tel:${HOTEL_INFO.phoneClean}`}
                    className="btn-luxury-glass px-6 py-3.5 text-sm font-medium rounded-xl whitespace-nowrap cursor-pointer"
                  >
                    <Phone className="w-4 h-4 text-[#E6CA65]" />
                    <span>{HOTEL_INFO.phone}</span>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
};
