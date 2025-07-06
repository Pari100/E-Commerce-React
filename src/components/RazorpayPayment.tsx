import React from 'react';
import { CheckoutData } from '../types';

interface RazorpayPaymentProps {
  amount: number;
  checkoutData: CheckoutData;
  onSuccess: (paymentId: string) => void;
  onError: (error: any) => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const RazorpayPayment: React.FC<RazorpayPaymentProps> = ({
  amount,
  checkoutData,
  onSuccess,
  onError
}) => {
  const handlePayment = () => {
    // Check if Razorpay is loaded
    if (!window.Razorpay) {
      onError({ message: 'Razorpay SDK not loaded' });
      return;
    }

    const options = {
      key: 'YOUR_RAZORPAY_KEY_ID', // Replace with your actual Razorpay Key ID
      amount: Math.round(amount * 100), // Amount in paise (multiply by 100)
      currency: 'INR',
      name: 'ShopHub',
      description: 'Purchase from ShopHub',
      image: '/logo.png', // Your logo URL
      order_id: '', // This should be generated from your backend
      handler: function (response: any) {
        // Payment successful
        onSuccess(response.razorpay_payment_id);
      },
      prefill: {
        name: `${checkoutData.shipping.firstName} ${checkoutData.shipping.lastName}`,
        email: checkoutData.shipping.email,
        contact: checkoutData.shipping.phone
      },
      notes: {
        address: checkoutData.shipping.address
      },
      theme: {
        color: '#3B82F6'
      },
      modal: {
        ondismiss: function() {
          onError({ message: 'Payment cancelled by user' });
        }
      }
    };

    const rzp = new window.Razorpay(options);
    
    rzp.on('payment.failed', function (response: any) {
      onError(response.error);
    });

    rzp.open();
  };

  return (
    <button
      onClick={handlePayment}
      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold text-lg flex items-center justify-center space-x-2 transform hover:scale-105 hover:shadow-xl"
    >
      <span>Pay with Razorpay</span>
      <span className="font-bold">₹{amount.toFixed(2)}</span>
    </button>
  );
};

export default RazorpayPayment;