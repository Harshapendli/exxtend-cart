import React from 'react';
import { motion } from 'motion/react';
import { HiShieldCheck, HiOutlineReceiptPercent, HiBolt, HiUserGroup } from 'react-icons/hi2';
import { WordReveal, GradientText } from './AnimatedText';

const FEATURES = [
  {
    title: 'Govt Certified Center',
    description: 'Fully licensed and registered digital service center complying with all department guidelines.',
    icon: HiShieldCheck,
    gradient: 'from-emerald-400 to-emerald-600',
    stat: '100%',
    statLabel: 'Compliant',
  },
  {
    title: 'Affordable Pricing',
    description: 'Transparent processing fees with zero hidden charges. Know exactly what you pay for.',
    icon: HiOutlineReceiptPercent,
    gradient: 'from-amber-400 to-amber-600',
    stat: '₹0',
    statLabel: 'Hidden Fees',
  },
  {
    title: 'Fast & Timely Delivery',
    description: 'Applications submitted within hours. Digital receipts and live tracking via WhatsApp.',
    icon: HiBolt,
    gradient: 'from-blue-400 to-blue-600',
    stat: '24hr',
    statLabel: 'Turnaround',
  },
  {
    title: 'Expert Consulting Team',
    description: '17+ years of local experience handling FSSAI, MSME, property registrations, and compliance.',
    icon: HiUserGroup,
    gradient: 'from-purple-400 to-purple-600',
    stat: '17+',
    statLabel: 'Years Exp.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-white relative overflow-hidden" id="why-choose-us">
      {/* Decorative */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-brand/3 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-blue-500/3 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Header left column */}
          <div className="lg:col-span-5 space-y-6">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="section-label inline-block"
            >
              Our Strengths
            </motion.span>
            <WordReveal
              text="Why Local Businesses Trust EXTEND KART"
              className="text-3xl md:text-4xl font-black font-display text-gray-950 leading-tight"
              tag="h2"
            />
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-sm text-gray-500 font-sans leading-relaxed"
            >
              We take the heavy lifting of paperwork off your shoulders. With a{' '}
              <GradientText text="4.9⭐ Google Rating" className="font-bold" /> and hundreds of
              satisfied customers in Warangal, we make registrations completely stress-free.
            </motion.p>

            {/* Animated rating bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="pt-4 border-t border-gray-100"
            >
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex justify-between mb-1.5">
                    <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Customer Satisfaction</span>
                    <span className="text-xs font-black text-brand">98%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '98%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full bg-gradient-to-r from-brand to-brand-light rounded-full"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Features right column — upgraded cards */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-5">
            {FEATURES.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="relative bg-white border border-gray-100 p-6 rounded-2xl shadow-soft hover:shadow-glow hover:border-brand/20 transition-all duration-300 group overflow-hidden"
                >
                  {/* Hover gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feat.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <motion.div
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feat.gradient} flex items-center justify-center text-white shadow-md`}
                      >
                        <Icon className="h-6 w-6" />
                      </motion.div>
                      {/* Stat badge */}
                      <div className="text-right">
                        <span className="text-lg font-black text-gray-950 font-display block leading-none">
                          {feat.stat}
                        </span>
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                          {feat.statLabel}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-gray-950 font-display mb-2 group-hover:text-brand transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-gray-500 font-sans leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
