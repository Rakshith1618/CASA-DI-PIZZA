import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Leaf, Flame, ShoppingBag } from 'lucide-react';
import type { MenuItem, MenuItemSize } from '../data/menu';

interface FoodDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number, size?: MenuItemSize) => void;
}

export default function FoodDetailModal({ item, onClose, onAddToCart }: FoodDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<MenuItemSize | undefined>(undefined);

  // Reset state when item changes
  useEffect(() => {
    if (item) {
      setQuantity(1);
      setSelectedSize(item.sizes?.[0]);
    }
  }, [item]);

  if (!item) return null;

  const currentPrice = selectedSize?.price ?? item.price;
  const hasSizes = item.sizes && item.sizes.length > 0;

  const handleAdd = () => {
    onAddToCart(item, quantity, selectedSize);
    setQuantity(1);
    onClose();
  };

  return (
    <AnimatePresence>
      {item && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative bg-[#F9F2E7] rounded-2xl overflow-hidden max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label={item.name}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-[#F9F2E7]/90 rounded-full hover:bg-[#F9F2E7] transition-colors"
              aria-label="Close"
            >
              <X size={20} className="text-[#3A1B0A]" />
            </button>

            {/* Image */}
            <div className="aspect-[16/10] bg-[#F1DCB4] overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-start gap-2 mb-2">
                {item.vegetarian && (
                  <span className="flex items-center gap-1 px-2 py-1 bg-[#124C26] text-[#F9F2E7] text-xs font-medium rounded-full">
                    <Leaf size={12} /> Veg
                  </span>
                )}
                {!item.vegetarian && (
                  <span className="flex items-center gap-1 px-2 py-1 bg-[#AA110D] text-[#F9F2E7] text-xs font-medium rounded-full">
                    Non-Veg
                  </span>
                )}
                {item.spicy && (
                  <span className="flex items-center gap-1 px-2 py-1 bg-[#B35A2F] text-[#F9F2E7] text-xs font-medium rounded-full">
                    <Flame size={12} /> Spicy
                  </span>
                )}
                {item.subcategory && (
                  <span className="px-2 py-1 bg-[#F1DCB4] text-[#3A1B0A] text-xs font-medium rounded-full">
                    {item.subcategory}
                  </span>
                )}
              </div>

              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#3A1B0A] mb-2">
                {item.name}
              </h2>

              <p className="text-[#3A1B0A]/70 leading-relaxed mb-4">
                {item.description}
              </p>

              {/* Ingredients */}
              {item.ingredients && item.ingredients.length > 0 && (
                <div className="mb-5">
                  <h4 className="text-sm font-semibold text-[#3A1B0A] uppercase tracking-wider mb-2">
                    Ingredients
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {item.ingredients.map((ing) => (
                      <span
                        key={ing}
                        className="px-3 py-1 bg-[#F1DCB4] text-[#3A1B0A] text-sm rounded-full"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {hasSizes && (
                <div className="mb-5">
                  <h4 className="text-sm font-semibold text-[#3A1B0A] uppercase tracking-wider mb-3">
                    Choose Size
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {item.sizes!.map((size) => (
                      <button
                        key={size.label}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                          selectedSize?.label === size.label
                            ? 'border-[#AA110D] bg-[#AA110D]/5 text-[#AA110D]'
                            : 'border-[#3A1B0A]/15 text-[#3A1B0A]/60 hover:border-[#3A1B0A]/30'
                        }`}
                      >
                        <span className="block">{size.label}</span>
                        <span className="block text-base font-bold mt-0.5">₹{size.price}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price & Quantity */}
              <div className="flex items-center justify-between border-t border-[#3A1B0A]/10 pt-4">
                <div className="text-2xl font-bold text-[#AA110D]">
                  ₹{currentPrice}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full border-2 border-[#3A1B0A]/20 flex items-center justify-center hover:border-[#AA110D] hover:text-[#AA110D] transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-xl font-bold text-[#3A1B0A] w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full border-2 border-[#3A1B0A]/20 flex items-center justify-center hover:border-[#AA110D] hover:text-[#AA110D] transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAdd}
                className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#AA110D] text-[#F9F2E7] font-semibold rounded-full hover:bg-[#8a0e0b] transition-all duration-200 text-base"
              >
                <ShoppingBag size={18} />
                ADD TO CART — ₹{currentPrice * quantity}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
