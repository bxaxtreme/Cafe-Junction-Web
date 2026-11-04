import React, { useState } from 'react';
import { CartItem, MenuItem, OrderType } from '../types';
import { CAFE_INFO, MENU_ITEMS } from '../data/cafeData';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Clock,
  CheckCircle2,
  MessageCircle,
  Truck,
  Coffee,
  Store,
  CreditCard,
  Banknote,
  Smartphone,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface OrderOnlineModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onAddToCart: (item: MenuItem) => void;
  onClearCart: () => void;
}

export const OrderOnlineModal: React.FC<OrderOnlineModalProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onAddToCart,
  onClearCart,
}) => {
  const [orderType, setOrderType] = useState<OrderType>('dine_in');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [tableNumber, setTableNumber] = useState('Table 4');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'upi' | 'card'>('upi');

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  const [confirmedOrder, setConfirmedOrder] = useState<{
    id: string;
    total: number;
    estimatedTime: string;
    items: CartItem[];
  } | null>(null);

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);

  let discount = 0;
  if (appliedCoupon === 'CHAI10') {
    discount = Math.round(subtotal * 0.1);
  } else if (appliedCoupon === 'INDOREFIRST') {
    discount = Math.min(30, subtotal);
  }

  const tax = Math.round((subtotal - discount) * 0.05); // 5% GST on cafe food
  const deliveryFee = orderType === 'delivery' && subtotal > 0 ? 20 : 0;
  const finalTotal = Math.max(0, subtotal - discount + tax + deliveryFee);

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'CHAI10') {
      setAppliedCoupon('CHAI10');
      setCouponError(null);
    } else if (code === 'INDOREFIRST') {
      setAppliedCoupon('INDOREFIRST');
      setCouponError(null);
    } else {
      setCouponError('Invalid coupon code. Try CHAI10 or INDOREFIRST.');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const orderId = `CJ-${Math.floor(1000 + Math.random() * 9000)}`;
    const estimated = orderType === 'delivery' ? '30-40 mins' : '15-20 mins';

    setConfirmedOrder({
      id: orderId,
      total: finalTotal,
      estimatedTime: estimated,
      items: [...cart],
    });

    onClearCart();
  };

  const generateWhatsAppMessage = () => {
    if (!confirmedOrder) return '';
    const itemsList = confirmedOrder.items
      .map((i) => `• ${i.item.name} x${i.quantity} (₹${i.item.price * i.quantity})`)
      .join('%0A');

    const msg = `Hello Chai Junction Café!%0A%0A*New Order %23${confirmedOrder.id}*%0A*Order Type:* ${orderType.toUpperCase()}%0A*Customer:* ${customerName} (${phone})%0A${
      orderType === 'dine_in'
        ? `*Table:* ${tableNumber}%0A`
        : orderType === 'delivery'
        ? `*Address:* ${deliveryAddress}%0A`
        : ''
    }%0A*Items:*%0A${itemsList}%0A%0A*Total Amount:* ₹${confirmedOrder.total}%0A*Payment:* ${paymentMethod.toUpperCase()}%0A${
      specialInstructions ? `*Note:* ${encodeURIComponent(specialInstructions)}%0A` : ''
    }%0APlease confirm my order. Thank you!`;

    return `https://wa.me/919876543210?text=${msg}`;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        <motion.div
          initial={{ scale: 0.93, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.93, opacity: 0, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white rounded-2xl max-w-2xl w-full my-auto shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-5 py-4 bg-[#23120b] text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#e66826]" />
              <div>
                <h3 className="font-serif font-bold text-lg leading-tight">Order Online</h3>
                <p className="text-[11px] text-stone-300">Chai Junction Café · Vijay Nagar, Indore</p>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-stone-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Confirmed Order State with Pop Animation */}
          {confirmedOrder ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="p-6 sm:p-8 overflow-y-auto space-y-6 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto"
              >
                <CheckCircle2 className="w-9 h-9" />
              </motion.div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#e66826]">
                  Order Confirmed
                </span>
                <h4 className="font-serif text-2xl sm:text-3xl font-bold text-[#23120b] mt-1">
                  Thank You, {customerName || 'Friend'}!
                </h4>
                <p className="text-sm text-[#5c3a27] mt-1">
                  Your order <span className="font-mono font-bold text-[#23120b]">{confirmedOrder.id}</span> has been sent to our kitchen.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="bg-[#faf7f2] rounded-xl p-5 border border-[#e5d8c5] text-left text-xs sm:text-sm space-y-3 shadow-2xs">
                <div className="flex items-center justify-between pb-3 border-b border-[#e5d8c5]">
                  <span className="text-stone-500">Service Mode</span>
                  <span className="font-semibold text-[#23120b] uppercase">
                    {orderType === 'dine_in' ? `Dine-In (${tableNumber})` : orderType === 'takeaway' ? 'Counter Pickup' : 'Delivery to Indore'}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-[#e5d8c5]">
                  <span className="text-stone-500">Estimated Ready In</span>
                  <span className="font-semibold text-emerald-700 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{confirmedOrder.estimatedTime}</span>
                  </span>
                </div>

                <div className="space-y-1.5 py-1">
                  <span className="text-stone-500 text-xs block mb-1">Ordered Items:</span>
                  {confirmedOrder.items.map((i) => (
                    <div key={i.item.id} className="flex justify-between text-xs">
                      <span className="text-[#23120b]">{i.item.name} × {i.quantity}</span>
                      <span className="tabular-nums font-medium">₹{i.item.price * i.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#e5d8c5] font-bold text-sm text-[#23120b]">
                  <span>Total Paid / Payable</span>
                  <span className="tabular-nums font-serif text-base text-[#e66826]">₹{confirmedOrder.total}</span>
                </div>
              </div>

              {/* Action Buttons: WhatsApp Forward + New Order */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={generateWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Order to Café WhatsApp</span>
                </motion.a>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setConfirmedOrder(null);
                    onClose();
                  }}
                  className="py-3 px-4 bg-[#23120b] hover:bg-[#3d2314] text-white rounded-lg font-medium text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  Close & Return to Menu
                </motion.button>
              </div>
            </motion.div>
          ) : (
            /* Active Cart & Checkout Form */
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
              {/* Order Type Selector */}
              <div>
                <label className="block text-xs font-semibold text-[#23120b] mb-2 uppercase tracking-wider">
                  Select Dining Option
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    type="button"
                    onClick={() => setOrderType('dine_in')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                      orderType === 'dine_in'
                        ? 'border-[#23120b] bg-[#23120b] text-white'
                        : 'border-[#e5d8c5] bg-white text-[#4a2818] hover:border-[#cbbaa2]'
                    }`}
                  >
                    <Coffee className="w-4 h-4" />
                    <span className="text-xs font-semibold">Dine-In</span>
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    type="button"
                    onClick={() => setOrderType('takeaway')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                      orderType === 'takeaway'
                        ? 'border-[#23120b] bg-[#23120b] text-white'
                        : 'border-[#e5d8c5] bg-white text-[#4a2818] hover:border-[#cbbaa2]'
                    }`}
                  >
                    <Store className="w-4 h-4" />
                    <span className="text-xs font-semibold">Takeaway</span>
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                      orderType === 'delivery'
                        ? 'border-[#23120b] bg-[#23120b] text-white'
                        : 'border-[#e5d8c5] bg-white text-[#4a2818] hover:border-[#cbbaa2]'
                    }`}
                  >
                    <Truck className="w-4 h-4" />
                    <span className="text-xs font-semibold">Delivery</span>
                  </motion.button>
                </div>
              </div>

              {/* Cart Items List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-1 border-b border-[#f0e6d8]">
                  <h4 className="font-serif font-bold text-sm text-[#23120b]">
                    Your Items ({cart.length})
                  </h4>
                  {cart.length > 0 && (
                    <button
                      onClick={onClearCart}
                      className="text-[11px] text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {cart.length === 0 ? (
                  <div className="py-8 text-center bg-[#faf7f2] rounded-xl border border-dashed border-[#e5d8c5] space-y-3">
                    <p className="text-sm text-[#6e4631]">Your order bag is empty.</p>
                    <p className="text-xs text-stone-400">Add signature Kulhad Chai or a crispy sandwich from below!</p>
                    <div className="flex flex-wrap justify-center gap-2 pt-1">
                      {MENU_ITEMS.slice(0, 3).map((item) => (
                        <motion.button
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                          key={item.id}
                          onClick={() => onAddToCart(item)}
                          className="px-3 py-1.5 bg-white border border-[#e5d8c5] text-xs font-medium rounded-lg text-[#23120b] hover:border-[#e66826] transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3 text-[#e66826]" />
                          <span>{item.name} (₹{item.price})</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="divide-y divide-[#f0e6d8] max-h-56 overflow-y-auto pr-1">
                    <AnimatePresence>
                      {cart.map((cartItem) => (
                        <motion.div
                          layout
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          key={cartItem.item.id}
                          className="py-3 flex items-center justify-between gap-3 overflow-hidden"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-[#23120b] truncate">
                              {cartItem.item.name}
                            </p>
                            <p className="text-xs text-stone-500 tabular-nums">
                              ₹{cartItem.item.price} each
                            </p>
                          </div>

                          {/* Quantity Stepper with Spring buttons */}
                          <div className="flex items-center gap-2 bg-[#f3ece1] rounded-lg px-2 py-1">
                            <motion.button
                              whileTap={{ scale: 0.8 }}
                              type="button"
                              onClick={() => onUpdateQuantity(cartItem.item.id, -1)}
                              className="text-[#4a2818] hover:text-[#23120b] p-0.5 cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </motion.button>
                            <span className="text-xs font-bold text-[#23120b] tabular-nums w-4 text-center">
                              {cartItem.quantity}
                            </span>
                            <motion.button
                              whileTap={{ scale: 0.8 }}
                              type="button"
                              onClick={() => onUpdateQuantity(cartItem.item.id, 1)}
                              className="text-[#4a2818] hover:text-[#23120b] p-0.5 cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </motion.button>
                          </div>

                          <div className="w-16 text-right font-medium text-sm text-[#23120b] tabular-nums">
                            ₹{cartItem.item.price * cartItem.quantity}
                          </div>

                          <motion.button
                            whileTap={{ scale: 0.8 }}
                            type="button"
                            onClick={() => onRemoveItem(cartItem.item.id)}
                            className="text-stone-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </motion.button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* Order Details Form */}
              <form id="order-form" onSubmit={handlePlaceOrder} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#23120b] mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3 py-2 rounded-lg border border-[#e2d5c3] text-sm text-[#23120b] focus:outline-none focus:ring-2 focus:ring-[#e66826]/30 focus:border-[#e66826]"
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
                      className="w-full px-3 py-2 rounded-lg border border-[#e2d5c3] text-sm text-[#23120b] focus:outline-none focus:ring-2 focus:ring-[#e66826]/30 focus:border-[#e66826]"
                    />
                  </div>
                </div>

                {orderType === 'dine_in' && (
                  <div>
                    <label className="block text-xs font-semibold text-[#23120b] mb-1">
                      Table Number
                    </label>
                    <select
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-[#e2d5c3] text-sm text-[#23120b] focus:outline-none focus:ring-2 focus:ring-[#e66826]/30 focus:border-[#e66826]"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((t) => (
                        <option key={t} value={`Table ${t}`}>Table {t}</option>
                      ))}
                      <option value="Outdoor Terrace">Outdoor Terrace Seating</option>
                    </select>
                  </div>
                )}

                {orderType === 'delivery' && (
                  <div>
                    <label className="block text-xs font-semibold text-[#23120b] mb-1">
                      Delivery Address in Indore *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="House/Flat No., Building name, Vijay Nagar / nearby landmark..."
                      className="w-full px-3 py-2 rounded-lg border border-[#e2d5c3] text-sm text-[#23120b] focus:outline-none focus:ring-2 focus:ring-[#e66826]/30 focus:border-[#e66826]"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-[#23120b] mb-1">
                    Kitchen Notes / Sugar & Spice Preferences
                  </label>
                  <input
                    type="text"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="e.g. Less sugar in chai, extra crispy fries"
                    className="w-full px-3 py-2 rounded-lg border border-[#e2d5c3] text-sm text-[#23120b] focus:outline-none focus:ring-2 focus:ring-[#e66826]/30 focus:border-[#e66826]"
                  />
                </div>

                {/* Coupon Code Section */}
                <div className="pt-2">
                  <label className="block text-xs font-semibold text-[#23120b] mb-1">
                    Coupon Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter CHAI10 or INDOREFIRST"
                      className="flex-1 px-3 py-1.5 rounded-lg border border-[#e2d5c3] text-xs uppercase text-[#23120b] focus:outline-none focus:ring-2 focus:ring-[#e66826]/30 focus:border-[#e66826]"
                    />
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={handleApplyCoupon}
                      className="px-3.5 py-1.5 bg-[#f3ece1] hover:bg-[#e5d8c5] text-[#23120b] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      Apply
                    </motion.button>
                  </div>
                  {appliedCoupon && (
                    <p className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Coupon {appliedCoupon} applied successfully!</span>
                    </p>
                  )}
                  {couponError && (
                    <p className="text-[11px] text-red-600 mt-1">{couponError}</p>
                  )}
                </div>

                {/* Payment Method Selector */}
                <div className="pt-2">
                  <label className="block text-xs font-semibold text-[#23120b] mb-2 uppercase tracking-wider">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-2.5 rounded-lg border text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        paymentMethod === 'upi'
                          ? 'border-[#23120b] bg-[#23120b] text-white'
                          : 'border-[#e5d8c5] bg-white text-[#4a2818]'
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>UPI (GPay/PhonePe)</span>
                    </motion.button>

                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => setPaymentMethod('cash')}
                      className={`p-2.5 rounded-lg border text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        paymentMethod === 'cash'
                          ? 'border-[#23120b] bg-[#23120b] text-white'
                          : 'border-[#e5d8c5] bg-white text-[#4a2818]'
                      }`}
                    >
                      <Banknote className="w-3.5 h-3.5" />
                      <span>Cash / Counter</span>
                    </motion.button>

                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-2.5 rounded-lg border text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'border-[#23120b] bg-[#23120b] text-white'
                          : 'border-[#e5d8c5] bg-white text-[#4a2818]'
                      }`}
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Card</span>
                    </motion.button>
                  </div>
                </div>

                {/* Price Calculation Summary */}
                {cart.length > 0 && (
                  <div className="pt-3 border-t border-[#f0e6d8] space-y-1.5 text-xs text-[#5c3a27]">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="tabular-nums">₹{subtotal}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-emerald-600 font-medium">
                        <span>Discount ({appliedCoupon})</span>
                        <span className="tabular-nums">-₹{discount}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Restaurant GST (5%)</span>
                      <span className="tabular-nums">₹{tax}</span>
                    </div>
                    {deliveryFee > 0 && (
                      <div className="flex justify-between">
                        <span>Delivery Charge</span>
                        <span className="tabular-nums">₹{deliveryFee}</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-2 border-t border-[#f0e6d8] font-bold text-sm text-[#23120b]">
                      <span>Total Amount</span>
                      <span className="font-serif text-base text-[#e66826] tabular-nums">
                        ₹{finalTotal}
                      </span>
                    </div>
                  </div>
                )}
              </form>
            </div>
          )}

          {/* Modal Footer */}
          {!confirmedOrder && (
            <div className="px-5 py-4 bg-[#faf7f2] border-t border-[#e5d8c5] flex items-center justify-between shrink-0">
              <div>
                <p className="text-[11px] text-stone-500 uppercase tracking-wider">Total Payable</p>
                <p className="font-serif text-lg font-bold text-[#23120b] tabular-nums">
                  ₹{finalTotal}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  Continue Browsing
                </button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  form="order-form"
                  disabled={cart.length === 0}
                  className={`px-5 py-2.5 rounded-lg text-xs font-semibold text-white transition-all shadow-xs cursor-pointer ${
                    cart.length > 0
                      ? 'bg-[#23120b] hover:bg-[#e66826]'
                      : 'bg-stone-300 cursor-not-allowed'
                  }`}
                >
                  Place Order
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
