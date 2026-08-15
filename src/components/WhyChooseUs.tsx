import React from 'react';
import { motion } from 'motion/react';
import { HiShieldCheck, HiOutlineReceiptPercent, HiBolt, HiUserGroup } from 'react-icons/hi2';

const FEATURES = [
  {
    title: 'Govt Certified Center',
    description: 'We are a fully licensed and registered digital service center complying strictly with department guidelines.',
    icon: HiShieldCheck,
  },
  {
    title: 'Affordable Pricing',
    description: 'Transparent processing fees with absolutely zero hidden charges. Know exactly what you pay for.',
    icon: HiOutlineReceiptPercent,
  },
  {
    title: 'Fast & Timely Delivery',
    description: 'We submit applications within hours. Instant digital receipts and progress tracking via WhatsApp.',
    icon: HiBolt,
  },
  {
    title: 'Expert Consulting Team',
    description: 'Years of local experience handling FSSAI licensing and state corporate trade compliance.',
    icon: HiUserGroup,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-white" id="why-choose-us">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Header left column */}
          <div className="lg:col-span-5 space-y-6">
            <span className="section-label">Our Strengths</span>
            <h2 className="text-3xl md:text-4xl font-black font-display text-gray-950 leading-tight">
              Why Local Businesses Trust EXTEND KART
            </h2>
            <p className="text-sm text-gray-500 font-sans leading-relaxed">
              We take the heavy lifting of paperwork off your shoulders. With a 4.9⭐ Google Rating and hundreds of satisfied customers in Warangal, we make registrations completely stress-free.
            </p>
            <div className="pt-4 border-t border-gray-100">
              <span className="text-[#1D9E75] font-black text-lg block">4.9 ⭐</span>
              <span className="text-xs text-gray-400 font-medium font-sans uppercase tracking-wider">Average Customer Satisfaction rating</span>
            </div>
          </div>

          {/* Features right column */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {FEATURES.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="bg-white border border-gray-100 p-6 rounded-2xl shadow-soft hover:shadow-glow hover:border-brand/25 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-gray-950 font-display mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-gray-500 font-sans leading-relaxed">
                    {feat.description}
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
