import React from 'react';
import {
  HiShieldCheck,
  HiBuildingOffice2,
  HiDocumentText,
  HiIdentification,
  HiGlobeAlt,
  HiTicket,
  HiCreditCard,
  HiFingerPrint,
  HiDocumentCheck,
  HiPrinter,
  HiCurrencyRupee,
  HiAcademicCap,
  HiPhoto,
  HiMap
} from 'react-icons/hi2';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  HiShieldCheck,
  HiBuildingOffice2,
  HiDocumentText,
  HiIdentification,
  HiGlobeAlt,
  HiTicket,
  HiCreditCard,
  HiFingerPrint,
  HiDocumentCheck,
  HiPrinter,
  HiCurrencyRupee,
  HiAcademicCap,
  HiPhoto,
  HiMap
};

interface IconRendererProps {
  name: string;
  className?: string;
}

export default function IconRenderer({ name, className = '' }: IconRendererProps) {
  const IconComponent = ICON_MAP[name] || HiDocumentText; // Fallback to HiDocumentText if not found
  return <IconComponent className={className} />;
}
