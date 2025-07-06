import React from 'react';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
  onQuickView: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode, onQuickView }) => {
  const { dispatch } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickView(product);
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <div className="flex p-6">
          <div className="flex-shrink-0 w-48 h-48 relative group">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 rounded-lg flex items-center justify-center">
              <button
                onClick={handleQuickView}
                className="bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-100"
              >
                <Eye size={20} className="text-gray-700" />
              </button>
            </div>
          </div>
          
          <div className="ml-6 flex-1">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{product.name}</h3>
              <button className="text-gray-400 hover:text-red-500 transition-colors">
                <Heart size={20} />
              </button>
            </div>
            
            <p className="text-gray-600 mb-3 line-clamp-3">{product.description}</p>
            
            <div className="flex items-center mb-3">
              <div className="flex items-center mr-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                  />
                ))}
                <span className="text-sm text-gray-600 ml-1">({product.reviewCount})</span>
              </div>
              <span className="text-sm px-2 py-1 bg-green-100 text-green-800 rounded-full">
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through ml-2">${product.originalPrice}</span>
                )}
              </div>
              
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <ShoppingCart size={18} />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.originalPrice && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
            SALE
          </div>
        )}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors mb-2">
            <Heart size={18} className="text-gray-700" />
          </button>
          <button
            onClick={handleQuickView}
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors block"
          >
            <Eye size={18} className="text-gray-700" />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center mr-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
              />
            ))}
            <span className="text-xs text-gray-600 ml-1">({product.reviewCount})</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <span className="text-xl font-bold text-blue-600">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">${product.originalPrice}</span>
            )}
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${
            product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
        
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <ShoppingCart size={16} />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;