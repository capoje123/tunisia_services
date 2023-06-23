import React, { useEffect, useRef } from "react";
import Card from "./Card";
import { BsArrowRight } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllService } from "../redux/Actions/serviceActions";

const Row = ({ img, index, profession }) => {
  const rowRef = useRef(null);
  const dispatch = useDispatch();
  const services = useSelector(
    (state) => state.serviceReducer.rowServices
  ).filter((service) => service.profession === profession);

  useEffect(() => {
    const options = {
      root: null, // Use the viewport as the root
      rootMargin: "0px", // No margin
      threshold: 0.2, // Trigger at 10% visibility
    };

    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("slide-in");
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    if (rowRef.current) {
      observer.observe(rowRef.current);
    }

    return () => {
      if (rowRef.current) {
        observer.unobserve(rowRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={rowRef}
      className={`relative opacity-0 py-4 bg-white pl-2 shadow-xl shadow-gray-600 rounded-lg flex items-center gap-6 my-20 flex-col md:flex-row ${
        index % 2 === 0 ? "slide-right" : "slide-left"
      }`}
    >
      <img
        src={img}
        alt=""
        className="w-[400px] h-[170px] rounded-lg md:h-[300px] md:w-[300px]"
      />
      <p className="border-2 cursor-pointer self-end flex bg-gray-200 rounded-3xl w-32 items-center justify-evenly mr-5 md:absolute md:top-[-40px] md:right-4">
        <Link to="/search">
          <span onClick={() => dispatch(getAllService(profession, "", 0))}>
            See more
          </span>
        </Link>
        <span className=" rounded-full bg-white border">
          <BsArrowRight size={20} />
        </span>
      </p>
      <div className="flex w-full flex-col justify-center overflow-x-scroll scrollbar-style ">
        <div className="min-w-0 flex items-center gap-4 ">
          {services.map((el) => (
            <Link key={el._id} to={`/profile/${el.user._id}`}>
              <div>
                <Card el={el} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Row;
