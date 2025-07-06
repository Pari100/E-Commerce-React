import React, { useState } from 'react';
import { ArrowLeft, CreditCard, MapPin, User, Lock } from 'lucide-react';
import { CheckoutData } from '../types';
import { useCart } from '../context/CartContext';
import RazorpayPayment from './RazorpayPayment';

interface CheckoutProps {
  onBack: () => void;
  onPayment: (data: CheckoutData) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ onBack, onPayment }) => {
  const { state } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CheckoutData>({
    shipping: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'IN'
    },
    billing: {
      sameAsShipping: true
    },
    payment: {
      method: 'razorpay'
    }
  });

  const handleInputChange = (section: keyof CheckoutData, field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRazorpaySuccess = (paymentId: string) => {
    // Add payment ID to form data
    const updatedFormData = {
      ...formData,
      payment: {
        ...formData.payment,
        paymentId
      }
    };
    onPayment(updatedFormData);
  };

  const handleRazorpayError = (error: any) => {
    console.error('Payment failed:', error);
    alert('Payment failed. Please try again.');
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.shipping.firstName && formData.shipping.lastName && 
               formData.shipping.email && formData.shipping.address && 
               formData.shipping.city && formData.shipping.state && formData.shipping.zipCode;
      case 2:
        return formData.billing.sameAsShipping || 
               (formData.billing.firstName && formData.billing.lastName && 
                formData.billing.address && formData.billing.city && 
                formData.billing.state && formData.billing.zipCode);
      case 3:
        return true; // Razorpay handles validation
      default:
        return false;
    }
  };

  const totalAmount = state.cart.total + 9.99 + state.cart.total * 0.08;

  const steps = [
    { number: 1, title: 'Shipping', icon: MapPin },
    { number: 2, title: 'Billing', icon: User },
    { number: 3, title: 'Payment', icon: CreditCard }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mr-4"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Cart
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          {/* Step Indicator */}
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep >= step.number ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  <step.icon size={20} />
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= step.number ? 'text-blue-600' : 'text-gray-600'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${
                    currentStep > step.number ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          <form className="space-y-6">
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      value={formData.shipping.firstName}
                      onChange={(e) => handleInputChange('shipping', 'firstName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      value={formData.shipping.lastName}
                      onChange={(e) => handleInputChange('shipping', 'lastName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={formData.shipping.email}
                      onChange={(e) => handleInputChange('shipping', 'email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={formData.shipping.phone}
                      onChange={(e) => handleInputChange('shipping', 'phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      value={formData.shipping.address}
                      onChange={(e) => handleInputChange('shipping', 'address', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      value={formData.shipping.city}
                      onChange={(e) => handleInputChange('shipping', 'city', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input
                      type="text"
                      value={formData.shipping.state}
                      onChange={(e) => handleInputChange('shipping', 'state', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">PIN Code</label>
                    <input
                      type="text"
                      value={formData.shipping.zipCode}
                      onChange={(e) => handleInputChange('shipping', 'zipCode', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Billing Information */}
            {currentStep === 2 && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Billing Information</h2>
                <div className="mb-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.billing.sameAsShipping}
                      onChange={(e) => handleInputChange('billing', 'sameAsShipping', e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Same as shipping address</span>
                  </label>
                </div>
                
                {!formData.billing.sameAsShipping && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input
                        type="text"
                        value={formData.billing.firstName || ''}
                        onChange={(e) => handleInputChange('billing', 'firstName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        value={formData.billing.lastName || ''}
                        onChange={(e) => handleInputChange('billing', 'lastName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <input
                        type="text"
                        value={formData.billing.address || ''}
                        onChange={(e) => handleInputChange('billing', 'address', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input
                        type="text"
                        value={formData.billing.city || ''}
                        onChange={(e) => handleInputChange('billing', 'city', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                      <input
                        type="text"
                        value={formData.billing.state || ''}
                        onChange={(e) => handleInputChange('billing', 'state', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">PIN Code</label>
                      <input
                        type="text"
                        value={formData.billing.zipCode || ''}
                        onChange={(e) => handleInputChange('billing', 'zipCode', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Payment Information */}
            {currentStep === 3 && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
                
                <div className="mb-6">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-600 p-3 rounded-lg mr-4">
                        <CreditCard size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Secure Payment with Razorpay</h3>
                        <p className="text-sm text-gray-600">Pay securely using UPI, Cards, Net Banking, or Wallets</p>
                      </div>
                    </div>
                    
                    <RazorpayPayment
                      amount={totalAmount}
                      checkoutData={formData}
                      onSuccess={handleRazorpaySuccess}
                      onError={handleRazorpayError}
                    />
                  </div>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start">
                    <Lock size={20} className="text-yellow-600 mr-2 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-yellow-800">Secure Payment</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        Your payment information is encrypted and secure. We use Razorpay's industry-standard security measures to protect your data.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            {currentStep < 3 && (
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className={`px-6 py-2 rounded-lg transition-colors ${
                    currentStep === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  disabled={currentStep === 1}
                >
                  Previous
                </button>
                
                <button
                  type="button"
                  onClick={handleNext}
                  className={`px-6 py-2 rounded-lg transition-colors ${
                    isStepValid()
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!isStepValid()}
                >
                  Next
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          
          <div className="space-y-3 mb-4">
            {state.cart.items.map(item => (
              <div key={item.product.id} className="flex justify-between text-sm">
                <span className="text-gray-700">
                  {item.product.name} × {item.quantity}
                </span>
                <span className="font-medium">₹{(item.product.price * item.quantity * 83).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>₹{(state.cart.total * 83).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>₹{(9.99 * 83).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax (GST)</span>
              <span>₹{(state.cart.total * 0.08 * 83).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-2">
              <span>Total</span>
              <span>₹{(totalAmount * 83).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;