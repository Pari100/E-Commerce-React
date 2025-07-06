export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  description: string;
  category: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  inventory: number;
  tags: string[];
  brand: string;
  features: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface CheckoutData {
  shipping: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  billing: {
    sameAsShipping: boolean;
    firstName?: string;
    lastName?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  payment: {
    method: 'razorpay';
    paymentId?: string;
  };
}

export type ViewMode = 'grid' | 'list';
export type SortOption = 'name' | 'price-low' | 'price-high' | 'rating' | 'newest';

export interface FilterOptions {
  category: string;
  minPrice: number;
  maxPrice: number;
  inStock: boolean;
  rating: number;
  brands: string[];
}