import React, { useState, useMemo } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  Search, 
  X, 
  Clock, 
  Car, 
  ShieldAlert, 
  Utensils, 
  PartyPopper, 
  MapPin, 
  Wifi, 
  CreditCard, 
  IdCard,
  Phone,
  MessageCircle,
  CalendarCheck,
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { HOTEL_INFO } from '../constants/hotelData';
import { ScrollReveal } from './ScrollReveal';

type FAQCategory = 'all' | 'stay' | 'dining' | 'events' | 'policies';

interface FAQItem {
  id: string;
  category: FAQCategory;
  questionKey: string;
  answerKey: string;
  icon: React.ElementType;
  badgeKey?: string;
  popular?: boolean;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'checkin-checkout',
    category: 'stay',
    questionKey: 'faq_q_checkin',
    answerKey: 'faq_a_checkin',
    icon: Clock,
    popular: true
  },
  {
    id: 'parking-facility',
    category: 'policies',
    questionKey: 'faq_q_parking',
    answerKey: 'faq_a_parking',
    icon: Car,
    popular: true
  },
  {
    id: 'pet-policy',
    category: 'policies',
    questionKey: 'faq_q_pets',
    answerKey: 'faq_a_pets',
    icon: ShieldAlert,
    popular: true
  },
  {
    id: 'food-restaurant',
    category: 'dining',
    questionKey: 'faq_q_dining',
    answerKey: 'faq_a_dining',
    icon: Utensils,
    popular: true
  },
  {
    id: 'banquet-events',
    category: 'events',
    questionKey: 'faq_q_events',
    answerKey: 'faq_a_events',
    icon: PartyPopper,
    popular: true
  },
  {
    id: 'location-proximity',
    category: 'stay',
    questionKey: 'faq_q_location',
    answerKey: 'faq_a_location',
    icon: MapPin
  },
  {
    id: 'wifi-connectivity',
    category: 'stay',
    questionKey: 'faq_q_wifi',
    answerKey: 'faq_a_wifi',
    icon: Wifi
  },
  {
    id: 'id-requirements',
    category: 'policies',
    questionKey: 'faq_q_id',
    answerKey: 'faq_a_id',
    icon: IdCard
  },
  {
    id: 'payment-modes',
    category: 'policies',
    questionKey: 'faq_q_payment',
    answerKey: 'faq_a_payment',
    icon: CreditCard
  }
];

interface FAQProps {
  onOpenBooking?: () => void;
  onOpenEventEnquiry?: () => void;
}

