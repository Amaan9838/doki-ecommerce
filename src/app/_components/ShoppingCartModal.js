'use client';

import React, { useContext } from 'react';
import { X, ShoppingCart, Lock, Plus, Minus } from 'lucide-react';
import { CartContext } from '../contexts/CartContext';

const ShoppingCartModal = ({ isOpen, onClose }) => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    getTotalItems,
    getTotalPrice,
  } = useContext(CartContext);

  const total = getTotalPrice();
  const itemCount = getTotalItems();

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div
        className={`bg-white w-full max-w-lg mx-auto rounded-lg shadow-2xl transition-all duration-300 ${
          isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
      >
        <div className="flex flex-col h-[90vh]">
          <div className="p-6 bg-gradient-to-r from-gray-700 to-black text-white rounded-t-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold flex items-center">
                <ShoppingCart className="mr-2" />
                Your Cart
                <span className="ml-2 inline-flex items-center justify-center w-6 h-6 bg-white text-purple-600 rounded-full text-sm font-semibold">
                  {itemCount}
                </span>
              </h2>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mt-4">
              <p className="text-sm font-medium">
                Spend $0.10 more for free shipping!
              </p>
              <div className="w-full bg-white bg-opacity-30 h-2 mt-2 rounded-full overflow-hidden">
                <div className="w-3/4 bg-white h-full rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="flex-grow overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-500">Your cart is empty.</p>
            ) : (
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm"
                  >
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-md mr-4"
                    />
                    <div className="flex-grow">
                      <h3 className="font-semibold text-gray-700 text-lg">
                        {item.name.length > 30
                          ? `${item.name.slice(0, 30)}...`
                          : item.name}
                      </h3>
                      <p className="text-gray-600 font-bold mt-1">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex flex-col items-center ml-4">
                      <div className="flex items-center bg-white rounded-full shadow-md">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-2 text-gray-500 hover:text-indigo-600 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-3 py-1 font-semibold text-gray-700">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-2 text-gray-500 hover:text-indigo-600 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="mt-2 text-red-500 hover:text-red-700 transition-colors p-2 rounded-full"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-6 bg-gray-50 rounded-b-lg">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold text-gray-800">Total</span>
              <span className="text-2xl font-bold text-gray-900">
                ${total.toFixed(2)} USD
              </span>
            </div>
            <button className="w-full bg-black text-white py-3 rounded-full font-semibold shadow-lg hover:bg-gray-700 transition-colors flex items-center justify-center">
              <Lock size={20} className="mr-2" />
              CHECKOUT SECURELY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartModal;
