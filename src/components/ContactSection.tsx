import React, { useState } from 'react';
import { CAFE_INFO } from '../data/cafeData';
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  Instagram,
  Send,
  CheckCircle,
  Navigation,
  Calendar,
  Users,
} from 'lucide-react';
import { motion } from 'motion/react';

export const ContactSection: React.FC = () => {
  const [formType, setFormType] = useState<'message' | 'reservation'>('reservation');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('17:00');
  const [guests, setGuests] = useState('2 Guests');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setName('');
      setPhone('');
      setMessage('');
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 bg-[#faf7f2] border-b border-[#ece2d0] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-12"
        >
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#e66826] mb-2">
            <span>Find Us in Indore</span>
            <span aria-hidden="true">·</span>
            <span>Vijay Nagar Hub</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#23120b] tracking-tight">
            Visit Chai Junction Café
          </h2>
          <p className="mt-2 text-[#5c3a27] text-sm sm:text-base">
            Drop by for a steaming kulhad of tea, reserve a cozy table with friends, or reach out to us directly on WhatsApp.
          </p>
        </motion.div>

        {/* Contact Info Cards + Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Contact Details & Timings */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="bg-white rounded-2xl p-6 border border-[#e5d8c5] shadow-2xs space-y-5">
              <h3 className="font-serif text-lg font-bold text-[#23120b]">
                Contact Information
              </h3>

              <div className="space-y-4 text-sm">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#f3ece1] flex items-center justify-center text-[#e66826] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-[#7d5641] font-medium uppercase tracking-wider">Address</p>
                    <p className="font-medium text-[#23120b] mt-0.5">{CAFE_INFO.address}</p>
                    <p className="text-xs text-stone-500">Indore, Madhya Pradesh, India</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#f3ece1] flex items-center justify-center text-[#e66826] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-[#7d5641] font-medium uppercase tracking-wider">Phone</p>
                    <a
                      href={`tel:${CAFE_INFO.phone.replace(/\s+/g, '')}`}
                      className="font-medium text-[#23120b] hover:text-[#e66826] transition-colors mt-0.5 block"
                    >
                      {CAFE_INFO.phone}
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-[#7d5641] font-medium uppercase tracking-wider">WhatsApp Support & Takeaway</p>
                    <a
                      href={CAFE_INFO.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-emerald-700 hover:text-emerald-800 transition-colors mt-0.5 inline-flex items-center gap-1.5"
                    >
                      <span>{CAFE_INFO.whatsapp}</span>
                      <span className="text-[11px] underline">Chat on WhatsApp →</span>
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#f3ece1] flex items-center justify-center text-[#e66826] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-[#7d5641] font-medium uppercase tracking-wider">Email</p>
                    <a
                      href={`mailto:${CAFE_INFO.email}`}
                      className="font-medium text-[#23120b] hover:text-[#e66826] transition-colors mt-0.5 block"
                    >
                      {CAFE_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#f3ece1] flex items-center justify-center text-[#e66826] shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-[#7d5641] font-medium uppercase tracking-wider">Opening Hours</p>
                    <p className="font-medium text-[#23120b] mt-0.5">{CAFE_INFO.openingHours}</p>
                    <p className="text-xs text-stone-500">Open 7 days a week (Monday to Sunday)</p>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#f3ece1] flex items-center justify-center text-[#e66826] shrink-0 mt-0.5">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-[#7d5641] font-medium uppercase tracking-wider">Instagram</p>
                    <a
                      href={CAFE_INFO.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[#23120b] hover:text-[#e66826] transition-colors mt-0.5 inline-block"
                    >
                      {CAFE_INFO.instagram}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated Interactive Map / Directions Widget */}
            <div className="bg-[#23120b] text-[#f3ece1] rounded-2xl p-5 border border-[#3d2314] relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-[#e66826]" />
                  <span className="font-serif font-bold text-sm text-white">Vijay Nagar Landmark Guide</span>
                </div>
                <span className="text-[11px] text-[#f0caa3] bg-white/10 px-2 py-0.5 rounded">Indore, MP</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                Located near the central Vijay Nagar commercial circle, just 4 minutes from Meghdoot Garden & C21 Mall. Accessible via AB Road BRTS. Dedicated bike and car parking right outside.
              </p>
              <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between text-xs">
                <span className="text-stone-400">Status: <span className="text-emerald-400 font-medium">Open Now</span></span>
                <a
                  href="https://maps.google.com/?q=Vijay+Nagar+Indore+MP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#e66826] hover:underline flex items-center gap-1 font-medium"
                >
                  <span>Open in Maps</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Table Reservation & Direct Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e5d8c5] shadow-2xs">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#f0e6d8]">
                <h3 className="font-serif text-xl font-bold text-[#23120b]">
                  {formType === 'reservation' ? 'Reserve a Table' : 'Send Us a Message'}
                </h3>

                {/* Tab switch */}
                <div className="flex items-center gap-1 bg-[#f3ece1] p-1 rounded-lg text-xs font-medium">
                  <button
                    type="button"
                    onClick={() => setFormType('reservation')}
                    className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                      formType === 'reservation'
                        ? 'bg-[#23120b] text-white shadow-2xs'
                        : 'text-[#4a2818] hover:text-[#23120b]'
                    }`}
                  >
                    Table Booking
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormType('message')}
                    className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                      formType === 'message'
                        ? 'bg-[#23120b] text-white shadow-2xs'
                        : 'text-[#4a2818] hover:text-[#23120b]'
                    }`}
                  >
                    Quick Query
                  </button>
                </div>
              </div>

              {isSubmitted ? (
                <div className="py-12 text-center space-y-3 animate-in fade-in">
                  <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="font-serif text-2xl font-bold text-[#23120b]">
                    {formType === 'reservation' ? 'Table Reservation Received!' : 'Message Sent Successfully!'}
                  </h4>
                  <p className="text-sm text-[#5c3a27] max-w-md mx-auto">
                    Thank you {name || 'valued customer'}! Our Vijay Nagar café team will confirm with you on {phone || 'your phone number'} shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#23120b] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#e2d5c3] text-sm text-[#23120b] focus:outline-none focus:ring-2 focus:ring-[#e66826]/30 focus:border-[#e66826]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#23120b] mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#e2d5c3] text-sm text-[#23120b] focus:outline-none focus:ring-2 focus:ring-[#e66826]/30 focus:border-[#e66826]"
                      />
                    </div>
                  </div>

                  {formType === 'reservation' && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#23120b] mb-1 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#e66826]" />
                          <span>Date</span>
                        </label>
                        <input
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#e2d5c3] text-sm text-[#23120b] focus:outline-none focus:ring-2 focus:ring-[#e66826]/30 focus:border-[#e66826]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#23120b] mb-1 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#e66826]" />
                          <span>Preferred Time</span>
                        </label>
                        <select
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#e2d5c3] text-sm text-[#23120b] focus:outline-none focus:ring-2 focus:ring-[#e66826]/30 focus:border-[#e66826]"
                        >
                          <option value="11:00">11:00 AM</option>
                          <option value="13:00">01:00 PM (Lunch)</option>
                          <option value="16:00">04:00 PM (Evening Chai)</option>
                          <option value="17:00">05:00 PM (Peak Chai Hour)</option>
                          <option value="19:00">07:00 PM (Dinner & Coffee)</option>
                          <option value="21:00">09:00 PM (Late Night Hangout)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#23120b] mb-1 flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-[#e66826]" />
                          <span>Guests</span>
                        </label>
                        <select
                          value={guests}
                          onChange={(e) => setGuests(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#e2d5c3] text-sm text-[#23120b] focus:outline-none focus:ring-2 focus:ring-[#e66826]/30 focus:border-[#e66826]"
                        >
                          <option value="1 Guest">1 Guest (Solo Study/Read)</option>
                          <option value="2 Guests">2 Guests (Couple/Friends)</option>
                          <option value="3-4 Guests">3-4 Guests (Small Group)</option>
                          <option value="5-8 Guests">5-8 Guests (Celebration)</option>
                          <option value="8+ Guests">8+ Guests (Party)</option>
                        </select>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-[#23120b] mb-1">
                      {formType === 'reservation' ? 'Special Requests / Seating Preference (Optional)' : 'Your Message / Inquiry *'}
                    </label>
                    <textarea
                      rows={3}
                      required={formType === 'message'}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={
                        formType === 'reservation'
                          ? 'e.g. Near bookshelf corner, booth seating, birthday cake arrangement...'
                          : 'How can we help you? Inquire about catering, private party bookings, or menu questions.'
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#e2d5c3] text-sm text-[#23120b] focus:outline-none focus:ring-2 focus:ring-[#e66826]/30 focus:border-[#e66826]"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 bg-[#23120b] hover:bg-[#e66826] text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Send className="w-4 h-4" />
                    <span>{formType === 'reservation' ? 'Confirm Reservation Request' : 'Send Message'}</span>
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* Sample Data Notice Banner */}
        <div className="mt-12 p-3.5 rounded-xl bg-[#f3ece1] border border-[#e5d8c5] text-center text-xs text-[#6e4631]">
          <span>Note: All business details, contact information, prices and reviews above are fictional sample data for demonstration.</span>
        </div>
      </div>
    </section>
  );
};
