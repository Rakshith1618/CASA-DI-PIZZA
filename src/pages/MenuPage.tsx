import { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import MenuCard from '../components/MenuCard';
import MenuFilter from '../components/MenuFilter';
import { menuItems, categories } from '../data/menu';
import { useCartContext } from '../contexts/CartContext';
import type { MenuItem } from '../data/menu';

interface MenuPageProps {
  onViewDetail: (item: MenuItem) => void;
}

export default function MenuPage({ onViewDetail }: MenuPageProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const { addItem } = useCartContext();

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return menuItems;
    return menuItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  // Group items by subcategory for display
  const groupedItems = useMemo(() => {
    const groups: { label: string; items: typeof filteredItems }[] = [];
    const seen = new Set<string>();
    filteredItems.forEach((item) => {
      const key = item.subcategory || item.category;
      if (!seen.has(key)) {
        seen.add(key);
        groups.push({ label: key, items: filteredItems.filter((i) => (i.subcategory || i.category) === key) });
      }
    });
    return groups;
  }, [filteredItems]);

  return (
    <div className="min-h-screen bg-[#F9F2E7] pt-24 md:pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionHeading
          subtitle="What we serve"
          title="Our Menu"
          description="Every dish is prepared fresh with quality ingredients."
        />

        <div className="mb-10">
          <MenuFilter
            categories={categories}
            active={activeCategory}
            onSelect={setActiveCategory}
          />
        </div>

        {groupedItems.map((group) => (
          <div key={group.label} className="mb-12">
            {activeCategory === 'All' || groupedItems.length > 1 ? (
              <h3 className="font-serif text-xl md:text-2xl font-bold text-[#3A1B0A] mb-6 flex items-center gap-3">
                <span className="h-px flex-1 bg-[#3A1B0A]/10 max-w-[40px]" />
                {group.label}
                <span className="h-px flex-1 bg-[#3A1B0A]/10" />
              </h3>
            ) : null}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {group.items.map((item) => (
                  <MenuCard
                    key={item.id}
                    item={item}
                    onAddToCart={(menuItem) => addItem(menuItem)}
                    onViewDetail={onViewDetail}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="font-serif text-xl text-[#3A1B0A]/60">
              No items in this category yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
