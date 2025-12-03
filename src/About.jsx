import React from "react";
import { Link } from "react-router";
import DynamicHelmet from "./DynamicHelmet";
import { FaRocket, FaHeart, FaShieldAlt, FaTruck } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <DynamicHelmet title="About Us" />
      
      <div className="w-11/12 mx-auto">
        <div className="my-8 text-lg">
          <Link to="/" className="text-gray-600 hover:text-[#ff7b54] transition">
            Home
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-secondary font-semibold">About Us</span>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-gray-800">
            About Toy Topia
          </h1>
          <p className="text-center text-gray-600 text-lg mb-12">
            Your trusted destination for quality toys that inspire creativity and joy
          </p>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Our Story</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to Toy Topia, where every toy tells a story and every child's imagination comes to life. 
              Founded with a passion for bringing joy to families, we carefully curate a collection of toys 
              that are not only fun but also educational and safe.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We believe that play is essential for children's development, and our mission is to provide 
              high-quality toys that spark creativity, encourage learning, and create lasting memories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
              <div className="bg-orange-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <FaRocket className="text-[#ff7b54] text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Our Mission</h3>
              <p className="text-gray-600">
                To inspire play and learning through carefully selected toys that promote creativity, 
                imagination, and skill development in children of all ages.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <FaHeart className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Our Values</h3>
              <p className="text-gray-600">
                Quality, safety, and customer satisfaction are at the heart of everything we do. 
                We are committed to providing excellent service and products you can trust.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
              <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <FaShieldAlt className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Safety First</h3>
              <p className="text-gray-600">
                All our toys meet international safety standards and are tested for quality. 
                We prioritize your child's safety in every product we offer.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
              <div className="bg-purple-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <FaTruck className="text-purple-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Fast Delivery</h3>
              <p className="text-gray-600">
                We ensure quick and secure delivery of your orders. Free shipping available 
                on orders above $50 to bring joy to your doorstep faster.
              </p>
            </div>
          </div>

          <div className="bg-linear-to-r from-[#ff7b54] to-[#ff946e] rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
            <p className="text-lg mb-6 opacity-90">
              Become part of the Toy Topia family and discover toys that make every moment special
            </p>
            <Link
              to="/products"
              className="inline-block bg-white text-[#ff7b54] px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
