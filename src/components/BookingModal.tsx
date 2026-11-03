import React, { useState, useEffect } from 'react';
import { X, Calendar, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { HOTEL_INFO, ROOMS_DATA } from '../constants/hotelData';
import { BookingFormData } from '../types';
import { createBookingWhatsAppUrl } from '../utils/whatsapp';
import { submitNetlifyForm } from '../utils/netlifyForm';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRoomType?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialAdults?: number;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialRoomType,
  initialCheckIn,
  initialCheckOut,
  initialAdults
}) => {
  const { t } = useLanguage();
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    phone: '',
    email: '',
    checkIn: initialCheckIn || today,
    checkOut: initialCheckOut || tomorrow,
    roomType: initialRoomType || 'Executive Room',
    adults: initialAdults || 2,
    children: 0,
    specialRequests: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (initialRoomType) {
      const match = ROOMS_DATA.find((r) => r.id === initialRoomType);
      if (match) {
        setFormData((prev) => ({ ...prev, roomType: t(match.nameKey) }));
      }
    }
    if (initialCheckIn) {
      setFormData((prev) => ({ ...prev, checkIn: initialCheckIn }));
    }
    if (initialCheckOut) {
      setFormData((prev) => ({ ...prev, checkOut: initialCheckOut }));
    }
    if (initialAdults) {
      setFormData((prev) => ({ ...prev, adults: initialAdults }));
    }
  }, [initialRoomType, initialCheckIn, initialCheckOut, initialAdults, t]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Basic validation
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
      await submitNetlifyForm('room-booking-enquiry', {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        roomType: formData.roomType,
        adults: formData.adults,
        children: formData.children,
        specialRequests: formData.specialRequests
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
        {/* Close Button */}
        <button
          type="button"
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            <div className="mb-6 space-y-1 pr-8">
              <span className="text-xs font-semibold text-[#9E7D3B] uppercase tracking-wider block">
                Hotel Ghunghat Reservations
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-slate-900">
                {t('booking_modal_title')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                {t('booking_modal_desc')}
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
                {/* Full Name */}
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

                {/* Phone */}
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

              {/* Email */}
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

              {/* Check-In and Check-Out Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    {t('form_checkin')} *
                  </label>
                  <input
                    type="date"
                    required
                    min={today}
                    value={formData.checkIn}
                    onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    {t('form_checkout')} *
                  </label>
                  <input
                    type="date"
                    required
                    min={formData.checkIn || today}
                    value={formData.checkOut}
                    onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Room Type */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  {t('form_room_type')} *
                </label>
                <select
                  value={formData.roomType}
                  onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent"
                >
                  <option value="Executive Room">{t('form_room_opt_exec')}</option>
                  <option value="Deluxe Comfort Room">{t('form_room_opt_deluxe')}</option>
                  <option value="Premium Family Suite">{t('form_room_opt_family')}</option>
                </select>
              </div>

              {/* Adults & Children */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    {t('form_adults')}
                  </label>
                  <select
                    value={formData.adults}
                    onChange={(e) => setFormData({ ...formData, adults: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Adult' : 'Adults'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    {t('form_children')}
                  </label>
                  <select
                    value={formData.children}
                    onChange={(e) => setFormData({ ...formData, children: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent"
                  >
                    {[0, 1, 2, 3, 4].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Child' : 'Children'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  {t('form_special_requests')}
                </label>
                <textarea
                  rows={2}
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  placeholder={t('form_special_placeholder')}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent resize-none"
                />
              </div>

              {/* Notice */}
              <p className="text-[11px] text-slate-500 italic">
                {t('form_verification_disclaimer')}
              </p>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 text-sm font-semibold text-[#0B1325] bg-gradient-to-r from-[#D4AF37] via-[#E6CA65] to-[#C5A880] rounded-xl hover:brightness-105 active:scale-[0.99] transition-all shadow-md disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? t('form_submitting') : t('form_submit_booking')}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-semibold text-slate-900">
                {t('form_success_title')}
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                {t('form_success_desc')}
              </p>
            </div>

            {/* Instant WhatsApp fallback action */}
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-left space-y-3">
              <span className="text-xs font-semibold text-emerald-900 block">
                Need immediate reservation confirmation?
              </span>
              <a
                href={createBookingWhatsAppUrl(formData)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-md cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t('form_success_wa_btn')}</span>
              </a>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-6 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
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
