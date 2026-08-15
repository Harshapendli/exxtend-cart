import React from 'react';
import { HiCreditCard, HiCheckBadge, HiBanknotes } from 'react-icons/hi2';

const METHODS = [
  { name: 'Razorpay', type: 'Gateway' },
  { name: 'UPI Auto-pay', type: 'UPI' },
  { name: 'Google Pay', type: 'Mobile' },
  { name: 'PhonePe', type: 'Mobile' },
  { name: 'Paytm', type: 'Mobile' },
  { name: 'Net Banking', type: 'Bank' },
  { name: 'Cards Accepted', type: 'Credit' },
  { name: 'Cash at Counter', type: 'Physical' },
];

export default function PaymentStrip() {
  return (
    <section className="py-12 bg-gray-50/50 border-y border-gray-100" id="payments">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-gray-400">
            Accepted Payment Channels
          </span>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-4">
          {METHODS.map((method, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-100 px-5 py-3 rounded-xl shadow-soft flex items-center gap-2 transition-all duration-300 hover:border-brand/20 select-none"
            >
              {method.type === 'Credit' ? (
                <HiCreditCard className="h-4 w-4 text-brand" />
              ) : method.type === 'Physical' ? (
                <HiBanknotes className="h-4 w-4 text-[#F3B200]" />
              ) : (
                <HiCheckBadge className="h-4 w-4 text-brand" />
              )}
              <span className="text-xs font-bold text-gray-900 font-display">
                {method.name}
              </span>
              <span className="text-[9px] font-mono font-bold tracking-wider uppercase text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">
                {method.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
