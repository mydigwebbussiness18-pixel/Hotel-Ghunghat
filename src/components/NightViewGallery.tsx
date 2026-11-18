import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HOTEL_IMAGES } from '../constants/hotelData';
import { ScrollReveal } from './ScrollReveal';

interface NightSlide {
  src: string;
  alt: string;
  objectPosition: string;
}

const NIGHT_VIEW_SLIDES: NightSlide[] = [
  {
    src: HOTEL_IMAGES.nightGardenFacade,
    alt: 'Illuminated Hotel Ghunghat wing and lush green garden lawn at night',
    objectPosition: 'center 55%',
  },
  {
    src: HOTEL_IMAGES.nightGardenEntrance,
    alt: 'Glowing garden archway entrance surrounded by palms and warm pathway lights at night',
    objectPosition: 'center 40%',
  },
  {
    src: HOTEL_IMAGES.nightGardenTerrace,
    alt: 'Peaceful tropical garden terrace seating lit by warm outdoor globe lamps at night',
    objectPosition: 'center 45%',
  },
  {
    src: HOTEL_IMAGES.nightGardenWalkway,
    alt: 'Vibrant palm-lined stone garden walkway leading to illuminated Hotel Ghunghat',
    objectPosition: 'center 52%',
  },
];

function shuffleSlides(items: NightSlide[]): NightSlide[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export const NightViewGallery: React.FC = () => {
  const [slides] = useState<NightSlide[]>(() => shuffleSlides(NIGHT_VIEW_SLIDES));
  const [activeIndex, setActiveIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Automatically change images every 2 seconds with smooth fade transitions
  useEffect(() => {
    if (prefersReducedMotion) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 2000);

    return () => window.clearInterval(timer);
  }, [slides.length, activeIndex, prefersReducedMotion]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  return (
    <section
      id="night-view"
      aria-label="Night View Gallery"
      className="py-20 lg:py-28 bg-[#FAF8F5] relative overflow-hidden"
    >
      {/* Section Header matching Banquet Hall slot editorial hierarchy */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#9E7D3B] uppercase">
              <span>04</span>
              <span aria-hidden="true">/</span>
              <span>Night View Gallery</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
              Experience the Night
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              Beautiful evenings, peaceful surroundings.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* Full-Width Cinematic Slideshow */}
      <div className="relative w-full h-[380px] sm:h-[480px] md:h-[560px] lg:h-[640px] overflow-hidden border-y border-[#C5A880]/40 bg-[#0B1325] shadow-2xl group">
        {slides.map((slide, idx) => {
          const isActive = idx === activeIndex;
          return (
            <div
              key={slide.src}
              aria-hidden={!isActive}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                referrerPolicy="no-referrer"
                loading={idx === 0 ? 'eager' : 'lazy'}
                decoding="async"
                style={{ objectPosition: slide.objectPosition }}
                className={`w-full h-full object-cover transition-transform duration-[2600ms] ease-out ${
                  !prefersReducedMotion && isActive ? 'scale-[1.06]' : 'scale-100'
                }`}
              />
            </div>
          );
        })}

        {/* Cinematic Gradient Vignettes */}
        <div
          className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-b from-[#0B1325]/40 via-transparent to-[#0B1325]/70"
          aria-hidden="true"
        />
        <div
          className="hidden lg:block absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-[#0B1325]/35 via-transparent to-[#0B1325]/35"
          aria-hidden="true"
        />

        {/* Subtle Manual Navigation Arrows (Visible on Hover / Focus) */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous night view image"
          className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#0B1325]/65 backdrop-blur-md text-white border border-[#C5A880]/40 hover:bg-[#E6CA65] hover:text-[#0B1325] hover:border-[#E6CA65] flex items-center justify-center opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-all duration-300 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next night view image"
          className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#0B1325]/65 backdrop-blur-md text-white border border-[#C5A880]/40 hover:bg-[#E6CA65] hover:text-[#0B1325] hover:border-[#E6CA65] flex items-center justify-center opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-all duration-300 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Minimal Slider Indicators */}
        <div
          className="absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#0B1325]/55 backdrop-blur-md border border-[#C5A880]/30"
          role="tablist"
          aria-label="Night view slideshow controls"
        >
          {slides.map((slide, idx) => (
            <button
              key={slide.src}
              type="button"
              role="tab"
              aria-selected={idx === activeIndex}
              aria-label={`View night photo ${idx + 1} of ${slides.length}`}
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                idx === activeIndex
                  ? 'w-8 bg-[#E6CA65] shadow-[0_0_8px_rgba(230,202,101,0.75)]'
                  : 'w-2 bg-white/45 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
