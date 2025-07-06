import React from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartProps {
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ onCheckout }) => {
  const { state, dispatch } = useCart();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity: newQuantity } });
  };

  const handleRemoveItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const handleCloseCart = () => {
    dispatch({ type: 'CLOSE_CART' });
  };

  const handleCheckout = () => {
    onCheckout();
    handleCloseCart();
  };

  if (!state.isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <ShoppingBag size={24} className="mr-2" />
            Shopping Cart ({state.cart.itemCount})
          </h2>
          <button
            onClick={handleCloseCart}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        {state.cart.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-gray-500">
            <ShoppingBag size={64} className="mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">Your cart is empty</p>
            <p className="text-sm text-center">Add some products to get started</p>
          </div>
        ) : (
          <>
            <div className="flex-1 p-6 space-y-4">
              {state.cart.items.map(item => (
                <div key={item.product.id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 line-clamp-2">{item.product.name}</h3>
                    <p className="text-sm text-gray-600">${item.product.price}</p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-3 py-1 text-center min-w-[2rem]">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 transition-colors"
                          disabled={item.quantity >= item.product.inventory}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => handleRemoveItem(item.product.id)}
                        className="text-red-600 hover:text-red-800 transition-colors p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t p-6 space-y-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>${state.cart.total.toFixed(2)}</span>
              </div>
              
              <button
                onClick={handleCheckout}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Proceed to Checkout
              </button>
              
              <button
                onClick={handleCloseCart}
                className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;