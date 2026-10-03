import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartContext } from '../contexts/CartContext';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Menu', path: '/menu' },
  { label: 'About', path: '/about' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Visit Us', path: '/contact' },
];

interface NavbarProps {
  transparent?: boolean;
  onCartClick: () => void;
}

export default function Navbar({ transparent = false, onCartClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCartContext();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isTransparent = transparent && !scrolled && !mobileOpen;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isTransparent
            ? 'bg-transparent'
            : 'bg-[#F9F2E7] shadow-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5">
              <img
                src="/images/logo.jpg"
                alt="Casa di Pizza logo"
                className="h-10 md:h-14 w-auto rounded-full"
              />
              <span
                className={`hidden sm:inline font-serif text-lg md:text-xl font-bold tracking-wide transition-colors duration-300 ${
                  isTransparent ? 'text-[#F9F2E7]' : 'text-[#3A1B0A]'
                }`}
              >
                CASA DI PIZZA
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium tracking-wide transition-colors duration-200 hover:text-[#AA110D] ${
                    location.pathname === link.path
                      ? 'text-[#AA110D]'
                      : isTransparent
                      ? 'text-[#F9F2E7]'
                      : 'text-[#3A1B0A]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Cart */}
              <button
                onClick={onCartClick}
                className={`relative p-2 rounded-full transition-colors duration-200 ${
                  isTransparent
                    ? 'text-[#F9F2E7] hover:bg-white/10'
                    : 'text-[#3A1B0A] hover:bg-[#F1DCB4]'
                }`}
                aria-label={`Cart with ${totalItems} items`}
              >
                <ShoppingBag size={22} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#AA110D] text-[#F9F2E7] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Order CTA - desktop */}
              <Link
                to="/menu"
                className="hidden md:inline-flex items-center px-5 py-2.5 bg-[#AA110D] text-[#F9F2E7] text-sm font-semibold rounded-full hover:bg-[#8a0e0b] transition-all duration-200 hover:shadow-lg"
              >
                ORDER NOW
              </Link>

              {/* Hamburger */}
              <button
                className={`md:hidden p-2 rounded-full transition-colors ${
                  isTransparent
                    ? 'text-[#F9F2E7]'
                    : 'text-[#3A1B0A]'
                }`}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#F9F2E7] pt-20"
          >
            <div className="flex flex-col items-center gap-6 pt-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className={`text-2xl font-serif font-medium tracking-wide ${
                      location.pathname === link.path
                        ? 'text-[#AA110D]'
                        : 'text-[#3A1B0A]'
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
              >
                <Link
                  to="/menu"
                  className="mt-4 inline-flex items-center px-8 py-3 bg-[#AA110D] text-[#F9F2E7] text-lg font-semibold rounded-full"
                  onClick={() => setMobileOpen(false)}
                >
                  ORDER NOW
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
