export interface Service {
  id: string;
  name: string;
  price: number;
  priceLabel: string;
  iconName: string; // Name of the Lucide or Hi2 icon to render dynamically
  category: 'Licences' | 'Documents' | 'Printing' | 'Online Services' | 'Registration Services' | 'Bhu Bharati Services';
  description: string;
  imageUrl?: string; // High-resolution flyer or menu image reference
  requirements?: string[]; // Documents / items required from customer
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  quote: string;
  rating: number;
  source: string;
}
