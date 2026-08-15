import React from 'react';
import HeroSlider from '../components/HeroSlider';
import StatsStrip from '../components/StatsStrip';
import ServiceCard from '../components/ServiceCard';
import HowItWorks from '../components/HowItWorks';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import WhyChooseUs from '../components/WhyChooseUs';
import PaymentStrip from '../components/PaymentStrip';
import CTABanner from '../components/CTABanner';
import { SERVICES } from '../lib/services-data';
import { HiArrowRight } from 'react-icons/hi2';

interface HomeProps {
  onNavigate: (tab: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  // Show first 6 services as a teaser
  const featuredServices = SERVICES.slice(0, 6);

  return (
    <div id="home-view">
      {/* Hero Header */}
      <HeroSlider onNavigate={onNavigate} />

      {/* Stats Counter Strip */}
      <StatsStrip />

      {/* Featured Services Teaser Section */}
      <section className="py-24 bg-white" id="featured-services">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div className="space-y-4">
              <span className="section-label">Service Portfolio</span>
              <h2 className="text-3xl md:text-4xl font-black font-display text-gray-950">
                Popular Registration Solutions
              </h2>
              <p className="text-sm text-gray-500 max-w-xl font-sans">
                Browse our top-rated business registrations, certificates, and compliance services designed specifically for Warangal's growing enterprises.
              </p>
            </div>
            
            <button
              onClick={() => onNavigate('services')}
              className="group flex items-center gap-2 bg-gray-50 text-gray-900 hover:bg-brand hover:text-white px-6 py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all duration-300 border border-gray-100 shrink-0 cursor-pointer"
            >
              <span>View All Services</span>
              <HiArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Grid of first 6 services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* Payment Channels Info */}
      <PaymentStrip />

      {/* Conversion Banner */}
      <CTABanner onNavigate={onNavigate} />
    </div>
  );
}
