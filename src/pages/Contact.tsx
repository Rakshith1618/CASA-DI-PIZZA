import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Navigation, PhoneCall, Send } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { restaurant } from '../data/restaurant';
import { validateName, validatePhone, validateEmail, validateMessage } from '../utils/validation';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      name: validateName(form.name),
      phone: validatePhone(form.phone),
      email: validateEmail(form.email),
      message: validateMessage(form.message),
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some((err) => err !== null)) return;
    // No backend configured — show success message
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F9F2E7] pt-24 md:pt-28">
      {/* Visit Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#3A1B0A] to-[#2a1308]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading
            subtitle="We'd love to see you"
            title="Come Say Ciao"
            description="Visit us for freshly made food, a warm atmosphere, and an experience worth sharing."
            light
          />
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#F1DCB4]/50 rounded-2xl p-8 text-center"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#124C26]/10 flex items-center justify-center">
                <MapPin size={24} className="text-[#124C26]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#3A1B0A] mb-2">Address</h3>
              <p className="text-[#3A1B0A]/60 text-sm mb-4">
                {restaurant.address || 'Address will be updated soon.'}
              </p>
              {restaurant.mapsUrl && (
                <a
                  href={restaurant.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#AA110D] text-sm font-semibold hover:underline"
                >
                  <Navigation size={14} /> GET DIRECTIONS
                </a>
              )}
            </motion.div>

            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-[#F1DCB4]/50 rounded-2xl p-8 text-center"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#124C26]/10 flex items-center justify-center">
                <Phone size={24} className="text-[#124C26]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#3A1B0A] mb-2">Phone</h3>
              <p className="text-[#3A1B0A]/60 text-sm mb-4">
                {restaurant.phone || 'Phone number will be updated soon.'}
              </p>
              {restaurant.phone && (
                <a
                  href={`tel:${restaurant.phone}`}
                  className="inline-flex items-center gap-1 text-[#AA110D] text-sm font-semibold hover:underline"
                >
                  <PhoneCall size={14} /> CALL US
                </a>
              )}
            </motion.div>

            {/* Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[#F1DCB4]/50 rounded-2xl p-8 text-center"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#124C26]/10 flex items-center justify-center">
                <Clock size={24} className="text-[#124C26]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#3A1B0A] mb-2">Hours</h3>
              <div className="space-y-1">
                {restaurant.openingHours.map((oh) => (
                  <div key={oh.days} className="text-sm">
                    <p className="text-[#3A1B0A]/80 font-medium">{oh.days}</p>
                    <p className="text-[#3A1B0A]/60">{oh.hours}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            {restaurant.mapsUrl && (
              <a
                href={restaurant.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-3.5 bg-[#124C26] text-[#F9F2E7] font-semibold rounded-full hover:bg-[#0e3d1e] transition-all"
              >
                GET DIRECTIONS
              </a>
            )}
            {restaurant.phone && (
              <a
                href={`tel:${restaurant.phone}`}
                className="inline-flex items-center px-8 py-3.5 border-2 border-[#3A1B0A] text-[#3A1B0A] font-semibold rounded-full hover:bg-[#3A1B0A] hover:text-[#F9F2E7] transition-all"
              >
                CALL US
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      {restaurant.mapsEmbed && (
        <section className="px-4 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-7xl mx-auto rounded-2xl overflow-hidden h-80">
            <iframe
              src={restaurant.mapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Casa di Pizza location"
            />
          </div>
        </section>
      )}

      {/* Contact Form */}
      <section className="py-16 md:py-20 bg-[#F1DCB4]/40">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="Get in touch"
            title="Send Us a Message"
            description="We'd love to hear from you."
          />

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center bg-[#F9F2E7] rounded-2xl p-12 border border-[#124C26]/20"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#124C26]/10 flex items-center justify-center">
                <Send size={28} className="text-[#124C26]" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#3A1B0A] mb-2">
                Message Received!
              </h3>
              <p className="text-[#3A1B0A]/60 mb-4">
                Thank you for reaching out. We'll get back to you soon.
              </p>
              <p className="text-[#3A1B0A]/40 text-sm italic">
                Note: No email service is currently configured. Please integrate Formspree,
                EmailJS, or a backend to actually send messages.
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', message: '' }); }}
                className="mt-6 text-[#AA110D] font-semibold text-sm hover:underline"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Name */}
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-[#3A1B0A] mb-1.5">
                  Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl bg-[#F9F2E7] border ${
                    errors.name ? 'border-[#AA110D]' : 'border-[#3A1B0A]/20'
                  } text-[#3A1B0A] placeholder-[#3A1B0A]/30 focus:outline-none focus:ring-2 focus:ring-[#AA110D] focus:border-transparent transition-all`}
                  placeholder="Your name"
                />
                {errors.name && <p className="mt-1 text-sm text-[#AA110D]">{errors.name}</p>}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="contact-phone" className="block text-sm font-medium text-[#3A1B0A] mb-1.5">
                  Phone *
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl bg-[#F9F2E7] border ${
                    errors.phone ? 'border-[#AA110D]' : 'border-[#3A1B0A]/20'
                  } text-[#3A1B0A] placeholder-[#3A1B0A]/30 focus:outline-none focus:ring-2 focus:ring-[#AA110D] focus:border-transparent transition-all`}
                  placeholder="Your phone number"
                />
                {errors.phone && <p className="mt-1 text-sm text-[#AA110D]">{errors.phone}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-[#3A1B0A] mb-1.5">
                  Email *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl bg-[#F9F2E7] border ${
                    errors.email ? 'border-[#AA110D]' : 'border-[#3A1B0A]/20'
                  } text-[#3A1B0A] placeholder-[#3A1B0A]/30 focus:outline-none focus:ring-2 focus:ring-[#AA110D] focus:border-transparent transition-all`}
                  placeholder="Your email"
                />
                {errors.email && <p className="mt-1 text-sm text-[#AA110D]">{errors.email}</p>}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-[#3A1B0A] mb-1.5">
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  value={form.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  rows={5}
                  className={`w-full px-4 py-3 rounded-xl bg-[#F9F2E7] border ${
                    errors.message ? 'border-[#AA110D]' : 'border-[#3A1B0A]/20'
                  } text-[#3A1B0A] placeholder-[#3A1B0A]/30 focus:outline-none focus:ring-2 focus:ring-[#AA110D] focus:border-transparent transition-all resize-none`}
                  placeholder="Your message (min 10 characters)"
                />
                {errors.message && <p className="mt-1 text-sm text-[#AA110D]">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#AA110D] text-[#F9F2E7] font-semibold rounded-full hover:bg-[#8a0e0b] transition-all duration-200"
              >
                <Send size={18} />
                SEND MESSAGE
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
