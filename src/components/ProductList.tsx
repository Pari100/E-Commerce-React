import React, { useState, useMemo } from 'react';
import { Grid, List, SlidersHorizontal } from 'lucide-react';
import ProductCard from './ProductCard';
import ProductFilters from './ProductFilters';
import QuickViewModal from './QuickViewModal';
import { Product, ViewMode, SortOption, FilterOptions } from '../types';

interface ProductListProps {
  products: Product[];
  searchQuery: string;
}

const ProductList: React.FC<ProductListProps> = ({ products, searchQuery }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortOption, setSortOption] = useState<SortOption>('name');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'All',
    minPrice: 0,
    maxPrice: 1000,
    inStock: false,
    rating: 0,
    brands: []
  });

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Search filter
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        if (!product.name.toLowerCase().includes(searchLower) &&
            !product.description.toLowerCase().includes(searchLower) &&
            !product.category.toLowerCase().includes(searchLower) &&
            !product.tags.some(tag => tag.toLowerCase().includes(searchLower))) {
          return false;
        }
      }

      // Category filter
      if (filters.category !== 'All' && product.category !== filters.category) {
        return false;
      }

      // Price range filter
      if (product.price < filters.minPrice || product.price > filters.maxPrice) {
        return false;
      }

      // Brand filter
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
        return false;
      }

      // Rating filter
      if (filters.rating > 0 && product.rating < filters.rating) {
        return false;
      }

      // In stock filter
      if (filters.inStock && !product.inStock) {
        return false;
      }

      return true;
    });

    // Sort products
    switch (sortOption) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // For demo purposes, sort by name as we don't have creation dates
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [products, searchQuery, filters, sortOption]);

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <ProductFilters filters={filters} onFiltersChange={setFilters} />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
              >
                <SlidersHorizontal size={18} />
                <span>Filters</span>
              </button>
              <p className="text-gray-600">
                {filteredAndSortedProducts.length} products found
              </p>
            </div>

            <div className="flex items-center space-x-4">
              {/* Sort Options */}
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'} hover:bg-blue-50 transition-colors`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'} hover:bg-blue-50 transition-colors`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Product Grid/List */}
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }>
            {filteredAndSortedProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode={viewMode}
                onQuickView={handleQuickView}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredAndSortedProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              <button
                onClick={() => setFilters({
                  category: 'All',
                  minPrice: 0,
                  maxPrice: 1000,
                  inStock: false,
                  rating: 0,
                  brands: []
                })}
                className="mt-4 text-blue-600 hover:text-blue-800 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <QuickViewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default ProductList;