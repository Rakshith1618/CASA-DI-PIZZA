import { motion } from 'framer-motion';
import { Plus, Leaf, Flame } from 'lucide-react';
import type { MenuItem } from '../data/menu';

interface MenuCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  onViewDetail: (item: MenuItem) => void;
}

export default function MenuCard({ item, onAddToCart, onViewDetail }: MenuCardProps) {
  const hasMultipleSizes = item.sizes && item.sizes.length > 1;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="group bg-[#F9F2E7] rounded-2xl overflow-hidden border border-[#3A1B0A]/10 hover:border-[#3A1B0A]/20 hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={() => onViewDetail(item)}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#F1DCB4]">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {item.vegetarian && (
            <span className="flex items-center gap-1 px-2 py-1 bg-[#124C26] text-[#F9F2E7] text-xs font-medium rounded-full">
              <Leaf size={12} /> Veg
            </span>
          )}
          {item.spicy && (
            <span className="flex items-center gap-1 px-2 py-1 bg-[#AA110D] text-[#F9F2E7] text-xs font-medium rounded-full">
              <Flame size={12} /> Spicy
            </span>
          )}
        </div>
        {/* Subcategory badge */}
        {item.subcategory && (
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 bg-[#3A1B0A]/70 text-[#F9F2E7] text-xs font-medium rounded-full backdrop-blur-sm">
              {item.subcategory}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 md:p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-serif text-lg md:text-xl font-bold text-[#3A1B0A]">
            {item.name}
          </h3>
          <div className="text-right flex-shrink-0">
            {hasMultipleSizes ? (
              <>
                <span className="text-[#3A1B0A]/50 text-xs block">From</span>
                <span className="text-[#AA110D] font-bold text-lg">₹{item.price}</span>
              </>
            ) : (
              <span className="text-[#AA110D] font-bold text-lg">₹{item.price}</span>
            )}
          </div>
        </div>
        <p className="text-[#3A1B0A]/60 text-sm leading-relaxed mb-4 line-clamp-2">
          {item.description}
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (hasMultipleSizes) {
              onViewDetail(item);
            } else {
              onAddToCart(item);
            }
          }}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#AA110D] text-[#F9F2E7] text-sm font-semibold rounded-full hover:bg-[#8a0e0b] transition-all duration-200 group-hover:shadow-md"
        >
          <Plus size={16} />
          {hasMultipleSizes ? 'Choose Size' : 'Add to Cart'}
        </button>
      </div>
    </motion.div>
  );
}
