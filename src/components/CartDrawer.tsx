import React from 'react';
import { ArrowRight, Minus, Plus, ShieldCheck, ShoppingBag, Trash2, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartTax,
    cartTotal,
    cartCount,
    setView,
  } = useStore();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    setView('checkout');
  };

  const handleContinueShopping = () => {
    setIsCartOpen(false);
    setView('catalog');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] shadow-2xl border-l border-[#E8E1D5] flex flex-col">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#E8E1D5] bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#221F1C]" />
              <h2 className="font-editorial text-xl font-bold text-[#221F1C]">
                Digital Bag
              </h2>
              <span className="text-xs font-semibold bg-[#F3EDE2] text-[#786E64] border border-[#DFD5C5] px-2 py-0.5 rounded-full">
                {cartCount} {cartCount === 1 ? 'eBook' : 'eBooks'}
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-[#786E64] hover:text-[#221F1C] hover:bg-[#F4EFE6] transition-colors cursor-pointer"
              aria-label="Close Digital Bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List or Empty State */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {cart.length > 0 ? (
              <>
                {/* Instant delivery banner */}
                <div className="p-3.5 bg-[#F4EFE6] border border-[#E8E1D5] rounded-xl flex items-start gap-2.5 text-xs text-[#4A443E]">
                  <ShieldCheck className="w-4 h-4 text-[#236B5E] flex-shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-[#221F1C]">Instant Digital Access:</strong> Download links for EPUB and PDF will be generated immediately upon checkout completion.
                  </p>
                </div>

                <div className="divide-y divide-[#E8E1D5]">
                  {cart.map((item) => (
                    <div key={item.book.id} className="py-4 flex gap-4 items-start">
                      {/* Thumbnail */}
                      <div className="w-16 h-22 rounded-lg overflow-hidden bg-[#F4EFE6] flex-shrink-0 book-shadow border border-[#E8E1D5]">
                        <img
                          src={item.book.coverImage}
                          alt={item.book.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#B85D38]">
                          {item.book.category}
                        </span>
                        <h4 className="font-editorial text-sm font-bold text-[#221F1C] leading-tight truncate">
                          {item.book.title}
                        </h4>
                        <p className="text-xs text-[#786E64] truncate">
                          by {item.book.author}
                        </p>
                        
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-sm font-bold text-[#221F1C]">
                            ${(item.book.price * item.quantity).toFixed(2)}
                          </span>

                          {/* Quantity Controls */}
                          <div className="flex items-center border border-[#D8CFBF] rounded-lg bg-white shadow-2xs">
                            <button
                              onClick={() => updateQuantity(item.book.id, item.quantity - 1)}
                              className="p-1 hover:bg-[#F4EFE6] text-[#786E64] rounded-l-lg transition-colors cursor-pointer"
                              title="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-2 text-xs font-semibold text-[#221F1C]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                              className="p-1 hover:bg-[#F4EFE6] text-[#786E64] rounded-r-lg transition-colors cursor-pointer"
                              title="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.book.id)}
                            className="p-1 text-[#9E9488] hover:text-[#DC2626] transition-colors cursor-pointer"
                            title="Remove eBook"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              /* Empty Bag State */
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-white border border-[#E8E1D5] flex items-center justify-center mx-auto text-[#9E9488]">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h3 className="font-editorial text-xl font-bold text-[#221F1C]">
                  Your bag is empty
                </h3>
                <p className="text-xs text-[#786E64] max-w-xs mx-auto">
                  Explore our curated catalog to discover inspiring fiction, business strategies, and mindful self-development.
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleContinueShopping}
                    className="px-6 py-2.5 rounded-xl bg-[#221F1C] text-white text-xs font-semibold hover:bg-[#38322B] transition-colors shadow-xs cursor-pointer border border-[#38322B]"
                  >
                    Browse eBooks
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-[#E8E1D5] space-y-4">
              <div className="space-y-2 text-xs text-[#5A524A]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#221F1C]">${cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Est. Michigan Sales Tax (6%)</span>
                  <span className="font-medium text-[#221F1C]">${cartTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#221F1C] pt-2 border-t border-[#F2ECE0]">
                  <span>Total</span>
                  <span className="text-base text-[#221F1C]">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  id="cart-proceed-checkout-btn"
                  onClick={handleCheckout}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#221F1C] hover:bg-[#38322B] text-white text-sm font-semibold transition-colors shadow-xs flex items-center justify-center gap-2 group cursor-pointer border border-[#38322B]"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={handleContinueShopping}
                  className="w-full py-2.5 text-xs text-[#786E64] hover:text-[#221F1C] font-medium text-center cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
