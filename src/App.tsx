import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { MenuSection } from './components/MenuSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { ContactSection } from './components/ContactSection';
import { OrderOnlineModal } from './components/OrderOnlineModal';
import { Footer } from './components/Footer';
import { CartItem, MenuItem } from './types';
import { Coffee, ArrowUp, ShoppingBag, MessageCircle } from 'lucide-react';
import { CAFE_INFO } from './data/cafeData';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cj_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cj_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Track active section and back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      const sections = ['contact', 'reviews', 'gallery', 'menu', 'about', 'home'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el && scrollPos >= el.offsetTop) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  const handleAddToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.item.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { item, quantity: 1 }];
    });

    setToastMessage(`Added ${item.name} (₹${item.price}) to your order!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((i) => {
          if (i.item.id === itemId) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (itemId: string) => {
    setCart((prev) => prev.filter((i) => i.item.id !== itemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('home');
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf7f2] text-[#2c1810]">
      {/* 3-Zone Strict Header */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsOrderModalOpen(true)}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      <main className="flex-1">
        {/* 1. Home (Hero Section) */}
        <div id="home">
          <Hero
            onOrderNow={() => setIsOrderModalOpen(true)}
            onExploreMenu={() => scrollToSection('menu')}
            onBookTable={() => scrollToSection('contact')}
          />
        </div>

        {/* 2. About Us */}
        <AboutSection />

        {/* 3. Our Menu */}
        <MenuSection
          onAddToCart={handleAddToCart}
          onOpenOrderModal={() => setIsOrderModalOpen(true)}
          cartCount={totalCartCount}
        />

        {/* 4. Gallery */}
        <GallerySection />

        {/* 5. Customer Reviews */}
        <ReviewsSection />

        {/* 6. Contact Us */}
        <ContactSection />
      </main>

      {/* Footer with 7 pages & info */}
      <Footer
        onNavigate={scrollToSection}
        onOpenOrder={() => setIsOrderModalOpen(true)}
      />

      {/* 7. Order Online Modal / Checkout System */}
      <OrderOnlineModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onAddToCart={handleAddToCart}
        onClearCart={handleClearCart}
      />

      {/* Floating Action Buttons with smooth entrance & hover */}
      <div className="fixed bottom-5 right-5 z-30 flex flex-col items-end gap-2.5">
        {/* Quick WhatsApp Support Floating Button */}
        <motion.a
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          href={CAFE_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-colors cursor-pointer flex items-center gap-2 group"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="hidden group-hover:inline text-xs font-semibold pr-1 whitespace-nowrap">
            WhatsApp Café
          </span>
        </motion.a>

        {/* Floating Cart Button with spring badge pulse */}
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOrderModalOpen(true)}
          className="bg-[#23120b] hover:bg-[#e66826] text-white p-3.5 rounded-full shadow-lg hover:shadow-xl transition-colors cursor-pointer relative"
          aria-label="Open Cart"
        >
          <ShoppingBag className="w-5 h-5 text-[#f0caa3]" />
          <AnimatePresence>
            {totalCartCount > 0 && (
              <motion.span
                key={totalCartCount}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                className="absolute -top-1.5 -right-1.5 bg-[#e66826] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center tabular-nums shadow-xs"
              >
                {totalCartCount}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Back to Top */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ opacity: 0, y: 15, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-white/95 hover:bg-white text-[#23120b] p-2.5 rounded-full shadow-md border border-[#e5d8c5] transition-colors cursor-pointer"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Animated Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.92, x: '-50%' }}
            animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
            exit={{ opacity: 0, y: 20, scale: 0.92, x: '-50%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="fixed bottom-6 left-1/2 z-50 bg-[#23120b] text-white text-xs font-medium px-4 py-2.5 rounded-xl shadow-2xl border border-stone-700 flex items-center gap-2"
          >
            <Coffee className="w-4 h-4 text-[#e66826]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
