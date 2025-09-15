'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Lock, 
  Package, 
  Download, 
  ArrowLeft,
  Check,
  AlertCircle
} from 'lucide-react';
import { usePrintShop } from '@/contexts/PrintShopContext';
import { PRODUCT_TYPE_CONFIG } from '@/types/printShop';

interface CheckoutFormData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  paymentMethod: 'credit_card' | 'paypal';
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  nameOnCard: string;
  billingAddressSame: boolean;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartSummary, clearCart } = usePrintShop();
  const [currentStep, setCurrentStep] = useState<'info' | 'payment' | 'review'>('info');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState<CheckoutFormData>({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    paymentMethod: 'credit_card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    billingAddressSame: true,
  });

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      router.push('/shop');
    }
  }, [cart, router]);

  const handleInputChange = (field: keyof CheckoutFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: string): boolean => {
    switch (step) {
      case 'info':
        return !!(formData.email && formData.firstName && formData.lastName);
      case 'payment':
        if (formData.paymentMethod === 'credit_card') {
          return !!(formData.cardNumber && formData.expiryDate && formData.cvv && formData.nameOnCard);
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) {
      alert('Please fill in all required fields');
      return;
    }

    if (currentStep === 'info') {
      setCurrentStep('payment');
    } else if (currentStep === 'payment') {
      setCurrentStep('review');
    }
  };

  const handleBack = () => {
    if (currentStep === 'payment') {
      setCurrentStep('info');
    } else if (currentStep === 'review') {
      setCurrentStep('payment');
    } else {
      router.push('/shop');
    }
  };

  const handleSubmitOrder = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart and redirect to success page
      clearCart();
      router.push('/checkout/success');
    } catch (error) {
      console.error('Order processing failed:', error);
      alert('Order processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  if (cart.length === 0) {
    return null; // Will redirect
  }

  return (
    <main className="w-full bg-steeldark-600 text-steelpolished-400 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-steelpolished-400 hover:text-steelpolished-300 transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            Back
          </button>
          <h1 className="text-3xl font-bold text-steelpolished-400">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {[
              { id: 'info', label: 'Information', icon: Package },
              { id: 'payment', label: 'Payment', icon: CreditCard },
              { id: 'review', label: 'Review', icon: Check },
            ].map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = ['info', 'payment', 'review'].indexOf(currentStep) > index;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                    isActive 
                      ? 'border-accent bg-accent text-white' 
                      : isCompleted
                      ? 'border-green-500 bg-green-500 text-white'
                      : 'border-steeldark-600 text-steelpolished-500'
                  }`}>
                    <Icon size={16} />
                  </div>
                  <span className={`ml-2 text-sm ${
                    isActive ? 'text-accent' : isCompleted ? 'text-green-500' : 'text-steelpolished-500'
                  }`}>
                    {step.label}
                  </span>
                  {index < 2 && (
                    <div className={`w-16 h-0.5 mx-4 ${
                      isCompleted ? 'bg-green-500' : 'bg-steeldark-600'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-steeldark-800 rounded-lg border border-steeldark-600 p-6"
            >
              {currentStep === 'info' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-steelpolished-400">Contact Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-steelpolished-400 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-3 py-2 bg-steeldark-700 border border-steeldark-600 rounded-lg text-steelpolished-400 focus:border-accent focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-steelpolished-400 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-3 py-2 bg-steeldark-700 border border-steeldark-600 rounded-lg text-steelpolished-400 focus:border-accent focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-steelpolished-400 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="w-full px-3 py-2 bg-steeldark-700 border border-steeldark-600 rounded-lg text-steelpolished-400 focus:border-accent focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-steelpolished-400 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="w-full px-3 py-2 bg-steeldark-700 border border-steeldark-600 rounded-lg text-steelpolished-400 focus:border-accent focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  {cartSummary.hasPhysicalItems && (
                    <>
                      <h3 className="text-lg font-medium text-steelpolished-400 mt-8">Shipping Address</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-steelpolished-400 mb-2">
                            Address Line 1 *
                          </label>
                          <input
                            type="text"
                            value={formData.address1}
                            onChange={(e) => handleInputChange('address1', e.target.value)}
                            className="w-full px-3 py-2 bg-steeldark-700 border border-steeldark-600 rounded-lg text-steelpolished-400 focus:border-accent focus:outline-none"
                            required
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-steelpolished-400 mb-2">
                            Address Line 2
                          </label>
                          <input
                            type="text"
                            value={formData.address2}
                            onChange={(e) => handleInputChange('address2', e.target.value)}
                            className="w-full px-3 py-2 bg-steeldark-700 border border-steeldark-600 rounded-lg text-steelpolished-400 focus:border-accent focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-steelpolished-400 mb-2">
                            City *
                          </label>
                          <input
                            type="text"
                            value={formData.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            className="w-full px-3 py-2 bg-steeldark-700 border border-steeldark-600 rounded-lg text-steelpolished-400 focus:border-accent focus:outline-none"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-steelpolished-400 mb-2">
                            State *
                          </label>
                          <input
                            type="text"
                            value={formData.state}
                            onChange={(e) => handleInputChange('state', e.target.value)}
                            className="w-full px-3 py-2 bg-steeldark-700 border border-steeldark-600 rounded-lg text-steelpolished-400 focus:border-accent focus:outline-none"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-steelpolished-400 mb-2">
                            ZIP Code *
                          </label>
                          <input
                            type="text"
                            value={formData.zipCode}
                            onChange={(e) => handleInputChange('zipCode', e.target.value)}
                            className="w-full px-3 py-2 bg-steeldark-700 border border-steeldark-600 rounded-lg text-steelpolished-400 focus:border-accent focus:outline-none"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-steelpolished-400 mb-2">
                            Country *
                          </label>
                          <select
                            value={formData.country}
                            onChange={(e) => handleInputChange('country', e.target.value)}
                            className="w-full px-3 py-2 bg-steeldark-700 border border-steeldark-600 rounded-lg text-steelpolished-400 focus:border-accent focus:outline-none"
                            required
                          >
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="UK">United Kingdom</option>
                            <option value="AU">Australia</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {currentStep === 'payment' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-steelpolished-400">Payment Information</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-steelpolished-400 mb-2">
                        Payment Method
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            value="credit_card"
                            checked={formData.paymentMethod === 'credit_card'}
                            onChange={(e) => handleInputChange('paymentMethod', e.target.value as any)}
                            className="mr-2"
                          />
                          <CreditCard size={16} className="mr-2" />
                          Credit Card
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            value="paypal"
                            checked={formData.paymentMethod === 'paypal'}
                            onChange={(e) => handleInputChange('paymentMethod', e.target.value as any)}
                            className="mr-2"
                          />
                          PayPal
                        </label>
                      </div>
                    </div>

                    {formData.paymentMethod === 'credit_card' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-steelpolished-400 mb-2">
                            Card Number *
                          </label>
                          <input
                            type="text"
                            value={formData.cardNumber}
                            onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-3 py-2 bg-steeldark-700 border border-steeldark-600 rounded-lg text-steelpolished-400 focus:border-accent focus:outline-none"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-steelpolished-400 mb-2">
                            Expiry Date *
                          </label>
                          <input
                            type="text"
                            value={formData.expiryDate}
                            onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                            placeholder="MM/YY"
                            className="w-full px-3 py-2 bg-steeldark-700 border border-steeldark-600 rounded-lg text-steelpolished-400 focus:border-accent focus:outline-none"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-steelpolished-400 mb-2">
                            CVV *
                          </label>
                          <input
                            type="text"
                            value={formData.cvv}
                            onChange={(e) => handleInputChange('cvv', e.target.value)}
                            placeholder="123"
                            className="w-full px-3 py-2 bg-steeldark-700 border border-steeldark-600 rounded-lg text-steelpolished-400 focus:border-accent focus:outline-none"
                            required
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-steelpolished-400 mb-2">
                            Name on Card *
                          </label>
                          <input
                            type="text"
                            value={formData.nameOnCard}
                            onChange={(e) => handleInputChange('nameOnCard', e.target.value)}
                            className="w-full px-3 py-2 bg-steeldark-700 border border-steeldark-600 rounded-lg text-steelpolished-400 focus:border-accent focus:outline-none"
                            required
                          />
                        </div>
                      </div>
                    )}

                    {formData.paymentMethod === 'paypal' && (
                      <div className="bg-steeldark-700/50 rounded-lg p-4 text-center">
                        <p className="text-steelpolished-500">
                          You will be redirected to PayPal to complete your payment.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-steelpolished-500">
                    <Lock size={16} />
                    <span>Your payment information is secure and encrypted</span>
                  </div>
                </div>
              )}

              {currentStep === 'review' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-steelpolished-400">Review Your Order</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-steelpolished-400 mb-2">Contact Information</h3>
                      <p className="text-steelpolished-500">{formData.email}</p>
                      <p className="text-steelpolished-500">{formData.firstName} {formData.lastName}</p>
                    </div>

                    {cartSummary.hasPhysicalItems && (
                      <div>
                        <h3 className="font-medium text-steelpolished-400 mb-2">Shipping Address</h3>
                        <p className="text-steelpolished-500">
                          {formData.address1}<br />
                          {formData.address2 && <>{formData.address2}<br /></>}
                          {formData.city}, {formData.state} {formData.zipCode}<br />
                          {formData.country}
                        </p>
                      </div>
                    )}

                    <div>
                      <h3 className="font-medium text-steelpolished-400 mb-2">Payment Method</h3>
                      <p className="text-steelpolished-500">
                        {formData.paymentMethod === 'credit_card' ? 'Credit Card' : 'PayPal'}
                        {formData.paymentMethod === 'credit_card' && formData.cardNumber && (
                          <span className="ml-2">ending in {formData.cardNumber.slice(-4)}</span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="bg-steeldark-700/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-sm text-steelpolished-500 mb-4">
                      <AlertCircle size={16} />
                      <span>Please review your order carefully before submitting</span>
                    </div>
                    
                    <button
                      onClick={handleSubmitOrder}
                      disabled={isProcessing}
                      className="w-full flex items-center justify-center gap-2 bg-accent text-white py-3 px-6 rounded-lg font-medium hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Processing Order...
                        </>
                      ) : (
                        <>
                          <Lock size={20} />
                          Complete Order - {formatPrice(cartSummary.total)}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              {currentStep !== 'review' && (
                <div className="flex justify-between mt-8">
                  <button
                    onClick={handleBack}
                    className="px-6 py-2 border border-steeldark-600 text-steelpolished-400 rounded-lg hover:border-steelpolished-400 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
                  >
                    Continue
                  </button>
                </div>
              )}
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-steeldark-800 rounded-lg border border-steeldark-600 p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-steelpolished-400 mb-4">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 bg-steeldark-700 rounded-lg flex-shrink-0 flex items-center justify-center">
                      <span className="text-xs text-steelpolished-500">
                        {PRODUCT_TYPE_CONFIG[item.productType]?.icon}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-steelpolished-400 text-sm">{item.productName}</h4>
                      <p className="text-xs text-steelpolished-500">Qty: {item.quantity}</p>
                      {item.variant && (
                        <p className="text-xs text-steelpolished-500">
                          {item.variant.size?.name} - {item.variant.material?.name}
                        </p>
                      )}
                    </div>
                    <div className="text-sm font-medium text-steelpolished-400">
                      {formatPrice(item.totalPrice)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t border-steeldark-600 pt-4">
                <div className="flex justify-between text-steelpolished-500">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartSummary.subtotal)}</span>
                </div>
                
                {cartSummary.hasPhysicalItems && (
                  <div className="flex justify-between text-steelpolished-500">
                    <span>Shipping</span>
                    <span>
                      {cartSummary.estimatedShipping === 0 ? 'FREE' : formatPrice(cartSummary.estimatedShipping)}
                    </span>
                  </div>
                )}
                
                {cartSummary.estimatedTax > 0 && (
                  <div className="flex justify-between text-steelpolished-500">
                    <span>Tax</span>
                    <span>{formatPrice(cartSummary.estimatedTax)}</span>
                  </div>
                )}
                
                <hr className="border-steeldark-600" />
                
                <div className="flex justify-between text-steelpolished-300 font-semibold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(cartSummary.total)}</span>
                </div>
              </div>

              {/* Product Type Summary */}
              <div className="mt-6 bg-steeldark-700/30 rounded-lg p-3">
                <div className="text-xs text-steelpolished-500 space-y-1">
                  {cartSummary.hasDigitalItems && (
                    <div className="flex items-center gap-1">
                      <Download size={12} />
                      <span>Digital products available immediately</span>
                    </div>
                  )}
                  {cartSummary.hasPhysicalItems && (
                    <div className="flex items-center gap-1">
                      <Package size={12} />
                      <span>Physical items will be shipped</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
