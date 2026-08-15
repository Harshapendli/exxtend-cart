import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Logo({ className = '', showText = true, size = 'md' }: LogoProps) {
  const dimensions = {
    sm: { svg: 'h-8 w-auto', text: 'text-sm font-bold tracking-tight' },
    md: { svg: 'h-10 w-auto', text: 'text-lg font-extrabold tracking-tight' },
    lg: { svg: 'h-16 w-auto', text: 'text-2xl font-black tracking-tight' },
    xl: { svg: 'h-24 w-auto', text: 'text-4xl font-black tracking-tight' },
  }[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <img src="/extend_cart_logo.jpeg" alt="Extend Kart Logo" className={dimensions.svg} />
      {showText && (
        <div className="flex flex-col leading-tight font-sans">
          <div className={`${dimensions.text} flex items-center`}>
            <span className="text-[#F3B200] font-bold">EXTEND</span>
            <span className="text-[#009EE2] font-black ml-1">KART</span>
          </div>
          <span className="text-[10px] uppercase tracking-[0.18em] text-[#1D9E75] font-semibold">
            Digital Printing Hub
          </span>
        </div>
      )}
    </div>
  );
}
