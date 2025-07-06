import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import PaymentSuccess from './components/PaymentSuccess';
import QuickViewModal from './components/QuickViewModal';
import { CartProvider } from './context/CartContext';
import { products } from './data/products';
import { CheckoutData, Product } from './types';

type AppState = 'home' | 'shopping' | 'checkout' | 'payment-success';

function App() {
  const [currentState, setCurrentState] = useState<AppState>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (currentState === 'home') {
      setCurrentState('shopping');
    }
  };

  const handleShopNow = () => {
    setCurrentState('shopping');
    setSearchQuery('');
  };

  const handleCheckout = () => {
    setCurrentState('checkout');
  };

  const handlePayment = (data: CheckoutData) => {
    console.log('Payment data:', data);
    
    // Simulate payment processing
    setTimeout(() => {
      setCurrentState('payment-success');
    }, 1000);
  };

  const handleContinueShopping = () => {
    setCurrentState('home');
    setSearchQuery('');
  };

  const handleBackToCart = () => {
    setCurrentState('shopping');
  };

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Load Razorpay script */}
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
        
        {currentState === 'home' && (
          <>
            <Header onSearch={handleSearch} onMenuClick={() => {}} />
            <HomePage 
              products={products} 
              onShopNow={handleShopNow}
              onQuickView={handleQuickView}
            />
            <Cart onCheckout={handleCheckout} />
          </>
        )}
        
        {currentState === 'shopping' && (
          <>
            <Header onSearch={handleSearch} onMenuClick={() => {}} />
            <ProductList products={products} searchQuery={searchQuery} />
            <Cart onCheckout={handleCheckout} />
          </>
        )}
        
        {currentState === 'checkout' && (
          <Checkout onBack={handleBackToCart} onPayment={handlePayment} />
        )}
        
        {currentState === 'payment-success' && (
          <PaymentSuccess onContinueShopping={handleContinueShopping} />
        )}

        {/* Quick View Modal */}
        {selectedProduct && (
          <QuickViewModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </div>
    </CartProvider>
  );
}

export default App;