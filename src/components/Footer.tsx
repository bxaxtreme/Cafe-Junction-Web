import React from 'react';
import { CAFE_INFO } from '../data/cafeData';
import { MapPin, Phone, MessageCircle, Mail, Clock, Instagram, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenOrder: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenOrder }) => {
  return (
    <footer className="bg-[#1f0f08] text-[#e8dfd5] border-t border-[#341a0f]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          {/* Brand & Story */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#e66826] flex items-center justify-center text-white font-serif font-bold text-base">
                CJ
              </div>
              <span className="font-serif font-bold text-2xl text-white tracking-tight">
                Chai Junction <span className="text-[#e66826]">Café</span>
              </span>
            </div>

            <p className="text-sm font-serif italic text-[#f0caa3]">
              &ldquo;{CAFE_INFO.tagline}&rdquo;
            </p>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Established in 2022 in Indore, Madhya Pradesh. Dedicated to slow-cooked authentic kulhad chais, rich coffees, and fresh handcrafted comfort food in Vijay Nagar.
            </p>

            <div className="pt-2 flex items-center gap-3 text-stone-400">
              <a
                href={CAFE_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-stone-900 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={CAFE_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-stone-900 hover:bg-[#e66826] hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`tel:${CAFE_INFO.phone.replace(/\s+/g, '')}`}
                className="w-8 h-8 rounded-lg bg-stone-900 hover:bg-[#e66826] hover:text-white flex items-center justify-center transition-colors"
                aria-label="Call"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${CAFE_INFO.email}`}
                className="w-8 h-8 rounded-lg bg-stone-900 hover:bg-[#e66826] hover:text-white flex items-center justify-center transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Page Navigation (The 7 website pages) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#e66826] transition-colors cursor-pointer"
                >
                  1. Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#e66826] transition-colors cursor-pointer"
                >
                  2. About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('menu')}
                  className="hover:text-[#e66826] transition-colors cursor-pointer"
                >
                  3. Our Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-[#e66826] transition-colors cursor-pointer"
                >
                  4. Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reviews')}
                  className="hover:text-[#e66826] transition-colors cursor-pointer"
                >
                  5. Customer Reviews
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#e66826] transition-colors cursor-pointer"
                >
                  6. Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenOrder}
                  className="text-[#e66826] hover:underline font-medium cursor-pointer"
                >
                  7. Order Online →
                </button>
              </li>
            </ul>
          </div>

          {/* Visit & Timings */}
          <div className="lg:col-span-4 space-y-3 text-xs">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              Visit Chai Junction
            </h4>
            <div className="space-y-2.5 text-stone-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#e66826] shrink-0 mt-0.5" />
                <span>{CAFE_INFO.address}, Indore, Madhya Pradesh, India</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#e66826] shrink-0" />
                <span>Daily: {CAFE_INFO.openingHours}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#e66826] shrink-0" />
                <a href={`tel:${CAFE_INFO.phone}`} className="hover:text-white">
                  {CAFE_INFO.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={CAFE_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white text-emerald-400">
                  WhatsApp: {CAFE_INFO.whatsapp}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-[#e66826] shrink-0" />
                <a href={CAFE_INFO.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  {CAFE_INFO.instagram}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Copyright & Sample Disclosure */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <p>© {new Date().getFullYear()} Chai Junction Café. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Sample demonstration website created for Chai Junction Café · Indore, MP.
          </p>
        </div>
      </div>
    </footer>
  );
};
