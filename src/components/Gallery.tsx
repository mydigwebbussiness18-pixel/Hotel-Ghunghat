import React, { useState } from 'react';
import { X, ZoomIn, Eye } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { GALLERY_DATA } from '../constants/hotelData';
import { GalleryItem } from '../types';
import { ScrollReveal } from './ScrollReveal';

export const Gallery: React.FC = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', labelKey: 'gal_all' },
    { id: 'exterior', labelKey: 'gal_cat_exterior' },
    { id: 'rooms', labelKey: 'gal_cat_rooms' },
    { id: 'restaurant', labelKey: 'gal_cat_restaurant' },
    { id: 'banquet', labelKey: 'gal_cat_banquet' },
    { id: 'lawn', labelKey: 'gal_cat_lawn' },
    { id: 'events', labelKey: 'gal_cat_events' },
  ];

  const filteredItems = activeCategory === 'all'
    ? GALLERY_DATA
    : GALLERY_DATA.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#9E7D3B] uppercase">
              <span>06</span>
              <span aria-hidden="true">/</span>
              <span>{t('gal_kicker')}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-slate-900 tracking-tight">
              {t('gal_title')}
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              {t('gal_subtitle')}
            </p>
          </div>
        </ScrollReveal>

        {/* Category Filter Tabs (Interactive segmented buttons, zero-pill discipline) */}
        <ScrollReveal direction="up" delay={100}>
          <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-[#0B1325] text-white shadow-md'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {t(cat.labelKey)}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <ScrollReveal key={item.id} direction="up" delay={idx * 60} tilt>
              <div
                onClick={() => setSelectedImage(item)}
                className="group relative rounded-2xl overflow-hidden bg-slate-900 shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer aspect-[16/10]"
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                <div className="absolute inset-0 p-5 flex flex-col justify-between">
                  <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-[#E6CA65] uppercase tracking-wider block">
                      {item.category.toUpperCase()}
                    </span>
                    <h3 className="font-serif text-base sm:text-lg font-medium text-white">
                      {t(item.titleKey)}
                    </h3>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Honest illustrative note */}
        <p className="text-center text-xs text-slate-500 mt-8">
          {t('gal_illustrative_note')}
        </p>

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#0B1325] rounded-2xl overflow-hidden border border-white/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-black/80 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative max-h-[75vh] overflow-hidden flex items-center justify-center bg-black">
              <img
                src={selectedImage.image}
                alt={selectedImage.alt}
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[75vh] object-contain"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-[#0B1325] border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-white">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#E6CA65] font-semibold block">
                  {selectedImage.category.toUpperCase()}
                </span>
                <h4 className="font-serif text-xl font-medium">
                  {t(selectedImage.titleKey)}
                </h4>
                <p className="text-xs text-slate-400 mt-1">{selectedImage.alt}</p>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Eye className="w-4 h-4 text-[#E6CA65]" />
                <span>Hotel Ghunghat, Gandhinagar</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
