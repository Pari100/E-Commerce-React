import React, { useEffect } from 'react';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface PaymentSuccessProps {
  onContinueShopping: () => void;
}

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ onContinueShopping }) => {
  const { dispatch } = useCart();

  useEffect(() => {
    // Clear cart after successful payment
    dispatch({ type: 'CLEAR_CART' });
  }, [dispatch]);

  const orderNumber = `ORD-${Date.now().toString().slice(-8)}`;

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="text-center">
        <div className="mb-8">
          <CheckCircle size={80} className="text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-lg text-gray-600">Thank you for your purchase</p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <div className="flex items-center justify-center mb-6">
            <Package size={48} className="text-blue-600" />
          </div>
          
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Confirmed</h2>
          <p className="text-gray-600 mb-6">
            Your order has been successfully placed and is being processed.
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Order Number:</span>
              <span className="font-mono font-medium">{orderNumber}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Estimated Delivery:</span>
              <span className="font-medium">3-5 business days</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                  1
                </div>
                <span className="text-sm font-medium text-blue-800">Order Confirmed</span>
              </div>
              <CheckCircle size={20} className="text-green-500" />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                  2
                </div>
                <span className="text-sm font-medium text-gray-600">Processing</span>
              </div>
              <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                  3
                </div>
                <span className="text-sm font-medium text-gray-600">Shipped</span>
              </div>
              <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                  4
                </div>
                <span className="text-sm font-medium text-gray-600">Delivered</span>
              </div>
              <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">What's Next?</h3>
          <ul className="text-sm text-yellow-700 space-y-1 text-left">
            <li>• You'll receive an email confirmation shortly</li>
            <li>• Track your order using the order number above</li>
            <li>• You'll get shipping updates via email/SMS</li>
            <li>• Contact support if you have any questions</li>
          </ul>
        </div>

        <div className="space-y-4">
          <button
            onClick={onContinueShopping}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
          >
            <span>Continue Shopping</span>
            <ArrowRight size={20} />
          </button>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Need help? <a href="#" className="text-blue-600 hover:text-blue-800">Contact Support</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;