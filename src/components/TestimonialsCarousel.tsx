import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIALS } from '../lib/services-data';
import { HiStar, HiChevronLeft, HiChevronRight, HiMiniChatBubbleLeftRight } from 'react-icons/hi2';
import { WordReveal } from './AnimatedText';

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

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
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 350, damping: 30 },
        opacity: { duration: 0.35 },
        scale: { duration: 0.35 },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 80 : -80,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: 'spring', stiffness: 350, damping: 30 },
        opacity: { duration: 0.35 },
        scale: { duration: 0.35 },
      },
    }),
  };

  return (
    <section className="py-24 bg-gray-50/50 border-t border-b border-gray-100 relative overflow-hidden" id="testimonials">
      {/* Decorative */}
      <div className="absolute -left-20 top-20 w-60 h-60 bg-amber-500/5 rounded-full blur-[80px]" />
      <div className="absolute -right-20 bottom-20 w-60 h-60 bg-brand/5 rounded-full blur-[80px]" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="section-label inline-block"
          >
            Testimonials
          </motion.span>
          <WordReveal
            text="What Our Customers Say"
            className="text-3xl font-black font-display text-gray-950"
            tag="h2"
          />
        </div>

        {/* Testimonial Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-soft min-h-[250px] flex flex-col justify-between overflow-hidden"
        >
          {/* Quote Graphic Icon */}
          <div className="absolute right-8 top-8 opacity-[0.04] text-brand">
            <HiMiniChatBubbleLeftRight className="h-32 w-32" />
          </div>

          {/* Progress dots */}
          <div className="absolute top-6 left-8 flex gap-1.5">
            {TESTIMONIALS.map((_, idx) => (
              <motion.div
                key={idx}
                className={`h-1 rounded-full transition-all duration-300 ${
                  idx === current ? 'w-6 bg-brand' : 'w-1.5 bg-gray-200'
                }`}
                layout
              />
            ))}
          </div>

          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="space-y-6 select-none relative z-10 pt-4"
            >
              {/* Star Rating with stagger */}
              <div className="flex gap-1">
                {Array.from({ length: TESTIMONIALS[current].rating }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0, rotate: -30 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: i * 0.08, type: 'spring', stiffness: 400 }}
                  >
                    <HiStar className="h-5 w-5 text-amber-400 fill-amber-400" />
                  </motion.div>
                ))}
              </div>

              {/* Quote text */}
              <p className="text-base md:text-lg text-gray-600 font-sans italic leading-relaxed">
                "{TESTIMONIALS[current].quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, delay: 0.2 }}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-brand to-brand-light flex items-center justify-center font-bold text-white uppercase text-sm font-mono shadow-md"
                >
                  {TESTIMONIALS[current].name.substring(0, 2)}
                </motion.div>
                <div>
                  <h4 className="font-bold text-gray-950 text-sm font-display leading-tight">
                    {TESTIMONIALS[current].name}
                  </h4>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    {TESTIMONIALS[current].source}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav Buttons */}
          <div className="flex justify-end gap-3 mt-8 relative z-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrev}
              className="p-3 rounded-xl border border-gray-100 hover:border-brand/30 text-gray-500 hover:text-brand hover:bg-brand-50 transition-all cursor-pointer"
            >
              <HiChevronLeft className="h-5 w-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="p-3 rounded-xl border border-gray-100 hover:border-brand/30 text-gray-500 hover:text-brand hover:bg-brand-50 transition-all cursor-pointer"
            >
              <HiChevronRight className="h-5 w-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
