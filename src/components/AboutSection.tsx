import React from 'react';
import { CAFE_INFO, IMAGES } from '../data/cafeData';
import { Clock } from 'lucide-react';
import { motion } from 'motion/react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-[#faf7f2] border-b border-[#ece2d0] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-14"
        >
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#e66826] mb-2">
            <span>Our Heritage & Philosophy</span>
            <span aria-hidden="true">·</span>
            <span>Est. {CAFE_INFO.established}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#23120b] tracking-tight">
            Rooted in Indore’s Vibrant Chai & Street Food Culture
          </h2>
          <p className="mt-4 text-[#5c3a27] text-base sm:text-lg leading-relaxed">
            In Indore, tea isn’t just a quick drink—it is an emotion, an unhurried pause, and an invitation to reconnect. Chai Junction Café was established in 2022 at 24, Vijay Nagar with a single mission: to honor the authentic slow-boiled kulhad chai while serving handcrafted café favorites in a warm, welcoming space.
          </p>
        </motion.div>

        {/* 2-Column Split: Visual Story & Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          {/* Left Column: Visual Showcase */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-4"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-md aspect-4/3 border border-[#e5d8c5] group">
              <img
                src={IMAGES.interior}
                alt="Chai Junction cozy seating corner"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 text-white">
                <p className="text-xs font-medium text-[#f0caa3] uppercase tracking-wider">The Living Room of Vijay Nagar</p>
                <p className="font-serif text-base sm:text-lg font-semibold mt-0.5">Where stories, friendships, and warm cups meet</p>
              </div>
            </div>

            {/* Quick Fact Banner */}
            <div className="bg-[#f3ece1] rounded-xl p-4 border border-[#e5d8c5] flex items-center justify-between text-xs text-[#4a2818]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#e66826] shrink-0" />
                <span>Open daily from 9:00 AM to 11:00 PM</span>
              </div>
              <span className="font-semibold text-[#23120b]">Indore, MP</span>
            </div>
          </motion.div>

          {/* Right Column: Editorial Pillars */}
          <div className="lg:col-span-6 space-y-5">
            {[
              {
                idx: '01. The Artisanal Kulhad Experience',
                title: 'Porous Clay that Breathes Flavour',
                desc: 'We serve our signature teas in unglazed terracotta clay pots sourced from traditional regional potters. The porous baked clay imparts an unmistakable earthy sweetness (mitti ki khushboo) that glass or paper cups could never replicate.',
              },
              {
                idx: '02. Hand-Pounded Fresh Spices',
                title: 'Real Herbs, No Synthetic Syrups',
                desc: 'Every batch of Masala Chai and Ginger Tea is simmered with freshly crushed adrak, green cardamom, whole cloves, and Ceylon cinnamon. Paired with farm-fresh full-cream milk, every sip is deeply comforting and digestive.',
              },
              {
                idx: '03. Fast Food Crafted with Care',
                title: 'Gourmet Sandwiches, Burgers & Pizzas',
                desc: 'From our molten Cheese Sandwich and crispy Paneer Burger to hand-tossed Veg Cheese Pizza, our kitchen prepares each order fresh on the spot using high-quality butter, crisp greens, and house-made sauces.',
              },
            ].map((pillar, i) => (
              <motion.div
                key={pillar.idx}
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ y: -3 }}
                className="p-5 bg-white rounded-xl border border-[#ece2d0] shadow-2xs hover:shadow-xs hover:border-[#dfcbb3] transition-all"
              >
                <span className="text-xs font-semibold tracking-wider text-[#e66826]">{pillar.idx}</span>
                <h3 className="font-serif text-lg font-bold text-[#23120b] mt-1 mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#5c3a27] leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Café Promise Strip with stagger reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-[#ece2d0] text-center"
        >
          {[
            { val: '2022', label: 'Established in Indore' },
            { val: '100%', label: 'Pure Vegetarian Menu' },
            { val: '14 hrs', label: 'Daily Fresh Service' },
            { val: '₹25', label: 'Chai Starting Price' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-serif text-2xl sm:text-3xl font-bold text-[#23120b] tabular-nums">{stat.val}</p>
              <p className="text-xs text-[#6e4631] mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
