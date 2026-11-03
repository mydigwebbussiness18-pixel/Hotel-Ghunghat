import React from 'react';
import { Users, Bed, Check, ShieldCheck, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ROOMS_DATA } from '../constants/hotelData';
import { ScrollReveal } from './ScrollReveal';

interface RoomsProps {
  onSelectRoom: (roomId: string) => void;
}

export const Rooms: React.FC<RoomsProps> = ({ onSelectRoom }) => {
  const { t } = useLanguage();

  return (
    <section id="rooms" className="py-20 lg:py-28 bg-[#F4EFEA]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#9E7D3B] uppercase">
              <span>02</span>
              <span aria-hidden="true">/</span>
              <span>{t('rooms_kicker')}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-slate-900 tracking-tight">
              {t('rooms_title')}
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              {t('rooms_subtitle')}
            </p>
          </div>
        </ScrollReveal>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ROOMS_DATA.map((room, idx) => (
            <ScrollReveal key={room.id} direction="up" delay={idx * 150} tilt>
              <div
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl hover:-translate-y-2 hover:border-[#C5A880]/50 transition-all duration-300 flex flex-col group h-full"
              >
              {/* Room Image */}
              <div className="relative h-64 overflow-hidden bg-slate-900">
                <img
                  src={room.image}
                  alt={t(room.nameKey)}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Meta details strip */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded">
                    <Users className="w-3.5 h-3.5 text-[#E6CA65]" />
                    <span>{room.occupancy}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded">
                    <Bed className="w-3.5 h-3.5 text-[#E6CA65]" />
                    <span>{room.bedType}</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-slate-900">
                    {t(room.nameKey)}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {t(room.descKey)}
                  </p>

                  {/* Amenities List */}
                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                      Room Amenities
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                      {room.features.slice(0, 4).map((feat, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#9E7D3B] shrink-0" />
                          <span className="truncate">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Booking Button */}
                <div className="pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => onSelectRoom(room.id)}
                    className="btn-luxury-navy w-full py-3.5 px-4 text-sm font-semibold rounded-xl cursor-pointer group/btn"
                  >
                    <span>{t('room_book_btn')}</span>
                    <ArrowRight className="w-4 h-4 text-[#E6CA65] group-hover/btn:text-[#0B1325] group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Transparent Hotel Policy Notice */}
        <ScrollReveal direction="up" delay={250}>
          <div className="mt-12 p-5 bg-white border border-[#C5A880]/30 rounded-xl max-w-3xl mx-auto shadow-sm flex items-start gap-3.5">
            <ShieldCheck className="w-5 h-5 text-[#9E7D3B] shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-slate-600 space-y-1">
              <span className="font-semibold text-slate-900 block">{t('rooms_notice_badge')}</span>
              <p>{t('rooms_notice_text')}</p>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
