import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartContext } from '../contexts/CartContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, clearCart, subtotal, getItemKey } = useCartContext();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[55] bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-[56] w-full max-w-md bg-[#F9F2E7] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#3A1B0A]/10">
              <h2 className="font-serif text-xl font-bold text-[#3A1B0A] flex items-center gap-2">
                <ShoppingBag size={20} />
                Your Cart
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-[#F1DCB4] rounded-full transition-colors"
                aria-label="Close cart"
              >
                <X size={20} className="text-[#3A1B0A]" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag size={48} className="text-[#3A1B0A]/20 mb-4" />
                  <p className="font-serif text-xl text-[#3A1B0A] mb-2">
                    Your cart is waiting for something delicious.
                  </p>
                  <Link
                    to="/menu"
                    onClick={onClose}
                    className="mt-4 inline-flex items-center px-6 py-2.5 bg-[#124C26] text-[#F9F2E7] font-semibold rounded-full hover:bg-[#0e3d1e] transition-all"
                  >
                    EXPLORE MENU
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((ci) => {
                    const key = getItemKey(ci);
                    const unitPrice = ci.selectedSize?.price ?? ci.item.price;
                    return (
                      <motion.div
                        key={key}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex gap-3 bg-[#F1DCB4]/50 rounded-xl p-3"
                      >
                        <img
                          src={ci.item.image}
                          alt={ci.item.name}
                          className="w-16 h-16 rounded-lg object-cover bg-[#F1DCB4]"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-[#3A1B0A] text-sm truncate">
                            {ci.item.name}
                          </h4>
                          {ci.selectedSize && (
                            <p className="text-[#3A1B0A]/50 text-xs">
                              {ci.selectedSize.label}
                            </p>
                          )}
                          <p className="text-[#AA110D] font-bold text-sm">
                            ₹{(unitPrice * ci.quantity).toFixed(0)}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <button
                              onClick={() => updateQuantity(key, ci.quantity - 1)}
                              className="w-7 h-7 rounded-full border border-[#3A1B0A]/20 flex items-center justify-center hover:border-[#AA110D] transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-sm font-bold text-[#3A1B0A] w-5 text-center">
                              {ci.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(key, ci.quantity + 1)}
                              className="w-7 h-7 rounded-full border border-[#3A1B0A]/20 flex items-center justify-center hover:border-[#AA110D] transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                            <button
                              onClick={() => removeItem(key)}
                              className="ml-auto p-1.5 text-[#3A1B0A]/40 hover:text-[#AA110D] transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-[#3A1B0A]/10 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[#3A1B0A]/70">Subtotal</span>
                  <span className="font-bold text-[#3A1B0A] text-lg">
                    ₹{subtotal.toFixed(0)}
                  </span>
                </div>
                <Link
                  to="/checkout"
                  onClick={onClose}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#AA110D] text-[#F9F2E7] font-semibold rounded-full hover:bg-[#8a0e0b] transition-all text-base"
                >
                  CHECKOUT
                </Link>
                <button
                  onClick={clearCart}
                  className="w-full text-center text-sm text-[#3A1B0A]/50 hover:text-[#AA110D] transition-colors"
                >
                  Clear cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
