import React, { useState } from 'react';
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
  const [selectedLawnIdx, setSelectedLawnIdx] = useState(0);

  const lawnGallery = [
    {
      src: HOTEL_IMAGES.lawnSunsetEvent,
      alt: 'Sunset anniversary and outdoor celebration setup on Hotel Ghunghat party lawn',
      label: 'Sunset Events'
    },
    {
      src: HOTEL_IMAGES.lawnBuildingDay,
      alt: 'Expansive manicured green lawn overlooking Hotel Ghunghat resort wing',
      label: 'Main Lawn'
    },
    {
      src: HOTEL_IMAGES.gardenDay,
      alt: 'Lush landscaped garden lawn with stone courtyard wall and palm trees',
      label: 'Garden Area'
    },
    {
      src: HOTEL_IMAGES.partyLawn,
      alt: 'Sprawling open-air wedding party lawn with festive lighting at Hotel Ghunghat Gandhinagar',
      label: 'Evening Decor'
    }
  ];

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
          
          {/* Left Column: Party Lawn Visual Asset with 3D Depth + Outdoor/Garden Thumbnails */}
          <div className="lg:col-span-6 relative">
            <ScrollReveal direction="left" delay={150}>
              <div className="space-y-4">
                <div
                  className="rounded-2xl overflow-hidden shadow-2xl border border-[#C5A880]/30 group relative animate-float-card-deep"
                  style={{ animationDelay: '1.15s' }}
                >
                  <Parallax3DImage
                    key={lawnGallery[selectedLawnIdx].src}
                    src={lawnGallery[selectedLawnIdx].src}
                    alt={lawnGallery[selectedLawnIdx].alt}
                    containerClassName="h-[340px] sm:h-[420px]"
                    className="h-full"
                  />
                </div>

                {/* Responsive Garden & Lawn Thumbnail Strip */}
                <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
                  {lawnGallery.map((item, idx) => (
                    <button
                      key={item.src}
                      type="button"
                      onClick={() => setSelectedLawnIdx(idx)}
                      aria-label={`View ${item.label}`}
                      className={`group/thumb relative rounded-xl overflow-hidden aspect-[4/3] border transition-all duration-300 cursor-pointer ${
                        idx === selectedLawnIdx
                          ? 'border-[#E6CA65] ring-2 ring-[#E6CA65]/40 shadow-lg scale-[1.02]'
                          : 'border-white/15 opacity-75 hover:opacity-100 hover:border-[#C5A880]/50'
                      }`}
                    >
                      <img
                        src={item.src}
                        alt={item.alt}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                      <span className="absolute bottom-1.5 left-1.5 right-1.5 text-[10px] sm:text-[11px] font-medium text-white truncate text-left">
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>
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
                    className="btn-luxury-gold px-7 py-3.5 text-sm font-semibold rounded-xl whitespace-nowrap cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
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
