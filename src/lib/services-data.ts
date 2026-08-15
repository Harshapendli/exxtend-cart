import { Service } from '../types';

export const SERVICES: Service[] = [
  // ═══════════════════════════════════════════
  // LICENCES
  // ═══════════════════════════════════════════
  {
    id: 'fssai-basic',
    name: 'FSSAI Basic Registration',
    price: 999,
    priceLabel: '₹999',
    iconName: 'HiShieldCheck',
    category: 'Licences',
    description: 'FSSAI Basic Registration for small food businesses with turnover up to ₹12 Lakhs. Fast, hassle-free process with legal compliance guarantee.',
    imageUrl: '/menu_fssai.jpeg'
  },
  {
    id: 'fssai-state',
    name: 'FSSAI State Licence',
    price: 8100,
    priceLabel: '₹8,100',
    iconName: 'HiShieldCheck',
    category: 'Licences',
    description: 'Complete FSSAI State Licence registration for medium food businesses with turnover ₹12 Lakhs – ₹20 Crore. End-to-end documentation support.',
    imageUrl: '/menu_state_fssai.jpeg'
  },
  {
    id: 'fssai-central',
    name: 'FSSAI Central Licence',
    price: 13500,
    priceLabel: '₹13,500',
    iconName: 'HiShieldCheck',
    category: 'Licences',
    description: 'FSSAI Central Licence for large businesses with turnover above ₹20 Crore or Import-Export operations. Full compliance assistance.',
    imageUrl: '/menu_central_fssai.jpeg'
  },
  {
    id: 'fssai-pricing-consultation',
    name: 'FSSAI Licence Pricing',
    price: 999,
    priceLabel: '₹999',
    iconName: 'HiShieldCheck',
    category: 'Licences',
    description: 'Expert FSSAI licence consultation with transparent pricing, legal guarantee, and zero hidden fees. Get the right licence for your business.',
    imageUrl: '/menu_2.jpeg'
  },
  {
    id: 'udyam-msme',
    name: 'UDYAM / MSME Registration',
    price: 300,
    priceLabel: '₹300',
    iconName: 'HiBuildingOffice2',
    category: 'Licences',
    description: 'Quick UDYAM/MSME registration for micro, small & medium enterprises. Get government certified in 24 hours.'
  },
  {
    id: 'trade-licence',
    name: 'Trade Licence',
    price: 2000,
    priceLabel: '₹2,000',
    iconName: 'HiDocumentText',
    category: 'Licences',
    description: 'Apply for a Trade Licence for your business. Complete documentation support with fast government approval.'
  },
  {
    id: 'labour-licence',
    name: 'Labour Licence',
    price: 2000,
    priceLabel: '₹2,000',
    iconName: 'HiIdentification',
    category: 'Licences',
    description: 'Labour Licence application processing with all required documentation. 100% government-compliant filings.'
  },
  {
    id: 'driving-licence',
    name: 'Driving Licence',
    price: 6500,
    priceLabel: '₹6,500',
    iconName: 'HiIdentification',
    category: 'Licences',
    description: 'Complete assistance for New Driving Licence applications & Renewals. Slot booking, documentation, and RTO coordination.'
  },

  // ═══════════════════════════════════════════
  // DOCUMENTS
  // ═══════════════════════════════════════════
  {
    id: 'pan-card',
    name: 'PAN Card (New / Correction)',
    price: 300,
    priceLabel: '₹300',
    iconName: 'HiCreditCard',
    category: 'Documents',
    description: 'New PAN card application or correction in existing PAN details. Quick processing and doorstep delivery support.'
  },
  {
    id: 'voter-id',
    name: 'Voter ID',
    price: 200,
    priceLabel: '₹200',
    iconName: 'HiIdentification',
    category: 'Documents',
    description: 'New Voter ID application, corrections, and address change assistance. Complete online filing support.'
  },
  {
    id: 'aadhar-update',
    name: 'E-Aadhaar / Corrections',
    price: 250,
    priceLabel: '₹250',
    iconName: 'HiFingerPrint',
    category: 'Documents',
    description: 'Update your Aadhaar card — name, address, mobile number, date of birth, or photo correction. Assisted online update.'
  },
  {
    id: 'e-shram-card',
    name: 'E-Shram Card',
    price: 300,
    priceLabel: '₹300',
    iconName: 'HiDocumentCheck',
    category: 'Documents',
    description: 'E-Shram card registration and printout for unorganized sector workers. Quick online registration.'
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
    iconName: 'HiHeart',
    category: 'Documents',
    description: 'Marriage certificate registration and processing. Complete documentation, affidavit support, and follow-up.'
  },
  {
    id: 'ration-card',
    name: 'Ration Card',
    price: 0,
    priceLabel: 'Custom',
    iconName: 'HiClipboardDocumentList',
    category: 'Documents',
    description: 'New Ration Card application, name addition/deletion, and address corrections. Full assistance with online process.'
  },

  // ═══════════════════════════════════════════
  // ONLINE SERVICES
  // ═══════════════════════════════════════════
  {
    id: 'passport-normal',
    name: 'Passport Normal',
    price: 3000,
    priceLabel: '₹3,000',
    iconName: 'HiGlobeAlt',
    category: 'Online Services',
    description: 'End-to-end normal passport application assistance — new passport or renewal. Documentation, slot booking & police verification guidance.'
  },
  {
    id: 'passport-tatkaal',
    name: 'Passport Tatkaal',
    price: 5500,
    priceLabel: '₹5,500',
    iconName: 'HiGlobeAlt',
    category: 'Online Services',
    description: 'Tatkaal (urgent) passport application assistance. Priority processing for time-sensitive travel needs.'
  },
  {
    id: 'us-visa-appointment',
    name: 'US Visa Appointment',
    price: 0,
    priceLabel: 'Custom',
    iconName: 'HiPaperAirplane',
    category: 'Online Services',
    description: 'US Visa appointment slot booking assistance. DS-160 form filling, interview preparation guidance, and documentation support.'
  },
  {
    id: 'train-tickets',
    name: 'Train Tickets',
    price: 100,
    priceLabel: '₹100',
    iconName: 'HiTicket',
    category: 'Online Services',
    description: 'IRCTC Train ticket booking assistance — Tatkal, general, and premium bookings. Confirmation guaranteed support.'
  },
  {
    id: 'flight-bookings',
    name: 'Flight Bookings',
    price: 500,
    priceLabel: '₹500',
    iconName: 'HiPaperAirplane',
    category: 'Online Services',
    description: 'Domestic and international flight ticket booking assistance. Best fare search and cancellation/rescheduling help.'
  },
  {
    id: 'insurance-services',
    name: 'Insurance Services',
    price: 299,
    priceLabel: '₹299',
    iconName: 'HiShieldCheck',
    category: 'Online Services',
    description: 'Life, health, and vehicle insurance policy assistance. New policy registration, renewals, and claim support.'
  },
  {
    id: 'loan-services',
    name: 'Loan Services',
    price: 499,
    priceLabel: '₹499',
    iconName: 'HiBanknotes',
    category: 'Online Services',
    description: 'Personal, business, home, and vehicle loan application assistance. Documentation and bank coordination support.'
  },
  {
    id: 'pf-withdrawal',
    name: 'PF Withdrawal',
    price: 500,
    priceLabel: '₹500',
    iconName: 'HiCurrencyRupee',
    category: 'Online Services',
    description: 'Provident Fund (PF) claim and withdrawal assistance. UAN activation, KYC update, and online claim filing.'
  },
  {
    id: 'pmegp',
    name: 'PMEGP',
    price: 6999,
    priceLabel: '₹6,999',
    iconName: 'HiBuildingOffice2',
    category: 'Online Services',
    description: 'Prime Minister Employment Generation Programme (PMEGP) loan application. Project report preparation and bank linkage.'
  },
  {
    id: 'kalyana-lakshmi',
    name: 'Kalyana Lakshmi',
    price: 500,
    priceLabel: '₹500',
    iconName: 'HiDocumentCheck',
    category: 'Online Services',
    description: 'Kalyana Lakshmi / Shaadi Mubarak scheme application assistance. Complete documentation and follow-up support.'
  },
  {
    id: 'ttd-seva-bookings',
    name: 'TTD Seva Bookings',
    price: 150,
    priceLabel: '₹150',
    iconName: 'HiStar',
    category: 'Online Services',
    description: 'Tirumala Tirupati Devasthanams (TTD) Seva, Darshan, and accommodation bookings. Quick slot confirmation.'
  },
  {
    id: 'scholarship-services',
    name: 'Scholarship Services',
    price: 200,
    priceLabel: '₹200',
    iconName: 'HiAcademicCap',
    category: 'Online Services',
    description: 'State and national scholarship application assistance — Pre-Matric, Post-Matric, and merit-based scholarships.'
  },
  {
    id: 'online-applications',
    name: 'Online Applications',
    price: 0,
    priceLabel: 'Custom',
    iconName: 'HiComputerDesktop',
    category: 'Online Services',
    description: 'General online form filling and application submission for any government or private portal. Job applications, exam registrations, and more.'
  },

  // ═══════════════════════════════════════════
  // PRINTING
  // ═══════════════════════════════════════════
  {
    id: 'pvc-cards',
    name: 'PVC Cards',
    price: 100,
    priceLabel: '₹100',
    iconName: 'HiCreditCard',
    category: 'Printing',
    description: 'High-quality PVC card printing — ID cards, Aadhaar, PAN, business cards, and employee ID cards.'
  },
  {
    id: 'photo-frames',
    name: 'Photo Frames',
    price: 0,
    priceLabel: 'Custom',
    iconName: 'HiPhoto',
    category: 'Printing',
    description: 'Custom photo frames in various sizes — wall frames, desk frames, collage frames. Premium finish printing.'
  },
  {
    id: 't-shirts-printing',
    name: 'T-Shirts Printing',
    price: 0,
    priceLabel: 'Custom',
    iconName: 'HiPrinter',
    category: 'Printing',
    description: 'Custom T-shirt printing with your designs, logos, or photos. Bulk orders available for events and businesses.'
  },
  {
    id: 'fridge-magnets',
    name: 'Fridge Magnets',
    price: 0,
    priceLabel: 'Custom',
    iconName: 'HiRectangleGroup',
    category: 'Printing',
    description: 'Custom fridge magnets with your photos, logos, or designs. Perfect for gifts, souvenirs, and branding.'
  },
  {
    id: 'dvd-pendrive-transfer',
    name: 'DVD → Pen Drive Transfer',
    price: 0,
    priceLabel: 'Custom',
    iconName: 'HiFilm',
    category: 'Printing',
    description: 'Transfer data from DVDs, CDs to Pen Drive or digital format. Photo, video, and document conversions available.'
  },

  // ═══════════════════════════════════════════
  // REGISTRATION SERVICES
  // ═══════════════════════════════════════════
  {
    id: 'sale-deed',
    name: 'Sale Deed',
    price: 0,
    priceLabel: 'Custom',
    iconName: 'HiDocumentText',
    category: 'Registration Services',
    description: 'Property Sale Deed drafting and registration. Complete stamp duty calculation, documentation, and SRO coordination.'
  },
  {
    id: 'gift-deed',
    name: 'Gift Deed',
    price: 0,
    priceLabel: 'Custom',
    iconName: 'HiDocumentText',
    category: 'Registration Services',
    description: 'Property Gift Deed registration services. Legal drafting, valuation assistance, and sub-registrar office filing.'
  },
  {
    id: 'partition-deed',
    name: 'Partition Deed',
    price: 0,
    priceLabel: 'Custom',
    iconName: 'HiDocumentText',
    category: 'Registration Services',
    description: 'Property Partition Deed registration for joint property division. Legal documentation and family settlement support.'
  },
  {
    id: 'family-release',
    name: 'Family Release',
    price: 0,
    priceLabel: 'Custom',
    iconName: 'HiUserGroup',
    category: 'Registration Services',
    description: 'Family Release Deed registration — release of rights by family members on property. Full legal drafting and SRO filing.'
  },
  {
    id: 'mortgage',
    name: 'Mortgage',
    price: 0,
    priceLabel: 'Custom',
    iconName: 'HiHome',
    category: 'Registration Services',
    description: 'Property Mortgage registration services. Documentation for bank mortgage, equitable mortgage, and mortgage release.'
  },
  {
    id: 'bank-release',
    name: 'Bank Release',
    price: 0,
    priceLabel: 'Custom',
    iconName: 'HiBanknotes',
    category: 'Registration Services',
    description: 'Bank Release / Mortgage Release deed registration. Complete assistance with NOC from bank and SRO filing.'
  },
  {
    id: 'da-cum-gpa',
    name: 'DA cum GPA',
    price: 0,
    priceLabel: 'Custom',
    iconName: 'HiScale',
    category: 'Registration Services',
    description: 'Development Agreement cum General Power of Attorney registration. Builder-landowner agreement documentation and filing.'
  },
  {
    id: 'gpa',
    name: 'GPA (General Power of Attorney)',
    price: 0,
    priceLabel: 'Custom',
    iconName: 'HiKey',
    category: 'Registration Services',
    description: 'General Power of Attorney drafting and registration. Authorized representation for property and legal matters.'
  },
  {
    id: 'agreement-of-sale',
    name: 'Agreement of Sale',
    price: 0,
    priceLabel: 'Custom',
    iconName: 'HiClipboardDocumentCheck',
    category: 'Registration Services',
    description: 'Agreement of Sale (AOS) drafting and registration. Pre-sale legal documentation with terms, conditions, and advance receipt.'
  },
  {
    id: 'lease-rental-agreement',
    name: 'Lease / Rental Agreement',
    price: 0,
    priceLabel: 'Custom',
    iconName: 'HiDocumentText',
    category: 'Registration Services',
    description: 'Lease and Rental Agreement drafting, notarization, and registration. Residential and commercial property agreements.'
  },
  {
    id: 'single-search',
    name: 'Single Search',
    price: 0,
    priceLabel: 'Custom',
    iconName: 'HiMagnifyingGlass',
    category: 'Registration Services',
    description: 'Single Search report from Sub-Registrar Office. Verify property ownership history and transaction records.'
  },
  {
    id: 'certified-copy',
    name: 'Certified Copy (CC)',
    price: 0,
    priceLabel: 'Custom',
    iconName: 'HiDocumentCheck',
    category: 'Registration Services',
    description: 'Obtain Certified Copies (CC) of registered documents from the Sub-Registrar Office. Quick application and collection.'
  },
  {
    id: 'market-value',
    name: 'Market Value',
    price: 0,
    priceLabel: 'Custom',
    iconName: 'HiCurrencyRupee',
    category: 'Registration Services',
    description: 'Government Market Value / Guideline Value enquiry for properties. Calculate stamp duty and registration charges.'
  },
  {
    id: 'encumbrance-certificate',
    name: 'Encumbrance Certificate (EC)',
    price: 0,
    priceLabel: 'Custom',
    iconName: 'HiMagnifyingGlass',
    category: 'Registration Services',
    description: 'Encumbrance Certificate (EC) application and procurement. Verify property is free from legal dues and mortgages.'
  },
  {
    id: 'society-firm-registration',
    name: 'Society / Firm Registration',
    price: 0,
    priceLabel: 'Custom',
    iconName: 'HiBuildingOffice2',
    category: 'Registration Services',
    description: 'Society and Partnership Firm registration. MOA/AOA drafting, bylaws preparation, and Registrar of Firms filing.'
  },

  // ═══════════════════════════════════════════
  // BHU BHARATI SERVICES
  // ═══════════════════════════════════════════
  {
    id: 'ror-1b',
    name: 'ROR / 1B Correction',
    price: 0,
    priceLabel: 'Custom',
    iconName: 'HiMap',
    category: 'Bhu Bharati Services',
    description: 'ROR / 1B record correction services on Bhu Bharati Portal. Name, extent, and survey number corrections.'
  },
  {
    id: 'land-slots',
    name: 'Agriculture Land Slots Booking',
    price: 0,
    priceLabel: 'Custom',
    iconName: 'HiMap',
    category: 'Bhu Bharati Services',
    description: 'Agriculture Land Slots Booking on Bhu Bharati Portal. Online slot reservation for land registration appointments.'
  },
  {
    id: 'pattadar-name-correction',
    name: 'Pattadar Name Correction',
    price: 0,
    priceLabel: 'Custom',
    iconName: 'HiClipboardDocumentList',
    category: 'Bhu Bharati Services',
    description: 'Pattadar Passbook name correction on Bhu Bharati Portal. Update Pattadar details as per government records.'
  },
  {
    id: 'land-details-search',
    name: 'Land Details Search',
    price: 0,
    priceLabel: 'Custom',
    iconName: 'HiMagnifyingGlass',
    category: 'Bhu Bharati Services',
    description: 'Land Details Search on Bhu Bharati Portal — survey number lookup, ownership verification, and extent details.'
  },
  {
    id: 'passbook-data-correction',
    name: 'Passbook Data Correction',
    price: 0,
    priceLabel: 'Custom',
    iconName: 'HiDocumentCheck',
    category: 'Bhu Bharati Services',
    description: 'Pattadar Passbook data correction on Bhu Bharati — update extent, survey number, village name, and other land records.'
  },
];

export const CATEGORIES = [
  'All',
  'Licences',
  'Documents',
  'Online Services',
  'Printing',
  'Registration Services',
  'Bhu Bharati Services',
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
  },
  {
    id: 't7',
    name: 'Srinivas Goud',
    quote: 'Used their Sale Deed registration service. Very transparent process — they explained stamp duty, market value, everything clearly. Got it done without any hassle at the SRO office.',
    rating: 5,
    source: 'Google Review'
  },
  {
    id: 't8',
    name: 'Fatima Begum',
    quote: 'Applied for Kalyana Lakshmi scheme through EXTEND KART. They handled the entire documentation and I received the benefit on time. Very grateful for their service.',
    rating: 5,
    source: 'Google Review'
  },
];
