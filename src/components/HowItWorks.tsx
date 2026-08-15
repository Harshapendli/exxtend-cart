import React from 'react';
import { motion } from 'motion/react';
import { HiCursorArrowRays, HiArrowUpTray, HiTruck } from 'react-icons/hi2';

const STEPS = [
  {
    num: '01',
    title: 'Choose Service',
    description: 'Select from our catalog of FSSAI, MSME, Passport assistance or printing services.',
    icon: HiCursorArrowRays,
  },
  {
    num: '02',
    title: 'Upload Documents',
    description: 'Provide basic verification files safely in our encrypted customer form or via WhatsApp.',
    icon: HiArrowUpTray,
  },
  {
    num: '03',
    title: 'Get Delivered',
    description: 'We register and verify everything with the government. Receive your certificate swiftly.',
    icon: HiTruck,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-white" id="how-it-works">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="section-label">Operational Cycle</span>
          <h2 className="text-3xl md:text-4xl font-black font-display text-gray-950">
            Three Simple Steps to Success
          </h2>
          <p className="text-sm text-gray-500 font-sans">
            How we make government registrations and premium printing absolutely seamless for you.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="absolute top-[2.25rem] left-[15%] right-[15%] h-[2px] bg-gray-100 hidden lg:block z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Step bubble with icon and number */}
                  <div className="relative mb-6">
                    <div className="w-18 h-18 rounded-2xl bg-white border border-gray-100 shadow-soft text-brand flex items-center justify-center transition-all duration-300 group-hover:bg-brand group-hover:text-white group-hover:scale-105 group-hover:shadow-glow">
                      <Icon className="h-8 w-8" />
                    </div>
                    {/* Number badge */}
                    <span className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full bg-brand text-white border-2 border-white text-xs font-black flex items-center justify-center font-mono">
                      {step.num}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-gray-950 font-display mb-2 group-hover:text-brand transition-colors duration-200">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-500 font-sans leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
