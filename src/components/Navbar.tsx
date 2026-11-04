import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu as MenuIcon, X, Clock, MapPin, Phone } from 'lucide-react';
import { CAFE_INFO } from '../data/cafeData';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  activeSection,
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'menu', label: 'Our Menu' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'reviews', label: 'Customer Reviews' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Notification Strip */}
      <div className="bg-[#23120b] text-[#f3ece1] text-xs py-1.5 px-4 hidden sm:block border-b border-[#3d2314]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-stone-300">
              <MapPin className="w-3.5 h-3.5 text-[#e66826]" />
              <span>{CAFE_INFO.address}</span>
            </span>
            <span className="flex items-center gap-1.5 text-stone-300">
              <Clock className="w-3.5 h-3.5 text-[#e66826]" />
              <span>Daily: {CAFE_INFO.openingHours}</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${CAFE_INFO.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1 text-stone-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#e66826]" />
              <span>{CAFE_INFO.phone}</span>
            </a>
            <span className="text-stone-600">·</span>
            <span className="text-[#e66826] font-medium">Established 2022</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar - Strictly 3-Zone Contract */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#faf7f2]/95 backdrop-blur-md shadow-sm border-b border-[#e9dfd1]'
            : 'bg-[#faf7f2] border-b border-[#f0e6d8]'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single text element wordmark) */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none group shrink-0 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-[#341a0f] flex items-center justify-center text-[#f3ece1] shadow-xs group-hover:bg-[#e66826] transition-colors">
              <span className="font-serif font-bold text-lg leading-none">CJ</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl tracking-tight text-[#23120b] whitespace-nowrap">
                Chai Junction <span className="text-[#e66826]">Café</span>
              </span>
            </div>
          </button>

          {/* Zone 2: Concise Single-Line Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#4a2818]">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer relative ${
                  activeSection === link.id
                    ? 'text-[#e66826] font-semibold'
                    : 'text-[#4a2818] hover:text-[#e66826]'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e66826] rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Zone 3: 1 Primary Action (Order Online & Cart Indicator) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-white bg-[#23120b] hover:bg-[#3d2314] active:bg-[#1a0c07] rounded-lg transition-colors shadow-xs whitespace-nowrap shrink-0 cursor-pointer"
              aria-label="Order Online and view cart"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-[#e66826]" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#e66826] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center tabular-nums shadow-xs">
                    {cartCount}
                  </span>
                )}
              </div>
              <span>Order Online</span>
              {cartCount > 0 && (
                <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded text-stone-200 tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#23120b] hover:bg-[#f3ece1] rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#faf7f2] border-b border-[#e9dfd1] px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? 'bg-[#f3ece1] text-[#e66826] font-semibold'
                    : 'text-[#4a2818] hover:bg-[#f3ece1]'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-3 border-t border-[#f0e6d8] flex flex-col gap-2 text-xs text-[#6e4631]">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#e66826]" />
                <span>24, Vijay Nagar, Indore, MP</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#e66826]" />
                <span>9:00 AM – 11:00 PM Daily</span>
              </span>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
