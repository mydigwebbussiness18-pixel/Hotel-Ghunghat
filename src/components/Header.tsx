import React, { useEffect, useState } from 'react';
import { Menu, X, Globe, Phone, CalendarCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { HOTEL_INFO } from '../constants/hotelData';
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
      setIsScrolled(window.scrollY > 20);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languageLabels: Record<Language, { label: string; code: string }> = {
    en: { label: 'English', code: 'EN' },
    gu: { label: 'ગુજરાતી', code: 'GU' },
    hi: { label: 'हिन्दी', code: 'HI' }
  };

  const navLinks = [
    { href: '#home', labelKey: 'nav_home' },
    { href: '#about', labelKey: 'nav_about' },
    { href: '#rooms', labelKey: 'nav_rooms' },
    { href: '#restaurant', labelKey: 'nav_restaurant' },
    { href: '#banquet', labelKey: 'nav_banquet' },
    { href: '#gallery', labelKey: 'nav_gallery' },
    { href: '#faq', labelKey: 'nav_faq' },
    { href: '#contact', labelKey: 'nav_contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B1325]/95 backdrop-blur-md border-b border-[#C5A880]/20 py-3 shadow-lg shadow-black/20'
          : 'bg-gradient-to-b from-[#0B1325]/90 via-[#0B1325]/60 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#home"
            className="flex items-center gap-2 group whitespace-nowrap shrink-0 text-white"
          >
            <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-wider text-[#FAF8F5] group-hover:text-[#E6CA65] transition-colors">
              HOTEL GHUNGHAT
            </span>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-slate-200">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#E6CA65] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#E6CA65]"
              >
                {t(link.labelKey)}
              </a>
            ))}
          </nav>

          {/* Zone 3: Language Selector & Primary CTA */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Language Switcher Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-200 bg-white/10 hover:bg-white/15 rounded border border-white/20 transition-colors whitespace-nowrap shrink-0"
                aria-label="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-[#E6CA65]" />
                <span>{languageLabels[language].code}</span>
              </button>

              {isLangMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsLangMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-36 bg-[#0F1E36] border border-[#C5A880]/30 rounded-lg shadow-xl py-1 z-20 text-xs">
                    {(Object.keys(languageLabels) as Language[]).map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => {
                          setLanguage(lang);
                          setIsLangMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 flex items-center justify-between transition-colors ${
                          language === lang
                            ? 'bg-[#C5A880]/20 text-[#E6CA65] font-semibold'
                            : 'text-slate-300 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <span>{languageLabels[lang].label}</span>
                        <span className="text-[10px] text-slate-400">({languageLabels[lang].code})</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Quick Call */}
            <a
              href={`tel:${HOTEL_INFO.phoneClean}`}
              className="hidden sm:flex items-center gap-1.5 text-xs text-slate-200 hover:text-[#E6CA65] transition-colors whitespace-nowrap shrink-0"
              title="Call Reception"
            >
              <Phone className="w-3.5 h-3.5 text-[#E6CA65]" />
              <span className="hidden xl:inline">{HOTEL_INFO.phone}</span>
            </a>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={() => onOpenBooking()}
              className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold tracking-wide text-[#0B1325] bg-gradient-to-r from-[#D4AF37] via-[#E6CA65] to-[#C5A880] rounded hover:shadow-lg hover:shadow-[#D4AF37]/20 hover:brightness-105 active:scale-95 transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4 text-[#0B1325]" />
              <span>{t('nav_book_now')}</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E6CA65] rounded"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-white/10 bg-[#0B1325]/98 rounded-xl p-4 shadow-2xl">
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2 text-base font-medium text-slate-200 hover:text-[#E6CA65] hover:bg-white/5 rounded-lg transition-colors"
                >
                  {t(link.labelKey)}
                </a>
              ))}

              <div className="pt-3 mt-2 border-t border-white/10 flex flex-col gap-3">
                <div className="flex items-center justify-between px-3 text-xs text-slate-400">
                  <span>{t('select_language')}:</span>
                  <div className="flex items-center gap-1">
                    {(Object.keys(languageLabels) as Language[]).map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => setLanguage(lang)}
                        className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                          language === lang
                            ? 'bg-[#C5A880] text-[#0B1325] font-bold'
                            : 'bg-white/10 text-slate-300 hover:bg-white/20'
                        }`}
                      >
                        {languageLabels[lang].label}
                      </button>
                    ))}
                  </div>
                </div>

                <a
                  href={`tel:${HOTEL_INFO.phoneClean}`}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-white/10 rounded-lg hover:bg-white/15 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#E6CA65]" />
                  <span>{HOTEL_INFO.phone}</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-[#0B1325] bg-gradient-to-r from-[#D4AF37] via-[#E6CA65] to-[#C5A880] rounded-lg shadow-md"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>{t('nav_book_now')}</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* 3D Scroll Progress Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5 overflow-hidden pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#D4AF37] via-[#E6CA65] to-[#C5A880] transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
  );
};
