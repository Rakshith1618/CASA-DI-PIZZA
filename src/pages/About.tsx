import { motion } from 'framer-motion';
import { Leaf, Heart, Sparkles, Users, ChefHat } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6 },
};

export default function About() {
  return (
    <div className="min-h-screen bg-[#F9F2E7] pt-24 md:pt-28">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#3A1B0A] to-[#2a1308]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading
            subtitle="About us"
            title="Our Story"
            description="Every great meal begins with a story. Here's ours."
            light
          />
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp}>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#3A1B0A] mb-6">
                A Place for Good Food
                <br />and Good Company
              </h3>
              <div className="space-y-4 text-[#3A1B0A]/70 leading-relaxed">
                <p>
                  Casa di Pizza was born from a simple idea: that good food, made with care,
                  has the power to bring people together. We set out to create a warm,
                  welcoming space where quality is never compromised.
                </p>
                <p>
                  Our menu is inspired by traditional Italian flavors — from classic
                  Margherita to inventive new combinations — each pizza crafted with
                  attention to detail and a respect for fresh ingredients.
                </p>
                <p>
                  Whether you're grabbing a quick slice or settling in for a leisurely
                  meal, Casa di Pizza is your neighborhood spot for food that feels like
                  home.
                </p>
              </div>
            </motion.div>
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-[#F1DCB4]">
                <div className="w-full h-full bg-gradient-to-br from-[#F1DCB4] to-[#e8cfa0] flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-[#3A1B0A]/10 flex items-center justify-center">
                      <Users size={40} className="text-[#3A1B0A]/40" />
                    </div>
                    <p className="text-[#3A1B0A]/40 text-sm">Restaurant story photo placeholder</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 md:py-28 bg-[#F1DCB4]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="What drives us"
            title="Our Pizza Philosophy"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Leaf,
                title: 'Fresh Ingredients',
                desc: 'We choose quality ingredients because great food starts with great basics.',
              },
              {
                icon: ChefHat,
                title: 'Made with Care',
                desc: 'Every dish is prepared fresh. We take the time to get it right.',
              },
              {
                icon: Heart,
                title: 'Warm Hospitality',
                desc: 'We treat every guest like family. Your comfort matters to us.',
              },
              {
                icon: Sparkles,
                title: 'Café Atmosphere',
                desc: 'A cozy, inviting space where you can relax and enjoy your meal.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center p-8 rounded-2xl bg-[#F9F2E7] border border-[#3A1B0A]/5"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#124C26]/10 flex items-center justify-center">
                  <item.icon size={24} className="text-[#124C26]" />
                </div>
                <h4 className="font-serif text-lg font-bold text-[#3A1B0A] mb-2">
                  {item.title}
                </h4>
                <p className="text-[#3A1B0A]/60 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Note */}
      <section className="py-12 bg-[#F9F2E7]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-[#3A1B0A]/40 text-sm italic">
            The story above is placeholder content. The actual Casa di Pizza story will be
            updated when provided by the restaurant.
          </p>
        </div>
      </section>
    </div>
  );
}
