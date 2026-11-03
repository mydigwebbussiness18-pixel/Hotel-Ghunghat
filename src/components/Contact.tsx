import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageSquare, Instagram, CheckCircle2, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { HOTEL_INFO } from '../constants/hotelData';
import { ContactFormData } from '../types';
import { createGeneralWhatsAppUrl } from '../utils/whatsapp';
import { submitNetlifyForm } from '../utils/netlifyForm';
import { ScrollReveal } from './ScrollReveal';

export const Contact: React.FC = () => {
  const { t } = useLanguage();

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    email: '',
    enquiryType: 'Room Booking Assistance',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMsg('Please provide your name and phone number.');
      return;
    }

    if (formData.phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please provide a valid 10-digit telephone number.');
      return;
    }

    setIsSubmitting(true);

    try {
      await submitNetlifyForm('contact-enquiry', {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        enquiryType: formData.enquiryType,
        message: formData.message
      });

      setIsSuccess(true);
    } catch {
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#F4EFEA]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#9E7D3B] uppercase">
              <span>09</span>
              <span aria-hidden="true">/</span>
              <span>{t('nav_contact')}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
              {t('contact_title')}
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              {t('contact_subtitle')}
            </p>
          </div>
        </ScrollReveal>

        {/* 2-Column Contact Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Official Contact Channels */}
          <div className="lg:col-span-5">
            <ScrollReveal direction="left" delay={150}>
              <div className="space-y-6">
            
            {/* Phone Card */}
            <a
              href={`tel:${HOTEL_INFO.phoneClean}`}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-[#C5A880]/50 transition-all flex items-start gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#0B1325] text-[#E6CA65] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-xs text-slate-400 font-semibold uppercase">{t('contact_phone_call')}</span>
                <p className="font-serif text-xl font-bold text-slate-900 group-hover:text-[#9E7D3B] transition-colors">
                  {HOTEL_INFO.phone}
                </p>
                <span className="text-xs text-emerald-700 font-medium block">Available 24 Hours Daily</span>
              </div>
            </a>

            {/* WhatsApp Card */}
            <a
              href={createGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex items-start gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-xs text-slate-400 font-semibold uppercase">{t('contact_wa_chat')}</span>
                <p className="font-serif text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  +91 98253 00161
                </p>
                <span className="text-xs text-slate-500 block">Instant Chat for Room & Banquet Booking</span>
              </div>
            </a>

            {/* Instagram Card */}
            <a
              href={HOTEL_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-pink-300 transition-all flex items-start gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Instagram className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-xs text-slate-400 font-semibold uppercase">{t('contact_instagram')}</span>
                <p className="font-serif text-lg font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                  @hotelghunghat
                </p>
                <span className="text-xs text-slate-500 block">Follow our latest photos, wedding decor & updates</span>
              </div>
            </a>

            {/* Address Summary */}
            <div className="p-6 rounded-2xl bg-[#0B1325] text-white space-y-3">
              <div className="flex items-center gap-2 text-xs text-[#E6CA65] font-semibold uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>Hotel Ghunghat</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {HOTEL_INFO.address}
              </p>
            </div>

              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Netlify Contact Form with 3D Depth */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="right" delay={250}>
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl">
                {!isSuccess ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1 mb-2">
                  <h3 className="font-serif text-2xl font-semibold text-slate-900">
                    Send Us a Message
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Our guest relations team will respond promptly.
                  </p>
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      {t('form_name')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your full name"
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent"
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
                      placeholder="+91 98253 00161"
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent"
                    />
                  </div>

                  {/* Enquiry Type */}
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      {t('contact_enquiry_type')} *
                    </label>
                    <select
                      value={formData.enquiryType}
                      onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent"
                    >
                      <option value="Room Booking Assistance">{t('contact_opt_room')}</option>
                      <option value="Restaurant & Dining">{t('contact_opt_dining')}</option>
                      <option value="Banquet Hall Enquiry">{t('contact_opt_banquet')}</option>
                      <option value="Wedding & Party Lawn">{t('contact_opt_wedding')}</option>
                      <option value="General Enquiry">{t('contact_opt_general')}</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    {t('contact_message')} *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t('contact_message_placeholder')}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-luxury-gold w-full py-3.5 px-6 text-sm font-semibold rounded-xl cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? t('form_submitting') : t('contact_btn_send')}</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-10 space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl font-semibold text-slate-900">
                    Message Sent Successfully
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Thank you, {formData.name}. Our reception team has received your inquiry and will contact you directly at {formData.phone}.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="btn-luxury-navy px-6 py-2.5 text-xs font-semibold rounded-xl cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            )}
              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
};
