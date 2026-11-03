import React from 'react';
import { Star, ExternalLink, MapPin, CheckCircle, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { HOTEL_INFO } from '../constants/hotelData';
import { ScrollReveal } from './ScrollReveal';

export const GoogleReviews: React.FC = () => {
  const { t } = useLanguage();

  const reviewSnippets = [
    {
      text: t('reviews_highlight_1_text'),
      author: t('reviews_highlight_1_author'),
      rating: 5
    },
    {
      text: t('reviews_highlight_2_text'),
      author: t('reviews_highlight_2_author'),
      rating: 4
    },
    {
      text: t('reviews_highlight_3_text'),
      author: t('reviews_highlight_3_author'),
      rating: 5
    }
  ];

  return (
    <section className="py-20 lg:py-24 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Rating Header Block */}
        <ScrollReveal direction="up">
          <div className="bg-[#0B1325] text-white rounded-3xl p-8 sm:p-12 border border-[#C5A880]/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A880]/10 rounded-full blur-3xl -z-0" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Score & Badge */}
            <div className="lg:col-span-5 text-center lg:text-left space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#E6CA65] tracking-widest uppercase">
                <span>Google Business Verified</span>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-4">
                <span className="font-serif text-5xl sm:text-6xl font-bold text-white tracking-tight">
                  {HOTEL_INFO.rating}
                </span>
                <div className="space-y-1 text-left">
                  <div className="flex items-center text-[#E6CA65]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < 4
                            ? 'fill-[#E6CA65] text-[#E6CA65]'
                            : 'fill-[#E6CA65]/30 text-[#E6CA65]'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-xs text-slate-300">
                    out of 5.0 stars
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-300">
                {t('reviews_subtitle')}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <a
                  href={HOTEL_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#0B1325] bg-gradient-to-r from-[#D4AF37] to-[#E6CA65] rounded-lg hover:brightness-105 transition-all shadow-md whitespace-nowrap"
                >
                  <span>{t('reviews_btn_google')}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={HOTEL_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-medium text-slate-200 bg-white/10 hover:bg-white/15 border border-white/20 rounded-lg transition-all whitespace-nowrap"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#E6CA65]" />
                  <span>{t('reviews_btn_directions')}</span>
                </a>
              </div>
            </div>

            {/* Review Cards Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {reviewSnippets.map((rev, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col justify-between space-y-4 text-left"
                >
                  <div className="space-y-2">
                    <div className="flex items-center text-[#E6CA65]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#E6CA65] text-[#E6CA65]" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed italic">
                      &ldquo;{rev.text}&rdquo;
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center gap-1.5 text-[11px] text-[#E6CA65]">
                    <CheckCircle className="w-3 h-3 text-[#E6CA65]" />
                    <span>{rev.author}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Integrity Note */}
          <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-slate-400 text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-[#E6CA65]" />
            <span>{t('reviews_policy_note')}</span>
          </div>

        </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
