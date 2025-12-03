import React, { useContext, useState } from "react";
import { FaStar, FaTimes, FaShoppingCart, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router";
import { CartContext } from "../src/Provider/CartProvider";
import { AuthContext } from "../src/Provider/AuthProvider";

const ToyDetailsCard = ({ toy }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setShowForm(false);
      setFormData({ name: "", email: "" });
      setIsSubmitted(false);
    }, 2000);
  };

  const handleAddToCart = () => {
    if (!user) {
      navigate("/auth/login", { state: { from: window.location.pathname } });
    } else {
      addToCart(toy);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white rounded-3xl shadow-lg p-6 lg:p-10">
        
        <div className="bg-linear-to-br from-orange-50 to-pink-50 rounded-2xl p-8 flex items-center justify-center">
          <img
            src={toy.pictureURL}
            alt={toy.toyName}
            className="w-full max-h-[500px] object-contain hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="flex flex-col">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            {toy.toyName}
          </h1>

          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-full">
              <FaStar className="text-amber-400" />
              <span className="font-bold text-lg">{toy.rating}</span>
            </div>
            <span className="bg-orange-100 text-[#ff7b54] px-4 py-2 rounded-full font-semibold text-sm">
              {toy.subCategory}
            </span>
            <div className="bg-green-50 text-green-700 px-4 py-2 rounded-full font-semibold text-sm">
              {toy.availableQuantity} Available
            </div>
          </div>

          <div className="mb-6">
            <p className="text-4xl font-bold text-[#ff7b54]">
              ${toy.price.toFixed(2)}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3">Description</h2>
            <p className="text-gray-700 leading-relaxed">
              {toy.description || toy.detailedDescription || `${toy.toyName} is a high-quality toy that provides endless fun and learning opportunities for children. Made with premium materials and designed with safety in mind, this toy is perfect for kids in the ${toy.ageRange} age range.`}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6 bg-gray-50 p-5 rounded-xl">
            <div>
              <p className="text-sm text-gray-500 mb-1">Seller</p>
              <p className="font-semibold text-gray-800">{toy.sellerName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Stock</p>
              <p className="font-semibold text-gray-800">{toy.availableQuantity} units</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Age Range</p>
              <p className="font-semibold text-gray-800">{toy.ageRange}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Category</p>
              <p className="font-semibold text-gray-800">{toy.subCategory}</p>
            </div>
          </div>

          <div className="flex gap-4 mt-auto">
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-linear-to-r from-[#ff7b54] to-[#ff946e] text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-[#ff946e] hover:to-[#ff7b54] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <FaShoppingCart /> Add to Cart
            </button>
            <button 
              onClick={() => setShowForm(true)}
              className="px-6 py-4 border-2 border-[#ff7b54] text-[#ff7b54] rounded-xl font-bold hover:bg-[#ff7b54] hover:text-white transition-all duration-300"
            >
              Try Now
            </button>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300">
          <div className="relative mx-auto w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 scale-100">
            
            <div className="relative bg-linear-to-r from-[#ff7b54] to-[#ff946e] text-white p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Try Before You Buy</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-white hover:bg-white hover:text-[#ff7b54] rounded-full p-2 transition-all duration-300"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <div className="p-6">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <p className="text-gray-600 mb-4">
                    Enter your details and we'll arrange a trial session for you!
                  </p>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#ff7b54] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#ff7b54] focus:outline-none transition-colors"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-linear-to-r from-[#ff7b54] to-[#ff946e] text-white py-3 rounded-xl font-bold hover:from-[#ff946e] hover:to-[#ff7b54] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Request Trial
                  </button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4 animate-bounce" />
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Success!</h3>
                  <p className="text-gray-600">We'll contact you soon for the trial session.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ToyDetailsCard;
