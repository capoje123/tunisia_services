import React, { useEffect, useState } from "react";
import { Navbar } from "../componants/Navbar";
import SearchMenu from "../componants/SearchMenu";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllService } from "../redux/Actions/serviceActions";
import Card from "../componants/Card";
import { Link } from "react-router-dom";

const Search = () => {
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();
  const servicesArray = useSelector((state) => state.serviceReducer.allService);
  useEffect(() => {
    dispatch(getAllService("", "", 0));
  }, []);

  return (
    <div className="w-full h-full relative">
      <Navbar />
      {/** main */}

      <div className="h-full w-full grid grid-cols-[300px_minmax(950px,_1fr)_100px] pt-20 border-4 ">
        <div className="bg-gray-700 p-8">
          <SearchMenu />
        </div>
        <div className="border-8 flex gap-5 flex-wrap p-4">
          {servicesArray.map((el) => (
            <Link key={el._id} to={`/profile/${el.user._id}`}>
            <Card key={el._id} el={el} /></Link>
          ))}
        </div>
      </div>

      <div
        onClick={() => setShow(!show)}
        className="text-white flex items-center justify-center border-2 w-14 h-[10rem] translate-y-[-50%] rounded-r-full z-[100] fixed top-[50%] left-[-10px]  bg-black opacity-30 cursor-pointer sm:hidden"
      >
        <FaSearch size={25} />
      </div>
      {/** sidebar*/}
      <div
        className={
          show
            ? "absolute  top-0 left-0 w-full h-screen bg-white/25 ease-in duration-500 sm:hidden "
            : "absolute  top-0 left-[-100%] w-full h-screen bg-white/25 ease-in duration-500 sm:hidden "
        }
      >
        <div className="w-[90%] h-full bg-black pt-20 px-2">
          <SearchMenu />
        </div>
      </div>
    </div>
  );
};

export default Search;
