import React from 'react';
import Logo from './Logo';
import { HiMapPin, HiPhone, HiEnvelope, HiClock, HiArrowRight } from 'react-icons/hi2';
import { FaWhatsapp } from 'react-icons/fa';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-white border-t border-gray-900" id="main-footer">
      {/* Upper Grid Area */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 space-y-5">
            {/* Dark themed logo wrapper */}
            <div className="p-2 rounded-xl bg-white/5 inline-block border border-white/10">
              <Logo size="md" showText={true} />
            </div>
            <p className="text-sm text-gray-400 font-sans leading-relaxed">
              EXTEND KART is Warangal's premier hub for professional digital printing, document drafting, state/central government licensing, and business registration support. We make registrations stress-free.
            </p>
            <div className="text-[#1D9E75] font-black text-sm uppercase tracking-wider font-display">
              "We Make It Done!!!"
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-gray-300 font-display">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              {[
                { id: 'home', label: 'Home Page' },
                { id: 'services', label: 'Services Directory' },
                { id: 'about', label: 'About Our Hub' },
                { id: 'contact', label: 'Get in Touch' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="hover:text-brand transition-colors flex items-center gap-1 group text-left cursor-pointer"
                  >
                    <HiArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-gray-300 font-display">
              Key Services
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              {[
                'FSSAI State Licence',
                'UDYAM / MSME Setup',
                'Trade Licence Filing',
                'Labour Certification',
                'Passport Application',
                'Digital Quality Printing',
              ].map((serv, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavigate('services')}
                    className="hover:text-brand transition-colors text-left cursor-pointer"
                  >
                    {serv}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact details */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-gray-300 font-display">
              Contact & Hours
            </h4>
            <ul className="space-y-3.5 text-sm text-gray-400">
              <li className="flex gap-2.5 items-start">
                <HiMapPin className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                <span className="leading-snug font-sans">
                  11-23-2394/1, Deshaipet-Enumamula Rd, Navayuga Colony, Warangal, TS 506002
                </span>
              </li>
              <li>
                <a href="tel:09951119995" className="flex gap-2.5 items-center hover:text-brand transition-colors">
                  <HiPhone className="h-4 w-4 text-brand" />
                  <span className="font-sans">099511 19995</span>
                </a>
              </li>
              <li>
                <a href="mailto:extendkart@gmail.com" className="flex gap-2.5 items-center hover:text-brand transition-colors">
                  <HiEnvelope className="h-4 w-4 text-brand" />
                  <span className="font-sans">extendkart@gmail.com</span>
                </a>
              </li>
              <li className="flex gap-2.5 items-center">
                <HiClock className="h-4 w-4 text-brand" />
                <span className="font-sans">Mon–Sat: 7:30am – 10pm</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar area */}
      <div className="border-t border-gray-900 bg-black/40">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 font-sans">
            © {currentYear} EXTEND KART – Digital Printing Hub. All Rights Reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="https://wa.me/919951119995"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-gray-400 hover:text-[#25D366] flex items-center gap-1.5 transition-colors"
            >
              <FaWhatsapp className="h-4 w-4" />
              <span>WhatsApp Agent</span>
            </a>
            <a
              href="tel:09951119995"
              className="text-xs font-bold text-gray-400 hover:text-brand flex items-center gap-1.5 transition-colors"
            >
              <HiPhone className="h-4 w-4" />
              <span>Call 099511 19995</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
