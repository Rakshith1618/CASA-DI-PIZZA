import { Link } from 'react-router-dom';
import { Camera, Phone, MapPin, Clock } from 'lucide-react';
import { restaurant } from '../data/restaurant';

const footerLinks = [
  { label: 'Home', path: '/' },
  { label: 'Menu', path: '/menu' },
  { label: 'About', path: '/about' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Visit Us', path: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-[#3A1B0A] text-[#F9F2E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/images/logo.jpg"
                alt="Casa di Pizza logo"
                className="w-12 h-12 rounded-full border border-[#F1DCB4]/20"
              />
              <h3 className="font-serif text-2xl font-bold">CASA DI PIZZA</h3>
            </div>
            <p className="text-[#F1DCB4] text-xs font-semibold tracking-wider uppercase mb-2">
              {restaurant.tagline}
            </p>
            <p className="text-[#F9F2E7]/60 text-sm leading-relaxed mb-6">
              {restaurant.description}
            </p>
            <a
              href={restaurant.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#F9F2E7]/80 hover:text-[#B35A2F] transition-colors"
              aria-label="Follow us on Instagram"
            >
              <Camera size={20} />
              <span className="text-sm">Follow us</span>
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-[#B35A2F]">
              Navigation
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-[#F9F2E7]/60 hover:text-[#F9F2E7] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-[#B35A2F]">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-[#F9F2E7]/60 text-sm">
                <Phone size={16} className="mt-0.5 flex-shrink-0" />
                <span>{restaurant.phone || 'Phone number coming soon'}</span>
              </li>
              <li className="flex items-start gap-2 text-[#F9F2E7]/60 text-sm">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                <span>{restaurant.address || 'Address coming soon'}</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-[#B35A2F]">
              Opening Hours
            </h4>
            <ul className="space-y-2">
              {restaurant.openingHours.map((oh) => (
                <li key={oh.days} className="flex items-start gap-2 text-[#F9F2E7]/60 text-sm">
                  <Clock size={16} className="mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[#F9F2E7]/80 font-medium">{oh.days}</p>
                    <p>{oh.hours}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-[#F9F2E7]/10 text-center">
          <p className="text-[#F9F2E7]/40 text-sm">
            © 2026 Casa di Pizza. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
