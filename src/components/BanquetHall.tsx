import React from 'react';
import { CalendarDays, HeartHandshake, Briefcase, PartyPopper, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { HOTEL_IMAGES } from '../constants/hotelData';
import { ScrollReveal } from './ScrollReveal';
import { Parallax3DImage } from './Parallax3DImage';

interface BanquetHallProps {
  onOpenEventEnquiry: (venuePref?: string) => void;
}

export const BanquetHall: React.FC<BanquetHallProps> = ({ onOpenEventEnquiry }) => {
  const { t } = useLanguage();

  const services = [
    {
      title: t('banquet_item_1_title'),
      desc: t('banquet_item_1_desc'),
      icon: HeartHandshake
    },
    {
      title: t('banquet_item_2_title'),
      desc: t('banquet_item_2_desc'),
      icon: Briefcase
    },
    {
      title: t('banquet_item_3_title'),
      desc: t('banquet_item_3_desc'),
      icon: PartyPopper
    }
  ];

  return (
    <section id="banquet" className="py-20 lg:py-28 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#9E7D3B] uppercase">
              <span>04</span>
              <span aria-hidden="true">/</span>
              <span>{t('banquet_kicker')}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
              {t('banquet_title')}
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              {t('banquet_subtitle')}
            </p>
          </div>
        </ScrollReveal>

        {/* 2-Column Banquet Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Information & Pillars */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <ScrollReveal direction="left" delay={150}>
              <div className="space-y-8">
                <div className="space-y-6">
                  {services.map((srv, idx) => {
                    const IconComponent = srv.icon;
                    return (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4"
                      >
                        <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-[#C5A880]/30 flex items-center justify-center shrink-0 text-[#9E7D3B]">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-serif text-lg font-semibold text-slate-900">
                            {srv.title}
                          </h3>
                          <p className="text-sm text-slate-600 leading-relaxed">
                            {srv.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Capacity policy clarity */}
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/60 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-900">
                    {t('banquet_capacity_notice')}
                  </p>
                </div>

                {/* Action Button */}
                <div>
                  <button
                    type="button"
                    onClick={() => onOpenEventEnquiry('Indoor Banquet Hall')}
                    className="flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#0B1325] hover:bg-[#152342] rounded-xl shadow-lg transition-all cursor-pointer whitespace-nowrap"
                  >
                    <CalendarDays className="w-4 h-4 text-[#E6CA65]" />
                    <span>{t('banquet_btn_quote')}</span>
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Banquet Hall Visual Asset with 3D Depth */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <ScrollReveal direction="right" delay={200}>
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80 group">
                <Parallax3DImage
                  src={HOTEL_IMAGES.banquet}
                  alt="Indoor banquet hall decorated with crystal chandeliers for wedding celebration at Hotel Ghunghat"
                  containerClassName="h-[420px] sm:h-[480px]"
                  className="h-full"
                />
              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
};
