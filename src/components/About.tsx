import React from 'react';
import { Check, MapPin, Award, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { HOTEL_IMAGES, HOTEL_INFO } from '../constants/hotelData';
import { ScrollReveal } from './ScrollReveal';
import { Parallax3DImage } from './Parallax3DImage';

export const About: React.FC = () => {
  const { t } = useLanguage();

  const highlights = [
    t('about_feature_1'),
    t('about_feature_2'),
    t('about_feature_3'),
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Asset with 3D Depth Frame */}
          <div className="lg:col-span-5 relative">
            <ScrollReveal direction="left" delay={100}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#C5A880]/30 bg-slate-900 group">
                <Parallax3DImage
                  src={HOTEL_IMAGES.hero}
                  alt="Hotel Ghunghat Gandhinagar exterior and entrance"
                  containerClassName="h-[420px] sm:h-[480px]"
                  className="h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1325]/85 via-transparent to-transparent pointer-events-none" />
                
                {/* Overlay card for location verification */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0B1325]/90 backdrop-blur-md border border-[#C5A880]/30 text-white pointer-events-none">
                  <div className="flex items-center gap-2 text-xs text-[#E6CA65] font-medium uppercase tracking-wider mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Sector-26, Gandhinagar</span>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2">
                    Near GIDC, Gandhinagar-Mansa Road, Gujarat 382028
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Subtle decorative gold corner outline */}
            <div className="hidden sm:block absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-[#C5A880]/40 rounded-tl-2xl -z-10" />
            <div className="hidden sm:block absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-[#C5A880]/40 rounded-br-2xl -z-10" />
          </div>

          {/* Right Column: Editorial Narrative & Values */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="right" delay={200}>
              <div className="space-y-6">
                {/* Kicker */}
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#9E7D3B] uppercase">
                  <span>01</span>
                  <span aria-hidden="true">/</span>
                  <span>{t('about_kicker')}</span>
                </div>

                {/* Main Headline */}
                <h2 className="font-serif text-3xl sm:text-4xl text-slate-900 tracking-tight leading-[1.25] text-balance">
                  {t('about_title')}
                </h2>

                {/* Body Copy */}
                <div className="space-y-4 text-slate-600 text-base leading-relaxed">
                  <p>{t('about_p1')}</p>
                  <p>{t('about_p2')}</p>
                </div>

                {/* Feature List */}
                <div className="space-y-3 pt-2">
                  {highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-1 w-5 h-5 rounded-full bg-[#C5A880]/20 flex items-center justify-center shrink-0 text-[#9E7D3B]">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-sm font-medium text-slate-800">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Key Verified Metric Anchors */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-900">
                      <Award className="w-4 h-4 text-[#D4AF37]" />
                      <span className="font-serif text-xl sm:text-2xl font-bold">{HOTEL_INFO.rating}/5</span>
                    </div>
                    <div className="text-xs text-slate-500 font-medium">{t('about_stat_1_lbl')}</div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-900">
                      <Clock className="w-4 h-4 text-[#D4AF37]" />
                      <span className="font-serif text-xl sm:text-2xl font-bold">24 / 7</span>
                    </div>
                    <div className="text-xs text-slate-500 font-medium">{t('about_stat_2_lbl')}</div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-900">
                      <MapPin className="w-4 h-4 text-[#D4AF37]" />
                      <span className="font-serif text-xl sm:text-2xl font-bold">Sec-26</span>
                    </div>
                    <div className="text-xs text-slate-500 font-medium">{t('about_stat_3_lbl')}</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
};
