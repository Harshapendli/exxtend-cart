import { Service } from '../types';

export const SERVICES: Service[] = [
  // Licences
  {
    id: 'fssai-basic',
    name: 'FSSAI Basic Registration',
    price: 999,
    priceLabel: '₹999',
    iconName: 'HiShieldCheck',
    category: 'Licences',
    description: 'FSSAI Basic Registration for small food businesses with turnover up to ₹12 Lakhs. Fast, hassle-free process.',
    imageUrl: '/menu_fssai.jpeg'
  },
  {
    id: 'fssai-state',
    name: 'FSSAI State Licence',
    price: 8100,
    priceLabel: '₹8,100',
    iconName: 'HiShieldCheck',
    category: 'Licences',
    description: 'Complete FSSAI State Licence registration for medium food businesses with turnover ₹12 Lakhs – ₹20 Crore.',
    imageUrl: '/menu_state_fssai.jpeg'
  },
  {
    id: 'fssai-central',
    name: 'FSSAI Central Licence',
    price: 13500,
    priceLabel: '₹13,500',
    iconName: 'HiShieldCheck',
    category: 'Licences',
    description: 'FSSAI Central Licence registration for large businesses with turnover above ₹20 Crore or Import-Export operations.',
    imageUrl: '/menu_central_fssai.jpeg'
  },
  {
    id: 'fssai-pricing-consultation',
    name: 'FSSAI Licence Pricing',
    price: 999,
    priceLabel: '₹999',
    iconName: 'HiShieldCheck',
    category: 'Licences',
    description: 'Get fully-assisted expert FSSAI licence consultation. Transparent pricing, legal guarantee, and zero hidden fees.',
    imageUrl: '/menu_2.jpeg'
  },
  {
    id: 'udyam-msme',
    name: 'UDYAM / MSME Registration',
    price: 300,
    priceLabel: '₹300',
    iconName: 'HiBuildingOffice2',
    category: 'Licences',
    description: 'Quick UDYAM/MSME registration for micro, small & medium enterprises. Get certified in 24 hours.'
  },
  {
    id: 'trade-licence',
    name: 'Trade Licence',
    price: 2000,
    priceLabel: '₹2,000',
    iconName: 'HiDocumentText',
    category: 'Licences',
    description: 'Apply for a Trade Licence for your business. Complete documentation support with fast approval.'
  },
  {
    id: 'labour-licence',
    name: 'Labour Licence',
    price: 2000,
    priceLabel: '₹2,000',
    iconName: 'HiIdentification',
    category: 'Licences',
    description: 'Labour Licence application processing with all required documentation. Government-compliant filings.'
  },
  {
    id: 'driving-licence',
    name: 'Driving Licence',
    price: 6500,
    priceLabel: '₹6,500',
    iconName: 'HiIdentification',
    category: 'Licences',
    description: 'Complete assistance for New Driving Licence & Renewals.'
  },

  // Documents
  {
    id: 'pan-card',
    name: 'Pan Card (New / Correction)',
    price: 300,
    priceLabel: '₹300',
    iconName: 'HiCreditCard',
    category: 'Documents',
    description: 'New PAN card application or correction in existing PAN details. Quick processing and delivery.'
  },
  {
    id: 'voter-id',
    name: 'Voter ID',
    price: 200,
    priceLabel: '₹200',
    iconName: 'HiIdentification',
    category: 'Documents',
    description: 'New Voter ID application and corrections.'
  },
  {
    id: 'aadhar-update',
    name: 'E-Aadhaar / Corrections',
    price: 250,
    priceLabel: '₹250',
    iconName: 'HiFingerPrint',
    category: 'Documents',
    description: 'Update your Aadhaar card — name, address, mobile number, or photo correction. Assisted online update.'
  },
  {
    id: 'e-shram-card',
    name: 'E-Shram Card',
    price: 300,
    priceLabel: '₹300',
    iconName: 'HiDocumentCheck',
    category: 'Documents',
    description: 'E-Shram card registration and printout.'
  },
  {
    id: 'railway-divyang',
    name: 'Railway Divyangjan Card',
    price: 599,
    priceLabel: '₹599',
    iconName: 'HiTicket',
    category: 'Documents',
    description: 'Railway concession card for persons with disabilities. Complete assistance with application & documentation.'
  },
  {
    id: 'marriage-certificate',
    name: 'Marriage Certificate',
    price: 4500,
    priceLabel: '₹4,500',
    iconName: 'HiDocumentText',
    category: 'Documents',
    description: 'Marriage certificate registration and processing.'
  },

  // Online Services
  {
    id: 'passport-normal',
    name: 'Passport Normal',
    price: 3000,
    priceLabel: '₹3,000',
    iconName: 'HiGlobeAlt',
    category: 'Online Services',
    description: 'End-to-end normal passport application assistance — new passport or renewal.'
  },
  {
    id: 'passport-tatkaal',
    name: 'Passport Tatkaal',
    price: 5500,
    priceLabel: '₹5,500',
    iconName: 'HiGlobeAlt',
    category: 'Online Services',
    description: 'Tatkaal passport application assistance for urgent needs.'
  },
  {
    id: 'train-tickets',
    name: 'Train Tickets',
    price: 100,
    priceLabel: '₹100',
    iconName: 'HiTicket',
    category: 'Online Services',
    description: 'IRCTC Train ticket booking assistance.'
  },
  {
    id: 'flight-bookings',
    name: 'Flight Bookings',
    price: 500,
    priceLabel: '₹500',
    iconName: 'HiTicket',
    category: 'Online Services',
    description: 'Domestic and international flight ticket booking assistance.'
  },
  {
    id: 'insurance-services',
    name: 'Insurance Services',
    price: 299,
    priceLabel: '₹299',
    iconName: 'HiShieldCheck',
    category: 'Online Services',
    description: 'Assistance with life, health, and vehicle insurance policies.'
  },
  {
    id: 'loan-services',
    name: 'Loan Services',
    price: 499,
    priceLabel: '₹499',
    iconName: 'HiCurrencyRupee',
    category: 'Online Services',
    description: 'Personal, business, and home loan application assistance.'
  },
  {
    id: 'pf-withdrawal',
    name: 'PF Withdrawal',
    price: 500,
    priceLabel: '₹500',
    iconName: 'HiCurrencyRupee',
    category: 'Online Services',
    description: 'Provident Fund (PF) claim and withdrawal assistance.'
  },
  {
    id: 'pmegp',
    name: 'PMEGP',
    price: 6999,
    priceLabel: '₹6,999',
    iconName: 'HiBuildingOffice2',
    category: 'Online Services',
    description: 'Prime Minister Employment Generation Programme (PMEGP) loan application assistance.'
  },
  {
    id: 'kalyana-lakshmi',
    name: 'Kalyana Lakshmi',
    price: 500,
    priceLabel: '₹500',
    iconName: 'HiDocumentCheck',
    category: 'Online Services',
    description: 'Kalyana Lakshmi scheme application assistance.'
  },
  {
    id: 'ttd-seva-bookings',
    name: 'TTD Seva Bookings',
    price: 150,
    priceLabel: '₹150',
    iconName: 'HiTicket',
    category: 'Online Services',
    description: 'Tirumala Tirupati Devasthanams (TTD) Seva and Darshan bookings.'
  },
  {
    id: 'scholarship-services',
    name: 'Scholarship Services',
    price: 200,
    priceLabel: '₹200',
    iconName: 'HiAcademicCap',
    category: 'Online Services',
    description: 'Assistance with state and national scholarship applications.'
  },

  // Printing
  {
    id: 'pvc-cards',
    name: 'PVC Cards',
    price: 100,
    priceLabel: '₹100',
    iconName: 'HiCreditCard',
    category: 'Printing',
    description: 'High-quality PVC card printing for ID cards, Aadhaar, PAN, etc.'
  },
  {
    id: 'photo-frames',
    name: 'Photo Frames',
    price: 0,
    priceLabel: 'Custom',
    iconName: 'HiPhoto',
    category: 'Printing',
    description: 'Custom photo frames in various sizes and designs.'
  },
  {
    id: 't-shirts-printing',
    name: 'T-Shirts Printing',
    price: 0,
    priceLabel: 'Custom',
    iconName: 'HiPrinter',
    category: 'Printing',
    description: 'Custom T-shirt printing with your designs, logos, or photos.'
  },

  // Registration Services
  {
    id: 'sale-deed',
    name: 'Sale Deed',
    price: 0,
    priceLabel: 'Custom',
    iconName: 'HiDocumentText',
    category: 'Registration Services',
    description: 'Property Sale Deed registration services.'
  },
  {
    id: 'gift-deed',
    name: 'Gift Deed',
    price: 0,
    priceLabel: 'Custom',
    iconName: 'HiDocumentText',
    category: 'Registration Services',
    description: 'Property Gift Deed registration services.'
  },
  {
    id: 'partition-deed',
    name: 'Partition Deed',
    price: 0,
    priceLabel: 'Custom',
    iconName: 'HiDocumentText',
    category: 'Registration Services',
    description: 'Property Partition Deed registration services.'
  },
  {
    id: 'mortgage',
    name: 'Mortgage',
    price: 0,
    priceLabel: 'Custom',
    iconName: 'HiDocumentText',
    category: 'Registration Services',
    description: 'Property Mortgage registration services.'
  },

  // Bhu Bharati Services
  {
    id: 'ror-1b',
    name: 'ROR / 1B Correction',
    price: 0,
    priceLabel: 'Custom',
    iconName: 'HiMap',
    category: 'Bhu Bharati Services',
    description: 'ROR / 1B and Pattadar name correction services on Bhu Bharati Portal.'
  },
  {
    id: 'land-slots',
    name: 'Agriculture Land Slots Booking',
    price: 0,
    priceLabel: 'Custom',
    iconName: 'HiMap',
    category: 'Bhu Bharati Services',
    description: 'Agriculture Land Slots Booking on Bhu Bharati Portal.'
  }
];

