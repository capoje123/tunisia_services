import React from "react";
import { Navbar } from "../componants/Navbar";
import RowList from "../componants/RowList";
import Carousel from "../componants/Carousel";
import Footer from "../componants/Footer";

const Home = () => {
  return (
    <div className="w-full mb-[50px] overflow-hidden">
      <Navbar />
      <div className="bg-gray-100 w-full pt-[3.5rem] overflow-x-auto sm:px-4 lg:px-24 ">
        <Carousel />
        <RowList />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
