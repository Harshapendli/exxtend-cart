import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { HiStar, HiHeart, HiWrenchScrewdriver, HiClock } from 'react-icons/hi2';

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  decimals?: number;
}

function AnimatedCounter({ value, suffix, label, icon: Icon, decimals = 0 }: StatItemProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1500; // ms
    const increment = value / (duration / 16); // ~60fps
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -5 }}
      className="bg-white border border-gray-100 rounded-2xl p-6 shadow-soft hover:shadow-glow flex items-center gap-5 transition-all duration-300"
    >
      <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center text-brand">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <span className="text-3xl font-black font-display text-gray-950 block leading-none mb-1">
          {decimals ? count.toFixed(decimals) : Math.round(count)}
          <span className="text-brand ml-0.5">{suffix}</span>
        </span>
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          {label}
        </span>
      </div>
    </motion.div>
  );
}

export default function StatsStrip() {
  return (
    <section className="py-12 bg-gray-50/50 border-y border-gray-100" id="stats-strip">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatedCounter
            value={4.9}
            suffix=" ⭐"
            label="Google Rating"
            icon={HiStar}
            decimals={1}
          />
          <AnimatedCounter
            value={500}
            suffix="+"
            label="Happy Customers"
            icon={HiHeart}
          />
          <AnimatedCounter
            value={30}
            suffix="+"
            label="Our Services"
            icon={HiWrenchScrewdriver}
          />
          
          {/* Static Hours Counter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="bg-white border border-gray-100 rounded-2xl p-6 shadow-soft hover:shadow-glow flex items-center gap-5 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center text-brand">
              <HiClock className="h-6 w-6" />
            </div>
            <div>
              <span className="text-3xl font-black font-display text-gray-950 block leading-none mb-1">
                7:30<span className="text-brand text-lg font-bold ml-1">am</span>
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Opens Daily
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
