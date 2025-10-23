import React from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Banner from "../Components/Banner";

const Home = () => {
  return (
    <div>
      <header>
        <Navbar></Navbar>
        <Header></Header>
      </header>
      <main>
        <Banner></Banner>
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default Home;
