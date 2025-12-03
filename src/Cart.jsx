import React, { useContext } from "react";
import { CartContext } from "./Provider/CartProvider";
import { TbX } from "react-icons/tb";
import { Link } from "react-router";
import DynamicHelmet from './DynamicHelmet';
import { FaShoppingCart } from "react-icons/fa";

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  
  const pageTitle = cart.length === 0 
    ? "Empty Cart" 
    : `Shopping Cart (${cart.length} Items)`;

  const totalPrice = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col justify-center items-center">
        <DynamicHelmet title={pageTitle} />
        <FaShoppingCart className="text-9xl text-gray-300 mb-6" />
        <h1 className="text-3xl font-bold text-gray-700 mb-4">
          Your cart is empty
        </h1>
        <p className="text-gray-500 mb-6">Add some toys to get started!</p>
        <Link 
          to="/products" 
          className="bg-linear-to-r from-[#ff7b54] to-[#ff946e] text-white px-8 py-3 rounded-full font-bold hover:from-[#ff946e] hover:to-[#ff7b54] transition-all duration-300 shadow-lg"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <DynamicHelmet title={pageTitle} />
      
      <div className="w-11/12 mx-auto">
        <div className="my-[30px] text-[20px]">
          <Link to="/" className="font-bold">
            Home /
          </Link>{" "}
          <span className="text-secondary">Cart</span>
        </div>
      </div>
      <div className="w-11/12 mx-auto my-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Your Cart ({cart.length} Items)</h1>
          <div className="text-right">
            <p className="text-gray-600">Total:</p>
            <p className="text-3xl font-bold text-[#ff7b54]">${totalPrice.toFixed(2)}</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cart.map((item) => (
            <div key={item.toyId} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="bg-linear-to-br from-orange-50 to-pink-50 p-4 h-48 flex items-center justify-center">
                <img
                  src={item.pictureURL}
                  alt={item.toyName}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h2 className="font-bold text-lg mb-1">{item.toyName}</h2>
                    <p className="text-2xl font-bold text-[#ff7b54]">${item.price}</p>
                  </div>
                  <button
                    className="bg-red-100 text-red-600 p-2 rounded-full hover:bg-red-200 transition-colors"
                    onClick={() => removeFromCart(item.toyId)}
                  >
                    <TbX size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Order Summary</h2>
          </div>
          <div className="border-t pt-4 flex justify-between items-center mb-6">
            <span className="text-xl font-semibold">Total Amount:</span>
            <span className="text-3xl font-bold text-[#ff7b54]">${totalPrice.toFixed(2)}</span>
          </div>
          <button className="w-full bg-linear-to-r from-[#ff7b54] to-[#ff946e] text-white py-4 rounded-xl font-bold text-lg hover:from-[#ff946e] hover:to-[#ff7b54] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
