import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

const Layaout = () => {
  return (
    <div className="w-full h-screen ">
      <Navbar />
      <div className="pt-16 md:flex gap-14 h-full overflow-hidden">
        <nav className=" w-full  bg-gray-200  md:pt-36 md:w-56  ">
          <ul className="flex justify-center items-center text-black tracking-widest text-lg h-14 md:flex-col gap-10  ">
            <Link to="/settings">
              <li className="border-b-2 ">InfoPersonel</li>
            </Link>
            <Link to="/settings/Securité">
              <li className="border-b-2 ">Securité</li>
            </Link>
            <Link to="/settings/help">
              <li className="border-b-2 ">Help</li>
            </Link>
          </ul>
        </nav>
        <div className=" border-l-2 h-full w-full overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layaout;
