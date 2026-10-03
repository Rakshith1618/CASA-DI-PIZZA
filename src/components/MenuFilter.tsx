import { motion } from 'framer-motion';

interface MenuFilterProps {
  categories: string[];
  active: string;
  onSelect: (category: string) => void;
}

export default function MenuFilter({ categories, active, onSelect }: MenuFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap md:justify-center">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`relative whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            active === cat
              ? 'text-[#F9F2E7]'
              : 'text-[#3A1B0A] hover:bg-[#F1DCB4]'
          }`}
        >
          {active === cat && (
            <motion.div
              layoutId="activeFilter"
              className="absolute inset-0 bg-[#124C26] rounded-full"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{cat}</span>
        </button>
      ))}
    </div>
  );
}
