import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIALS } from '../lib/services-data';
import { HiStar, HiChevronLeft, HiChevronRight, HiMiniChatBubbleLeftRight } from 'react-icons/hi2';

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 350, damping: 30 },
        opacity: { duration: 0.35 },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 50 : -50,
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 350, damping: 30 },
        opacity: { duration: 0.35 },
      },
    }),
  };

  return (
    <section className="py-24 bg-gray-50/50 border-t border-b border-gray-100" id="testimonials">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="section-label">Testimonials</span>
          <h2 className="text-3xl font-black font-display text-gray-950">
            What Our Customers Say
          </h2>
        </div>

        {/* Testimonial Box */}
        <div className="relative bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-soft min-h-[250px] flex flex-col justify-between overflow-hidden">
          {/* Quote Graphic Icon */}
          <div className="absolute right-8 top-8 opacity-[0.05] text-brand">
            <HiMiniChatBubbleLeftRight className="h-28 w-28" />
          </div>

          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="space-y-6 select-none relative z-10"
            >
              {/* Star Rating */}
              <div className="flex gap-1">
                {Array.from({ length: TESTIMONIALS[current].rating }).map((_, i) => (
                  <HiStar key={i} className="h-5 w-5 text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-base md:text-lg text-gray-600 font-sans italic leading-relaxed">
                "{TESTIMONIALS[current].quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center font-bold text-brand uppercase text-sm font-mono">
                  {TESTIMONIALS[current].name.substring(0, 2)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-950 text-sm font-display leading-tight">
                    {TESTIMONIALS[current].name}
                  </h4>
                  <span className="text-xs text-gray-400">
                    {TESTIMONIALS[current].source}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav Buttons */}
          <div className="flex justify-end gap-3 mt-8 relative z-10">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-xl border border-gray-100 hover:border-gray-200 text-gray-500 hover:text-brand hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <HiChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-xl border border-gray-100 hover:border-gray-200 text-gray-500 hover:text-brand hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <HiChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
