import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { restaurant } from '../data/restaurant';

/**
 * To add a cover video:
 * 1. Place your video file in public/videos/ (e.g., public/videos/hero.mp4)
 * 2. Set the path below:
 */
export default function Hero() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoSrc = restaurant.heroVideo;
  const showVideo = Boolean(videoSrc) && !videoError;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background: Video with Gradient Fallback */}
      {showVideo && (
        <video
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          onLoadedData={() => setVideoLoaded(true)}
          onError={() => setVideoError(true)}
        />
      )}

      {/* Dark overlay for video readability */}
      {showVideo && videoLoaded && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
      )}

      {/* Warm fallback background if video not yet loaded or not present */}
      {(!showVideo || !videoLoaded) && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-[#3A1B0A] via-[#2a1308] to-[#1a0b04]" />
          <div className="absolute inset-0 opacity-15">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#AA110D] blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#B35A2F] blur-[100px]" />
          </div>
        </>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6"
        >
          <img
            src="/images/logo.jpg"
            alt="Casa di Pizza logo"
            className="w-28 h-28 md:w-36 md:h-36 mx-auto rounded-full shadow-2xl"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#F9F2E7] leading-tight mb-4"
        >
          A Slice of Italy,
          <br />
          <span className="text-[#F1DCB4]">Made with Love.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-[#F1DCB4] text-base md:text-lg font-medium tracking-widest uppercase mb-2"
        >
          {restaurant.tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-[#F1DCB4]/70 text-base md:text-lg max-w-2xl mx-auto mb-10"
        >
          Freshly made pizzas, warm hospitality, and good food worth gathering around.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/menu"
            className="inline-flex items-center px-8 py-3.5 bg-[#124C26] text-[#F9F2E7] font-semibold rounded-full hover:bg-[#0e3d1e] transition-all duration-300 hover:shadow-lg hover:shadow-[#124C26]/20 text-sm md:text-base"
          >
            VIEW MENU
          </Link>
          <Link
            to="/menu"
            className="inline-flex items-center px-8 py-3.5 bg-[#AA110D] text-[#F9F2E7] font-semibold rounded-full hover:bg-[#8a0e0b] transition-all duration-300 hover:shadow-lg hover:shadow-[#AA110D]/20 text-sm md:text-base"
          >
            ORDER NOW
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="text-[#F9F2E7]/40" size={28} />
      </motion.div>
    </section>
  );
}
