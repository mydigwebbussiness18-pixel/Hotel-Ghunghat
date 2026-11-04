import React, { useEffect, useRef, useState } from 'react';

export type DividerType =
  | 'curve-dark-to-light'
  | 'curve-light-to-dark'
  | 'ornamental-gold'
  | 'geometric-crest';

interface LuxurySectionDividerProps {
  type?: DividerType;
  fromColor?: string;
  toColor?: string;
  className?: string;
  showGlow?: boolean;
}

export const LuxurySectionDivider: React.FC<LuxurySectionDividerProps> = ({
  type = 'ornamental-gold',
  fromColor,
  toColor,
  className = '',
  showGlow = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.15,
      }
    );

    const el = containerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  // Unique IDs for SVG gradients to prevent collision
  const gradientId = React.useId().replace(/:/g, '');

  if (type === 'curve-dark-to-light') {
    const bgTop = fromColor || '#0B1325';
    const bgBottom = toColor || '#FAF8F5';

    return (
      <div
        ref={containerRef}
        aria-hidden="true"
        className={`relative w-full overflow-hidden select-none pointer-events-none transition-opacity duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        style={{ backgroundColor: bgTop }}
      >
        <svg
          viewBox="0 0 1440 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-8 sm:h-12 lg:h-16 block text-[#FAF8F5]"
        >
          <defs>
            <linearGradient id={`goldGrad-${gradientId}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C5A880" stopOpacity="0" />
              <stop offset="25%" stopColor="#D4AF37" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#E6CA65" stopOpacity="1" />
              <stop offset="75%" stopColor="#D4AF37" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#C5A880" stopOpacity="0" />
            </linearGradient>
            {showGlow && (
              <filter id={`goldGlow-${gradientId}`} x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            )}
          </defs>

          {/* Lower Fill in target light color */}
          <path
            d="M0,18 C380,68 1060,68 1440,18 L1440,72 L0,72 Z"
            fill={bgBottom}
          />

          {/* Elegant gold accent curve line */}
          <path
            d="M0,18 C380,68 1060,68 1440,18"
            stroke={`url(#goldGrad-${gradientId})`}
            strokeWidth="1.75"
            fill="none"
            filter={showGlow ? `url(#goldGlow-${gradientId})` : undefined}
          />
        </svg>

        {/* Central Luxury Hotel Medallion */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <div
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0B1325] border border-[#E6CA65]/80 shadow-[0_0_15px_rgba(230,202,101,0.45)] flex items-center justify-center transition-transform duration-700 ${
              isVisible ? 'scale-100 rotate-0' : 'scale-50 rotate-45'
            }`}
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E6CA65]" fill="currentColor">
              <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'curve-light-to-dark') {
    const bgTop = fromColor || '#FAF8F5';
    const bgBottom = toColor || '#0B1325';

    return (
      <div
        ref={containerRef}
        aria-hidden="true"
        className={`relative w-full overflow-hidden select-none pointer-events-none transition-opacity duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        style={{ backgroundColor: bgTop }}
      >
        <svg
          viewBox="0 0 1440 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-8 sm:h-12 lg:h-16 block"
        >
          <defs>
            <linearGradient id={`goldGradRev-${gradientId}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C5A880" stopOpacity="0" />
              <stop offset="25%" stopColor="#D4AF37" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#E6CA65" stopOpacity="1" />
              <stop offset="75%" stopColor="#D4AF37" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#C5A880" stopOpacity="0" />
            </linearGradient>
            {showGlow && (
              <filter id={`goldGlowRev-${gradientId}`} x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            )}
          </defs>

          {/* Lower Fill in target dark color */}
          <path
            d="M0,54 C380,4 1060,4 1440,54 L1440,72 L0,72 Z"
            fill={bgBottom}
          />

          {/* Elegant gold accent curve line */}
          <path
            d="M0,54 C380,4 1060,4 1440,54"
            stroke={`url(#goldGradRev-${gradientId})`}
            strokeWidth="1.75"
            fill="none"
            filter={showGlow ? `url(#goldGlowRev-${gradientId})` : undefined}
          />
        </svg>

        {/* Central Luxury Hotel Medallion */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <div
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0B1325] border border-[#E6CA65]/80 shadow-[0_0_15px_rgba(230,202,101,0.45)] flex items-center justify-center transition-transform duration-700 ${
              isVisible ? 'scale-100 rotate-0' : 'scale-50 rotate-45'
            }`}
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E6CA65]" fill="currentColor">
              <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'geometric-crest') {
    return (
      <div
        ref={containerRef}
        aria-hidden="true"
        className={`w-full py-6 sm:py-8 overflow-hidden select-none pointer-events-none transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
        } ${className}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-3 sm:gap-4">
          {/* Left Fading Gold Line */}
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C5A880]/30 to-[#D4AF37]/80" />

          {/* Central Hotel Ghunghat Geometric Crest */}
          <div className="flex items-center gap-2 text-[#C5A880]">
            <span className="w-1.5 h-1.5 rotate-45 border border-[#C5A880]/70 bg-transparent" />
            <span className="w-2 h-2 rotate-45 bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#9E7D3B]" fill="currentColor">
              <path d="M12 3L14.5 9.5L21 12L14.5 14.5L12 21L9.5 14.5L3 12L9.5 9.5L12 3Z" />
            </svg>
            <span className="w-2 h-2 rotate-45 bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
            <span className="w-1.5 h-1.5 rotate-45 border border-[#C5A880]/70 bg-transparent" />
          </div>

          {/* Right Fading Gold Line */}
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#C5A880]/30 to-[#D4AF37]/80" />
        </div>
      </div>
    );
  }

  // Default: ornamental-gold
  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`w-full py-5 sm:py-7 overflow-hidden select-none pointer-events-none transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      } ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-3 sm:gap-4">
        {/* Left Fine Gold Hairline */}
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C5A880]/35 to-[#E6CA65]" />

        {/* Center Ornamental Accent */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="w-1 h-1 rounded-full bg-[#C5A880]/60" />
          <span className="w-1.5 h-1.5 rotate-45 border border-[#C5A880] bg-[#C5A880]/20" />
          <div className="relative flex items-center justify-center w-5 h-5">
            <span className="absolute inset-0 bg-[#E6CA65]/20 rounded-full blur-xs" />
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#C5A880] relative z-10" fill="currentColor">
              <path d="M12 2L14 9.5L21.5 12L14 14.5L12 22L10 14.5L2.5 12L10 9.5L12 2Z" />
            </svg>
          </div>
          <span className="w-1.5 h-1.5 rotate-45 border border-[#C5A880] bg-[#C5A880]/20" />
          <span className="w-1 h-1 rounded-full bg-[#C5A880]/60" />
        </div>

        {/* Right Fine Gold Hairline */}
        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#C5A880]/35 to-[#E6CA65]" />
      </div>
    </div>
  );
};
