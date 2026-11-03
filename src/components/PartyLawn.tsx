import React from 'react';
import { Sparkles, Calendar, UtensilsCrossed, Trees } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { HOTEL_IMAGES } from '../constants/hotelData';
import { ScrollReveal } from './ScrollReveal';
import { Parallax3DImage } from './Parallax3DImage';

interface PartyLawnProps {
  onOpenEventEnquiry: (venuePref?: string) => void;
}

export const PartyLawn: React.FC<PartyLawnProps> = ({ onOpenEventEnquiry }) => {
  const { t } = useLanguage();

  const lawnFeatures = [
    {
      title: t('lawn_f1_title'),
      desc: t('lawn_f1_desc'),
      icon: Sparkles
    },
    {
      title: t('lawn_f2_title'),
      desc: t('lawn_f2_desc'),
      icon: UtensilsCrossed
    },
    {
      title: t('lawn_f3_title'),
      desc: t('lawn_f3_desc'),
      icon: Trees
    }
  ];

  return (
    <section id="lawn" className="py-20 lg:py-28 bg-[#0F1E36] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#E6CA65] uppercase">
              <span>05</span>
              <span aria-hidden="true">/</span>
              <span>{t('lawn_kicker')}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#FAF8F5] tracking-tight">
              {t('lawn_title')}
            </h2>

            <p className="text-base text-slate-300 leading-relaxed">
              {t('lawn_subtitle')}
            </p>
          </div>
        </ScrollReveal>

        {/* 2-Column Lawn Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Party Lawn Visual Asset with 3D Depth */}
          <div className="lg:col-span-6 relative">
            <ScrollReveal direction="left" delay={150}>
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-[#C5A880]/30 group">
                <Parallax3DImage
                  src={HOTEL_IMAGES.partyLawn}
                  alt="Sprawling open-air wedding party lawn with festive lighting at Hotel Ghunghat Gandhinagar"
                  containerClassName="h-[400px] sm:h-[480px]"
                  className="h-full"
                />
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Features and Enquiry CTA */}
          <div className="lg:col-span-6">
            <ScrollReveal direction="right" delay={200}>
              <div className="space-y-8">
                <div className="space-y-6">
                  {lawnFeatures.map((feat, idx) => {
                    const IconComponent = feat.icon;
                    return (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#C5A880]/40 transition-colors"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-lg bg-[#C5A880]/20 flex items-center justify-center text-[#E6CA65] shrink-0">
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <h3 className="font-serif text-lg font-medium text-white">
                            {feat.title}
                          </h3>
                        </div>
                        <p className="text-sm text-slate-300 leading-relaxed pl-13">
                          {feat.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Check Date Availability CTA */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onOpenEventEnquiry('Outdoor Party Lawn')}
                    className="flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#0B1325] bg-gradient-to-r from-[#D4AF37] to-[#E6CA65] rounded-xl hover:brightness-105 transition-all shadow-lg shadow-[#D4AF37]/20 whitespace-nowrap cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-[#0B1325]" />
                    <span>{t('lawn_btn_quote')}</span>
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
};
