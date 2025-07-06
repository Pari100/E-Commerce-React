import React from 'react';
import { ArrowRight, Star, Shield, Truck, Headphones, ShoppingBag, Users, Award } from 'lucide-react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import { useCart } from '../context/CartContext';

interface HomePageProps {
  products: Product[];
  onShopNow: () => void;
  onQuickView: (product: Product) => void;
}

const HomePage: React.FC<HomePageProps> = ({ products, onShopNow, onQuickView }) => {
  const { dispatch } = useCart();

  const featuredProducts = products.slice(0, 4);
  const bestSellers = products.filter(p => p.rating >= 4.7).slice(0, 3);

  const features = [
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Your transactions are protected with bank-level security'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Free shipping on orders over $50 with 2-day delivery'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Round-the-clock customer service for all your needs'
    },
    {
      icon: Award,
      title: 'Quality Guarantee',
      description: '30-day money-back guarantee on all products'
    }
  ];

  const stats = [
    { icon: Users, value: '50K+', label: 'Happy Customers' },
    { icon: ShoppingBag, value: '10K+', label: 'Products Sold' },
    { icon: Star, value: '4.9', label: 'Average Rating' },
    { icon: Award, value: '99%', label: 'Satisfaction Rate' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  Welcome to
                  <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    ShopHub
                  </span>
                </h1>
                <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
                  Discover premium products at unbeatable prices. Your one-stop destination for quality, style, and innovation.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onShopNow}
                  className="group bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <span>Shop Now</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105">
                  Learn More
                </button>
              </div>
              
              <div className="flex items-center space-x-8 pt-8">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full border-2 border-white"></div>
                    ))}
                  </div>
                  <span className="text-blue-100">50K+ Happy Customers</span>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} className="text-yellow-400 fill-current" />
                  ))}
                  <span className="text-blue-100 ml-2">4.9/5 Rating</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {featuredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className={`bg-white/10 backdrop-blur-sm rounded-2xl p-4 transform transition-all duration-500 hover:scale-105 ${
                      index % 2 === 0 ? 'translate-y-8' : '-translate-y-4'
                    }`}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-32 object-cover rounded-xl mb-3"
                    />
                    <h3 className="font-semibold text-sm mb-1 line-clamp-2">{product.name}</h3>
                    <p className="text-yellow-400 font-bold">${product.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose ShopHub?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to providing you with the best shopping experience through quality products and exceptional service.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-xl text-gray-600">Discover our handpicked selection of premium products</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode="grid"
                onQuickView={onQuickView}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button
              onClick={onShopNow}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Best Sellers</h2>
            <p className="text-xl text-gray-300">Our most popular products loved by customers</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {bestSellers.map((product, index) => (
              <div
                key={product.id}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <div className="relative mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-xl"
                  />
                  <div className="absolute top-4 left-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                    #{index + 1} Best Seller
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-300 mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-yellow-400">${product.price}</span>
                  <div className="flex items-center space-x-1">
                    <Star size={16} className="text-yellow-400 fill-current" />
                    <span className="text-yellow-400">{product.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-4">
                <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                  <stat.icon size={32} />
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-blue-100">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl text-purple-100 mb-8 leading-relaxed">
            Join thousands of satisfied customers and discover amazing products at unbeatable prices.
          </p>
          <button
            onClick={onShopNow}
            className="bg-white text-purple-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-purple-50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            Start Shopping Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;