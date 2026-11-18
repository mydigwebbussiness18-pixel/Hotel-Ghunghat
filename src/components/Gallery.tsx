import React, { useState, useEffect, useCallback } from 'react';
import { X, ZoomIn, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
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

  const selectedIndex = selectedImage
    ? filteredItems.findIndex((item) => item.id === selectedImage.id)
    : -1;

  const handlePrevImage = useCallback(() => {
    if (selectedIndex < 0 || filteredItems.length === 0) return;
    const prevIdx = (selectedIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedImage(filteredItems[prevIdx]);
  }, [selectedIndex, filteredItems]);

  const handleNextImage = useCallback(() => {
    if (selectedIndex < 0 || filteredItems.length === 0) return;
    const nextIdx = (selectedIndex + 1) % filteredItems.length;
    setSelectedImage(filteredItems[nextIdx]);
  }, [selectedIndex, filteredItems]);

  useEffect(() => {
    if (!selectedImage) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImage(null);
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'ArrowRight') handleNextImage();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedImage, handlePrevImage, handleNextImage]);

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-[#FAF8F5] relative overflow-hidden">
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
          <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-2.5 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-[#0B1325] text-[#E6CA65] border border-[#E6CA65]/60 shadow-lg shadow-[#0B1325]/25 -translate-y-0.5 scale-[1.02]'
                    : 'bg-white text-slate-700 hover:bg-[#0B1325] hover:text-[#E6CA65] hover:border-[#0B1325] border border-slate-200/90 shadow-2xs hover:-translate-y-0.5 hover:shadow-md'
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
            <ScrollReveal key={item.id} direction="up" delay={Math.min(idx * 50, 300)} tilt>
              <div
                onClick={() => setSelectedImage(item)}
                className="group relative rounded-2xl overflow-hidden bg-slate-900 shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer aspect-[4/3]"
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: item.objectPosition || 'center' }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

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
              className="absolute top-4 right-4 z-20 w-11 h-11 rounded-full bg-[#0B1325]/85 text-white border border-white/25 hover:bg-[#E6CA65] hover:text-[#0B1325] hover:border-[#E6CA65] hover:scale-105 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(230,202,101,0.4)] flex items-center justify-center transition-all duration-300 cursor-pointer"
              aria-label="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image with Prev/Next Navigation */}
            <div className="relative max-h-[75vh] overflow-hidden flex items-center justify-center bg-black">
              {filteredItems.length > 1 && (
                <button
                  type="button"
                  onClick={handlePrevImage}
                  aria-label="Previous gallery image"
                  className="absolute left-3 sm:left-4 z-20 w-10 h-10 rounded-full bg-[#0B1325]/80 text-white border border-white/20 hover:bg-[#E6CA65] hover:text-[#0B1325] hover:border-[#E6CA65] flex items-center justify-center transition-all duration-200 cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              <img
                src={selectedImage.image}
                alt={selectedImage.alt}
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[75vh] object-contain"
              />

              {filteredItems.length > 1 && (
                <button
                  type="button"
                  onClick={handleNextImage}
                  aria-label="Next gallery image"
                  className="absolute right-3 sm:right-4 z-20 w-10 h-10 rounded-full bg-[#0B1325]/80 text-white border border-white/20 hover:bg-[#E6CA65] hover:text-[#0B1325] hover:border-[#E6CA65] flex items-center justify-center transition-all duration-200 cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-[#0B1325] border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-white">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#E6CA65] font-semibold block">
                  {selectedImage.category.toUpperCase()}
                  {filteredItems.length > 1 && selectedIndex >= 0 ? ` · ${selectedIndex + 1} / ${filteredItems.length}` : ''}
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
