import React from 'react';
import { motion } from 'motion/react';
import { HiShieldCheck, HiBolt, HiCheckBadge, HiStar, HiMapPin, HiClock, HiPhone, HiEnvelope } from 'react-icons/hi2';

export default function About() {
  const trustBadges = [
    { title: 'Licensed Hub', icon: HiShieldCheck, desc: 'Registered Digital Service Point' },
    { title: 'Fast Processing', icon: HiBolt, desc: 'Filing within hours of submission' },
    { title: 'Govt Certified', icon: HiCheckBadge, desc: '100% Legal compliance guaranteed' },
    { title: '4.9 ⭐ Rated', icon: HiStar, desc: 'Highly recommended by local owners' },
  ];

  return (
    <div id="about-view" className="bg-white">
      {/* Full-bleed Hero Banner */}
      <section className="relative h-[450px] flex items-center justify-center text-center overflow-hidden">
        {/* Background using local store image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/store_image_1.jpeg')",
          }}
        />
        {/* Dark overlay for readable contrast */}
        <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 space-y-4 text-white">
          <span className="inline-block bg-brand/95 text-white text-[10px] font-mono font-bold tracking-widest uppercase px-4 py-1.5 rounded-full">
            Our Business Profile
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-display text-white tracking-tight">
            About EXTEND KART
          </h1>
          <p className="text-sm md:text-base text-gray-200 font-sans max-w-xl mx-auto">
            Warangal's premier full-service business hub. We specialize in digital document printing, food license registrations, and corporate compliance consulting.
          </p>
        </div>
      </section>

      {/* Our Story & History */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Story Image / Graphic Box */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -left-4 -top-4 w-full h-full border-2 border-brand/20 rounded-[32px] pointer-events-none" />
              <img
                src="/store_image_2.jpeg"
                alt="Extend Kart Front Office"
                className="w-full h-[400px] object-cover rounded-[32px] shadow-soft relative z-10"
              />
              <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-brand-50 rounded-full blur-3xl z-0" />
            </div>

            {/* Narrative text column */}
            <div className="lg:col-span-7 space-y-6">
              <span className="section-label">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-black font-display text-gray-950">
                A Mission to Support Local Telangana Businesses
              </h2>
              
              <p className="text-sm text-gray-500 font-sans leading-relaxed">
                Founded with a vision to streamline complex government registration processes, <strong>EXTEND KART</strong> has grown to become Warangal’s trusted partner for hundreds of retail shops, restaurateurs, hotels, and micro-entrepreneurs.
              </p>
              
              <p className="text-sm text-gray-500 font-sans leading-relaxed">
                We believe that starting and maintaining a business legally shouldn't be a bureaucratic headache. From FSSAI certifications to MSME setup, Aadhaar updates, and high-quality digital layout printing, we provide end-to-end consulting with pristine operational speed.
              </p>

              <div className="pt-6 border-t border-gray-100 flex items-center gap-2 text-brand font-black text-sm uppercase tracking-wider font-display">
                <span>"We Make It Done!!!"</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Cards Section */}
      <section className="py-16 bg-gray-50/50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { val: '500+', label: 'Customers Served' },
              { val: '4.9 ⭐', label: 'Google Rating' },
              { val: '40+', label: 'Services Available' },
              { val: '17+ Years', label: 'Active Experience' },
            ].map((stat, i) => (
              <div 
                key={i}
                className="bg-white border border-gray-100 p-6 rounded-2xl shadow-soft text-center hover:shadow-glow transition-all duration-300"
              >
                <span className="text-3xl font-black text-brand block font-display mb-1">
                  {stat.val}
                </span>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="section-label">Trust Pillars</span>
            <h2 className="text-3xl font-black font-display text-gray-950">
              Licensed & Government Compliant
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustBadges.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white border border-gray-100 p-6 rounded-2xl flex flex-col items-center text-center shadow-soft hover:shadow-glow transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand flex items-center justify-center mb-4 transition-colors group-hover:bg-brand group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-bold text-gray-950 font-display mb-1.5">
                    {badge.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-sans">
                    {badge.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Find Us / Google Map Embedding */}
      <section className="py-24 bg-gray-50/50 border-t border-gray-100" id="location-map">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Map Frame */}
            <div className="lg:col-span-7 bg-white p-3 rounded-[32px] border border-gray-100 shadow-soft h-[400px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3795.123!2d79.5876!3d17.9784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDU4JzQyLjIiTiA3OcKwMzUnMTUuNCJF!5e0!3m2!1sen!2sin!4v1234567890"
                className="w-full h-full rounded-[24px]"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                title="Google Maps Location"
              />
            </div>

            {/* Address Information Card */}
            <div className="lg:col-span-5 space-y-6 bg-white border border-gray-100 rounded-3xl p-8 shadow-soft">
              <span className="section-label">Find Our Hub</span>
              <h3 className="text-2xl font-black text-gray-950 font-display">
                Visit Us Today
              </h3>
              
              <div className="space-y-4 text-sm text-gray-500 font-sans">
                <div className="flex gap-3 items-start">
                  <HiMapPin className="h-5 w-5 text-brand mt-0.5 shrink-0" />
                  <span>
                    11-23-2394/1, Deshaipet-Enumamula Rd, Navayuga Colony, Warangal, Telangana 506002
                  </span>
                </div>
                
                <div className="flex gap-3 items-center">
                  <HiPhone className="h-5 w-5 text-brand shrink-0" />
                  <a href="tel:09951119995" className="hover:text-brand transition-colors">
                    099511 19995
                  </a>
                </div>

                <div className="flex gap-3 items-center">
                  <HiEnvelope className="h-5 w-5 text-brand shrink-0" />
                  <a href="mailto:extendkart@gmail.com" className="hover:text-brand transition-colors">
                    extendkart@gmail.com
                  </a>
                </div>

                <div className="flex gap-3 items-center">
                  <HiClock className="h-5 w-5 text-brand shrink-0" />
                  <span>Mon–Sat: 7:30am – 10pm</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
