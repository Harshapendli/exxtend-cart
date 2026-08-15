import React from 'react';
import { motion } from 'motion/react';
import { HiChatBubbleLeftRight, HiArrowRight } from 'react-icons/hi2';

interface CTABannerProps {
  onNavigate: (tab: string) => void;
}

export default function CTABanner({ onNavigate }: CTABannerProps) {
  return (
    <section className="py-24 bg-white" id="cta-banner">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-brand rounded-[32px] p-8 md:p-16 text-center text-white relative overflow-hidden shadow-glow">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand to-brand-light opacity-95" />
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="inline-block bg-white/15 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full backdrop-blur-sm">
              Instant Consultations
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-display leading-tight">
              Ready to Get Your Government Registration Sorted?
            </h2>
            <p className="text-sm md:text-base text-white/80 font-sans leading-relaxed">
              Don't get stuck in bureaucracy. Let our expert compliance team file your FSSAI, MSME, or Trade certifications seamlessly while you focus on scaling your business.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <motion.button
                onClick={() => onNavigate('services')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-brand hover:text-brand-dark text-xs font-black uppercase tracking-wider py-4 px-8 rounded-2xl shadow-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Browse Services</span>
                <HiArrowRight className="h-4 w-4" />
              </motion.button>

              <motion.button
                onClick={() => onNavigate('contact')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-brand-dark/40 hover:bg-brand-dark/60 text-white border border-white/20 text-xs font-black uppercase tracking-wider py-4 px-8 rounded-2xl transition-colors flex items-center gap-2 cursor-pointer"
              >
                <HiChatBubbleLeftRight className="h-4 w-4" />
                <span>Talk with an Agent</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
