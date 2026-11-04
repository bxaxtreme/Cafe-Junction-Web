import React, { useState } from 'react';
import { GALLERY_IMAGES } from '../data/cafeData';
import { X, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<(typeof GALLERY_IMAGES)[0] | null>(null);

  const categories = ['All', 'Ambiance', 'Chais & Brews', 'Food & Snacks'];

  const filteredImages =
    activeCategory === 'All'
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === activeCategory);

  return (
    <section id="gallery" className="py-20 bg-[#faf7f2] border-b border-[#ece2d0] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#e66826] mb-2">
              <span>Visual Moments & Daily Brews</span>
              <span aria-hidden="true">·</span>
              <span>Vijay Nagar, Indore</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#23120b] tracking-tight">
              Life at Chai Junction Café
            </h2>
            <p className="mt-2 text-[#5c3a27] text-sm sm:text-base max-w-xl">
              Glimpses into our warm interiors, artisanal terracotta brewing rituals, and savory comfort plates.
            </p>
          </div>

          {/* Gallery Category Selector */}
          <div className="flex items-center gap-1.5 p-1 bg-[#f3ece1] rounded-lg border border-[#e5d8c5]">
            {categories.map((cat) => (
              <motion.button
                whileTap={{ scale: 0.95 }}
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-[#23120b] text-white shadow-2xs'
                    : 'text-[#4a2818] hover:text-[#23120b]'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -4 }}
                key={img.id}
                onClick={() => setSelectedImage(img)}
                className="group relative rounded-xl overflow-hidden aspect-4/3 bg-stone-200 border border-[#e5d8c5] shadow-2xs cursor-pointer"
              >
                <img
                  src={img.src}
                  alt={img.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                {/* Overlay with subtle gradient scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

                <div className="absolute bottom-0 inset-x-0 p-5 text-white transform transition-transform duration-300">
                  <span className="text-[11px] font-medium text-[#f0caa3] uppercase tracking-wider block mb-1">
                    {img.category}
                  </span>
                  <h3 className="font-serif text-lg font-bold leading-snug text-white">
                    {img.title}
                  </h3>
                  <p className="text-xs text-stone-300 mt-1 line-clamp-2 leading-relaxed">
                    {img.caption}
                  </p>
                </div>

                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-xs flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal with AnimatePresence */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="bg-[#23120b] text-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-stone-800"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative aspect-16/9 bg-black">
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-[#e66826] font-semibold tracking-wider uppercase mb-1">
                    <span>{selectedImage.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>Chai Junction Indore</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                    {selectedImage.title}
                  </h3>
                  <p className="text-sm text-stone-300 mt-2 leading-relaxed">
                    {selectedImage.caption}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
