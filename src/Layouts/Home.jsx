import React from "react";
import { Outlet, useLocation } from "react-router";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import HeroSection from "../Components/HeroSection";

const Home = () => {
  const location = useLocation();

  return (
    <div>
      <header>
        <Navbar />
        <Header />
       
        {location.pathname === "/" && <HeroSection></HeroSection>}
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
