import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { HOTEL_INFO } from '../constants/hotelData';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full text-slate-500 hover:text-[#0B1325] hover:bg-slate-100 border border-transparent hover:border-slate-300 hover:rotate-90 hover:scale-105 transition-all duration-300 flex items-center justify-center cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#9E7D3B] uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-[#9E7D3B]" />
            <span>Transparency & Guest Privacy</span>
          </div>

          <h3 className="font-serif text-2xl font-bold text-slate-900">
            {t('footer_privacy_modal_title')}
          </h3>

          <div className="text-sm text-slate-600 space-y-3 leading-relaxed">
            <p>{t('footer_privacy_content')}</p>
            <p>
              <strong>Official Reception Desk:</strong> {HOTEL_INFO.name}, {HOTEL_INFO.address}. Telephone: {HOTEL_INFO.phone}.
            </p>
            <p>
              Check-in requires government-approved photo identification in accordance with local regulations in Gujarat.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="btn-luxury-navy px-6 py-2.5 text-xs font-semibold rounded-xl cursor-pointer"
            >
              {t('form_close')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
