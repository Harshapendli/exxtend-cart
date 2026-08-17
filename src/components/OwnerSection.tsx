import React from 'react';
import { motion } from 'motion/react';
import { HiPhone, HiMapPin, HiStar, HiCheckBadge } from 'react-icons/hi2';
import { WordReveal } from './AnimatedText';

export default function OwnerSection() {
  return (
    <section className="py-24 bg-gray-50/50 border-t border-gray-100 relative overflow-hidden" id="about-owner">
      {/* Decorative */}
      <div className="absolute -left-20 top-1/4 w-80 h-80 bg-brand/5 rounded-full blur-[100px]" />
      <div className="absolute -right-20 bottom-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Photo column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-brand/20 to-blue-500/20 blur-lg" />

              <div className="relative w-64 h-80 md:w-72 md:h-96 rounded-3xl overflow-hidden border-4 border-white shadow-xl">
                <img
                  src="/owner-photo.jpg"
                  alt="Ponnala Praveen — Founder, EXTEND KART"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    // Fallback to initials if photo not loaded
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).parentElement!.classList.add('bg-gradient-to-br', 'from-brand', 'to-brand-dark', 'flex', 'items-center', 'justify-center');
                    const initials = document.createElement('span');
                    initials.textContent = 'PPR';
                    initials.className = 'text-5xl font-black text-white font-display';
                    (e.target as HTMLImageElement).parentElement!.appendChild(initials);
                  }}
                />
              </div>

              {/* Badge */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 300 }}
                className="absolute -bottom-3 -right-3 bg-white rounded-2xl px-4 py-2 shadow-lg border border-gray-100 flex items-center gap-2"
              >
                <HiCheckBadge className="h-5 w-5 text-brand" />
                <span className="text-xs font-bold text-gray-900">Verified Owner</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Info column */}
          <div className="lg:col-span-7 space-y-6">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="section-label inline-block"
            >
              Meet the Founder
            </motion.span>

            <WordReveal
              text="Ponnala Praveen"
              className="text-3xl md:text-4xl font-black font-display text-gray-950 leading-tight"
              tag="h2"
            />

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-lg font-semibold text-brand"
            >
              Founder & Managing Director — EXTEND KART
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-sm text-gray-500 font-sans leading-relaxed max-w-xl"
            >
              With 17+ years of expertise in government registrations, digital printing, and documentation services,
              Praveen founded EXTEND KART to simplify bureaucratic processes for the people of Warangal.
              What started as a small service center has grown into Warangal's most trusted digital service hub,
              serving 5000+ customers with 40+ services under one roof.
            </motion.p>

            {/* Contact & details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4"
            >
              <div className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-100 shadow-soft">
                <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center">
                  <HiPhone className="h-5 w-5 text-brand" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Contact</span>
                  <p className="text-sm font-bold text-gray-900">9951119995</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-100 shadow-soft">
                <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center">
                  <HiPhone className="h-5 w-5 text-brand" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Alternate</span>
                  <p className="text-sm font-bold text-gray-900">7330003691</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-100 shadow-soft sm:col-span-2">
                <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center">
                  <HiMapPin className="h-5 w-5 text-brand" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Location</span>
                  <p className="text-sm font-bold text-gray-900">Opp. Filter Bed, Navayuga Colony, Deshaipet Road, Warangal</p>
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-6 pt-4"
            >
              <div className="text-center">
                <span className="text-2xl font-black text-gray-950 font-display">17+</span>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Years Exp.</p>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div className="text-center">
                <span className="text-2xl font-black text-gray-950 font-display">5000+</span>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Customers</p>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div className="flex items-center gap-1">
                <HiStar className="h-5 w-5 text-amber-400 fill-amber-400" />
                <span className="text-2xl font-black text-gray-950 font-display">4.9</span>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Google</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
