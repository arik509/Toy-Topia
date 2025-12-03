import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import AOS from "aos";
import "aos/dist/aos.css";
import PopularToys from "./Components/PopularToys";
import img1 from "./assets/img1.png";
import img2 from "./assets/2nd.png";
import { Link } from "react-router";
import DynamicHelmet from "./DynamicHelmet";
import { FaGift, FaTag, FaTruck, FaEnvelope, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const HomePage = () => {
  const [toys, setToys] = useState([]);
  const [mostRatedToys, setMostRatedToys] = useState([]);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: 'start',
      slidesToScroll: 1,
      breakpoints: {
        '(min-width: 768px)': { slidesToScroll: 2 },
        '(min-width: 1024px)': { slidesToScroll: 3 }
      }
    },
    [Autoplay({ delay: 3500, stopOnInteraction: false })]
  );

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    fetch("/toys.json")
      .then((res) => res.json())
      .then((data) => {
        setToys(data.slice(0, 6));
        const sortedByRating = data
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 6);
        setMostRatedToys(sortedByRating);
      });
  }, []);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
      setSubscribed(false);
    }, 3000);
  };

  return (
    <div className="w-11/12 mx-auto my-10 animate-pageFade">
      <DynamicHelmet title="Home" />
      <h2 data-aos="fade-up" className="text-3xl font-bold text-center mb-6">
        Our Collections
      </h2>

      <div className="relative mb-16">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {toys.map((toy) => (
              <div 
                key={toy.toyId} 
                className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-3"
              >
                <div className="bg-[#fffaf5] p-10 rounded-2xl shadow-md hover:shadow-[0_0_20px_rgba(255,140,0,0.5)] transition-all duration-500">
                  <div className="w-40 h-40 mx-auto rounded-full overflow-hidden bg-white flex justify-center items-center shadow-inner">
                    <img
                      src={toy.pictureURL}
                      alt={toy.toyName}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="text-lg font-semibold text-[#333]">
                      {toy.toyName}
                    </h3>
                    <p className="text-sm text-gray-600 mb-5">
                      ${toy.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={scrollPrev}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full p-3 hover:bg-orange-100 transition-all z-10"
        >
          <FaChevronLeft className="text-[#ff8c00] text-xl" />
        </button>
        <button
          onClick={scrollNext}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full p-3 hover:bg-orange-100 transition-all z-10"
        >
          <FaChevronRight className="text-[#ff8c00] text-xl" />
        </button>

        <style>
          {`
            @keyframes pageFade {
              from { opacity: 0; transform: scale(0.98); }
              to { opacity: 1; transform: scale(1); }
            }
            .animate-pageFade {
              animation: pageFade 0.8s ease-out;
            }
          `}
        </style>
      </div>

      <div>
        <PopularToys />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 items-center" data-aos="fade-up">
        <div className="rounded-2xl overflow-hidden relative shadow-lg" data-aos="fade-right">
          <img
            src={img1}
            alt="Discover the Joy of Play"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
            <h2 className="text-2xl md:text-4xl font-bold text-secondary drop-shadow-md">
              Discover the <br /> Joy of Play
            </h2>
            <p className="mt-3 text-[12px] md:text-[16px] text-black text-sm md:text-base font-medium opacity-90">
              Fun toys for every little dreamer
            </p>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden relative shadow-lg" data-aos="fade-left">
          <img
            src={img2}
            alt="Eco-Friendly Toys"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center mt-4">
            <h2 className="text-2xl md:text-4xl font-bold text-[#0c4a6e] drop-shadow-sm">
              Eco-Friendly Toys
            </h2>
            <p className="mt-2 text-[14px] md:text-[16px] text-gray-700 font-medium">
              Flash sale 30% • Extra discount for loyal customers
            </p>
            <Link to="/products" className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-[#0c4a6e] font-semibold px-5 py-2 rounded-full shadow-md transition-all">
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      <div className="mb-16" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-center mb-8">Special Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-linear-to-br from-orange-100 to-pink-100 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaGift className="text-[#ff7b54] text-3xl" />
            </div>
            <h3 className="font-bold text-xl mb-2 text-gray-800">Buy 2 Get 1 Free</h3>
            <p className="text-gray-600 mb-4">On selected educational toys</p>
            <Link to="/products" className="inline-block bg-[#ff7b54] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#ff946e] transition-all">
              Shop Now
            </Link>
          </div>

          <div className="bg-linear-to-br from-blue-100 to-purple-100 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaTag className="text-blue-600 text-3xl" />
            </div>
            <h3 className="font-bold text-xl mb-2 text-gray-800">50% Off</h3>
            <p className="text-gray-600 mb-4">Flash sale on all outdoor toys</p>
            <Link to="/products" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-all">
              Grab Deal
            </Link>
          </div>

          <div className="bg-linear-to-br from-green-100 to-teal-100 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaTruck className="text-green-600 text-3xl" />
            </div>
            <h3 className="font-bold text-xl mb-2 text-gray-800">Free Shipping</h3>
            <p className="text-gray-600 mb-4">On orders above $50</p>
            <Link to="/products" className="inline-block bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition-all">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 data-aos="fade-up" className="text-3xl font-bold text-center mb-6">
          Customer Loves
        </h2>
        <p data-aos="fade-up" className="text-center mb-6">
          Most rated products
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mostRatedToys.map((toy) => (
            <div
              key={toy.toyId}
              data-aos="zoom-in"
              className="bg-[#fffaf5] p-6 rounded-2xl shadow-md hover:shadow-[0_0_20px_rgba(255,140,0,0.5)] transition-all duration-300 flex flex-col items-center"
            >
              <div className="w-40 h-40 rounded-full overflow-hidden bg-white flex justify-center items-center">
                <img
                  src={toy.pictureURL}
                  alt={toy.toyName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg font-semibold text-[#333]">
                  {toy.toyName}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  ${toy.price.toFixed(2)}
                </p>
                <p className="text-sm text-yellow-500">
                  Rating: {toy.rating} ⭐
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-16 bg-linear-to-r from-[#ff7b54] to-[#ff946e] rounded-3xl p-8 md:p-12 text-white shadow-2xl" data-aos="fade-up">
        <div className="max-w-3xl mx-auto text-center">
          <FaEnvelope className="text-5xl mx-auto mb-4 animate-bounce" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Get exclusive deals, new arrivals, and parenting tips delivered to your inbox!
          </p>
          
          {!subscribed ? (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 text-lg"
              />
              <button
                type="submit"
                className="bg-white text-[#ff7b54] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Subscribe
              </button>
            </form>
          ) : (
            <div className="bg-white text-[#ff7b54] px-8 py-4 rounded-full inline-block font-bold text-lg shadow-lg">
              🎉 Thank you for subscribing!
            </div>
          )}
          
          <p className="text-sm mt-4 opacity-75">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
