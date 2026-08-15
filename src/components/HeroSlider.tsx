import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

interface Slide {
  badge: string;
  heading: string;
  subtitle: string;
  ctaText1: string;
  ctaLink1: string;
  ctaText2: string;
  ctaLink2: string;
  bgSeed: string;
  bgGradient: string;
  storeImage: string;
  imageCaption: string;
}

const SLIDES: Slide[] = [
  {
    badge: "Warangal's #1 Service Hub",
    heading: "Fast Digital\nDocumentation\nServices",
    subtitle: "FSSAI, MSME, Passport, Trade Licence & more — all under one roof with fast turnaround.",
    ctaText1: "Explore Services",
    ctaLink1: "services",
    ctaText2: "Book Appointment",
    ctaLink2: "contact",
    bgSeed: "printing-hub",
    bgGradient: "from-[#eefbf7] via-white to-white",
    storeImage: "/store_image_1.jpeg",
    imageCaption: "Main Entrance Setup"
  },
  {
    badge: "Trusted & Government Certified",
    heading: "Government\nLicences\nMade Easy",
    subtitle: "We handle FSSAI registrations, Trade licences, and Labour certified filings with zero hassle.",
    ctaText1: "View Prices",
    ctaLink1: "services",
    ctaText2: "Order Now",
    ctaLink2: "services",
    bgSeed: "certificates",
    bgGradient: "from-[#f0f4ff] via-white to-white",
    storeImage: "/store_image_2.jpeg",
    imageCaption: "Full Office Overview"
  },
  {
    badge: "100% Secure Payments",
    heading: "Pay Safely\nwith Razorpay\n& UPI",
    subtitle: "Instant payment confirmations via Razorpay, UPI, GPay, PhonePe, and major Net Banking systems.",
    ctaText1: "Shop Now",
    ctaLink1: "services",
    ctaText2: "Contact Us",
    ctaLink2: "contact",
    bgSeed: "secure-payment",
    bgGradient: "from-[#fbf7ee] via-white to-white",
    storeImage: "/store_image_3.jpeg",
    imageCaption: "Our Workstations"
  }
];

interface HeroSliderProps {
  onNavigate: (tab: string) => void;
}

