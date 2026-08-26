import React from 'react';

const TICKER_ITEMS = [
  '🛡️ FSSAI Licence',
  '🏢 MSME Registration',
  '🌍 Passport Services',
  '📄 PAN Card',
  '🗳️ Voter ID',
  '🏠 Sale Deed',
  '📋 Trade Licence',
  '🚗 Driving Licence',
  '💍 Marriage Certificate',
  '🖨️ PVC Cards',
  '🏗️ Labour Licence',
  '📱 E-Shram Card',
  '🔑 GPA Registration',
  '🎓 Scholarships',
  '🚂 Train Tickets',
  '✈️ Flight Bookings',
  '🏥 Insurance Services',
  '💰 PF Withdrawal',
  '🗺️ Bhu Bharati',
  '🎯 60+ Services',
];

export default function MarqueeTicker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS]; // Double for seamless loop

  return (
    <div className="relative overflow-hidden bg-gray-950 py-3 select-none" id="marquee-ticker">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-950 to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-950 to-transparent z-10" />

      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((item, idx) => (
          <span
            key={idx}
            className="mx-6 text-xs font-bold text-white/70 uppercase tracking-widest flex-shrink-0"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
