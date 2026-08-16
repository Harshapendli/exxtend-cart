import React from 'react';
import { motion } from 'motion/react';
import { HiChatBubbleLeftRight, HiArrowRight, HiSparkles } from 'react-icons/hi2';
import { WordReveal } from './AnimatedText';

interface CTABannerProps {
  onNavigate: (tab: string) => void;
}

export default function CTABanner({ onNavigate }: CTABannerProps) {
  return (
    <section className="py-24 bg-white" id="cta-banner">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gray-950 rounded-[32px] p-8 md:p-16 text-center text-white relative overflow-hidden"
        >
          {/* Animated gradient orbs */}
          <motion.div
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -20, 30, 0],
              scale: [1, 1.2, 0.9, 1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -right-20 -top-20 w-80 h-80 bg-brand/30 rounded-full blur-[80px]"
          />
          <motion.div
            animate={{
              x: [0, -30, 20, 0],
              y: [0, 20, -30, 0],
              scale: [1, 0.9, 1.2, 1],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -left-20 -bottom-20 w-80 h-80 bg-blue-500/20 rounded-full blur-[80px]"
          />
          <motion.div
            animate={{
              x: [0, 20, -10, 0],
              y: [0, -15, 25, 0],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-1/2 top-0 w-60 h-60 bg-amber-500/15 rounded-full blur-[80px]"
          />

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(white_1px,transparent_1px)] [background-size:32px_32px]" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-white/10 text-white text-xs font-bold uppercase tracking-widest px-5 py-2 rounded-full backdrop-blur-sm border border-white/10"
            >
              <HiSparkles className="h-3.5 w-3.5 text-amber-400" />
              Instant Consultations
            </motion.span>

            <WordReveal
              text="Ready to Get Your Registration Sorted?"
              className="text-3xl md:text-5xl font-black font-display leading-tight text-white"
              tag="h2"
              delay={0.1}
            />

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="text-sm md:text-base text-white/60 font-sans leading-relaxed"
            >
              Don't get stuck in bureaucracy. Let our expert team handle your FSSAI, MSME, or Trade certifications
              while you focus on growing your business.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap items-center justify-center gap-4 pt-4"
            >
              <motion.button
                onClick={() => onNavigate('services')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-brand text-white hover:bg-brand-light text-xs font-black uppercase tracking-wider py-4 px-8 rounded-2xl shadow-glow transition-colors flex items-center gap-2 cursor-pointer animate-pulse-glow"
              >
                <span>Browse Services</span>
                <HiArrowRight className="h-4 w-4" />
              </motion.button>

              <motion.button
                onClick={() => onNavigate('contact')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-black uppercase tracking-wider py-4 px-8 rounded-2xl transition-all flex items-center gap-2 cursor-pointer backdrop-blur-sm"
              >
                <HiChatBubbleLeftRight className="h-4 w-4" />
                <span>Talk with an Expert</span>
              </motion.button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }}
              className="flex items-center justify-center gap-6 pt-6 text-white/30 text-[10px] font-bold uppercase tracking-widest"
            >
              <span>🔒 Secure Payments</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>⚡ Fast Processing</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>✅ Govt Certified</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
