import React from 'react';
import { motion } from 'motion/react';
import { HiCursorArrowRays, HiArrowUpTray, HiTruck, HiCheckBadge } from 'react-icons/hi2';
import { WordReveal } from './AnimatedText';

const STEPS = [
  {
    num: '01',
    title: 'Choose Service',
    description: 'Browse our catalog of 40+ services — FSSAI, MSME, Passport, Property Registration and more.',
    icon: HiCursorArrowRays,
    color: 'from-emerald-400 to-emerald-600',
  },
  {
    num: '02',
    title: 'Upload Documents',
    description: 'Provide required documents safely via our secure form or WhatsApp. We verify everything.',
    icon: HiArrowUpTray,
    color: 'from-blue-400 to-blue-600',
  },
  {
    num: '03',
    title: 'We Process It',
    description: 'Our expert team handles all government filings, follow-ups, and compliance checks.',
    icon: HiCheckBadge,
    color: 'from-amber-400 to-amber-600',
  },
  {
    num: '04',
    title: 'Get Delivered',
    description: 'Receive your certificate, licence, or registration — delivered to your doorstep or WhatsApp.',
    icon: HiTruck,
    color: 'from-purple-400 to-purple-600',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-gray-50/50 border-t border-b border-gray-100 relative overflow-hidden" id="how-it-works">
      {/* Decorative background circles */}
      <div className="absolute -left-32 top-20 w-64 h-64 bg-brand/5 rounded-full blur-3xl" />
      <div className="absolute -right-32 bottom-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="section-label inline-block"
          >
            How It Works
          </motion.span>
          <WordReveal
            text="Four Simple Steps to Success"
            className="text-3xl md:text-4xl font-black font-display text-gray-950"
            tag="h2"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-sm text-gray-500 font-sans"
          >
            From choosing a service to getting your certificate — we make it completely hassle-free.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Animated connecting line (Desktop) */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-[3.5rem] left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-emerald-300 via-blue-300 via-amber-300 to-purple-300 hidden lg:block z-0 origin-left"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Step circle with animated ring */}
                  <div className="relative mb-6">
                    {/* Pulse ring */}
                    <motion.div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}
                      style={{ inset: '-8px' }}
                    />
                    {/* Icon container */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                      className={`relative w-20 h-20 rounded-2xl bg-white border-2 border-gray-100 shadow-soft text-brand flex items-center justify-center transition-all duration-300 group-hover:border-brand/30 group-hover:shadow-glow`}
                    >
                      <Icon className="h-9 w-9" />
                    </motion.div>
                    {/* Number badge with pulse */}
                    <motion.span
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + idx * 0.15, type: 'spring', stiffness: 500 }}
                      className={`absolute -top-2.5 -right-2.5 w-8 h-8 rounded-full bg-gradient-to-br ${step.color} text-white border-3 border-white text-xs font-black flex items-center justify-center font-mono shadow-md`}
                    >
                      {step.num}
                    </motion.span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-950 font-display mb-2 group-hover:text-brand transition-colors duration-200">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-500 font-sans leading-relaxed max-w-xs">
                    {step.description}
                  </p>

                  {/* Arrow connector for mobile */}
                  {idx < STEPS.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                      className="lg:hidden mt-4 mb-2 text-gray-300 text-2xl"
                    >
                      ↓
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
