import React, { useState, useEffect } from 'react';
import { X, Calendar, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { HOTEL_INFO } from '../constants/hotelData';
import { EventFormData } from '../types';
import { createEventWhatsAppUrl } from '../utils/whatsapp';
import { submitNetlifyForm } from '../utils/netlifyForm';

interface EventEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialVenuePref?: string;
}

export const EventEnquiryModal: React.FC<EventEnquiryModalProps> = ({
  isOpen,
  onClose,
  initialVenuePref
}) => {
  const { t } = useLanguage();
  const nextMonth = new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0];

  const [formData, setFormData] = useState<EventFormData>({
    name: '',
    phone: '',
    email: '',
    eventDate: nextMonth,
    eventType: 'Wedding Ceremony / Reception',
    guestCount: '250',
    venueType: initialVenuePref || 'Indoor Banquet Hall',
    eventDetails: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (initialVenuePref) {
      setFormData((prev) => ({ ...prev, venueType: initialVenuePref }));
    }
  }, [initialVenuePref]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMsg('Please enter your full name and phone number.');
      return;
    }

    if (formData.phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid 10-digit phone number.');
      return;
    }

    setIsSubmitting(true);

    try {
      await submitNetlifyForm('event-enquiry', {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        eventDate: formData.eventDate,
        eventType: formData.eventType,
        guestCount: formData.guestCount,
        venueType: formData.venueType,
        eventDetails: formData.eventDetails
      });

      setIsSuccess(true);
    } catch {
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setErrorMsg(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={handleResetAndClose}
    >
      <div
        className="relative bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full text-slate-500 hover:text-[#0B1325] hover:bg-slate-100 border border-transparent hover:border-slate-300 hover:rotate-90 hover:scale-105 transition-all duration-300 flex items-center justify-center cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            <div className="mb-6 space-y-1 pr-8">
              <span className="text-xs font-semibold text-[#9E7D3B] uppercase tracking-wider block">
                Banquet & Party Lawn Coordination
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-slate-900">
                {t('event_modal_title')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                {t('event_modal_desc')}
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    {t('form_name')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter full name"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    {t('form_phone')} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 98253 00161"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  {t('form_email')}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com (optional)"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    {t('form_event_date')} *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    {t('form_event_type')} *
                  </label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent"
                  >
                    <option value="Wedding Ceremony / Reception">{t('form_opt_wedding')}</option>
                    <option value="Engagement / Ring Ceremony">{t('form_opt_engagement')}</option>
                    <option value="Birthday / Anniversary Celebration">{t('form_opt_birthday')}</option>
                    <option value="Corporate Conference / Seminar">{t('form_opt_corporate')}</option>
                    <option value="Other Social Function">{t('form_opt_other')}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    {t('form_venue_pref')} *
                  </label>
                  <select
                    value={formData.venueType}
                    onChange={(e) => setFormData({ ...formData, venueType: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent"
                  >
                    <option value="Indoor Banquet Hall">{t('form_venue_banquet')}</option>
                    <option value="Outdoor Party Lawn">{t('form_venue_lawn')}</option>
                    <option value="Both Banquet & Lawn">{t('form_venue_both')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    {t('form_guests')}
                  </label>
                  <input
                    type="text"
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                    placeholder={t('form_guests_placeholder')}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  {t('form_event_details')}
                </label>
                <textarea
                  rows={2}
                  value={formData.eventDetails}
                  onChange={(e) => setFormData({ ...formData, eventDetails: e.target.value })}
                  placeholder={t('form_event_details_placeholder')}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-luxury-gold w-full py-3.5 px-4 text-sm font-semibold rounded-xl cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? t('form_submitting') : t('form_submit_event')}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-semibold text-slate-900">
                {t('form_success_title')}
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Our event manager at Hotel Ghunghat (+91 98253 00161) will verify calendar availability for your date and get in touch with customized packages.
              </p>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-left space-y-3">
              <span className="text-xs font-semibold text-emerald-900 block">
                Connect directly with our event manager:
              </span>
              <a
                href={createEventWhatsAppUrl(formData)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-luxury-whatsapp w-full py-3.5 px-4 text-sm font-bold rounded-xl cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t('form_success_wa_btn')}</span>
              </a>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="btn-luxury-navy px-6 py-2.5 text-sm font-medium rounded-xl cursor-pointer"
              >
                {t('form_close')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
