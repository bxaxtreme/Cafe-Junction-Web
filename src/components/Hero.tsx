import React from 'react';
import { ArrowRight, Utensils, MessageSquare, Coffee, Sparkles, Flame } from 'lucide-react';
import { CAFE_INFO, IMAGES } from '../data/cafeData';
import { motion } from 'motion/react';

interface HeroProps {
  onOrderNow: () => void;
  onExploreMenu: () => void;
  onBookTable: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderNow, onExploreMenu, onBookTable }) => {
  return (
    <section className="relative overflow-hidden bg-[#23120b] text-[#faf7f2]">
      {/* Background Photography with smooth cinematic zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          initial={{ scale: 1.1, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
          src={IMAGES.hero}
          alt="Chai Junction Café ambiance in Indore"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />
        {/* Measured Scrim for WCAG AA readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#170a05]/95 via-[#23120b]/85 to-[#170a05]/65" />
        <div className="absolute inset-0 bg-radial-[at_top_right] from-[#e66826]/20 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Main Hero Copy */}
          <div className="lg:col-span-7">
            {/* Clean Unboxed Metadata Kicker with stagger */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2.5 text-xs tracking-wider uppercase text-[#f0caa3] font-medium mb-4"
            >
              <span className="text-[#e66826] font-semibold">{CAFE_INFO.location}</span>
              <span aria-hidden="true" className="text-stone-500">·</span>
              <span>Est. {CAFE_INFO.established}</span>
              <span aria-hidden="true" className="text-stone-500">·</span>
              <span className="text-emerald-400 font-medium">Open 9:00 AM – 11:00 PM</span>
            </motion.div>

            {/* Main Hero Headline with animated entrance */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6 [text-wrap:balance]"
            >
              {CAFE_INFO.tagline}
            </motion.h1>

            {/* Subtitle / Value Proposition */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg sm:text-xl text-[#f3ece1]/90 font-light leading-relaxed mb-8 max-w-xl"
            >
              Welcome to <span className="font-medium text-white">Chai Junction Café</span>. From slow-boiled terracotta kulhads to chilled blended coffees and freshly grilled sandwiches, we brew comforting memories in Vijay Nagar.
            </motion.p>

            {/* Hero CTAs with tactile hover & tap */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOrderNow}
                className="px-6 py-3.5 bg-[#e66826] hover:bg-[#d45b1b] active:bg-[#bd4d13] text-white font-medium text-sm rounded-lg transition-colors shadow-md hover:shadow-xl flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <span>Order Online Now</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onExploreMenu}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 active:bg-white/15 text-white font-medium text-sm rounded-lg backdrop-blur-xs border border-white/20 transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <Utensils className="w-4 h-4 text-[#f0caa3]" />
                <span>Explore Menu</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onBookTable}
                className="px-4 py-3.5 text-stone-300 hover:text-white text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <MessageSquare className="w-4 h-4 text-[#e66826]" />
                <span>Reserve Table</span>
              </motion.button>
            </motion.div>

            {/* Signature Quick Highlights Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.6 }}
              className="pt-6 border-t border-white/15 grid grid-cols-3 gap-4 text-xs text-stone-300"
            >
              <div>
                <p className="font-serif text-lg font-bold text-white tabular-nums">₹25</p>
                <p className="text-stone-400 mt-0.5">Classic Masala Chai</p>
              </div>
              <div>
                <p className="font-serif text-lg font-bold text-white tabular-nums">100%</p>
                <p className="text-stone-400 mt-0.5">Pure Veg & Fresh</p>
              </div>
              <div>
                <p className="font-serif text-lg font-bold text-white tabular-nums">4.9 ★</p>
                <p className="text-stone-400 mt-0.5">850+ Indore Reviews</p>
              </div>
            </motion.div>
          </div>

          {/* Right Floating Atmospheric Interactive Chai Badge / Card */}
          <div className="lg:col-span-5 hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative p-7 rounded-2xl bg-[#341a0f]/80 backdrop-blur-md border border-[#522b19] shadow-2xl animate-float"
            >
              {/* Steaming Kulhad Chai Badge */}
              <div className="flex items-start gap-4">
                <div className="relative w-16 h-16 rounded-xl bg-[#23120b] border border-[#e66826]/30 flex items-center justify-center shrink-0 shadow-inner">
                  {/* Steam Wisps */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-1 pointer-events-none">
                    <span className="w-1.5 h-6 bg-gradient-to-t from-stone-400 to-transparent rounded-full animate-steam-1" />
                    <span className="w-1.5 h-8 bg-gradient-to-t from-amber-200 to-transparent rounded-full animate-steam-2" />
                    <span className="w-1.5 h-6 bg-gradient-to-t from-stone-400 to-transparent rounded-full animate-steam-3" />
                  </div>
                  <Coffee className="w-8 h-8 text-[#e66826]" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#e66826]">
                      Specialty of the House
                    </span>
                    <span className="text-[10px] bg-[#e66826]/20 text-[#f0caa3] px-2 py-0.5 rounded-full font-medium">
                      Simmering Now
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-xl text-white mt-1">
                    Authentic Kulhad Chai
                  </h3>
                  <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                    Earthen clay aroma, hand-crushed ginger, whole green cardamom & cinnamon.
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-stone-400 uppercase tracking-wider">Starting at</span>
                  <p className="font-serif font-bold text-xl text-[#f0caa3] tabular-nums">₹35</p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onOrderNow}
                  className="px-4 py-2 bg-[#e66826] hover:bg-[#d45b1b] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  Quick Add
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
