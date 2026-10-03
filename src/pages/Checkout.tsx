import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, MessageCircle } from 'lucide-react';
import { useCartContext } from '../contexts/CartContext';
import { restaurant } from '../data/restaurant';
import { validateName, validatePhone, validateAddress } from '../utils/validation';
import { generateWhatsAppMessage, openWhatsApp } from '../utils/whatsapp';

export default function Checkout() {
  const { items, subtotal, clearCart, getItemKey } = useCartContext();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    orderType: 'pickup' as 'pickup' | 'delivery',
    address: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [whatsappError, setWhatsappError] = useState(false);

  const deliveryFee =
    form.orderType === 'delivery' ? restaurant.deliveryFee : 0;
  const total = subtotal + deliveryFee;

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: null }));
    setWhatsappError(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string | null> = {
      name: validateName(form.name),
      phone: validatePhone(form.phone),
    };
    if (form.orderType === 'delivery') {
      newErrors.address = validateAddress(form.address);
    }
    setErrors(newErrors);
    if (Object.values(newErrors).some((err) => err !== null)) return;

    const message = generateWhatsAppMessage(
      {
        name: form.name,
        phone: form.phone,
        orderType: form.orderType,
        address: form.address,
        notes: form.notes,
      },
      items,
      subtotal,
      deliveryFee
    );

    const success = openWhatsApp(message);
    if (!success) {
      setWhatsappError(true);
      return;
    }
    clearCart();
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F9F2E7] pt-24 md:pt-28">
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <ShoppingBag size={48} className="mx-auto text-[#3A1B0A]/20 mb-4" />
          <h2 className="font-serif text-2xl font-bold text-[#3A1B0A] mb-2">
            Your cart is empty
          </h2>
          <p className="text-[#3A1B0A]/60 mb-8">
            Add something delicious before checking out!
          </p>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#124C26] text-[#F9F2E7] font-semibold rounded-full hover:bg-[#0e3d1e] transition-all"
          >
            EXPLORE MENU
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F2E7] pt-24 md:pt-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/menu"
          className="inline-flex items-center gap-1 text-[#3A1B0A]/60 hover:text-[#3A1B0A] transition-colors mb-8 text-sm"
        >
          <ArrowLeft size={16} /> Back to Menu
        </Link>

        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#3A1B0A] mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-5">
            <div>
              <label htmlFor="checkout-name" className="block text-sm font-medium text-[#3A1B0A] mb-1.5">
                Your Name *
              </label>
              <input
                id="checkout-name"
                type="text"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className={`w-full px-4 py-3 rounded-xl bg-white border ${
                  errors.name ? 'border-[#AA110D]' : 'border-[#3A1B0A]/20'
                } text-[#3A1B0A] placeholder-[#3A1B0A]/30 focus:outline-none focus:ring-2 focus:ring-[#AA110D] focus:border-transparent`}
                placeholder="Enter your name"
              />
              {errors.name && <p className="mt-1 text-sm text-[#AA110D]">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="checkout-phone" className="block text-sm font-medium text-[#3A1B0A] mb-1.5">
                Phone Number *
              </label>
              <input
                id="checkout-phone"
                type="tel"
                value={form.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className={`w-full px-4 py-3 rounded-xl bg-white border ${
                  errors.phone ? 'border-[#AA110D]' : 'border-[#3A1B0A]/20'
                } text-[#3A1B0A] placeholder-[#3A1B0A]/30 focus:outline-none focus:ring-2 focus:ring-[#AA110D] focus:border-transparent`}
                placeholder="Your phone number"
              />
              {errors.phone && <p className="mt-1 text-sm text-[#AA110D]">{errors.phone}</p>}
            </div>

            {/* Order Type */}
            <div>
              <label className="block text-sm font-medium text-[#3A1B0A] mb-3">
                Order Type *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {(['pickup', 'delivery'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleChange('orderType', type)}
                    className={`px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                      form.orderType === type
                        ? 'border-[#AA110D] bg-[#AA110D]/5 text-[#AA110D]'
                        : 'border-[#3A1B0A]/15 text-[#3A1B0A]/60 hover:border-[#3A1B0A]/30'
                    }`}
                  >
                    {type === 'pickup' ? '🏪 Pickup' : '🚗 Delivery'}
                  </button>
                ))}
              </div>
            </div>

            {/* Address for delivery */}
            {form.orderType === 'delivery' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label htmlFor="checkout-address" className="block text-sm font-medium text-[#3A1B0A] mb-1.5">
                  Delivery Address *
                </label>
                <textarea
                  id="checkout-address"
                  value={form.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  rows={3}
                  className={`w-full px-4 py-3 rounded-xl bg-white border ${
                    errors.address ? 'border-[#AA110D]' : 'border-[#3A1B0A]/20'
                  } text-[#3A1B0A] placeholder-[#3A1B0A]/30 focus:outline-none focus:ring-2 focus:ring-[#AA110D] focus:border-transparent resize-none`}
                  placeholder="Enter your delivery address"
                />
                {errors.address && <p className="mt-1 text-sm text-[#AA110D]">{errors.address}</p>}
              </motion.div>
            )}

            {/* Notes */}
            <div>
              <label htmlFor="checkout-notes" className="block text-sm font-medium text-[#3A1B0A] mb-1.5">
                Special Notes (optional)
              </label>
              <textarea
                id="checkout-notes"
                value={form.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                rows={2}
                className="w-full px-4 py-3 rounded-xl bg-white border border-[#3A1B0A]/20 text-[#3A1B0A] placeholder-[#3A1B0A]/30 focus:outline-none focus:ring-2 focus:ring-[#AA110D] focus:border-transparent resize-none"
                placeholder="Any special requests?"
              />
            </div>

            {whatsappError && (
              <div className="bg-[#AA110D]/10 border border-[#AA110D]/20 rounded-xl p-4 text-sm text-[#AA110D]">
                WhatsApp number is not configured. Please contact the restaurant directly.
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#124C26] text-[#F9F2E7] font-bold rounded-full hover:bg-[#0e3d1e] transition-all duration-200 text-lg"
            >
              <MessageCircle size={20} />
              PLACE ORDER VIA WHATSAPP
            </button>
          </form>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-[#F1DCB4]/50 rounded-2xl p-6 sticky top-28">
              <h3 className="font-serif text-lg font-bold text-[#3A1B0A] mb-4">
                Order Summary
              </h3>
              <div className="space-y-3 mb-4">
                {items.map((ci) => {
                  const unitPrice = ci.selectedSize?.price ?? ci.item.price;
                  return (
                    <div key={getItemKey(ci)} className="flex justify-between text-sm">
                      <span className="text-[#3A1B0A]/70">
                        {ci.item.name}
                        {ci.selectedSize ? ` (${ci.selectedSize.label})` : ''}
                        {' × '}{ci.quantity}
                      </span>
                      <span className="text-[#3A1B0A] font-medium">
                        ₹{(unitPrice * ci.quantity).toFixed(0)}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-[#3A1B0A]/10 pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#3A1B0A]/70">Subtotal</span>
                  <span className="text-[#3A1B0A]">₹{subtotal.toFixed(0)}</span>
                </div>
                {form.orderType === 'delivery' && deliveryFee > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-[#3A1B0A]/70">Delivery Fee</span>
                    <span className="text-[#3A1B0A]">₹{deliveryFee.toFixed(0)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-[#3A1B0A]/10">
                  <span className="text-[#3A1B0A]">Total</span>
                  <span className="text-[#AA110D]">₹{total.toFixed(0)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
