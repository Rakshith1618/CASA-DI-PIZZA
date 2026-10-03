import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Sparkles, Heart } from 'lucide-react';
import Hero from '../components/Hero';
import SectionHeading from '../components/SectionHeading';
import MenuCard from '../components/MenuCard';
import { menuItems } from '../data/menu';
import { restaurant } from '../data/restaurant';
import { useCartContext } from '../contexts/CartContext';
import type { MenuItem } from '../data/menu';

interface HomeProps {
  onViewDetail: (item: MenuItem) => void;
}

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6 },
};

export default function Home({ onViewDetail }: HomeProps) {
  const { addItem } = useCartContext();
  const featured = menuItems.filter((item) => item.featured).slice(0, 6);

  return (
    <>
      <Hero />

      {/* Introduction */}
      <section className="py-20 md:py-28 bg-[#F9F2E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp}>
              <p className="text-[#AA110D] text-sm font-medium tracking-[0.2em] uppercase mb-4">
                Est. {restaurant.established || 2020}
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#3A1B0A] mb-6 leading-tight">
                Welcome to
                <br />
                Casa di Pizza
              </h2>
              <p className="text-[#3A1B0A]/70 text-lg leading-relaxed mb-4">
                <strong className="text-[#3A1B0A]">Good pizza brings people together.</strong>
              </p>
              <p className="text-[#3A1B0A]/60 leading-relaxed mb-8">
                Casa di Pizza is a place for freshly made food, warm conversations, and the
                simple joy of sharing a great pizza. We believe in quality ingredients,
                careful preparation, and creating a space where every meal feels special.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-[#AA110D] font-semibold hover:gap-3 transition-all duration-200"
              >
                OUR STORY <ArrowRight size={18} />
              </Link>
            </motion.div>
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-[#F1DCB4] shadow-2xl border-4 border-[#F1DCB4] flex items-center justify-center p-6 bg-gradient-to-br from-[#F9F2E7] to-[#F1DCB4]">
                <img
                  src="/images/logo.jpg"
                  alt="Casa di Pizza"
                  className="w-full h-auto max-w-sm rounded-2xl shadow-xl hover:scale-105 transition-transform duration-500 object-cover"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-2xl bg-[#AA110D]/10 -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Menu */}
      <section className="py-20 md:py-28 bg-[#F1DCB4]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="From our kitchen"
            title="Our Favorites"
            description="Handpicked dishes that keep our guests coming back for more."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                onAddToCart={(menuItem) => addItem(menuItem)}
                onViewDetail={onViewDetail}
              />
            ))}
          </div>
          <motion.div
            {...fadeUp}
            className="text-center mt-12"
          >
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#124C26] text-[#F9F2E7] font-semibold rounded-full hover:bg-[#0e3d1e] transition-all duration-300"
            >
              VIEW FULL MENU <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Quality Section */}
      <section className="py-20 md:py-28 bg-[#F9F2E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="Our promise"
            title="Made with Good Ingredients"
            description="Every pizza tells a story of quality and care."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Leaf,
                title: 'Fresh Ingredients',
                desc: 'Thoughtfully selected ingredients for every pizza. Quality you can taste in every bite.',
              },
              {
                icon: Heart,
                title: 'Made Fresh',
                desc: 'Prepared with care for every order. No shortcuts, just good food made the right way.',
              },
              {
                icon: Sparkles,
                title: 'Full of Flavor',
                desc: 'Simple ingredients, bold flavor. The kind of food that makes you come back for more.',
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center p-8 rounded-2xl bg-[#F1DCB4]/30 border border-[#3A1B0A]/5"
              >
                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#124C26]/10 flex items-center justify-center">
                  <feature.icon size={28} className="text-[#124C26]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#3A1B0A] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[#3A1B0A]/60 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-[#3A1B0A] to-[#2a1308]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading
            subtitle="@casadipizza2026"
            title="Follow Casa di Pizza"
            description="More pizza. More moments. More Casa di Pizza."
            light
          />
          <a
            href={restaurant.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#AA110D] text-[#F9F2E7] font-semibold rounded-full hover:bg-[#8a0e0b] transition-all duration-300"
          >
            FOLLOW US ON INSTAGRAM
          </a>
        </div>
      </section>

      {/* Visit Us Teaser */}
      <section className="py-20 md:py-28 bg-[#F1DCB4]/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading
            subtitle="We'd love to see you"
            title="Come Say Ciao"
            description="Great food is best enjoyed in great company."
          />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#124C26] text-[#F9F2E7] font-semibold rounded-full hover:bg-[#0e3d1e] transition-all duration-300"
            >
              VISIT US
            </Link>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#AA110D] text-[#F9F2E7] font-semibold rounded-full hover:bg-[#8a0e0b] transition-all duration-300"
            >
              ORDER NOW
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
