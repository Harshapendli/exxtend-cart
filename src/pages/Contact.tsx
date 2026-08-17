import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SERVICES } from '../lib/services-data';
import { HiMapPin, HiPhone, HiClock, HiStar, HiEnvelope } from 'react-icons/hi2';
import { FaWhatsapp } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceId: SERVICES[0].id,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast.error('Please fill in all required fields (Name and Phone).');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      toast.success('Appointment booking submitted! Our team will contact you shortly.');
      setFormData({
        name: '',
        phone: '',
        serviceId: SERVICES[0].id,
        message: ''
      });
      setIsSubmitting(false);
    }, 1200);
  };

  const contactCards = [
    {
      title: 'Our Office Address',
      desc: '11-23-2394/1, Deshaipet-Enumamula Rd, Navayuga Colony, Warangal, TS 506002',
      icon: HiMapPin,
      link: 'https://maps.google.com/?q=EXTEND+KART+Warangal'
    },
    {
      title: 'Call / Phone Support',
      desc: '099511 19995 (Toll-Free Helpline)',
      icon: HiPhone,
      link: 'tel:09951119995'
    },
    {
      title: 'Operating Hours',
      desc: 'Monday – Saturday: 7:30am – 10pm',
      icon: HiClock
    },
    {
      title: 'Google Maps Rating',
      desc: '4.9 ⭐ Stars (15 verified reviews)',
      icon: HiStar
    }
  ];

  return (
    <div id="contact-view" className="bg-white">
      {/* Mini Hero */}
      <section className="relative py-20 bg-gray-50 border-b border-gray-100 flex items-center justify-center text-center">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none bg-[radial-gradient(#1D9E75_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="max-w-3xl mx-auto px-6 space-y-4">
          <span className="section-label">Connect with Us</span>
          <h1 className="text-4xl md:text-5xl font-black font-display text-gray-950 leading-none">
            Get in Touch with EXTEND KART
          </h1>
          <p className="text-sm text-gray-500 max-w-xl mx-auto font-sans">
            Need urgent assistance? Fill out our quick appointment booking form or talk directly with our agents.
          </p>
        </div>
      </section>

      {/* Main Grid: Info on left, Form on right */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Column: Contact Cards */}
            <div className="lg:col-span-5 space-y-6">
              <span className="section-label">Contact Details</span>
              <h2 className="text-2xl font-black font-display text-gray-950">
                Talk to Our Legal Registration Experts
              </h2>
              <p className="text-sm text-gray-400 font-sans leading-relaxed">
                We respond to all online inquiries within 2 hours during normal business operations. Drop by our retail outlet or dial our direct line.
              </p>

              {/* Store Exterior */}
              <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-soft">
                <img
                  src="/store-exterior.jpg"
                  alt="EXTEND KART Store — Deshaipet Road, Warangal"
                  className="w-full h-44 object-cover"
                  loading="lazy"
                />
                <div className="px-4 py-2.5 bg-white">
                  <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Our Store · Deshaipet Road, Warangal</p>
                </div>
              </div>

              {/* Grid of Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 pt-4">
                {contactCards.map((card, i) => {
                  const Icon = card.icon;
                  const CardWrapper = card.link ? 'a' : 'div';
                  return (
                    <CardWrapper
                      key={i}
                      href={card.link}
                      className="bg-white border border-gray-100 p-5 rounded-2xl shadow-soft flex items-start gap-4 hover:border-brand/20 transition-all duration-300 block"
                    >
                      <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand flex items-center justify-center shrink-0">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-gray-950 font-display">
                          {card.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                          {card.desc}
                        </p>
                      </div>
                    </CardWrapper>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Booking Form */}
            <div className="lg:col-span-7 bg-white border border-gray-100 rounded-3xl p-8 md:p-10 shadow-soft">
              <h3 className="text-xl font-bold font-display text-gray-950 mb-6">
                Book Consultation Appointment
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Harsha Reddy"
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:bg-white focus:border-brand focus:ring-1 focus:ring-brand font-sans transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 9951119995"
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:bg-white focus:border-brand focus:ring-1 focus:ring-brand font-sans transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Service Required *
                  </label>
                  <select
                    value={formData.serviceId}
                    onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:bg-white focus:border-brand focus:ring-1 focus:ring-brand font-sans transition-all cursor-pointer"
                  >
                    {SERVICES.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name} ({service.price === 5 ? '₹5/page' : `₹${service.price.toLocaleString('en-IN')}`})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Message / Additional Info
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide additional details or questions regarding documents here..."
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:bg-white focus:border-brand focus:ring-1 focus:ring-brand font-sans transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand text-white font-black uppercase tracking-wider py-4 px-6 rounded-xl hover:bg-brand-dark transition-colors shadow-glow flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
                >
                  <span>{isSubmitting ? 'Submitting Form...' : 'Book Free Consultation'}</span>
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14 space-y-3">
            <span className="section-label">The People Behind Your Services</span>
            <h2 className="text-3xl md:text-4xl font-black font-display text-gray-950">
              Meet Our Team
            </h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto font-sans">
              Our dedicated professionals ensure every registration and document is handled with precision and care.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8">
            {[
              { name: 'Ponnala Vasundara', role: 'Senior Executive', img: '/staff/vasundara.jpg' },
              { name: 'Pendli Raghupathi', role: 'Operations Lead', img: '/staff/raghupathi.jpg' },
              { name: 'Karampuri Vinay', role: 'Registration Specialist', img: '/staff/karampuri-vinay.jpg' },
              { name: 'Jannu Raghuram', role: 'Documentation Head', img: '/staff/raghuram.jpg' },
              { name: 'Thippani Vinay', role: 'Client Relations', img: '/staff/thippani-vinay.jpg' },
            ].map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group text-center"
              >
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-4 rounded-2xl overflow-hidden border-2 border-gray-100 group-hover:border-brand/30 transition-all duration-300 shadow-soft group-hover:shadow-glow">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h4 className="text-sm font-bold font-display text-gray-900 group-hover:text-brand transition-colors">
                  {member.name}
                </h4>
                <p className="text-[11px] text-gray-400 font-medium mt-0.5 uppercase tracking-wider">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA card below form */}
      <section className="py-12 bg-gray-50/50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-4">
          <h3 className="text-xl font-bold font-display text-gray-950">
            Prefer Instant Chat over Forms?
          </h3>
          <p className="text-sm text-gray-500 font-sans">
            Connect directly with our staff on WhatsApp for rapid, real-time consultation and document submission support.
          </p>
          <div className="pt-2">
            <motion.a
              href="https://wa.me/919951119995"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 bg-[#25D366] text-white font-black uppercase tracking-wider px-8 py-4 rounded-2xl shadow-lg hover:bg-[#20ba5a] transition-all cursor-pointer"
            >
              <FaWhatsapp className="h-5 w-5" />
              <span>Chat with Us Now</span>
            </motion.a>
          </div>
        </div>
      </section>
    </div>
  );
}
