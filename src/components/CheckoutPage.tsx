import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Download,
  Lock,
  ShieldCheck,
  Sparkles,
  Smartphone,
  Wallet
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    cartTax,
    cartTotal,
    placeOrder,
    setView,
    user,
    updateUser,
    addToast,
    setLegalModal,
  } = useStore();

  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'paypal'>('card');
  
  // Card input states
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-editorial text-2xl font-bold text-[#221F1C]">
          Your bag is empty
        </h2>
        <p className="text-sm text-[#786E64]">
          Please add eBooks to your digital bag before heading to checkout.
        </p>
        <button
          onClick={() => setView('catalog')}
          className="px-6 py-2.5 rounded-xl bg-[#221F1C] text-white text-xs font-semibold hover:bg-[#38322B] transition-colors cursor-pointer border border-[#38322B]"
        >
          Browse Catalog
        </button>
      </div>
    );
  }

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!name.trim()) errs.name = 'Please provide your name';
    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      errs.email = 'Please provide a valid email for eBook delivery';
    }

    if (paymentMethod === 'card') {
      const cleanNum = cardNumber.replace(/\s+/g, '');
      if (cleanNum.length < 15) errs.cardNumber = 'Please enter a valid 16-digit card number';
      if (!cardExpiry.includes('/') || cardExpiry.length < 5) errs.cardExpiry = 'MM/YY required';
      if (cardCvc.length < 3) errs.cardCvc = '3 or 4 digits required';
    }

    if (!termsAgreed) {
      errs.terms = 'Please accept digital delivery terms';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 16);
    val = val.replace(/(\d{4})/g, '$1 ').trim();
    setCardNumber(val);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (val.length >= 2) {
      val = val.slice(0, 2) + '/' + val.slice(2);
    }
    setCardExpiry(val);
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      addToast('Incomplete Information', 'Please complete the required checkout fields.', 'warning');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment gateway processing latency (e.g. Stripe API call)
      await new Promise((resolve) => setTimeout(resolve, 1400));

      const last4 = paymentMethod === 'card' && cardNumber ? cardNumber.slice(-4) : '4242';
      const customerInfo = {
        name,
        email,
        city: 'Hamtramck',
        state: 'MI',
      };

      updateUser(customerInfo);
      await placeOrder(customerInfo, paymentMethod === 'card' ? 'Credit Card' : paymentMethod === 'apple_pay' ? 'Digital Wallet' : 'PayPal', last4);
      setView('order-confirmation');
    } catch (err) {
      console.error(err);
      addToast('Checkout Error', 'There was a problem confirming your order. Please retry.', 'warning');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Back */}
        <div className="mb-8">
          <button
            onClick={() => setView('catalog')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#6C645C] hover:text-[#221F1C] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Browsing</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Customer Form & Payment Architecture */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-[#236B5E] text-xs font-bold uppercase tracking-wider mb-1">
                <Lock className="w-3.5 h-3.5" />
                <span>Encrypted 256-Bit SSL Checkout</span>
              </div>
              <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#221F1C]">
                Complete Your Order
              </h1>
              <p className="text-xs sm:text-sm text-[#786E64] mt-1">
                Your eBooks will be immediately deposited into your Digital Library and delivered to your email.
              </p>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-6">
              {/* Step 1: Customer Information */}
              <div className="bg-white rounded-2xl border border-[#E8E1D5] p-5 sm:p-6 artisan-card space-y-4">
                <h3 className="font-editorial text-lg font-bold text-[#221F1C] flex items-center justify-between">
                  <span>1. Digital Delivery Details</span>
                  <span className="text-xs font-sans font-normal text-[#786E64]">
                    Permanent license holder
                  </span>
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#4A443E] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Jane Doe"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#221F1C] focus:outline-none focus:ring-2 focus:ring-[#221F1C] ${
                        errors.name ? 'border-red-500 bg-red-50/20' : 'border-[#D8CFBF] bg-white'
                      }`}
                    />
                    {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4A443E] mb-1">
                      Email Address (Where eBook files & receipts will be sent) *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="reader@example.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#221F1C] focus:outline-none focus:ring-2 focus:ring-[#221F1C] ${
                        errors.email ? 'border-red-500 bg-red-50/20' : 'border-[#D8CFBF] bg-white'
                      }`}
                    />
                    {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                  </div>
                </div>
              </div>

              {/* Step 2: Payment Method Section (Integration-Ready for Stripe) */}
              <div className="bg-white rounded-2xl border border-[#E8E1D5] p-5 sm:p-6 artisan-card space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-editorial text-lg font-bold text-[#221F1C]">
                    2. Payment Method
                  </h3>
                  <span className="text-[11px] text-[#786E64] bg-[#F4EFE6] border border-[#E8E1D5] px-2 py-0.5 rounded-md">
                    Stripe Architecture Ready
                  </span>
                </div>

                {/* Method selector tabs */}
                <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2.5 px-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-[#221F1C] bg-[#F4EFE6] text-[#221F1C] font-bold shadow-2xs'
                        : 'border-[#E8E1D5] text-[#786E64] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Credit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('apple_pay')}
                    className={`py-2.5 px-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                      paymentMethod === 'apple_pay'
                        ? 'border-[#221F1C] bg-[#F4EFE6] text-[#221F1C] font-bold shadow-2xs'
                        : 'border-[#E8E1D5] text-[#786E64] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Digital Wallet</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`py-2.5 px-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                      paymentMethod === 'paypal'
                        ? 'border-[#221F1C] bg-[#F4EFE6] text-[#221F1C] font-bold shadow-2xs'
                        : 'border-[#E8E1D5] text-[#786E64] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <Wallet className="w-4 h-4" />
                    <span>PayPal</span>
                  </button>
                </div>

                {/* Credit card inputs */}
                {paymentMethod === 'card' ? (
                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-[#4A443E] mb-1">
                        Card Number *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          placeholder="4242 4242 4242 4242"
                          className={`w-full pl-3.5 pr-12 py-2.5 rounded-xl border text-sm font-mono text-[#221F1C] focus:outline-none focus:ring-2 focus:ring-[#221F1C] ${
                            errors.cardNumber ? 'border-red-500 bg-red-50/20' : 'border-[#D8CFBF] bg-white'
                          }`}
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#786E64] font-semibold">
                          VISA/MC
                        </div>
                      </div>
                      {errors.cardNumber && (
                        <p className="text-[11px] text-red-500 mt-1">{errors.cardNumber}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#4A443E] mb-1">
                          Expiration Date *
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={handleExpiryChange}
                          placeholder="MM/YY"
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-mono text-[#221F1C] focus:outline-none focus:ring-2 focus:ring-[#221F1C] ${
                            errors.cardExpiry ? 'border-red-500 bg-red-50/20' : 'border-[#D8CFBF] bg-white'
                          }`}
                        />
                        {errors.cardExpiry && (
                          <p className="text-[11px] text-red-500 mt-1">{errors.cardExpiry}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#4A443E] mb-1">
                          CVC Security Code *
                        </label>
                        <input
                          type="password"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                          placeholder="123"
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-mono text-[#221F1C] focus:outline-none focus:ring-2 focus:ring-[#221F1C] ${
                            errors.cardCvc ? 'border-red-500 bg-red-50/20' : 'border-[#D8CFBF] bg-white'
                          }`}
                        />
                        {errors.cardCvc && (
                          <p className="text-[11px] text-red-500 mt-1">{errors.cardCvc}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : paymentMethod === 'apple_pay' ? (
                  <div className="p-4 bg-[#F4EFE6] rounded-xl text-center space-y-2 text-xs text-[#5A524A] border border-[#E8E1D5]">
                    <Smartphone className="w-6 h-6 text-[#221F1C] mx-auto" />
                    <p className="font-semibold text-[#221F1C]">One-Touch Digital Wallet Express</p>
                    <p>Your default payment card and biometric auth will be requested upon clicking Place Order.</p>
                  </div>
                ) : (
                  <div className="p-4 bg-[#F4EFE6] rounded-xl text-center space-y-2 text-xs text-[#5A524A] border border-[#E8E1D5]">
                    <Wallet className="w-6 h-6 text-[#221F1C] mx-auto" />
                    <p className="font-semibold text-[#221F1C]">PayPal Express Digital Checkout</p>
                    <p>You will complete authentication securely with your PayPal account.</p>
                  </div>
                )}
              </div>

              {/* Terms and Digital Delivery Acknowledgment */}
              <div className="space-y-2">
                <label className="flex items-start gap-2.5 text-xs text-[#5A524A] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={termsAgreed}
                    onChange={(e) => setTermsAgreed(e.target.checked)}
                    className="mt-0.5 rounded text-[#221F1C] focus:ring-[#221F1C]"
                  />
                  <span>
                    I understand this is a digital purchase. I will receive immediate DRM-free download access to EPUB and PDF files, and I agree to the{' '}
                    <button
                      type="button"
                      onClick={() => setLegalModal('terms')}
                      className="text-[#B85D38] underline font-semibold cursor-pointer"
                    >
                      Terms of Service
                    </button>{' '}
                    and{' '}
                    <button
                      type="button"
                      onClick={() => setLegalModal('privacy')}
                      className="text-[#B85D38] underline font-semibold cursor-pointer"
                    >
                      Privacy Policy
                    </button>
                    .
                  </span>
                </label>
                {errors.terms && <p className="text-[11px] text-red-500">{errors.terms}</p>}
              </div>

              {/* Submit Button */}
              <div>
                <button
                  id="checkout-place-order-btn"
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 rounded-xl bg-[#221F1C] text-white hover:bg-[#38322B] text-sm font-bold transition-all shadow-xs flex items-center justify-center gap-2 disabled:opacity-75 cursor-pointer border border-[#38322B]"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      <span>Authorizing Secure Digital Delivery...</span>
                    </div>
                  ) : (
                    <span>Place Order & Download eBooks (${cartTotal.toFixed(2)})</span>
                  )}
                </button>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center justify-center gap-2 text-xs text-[#786E64] pt-1">
                <ShieldCheck className="w-4 h-4 text-[#236B5E]" />
                <span>Truescape Bookstore • Hamtramck, Michigan • 313-564-9075</span>
              </div>
            </form>
          </div>

          {/* Right Column: Order Summary Card */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E8E1D5] p-6 artisan-card space-y-6">
            <h3 className="font-editorial text-xl font-bold text-[#221F1C] border-b border-[#F2ECE0] pb-3">
              Order Summary ({cart.length} {cart.length === 1 ? 'eBook' : 'eBooks'})
            </h3>

            {/* Items Mini List */}
            <div className="divide-y divide-[#F2ECE0] max-h-72 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.book.id} className="py-3 flex gap-3 items-center">
                  <img
                    src={item.book.coverImage}
                    alt={item.book.title}
                    className="w-11 h-15 rounded-lg object-cover flex-shrink-0 shadow-2xs border border-[#E8E1D5]"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-[#221F1C] truncate font-editorial">
                      {item.book.title}
                    </p>
                    <p className="text-[11px] text-[#786E64] truncate">
                      by {item.book.author}
                    </p>
                    <span className="text-[10px] text-[#236B5E] font-semibold">
                      Formats: {item.book.formats.join(', ')}
                    </span>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-xs font-bold text-[#221F1C]">
                      ${(item.book.price * item.quantity).toFixed(2)}
                    </span>
                    {item.quantity > 1 && (
                      <span className="text-[10px] text-[#786E64] block">
                        Qty: {item.quantity}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="border-t border-[#F2ECE0] pt-4 space-y-2 text-xs text-[#5A524A]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-[#221F1C]">${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery (Instant Digital Access)</span>
                <span className="font-semibold text-[#236B5E]">FREE</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Michigan Tax (6%)</span>
                <span className="font-medium text-[#221F1C]">${cartTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#221F1C] pt-3 border-t border-[#F2ECE0]">
                <span>Total Due</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Digital License Reassurance */}
            <div className="p-3.5 rounded-xl bg-[#F4EFE6] border border-[#E8E1D5] text-xs text-[#5A524A] space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-[#221F1C]">
                <Sparkles className="w-3.5 h-3.5 text-[#C58B39]" />
                <span>What happens next?</span>
              </div>
              <p className="leading-relaxed">
                As soon as your order completes, your files will be instantly downloadable and permanently saved to your Truescape Digital Library.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
