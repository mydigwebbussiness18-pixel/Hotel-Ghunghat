import React from 'react';
import {
  Wifi,
  Car,
  Clock,
  BellRing,
  AirVent,
  UtensilsCrossed,
  Building2,
  Trees
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { FACILITIES_DATA } from '../constants/hotelData';
import { ScrollReveal } from './ScrollReveal';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Wifi,
  Car,
  Clock,
  BellRing,
  AirVent,
  UtensilsCrossed,
  Building2,
  Trees
};

export const Facilities: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-[#F4EFEA]/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#9E7D3B] uppercase">
              <span>07</span>
              <span aria-hidden="true">/</span>
              <span>{t('fac_kicker')}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-slate-900 tracking-tight">
              {t('fac_title')}
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              {t('fac_subtitle')}
            </p>
          </div>
        </ScrollReveal>

        {/* Facilities Grid with 3D Depth Card Stagger */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FACILITIES_DATA.map((fac, idx) => {
            const IconComp = iconMap[fac.iconName] || Clock;
            return (
              <ScrollReveal key={fac.id} direction="up" delay={idx * 75} tilt>
                <div
                  className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-[#C5A880]/50 transition-all duration-300 flex flex-col justify-between group h-full"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-[#C5A880]/30 flex items-center justify-center text-[#9E7D3B] group-hover:bg-[#0B1325] group-hover:text-[#E6CA65] group-hover:scale-110 transition-all duration-300">
                      <IconComp className="w-6 h-6" />
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="font-serif text-lg font-semibold text-slate-900">
                        {t(fac.nameKey)}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {t(fac.descKey)}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-medium text-emerald-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    <span>Verified Guest Amenity</span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
};
