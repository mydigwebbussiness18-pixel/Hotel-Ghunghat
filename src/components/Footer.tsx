import React, { useState } from 'react';
import { Phone, MapPin, Instagram, ShieldCheck, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { HOTEL_INFO } from '../constants/hotelData';
import { PrivacyModal } from './PrivacyModal';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const navLinks = [
    { href: '#home', labelKey: 'nav_home' },
    { href: '#about', labelKey: 'nav_about' },
    { href: '#rooms', labelKey: 'nav_rooms' },
    { href: '#restaurant', labelKey: 'nav_restaurant' },
    { href: '#banquet', labelKey: 'nav_banquet' },
    { href: '#lawn', labelKey: 'nav_lawn' },
    { href: '#gallery', labelKey: 'nav_gallery' },
    { href: '#faq', labelKey: 'nav_faq' },
    { href: '#contact', labelKey: 'nav_contact' },
  ];

  return (
    <footer className="bg-[#0B1325] text-slate-300 pt-16 pb-12 border-t border-[#C5A880]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          
          {/* Brand & Narrative */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-white tracking-wider">
              HOTEL GHUNGHAT
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              {t('footer_about')}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={HOTEL_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#E6CA65] text-[#E6CA65] hover:text-[#0B1325] border border-white/15 hover:border-[#E6CA65] flex items-center justify-center hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(230,202,101,0.35)] transition-all duration-300 cursor-pointer"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={HOTEL_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#E6CA65] text-[#E6CA65] hover:text-[#0B1325] border border-white/15 hover:border-[#E6CA65] flex items-center justify-center hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(230,202,101,0.35)] transition-all duration-300 cursor-pointer"
                aria-label="Google Maps"
              >
                <MapPin className="w-4 h-4" />
              </a>
              <a
                href={`tel:${HOTEL_INFO.phoneClean}`}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#E6CA65] text-[#E6CA65] hover:text-[#0B1325] border border-white/15 hover:border-[#E6CA65] flex items-center justify-center hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(230,202,101,0.35)] transition-all duration-300 cursor-pointer"
                aria-label="Call Hotel"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-lg font-medium text-white tracking-wide">
              {t('footer_quick_links')}
            </h4>
            <ul className="space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-[#E6CA65] transition-colors"
                  >
                    {t(link.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-serif text-lg font-medium text-white tracking-wide">
              {t('footer_contact_info')}
            </h4>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#E6CA65] shrink-0 mt-1" />
                <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                  {HOTEL_INFO.address}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#E6CA65] shrink-0" />
                <a
                  href={`tel:${HOTEL_INFO.phoneClean}`}
                  className="hover:text-[#E6CA65] transition-colors"
                >
                  {HOTEL_INFO.phone}
                </a>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsPrivacyOpen(true)}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#E6CA65] bg-white/5 hover:bg-[#E6CA65] hover:text-[#0B1325] border border-[#E6CA65]/30 hover:border-[#E6CA65] hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{t('footer_privacy')}</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Hotel Ghunghat. {t('footer_rights')}
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Gandhinagar, Gujarat</span>
            <span>·</span>
            <span>Sector-26 GIDC</span>
          </div>
        </div>

      </div>

      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </footer>
  );
};
