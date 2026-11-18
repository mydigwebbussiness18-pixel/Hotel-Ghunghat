import React, { useEffect, useState } from 'react';
import { Menu, X, Globe, Phone, CalendarCheck, MapPin, Star, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { HOTEL_INFO, HOTEL_IMAGES } from '../constants/hotelData';
import { createGeneralWhatsAppUrl } from '../utils/whatsapp';
import { Language } from '../types';

interface HeaderProps {
  onOpenBooking: (roomType?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on Escape key or desktop resize
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsLangMenuOpen(false);
      }
    };
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const languageLabels: Record<Language, { label: string; code: string; local: string }> = {
    en: { label: 'English', code: 'EN', local: 'English' },
    gu: { label: 'ગુજરાતી', code: 'GU', local: 'ગુજરાતી' },
    hi: { label: 'हिन्दी', code: 'HI', local: 'हिन्दी' }
  };

  const navLinks = [
    { href: '#home', labelKey: 'nav_home' },
    { href: '#about', labelKey: 'nav_about' },
    { href: '#rooms', labelKey: 'nav_rooms' },
    { href: '#restaurant', labelKey: 'nav_restaurant' },
    { href: '#night-view', labelKey: 'nav_night_view' },
    { href: '#gallery', labelKey: 'nav_gallery' },
    { href: '#faq', labelKey: 'nav_faq' },
    { href: '#contact', labelKey: 'nav_contact' },
  ];

  const handleToggleMobileMenu = () => {
    setIsLangMenuOpen(false);
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleToggleLangMenu = () => {
    setIsMobileMenuOpen(false);
    setIsLangMenuOpen((prev) => !prev);
  };

  return (
    <>
      {/* Mobile Drawer Backdrop Overlay (closes menu on outside tap) */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-[#0B1325]/65 backdrop-blur-xs animate-backdrop-fade"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <header
        className={`fixed top-0 left-0 right-0 w-full max-w-full z-50 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen
            ? 'bg-gradient-to-r from-[#2F050A]/98 via-[#450912]/98 to-[#2F050A]/98 backdrop-blur-md border-b border-[#E6CA65]/35 py-2 sm:py-2.5 shadow-2xl shadow-black/40'
            : 'bg-gradient-to-b from-[#2F050A] via-[#3E070F]/95 to-transparent py-2.5 sm:py-3.5'
        }`}
      >
        {/* --- TIER 1: Upper Luxury Concierge & Trust Bar (Visible on desktop & tablet) --- */}
        <div
          className={`hidden md:block transition-all duration-300 border-b border-[#E6CA65]/20 pb-2 mb-2 ${
            isScrolled ? 'opacity-0 h-0 overflow-hidden mb-0 pb-0 border-b-0' : 'opacity-100'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-slate-200">
            {/* Left: Location & Google Rating Trust Signals */}
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1.5 text-slate-200">
                <MapPin className="w-3.5 h-3.5 text-[#E6CA65]" />
                <span className="tracking-wide">Sector-26, Near GIDC, Gandhinagar, Gujarat</span>
              </div>

              <span className="w-1 h-1 rounded-full bg-[#E6CA65]/60" />

              <a
                href={HOTEL_INFO.googleBusinessProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-[#E6CA65] transition-colors group"
              >
                <div className="flex items-center text-[#E6CA65]">
                  <Star className="w-3.5 h-3.5 fill-[#E6CA65]" />
                </div>
                <span className="font-semibold text-white group-hover:text-[#E6CA65] transition-colors">
                  {HOTEL_INFO.rating} / 5.0
                </span>
                <span className="text-slate-300 font-light underline underline-offset-2">
                  Google Verified Profile
                </span>
              </a>
            </div>

            {/* Right: Quick Direct Contact & Concierge Assistance */}
            <div className="flex items-center gap-5">
              <a
                href={`tel:${HOTEL_INFO.phoneClean}`}
                className="flex items-center gap-1.5 text-slate-200 hover:text-[#E6CA65] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#E6CA65]" />
                <span className="font-medium tracking-wide">24/7 Front Desk: {HOTEL_INFO.phone}</span>
              </a>

              <span className="w-1 h-1 rounded-full bg-[#E6CA65]/60" />

              <a
                href={createGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#E6CA65] hover:text-white transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp Inquiry</span>
              </a>
            </div>
          </div>
        </div>

        {/* --- TIER 2: Signature Luxury Navigation Bar --- */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-4 lg:gap-6 min-w-0">
            
            {/* Zone 1: Official Website Logo & Brand Emblem */}
            <a
              href="#home"
              className="flex items-center gap-2 sm:gap-3.5 group min-w-0 flex-1 lg:flex-initial text-white"
              aria-label="Hotel Ghunghat Home"
            >
              {/* Illuminated Gold-Accented Logo Medallion */}
              <div className="relative w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full p-0.5 bg-gradient-to-br from-[#E6CA65] via-[#D4AF37] to-[#8C1420] shadow-[0_0_16px_rgba(230,202,101,0.45)] group-hover:shadow-[0_0_22px_rgba(230,202,101,0.7)] group-hover:scale-105 transition-all duration-300 shrink-0">
                <img
                  src={HOTEL_IMAGES.logo}
                  alt="Hotel Ghunghat Official Logo"
                  className="w-full h-full object-cover object-top rounded-full bg-[#2F050A]"
                />
                <span className="absolute inset-0 rounded-full border border-white/40 pointer-events-none" />
              </div>

              {/* Wordmark & Subtitle */}
              <div className="flex flex-col min-w-0">
                <span className="font-serif text-[15px] min-[380px]:text-base sm:text-xl lg:text-2xl font-bold tracking-normal sm:tracking-wider text-[#FAF8F5] group-hover:text-[#E6CA65] transition-colors leading-tight drop-shadow-sm truncate">
                  HOTEL GHUNGHAT
                </span>
                <div className="flex items-center gap-1 sm:gap-1.5 text-[8px] min-[380px]:text-[9px] sm:text-[11px] tracking-[0.12em] sm:tracking-[0.26em] text-[#E6CA65] uppercase font-semibold truncate">
                  <span className="truncate">Gandhinagar</span>
                  <span className="w-1 h-1 rounded-full bg-[#E6CA65] shrink-0" />
                  <span className="text-white/80 font-normal truncate">Gujarat</span>
                </div>
              </div>
            </a>

            {/* Zone 2: Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-medium text-slate-100" aria-label="Primary Navigation">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative py-1 group/link hover:text-[#E6CA65] transition-colors whitespace-nowrap shrink-0"
                >
                  <span>{t(link.labelKey)}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#E6CA65] to-[#D4AF37] transition-all duration-300 group-hover/link:w-full rounded-full" />
                </a>
              ))}
            </nav>

            {/* Zone 3: Language Selector, Booking CTA & Mobile Hamburger Toggle */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Language Switcher Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={handleToggleLangMenu}
                  className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-2 sm:px-3 sm:py-1.5 text-xs font-semibold text-slate-100 bg-[#4C0A12]/90 hover:bg-[#5C0D17] hover:text-[#E6CA65] hover:border-[#E6CA65] rounded-lg border border-[#E6CA65]/40 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(230,202,101,0.25)] active:scale-95 transition-all duration-300 whitespace-nowrap shrink-0 cursor-pointer"
                  aria-label="Select Language"
                  aria-expanded={isLangMenuOpen}
                >
                  <Globe className="w-3.5 h-3.5 text-[#E6CA65] shrink-0" />
                  <span className="tracking-wide">{languageLabels[language].code}</span>
                </button>

                {isLangMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsLangMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-40 bg-[#35070D] border border-[#E6CA65]/60 rounded-xl shadow-2xl py-1.5 z-30 text-xs overflow-hidden backdrop-blur-xl">
                      <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-[#E6CA65]/80 font-bold border-b border-white/10">
                        Select Language
                      </div>
                      {(Object.keys(languageLabels) as Language[]).map((lang) => (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => {
                            setLanguage(lang);
                            setIsLangMenuOpen(false);
                          }}
                          className={`w-full text-left px-3.5 py-2 flex items-center justify-between transition-all duration-200 cursor-pointer ${
                            language === lang
                              ? 'bg-[#E6CA65]/20 text-[#E6CA65] font-bold border-l-2 border-[#E6CA65]'
                              : 'text-slate-200 hover:bg-white/10 hover:text-[#E6CA65]'
                          }`}
                        >
                          <span>{languageLabels[lang].local}</span>
                          <span className="text-[10px] text-slate-300">({languageLabels[lang].code})</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Quick Call Button (Desktop) */}
              <a
                href={`tel:${HOTEL_INFO.phoneClean}`}
                className="hidden xl:flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-100 bg-[#4C0A12]/60 hover:bg-[#5C0D17] hover:text-[#E6CA65] rounded-lg border border-[#E6CA65]/30 hover:border-[#E6CA65] hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 whitespace-nowrap shrink-0"
                title="Call Reception"
              >
                <Phone className="w-3.5 h-3.5 text-[#E6CA65]" />
                <span>{HOTEL_INFO.phone}</span>
              </a>

              {/* Primary Action Button (Visible on tablet & desktop bar; inside mobile drawer on small phones) */}
              <div className="hidden sm:block shrink-0">
                <button
                  type="button"
                  onClick={() => onOpenBooking()}
                  className="btn-luxury-gold px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold rounded-lg cursor-pointer shadow-lg hover:shadow-[0_8px_25px_rgba(230,202,101,0.45)] whitespace-nowrap"
                >
                  <CalendarCheck className="w-4 h-4 shrink-0" />
                  <span>{t('nav_book_now')}</span>
                </button>
              </div>

              {/* Mobile Hamburger Menu Toggle Button (Always clearly visible on mobile & tablet right side) */}
              <button
                type="button"
                onClick={handleToggleMobileMenu}
                className="lg:hidden inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 text-slate-100 bg-[#4C0A12]/95 hover:bg-[#5C0D17] hover:text-[#E6CA65] hover:border-[#E6CA65] border border-[#E6CA65]/55 rounded-xl shadow-md transition-all duration-200 focus:outline-none cursor-pointer shrink-0"
                aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-navigation-menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-[#E6CA65]" />
                ) : (
                  <Menu className="w-6 h-6 text-[#E6CA65]" />
                )}
              </button>
            </div>
          </div>

          {/* --- MOBILE NAVIGATION DRAWER --- */}
          {isMobileMenuOpen && (
            <div
              id="mobile-navigation-menu"
              className="lg:hidden mt-3 w-full max-w-full max-h-[calc(100dvh-5.25rem)] overflow-y-auto overscroll-contain bg-gradient-to-b from-[#35070D]/98 to-[#220307]/98 backdrop-blur-xl rounded-2xl p-4 sm:p-5 shadow-2xl border border-[#E6CA65]/40 animate-mobile-drawer"
            >
              <nav className="flex flex-col gap-1.5" aria-label="Mobile Navigation">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full px-3.5 py-2.5 text-base font-medium text-slate-100 hover:text-[#E6CA65] active:text-[#E6CA65] hover:bg-[#4C0A12]/80 active:bg-[#4C0A12] rounded-xl transition-all duration-200 flex items-center justify-between border border-transparent hover:border-[#E6CA65]/25"
                  >
                    <span>{t(link.labelKey)}</span>
                    <span className="text-[#E6CA65] text-lg leading-none opacity-80" aria-hidden="true">›</span>
                  </a>
                ))}

                <div className="pt-3 mt-2 border-t border-[#E6CA65]/25 flex flex-col gap-3">
                  {/* Language Selection Pills (wraps cleanly on narrow screens) */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-1 text-xs text-slate-300">
                    <span className="font-semibold text-[#E6CA65]">{t('select_language')}:</span>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {(Object.keys(languageLabels) as Language[]).map((lang) => (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => setLanguage(lang)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                            language === lang
                              ? 'bg-[#E6CA65] text-[#2F050A] shadow-md'
                              : 'bg-[#4C0A12] text-slate-200 hover:bg-[#5C0D17] hover:text-[#E6CA65] border border-[#E6CA65]/30'
                          }`}
                        >
                          {languageLabels[lang].local}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Direct Call Button */}
                  <a
                    href={`tel:${HOTEL_INFO.phoneClean}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl bg-[#4C0A12] hover:bg-[#5C0D17] text-white border border-[#E6CA65]/40 hover:border-[#E6CA65] transition-all"
                  >
                    <Phone className="w-4 h-4 text-[#E6CA65] shrink-0" />
                    <span>Call Reception: {HOTEL_INFO.phone}</span>
                  </a>

                  {/* WhatsApp Concierge */}
                  <a
                    href={createGeneralWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl bg-emerald-950/70 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-500/40 transition-all"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>WhatsApp Concierge</span>
                  </a>

                  {/* Book Now Primary Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenBooking();
                    }}
                    className="btn-luxury-gold w-full flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-bold rounded-xl cursor-pointer shadow-lg"
                  >
                    <CalendarCheck className="w-4 h-4 shrink-0" />
                    <span>{t('nav_book_now')}</span>
                  </button>
                </div>
              </nav>
            </div>
          )}
        </div>

        {/* --- TIER 3: Golden Live Scroll Progress Bar --- */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black/20 overflow-hidden pointer-events-none">
          <div
            className="h-full bg-gradient-to-r from-[#D4AF37] via-[#E6CA65] to-[#C5A880] transition-all duration-100 ease-out shadow-[0_0_8px_#E6CA65]"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </header>
    </>
  );
};
