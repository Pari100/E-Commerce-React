import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Experience crystal-clear sound with active noise cancellation and 30-hour battery life.',
    category: 'Electronics',
    rating: 4.8,
    reviewCount: 1247,
    inStock: true,
    inventory: 25,
    tags: ['wireless', 'premium', 'noise-cancelling'],
    brand: 'AudioTech',
    features: ['Active Noise Cancellation', '30-hour battery', 'Quick charge', 'Premium materials']
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 199.99,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Track your fitness goals with GPS, heart rate monitoring, and smartphone integration.',
    category: 'Electronics',
    rating: 4.6,
    reviewCount: 892,
    inStock: true,
    inventory: 15,
    tags: ['fitness', 'smart', 'tracking'],
    brand: 'FitPro',
    features: ['GPS tracking', 'Heart rate monitor', 'Water resistant', 'Long battery life']
  },
  {
    id: '3',
    name: 'Minimalist Leather Wallet',
    price: 89.99,
    image: 'https://images.pexels.com/photos/6764040/pexels-photo-6764040.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Handcrafted genuine leather wallet with RFID protection and slim profile.',
    category: 'Accessories',
    rating: 4.9,
    reviewCount: 456,
    inStock: true,
    inventory: 32,
    tags: ['leather', 'minimal', 'rfid'],
    brand: 'CraftLeather',
    features: ['RFID protection', 'Genuine leather', 'Slim design', 'Multiple card slots']
  },
  {
    id: '4',
    name: 'Organic Cotton T-Shirt',
    price: 29.99,
    image: 'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Soft, breathable organic cotton t-shirt perfect for everyday wear.',
    category: 'Clothing',
    rating: 4.4,
    reviewCount: 324,
    inStock: true,
    inventory: 50,
    tags: ['organic', 'cotton', 'comfortable'],
    brand: 'EcoWear',
    features: ['100% organic cotton', 'Pre-shrunk', 'Comfortable fit', 'Sustainable']
  },
  {
    id: '5',
    name: 'Professional Coffee Maker',
    price: 449.99,
    originalPrice: 549.99,
    image: 'https://images.pexels.com/photos/4226927/pexels-photo-4226927.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Brew cafe-quality coffee at home with precision temperature control and timing.',
    category: 'Home & Kitchen',
    rating: 4.7,
    reviewCount: 678,
    inStock: true,
    inventory: 8,
    tags: ['coffee', 'professional', 'precision'],
    brand: 'BrewMaster',
    features: ['Precision temperature control', 'Programmable timer', 'Auto shut-off', 'Easy cleaning']
  },
  {
    id: '6',
    name: 'Wireless Charging Pad',
    price: 39.99,
    image: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Fast wireless charging for all Qi-enabled devices with LED indicator.',
    category: 'Electronics',
    rating: 4.3,
    reviewCount: 234,
    inStock: true,
    inventory: 45,
    tags: ['wireless', 'charging', 'fast'],
    brand: 'ChargeTech',
    features: ['Fast charging', 'LED indicator', 'Universal compatibility', 'Compact design']
  },
  {
    id: '7',
    name: 'Designer Sunglasses',
    price: 159.99,
    image: 'https://images.pexels.com/photos/1586973/pexels-photo-1586973.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Stylish designer sunglasses with UV protection and polarized lenses.',
    category: 'Accessories',
    rating: 4.5,
    reviewCount: 567,
    inStock: true,
    inventory: 18,
    tags: ['designer', 'uv-protection', 'polarized'],
    brand: 'SunStyle',
    features: ['UV protection', 'Polarized lenses', 'Lightweight frame', 'Scratch resistant']
  },
  {
    id: '8',
    name: 'Yoga Mat Premium',
    price: 79.99,
    image: 'https://images.pexels.com/photos/4327046/pexels-photo-4327046.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Non-slip yoga mat with excellent cushioning and eco-friendly materials.',
    category: 'Sports & Fitness',
    rating: 4.8,
    reviewCount: 789,
    inStock: true,
    inventory: 22,
    tags: ['yoga', 'non-slip', 'eco-friendly'],
    brand: 'ZenMat',
    features: ['Non-slip surface', 'Extra cushioning', 'Eco-friendly', 'Easy to clean']
  }
];

export const categories = ['All', 'Electronics', 'Clothing', 'Accessories', 'Home & Kitchen', 'Sports & Fitness'];
export const brands = ['AudioTech', 'FitPro', 'CraftLeather', 'EcoWear', 'BrewMaster', 'ChargeTech', 'SunStyle', 'ZenMat'];