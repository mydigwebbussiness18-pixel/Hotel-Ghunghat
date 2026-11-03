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
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-[#E6CA65]" />
              </a>
              <a
                href={HOTEL_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Google Maps"
              >
                <MapPin className="w-4 h-4 text-[#E6CA65]" />
              </a>
              <a
                href={`tel:${HOTEL_INFO.phoneClean}`}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Call Hotel"
              >
                <Phone className="w-4 h-4 text-[#E6CA65]" />
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
                  className="text-xs text-[#E6CA65] hover:underline flex items-center gap-1.5 cursor-pointer"
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
