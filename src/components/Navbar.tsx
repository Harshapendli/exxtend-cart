import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { useCartStore, useCartCount } from '../lib/cart-store';
import Logo from './Logo';
import { HiShoppingCart, HiBars3, HiXMark } from 'react-icons/hi2';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export default function Navbar({ currentTab, setCurrentTab }: NavbarProps) {
  const { openCart } = useCartStore();
  const cartCount = useCartCount();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  // Scroll to Hide Navbar logic
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true); // scrolling down
    } else {
      setHidden(false); // scrolling up
    }
  });

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: '-100%' },
        }}
        animate={hidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-soft"
        id="main-navbar"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => {
              setCurrentTab('home');
              setMobileMenuOpen(false);
            }}
            className="flex items-center text-left focus:outline-none cursor-pointer"
          >
            <Logo size="md" />
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setCurrentTab(link.id)}
                  className={`relative px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer ${
                    isActive ? 'text-brand' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-line"
                      className="absolute bottom-1.5 left-5 right-5 h-[2px] bg-brand"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Side Buttons: Cart & Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Shopping Cart Trigger */}
            <button
              onClick={openCart}
              className="relative p-3 rounded-xl bg-gray-50 border border-gray-100 text-gray-700 hover:text-brand hover:bg-brand-50 transition-all cursor-pointer group"
              id="navbar-cart-trigger"
            >
              <HiShoppingCart className="h-5 w-5" />
              
              {/* Reactive Badge with POP Animation */}
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                    className="absolute -top-1.5 -right-1.5 bg-[#1D9E75] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-soft"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-3 rounded-xl bg-gray-50 border border-gray-100 text-gray-700 hover:text-brand transition-colors cursor-pointer"
              id="mobile-nav-toggle"
            >
              {mobileMenuOpen ? (
                <HiXMark className="h-5 w-5" />
              ) : (
                <HiBars3 className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white border-t border-gray-50 overflow-hidden"
              id="mobile-menu-drawer"
            >
              <div className="px-6 py-4 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => {
                      setCurrentTab(link.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left py-3.5 px-4 text-sm font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer ${
                      currentTab === link.id
                        ? 'bg-brand-50 text-brand'
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      
      {/* Navbar Spacing Spacer */}
      <div className="h-20" />
    </>
  );
}