export default function HeroSlider({ onNavigate }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<number>(0);
  const [progress, setProgress] = useState(0);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setProgress(0);
    
    // Start interval for rotation and progress updates
    const intervalTime = 45; // ms
    const totalTime = 4500; // ms
    let elapsed = 0;
    
    timerRef.current = setInterval(() => {
      elapsed += intervalTime;
      const currentProgress = (elapsed / totalTime) * 100;
      setProgress(Math.min(currentProgress, 100));
      
      if (elapsed >= totalTime) {
        setDirection(1);
        setCurrent((prev) => (prev + 1) % SLIDES.length);
        elapsed = 0;
        setProgress(0);
      }
    }, intervalTime);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [current]);

  const handleNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? '100%' : '-100%',
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
      },
    }),
  };

  return (
    <div className="relative h-[85vh] min-h-[600px] w-full bg-white overflow-hidden border-b border-gray-100" id="hero-slider">
      {/* Progress Bar at Top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100 z-20">
        <div
          className="h-full bg-brand transition-all duration-75"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Main Slide Carousel */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className={`absolute inset-0 flex items-center bg-gradient-to-br ${SLIDES[current].bgGradient} px-6 md:px-12 lg:px-24`}
        >
          {/* Background Abstract Grid Layer */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none bg-[radial-gradient(#1D9E75_1px,transparent_1px)] [background-size:24px_24px] z-0" />

          {/* Real Photo of the Physical Service Center with Floating Animation */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:flex items-center justify-center select-none z-0 pr-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-[480px] h-[480px] bg-white border border-gray-150 rounded-[32px] p-3 flex flex-col justify-between overflow-hidden"
              style={{ boxShadow: '0 20px 50px rgba(0, 0, 0, 0.08)' }}
            >
              {/* Image viewport with Ken Burns panning effect */}
              <div className="relative w-full h-[390px] rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
                <motion.img
                  key={SLIDES[current].storeImage}
                  src={SLIDES[current].storeImage}
                  alt="EXTEND KART Store"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ scale: 1.15, opacity: 0 }}
                  animate={{ 
                    scale: [1.15, 1.03, 1.15],
                    opacity: 1
                  }}
                  transition={{
                    scale: {
                      duration: 20,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "mirror"
                    },
                    opacity: { duration: 0.5 }
                  }}
                />
                
                {/* Visual Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/10 to-transparent pointer-events-none" />
                
                {/* Live Indicator Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur text-[10px] font-bold text-gray-900 shadow-sm border border-gray-100 uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Physical Hub
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-brand text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                    {SLIDES[current].imageCaption}
                  </span>
                </div>

                {/* Info Text Overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-brand-400 font-bold">
                    Navayuga Colony, Warangal
                  </p>
                  <p className="text-sm font-bold font-display mt-0.5 leading-tight">
                    Deshaipet Road, Opposite Filter Bed
                  </p>
                </div>
              </div>

              {/* Card Footer with Contact details */}
              <div className="flex justify-between items-center px-3 py-2">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand animate-pulse" />
                  <span className="text-[11px] font-mono text-gray-500 font-semibold uppercase tracking-wider">
                    EXTEND KART
                  </span>
                </div>
                <span className="text-xs font-bold text-brand font-mono">
                  +91 9951119995
                </span>
              </div>
            </motion.div>
          </div>

          {/* Text Content */}
          <div className="max-w-xl md:max-w-2xl relative z-10 space-y-6 select-none">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/10 text-brand text-xs font-black uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-brand animate-ping" />
                {SLIDES[current].badge}
              </span>
            </motion.div>

            {/* Mobile/Tablet Store Image Card (ONLY shown on md/sm screen, hidden on lg desktop) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="block lg:hidden w-full max-w-md h-40 md:h-48 rounded-2xl overflow-hidden relative border border-gray-150 shadow-md bg-gray-50 group"
            >
              <img
                src={SLIDES[current].storeImage}
                alt="EXTEND KART Store View Mobile"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent" />
              <div className="absolute top-2.5 left-2.5 bg-brand text-white text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
                {SLIDES[current].imageCaption}
              </div>
              <div className="absolute bottom-2.5 left-2.5 text-white">
                <p className="text-[8px] font-mono uppercase tracking-wider text-emerald-400 font-bold">EXTEND KART Physical Hub</p>
                <p className="text-[11px] font-bold leading-tight mt-0.5">Deshaipet Road, Opposite Filter Bed, Warangal</p>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black font-display text-gray-950 leading-[1.1] whitespace-pre-line"
            >
              {SLIDES[current].heading}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-base md:text-lg text-gray-500 font-sans leading-relaxed"
            >
              {SLIDES[current].subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <button
                onClick={() => onNavigate(SLIDES[current].ctaLink1)}
                className="bg-brand text-white text-xs font-black uppercase tracking-wider py-4 px-8 rounded-2xl hover:bg-brand-dark transition-all shadow-glow hover:shadow-lg cursor-pointer"
              >
                {SLIDES[current].ctaText1}
              </button>
              <button
                onClick={() => onNavigate(SLIDES[current].ctaLink2)}
                className="bg-white text-gray-900 border border-gray-200 text-xs font-black uppercase tracking-wider py-4 px-8 rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all cursor-pointer"
              >
                {SLIDES[current].ctaText2}
              </button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Navigation Left/Right Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/70 backdrop-blur border border-gray-100 text-gray-600 hover:text-brand hover:bg-white shadow-soft transition-all cursor-pointer"
        id="slider-prev"
      >
        <HiChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/70 backdrop-blur border border-gray-100 text-gray-600 hover:text-brand hover:bg-white shadow-soft transition-all cursor-pointer"
        id="slider-next"
      >
        <HiChevronRight className="h-5 w-5" />
      </button>

      {/* Slide Indicator Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > current ? 1 : -1);
              setCurrent(idx);
            }}
            className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              idx === current ? 'w-8 bg-brand' : 'w-2.5 bg-gray-200 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
