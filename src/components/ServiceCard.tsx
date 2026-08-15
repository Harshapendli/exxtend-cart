import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Service } from '../types';
import { useCartStore } from '../lib/cart-store';
import { formatPrice } from '../lib/utils';
import IconRenderer from './IconRenderer';
import { HiPlus, HiCheck } from 'react-icons/hi2';

interface ServiceCardProps {
  service: Service;
  index: number;
  key?: string | number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);
  const [showZoom, setShowZoom] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({ id: service.id, name: service.name, price: service.price });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.4), ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -6 }}
        className="group relative overflow-hidden bg-white border border-gray-100 rounded-2xl p-6 shadow-soft hover:shadow-glow hover:border-brand/20 transition-all duration-300 flex flex-col justify-between"
        id={`service-card-${service.id}`}
      >
        {/* Top Accent Line - Scales up on card hover */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-brand scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />

        <div>
          {/* Service Icon and Category */}
          <div className="flex items-center justify-between mb-5">
            <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
              <IconRenderer name={service.iconName} className="h-6 w-6" />
            </div>
            <span className="text-xs font-mono font-semibold tracking-wider text-brand bg-brand-50/50 px-2.5 py-1 rounded-full uppercase">
              {service.category}
            </span>
          </div>

          {/* Optional Flyer Image with zoom action */}
          {service.imageUrl && (
            <div 
              onClick={() => setShowZoom(true)}
              className="relative h-48 w-full rounded-xl overflow-hidden mb-5 border border-gray-100 bg-gray-50 cursor-zoom-in"
            >
              <img
                src={service.imageUrl}
                alt={`${service.name} Flyer`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute bottom-2.5 right-2.5 bg-gray-950/70 backdrop-blur px-2 py-1 rounded text-[8px] font-black text-white uppercase tracking-wider">
                Click to Zoom Flyer
              </div>
            </div>
          )}

          {/* Name and Description */}
          <h3 className="text-lg font-bold font-display text-gray-900 group-hover:text-brand transition-colors duration-200 line-clamp-1 mb-2">
            {service.name}
          </h3>
          
          <p className="text-sm text-gray-500 line-clamp-2 mb-6 font-sans">
            {service.description}
          </p>
        </div>

        {/* Pricing and Action Button */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
          <div>
            <span className="text-xs font-medium text-gray-400 block uppercase tracking-wider">Starting from</span>
            <span className="text-2xl font-black font-display text-gray-950">
              {formatPrice(service.price)}
            </span>
          </div>

          {service.price > 0 ? (
            <motion.button
              onClick={handleAddToCart}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                added
                  ? 'bg-[#1D9E75] text-white shadow-glow'
                  : 'bg-gray-50 text-gray-900 hover:bg-brand hover:text-white hover:shadow-glow'
              }`}
              id={`add-to-cart-btn-${service.id}`}
            >
              {added ? (
                <>
                  <HiCheck className="h-4 w-4" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <HiPlus className="h-4 w-4" />
                  <span>Add to Cart</span>
                </>
              )}
            </motion.button>
          ) : (
            <a
              href="https://wa.me/919951119995"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-gray-50 text-gray-900 hover:bg-brand hover:text-white hover:shadow-glow transition-all duration-300 cursor-pointer"
            >
              <HiPlus className="h-4 w-4" />
              <span>Get Quote</span>
            </a>
          )}
        </div>
      </motion.div>

      {/* High-Resolution Poster Lightbox Modal inside card */}
      <AnimatePresence>
        {showZoom && service.imageUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowZoom(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-zoom-out"
          >
            <button 
              onClick={() => setShowZoom(false)}
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
                src={service.imageUrl}
                alt={`${service.name} Official Poster Zoomed`}
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
    </>
  );
}