export const CATEGORIES = [
  'All', 
  'Licences', 
  'Documents', 
  'Online Services', 
  'Registration Services', 
  'Bhu Bharati Services', 
  'Printing'
] as const;

export const TESTIMONIALS = [
  {
    id: 't1',
    name: 'Rajesh Kumar',
    quote: 'Got my FSSAI licence done in just 3 days! The team at EXTEND KART is incredibly professional and efficient. Highly recommended for any documentation work in Warangal.',
    rating: 5,
    source: 'Google Review'
  },
  {
    id: 't2',
    name: 'Priya Sharma',
    quote: 'Best service center in Warangal! Got my MSME registration for just ₹300. The staff is very helpful and guided me through the entire process. Will definitely come back.',
    rating: 5,
    source: 'Google Review'
  },
  {
    id: 't3',
    name: 'Mohammed Irfan',
    quote: 'Passport assistance was smooth and hassle-free. They handle everything from documentation to appointment booking. Very reasonable prices and excellent customer service.',
    rating: 5,
    source: 'Google Review'
  },
  {
    id: 't4',
    name: 'Suresh Reddy',
    quote: 'I needed a Trade Licence urgently for my new restaurant. EXTEND KART processed it within 2 days. Their knowledge of government processes saved me so much time and stress.',
    rating: 5,
    source: 'Google Review'
  },
  {
    id: 't5',
    name: 'Lakshmi Devi',
    quote: 'Got PVC cards and photo frames printed here — the quality is outstanding! Also got my Aadhaar updated on the same visit. One-stop shop for everything. Very convenient location.',
    rating: 5,
    source: 'Google Review'
  },
  {
    id: 't6',
    name: 'Venkat Rao',
    quote: 'Excellent service for my Labour Licence application. They took care of all the paperwork and followed up until it was approved. Truly professional team. Highly recommend!',
    rating: 5,
    source: 'Google Review'
  }
];
