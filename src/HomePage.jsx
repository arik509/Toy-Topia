import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import AOS from "aos";
import "aos/dist/aos.css";
import PopularToys from "./Components/PopularToys";
import img1 from "./assets/img1.png"
import img2 from "./assets/2nd.png"
import { Link } from "react-router";
import DynamicHelmet from "./DynamicHelmet";



const HomePage = () => {
  const [toys, setToys] = useState([]);
  const [mostRatedToys, setMostRatedToys] = useState([]);

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

  return (
    <div className="w-11/12 mx-auto my-[40px] animate-pageFade">
      <DynamicHelmet title="Home" />
      <h2 data-aos="fade-up" className="text-3xl font-bold text-center mb-6">
        Our Collections
      </h2>

      <Swiper
        slidesPerView={3}
        spaceBetween={25}
        loop={true}
        loopFillGroupWithBlank={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper relative"
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        onSwiper={(swiper) => {
          setTimeout(() => {
            if (swiper.autoplay) {
              swiper.autoplay.start();
            }
          }, 200);
        }}
      >
        {toys.map((toy) => (
          <SwiperSlide key={toy.toyId}>
            <div
              data-aos="zoom-in"
              className="bg-[#fffaf5] p-[40px] rounded-2xl shadow-md
              hover:shadow-[0_0_20px_rgba(255,140,0,0.5)]
              transition-all duration-500 flex flex-col items-center hover:scale-[1.03]"
            >
              <div className="w-40 h-40 rounded-full overflow-hidden bg-white flex justify-center items-center shadow-inner">
                <img
                  src={toy.pictureURL}
                  alt={toy.toyName}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110 animate-floating"
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg font-semibold text-[#333]">
                  {toy.toyName}
                </h3>
                <p className="text-sm text-gray-600 mb-[20px]">
                  ${toy.price.toFixed(2)}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <style>
          {`
            .swiper-button-prev,
            .swiper-button-next {
              color: #ff8c00;
              opacity: 0;
              transition: opacity 0.4s ease;
            }
            .mySwiper:hover .swiper-button-prev,
            .mySwiper:hover .swiper-button-next {
              opacity: 1;
            }
            .swiper-pagination-bullet {
              background: #ff8c00;
              opacity: 0.6;
            }
            .swiper-pagination-bullet-active {
              opacity: 1;
            }

            @keyframes pageFade {
              from { opacity: 0; transform: scale(0.98); }
              to { opacity: 1; transform: scale(1); }
            }
            .animate-pageFade {
              animation: pageFade 0.8s ease-out;
            }

            @keyframes floating {
              0% { transform: translateY(0); }
              50% { transform: translateY(-8px); }
              100% { transform: translateY(0); }
            }
            .animate-floating {
              animation: floating 3s ease-in-out infinite;
            }
          `}
        </style>
      </Swiper>

      <div>
        <PopularToys />
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 items-center"
        data-aos="fade-up"
      >
        <div
          className="rounded-2xl overflow-hidden relative shadow-lg"
          data-aos="fade-right"
        >
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

        <div
          className="rounded-2xl overflow-hidden relative shadow-lg"
          data-aos="fade-left"
        >
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
            <Link to='/products' className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-[#0c4a6e] font-semibold px-5 py-2 rounded-full shadow-md transition-all">
              Shop Now
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
              className="bg-[#fffaf5] p-6 rounded-2xl shadow-md
              hover:shadow-[0_0_20px_rgba(255,140,0,0.5)]
              transition-all duration-300 flex flex-col items-center"
            >
              <div className="w-40 h-40 rounded-full overflow-hidden bg-white flex justify-center items-center">
                <img
                  src={toy.pictureURL}
                  alt={toy.toyName}
                  className="w-full h-full object-cover animate-floating"
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
    </div>
  );
};

export default HomePage;