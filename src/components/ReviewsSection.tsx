import React, { useState, useEffect } from 'react';
import { INITIAL_REVIEWS } from '../data/cafeData';
import { Review } from '../types';
import { Star, MessageSquarePlus, CheckCircle, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('cj_reviews');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return INITIAL_REVIEWS;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState('');
  const [favoriteItem, setFavoriteItem] = useState('Kulhad Chai');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('cj_reviews', JSON.stringify(reviews));
    } catch {
      // ignore
    }
  }, [reviews]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !reviewText.trim()) return;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      author: authorName.trim(),
      city: 'Indore',
      rating,
      text: reviewText.trim(),
      date: 'Just now',
      favoriteItem,
    };

    setReviews([newReview, ...reviews]);
    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setIsModalOpen(false);
      setAuthorName('');
      setReviewText('');
      setRating(5);
    }, 1500);
  };

  return (
    <section id="reviews" className="py-20 bg-[#f7f2eb] border-b border-[#ece2d0] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header with Rating Summary & Leave Review CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#e66826] mb-2">
              <span>Loved by Indore Chai Lovers</span>
              <span aria-hidden="true">·</span>
              <span>Vijay Nagar Favorite</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#23120b] tracking-tight">
              Customer Reviews
            </h2>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500" />
                ))}
              </div>
              <span className="font-bold text-sm text-[#23120b] tabular-nums">4.9 / 5.0</span>
              <span className="text-xs text-[#6e4631]">from 850+ reviews in Indore</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 bg-[#23120b] hover:bg-[#3d2314] text-white text-xs sm:text-sm font-medium rounded-lg transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap self-start md:self-auto shadow-xs"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#e66826]" />
            <span>Write a Review</span>
          </motion.button>
        </motion.div>

        {/* Featured Highlighted Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -5 }}
              key={rev.id}
              className="bg-white rounded-xl p-6 border border-[#e5d8c5] shadow-2xs flex flex-col justify-between hover:shadow-md transition-all duration-300"
            >
              <div>
                {/* Stars and date */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-400">{rev.date}</span>
                </div>

                {/* Review Text */}
                <p className="font-serif italic text-base sm:text-lg text-[#23120b] leading-relaxed mb-4">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              {/* Author & City / Favorite item */}
              <div className="pt-4 border-t border-[#f0e6d8] flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-sm text-[#23120b]">— {rev.author}</h4>
                  <p className="text-[11px] text-stone-500">
                    {rev.city || 'Indore'} {rev.favoriteItem ? `· Loved ${rev.favoriteItem}` : ''}
                  </p>
                </div>
                <div className="w-7 h-7 rounded-full bg-[#f3ece1] flex items-center justify-center text-[#e66826]">
                  <Quote className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Write a Review Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="font-serif text-2xl font-bold text-[#23120b]">
                  Share Your Chai Junction Experience
                </h3>
                <p className="text-xs text-[#5c3a27] mt-1 mb-6">
                  Tell us about your favorite chai brew, sandwich, or hangout memory!
                </p>

                {submittedSuccess ? (
                  <div className="py-8 text-center space-y-3">
                    <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                    <p className="font-serif text-xl font-bold text-[#23120b]">Thank you for your review!</p>
                    <p className="text-xs text-[#5c3a27]">Your feedback has been added to our page.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#23120b] mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        placeholder="e.g. Rahul / Ananya"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#e2d5c3] text-sm text-[#23120b] focus:outline-none focus:ring-2 focus:ring-[#e66826]/30 focus:border-[#e66826]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#23120b] mb-1">
                        Star Rating
                      </label>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => {
                          const active = hoverRating ? star <= hoverRating : star <= rating;
                          return (
                            <motion.button
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              type="button"
                              key={star}
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(null)}
                              onClick={() => setRating(star)}
                              className="p-1 cursor-pointer focus:outline-none"
                            >
                              <Star
                                className={`w-6 h-6 transition-colors ${
                                  active
                                    ? 'fill-amber-500 text-amber-500'
                                    : 'text-stone-300'
                                }`}
                              />
                            </motion.button>
                          );
                        })}
                        <span className="text-xs font-semibold text-[#23120b] ml-2">
                          {rating} out of 5 stars
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#23120b] mb-1">
                        Favorite Item
                      </label>
                      <select
                        value={favoriteItem}
                        onChange={(e) => setFavoriteItem(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#e2d5c3] text-sm text-[#23120b] focus:outline-none focus:ring-2 focus:ring-[#e66826]/30 focus:border-[#e66826]"
                      >
                        <option value="Kulhad Chai">Kulhad Chai (₹35)</option>
                        <option value="Masala Chai">Masala Chai (₹25)</option>
                        <option value="Ginger Tea">Ginger Tea (₹30)</option>
                        <option value="Cold Coffee">Cold Coffee (₹89)</option>
                        <option value="Chocolate Shake">Chocolate Shake (₹109)</option>
                        <option value="Veg Sandwich">Veg Sandwich (₹79)</option>
                        <option value="Cheese Sandwich">Cheese Sandwich (₹99)</option>
                        <option value="Paneer Burger">Paneer Burger (₹119)</option>
                        <option value="French Fries">French Fries (₹89)</option>
                        <option value="Veg Cheese Pizza">Veg Cheese Pizza (₹179)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#23120b] mb-1">
                        Your Feedback
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="e.g. Amazing chai and friendly atmosphere!"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#e2d5c3] text-sm text-[#23120b] focus:outline-none focus:ring-2 focus:ring-[#e66826]/30 focus:border-[#e66826]"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-3">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        className="px-5 py-2 bg-[#23120b] hover:bg-[#e66826] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                      >
                        Submit Review
                      </motion.button>
                    </div>
                  </form>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
