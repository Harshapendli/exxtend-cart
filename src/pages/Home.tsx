import React from 'react';
import HeroSlider from '../components/HeroSlider';
import StatsStrip from '../components/StatsStrip';
import MarqueeTicker from '../components/MarqueeTicker';
import ServiceCard from '../components/ServiceCard';
import HowItWorks from '../components/HowItWorks';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import WhyChooseUs from '../components/WhyChooseUs';
import PaymentStrip from '../components/PaymentStrip';
import CTABanner from '../components/CTABanner';
import OwnerSection from '../components/OwnerSection';
import { SERVICES } from '../lib/services-data';
import { HiArrowRight } from 'react-icons/hi2';
import { motion } from 'motion/react';
import { WordReveal } from '../components/AnimatedText';

interface HomeProps {
  onNavigate: (tab: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  // Show first 8 services as a teaser
  const featuredServices = SERVICES.slice(0, 8);

  return (
    <div id="home-view">
      {/* Hero Header */}
      <HeroSlider onNavigate={onNavigate} />

      {/* Scrolling Marquee Ticker */}
      <MarqueeTicker />

      {/* Stats Counter Strip */}
      <StatsStrip />

      {/* Featured Services Teaser Section */}
      <section className="py-24 bg-white relative overflow-hidden" id="featured-services">
        {/* Decorative background */}
        <div className="absolute left-0 top-1/4 w-72 h-72 bg-brand/3 rounded-full blur-[100px]" />
        <div className="absolute right-0 bottom-1/4 w-72 h-72 bg-blue-500/3 rounded-full blur-[100px]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div className="space-y-4">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="section-label inline-block"
              >
                Service Portfolio
              </motion.span>
              <WordReveal
                text="Popular Registration Solutions"
                className="text-3xl md:text-4xl font-black font-display text-gray-950"
                tag="h2"
              />
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-sm text-gray-500 max-w-xl font-sans"
              >
                Browse our top-rated business registrations, certificates, and compliance services designed for Warangal's growing enterprises.
              </motion.p>
            </div>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('services')}
              className="group flex items-center gap-2 bg-gray-950 text-white px-6 py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all duration-300 border border-gray-800 shrink-0 cursor-pointer hover:shadow-glow"
            >
              <span>View All 40+ Services</span>
              <HiArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>

          {/* Grid of first 8 services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredServices.map((service, idx) => (
              <ServiceCard key={service.id} service={service} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Operations Lifecycle timeline */}
      <HowItWorks />

      {/* Strategic Strengths */}
      <WhyChooseUs />

      {/* Verified Reviews Carousel */}
      <TestimonialsCarousel />

      {/* Meet the Founder */}
      <OwnerSection />

      {/* Payment Channels Info */}
      <PaymentStrip />

      {/* Conversion Banner */}
      <CTABanner onNavigate={onNavigate} />
    </div>
  );
}
