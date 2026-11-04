import React, { useState, useMemo } from 'react';
import { MENU_ITEMS } from '../data/cafeData';
import { MenuItem, MenuCategory } from '../types';
import { Search, Plus, Check, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem) => void;
  onOpenOrderModal: () => void;
  cartCount: number;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onAddToCart,
  onOpenOrderModal,
  cartCount,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const categories: { id: MenuCategory; label: string }[] = [
    { id: 'all', label: 'All Items' },
    { id: 'chais', label: 'Chais & Teas' },
    { id: 'cold', label: 'Cold Brews & Shakes' },
    { id: 'bites', label: 'Sandwiches & Fries' },
    { id: 'pizza_burger', label: 'Pizzas & Burgers' },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchesQuery =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const handleAdd = (item: MenuItem) => {
    onAddToCart(item);
    setJustAddedId(item.id);
    setTimeout(() => {
      setJustAddedId((prev) => (prev === item.id ? null : prev));
    }, 1200);
  };

  return (
    <section id="menu" className="py-20 bg-[#f7f2eb] border-b border-[#ece2d0] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#e66826] mb-2">
              <span>Authentic Flavors & Fresh Comforts</span>
              <span aria-hidden="true">·</span>
              <span>100% Vegetarian</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#23120b] tracking-tight">
              Our Handcrafted Café Menu
            </h2>
            <p className="mt-2 text-[#5c3a27] text-sm sm:text-base">
              Prepared to order with farm-fresh dairy, slow-ground spices, and crisp gourmet ingredients.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search chai, sandwich, pizza..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white rounded-lg border border-[#e2d5c3] text-sm text-[#23120b] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#e66826]/30 focus:border-[#e66826] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </motion.div>

        {/* Category Filters (Interactive Segmented Buttons with animated pill indicator) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <motion.button
              whileTap={{ scale: 0.95 }}
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap shrink-0 cursor-pointer relative ${
                selectedCategory === cat.id
                  ? 'bg-[#23120b] text-white shadow-xs'
                  : 'bg-white text-[#4a2818] border border-[#e5d8c5] hover:border-[#cbbaa2]'
              }`}
            >
              {cat.label}
              {cat.id === 'all' && (
                <span className="ml-1.5 text-xs opacity-75 tabular-nums">
                  ({MENU_ITEMS.length})
                </span>
              )}
            </motion.button>
          ))}
        </div>

        {/* Menu Grid with AnimatePresence */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-[#e5d8c5]">
            <p className="font-serif text-lg font-medium text-[#23120b]">No items matched your search.</p>
            <p className="text-xs text-[#6e4631] mt-1">Try searching for &quot;kulhad&quot;, &quot;chai&quot;, or &quot;sandwich&quot;.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-medium text-[#e66826] hover:underline cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, idx) => {
                const isJustAdded = justAddedId === item.id;
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, delay: idx * 0.04 }}
                    whileHover={{ y: -4 }}
                    key={item.id}
                    className="bg-white rounded-xl border border-[#e5d8c5] overflow-hidden flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow group"
                  >
                    {/* Item Image Header with Veg Indicator & Bestseller */}
                    <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                      {/* Pure Veg Emblem & Category tag */}
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <div
                          className="w-5 h-5 bg-white rounded-xs border border-emerald-600 flex items-center justify-center shadow-xs"
                          title="Pure Vegetarian"
                        >
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                        </div>
                        <span className="text-[11px] font-medium text-white/90 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-xs">
                          {item.categoryLabel}
                        </span>
                      </div>

                      {item.isBestseller && (
                        <div className="absolute top-3 right-3 text-[11px] font-semibold text-amber-950 bg-amber-300 px-2 py-0.5 rounded-xs shadow-xs">
                          Bestseller
                        </div>
                      )}

                      {/* Price Tag Overlay */}
                      <div className="absolute bottom-3 right-3 bg-[#23120b]/90 backdrop-blur-xs text-white px-2.5 py-1 rounded text-sm font-bold tabular-nums">
                        ₹{item.price}
                      </div>

                      {item.prepTime && (
                        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[11px] text-white/90 font-medium">
                          <Clock className="w-3 h-3 text-[#f0caa3]" />
                          <span>{item.prepTime}</span>
                        </div>
                      )}
                    </div>

                    {/* Item Details */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-serif text-lg font-bold text-[#23120b] leading-snug">
                            {item.name}
                          </h3>
                          <span className="font-serif font-bold text-[#23120b] text-base tabular-nums md:hidden">
                            ₹{item.price}
                          </span>
                        </div>

                        <p className="mt-2 text-xs sm:text-sm text-[#5c3a27] leading-relaxed">
                          {item.description}
                        </p>

                        {/* Clean Unboxed Tags with separators */}
                        {item.tags && item.tags.length > 0 && (
                          <div className="mt-3 flex items-center flex-wrap gap-1 text-[11px] text-stone-500">
                            {item.tags.map((tag, i) => (
                              <React.Fragment key={tag}>
                                {i > 0 && <span aria-hidden="true">·</span>}
                                <span>{tag}</span>
                              </React.Fragment>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Add to Order Button with tactile tap and spring */}
                      <div className="mt-5 pt-4 border-t border-[#f0e6d8] flex items-center justify-between">
                        <span className="text-xs text-[#6e4631] font-medium hidden sm:inline">
                          Freshly prepared
                        </span>
                        <motion.button
                          whileTap={{ scale: 0.93 }}
                          onClick={() => handleAdd(item)}
                          className={`w-full sm:w-auto px-4 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                            isJustAdded
                              ? 'bg-emerald-600 text-white'
                              : 'bg-[#23120b] hover:bg-[#e66826] text-white'
                          }`}
                          aria-label={`Add ${item.name} to order`}
                        >
                          {isJustAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Added to Bag</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add to Order · ₹{item.price}</span>
                            </>
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Bottom Floating Order Banner if cart has items */}
        <AnimatePresence>
          {cartCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-12 bg-[#23120b] text-white rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl border border-[#3d2314]"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  key={cartCount}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ duration: 0.3 }}
                  className="w-10 h-10 rounded-full bg-[#e66826] flex items-center justify-center text-white font-bold tabular-nums"
                >
                  {cartCount}
                </motion.div>
                <div>
                  <p className="font-serif font-bold text-base sm:text-lg">
                    You have {cartCount} item{cartCount > 1 ? 's' : ''} in your order bag
                  </p>
                  <p className="text-xs text-stone-300">
                    Ready for Dine-In, Counter Takeaway, or Vijay Nagar Delivery.
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenOrderModal}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#e66826] hover:bg-[#d45b1b] text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shadow-md"
              >
                Proceed to Checkout
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
