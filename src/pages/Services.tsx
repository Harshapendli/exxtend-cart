import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES, CATEGORIES } from '../lib/services-data';
import ServiceCard from '../components/ServiceCard';
import { HiMagnifyingGlass, HiShieldCheck, HiArrowRight, HiClock, HiDocumentCheck } from 'react-icons/hi2';
import { useCartStore } from '../lib/cart-store';
import { toast } from 'react-hot-toast';

export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState<typeof CATEGORIES[number]>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [zoomImageUrl, setZoomImageUrl] = useState<string | null>(null);
  const addItem = useCartStore((state) => state.addItem);

  // Filter logic
  const filteredServices = SERVICES.filter((service) => {
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Posters mock structured data matching the user's images
  const FSSAI_POSTERS = [
    {
      id: 'fssai-state-brochure',
      title: 'FSSAI State License',
      imageUrl: '/menu_state_fssai.jpeg',
      subtitle: 'For Medium Businesses',
      turnover: 'Turnover ₹12 Lakhs – ₹20 Crore',
      documents: [
        'Aadhaar / PAN Card of Owner',
        'Passport Size Photograph',
        'Business Address Proof',
        'Partnership Deed / Firm Registration',
        'Food Safety Management System Plan',
        'List of Food Products',
        'Bank Account Details',
        'NOC from Municipality / Local Authority'
      ],
      suitable: ['Restaurants & Hotels', 'Cloud Kitchens', 'Food Manufacturers', 'Food Traders'],
      price: 8100,
      badge: '100% Legal & Safe'
    },
    {
      id: 'fssai-central-brochure',
      title: 'FSSAI Central License',
      imageUrl: '/menu_central_fssai.jpeg',
      subtitle: 'For Large Businesses',
      turnover: 'Turnover Above ₹20 Crore / Import-Export',
      documents: [
        'PAN Card of Business / Company',
        'Aadhaar of Directors / Partners',
        'Incorporation Certificate',
        'Business Address Proof',
        'Food Safety Management System Plan',
        'Import Export Code (IEC)',
        'List of Directors / Partners',
        'Water Test Report',
        'NOC from Municipality',
        'List of Equipment & Machinery'
      ],
      suitable: ['Food Manufacturers', 'Importers & Exporters', 'Large Restaurants', 'Food Distributors'],
      price: 13500,
      badge: 'End-to-End Support'
    },
    {
      id: 'fssai-basic-brochure',
      title: 'FSSAI Basic Registration',
      imageUrl: '/menu_fssai.jpeg',
      subtitle: 'Start food business legally!',
      turnover: 'Turnover Up to ₹12 Lakhs',
      documents: [
        'Aadhaar Card / Any ID Proof',
        'Passport Size Photograph',
        'Mobile Number & Email ID',
        'Business Name',
        'Business Address',
        'Nature of Business (tiffin, stall, kitchen)'
      ],
      suitable: ['Street Food Vendors', 'Tiffin Centers', 'Home-Based Food Units', 'Small Food Shops'],
      price: 999,
      badge: 'Quick Approval'
    },
    {
      id: 'fssai-licence-brochure',
      title: 'FSSAI Licence Pricing',
      imageUrl: '/menu_2.jpeg',
      subtitle: 'We make food safety simple',
      turnover: '3 Simple Steps to Register',
      documents: [
        'Step 1: APPLY (Share basic details)',
        'Step 2: VERIFY (We verify & prepare documents)',
        'Step 3: GET LICENSE (Receive FSSAI Licence)'
      ],
      suitable: ['Legal Compliance Guarantee', 'Build Consumer Trust', 'Business Expansion Ready'],
      price: 999,
      badge: 'Transparent Pricing'
    }
  ];

  return (
    <div id="services-view" className="bg-white">
      {/* Mini Hero Banner */}
      <section className="relative py-20 bg-gray-50 border-b border-gray-100 flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none bg-[radial-gradient(#1D9E75_1px,transparent_1px)] [background-size:24px_24px]" />
        {/* Animated floating shapes */}
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-[10%] top-[20%] w-16 h-16 rounded-2xl bg-brand/5 rotate-12"
        />
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-[15%] bottom-[20%] w-20 h-20 rounded-full bg-blue-500/5"
        />
        <motion.div
          animate={{ y: [0, -10, 0], x: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-[10%] top-[30%] w-12 h-12 rounded-xl bg-amber-500/5 rotate-45"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto px-6 space-y-4 relative z-10"
        >
          <span className="section-label">Service Catalog</span>
          <h1 className="text-4xl md:text-5xl font-black font-display leading-none">
            <span className="text-gray-950">Services & </span>
            <span className="bg-gradient-to-r from-brand via-brand-light to-brand bg-clip-text text-transparent animate-gradient-x bg-[length:200%]">
              Transparent Pricing
            </span>
          </h1>
          <p className="text-sm md:text-base text-gray-500 max-w-xl mx-auto font-sans">
            Quick, reliable, and hassle-free registrations with instant processing. Clear rates with no hidden fees.
          </p>

          {/* Service count badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 bg-white border border-gray-100 px-4 py-2 rounded-full shadow-soft text-xs font-bold text-gray-600"
          >
            <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
            {filteredServices.length} services available
          </motion.div>
        </motion.div>
      </section>

      {/* Directory Filter & Search Row */}
      <section className="py-3 border-b border-gray-100 bg-white/80 backdrop-blur-xl sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">

          {/* Category tabs — compact horizontal scroll on mobile */}
          <div className="flex items-center gap-1 p-1 bg-gray-50 border border-gray-100 rounded-xl w-full md:w-auto overflow-x-auto no-scrollbar">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#1D9E75] text-white shadow-glow'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-white/50'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search box */}
          <div className="relative w-full md:max-w-xs">
            <HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services..."
              className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-9 pr-4 py-2 text-xs font-medium focus:outline-none focus:bg-white focus:border-brand focus:ring-1 focus:ring-brand transition-all"
            />
          </div>

        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          
          <AnimatePresence mode="popLayout">
            {filteredServices.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredServices.map((service, idx) => (
                  <ServiceCard key={service.id} service={service} index={idx} />
                ))}
              </motion.div>
            ) : (
              /* Empty state */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-24 max-w-sm mx-auto"
              >
                <div className="w-16 h-16 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 mx-auto mb-4">
                  <HiMagnifyingGlass className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-1">
                  No services found
                </h3>
                <p className="text-xs text-gray-400 font-sans">
                  Try searching with alternative keywords or reset the active filter category.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* FSSAI Visual Pricing Gallery (Poster representation) */}
      <section className="py-24 bg-gray-50/50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <span className="section-label">FSSAI Compliance Flyers</span>
            <h2 className="text-3xl md:text-4xl font-black font-display text-gray-950">
              Interactive Registration Handouts
            </h2>
            <p className="text-sm text-gray-500 font-sans">
              These brochures outline document lists and suitability guidelines, mapping exactly to our official offline posters.
            </p>
          </div>

          {/* Brochures Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {FSSAI_POSTERS.map((poster) => (
              <motion.div
                key={poster.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="bg-white border border-gray-100 rounded-3xl p-8 md:p-10 shadow-soft hover:shadow-glow hover:border-brand/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top line banner */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="bg-brand-50 text-brand text-[10px] font-mono font-bold tracking-widest uppercase px-3 py-1.5 rounded-full">
                      {poster.badge}
                    </span>
                    <span className="text-xs text-gray-400 font-semibold">{poster.subtitle}</span>
                  </div>

                  {/* Flyer Image Container with Interactive Zoom */}
                  <div 
                    onClick={() => setZoomImageUrl(poster.imageUrl)}
                    className="group/flyer relative h-72 w-full rounded-2xl overflow-hidden mb-8 border border-gray-100 bg-gray-50 cursor-zoom-in shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <img
                      src={poster.imageUrl}
                      alt={`${poster.title} Official Flyer`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/flyer:scale-[1.03]"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gray-900/40 opacity-0 group-hover/flyer:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                      <span className="bg-white text-gray-900 text-xs font-black uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-[#1D9E75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Zoom Official Flyer
                      </span>
                    </div>
                    {/* Corner Zoom Badge */}
                    <div className="absolute bottom-3 right-3 bg-gray-950/70 backdrop-blur px-2.5 py-1.5 rounded-lg text-[9px] font-bold text-white uppercase tracking-wider">
                      Click to View
                    </div>
                  </div>

                  {/* Title & Turnover */}
                  <h3 className="text-2xl font-black text-gray-950 font-display mb-1">
                    {poster.title}
                  </h3>
                  <div className="inline-block bg-[#1D9E75]/5 border border-brand/5 text-xs text-brand font-bold px-3 py-1.5 rounded-xl mb-6">
                    {poster.turnover}
                  </div>

                  {/* Document List */}
                  <div className="space-y-4 mb-8">
                    <h4 className="text-xs font-extrabold text-gray-900 tracking-wider uppercase flex items-center gap-1.5">
                      <HiDocumentCheck className="h-4 w-4 text-[#F3B200]" />
                      <span>Required Documents:</span>
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {poster.documents.map((doc, i) => (
                        <li key={i} className="flex gap-2 text-xs text-gray-500 leading-tight">
                          <span className="text-[#1D9E75] font-bold">✓</span>
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Suitable For */}
                  <div className="space-y-3 mb-8 pt-6 border-t border-gray-50">
                    <h4 className="text-xs font-extrabold text-gray-900 tracking-wider uppercase flex items-center gap-1.5">
                      <HiShieldCheck className="h-4 w-4 text-brand" />
                      <span>Suitable For / Benefits:</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {poster.suitable.map((item, i) => (
                        <span key={i} className="bg-gray-50 text-gray-600 text-[11px] font-medium px-2.5 py-1.5 rounded-lg border border-gray-100">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer and Price */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-50 mt-auto">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">Package starts from</span>
                    <span className="text-2xl font-black text-brand font-display">
                      ₹{poster.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      addItem({ id: poster.id, name: `${poster.title} Consultation`, price: poster.price });
                      toast.success(`Added ${poster.title} setup pack to your Cart!`);
                    }}
                    className="bg-brand text-white text-xs font-black uppercase tracking-wider py-3 px-6 rounded-xl hover:bg-brand-dark transition-colors shadow-glow flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Order Setup Pack</span>
                    <HiArrowRight className="h-4 w-4" />
                  </button>
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* High-Resolution Poster Lightbox Modal */}
      <AnimatePresence>
        {zoomImageUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomImageUrl(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-zoom-out"
          >
            <button 
              onClick={() => setZoomImageUrl(null)}
              className="absolute top-6 right-6 text-white hover:text-brand transition-colors p-3 bg-white/10 hover:bg-white/20 rounded-full"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[90vh] overflow-auto bg-white rounded-3xl p-2 border border-white/20 shadow-2xl"
            >
              <img
                src={zoomImageUrl}
                alt="FSSAI Official Poster Zoomed"
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-inner"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gray-900/90 backdrop-blur text-white text-[11px] font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-glow">
                Click outside or press X to close
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
