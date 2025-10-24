import React, { useContext, useState } from "react";
import { FaStar } from "react-icons/fa";
import { CartContext } from "../src/Provider/CartProvider";
// import { CartContext } from "../Provider/CartProvider";
// import { CartContext } from "../Provider/CartContext";

const ToyDetailsCard = ({ toy }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { addToCart } = useContext(CartContext);

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

  return (
    <div className="flex flex-col md:flex-row gap-[20px] md:gap-[40px] bg-primary p-4 shadow-sm items-center justify-center relative">
      <div>
        <img src={toy.pictureURL} alt={toy.toyName} />
      </div>
      <div className="space-y-1 lg:space-y-3 items-center">
        <h1 className="text-2xl font-bold">{toy.toyName}</h1>
        <p>{toy.description}</p>
        <p>
          <span className="text-secondary">{toy.availableQuantity}</span> Available
        </p>
        <p>${toy.price}</p>
        <p className="text-secondary flex gap-2 items-center">
          {toy.rating} <FaStar size={16} />
        </p>

        <div className="flex gap-3">
          <button
            className="btn btn-secondary"
            onClick={() => addToCart(toy)}
          >
            Add to Cart
          </button>
          <button
            className="btn btn-outline"
            onClick={() => setShowForm(true)}
          >
            Try Now
          </button>
        </div>
      </div>

      {showForm && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="bg-primary border border-gray-300 rounded-md p-6 shadow-lg w-80 relative">
            <button
              className="absolute top-2 right-3 text-gray-600"
              onClick={() => setShowForm(false)}
            >
              ✕
            </button>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <h2 className="text-lg font-semibold mb-2">Enter your details</h2>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="border p-2 rounded"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border p-2 rounded"
                />
                <button type="submit" className="btn btn-secondary mt-2">
                  Try Now
                </button>
              </form>
            ) : (
              <div className="text-center text-green-600 font-medium">
                Success!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ToyDetailsCard;
