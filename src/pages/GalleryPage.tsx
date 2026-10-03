import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { galleryImages } from '../data/gallery';

export default function GalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % galleryImages.length);
  }, [lightboxIndex]);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex(
      (lightboxIndex - 1 + galleryImages.length) % galleryImages.length
    );
  }, [lightboxIndex]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, goNext, goPrev]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  return (
    <div className="min-h-screen bg-[#F9F2E7] pt-24 md:pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionHeading
          subtitle="A glimpse inside"
          title="Our Gallery"
          description="Moments from Casa di Pizza — our wood-fired ambiance, fresh flavors, and warm Italian dining space."
        />

        {/* Uniform Aspect-Ratio Grid (16:9 / 4:3 responsive card grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-[#F1DCB4] shadow-md hover:shadow-2xl transition-all duration-300 border border-[#3A1B0A]/10"
              onClick={() => openLightbox(index)}
            >
              <div className="relative aspect-video w-full overflow-hidden bg-[#3A1B0A]/5">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to placeholder if specific photo file hasn't been placed yet
                    (e.target as HTMLImageElement).src = '/images/placeholder-food.svg';
                  }}
                />
                {/* Subtle hover overlay with icon and caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <div className="flex items-center justify-between text-[#F9F2E7]">
                    <span className="text-sm font-medium tracking-wide">
                      {img.alt}
                    </span>
                    <span className="p-2 bg-[#AA110D] rounded-full shadow">
                      <Eye size={16} />
                    </span>
                  </div>
                  <span className="text-xs uppercase tracking-widest text-[#F1DCB4]/80 mt-1">
                    {img.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-[#3A1B0A]/50 text-sm mt-12 italic">
          To display your photos, drop your images into <code className="bg-[#F1DCB4]/60 px-2 py-0.5 rounded text-[#AA110D]">public/images/</code> as <code className="text-[#124C26]">storefront.jpg</code>, <code className="text-[#124C26]">wall-art-mural.jpg</code>, <code className="text-[#124C26]">fresh-pizzas.jpg</code>, <code className="text-[#124C26]">dining-area.jpg</code>, and <code className="text-[#124C26]">wood-fired-mural.jpg</code>.
        </p>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/92 backdrop-blur-md flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-20"
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>

            {/* Left navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-4 md:left-8 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-20"
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Lightbox Image Container */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/10 max-h-[75vh]">
                <img
                  src={galleryImages[lightboxIndex].src}
                  alt={galleryImages[lightboxIndex].alt}
                  className="max-w-full max-h-[72vh] object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/placeholder-food.svg';
                  }}
                />
              </div>
              <div className="mt-4 text-center">
                <p className="text-white font-medium text-base">
                  {galleryImages[lightboxIndex].alt}
                </p>
                <p className="text-white/50 text-xs tracking-wider uppercase mt-1">
                  {galleryImages[lightboxIndex].category} • {lightboxIndex + 1} of {galleryImages.length}
                </p>
              </div>
            </motion.div>

            {/* Right navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-4 md:right-8 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-20"
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
