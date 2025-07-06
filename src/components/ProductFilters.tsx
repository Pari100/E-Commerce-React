import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { categories, brands } from '../data/products';
import { FilterOptions } from '../types';

interface ProductFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ filters, onFiltersChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handleBrandChange = (brand: string) => {
    const updatedBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    handleFilterChange('brands', updatedBrands);
  };

  const clearFilters = () => {
    onFiltersChange({
      category: 'All',
      minPrice: 0,
      maxPrice: 1000,
      inStock: false,
      rating: 0,
      brands: []
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Filter size={20} className="mr-2" />
          Filters
        </h3>
        <button
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Category</h4>
        <div className="space-y-2">
          {categories.map(category => (
            <label key={category} className="flex items-center">
              <input
                type="radio"
                name="category"
                value={category}
                checked={filters.category === category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="mr-2 text-blue-600"
              />
              <span className="text-sm text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Price Range</h4>
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Min Price</label>
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              min="0"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Max Price</label>
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              min="0"
            />
          </div>
        </div>
      </div>

      {/* Brand Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Brand</h4>
        <div className="space-y-2">
          {brands.map(brand => (
            <label key={brand} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
                className="mr-2 text-blue-600"
              />
              <span className="text-sm text-gray-700">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Minimum Rating</h4>
        <div className="space-y-2">
          {[4, 3, 2, 1].map(rating => (
            <label key={rating} className="flex items-center">
              <input
                type="radio"
                name="rating"
                value={rating}
                checked={filters.rating === rating}
                onChange={(e) => handleFilterChange('rating', Number(e.target.value))}
                className="mr-2 text-blue-600"
              />
              <span className="text-sm text-gray-700">{rating}+ Stars</span>
            </label>
          ))}
        </div>
      </div>

      {/* In Stock Filter */}
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={(e) => handleFilterChange('inStock', e.target.checked)}
            className="mr-2 text-blue-600"
          />
          <span className="text-sm text-gray-700">In Stock Only</span>
        </label>
      </div>
    </div>
  );
};

export default ProductFilters;