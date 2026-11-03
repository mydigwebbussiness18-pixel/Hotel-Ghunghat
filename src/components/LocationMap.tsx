import React from 'react';
import { MapPin, Navigation, Clock, Phone, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { HOTEL_INFO } from '../constants/hotelData';
import { ScrollReveal } from './ScrollReveal';

export const LocationMap: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 lg:py-24 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#9E7D3B] uppercase">
              <span>08</span>
              <span aria-hidden="true">/</span>
              <span>{t('loc_kicker')}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-slate-900 tracking-tight">
              {t('loc_title')}
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              {t('loc_subtitle')}
            </p>
          </div>
        </ScrollReveal>

        {/* Responsive Map Card */}
        <ScrollReveal direction="up" delay={150}>
          <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xl grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Details Panel */}
            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-8 bg-[#0B1325] text-white">
              <div className="space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#E6CA65] font-semibold block mb-1">
                    Hotel Ghunghat Location
                  </span>
                  <h3 className="font-serif text-2xl font-normal text-white">
                    Sector-26, Gandhinagar
                  </h3>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-[#E6CA65] shrink-0 mt-1" />
                  <div className="space-y-1">
                    <span className="text-xs text-slate-400 uppercase font-semibold">{t('loc_address_label')}</span>
                    <p className="text-sm text-slate-200 leading-relaxed">
                      {HOTEL_INFO.address}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-[#E6CA65] shrink-0 mt-1" />
                  <div className="space-y-1">
                    <span className="text-xs text-slate-400 uppercase font-semibold">{t('loc_phone_label')}</span>
                    <p className="text-sm text-slate-200">
                      <a href={`tel:${HOTEL_INFO.phoneClean}`} className="hover:text-[#E6CA65] transition-colors">
                        {HOTEL_INFO.phone}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Reception Hours */}
                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-[#E6CA65] shrink-0 mt-1" />
                  <div className="space-y-1">
                    <span className="text-xs text-slate-400 uppercase font-semibold">{t('loc_hours_label')}</span>
                    <p className="text-sm text-slate-200">
                      {t('loc_hours_val')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Direction Button */}
              <div className="pt-4 border-t border-white/10">
                <a
                  href={HOTEL_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-luxury-gold w-full py-3.5 px-4 text-sm font-semibold rounded-xl cursor-pointer flex items-center justify-center gap-2"
                >
                  <Navigation className="w-4 h-4" />
                  <span>{t('loc_btn_map')}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Right Map Embed */}
            <div className="lg:col-span-7 min-h-[380px] lg:min-h-[460px] relative bg-slate-100">
              <iframe
                title="Hotel Ghunghat Location Map"
                src={HOTEL_INFO.embedMapUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '380px' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
