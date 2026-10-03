import { motion } from 'framer-motion';

interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: string;
  light?: boolean;
  align?: 'center' | 'left';
}

export default function SectionHeading({
  subtitle,
  title,
  description,
  light = false,
  align = 'center',
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      {subtitle && (
        <p
          className={`text-sm font-medium tracking-[0.2em] uppercase mb-3 ${
            light ? 'text-[#B35A2F]' : 'text-[#AA110D]'
          }`}
        >
          {subtitle}
        </p>
      )}
      <h2
        className={`font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
          light ? 'text-[#F9F2E7]' : 'text-[#3A1B0A]'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`text-base md:text-lg max-w-2xl ${
            align === 'center' ? 'mx-auto' : ''
          } ${
            light ? 'text-[#F1DCB4]/80' : 'text-[#3A1B0A]/70'
          }`}
        >
          {description}
        </p>
      )}
      {/* Decorative line */}
      <div
        className={`mt-6 flex items-center gap-3 ${
          align === 'center' ? 'justify-center' : ''
        }`}
      >
        <div className={`h-px w-12 ${light ? 'bg-[#F1DCB4]/30' : 'bg-[#3A1B0A]/20'}`} />
        <div className={`w-2 h-2 rounded-full ${light ? 'bg-[#B35A2F]' : 'bg-[#AA110D]'}`} />
        <div className={`h-px w-12 ${light ? 'bg-[#F1DCB4]/30' : 'bg-[#3A1B0A]/20'}`} />
      </div>
    </motion.div>
  );
}
