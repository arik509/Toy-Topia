import React, { useContext } from "react";
import { CartContext } from "./Provider/CartProvider";
import { TbX } from "react-icons/tb";
import { Link } from "react-router";

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold text-gray-600">
          Your cart is empty 🛒
        </h1>
      </div>
    );
  }

  return (
    <div>
      <div className="w-11/12 mx-auto">
        <div className="my-[30px] text-[20px]">
          <Link to="/" className="font-bold">
            Home /
          </Link>{" "}
          <span className="text-secondary">Cart</span>
        </div>
      </div>
      <div className="w-11/12 mx-auto my-10">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cart.map((item) => (
            <div key={item.toyId} className="bg-white rounded-lg shadow-md p-4">
              <img
                src={item.pictureURL}
                alt={item.toyName}
                className="w-full h-40 object-contain mb-3"
              />
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-bold text-lg">{item.toyName}</h2>
                  <p className="text-gray-700 mb-1">${item.price}</p>
                </div>
                <div>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => removeFromCart(item.toyId)}
                  >
                    <TbX></TbX>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
