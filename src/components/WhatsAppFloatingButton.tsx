import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { HOTEL_INFO } from '../constants/hotelData';
import { createGeneralWhatsAppUrl } from '../utils/whatsapp';

export const WhatsAppFloatingButton: React.FC = () => {
  const { t } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <aside aria-label="Quick WhatsApp assistance" className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip on hover/focus */}
      <div
        className={`hidden sm:flex items-center bg-[#0B1325] text-white text-xs font-medium px-3.5 py-2 rounded-xl shadow-xl border border-[#C5A880]/30 transition-all duration-300 pointer-events-none ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
        }`}
      >
        <span>{t('whatsapp_tooltip')}</span>
      </div>

      {/* WhatsApp Button */}
      <a
        href={createGeneralWhatsAppUrl('WhatsApp Fast Enquiry')}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#0B1325] text-white hover:text-[#25D366] border border-white/30 hover:border-[#25D366] flex items-center justify-center shadow-2xl hover:shadow-[0_12px_30px_rgba(37,211,102,0.55)] hover:-translate-y-1 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 cursor-pointer"
        aria-label="Chat with Hotel Ghunghat on WhatsApp"
      >
        {/* SVG WhatsApp Icon for crisp rendering */}
        <svg
          viewBox="0 0 24 24"
          width="30"
          height="30"
          stroke="currentColor"
          strokeWidth="0"
          fill="currentColor"
        >
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.78 14.04c-.24.68-1.39 1.3-1.92 1.38-.49.08-1.12.11-3.23-.77-2.69-1.12-4.43-3.86-4.57-4.04-.13-.18-1.1-1.46-1.1-2.79 0-1.32.69-1.97.94-2.24.25-.26.54-.33.72-.33.18 0 .36 0 .52.01.17.01.4.06.61.56.24.58.82 2 .89 2.15.07.15.11.33.02.52-.09.19-.13.31-.26.47-.13.15-.28.34-.4.46-.13.13-.26.27-.11.53.15.26.67 1.1 1.43 1.78.98.88 1.81 1.15 2.07 1.28.26.13.41.11.57-.07.15-.18.66-.77.84-1.03.18-.26.36-.22.61-.13.25.09 1.58.74 1.85.88.27.13.45.2.52.31.07.11.07.66-.17 1.34z" />
        </svg>
      </a>
    </aside>
  );
};
