import React from 'react';
import { motion } from 'motion/react';
import { HiCheckCircle, HiHome, HiWrenchScrewdriver, HiPhone } from 'react-icons/hi2';
import { FaWhatsapp } from 'react-icons/fa';

interface SuccessProps {
  onNavigate: (tab: string) => void;
}

export default function Success({ onNavigate }: SuccessProps) {
  // Confetti positions
  const confetti = Array.from({ length: 25 }).map((_, i) => ({
    id: i,
    x: Math.random() * 300 - 150,
    y: Math.random() * -200 - 50,
    size: Math.random() * 8 + 4,
    color: ['#1D9E75', '#2bbf8e', '#F3B200', '#009EE2', '#ff5a5f'][Math.floor(Math.random() * 5)],
    delay: Math.random() * 0.5,
  }));

  return (
    <div id="success-view" className="min-h-[80vh] flex items-center justify-center py-16 bg-white relative overflow-hidden">
      
      {/* Animated Confetti */}
      {confetti.map((dot) => (
        <motion.div
          key={dot.id}
          initial={{ opacity: 0, y: 0, x: 0 }}
          animate={{ 
            opacity: [0, 1, 1, 0], 
            y: dot.y, 
            x: dot.x,
            rotate: 360 
          }}
          transition={{ 
            duration: 2.5, 
            delay: dot.delay,
            ease: "easeOut",
            repeat: Infinity,
            repeatDelay: 1.5
          }}
          className="absolute pointer-events-none rounded-full"
          style={{
            left: '50%',
            top: '45%',
            width: dot.size,
            height: dot.size,
            backgroundColor: dot.color,
          }}
        />
      ))}

      <div className="max-w-md w-full px-6 text-center space-y-8 select-none relative z-10">
        
        {/* Checkmark bubble */}
        <div className="relative inline-block">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 15 }}
            className="w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center text-[#1D9E75] mx-auto border border-emerald-100"
          >
            <HiCheckCircle className="h-16 w-16" />
          </motion.div>
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute -top-1 -right-1 bg-[#F3B200] text-white p-1 rounded-full border-2 border-white text-xs font-black"
          >
            ★ Approved
          </motion.span>
        </div>

        {/* Text */}
        <div className="space-y-3">
          <h1 className="text-3xl font-black font-display text-gray-950">
            Payment Successful!
          </h1>
          <p className="text-sm text-gray-500 font-sans max-w-sm mx-auto leading-relaxed">
            Your registration order has been securely processed. Our compliance managers have received your billing details and will call you within 15 minutes to initiate your government filing.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
          <button
            onClick={() => onNavigate('home')}
            className="bg-brand text-white text-xs font-black uppercase tracking-wider py-4 px-6 rounded-xl hover:bg-brand-dark transition-all shadow-glow flex items-center justify-center gap-2 cursor-pointer"
          >
            <HiHome className="h-4 w-4" />
            <span>Back to Home</span>
          </button>
          <button
            onClick={() => onNavigate('services')}
            className="bg-white text-gray-950 border border-gray-100 text-xs font-black uppercase tracking-wider py-4 px-6 rounded-xl hover:bg-gray-50 hover:border-gray-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <HiWrenchScrewdriver className="h-4 w-4" />
            <span>View Services</span>
          </button>
        </div>

        {/* Quick Help Contacts footer card */}
        <div className="p-5 border border-gray-100 rounded-2xl bg-gray-50/50 space-y-3">
          <span className="text-xs font-extrabold text-gray-400 tracking-wider uppercase block">
            Need Help or Want to Submit Docs?
          </span>
          <div className="flex justify-center gap-4">
            <a
              href="https://wa.me/919951119995"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-gray-600 hover:text-[#25D366] flex items-center gap-1.5 transition-colors"
            >
              <FaWhatsapp className="h-4.5 w-4.5" />
              <span>WhatsApp Doc Desk</span>
            </a>
            <span className="text-gray-300">|</span>
            <a
              href="tel:09951119995"
              className="text-xs font-bold text-gray-600 hover:text-brand flex items-center gap-1.5 transition-colors"
            >
              <HiPhone className="h-4 w-4" />
              <span>Call Helpline</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
