import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCartStore, useCartCount, useCartTotal } from '../lib/cart-store';
import { formatPrice } from '../lib/utils';
import { checkoutWithRazorpay } from '../lib/razorpay';
import { HiXMark, HiTrash, HiPlus, HiMinus, HiShoppingBag, HiCreditCard, HiCheckCircle, HiDocumentArrowUp } from 'react-icons/hi2';
import { toast } from 'react-hot-toast';
import { submitOrderWithDocuments } from '../lib/orders';

interface CartSheetProps {
  onSuccessRedirect: () => void;
}

export default function CartSheet({ onSuccessRedirect }: CartSheetProps) {
  const { items, isOpen, closeCart, updateQuantity, removeItem, clearCart } = useCartStore();
  const count = useCartCount();
  const total = useCartTotal();

  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'details' | 'documents' | 'simulating'>('cart');
  const [customer, setCustomer] = useState({ name: '', phone: '', email: '' });
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [simulationCountdown, setSimulationCountdown] = useState(3);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle slide back to cart on close or reset
  useEffect(() => {
    if (!isOpen) {
      setCheckoutStep('cart');
    }
  }, [isOpen]);

  const handleProceedToDocuments = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.name.trim() || !customer.phone.trim()) {
      toast.error('Please enter your name and phone number to continue.');
      return;
    }
    // Validate phone number (Indian: 10 digits, optionally with +91 prefix)
    const cleanPhone = customer.phone.replace(/[\s\-+]/g, '');
    const phoneRegex = /^(91)?[6-9]\d{9}$/;
    if (!phoneRegex.test(cleanPhone)) {
      toast.error('Please enter a valid 10-digit Indian phone number.');
      return;
    }
    // Sanitize name — strip any HTML tags
    const sanitizedName = customer.name.replace(/<[^>]*>/g, '').trim();
    setCustomer({ ...customer, name: sanitizedName });
    setCheckoutStep('documents');
  };

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const validFiles: File[] = [];

      for (const file of newFiles) {
        if (file.size > MAX_FILE_SIZE) {
          toast.error(`"${file.name}" exceeds 10MB limit.`);
          continue;
        }
        if (!ALLOWED_TYPES.includes(file.type)) {
          toast.error(`"${file.name}" is not a supported format. Use PDF, JPG, or PNG.`);
          continue;
        }
        validFiles.push(file);
      }

      if (validFiles.length > 0) {
        setFiles((prev) => [...prev, ...validFiles]);
      }
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCheckoutSubmit = async () => {
    setIsSubmitting(true);
    const serviceNames = items.map((i) => `${i.name} (x${i.quantity})`).join(', ');

    try {
      // 1. Try saving order to Supabase (non-blocking — don't let this kill payment)
      try {
        await submitOrderWithDocuments(customer, items, total, files);
      } catch (supabaseErr) {
        console.warn('Supabase order save failed (non-blocking):', supabaseErr);
        // Continue to payment — order details are also captured by Razorpay
      }

      // 2. Proceed with Razorpay payment
      const result = await checkoutWithRazorpay({
        amount: total,
        serviceNames,
        customerInfo: customer,
        onSuccess: (paymentId) => {
          setIsSubmitting(false);
          clearCart();
          closeCart();
          onSuccessRedirect();
        },
        onFailure: (err) => {
          setIsSubmitting(false);
        },
      });

      // Payment flow handled by Razorpay callbacks (onSuccess/onFailure)
      setIsSubmitting(false);
    } catch (err) {
      console.error('Checkout error:', err);
      toast.error('Payment could not be processed. Please try again.');
      setIsSubmitting(false);
    }
  };

  // Simulation countdown effect
  useEffect(() => {
    if (checkoutStep === 'simulating' && simulationCountdown > 0) {
      const timer = setTimeout(() => {
        setSimulationCountdown((c) => c - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (checkoutStep === 'simulating' && simulationCountdown === 0) {
      toast.success('Simulation Payment Approved! Generating Receipt...');
      clearCart();
      closeCart();
      setCheckoutStep('cart');
      setIsSubmitting(false);
      onSuccessRedirect();
    }
  }, [checkoutStep, simulationCountdown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black z-50 cursor-pointer"
            id="cart-overlay"
          />

          {/* Drawer Pane */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col justify-between overflow-hidden"
            id="cart-sheet"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <HiShoppingBag className="h-5 w-5 text-brand" />
                <h2 className="text-lg font-bold text-gray-950 font-display">
                  Your Cart
                </h2>
                <span className="bg-brand-50 text-brand text-xs font-bold px-2.5 py-1 rounded-full font-mono">
                  {count} {count === 1 ? 'item' : 'items'}
                </span>
              </div>
              <button
                onClick={closeCart}
                className="text-gray-400 hover:text-gray-900 p-1.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                id="close-cart-btn"
              >
                <HiXMark className="h-6 w-6" />
              </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                /* Empty State */
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-brand-50 flex items-center justify-center text-brand mb-4">
                    <HiShoppingBag className="h-8 w-8" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">
                    Your cart is empty
                  </h3>
                  <p className="text-sm text-gray-400 max-w-xs mb-6">
                    Looks like you haven't added any premium services to your cart yet.
                  </p>
                  <button
                    onClick={closeCart}
                    className="bg-brand text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-brand-dark transition-colors shadow-glow cursor-pointer"
                  >
                    Explore Services
                  </button>
                </div>
              ) : checkoutStep === 'cart' ? (
                /* Cart Items List */
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-4 p-4 border border-gray-50 rounded-2xl bg-gray-50/50"
                    >
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-gray-900 leading-snug">
                          {item.name}
                        </h4>
                        <span className="text-brand text-sm font-bold font-display block mt-1">
                          {formatPrice(item.price)}
                        </span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center bg-white border border-gray-100 rounded-xl p-1 shadow-soft">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-gray-400 hover:text-gray-900 rounded transition-colors cursor-pointer"
                        >
                          <HiMinus className="h-3.5 w-3.5" />
                        </button>
                        <span className="text-xs font-bold w-6 text-center font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-gray-400 hover:text-gray-900 rounded transition-colors cursor-pointer"
                        >
                          <HiPlus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50/50 transition-colors cursor-pointer"
                      >
                        <HiTrash className="h-4 w-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              ) : checkoutStep === 'details' ? (
                /* Customer Details Form */
                <motion.form
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onSubmit={handleProceedToDocuments}
                  className="space-y-5"
                >
                  <div className="bg-brand-50 p-4 rounded-2xl border border-brand/10 mb-4">
                    <h4 className="text-xs font-extrabold text-brand tracking-wider uppercase mb-1">
                      Billing Information
                    </h4>
                    <p className="text-xs text-brand-dark/80">
                      Enter your legal documentation info. FSSAI and other certifications will be registered with these details.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customer.name}
                      onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                      placeholder="e.g. Harsha Reddy"
                      className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand font-sans transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customer.phone}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                      placeholder="e.g. +91 9951119995"
                      className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand font-sans transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={customer.email}
                      onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                      placeholder="e.g. harsha@example.com"
                      className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand font-sans transition-all"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep('cart')}
                      className="flex-1 border border-gray-100 hover:bg-gray-50 text-gray-900 font-bold py-3 px-4 rounded-xl text-xs transition-colors cursor-pointer"
                    >
                      Back to Cart
                    </button>
                    <button
                      type="submit"
                      className="flex-2 bg-brand text-white font-bold py-3 px-4 rounded-xl text-xs transition-colors hover:bg-brand-dark shadow-glow flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Next: Documents</span>
                      <span className="font-mono">→</span>
                    </button>
                  </div>
                </motion.form>
              ) : checkoutStep === 'documents' ? (
                /* Documents Upload Form */
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-5"
                >
                  <div className="bg-brand-50 p-4 rounded-2xl border border-brand/10 mb-4">
                    <h4 className="text-xs font-extrabold text-brand tracking-wider uppercase mb-1">
                      Required Documents
                    </h4>
                    <p className="text-xs text-brand-dark/80">
                      Please upload necessary documents (Aadhaar, PAN, Photos) required for your selected services.
                    </p>
                  </div>

                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors">
                    <HiDocumentArrowUp className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <label className="cursor-pointer">
                      <span className="text-brand font-bold text-sm hover:underline">Click to upload</span>
                      <span className="text-gray-500 text-sm"> or drag and drop</span>
                      <input type="file" multiple className="hidden" onChange={handleFileChange} />
                    </label>
                    <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG up to 10MB</p>
                  </div>

                  {files.length > 0 && (
                    <div className="space-y-2">
                      <h5 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Attached Files:</h5>
                      {files.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-white border border-gray-100 p-2 rounded-lg text-sm">
                          <span className="truncate max-w-[200px]">{file.name}</span>
                          <button onClick={() => handleRemoveFile(idx)} className="text-red-500 hover:text-red-700 p-1">
                            <HiXMark className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep('details')}
                      className="flex-1 border border-gray-100 hover:bg-gray-50 text-gray-900 font-bold py-3 px-4 rounded-xl text-xs transition-colors cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleCheckoutSubmit}
                      disabled={isSubmitting}
                      className="flex-2 bg-brand text-white font-bold py-3 px-4 rounded-xl text-xs transition-colors hover:bg-brand-dark shadow-glow flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
                    >
                      <HiCreditCard className="h-4 w-4" />
                      <span>{isSubmitting ? 'Processing...' : 'Submit & Pay'}</span>
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* Simulating Payment Mode overlay */
                <div className="h-full flex flex-col items-center justify-center text-center p-6 bg-emerald-50/40 rounded-3xl border border-brand/10">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-20 h-20 rounded-full bg-brand/10 flex items-center justify-center text-brand mb-6"
                  >
                    <HiCheckCircle className="h-12 w-12" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-brand font-display mb-2">
                    Securing Payment
                  </h3>
                  <p className="text-sm text-brand-dark/80 max-w-xs mb-6">
                    We are simulating a secure Razorpay transaction callback from UPI/Card gateway...
                  </p>
                  
                  {/* Countdown graphic */}
                  <div className="relative w-16 h-16 flex items-center justify-center mb-4">
                    <svg className="w-full h-full rotate-[-90deg]">
                      <circle cx="32" cy="32" r="28" className="stroke-brand-50 stroke-[4] fill-none" />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        className="stroke-brand stroke-[4] fill-none transition-all duration-1000"
                        strokeDasharray={175}
                        strokeDashoffset={175 - (175 * (3 - simulationCountdown)) / 3}
                      />
                    </svg>
                    <span className="absolute text-xl font-black font-mono text-brand">
                      {simulationCountdown}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 font-mono">
                    Redirecting to Success portal
                  </span>
                </div>
              )}
            </div>

            {/* Footer containing Total and CTA */}
            {items.length > 0 && checkoutStep === 'cart' && (
              <div className="px-6 py-5 border-t border-gray-100 bg-white shadow-[0_-4px_24px_rgba(0,0,0,0.02)]">
                <div className="space-y-1.5 mb-5">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Subtotal</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>GST & Fees</span>
                    <span className="text-emerald-600 font-medium">Included / Free</span>
                  </div>
                  <div className="flex justify-between items-end pt-2 border-t border-gray-50">
                    <span className="text-base font-bold text-gray-900">Grand Total</span>
                    <span className="text-2xl font-black text-brand font-display">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={clearCart}
                    className="border border-gray-100 hover:bg-gray-50 text-gray-500 hover:text-red-500 font-bold py-3.5 rounded-xl text-xs transition-colors cursor-pointer"
                    title="Clear All"
                  >
                    Clear
                  </button>
                  <button
                    onClick={() => setCheckoutStep('details')}
                    className="col-span-2 bg-brand text-white font-bold py-3.5 px-4 rounded-xl text-xs transition-all hover:bg-brand-dark shadow-glow hover:shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Proceed to Pay</span>
                    <span className="font-mono">→</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