export const FAQ: React.FC<FAQProps> = ({ onOpenBooking, onOpenEventEnquiry }) => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<FAQCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState<string[]>(['checkin-checkout', 'parking-facility', 'pet-policy']);

  const toggleItem = (id: string) => {
    setOpenIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const categories: { id: FAQCategory; labelKey: string }[] = [
    { id: 'all', labelKey: 'faq_cat_all' },
    { id: 'stay', labelKey: 'faq_cat_stay' },
    { id: 'dining', labelKey: 'faq_cat_dining' },
    { id: 'events', labelKey: 'faq_cat_events' },
    { id: 'policies', labelKey: 'faq_cat_policies' },
  ];

  // Filter items based on category and search query
  const filteredItems = useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'policies') {
          // Both policies and parking/pets qualify
          if (item.category !== 'policies') return false;
        } else if (item.category !== selectedCategory) {
          return false;
        }
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const question = t(item.questionKey).toLowerCase();
        const answer = t(item.answerKey).toLowerCase();
        return question.includes(query) || answer.includes(query);
      }

      return true;
    });
  }, [selectedCategory, searchQuery, t]);

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <section id="faq" className="py-24 bg-[#FAF8F5] relative overflow-hidden">
      {/* Decorative background ambient circles */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-[#0B1325]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with 3D Scroll Reveal */}
        <ScrollReveal direction="up" delay={0}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C5A880]/15 border border-[#C5A880]/30 text-xs font-semibold tracking-wider text-[#8C6D3B] uppercase mb-4 shadow-xs">
              <HelpCircle className="w-4 h-4 text-[#C5A880]" />
              <span>{t('faq_kicker')}</span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B1325] tracking-tight mb-4">
              {t('faq_title')}
            </h2>
            
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {t('faq_subtitle')}
            </p>
          </div>
        </ScrollReveal>

        {/* Search Bar & Category Filters */}
        <ScrollReveal direction="up" delay={100}>
          <div className="space-y-6 mb-10">
            {/* Search Input */}
            <div className="relative max-w-2xl mx-auto">
              <div className="relative flex items-center">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('faq_search_placeholder')}
                  className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent shadow-sm transition-all"
                  aria-label="Search frequently asked questions"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3.5 p-1 text-slate-400 hover:text-[#E6CA65] hover:bg-[#0B1325] rounded-full transition-all duration-200 cursor-pointer"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                    }}
                    className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-[#0B1325] text-[#E6CA65] border border-[#E6CA65]/60 shadow-lg shadow-[#0B1325]/25 -translate-y-0.5 scale-[1.02]'
                        : 'bg-white text-slate-700 hover:bg-[#0B1325] hover:text-[#E6CA65] hover:border-[#0B1325] border border-slate-200/90 shadow-2xs hover:-translate-y-0.5 hover:shadow-md'
                    }`}
                  >
                    {t(cat.labelKey)}
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5 mb-14">
          {filteredItems.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center border border-slate-200/80 shadow-xs max-w-lg mx-auto">
              <HelpCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600 text-sm font-medium mb-4">{t('faq_no_results')}</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href={`tel:${HOTEL_INFO.phoneClean}`}
                  className="btn-luxury-navy px-4 py-2.5 rounded-xl text-xs font-semibold"
                >
                  <Phone className="w-3.5 h-3.5 text-[#E6CA65]" />
                  <span>+91 98253 00161</span>
                </a>
                <a
                  href={`https://wa.me/${HOTEL_INFO.whatsappNumber}?text=Hello%20Hotel%20Ghunghat,%20I%20have%20an%20inquiry`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-luxury-whatsapp px-4 py-2.5 rounded-xl text-xs font-semibold"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isOpen = openIds.includes(item.id);
              const IconComponent = item.icon;

              return (
                <ScrollReveal
                  key={item.id}
                  direction="up"
                  delay={Math.min(index * 40, 300)}
                >
                  <div
                    className={`rounded-2xl transition-all duration-300 border ${
                      isOpen
                        ? 'bg-white border-[#C5A880]/60 shadow-md shadow-[#C5A880]/10 ring-1 ring-[#C5A880]/20'
                        : 'bg-white/90 hover:bg-white border-slate-200/90 hover:border-[#C5A880]/40 shadow-xs'
                    }`}
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-start sm:items-center justify-between gap-4 cursor-pointer focus:outline-none"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${item.id}`}
                    >
                      <div className="flex items-start sm:items-center gap-3.5 flex-1">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                            isOpen
                              ? 'bg-[#0B1325] text-[#E6CA65]'
                              : 'bg-slate-100 text-slate-600 group-hover:bg-[#C5A880]/10'
                          }`}
                        >
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="font-serif text-base sm:text-lg font-semibold text-[#0B1325] leading-snug">
                            {t(item.questionKey)}
                          </h3>
                        </div>
                      </div>

                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isOpen
                            ? 'bg-[#0B1325] text-white rotate-180'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {/* Smooth expanding answer */}
                    <div
                      id={`faq-answer-${item.id}`}
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 mt-1">
                        <p className="pl-12 sm:pl-12.5 text-slate-700 font-normal">
                          {t(item.answerKey)}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })
          )}
        </div>

        {/* Still Have Questions? Ultra-Premium Contact Card */}
        <ScrollReveal direction="up" delay={200}>
          <div className="relative rounded-3xl bg-gradient-to-br from-[#0B1325] via-[#152243] to-[#0B1325] p-8 sm:p-10 text-white shadow-xl shadow-black/20 border border-[#C5A880]/30 overflow-hidden">
            {/* Ambient luxury light effect */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#C5A880]/15 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-xl space-y-2.5">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E6CA65]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>24/7 Dedicated Assistance</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {t('faq_cta_title')}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {t('faq_cta_desc')}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href={`tel:${HOTEL_INFO.phoneClean}`}
                  className="btn-luxury-glass px-5 py-3 rounded-xl text-sm font-medium"
                >
                  <Phone className="w-4 h-4 text-[#E6CA65]" />
                  <span>{t('faq_cta_call')}</span>
                </a>

                <a
                  href={`https://wa.me/${HOTEL_INFO.whatsappNumber}?text=Hello%20Hotel%20Ghunghat,%20I%20have%20an%20inquiry%20regarding%20stay/dining/events`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-luxury-whatsapp px-5 py-3 rounded-xl text-sm font-semibold"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t('faq_cta_whatsapp')}</span>
                </a>

                {onOpenBooking && (
                  <button
                    onClick={onOpenBooking}
                    className="btn-luxury-gold px-5 py-3 rounded-xl text-sm font-semibold cursor-pointer"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    <span>{t('faq_cta_book')}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
